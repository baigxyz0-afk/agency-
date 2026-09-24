import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { getAgencyBySlug } from "@/lib/directory/public-queries";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) return {};

  return {
    title: agency.name,
    description: agency.description ?? `${agency.name} — verified directory listing.`,
    alternates: { canonical: `/directory/agency/${agency.slug}` },
  };
}

export default async function AgencyProfilePage({ params }: Props) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: agency.name,
    url: agency.website ?? undefined,
    description: agency.description ?? undefined,
    address: agency.location
      ? {
          "@type": "PostalAddress",
          addressLocality: agency.location.city.name,
          addressRegion: agency.location.region.name,
          addressCountry: agency.location.country.name,
        }
      : undefined,
    aggregateRating:
      agency.rating != null
        ? { "@type": "AggregateRating", ratingValue: agency.rating, reviewCount: agency.review_count }
        : undefined,
  };

  return (
    <Section>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: agency.name, href: `/directory/agency/${agency.slug}` },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2">
        {agency.is_featured && <Badge tone="featured">Featured Partner</Badge>}
        {agency.is_sponsored && <Badge tone="sponsored">Sponsored</Badge>}
        <Badge tone="accent">Verified</Badge>
      </div>

      <Eyebrow>{agency.industries.map((i) => i.name).join(", ")}</Eyebrow>
      <h1 className="max-w-2xl text-4xl sm:text-5xl">{agency.name}</h1>
      {agency.location && (
        <p className="mt-3 text-lg text-ink-soft">
          {agency.location.city.name}, {agency.location.region.name}, {agency.location.country.name}
        </p>
      )}

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {agency.description && <p className="text-ink-soft leading-relaxed">{agency.description}</p>}

          {agency.services.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl">Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agency.services.map((service) => (
                  <span key={service} className="border border-border-strong bg-paper-dim px-3 py-1.5 text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-border bg-paper-dim p-6">
            <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {agency.website && (
                <div>
                  <dt className="text-muted">Website</dt>
                  <dd>
                    <a href={agency.website} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline underline-offset-4">
                      {agency.website.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
              {agency.founded_year && (
                <div>
                  <dt className="text-muted">Founded</dt>
                  <dd>{agency.founded_year}</dd>
                </div>
              )}
              {agency.team_size && (
                <div>
                  <dt className="text-muted">Team Size</dt>
                  <dd>{agency.team_size}</dd>
                </div>
              )}
              {agency.rating != null && (
                <div>
                  <dt className="text-muted">Rating</dt>
                  <dd>★ {agency.rating.toFixed(1)} ({agency.review_count} reviews)</dd>
                </div>
              )}
              {agency.last_verified_at && (
                <div>
                  <dt className="text-muted">Last Verified</dt>
                  <dd>{new Date(agency.last_verified_at).toLocaleDateString()}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      <p className="mt-12 text-xs text-muted">
        Listed under {siteConfig.name}&apos;s{" "}
        <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">directory methodology</Link>.
      </p>
    </Section>
  );
}
