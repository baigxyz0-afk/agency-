import { type ReactNode } from "react";

type Tone = "neutral" | "accent" | "demo" | "sponsored" | "featured" | "partner";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-paper-dim text-ink-soft border-border-strong",
  accent: "bg-accent-soft text-accent border-accent/30",
  demo: "bg-paper-dim text-muted border-border-strong",
  sponsored: "bg-accent-green-soft text-accent-green border-accent-green/30",
  featured: "bg-accent-soft text-accent border-accent/30",
  partner: "bg-paper-dim text-ink-soft border-border-strong",
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
