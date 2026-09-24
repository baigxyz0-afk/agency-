import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { AGENCY_SELECT, mapAgencyRow } from "./map-agency";
import type { Agency, VerificationStatus } from "./types";

async function uniqueSlug(
  table: "agencies" | "countries" | "industries",
  base: string,
  scope?: { column: string; value: string }
) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const baseSlug = slugify(base) || "item";
  let candidate = baseSlug;
  let suffix = 2;

  for (;;) {
    let query = supabase.from(table).select("id").eq("slug", candidate).limit(1);
    if (scope) query = query.eq(scope.column, scope.value);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

// ---------------------------------------------------------------------------
// Locations — find-or-create by name, scoped to their parent.
// ---------------------------------------------------------------------------

export async function findOrCreateCountry(name: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const trimmed = name.trim();

  const { data: existing } = await supabase
    .from("countries")
    .select("id, name, slug")
    .ilike("name", trimmed)
    .maybeSingle();
  if (existing) return existing;

  const slug = await uniqueSlug("countries", trimmed);
  const { data, error } = await supabase
    .from("countries")
    .insert({ name: trimmed, slug })
    .select("id, name, slug")
    .single();
  if (error) throw error;
  return data;
}

export async function findOrCreateRegion(countryId: string, name: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const trimmed = name.trim();

  const { data: existing } = await supabase
    .from("regions")
    .select("id, name, slug")
    .eq("country_id", countryId)
    .ilike("name", trimmed)
    .maybeSingle();
  if (existing) return existing;

  const baseSlug = slugify(trimmed) || "region";
  let candidate = baseSlug;
  let suffix = 2;
  for (;;) {
    const { data } = await supabase
      .from("regions")
      .select("id")
      .eq("country_id", countryId)
      .eq("slug", candidate)
      .limit(1);
    if (!data || data.length === 0) break;
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const { data, error } = await supabase
    .from("regions")
    .insert({ country_id: countryId, name: trimmed, slug: candidate })
    .select("id, name, slug")
    .single();
  if (error) throw error;
  return data;
}

export async function findOrCreateCity(regionId: string, name: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const trimmed = name.trim();

  const { data: existing } = await supabase
    .from("cities")
    .select("id, name, slug")
    .eq("region_id", regionId)
    .ilike("name", trimmed)
    .maybeSingle();
  if (existing) return existing;

  const baseSlug = slugify(trimmed) || "city";
  let candidate = baseSlug;
  let suffix = 2;
  for (;;) {
    const { data } = await supabase
      .from("cities")
      .select("id")
      .eq("region_id", regionId)
      .eq("slug", candidate)
      .limit(1);
    if (!data || data.length === 0) break;
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const { data, error } = await supabase
    .from("cities")
    .insert({ region_id: regionId, name: trimmed, slug: candidate })
    .select("id, name, slug")
    .single();
  if (error) throw error;
  return data;
}

export async function resolveLocation(countryName: string, regionName: string, cityName: string) {
  const country = await findOrCreateCountry(countryName);
  const region = await findOrCreateRegion(country.id, regionName);
  const city = await findOrCreateCity(region.id, cityName);
  return city.id as string;
}

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export async function listIndustriesWithCounts() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data: industries } = await supabase.from("industries").select("id, name, slug").order("name");
  if (!industries) return [];

  const { data: links } = await supabase.from("agency_industries").select("industry_id");
  const counts = new Map<string, number>();
  for (const link of links ?? []) {
    counts.set(link.industry_id, (counts.get(link.industry_id) ?? 0) + 1);
  }

  return industries.map((i) => ({ ...i, agencyCount: counts.get(i.id) ?? 0 }));
}

export async function findOrCreateIndustry(name: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const trimmed = name.trim();

  const { data: existing } = await supabase
    .from("industries")
    .select("id, name, slug")
    .ilike("name", trimmed)
    .maybeSingle();
  if (existing) return existing;

  const slug = await uniqueSlug("industries", trimmed);
  const { data, error } = await supabase
    .from("industries")
    .insert({ name: trimmed, slug })
    .select("id, name, slug")
    .single();
  if (error) throw error;
  return data;
}

export async function resolveIndustryIds(names: string[]) {
  const trimmed = names.map((n) => n.trim()).filter(Boolean);
  const ids: string[] = [];
  for (const name of trimmed) {
    const industry = await findOrCreateIndustry(name);
    ids.push(industry.id);
  }
  return ids;
}

export async function deleteIndustry(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("industries").delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Locations summary (for the taxonomy admin page)
// ---------------------------------------------------------------------------

export async function listLocationsSummary() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data: countries } = await supabase.from("countries").select("id, name, slug").order("name");
  const { data: regions } = await supabase.from("regions").select("id, name, slug, country_id").order("name");
  const { data: cities } = await supabase.from("cities").select("id, name, slug, region_id").order("name");
  const { data: agencies } = await supabase.from("agencies").select("city_id");

  const agencyCountByCity = new Map<string, number>();
  for (const a of agencies ?? []) {
    if (!a.city_id) continue;
    agencyCountByCity.set(a.city_id, (agencyCountByCity.get(a.city_id) ?? 0) + 1);
  }

  return (countries ?? []).map((country) => {
    const countryRegions = (regions ?? []).filter((r) => r.country_id === country.id);
    const regionSummaries = countryRegions.map((region) => {
      const regionCities = (cities ?? []).filter((c) => c.region_id === region.id);
      const citySummaries = regionCities.map((city) => ({
        ...city,
        agencyCount: agencyCountByCity.get(city.id) ?? 0,
      }));
      return {
        ...region,
        cities: citySummaries,
        agencyCount: citySummaries.reduce((sum, c) => sum + c.agencyCount, 0),
      };
    });
    return {
      ...country,
      regions: regionSummaries,
      agencyCount: regionSummaries.reduce((sum, r) => sum + r.agencyCount, 0),
    };
  });
}

