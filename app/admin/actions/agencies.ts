"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Papa from "papaparse";
import {
  createAgencyAdmin,
  updateAgencyAdmin,
  deleteAgencyAdmin,
  type AgencyInput,
} from "@/lib/directory/admin-queries";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/admin-form-state";
import type { CsvImportResult } from "@/lib/csv-import-state";

const agencySchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  website: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  services: z.string().trim().optional().or(z.literal("")),
  foundedYear: z.string().trim().optional().or(z.literal("")),
  teamSize: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().min(2, "Country is required."),
  region: z.string().trim().min(1, "State/region is required."),
  city: z.string().trim().min(1, "City is required."),
  industries: z.string().trim().min(1, "At least one industry is required."),
  dataSource: z.string().trim().optional().or(z.literal("")),
  verificationStatus: z.enum(["unverified", "pending", "verified"]),
  isFeatured: z.string().optional(),
  isSponsored: z.string().optional(),
});

function toAgencyInput(data: z.infer<typeof agencySchema>): AgencyInput {
  return {
    name: data.name,
    website: data.website ?? "",
    description: data.description ?? "",
    services: (data.services ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    founded_year: data.foundedYear ? Number(data.foundedYear) : null,
    team_size: data.teamSize ?? "",
    country: data.country,
    region: data.region,
    city: data.city,
    industries: data.industries.split(",").map((s) => s.trim()).filter(Boolean),
    data_source: data.dataSource ?? "admin",
    verification_status: data.verificationStatus,
    is_featured: data.isFeatured === "on",
    is_sponsored: data.isSponsored === "on",
  };
}

function parseFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
}

export async function createAgencyAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = agencySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: parseFieldErrors(parsed.error) };
  }

  let id: string;
  try {
    id = await createAgencyAdmin(toAgencyInput(parsed.data));
  } catch {
    return { status: "error", message: "Couldn't save the agency. Check Supabase is configured and try again.", fieldErrors: {} };
  }

  revalidatePath("/admin/agencies");
  redirect(`/admin/agencies/${id}`);
}

export async function updateAgencyAction(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = agencySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: parseFieldErrors(parsed.error) };
  }

  try {
    await updateAgencyAdmin(id, toAgencyInput(parsed.data));
    revalidatePath("/admin/agencies");
    revalidatePath(`/admin/agencies/${id}`);
    return { status: "success", message: "Saved.", fieldErrors: {} };
  } catch {
    return { status: "error", message: "Couldn't save the agency. Check Supabase is configured and try again.", fieldErrors: {} };
  }
}

export async function deleteAgencyAction(id: string) {
  await deleteAgencyAdmin(id);
  revalidatePath("/admin/agencies");
  redirect("/admin/agencies");
}

// ---------------------------------------------------------------------------
// CSV import
// ---------------------------------------------------------------------------

const csvRowSchema = z.object({
  name: z.string().trim().min(1),
  website: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  services: z.string().trim().optional().default(""),
  founded_year: z.string().trim().optional().default(""),
  team_size: z.string().trim().optional().default(""),
  country: z.string().trim().min(1),
  region: z.string().trim().min(1),
  city: z.string().trim().min(1),
  industries: z.string().trim().min(1),
  data_source: z.string().trim().optional().default(""),
});

export async function importAgenciesCsv(_prev: CsvImportResult, formData: FormData): Promise<CsvImportResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Choose a CSV file first.", created: 0, failed: [] };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase isn't configured yet.", created: 0, failed: [] };
  }

  const text = await file.text();
  const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });

  let created = 0;
  const failed: { row: number; reason: string }[] = [];

  for (let i = 0; i < parsed.data.length; i++) {
    const rowNumber = i + 2; // header is row 1
    const row = csvRowSchema.safeParse(parsed.data[i]);
    if (!row.success) {
      failed.push({ row: rowNumber, reason: row.error.issues[0]?.message ?? "Invalid row." });
      continue;
    }

    try {
      await createAgencyAdmin({
        name: row.data.name,
        website: row.data.website,
        description: row.data.description,
        services: row.data.services.split(";").map((s) => s.trim()).filter(Boolean),
        founded_year: row.data.founded_year ? Number(row.data.founded_year) : null,
        team_size: row.data.team_size,
        country: row.data.country,
        region: row.data.region,
        city: row.data.city,
        industries: row.data.industries.split(";").map((s) => s.trim()).filter(Boolean),
        data_source: row.data.data_source || "csv_import",
        verification_status: "unverified",
        is_featured: false,
        is_sponsored: false,
      });
      created += 1;
    } catch {
      failed.push({ row: rowNumber, reason: "Couldn't save this row — check the data and try again." });
    }
  }

  revalidatePath("/admin/agencies");

  return {
    status: failed.length === 0 ? "success" : "error",
    message: `Imported ${created} of ${parsed.data.length} rows.`,
    created,
    failed,
  };
}
