import { createClient } from "@supabase/supabase-js";

// Anonymous, read-only client for public directory pages — respects the RLS
// policies in supabase/phase2-directory-schema.sql (verified agencies only,
// open reads on locations/industries). Never used for writes.
export function getSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
