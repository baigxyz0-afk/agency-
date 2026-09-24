import type { Agency } from "./types";

// Shared select fragment for both the admin (service role) and public (anon)
// query modules, so the raw-row shape returned by Supabase always matches
// what mapAgencyRow expects.
export const AGENCY_SELECT = `
  id, created_at, updated_at, name, slug, website, description, services,
  founded_year, team_size, rating, review_count, verification_status,
  is_featured, is_sponsored, data_source, last_verified_at,
  city:cities (
    id, name, slug, region_id,
    region:regions ( id, name, slug, country_id,
      country:countries ( id, name, slug )
    )
  ),
  agency_industries ( industry:industries ( id, name, slug ) )
`;

// Supabase's generated types for a dynamic select string default to `any`;
// this narrows just enough to map safely without hand-writing the full
// PostgREST response type for this query shape.
type RawAgencyRow = Record<string, unknown>;

export function mapAgencyRow(row: RawAgencyRow): Agency {
  const cityRaw = row.city as
    | { id: string; name: string; slug: string; region_id: string; region: unknown }
    | null;
  const regionRaw = cityRaw?.region as
    | { id: string; name: string; slug: string; country_id: string; country: unknown }
    | null
    | undefined;
  const countryRaw = regionRaw?.country as { id: string; name: string; slug: string } | null | undefined;

  const industriesRaw = (row.agency_industries as { industry: unknown }[] | null) ?? [];

  return {
    id: row.id as string,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    name: row.name as string,
    slug: row.slug as string,
    website: (row.website as string | null) ?? null,
    description: (row.description as string | null) ?? null,
    services: (row.services as string[] | null) ?? [],
    founded_year: (row.founded_year as number | null) ?? null,
    team_size: (row.team_size as string | null) ?? null,
    rating: (row.rating as number | null) ?? null,
    review_count: (row.review_count as number | null) ?? 0,
    verification_status: row.verification_status as Agency["verification_status"],
    is_featured: Boolean(row.is_featured),
    is_sponsored: Boolean(row.is_sponsored),
    data_source: (row.data_source as string | null) ?? null,
    last_verified_at: (row.last_verified_at as string | null) ?? null,
    location:
      cityRaw && regionRaw && countryRaw
        ? {
            city: { id: cityRaw.id, name: cityRaw.name, slug: cityRaw.slug, region_id: cityRaw.region_id },
            region: {
              id: regionRaw.id,
              name: regionRaw.name,
              slug: regionRaw.slug,
              country_id: regionRaw.country_id,
            },
            country: { id: countryRaw.id, name: countryRaw.name, slug: countryRaw.slug },
          }
        : null,
    industries: industriesRaw
      .map((i) => i.industry as { id: string; name: string; slug: string } | null)
      .filter((i): i is { id: string; name: string; slug: string } => Boolean(i)),
  };
}
