import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { industries, getIndustryBySlug } from "@/content/industries";
import { TopAgencies } from "@/components/industries/top-agencies";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Web Development & SEO Services`,
    description: industry.heroSummary,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.name} Web Development & SEO`,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: "Worldwide",
    serviceType: `${industry.name} web development and SEO`,
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {industry.faqs.length > 0 && <JsonLd data={faqJsonLd} />}

      <Section className="!pb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: industry.name, href: `/industries/${industry.slug}` },
          ]}
        />
        <Eyebrow>Industry</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{industry.name} Web Development &amp; SEO Services</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{industry.heroSummary}</p>
        <div className="mt-8 flex gap-4">
          <Button href="/contact">Discuss Your {industry.name} Project</Button>
        </div>
      </Section>

      <Section className="!pt-0 space-y-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl">Overview</h2>
          {industry.overview.map((p, i) => (
            <p key={i} className="mt-4 text-ink-soft leading-relaxed">{p}</p>
          ))}
        </div>

        <TwoColList title="Common Digital Problems" items={industry.problems} />
        <TwoColList title="Website Requirements" items={industry.websiteRequirements} />
        <TwoColList title="SEO Opportunities" items={industry.seoOpportunities} />
        <TwoColList title="Development Solutions" items={industry.developmentSolutions} />
        <TwoColList title="Conversion Optimization" items={industry.conversionFocus} />
        <TwoColList title="Local SEO Strategy" items={industry.localSeoStrategy} />

        <div>
          <h2 className="font-display text-2xl">Relevant Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {industry.technologies.map((tech) => (
              <span key={tech} className="border border-border-strong bg-paper-dim px-3 py-1.5 text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl">Example Project Types</h2>
          <ul className="mt-4 space-y-2.5 max-w-2xl">
            {industry.projectTypes.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <TopAgencies industryName={industry.name} />

        {industry.faqs.length > 0 && (
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl">Frequently Asked Questions</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {industry.faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-ink-soft leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Ready to discuss a {industry.name.toLowerCase()} project?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Request a Project Consultation</Button>
            <Button href="/work" variant="secondary">View Our Work</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function TwoColList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
