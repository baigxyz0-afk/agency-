import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.overview,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Section className="!pb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies" },
            { label: study.title, href: `/case-studies/${study.slug}` },
          ]}
        />
        <Badge tone="demo">Sample Case Study — illustrative, not a real client engagement</Badge>
        <Eyebrow>{study.industry}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{study.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{study.overview}</p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <CaseSection title="Challenge" body={study.challenge} />
            <CaseListSection title="Objectives" items={study.objectives} />
            <CaseSection title="Strategy" body={study.strategy} />
            <CaseSection title="UX/UI" body={study.uxUi} />
            <CaseSection title="Development" body={study.development} />
            <CaseSection title="SEO" body={study.seo} />
            <CaseListSection title="Technical Implementation" items={study.technicalImplementation} />
            <CaseSection title="How We'd Measure This" body={study.measurementApproach} />
            <CaseSection title="Lessons" body={study.lessons} />
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-paper-dim p-6">
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Technology</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span key={tech} className="border border-border-strong bg-surface px-2.5 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-14 border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Facing a similar problem?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Start a Project</Button>
            <Button href="/case-studies" variant="secondary">More Case Studies</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3 text-ink-soft leading-relaxed">{body}</p>
    </div>
  );
}

function CaseListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-soft">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
