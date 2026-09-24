import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { services, getServiceBySlug } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: "Worldwide",
  };

  const related = service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Section className="!pb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.slug}` },
          ]}
        />
        <Eyebrow>{service.category === "development" ? "Development" : "SEO"}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{service.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{service.summary}</p>
        <div className="mt-8 flex gap-4">
          <Button href="/contact">Discuss This Service</Button>
          <Button href="/process" variant="secondary">See Our Process</Button>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {service.description.map((paragraph, i) => (
              <p key={i} className="mt-4 first:mt-0 text-ink-soft leading-relaxed">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-10 font-display text-2xl">Key Capabilities</h2>
            <ul className="mt-4 space-y-2.5">
              {service.capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl">Deliverables</h2>
            <ul className="mt-4 space-y-2.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-paper-dim p-6">
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Technology</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span key={tech} className="border border-border-strong bg-surface px-2.5 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-l-2 border-accent pl-5">
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Business Outcome</h3>
              <p className="mt-2 text-ink-soft">{service.outcome}</p>
            </div>

            {related.length > 0 && (
              <div>
                <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Related Services</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/services/${r.slug}`} className="text-sm text-ink-soft hover:text-accent underline underline-offset-4 decoration-border-strong">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
