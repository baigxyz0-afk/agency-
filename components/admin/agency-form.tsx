"use client";

import { useActionState } from "react";
import { initialActionState, type ActionState } from "@/lib/admin-form-state";
import { Button } from "@/components/ui/button";
import type { Agency } from "@/lib/directory/types";

const inputClasses =
  "w-full border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

function Field({ label, htmlFor, error, children, hint }: { label: string; htmlFor: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-soft">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
    </div>
  );
}

export function AgencyForm({
  agency,
  action,
}: {
  agency?: Agency;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Agency Name" htmlFor="name" error={state.fieldErrors.name}>
          <input id="name" name="name" type="text" defaultValue={agency?.name} required className={inputClasses} />
        </Field>
        <Field label="Website" htmlFor="website" error={state.fieldErrors.website}>
          <input id="website" name="website" type="text" defaultValue={agency?.website ?? ""} placeholder="https://example.com" className={inputClasses} />
        </Field>
      </div>

      <Field label="Description" htmlFor="description" error={state.fieldErrors.description}>
        <textarea id="description" name="description" rows={4} defaultValue={agency?.description ?? ""} className={inputClasses} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Country" htmlFor="country" error={state.fieldErrors.country}>
          <input id="country" name="country" type="text" defaultValue={agency?.location?.country.name} required className={inputClasses} />
        </Field>
        <Field label="State / Region" htmlFor="region" error={state.fieldErrors.region}>
          <input id="region" name="region" type="text" defaultValue={agency?.location?.region.name} required className={inputClasses} />
        </Field>
        <Field label="City" htmlFor="city" error={state.fieldErrors.city}>
          <input id="city" name="city" type="text" defaultValue={agency?.location?.city.name} required className={inputClasses} />
        </Field>
      </div>

      <Field
        label="Industries"
        htmlFor="industries"
        hint="Comma-separated. New industries are created automatically."
        error={state.fieldErrors.industries}
      >
        <input
          id="industries"
          name="industries"
          type="text"
          defaultValue={agency?.industries.map((i) => i.name).join(", ")}
          placeholder="Roofing, Home Services"
          required
          className={inputClasses}
        />
      </Field>

      <Field
        label="Services"
        htmlFor="services"
        hint="Comma-separated free-form tags, e.g. Web Development, Local SEO"
        error={state.fieldErrors.services}
      >
        <input
          id="services"
          name="services"
          type="text"
          defaultValue={agency?.services.join(", ")}
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Founded Year" htmlFor="foundedYear" error={state.fieldErrors.foundedYear}>
          <input id="foundedYear" name="foundedYear" type="number" defaultValue={agency?.founded_year ?? ""} className={inputClasses} />
        </Field>
        <Field label="Team Size" htmlFor="teamSize" error={state.fieldErrors.teamSize}>
          <input id="teamSize" name="teamSize" type="text" defaultValue={agency?.team_size ?? ""} placeholder="1-10" className={inputClasses} />
        </Field>
        <Field label="Data Source" htmlFor="dataSource" hint="Where this listing came from" error={state.fieldErrors.dataSource}>
          <input id="dataSource" name="dataSource" type="text" defaultValue={agency?.data_source ?? "admin"} className={inputClasses} />
        </Field>
      </div>

      <div className="border border-border bg-paper-dim p-6">
        <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Publication</h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <Field label="Verification Status" htmlFor="verificationStatus" hint="Only 'Verified' listings are publicly visible.">
            <select id="verificationStatus" name="verificationStatus" defaultValue={agency?.verification_status ?? "unverified"} className={inputClasses}>
              <option value="unverified">Unverified</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
            <input type="checkbox" name="isFeatured" defaultChecked={agency?.is_featured} className="h-4 w-4" />
            Featured Partner
          </label>
          <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
            <input type="checkbox" name="isSponsored" defaultChecked={agency?.is_sponsored} className="h-4 w-4" />
            Sponsored Listing
          </label>
        </div>
      </div>

      {state.status === "error" && state.message && <p className="text-sm text-error">{state.message}</p>}
      {state.status === "success" && state.message && <p className="text-sm text-success">{state.message}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : agency ? "Save Changes" : "Create Agency"}
      </Button>
    </form>
  );
}
