"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions/auth";
import { initialActionState } from "@/lib/admin-form-state";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialActionState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-soft">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className={`mt-1.5 ${inputClasses}`} />
        {state.fieldErrors.email && <p className="mt-1.5 text-sm text-error">{state.fieldErrors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink-soft">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={`mt-1.5 ${inputClasses}`} />
        {state.fieldErrors.password && <p className="mt-1.5 text-sm text-error">{state.fieldErrors.password}</p>}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-error" role="alert">{state.message}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full justify-center">
        {isPending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
