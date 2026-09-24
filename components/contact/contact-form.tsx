"use client";

import { useActionState, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { initialContactState } from "@/lib/contact-form-state";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring"];

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-soft">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialContactState);
  const [renderedAt] = useState(() => Date.now().toString());

  if (state.status === "success") {
    return (
      <div className="border border-border bg-paper-dim p-8 text-center">
        <h3 className="font-display text-xl">Request received</h3>
        <p className="mt-2 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot — hidden from sighted and screen-reader users, bots often fill every field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="companyWebsiteConfirm">Leave this field empty</label>
        <input type="text" id="companyWebsiteConfirm" name="companyWebsiteConfirm" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={renderedAt} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.fieldErrors.name}>
          <input id="name" name="name" type="text" required className={inputClasses} />
        </Field>
        <Field label="Email" htmlFor="email" error={state.fieldErrors.email}>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </Field>
        <Field label="Company" htmlFor="company" error={state.fieldErrors.company}>
          <input id="company" name="company" type="text" className={inputClasses} />
        </Field>
        <Field label="Website" htmlFor="website" error={state.fieldErrors.website}>
          <input id="website" name="website" type="text" placeholder="example.com" className={inputClasses} />
        </Field>
        <Field label="Country" htmlFor="country" error={state.fieldErrors.country}>
          <input id="country" name="country" type="text" required className={inputClasses} />
        </Field>
        <Field label="Industry" htmlFor="industry" error={state.fieldErrors.industry}>
          <select id="industry" name="industry" required defaultValue="" className={inputClasses}>
            <option value="" disabled>Select an industry</option>
            {industries.map((i) => (
              <option key={i.slug} value={i.name}>{i.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="Service Required" htmlFor="serviceRequired" error={state.fieldErrors.serviceRequired}>
          <select id="serviceRequired" name="serviceRequired" required defaultValue="" className={inputClasses}>
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>
        <Field label="Budget Range" htmlFor="budgetRange" error={state.fieldErrors.budgetRange}>
          <select id="budgetRange" name="budgetRange" required defaultValue="" className={inputClasses}>
            <option value="" disabled>Select a range</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" htmlFor="timeline" error={state.fieldErrors.timeline}>
          <select id="timeline" name="timeline" required defaultValue="" className={inputClasses}>
            <option value="" disabled>Select a timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project Description" htmlFor="projectDescription" error={state.fieldErrors.projectDescription}>
        <textarea
          id="projectDescription"
          name="projectDescription"
          required
          rows={5}
          className={inputClasses}
          placeholder="What are you building, or what's underperforming?"
        />
      </Field>

      {state.status === "error" && state.message && (
        <p className="text-sm text-error" role="alert">{state.message}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Submitting…" : "Request a Project Consultation"}
      </Button>
    </form>
  );
}
