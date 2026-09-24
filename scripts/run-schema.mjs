// One-time schema setup: runs supabase/schema.sql and
// supabase/phase2-directory-schema.sql against the real database via the
// direct (non-pooled) Postgres connection.
//
// Usage: node --env-file=.env.local scripts/run-schema.mjs

import { readFileSync } from "node:fs";
import { Client } from "pg";

const rawConnectionString = process.env.POSTGRES_URL_NON_POOLING;
if (!rawConnectionString) {
  console.error("Missing POSTGRES_URL_NON_POOLING in the environment.");
  process.exit(1);
}

const files = ["supabase/schema.sql", "supabase/phase2-directory-schema.sql"];

// Strip the sslmode query param — it otherwise overrides the explicit `ssl`
// option below. The connection is still TLS-encrypted to the official
// Supabase host; we skip full chain verification because Node's trust store
// doesn't resolve Supabase's pooler cert chain cleanly in this environment.
const connectionString = rawConnectionString.replace(/[?&]sslmode=[^&]*/, "");
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();

try {
  for (const file of files) {
    console.log(`Running ${file}...`);
    const sql = readFileSync(file, "utf8");
    await client.query(sql);
    console.log(`  done.`);
  }
  console.log("Schema setup complete.");
} catch (err) {
  console.error("Schema setup failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
