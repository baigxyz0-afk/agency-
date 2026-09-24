// One-off CSV importer using the service role key directly (bypasses the
// admin web UI, which needs a logged-in admin account we don't have set up
// yet). Mirrors the find-or-create + insert logic in
// lib/directory/admin-queries.ts / app/admin/actions/agencies.ts.
//
// Usage: node --env-file=.env.local scripts/import-agencies-csv.mjs <path-to-csv>

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import Papa from "papaparse";

const [, , csvPath] = process.argv;
if (!csvPath) {
  console.error("Usage: node --env-file=.env.local scripts/import-agencies-csv.mjs <path-to-csv>");
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function uniqueSlug(table, base, scope) {
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

async function findOrCreateCountry(name) {
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("countries").select("id").ilike("name", trimmed).maybeSingle();
  if (existing) return existing.id;
  const slug = await uniqueSlug("countries", trimmed);
  const { data, error } = await supabase.from("countries").insert({ name: trimmed, slug }).select("id").single();
  if (error) throw error;
  return data.id;
}

async function findOrCreateRegion(countryId, name) {
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("regions").select("id").eq("country_id", countryId).ilike("name", trimmed).maybeSingle();
  if (existing) return existing.id;
  let candidate = slugify(trimmed) || "region";
  let suffix = 2;
  for (;;) {
    const { data } = await supabase.from("regions").select("id").eq("country_id", countryId).eq("slug", candidate).limit(1);
    if (!data || data.length === 0) break;
    candidate = `${slugify(trimmed)}-${suffix}`;
    suffix += 1;
  }
  const { data, error } = await supabase.from("regions").insert({ country_id: countryId, name: trimmed, slug: candidate }).select("id").single();
  if (error) throw error;
  return data.id;
}

async function findOrCreateCity(regionId, name) {
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("cities").select("id").eq("region_id", regionId).ilike("name", trimmed).maybeSingle();
  if (existing) return existing.id;
  let candidate = slugify(trimmed) || "city";
  let suffix = 2;
  for (;;) {
    const { data } = await supabase.from("cities").select("id").eq("region_id", regionId).eq("slug", candidate).limit(1);
    if (!data || data.length === 0) break;
    candidate = `${slugify(trimmed)}-${suffix}`;
    suffix += 1;
  }
  const { data, error } = await supabase.from("cities").insert({ region_id: regionId, name: trimmed, slug: candidate }).select("id").single();
  if (error) throw error;
  return data.id;
}

async function findOrCreateIndustry(name) {
  const trimmed = name.trim();
  const { data: existing } = await supabase.from("industries").select("id").ilike("name", trimmed).maybeSingle();
  if (existing) return existing.id;
  const slug = await uniqueSlug("industries", trimmed);
  const { data, error } = await supabase.from("industries").insert({ name: trimmed, slug }).select("id").single();
  if (error) throw error;
  return data.id;
}

const csvText = readFileSync(csvPath, "utf8");
const { data: rows, errors } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
if (errors.length > 0) {
  console.error("CSV parse errors:", errors);
  process.exit(1);
}

let created = 0;
for (const row of rows) {
  try {
    const countryId = await findOrCreateCountry(row.country);
    const regionId = await findOrCreateRegion(countryId, row.region);
    const cityId = await findOrCreateCity(regionId, row.city);
    const industryIds = await Promise.all(
      row.industries.split(";").map((s) => s.trim()).filter(Boolean).map(findOrCreateIndustry)
    );
    const slug = await uniqueSlug("agencies", row.name);

    const { data: agency, error } = await supabase
      .from("agencies")
      .insert({
        name: row.name,
        slug,
        website: row.website || null,
        description: row.description || null,
        services: row.services.split(";").map((s) => s.trim()).filter(Boolean),
        founded_year: row.founded_year ? Number(row.founded_year) : null,
        team_size: row.team_size || null,
        city_id: cityId,
        data_source: row.data_source || "csv_import",
        verification_status: "unverified",
      })
      .select("id")
      .single();
    if (error) throw error;

    if (industryIds.length > 0) {
      await supabase.from("agency_industries").insert(industryIds.map((industry_id) => ({ agency_id: agency.id, industry_id })));
    }

    console.log(`Created: ${row.name} (${row.city}, ${row.country})`);
    created += 1;
  } catch (err) {
    console.error(`Failed: ${row.name} — ${err.message}`);
  }
}

console.log(`\nImported ${created} of ${rows.length} agencies as unverified.`);
