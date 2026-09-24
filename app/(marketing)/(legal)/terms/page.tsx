import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service", href: "/terms" }]} />
      <Eyebrow>Legal</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: [add date on launch]. This is a template — have it
        reviewed by counsel before publishing, and pair it with a separate
        signed statement of work for actual client engagements.
      </p>

      <div className="prose mt-10 max-w-3xl space-y-8 text-ink-soft">
        <div>
          <h2 className="font-display text-2xl text-ink">Use of this website</h2>
          <p className="mt-3 leading-relaxed">
            This website is provided for informational purposes about {siteConfig.name}&apos;s
            services. You agree not to misuse the site, attempt to gain
            unauthorized access to it, or use automated tools to scrape it in a
            way that degrades service for other visitors.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Services and engagements</h2>
          <p className="mt-3 leading-relaxed">
            Descriptions of services on this site are general. Actual project
            scope, timeline, deliverables, and pricing for any engagement are
            governed by a separate signed proposal or statement of work, not by
            this page.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Intellectual property</h2>
          <p className="mt-3 leading-relaxed">
            Content on this site — copy, design, and code — is the property of{" "}
            {siteConfig.name} unless otherwise noted, and may not be reproduced
            without permission.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Disclaimer</h2>
          <p className="mt-3 leading-relaxed">
            See our{" "}
            <Link href="/disclaimer" className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              Disclaimer
            </Link>{" "}
            page for limitations on claims made about outcomes and results.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about these terms can be sent to{" "}
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
