import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Session-aware client for Server Components/Actions under /admin — reads and
// writes the Supabase Auth session cookie. Returns null if Supabase auth
// hasn't been configured yet (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY unset).
export async function getSupabaseAuthServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render (not an Action/Route
          // Handler) — cookies are read-only there. Middleware is
          // responsible for refreshing the session in that case.
        }
      },
    },
  });
}