export async function deleteCountry(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("countries").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteRegion(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("regions").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteCity(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Agencies
// ---------------------------------------------------------------------------

export type AgencyListFilters = {
  search?: string;
  verification?: VerificationStatus | "all";
  page?: number;
  pageSize?: number;
};

export async function listAgenciesAdmin(filters: AgencyListFilters = {}) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { agencies: [] as Agency[], total: 0 };

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 25;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("agencies")
    .select(AGENCY_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }
  if (filters.verification && filters.verification !== "all") {
    query = query.eq("verification_status", filters.verification);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { agencies: (data ?? []).map(mapAgencyRow), total: count ?? 0 };
}

export async function getAgencyByIdAdmin(id: string): Promise<Agency | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("agencies").select(AGENCY_SELECT).eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapAgencyRow(data);
}

export type AgencyInput = {
  name: string;
  website: string;
  description: string;
  services: string[];
  founded_year: number | null;
  team_size: string;
  country: string;
  region: string;
  city: string;
  industries: string[];
  data_source: string;
  verification_status: VerificationStatus;
  is_featured: boolean;
  is_sponsored: boolean;
};

export async function createAgencyAdmin(input: AgencyInput) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const cityId = await resolveLocation(input.country, input.region, input.city);
  const industryIds = await resolveIndustryIds(input.industries);
  const slug = await uniqueSlug("agencies", input.name);

  const { data: agency, error } = await supabase
    .from("agencies")
    .insert({
      name: input.name,
      slug,
      website: input.website || null,
      description: input.description || null,
      services: input.services,
      founded_year: input.founded_year,
      team_size: input.team_size || null,
      city_id: cityId,
      data_source: input.data_source || "admin",
      verification_status: input.verification_status,
      is_featured: input.is_featured,
      is_sponsored: input.is_sponsored,
      last_verified_at: input.verification_status === "verified" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();
  if (error) throw error;

  if (industryIds.length > 0) {
    await supabase.from("agency_industries").insert(industryIds.map((industry_id) => ({ agency_id: agency.id, industry_id })));
  }

  return agency.id as string;
}

export async function updateAgencyAdmin(id: string, input: AgencyInput) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const cityId = await resolveLocation(input.country, input.region, input.city);
  const industryIds = await resolveIndustryIds(input.industries);

  const { data: current } = await supabase.from("agencies").select("verification_status, last_verified_at").eq("id", id).single();
  const becameVerified = current?.verification_status !== "verified" && input.verification_status === "verified";

  const { error } = await supabase
    .from("agencies")
    .update({
      name: input.name,
      website: input.website || null,
      description: input.description || null,
      services: input.services,
      founded_year: input.founded_year,
      team_size: input.team_size || null,
      city_id: cityId,
      verification_status: input.verification_status,
      is_featured: input.is_featured,
      is_sponsored: input.is_sponsored,
      last_verified_at: becameVerified ? new Date().toISOString() : current?.last_verified_at,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;

  await supabase.from("agency_industries").delete().eq("agency_id", id);
  if (industryIds.length > 0) {
    await supabase.from("agency_industries").insert(industryIds.map((industry_id) => ({ agency_id: id, industry_id })));
  }
}

export async function deleteAgencyAdmin(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("agencies").delete().eq("id", id);
  if (error) throw error;
}

export async function getDashboardCounts() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const [{ count: total }, { count: verified }, { count: pending }, { count: featured }, { count: sponsored }] =
    await Promise.all([
      supabase.from("agencies").select("id", { count: "exact", head: true }),
      supabase.from("agencies").select("id", { count: "exact", head: true }).eq("verification_status", "verified"),
      supabase.from("agencies").select("id", { count: "exact", head: true }).in("verification_status", ["unverified", "pending"]),
      supabase.from("agencies").select("id", { count: "exact", head: true }).eq("is_featured", true),
      supabase.from("agencies").select("id", { count: "exact", head: true }).eq("is_sponsored", true),
    ]);

  return {
    total: total ?? 0,
    verified: verified ?? 0,
    pending: pending ?? 0,
    featured: featured ?? 0,
    sponsored: sponsored ?? 0,
  };
}
