import Papa from "papaparse";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { AGENCY_SELECT, mapAgencyRow } from "@/lib/directory/map-agency";

export async function GET() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return new Response("Supabase is not configured.", { status: 503 });
  }

  const { data, error } = await supabase.from("agencies").select(AGENCY_SELECT).order("name");
  if (error) {
    return new Response("Failed to export agencies.", { status: 500 });
  }

  const agencies = (data ?? []).map(mapAgencyRow);

  const rows = agencies.map((a) => ({
    name: a.name,
    website: a.website ?? "",
    description: a.description ?? "",
    services: a.services.join(";"),
    founded_year: a.founded_year ?? "",
    team_size: a.team_size ?? "",
    country: a.location?.country.name ?? "",
    region: a.location?.region.name ?? "",
    city: a.location?.city.name ?? "",
    industries: a.industries.map((i) => i.name).join(";"),
    data_source: a.data_source ?? "",
    verification_status: a.verification_status,
    is_featured: a.is_featured,
    is_sponsored: a.is_sponsored,
    rating: a.rating ?? "",
    review_count: a.review_count,
    last_verified_at: a.last_verified_at ?? "",
  }));

  const csv = Papa.unparse(rows);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agencies-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
