"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QuickInquiryForm } from "./quick-inquiry-form";

export function QuickInquiryWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Avoid duplicating the full contact form right next to itself.
  if (pathname?.startsWith("/contact")) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="quick-inquiry-panel"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 border border-r-0 border-ink bg-ink px-2.5 py-4 text-paper shadow-sm transition-transform hover:-translate-x-0.5 sm:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="rotate-180 text-xs font-medium tracking-[0.14em] uppercase">Quick Inquiry</span>
      </button>

      {/* Mobile fallback: a bottom-anchored bar instead of a side tab, since
          a vertical edge tab doesn't work well at phone widths. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="quick-inquiry-panel"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-ink px-4 py-3 text-center text-sm font-medium tracking-wide text-paper sm:hidden"
      >
        Quick Inquiry
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />
          <div
            id="quick-inquiry-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Quick inquiry"
            className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto border-l border-border bg-surface p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] uppercase text-accent">Quick Inquiry</p>
                <h2 className="mt-1 font-display text-xl">Send us a message</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-2xl leading-none text-muted hover:text-ink"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm text-muted">
              For a full project brief, use the{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-accent">Contact page</Link>{" "}
              instead — this is for quick questions.
            </p>

            <div className="mt-6">
              <QuickInquiryForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
