"use server";

import { revalidatePath } from "next/cache";
import {
  findOrCreateIndustry,
  deleteIndustry,
  deleteCountry,
  deleteRegion,
  deleteCity,
} from "@/lib/directory/admin-queries";

export async function createIndustryAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (name) await findOrCreateIndustry(name);
  revalidatePath("/admin/taxonomy");
}

export async function deleteIndustryAction(id: string) {
  await deleteIndustry(id);
  revalidatePath("/admin/taxonomy");
}

export async function deleteCountryAction(id: string) {
  await deleteCountry(id);
  revalidatePath("/admin/taxonomy");
}

export async function deleteRegionAction(id: string) {
  await deleteRegion(id);
  revalidatePath("/admin/taxonomy");
}

export async function deleteCityAction(id: string) {
  await deleteCity(id);
  revalidatePath("/admin/taxonomy");
}
