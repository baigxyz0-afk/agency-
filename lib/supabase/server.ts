import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key so contact-form inserts work
// even with row-level security enabled on the table — never import this file
// from a Client Component or expose the service role key to the browser.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
