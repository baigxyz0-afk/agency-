"use client";

import { useActionState } from "react";
import { createAgencyAction } from "@/app/admin/actions/agencies";
import { initialActionState } from "@/lib/admin-form-state";

const inputClasses =
  "w-full border border-border-strong bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

export function QuickAddAgencyForm() {
  const [state, formAction, isPending] = useActionState(createAgencyAction, initialActionState);

  return (
    <form action={formAction} className="space-y-2.5">
      <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Quick Add Agency</p>

      <input name="name" type="text" placeholder="Agency name" required className={inputClasses} />
      {state.fieldErrors.name && <p className="text-xs text-error">{state.fieldErrors.name}</p>}

      <input name="website" type="text" placeholder="Website (optional)" className={inputClasses} />

      <input name="country" type="text" placeholder="Country" required className={inputClasses} />
      {state.fieldErrors.country && <p className="text-xs text-error">{state.fieldErrors.country}</p>}

      <input name="region" type="text" placeholder="State / Region" required className={inputClasses} />
      {state.fieldErrors.region && <p className="text-xs text-error">{state.fieldErrors.region}</p>}

      <input name="city" type="text" placeholder="City" required className={inputClasses} />
      {state.fieldErrors.city && <p className="text-xs text-error">{state.fieldErrors.city}</p>}

      <input name="industries" type="text" placeholder="Industries (comma-separated)" required className={inputClasses} />
      {state.fieldErrors.industries && <p className="text-xs text-error">{state.fieldErrors.industries}</p>}

      {/* Sensible defaults for fields the compact form doesn't expose — the
          full edit page (redirected to on success) covers the rest. */}
      <input type="hidden" name="description" value="" />
      <input type="hidden" name="services" value="" />
      <input type="hidden" name="foundedYear" value="" />
      <input type="hidden" name="teamSize" value="" />
      <input type="hidden" name="dataSource" value="admin (quick add)" />
      <input type="hidden" name="verificationStatus" value="unverified" />

      {state.status === "error" && state.message && <p className="text-xs text-error">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full border border-ink bg-ink px-3 py-1.5 text-xs font-medium text-paper disabled:opacity-50"
      >
        {isPending ? "Adding…" : "Add Agency"}
      </button>
    </form>
  );
}
