import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Web development and SEO services built around how each industry actually searches, converts, and competes locally.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }]} />
        <Eyebrow>Industries</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Industry-specific development and SEO.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Search behavior, trust signals, and conversion paths differ by industry. The
          pages below cover the industries we have documented playbooks for — more are
          added as we build them out with genuine, industry-specific detail.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="border border-border bg-surface p-6 transition-colors hover:border-ink"
            >
              <h2 className="font-display text-lg">{industry.name}</h2>
              <p className="mt-2 text-sm text-muted">{industry.heroSummary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
