"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseAuthServerClient } from "@/lib/supabase/auth-server";
import type { ActionState } from "@/lib/admin-form-state";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const supabase = await getSupabaseAuthServerClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "Admin login isn't configured yet — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      fieldErrors: {},
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return { status: "error", message: "Incorrect email or password.", fieldErrors: {} };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return {
      status: "error",
      message: "This account isn't set up as an admin. See scripts/create-admin.mjs.",
      fieldErrors: {},
    };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await getSupabaseAuthServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
