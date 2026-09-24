import "server-only";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { AGENCY_SELECT, mapAgencyRow } from "./map-agency";
import type { Agency, AgencySort, Industry, Country, Region, City } from "./types";

export async function getIndustriesWithCounts(): Promise<(Industry & { agencyCount: number })[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return [];

  const { data: industries } = await supabase.from("industries").select("id, name, slug").order("name");
  if (!industries || industries.length === 0) return [];

  const counts = await Promise.all(
    industries.map(async (industry) => {
      const { count } = await supabase
        .from("agency_industries")
        .select("agency_id, agencies!inner(verification_status)", { count: "exact", head: true })
        .eq("industry_id", industry.id)
        .eq("agencies.verification_status", "verified");
      return count ?? 0;
    })
  );

  return industries.map((industry, i) => ({ ...industry, agencyCount: counts[i] }));
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("industries").select("id, name, slug").eq("slug", slug).maybeSingle();
  return data ?? null;
}

async function getVerifiedAgencyLocationsForIndustry(industryId: string) {
  const supabase = getSupabasePublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("agency_industries")
    .select(
      `agency:agencies!inner(
        verification_status,
        city:cities (
          id, name, slug, region_id,
          region:regions ( id, name, slug, country_id,
            country:countries ( id, name, slug )
          )
        )
      )`
    )
    .eq("industry_id", industryId)
    .eq("agency.verification_status", "verified");

  return (data ?? [])
    .map((row) => (row as unknown as { agency: { city: unknown } }).agency?.city)
    .filter(Boolean) as {
    id: string;
    name: string;
    slug: string;
    region_id: string;
    region: { id: string; name: string; slug: string; country_id: string; country: Country };
  }[];
}

export async function getCountriesForIndustry(industryId: string) {
  const cities = await getVerifiedAgencyLocationsForIndustry(industryId);
  const byCountry = new Map<string, { country: Country; count: number }>();
  for (const city of cities) {
    const country = city.region.country;
    const existing = byCountry.get(country.id);
    byCountry.set(country.id, { country, count: (existing?.count ?? 0) + 1 });
  }
  return Array.from(byCountry.values()).sort((a, b) => a.country.name.localeCompare(b.country.name));
}

export async function getRegionsForIndustryCountry(industryId: string, countrySlug: string) {
  const cities = await getVerifiedAgencyLocationsForIndustry(industryId);
  const byRegion = new Map<string, { region: Region; country: Country; count: number }>();
  for (const city of cities) {
    if (city.region.country.slug !== countrySlug) continue;
    const existing = byRegion.get(city.region.id);
    byRegion.set(city.region.id, {
      region: { id: city.region.id, name: city.region.name, slug: city.region.slug, country_id: city.region.country_id },
      country: city.region.country,
      count: (existing?.count ?? 0) + 1,
    });
  }
  return Array.from(byRegion.values()).sort((a, b) => a.region.name.localeCompare(b.region.name));
}

export async function getCitiesForIndustryCountryRegion(industryId: string, countrySlug: string, regionSlug: string) {
  const cities = await getVerifiedAgencyLocationsForIndustry(industryId);
  const byCity = new Map<string, { city: City; count: number }>();
  for (const city of cities) {
    if (city.region.country.slug !== countrySlug || city.region.slug !== regionSlug) continue;
    const existing = byCity.get(city.id);
    byCity.set(city.id, {
      city: { id: city.id, name: city.name, slug: city.slug, region_id: city.region_id },
      count: (existing?.count ?? 0) + 1,
    });
  }
  return Array.from(byCity.values()).sort((a, b) => a.city.name.localeCompare(b.city.name));
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("countries").select("id, name, slug").eq("slug", slug).maybeSingle();
  return data ?? null;
}

export async function getRegionBySlug(countryId: string, slug: string): Promise<Region | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("regions")
    .select("id, name, slug, country_id")
    .eq("country_id", countryId)
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export async function getCityBySlug(regionId: string, slug: string): Promise<City | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("cities")
    .select("id, name, slug, region_id")
    .eq("region_id", regionId)
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export type AgencySearchFilters = {
  q?: string;
  industryId?: string;
  countryId?: string;
  regionId?: string;
  cityId?: string;
  service?: string;
  verifiedOnly?: boolean;
  sort?: AgencySort;
  page?: number;
  pageSize?: number;
};

export async function searchAgencies(filters: AgencySearchFilters = {}): Promise<{ agencies: Agency[]; total: number }> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return { agencies: [], total: 0 };

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("agencies").select(AGENCY_SELECT, { count: "exact" }).eq("verification_status", "verified");

  if (filters.q) query = query.ilike("name", `%${filters.q}%`);
  if (filters.service) query = query.contains("services", [filters.service]);
  if (filters.cityId) query = query.eq("city_id", filters.cityId);

  // Industry is a many-to-many relation, so it can't be expressed as a plain
  // .eq() alongside the filters above — resolve it to a concrete agency-id
  // list first so pagination and the returned count stay accurate (a
  // post-fetch JS filter would silently break both).
  if (filters.industryId) {
    const { data: links } = await supabase
      .from("agency_industries")
      .select("agency_id")
      .eq("industry_id", filters.industryId);
    const agencyIds = (links ?? []).map((l) => l.agency_id);
    if (agencyIds.length === 0) return { agencies: [], total: 0 };
    query = query.in("id", agencyIds);
  }

  // Country/region filters similarly span a joined table; resolve to city
  // ids up front rather than filtering the mapped result after the fact.
  if (filters.regionId) {
    const { data: cities } = await supabase.from("cities").select("id").eq("region_id", filters.regionId);
    const cityIds = (cities ?? []).map((c) => c.id);
    if (cityIds.length === 0) return { agencies: [], total: 0 };
    query = query.in("city_id", cityIds);
  } else if (filters.countryId) {
    const { data: regions } = await supabase.from("regions").select("id").eq("country_id", filters.countryId);
    const regionIds = (regions ?? []).map((r) => r.id);
    if (regionIds.length === 0) return { agencies: [], total: 0 };
    const { data: cities } = await supabase.from("cities").select("id").in("region_id", regionIds);
    const cityIds = (cities ?? []).map((c) => c.id);
    if (cityIds.length === 0) return { agencies: [], total: 0 };
    query = query.in("city_id", cityIds);
  }

  if (filters.sort === "rating") query = query.order("rating", { ascending: false, nullsFirst: false });
  else if (filters.sort === "reviews") query = query.order("review_count", { ascending: false });
  else if (filters.sort === "recent") query = query.order("last_verified_at", { ascending: false, nullsFirst: false });
  else query = query.order("is_featured", { ascending: false }).order("is_sponsored", { ascending: false }).order("review_count", { ascending: false });

  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) return { agencies: [], total: 0 };

  return { agencies: (data ?? []).map(mapAgencyRow), total: count ?? 0 };
}

export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("agencies")
    .select(AGENCY_SELECT)
    .eq("slug", slug)
    .eq("verification_status", "verified")
    .maybeSingle();
  if (error || !data) return null;
  return mapAgencyRow(data);
}

export async function getFeaturedAgencies(limit = 6): Promise<Agency[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("agencies")
    .select(AGENCY_SELECT)
    .eq("verification_status", "verified")
    .eq("is_featured", true)
    .limit(limit);
  return (data ?? []).map(mapAgencyRow);
}
