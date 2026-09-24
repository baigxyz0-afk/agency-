import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclosures on portfolio demo projects, case study samples, and directory listing methodology.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }]} />
      <Eyebrow>Legal</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Disclaimer</h1>

      <div className="prose mt-10 max-w-3xl space-y-8 text-ink-soft">
        <div>
          <h2 className="font-display text-2xl text-ink">Demo projects and sample case studies</h2>
          <p className="mt-3 leading-relaxed">
            Projects on the{" "}
            <Link href="/work" className="underline underline-offset-4 decoration-border-strong hover:text-accent">Work</Link>{" "}
            page and the sample entry on the{" "}
            <Link href="/case-studies" className="underline underline-offset-4 decoration-border-strong hover:text-accent">Case Studies</Link>{" "}
            page are labeled &ldquo;Demo Project&rdquo; or &ldquo;Sample Case
            Study&rdquo; where they are not completed client engagements. No
            client names, results, or statistics in those entries are real.
            They exist to illustrate our approach and technology choices.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">No guaranteed results</h2>
          <p className="mt-3 leading-relaxed">
            We do not guarantee specific search rankings, traffic increases, or
            revenue outcomes. Search engine algorithms, market conditions, and
            factors outside our control all affect results. Any figures we do
            report from real client work reflect that specific engagement and
            are not a guarantee of similar results for a different business.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Directory methodology</h2>
          <p className="mt-3 leading-relaxed">
            When the{" "}
            <Link href="/directory" className="underline underline-offset-4 decoration-border-strong hover:text-accent">Directory</Link>{" "}
            launches, listings will be sourced from verified, submitted, or
            publicly available business information — never fabricated.
            Sponsored placements will be labeled &ldquo;Sponsored,&rdquo; and
            editorially selected placements will be labeled &ldquo;Featured
            Partner.&rdquo; Sponsorship does not affect organic ranking
            factors.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about any content on this site can be sent to{" "}
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
