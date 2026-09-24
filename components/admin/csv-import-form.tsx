"use client";

import { useActionState } from "react";
import { importAgenciesCsv } from "@/app/admin/actions/agencies";
import { initialCsvImportState } from "@/lib/csv-import-state";
import { Button } from "@/components/ui/button";

export function CsvImportForm() {
  const [state, formAction, isPending] = useActionState(importAgenciesCsv, initialCsvImportState);

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <input
          type="file"
          name="file"
          accept=".csv,text/csv"
          required
          className="block w-full border border-border-strong bg-surface px-3.5 py-2.5 text-sm"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Importing…" : "Import CSV"}
        </Button>
      </form>

      {state.status !== "idle" && (
        <div className="mt-6 border border-border bg-paper-dim p-5">
          <p className="text-sm text-ink-soft">{state.message}</p>
          {state.failed.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-error">
              {state.failed.map((f) => (
                <li key={f.row}>Row {f.row}: {f.reason}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
