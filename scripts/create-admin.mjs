// One-time setup script: creates a Supabase Auth user and marks them as an
// admin (inserts a row into admin_profiles). This is how the invite-only
// admin dashboard gets its first (or next) account — there's no public
// sign-up form on purpose.
//
// Usage (requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, e.g. from .env.local):
//   node --env-file=.env.local scripts/create-admin.mjs you@example.com "a-strong-password"

import { createClient } from "@supabase/supabase-js";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (createError) {
  console.error("Failed to create user:", createError.message);
  process.exit(1);
}

const { error: profileError } = await supabase
  .from("admin_profiles")
  .insert({ id: created.user.id, email, role: "admin" });

if (profileError) {
  console.error("User was created but admin_profiles insert failed:", profileError.message);
  console.error(`You can insert it manually: id=${created.user.id}, email=${email}`);
  process.exit(1);
}

console.log(`Admin account created for ${email}. Sign in at /admin/login.`);
