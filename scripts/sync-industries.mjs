// Syncs the 39 real industries already written in content/industries.ts into
// the Supabase `industries` table, so the DB-backed taxonomy (admin
// taxonomy page, directory search filters) matches what the site's content
// actually covers, instead of only whatever industries happened to get
// created via agency imports so far.
//
// Usage: node --env-file=.env.local scripts/sync-industries.mjs

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Mirrors content/industries.ts (kept as plain data here since that file is
// TypeScript with path-alias imports, not directly importable from a plain
// Node script).
const industries = [
  ["Roofing", "roofing"], ["Plumbing", "plumbing"], ["Real Estate", "real-estate"],
  ["Healthcare", "healthcare"], ["Legal", "legal"], ["E-commerce", "ecommerce"],
  ["HVAC", "hvac"], ["Construction", "construction"], ["Dental", "dental"],
  ["Restaurants", "restaurants"], ["Home Services", "home-services"], ["Insurance", "insurance"],
  ["Automotive", "automotive"], ["Hotels", "hotels"], ["SaaS", "saas"],
  ["Technology", "technology"], ["Finance", "finance"], ["Education", "education"],
  ["Fitness", "fitness"], ["Beauty", "beauty"], ["Solar", "solar"],
  ["Logistics", "logistics"], ["Manufacturing", "manufacturing"], ["Travel", "travel"],
  ["Professional Services", "professional-services"], ["Local Businesses", "local-businesses"],
  ["Landscaping", "landscaping"], ["Pest Control", "pest-control"], ["Moving & Storage", "moving-storage"],
  ["Cleaning Services", "cleaning-services"], ["Veterinary", "veterinary"], ["Chiropractic", "chiropractic"],
  ["Med Spa & Aesthetics", "med-spa-aesthetics"], ["Property Management", "property-management"],
  ["Photography & Videography", "photography-videography"], ["Nonprofits", "nonprofits"],
  ["Event Planning", "event-planning"], ["IT Services & MSP", "it-services-msp"], ["Pet Services", "pet-services"],
];

let created = 0;
let skipped = 0;

for (const [name, slug] of industries) {
  const { data: existing } = await supabase.from("industries").select("id").eq("slug", slug).maybeSingle();
  if (existing) {
    skipped += 1;
    continue;
  }
  const { error } = await supabase.from("industries").insert({ name, slug });
  if (error) {
    console.error(`Failed: ${name} — ${error.message}`);
    continue;
  }
  console.log(`Created: ${name}`);
  created += 1;
}

console.log(`\n${created} created, ${skipped} already existed. ${industries.length} total.`);
