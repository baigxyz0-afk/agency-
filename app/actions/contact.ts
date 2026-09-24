"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactFormState } from "@/lib/contact-form-state";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(300)
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^https?:\/\/.+/.test(val) || /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(val), {
      message: "Enter a valid website (e.g. example.com).",
    }),
  country: z.string().trim().min(2, "Enter your country."),
  industry: z.string().trim().min(1, "Select an industry."),
  serviceRequired: z.string().trim().min(1, "Select a service."),
  budgetRange: z.string().trim().min(1, "Select a budget range."),
  projectDescription: z.string().trim().min(20, "Add a few more details about the project (at least 20 characters)."),
  timeline: z.string().trim().min(1, "Select a timeline."),
  // Honeypot: real users never see or fill this field.
  companyWebsiteConfirm: z.string().max(0).optional().or(z.literal("")),
  renderedAt: z.string(),
});

const MIN_SUBMIT_MS = 1500;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot tripped — silently report success without writing anything.
  if (data.companyWebsiteConfirm) {
    return { status: "success", message: "Thanks — we'll be in touch shortly.", fieldErrors: {} };
  }

  const renderedAt = Number(data.renderedAt);
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_SUBMIT_MS) {
    return {
      status: "error",
      message: "Your submission couldn't be processed. Please try again.",
      fieldErrors: {},
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "This form isn't connected to a database yet — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable submissions.",
      fieldErrors: {},
    };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    website: data.website || null,
    country: data.country,
    industry: data.industry,
    service_required: data.serviceRequired,
    budget_range: data.budgetRange,
    project_description: data.projectDescription,
    timeline: data.timeline,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong submitting the form. Please try again or email us directly.",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: "Thanks — we've received your project details and will follow up shortly.",
    fieldErrors: {},
  };
}
