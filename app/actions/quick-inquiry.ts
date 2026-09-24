"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { QuickInquiryState } from "@/lib/quick-inquiry-state";

const quickInquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(10, "Add a few more details (at least 10 characters)."),
  pagePath: z.string().trim().optional().or(z.literal("")),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
  renderedAt: z.string(),
});

const MIN_SUBMIT_MS = 1200;

export async function submitQuickInquiry(
  _prevState: QuickInquiryState,
  formData: FormData
): Promise<QuickInquiryState> {
  const parsed = quickInquirySchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  if (data.website) {
    // Honeypot tripped — report success without writing anything.
    return { status: "success", message: "Thanks — we'll be in touch shortly.", fieldErrors: {} };
  }

  const renderedAt = Number(data.renderedAt);
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_SUBMIT_MS) {
    return { status: "error", message: "Your submission couldn't be processed. Please try again.", fieldErrors: {} };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message: "This form isn't connected to a database yet — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      fieldErrors: {},
    };
  }

  const { error } = await supabase.from("quick_inquiries").insert({
    name: data.name,
    email: data.email,
    message: data.message,
    page_path: data.pagePath || null,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong submitting the form. Please try again or email us directly.",
      fieldErrors: {},
    };
  }

  return { status: "success", message: "Thanks — we've received your message and will follow up shortly.", fieldErrors: {} };
}
