import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Process",
  description: "Our six-step process for development and SEO engagements, from discovery through launch and growth.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process", href: "/process" }]} />
        <Eyebrow>Process</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">A documented, repeatable process.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          The same six steps run on every engagement, scaled to project size. Knowing
          what happens at each stage — and what you receive at the end of it — is part
          of how we keep development and SEO accountable to the same plan.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="divide-y divide-border border-t border-border">
          {processSteps.map((step) => (
            <div key={step.slug} id={step.slug} className="grid gap-6 py-12 lg:grid-cols-[auto_1fr_1fr]">
              <span className="font-display text-4xl text-accent">{step.number}</span>
              <div>
                <h2 className="font-display text-2xl">{step.title}</h2>
                <p className="mt-3 text-ink-soft leading-relaxed">{step.summary}</p>
                <p className="mt-4 text-sm text-muted">
                  <span className="font-medium text-ink-soft">Communication: </span>
                  {step.communication}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">What happens</h3>
                  <ul className="mt-2 space-y-1.5">
                    {step.whatHappens.map((item) => (
                      <li key={item} className="text-sm text-ink-soft">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">You receive</h3>
                  <ul className="mt-2 space-y-1.5">
                    {step.clientReceives.map((item) => (
                      <li key={item} className="text-sm text-ink-soft">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Ready to start at Discovery?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Start a Project</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
