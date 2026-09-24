import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookie Policy", href: "/cookies" }]} />
      <Eyebrow>Legal</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Cookie Policy</h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: [add date on launch]. This is a template — have it
        reviewed by counsel, and update it if/when analytics or advertising
        cookies are actually added to the site.
      </p>

      <div className="prose mt-10 max-w-3xl space-y-8 text-ink-soft">
        <div>
          <h2 className="font-display text-2xl text-ink">Current state</h2>
          <p className="mt-3 leading-relaxed">
            As shipped, this site does not load any analytics, advertising, or
            tracking cookies. It uses only strictly necessary technical
            storage required for the site to function (for example, remembering
            that you&apos;ve submitted a form).
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">If analytics are added</h2>
          <p className="mt-3 leading-relaxed">
            If tools like Google Analytics or Google Search Console tracking are
            enabled in the future, this policy will be updated to name the
            specific tools, what they collect, and how to opt out — with a
            consent mechanism shown before any non-essential cookie is set,
            where required by applicable law.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
