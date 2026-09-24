"use client";

import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { submitQuickInquiry } from "@/app/actions/quick-inquiry";
import { initialQuickInquiryState } from "@/lib/quick-inquiry-state";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

export function QuickInquiryForm() {
  const [state, formAction, isPending] = useActionState(submitQuickInquiry, initialQuickInquiryState);
  const [renderedAt] = useState(() => Date.now().toString());
  const pathname = usePathname();

  if (state.status === "success") {
    return (
      <div className="border border-border bg-paper-dim p-6 text-center">
        <h3 className="font-display text-lg">Message sent</h3>
        <p className="mt-2 text-sm text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="qi-website">Leave this field empty</label>
        <input type="text" id="qi-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input type="hidden" name="pagePath" value={pathname} />

      <div>
        <label htmlFor="qi-name" className="block text-sm font-medium text-ink-soft">Name</label>
        <input id="qi-name" name="name" type="text" required className={`mt-1.5 ${inputClasses}`} />
        {state.fieldErrors.name && <p className="mt-1.5 text-sm text-error">{state.fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="qi-email" className="block text-sm font-medium text-ink-soft">Email</label>
        <input id="qi-email" name="email" type="email" required className={`mt-1.5 ${inputClasses}`} />
        {state.fieldErrors.email && <p className="mt-1.5 text-sm text-error">{state.fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="qi-message" className="block text-sm font-medium text-ink-soft">Message</label>
        <textarea
          id="qi-message"
          name="message"
          required
          rows={4}
          placeholder="What are you looking for help with?"
          className={`mt-1.5 ${inputClasses}`}
        />
        {state.fieldErrors.message && <p className="mt-1.5 text-sm text-error">{state.fieldErrors.message}</p>}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-error" role="alert">{state.message}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full justify-center">
        {isPending ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}
