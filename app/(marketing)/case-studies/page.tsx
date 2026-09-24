import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Long-form breakdowns of how we approach development and SEO problems, end to end.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }]} />
        <Eyebrow>Case Studies</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Case studies</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          The study below is a sample illustrating our methodology, not a completed
          client engagement — no metrics in it are real. Real, verifiable case
          studies replace these as client work is completed and cleared for
          publication.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="block border border-border bg-surface p-7 transition-colors hover:border-ink"
            >
              <Badge tone="demo">Sample Case Study</Badge>
              <h2 className="mt-3 font-display text-xl">{study.title}</h2>
              <p className="mt-2 text-sm text-muted">{study.industry}</p>
              <p className="mt-3 text-sm text-ink-soft">{study.overview}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
