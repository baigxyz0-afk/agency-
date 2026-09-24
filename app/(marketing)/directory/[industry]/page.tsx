import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { getIndustryBySlug as getDirectoryIndustryBySlug, getCountriesForIndustry } from "@/lib/directory/public-queries";
import { getIndustryBySlug as getContentIndustryBySlug } from "@/content/industries";
import { serviceAreas } from "@/content/service-areas";
import { slugify } from "@/lib/slugify";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const content = getContentIndustryBySlug(slug);
  const directoryIndustry = await getDirectoryIndustryBySlug(slug);
  if (!content && !directoryIndustry) return {};

  const name = content?.name ?? directoryIndustry!.name;

  return {
    title: `${name} Web Development & SEO`,
    description: content?.heroSummary ?? `${name} development and SEO services and agency directory.`,
    alternates: { canonical: `/directory/${slug}` },
  };
}

export default async function IndustryDirectoryPage({ params }: Props) {
  const { industry: slug } = await params;
  const content = getContentIndustryBySlug(slug);
  const directoryIndustry = await getDirectoryIndustryBySlug(slug);
  if (!content && !directoryIndustry) notFound();

  const name = content?.name ?? directoryIndustry!.name;
  const countries = directoryIndustry ? await getCountriesForIndustry(directoryIndustry.id) : [];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} Web Development & SEO`,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: serviceAreas.flatMap((r) => r.countries.map((c) => c.country)),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Section className="!pb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Directory", href: "/directory" },
            { label: name, href: `/directory/${slug}` },
          ]}
        />
        <Eyebrow>Directory</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{name} Web Development &amp; SEO</h1>
        {content && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{content.heroSummary}</p>}
      </Section>

      <Section className="!pt-0">
        <div className="border border-ink bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink font-display text-sm">1</span>
              <Badge tone="featured">Featured — Not an Independent Ranking</Badge>
            </div>
          </div>

          <h2 className="mt-4 font-display text-2xl">{siteConfig.name}</h2>
          <p className="mt-1 text-sm text-muted">Remote — serving {serviceAreas.length} regions worldwide</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Web Development", "SEO", `${name} Websites`].map((tag) => (
              <span key={tag} className="border border-border-strong bg-paper-dim px-2.5 py-1 text-xs">{tag}</span>
            ))}
          </div>

          <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">
            {content?.heroSummary ?? `We build and optimize websites for ${name.toLowerCase()} businesses.`}{" "}
            {content && content.overview[0]}
          </p>

          <div className="mt-6">
            <Button href="/contact">Get a Quote</Button>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
          This directory is published by {siteConfig.name}, and we list ourselves first on every
          industry page — clearly labeled, not the result of independent research. We&apos;ve never
          taken payment to include, move, or exclude any other listing. Verified third-party agencies
          appear separately below, ranked only by real verification and review data — never paid
          placement. See our{" "}
          <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">
            directory methodology
          </Link>
          .
        </p>
      </Section>

      {content && (
        <Section className="!pt-0">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl">How We Approach {name}</h2>
            {content.overview.map((p, i) => (
              <p key={i} className="mt-4 text-ink-soft leading-relaxed">{p}</p>
            ))}
          </div>
        </Section>
      )}

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">Where We Work</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          We work with {name.toLowerCase()} businesses remotely, wherever they&apos;re based. These are the
          regions we currently serve clients in most often — not a directory of local offices.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((region) => (
            <div key={region.region} className="border border-border bg-surface p-5">
              <h3 className="font-display text-base">{region.region}</h3>
              <div className="mt-3 space-y-2">
                {region.countries.map((c) => (
                  <div key={c.country}>
                    <Link
                      href={`/directory/${slug}/${slugify(c.country)}`}
                      className="text-xs font-medium uppercase tracking-wide text-muted hover:text-accent"
                    >
                      {c.country} →
                    </Link>
                    <p className="mt-1 text-sm text-ink-soft">{c.cities.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">Verified {name} Agencies</h2>
        {countries.length > 0 ? (
          <>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Other agencies we&apos;ve independently verified, by country.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map(({ country, count }) => (
                <Link
                  key={country.id}
                  href={`/directory/${slug}/${country.slug}`}
                  className="border border-border bg-surface p-6 transition-colors hover:border-ink"
                >
                  <h3 className="font-display text-lg">{country.name}</h3>
                  <p className="mt-1 text-sm text-muted">{count} {count === 1 ? "agency" : "agencies"}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-6 max-w-xl border border-border bg-paper-dim p-6 text-ink-soft">
            No other verified {name.toLowerCase()} agencies are listed yet. We only add a listing once
            we&apos;ve verified it&apos;s real — see our{" "}
            <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">methodology</Link>.
          </div>
        )}
      </Section>

      <Section className="!pt-0">
        <div className="border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Need {name.toLowerCase()} development or SEO help?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Tell us about your project and we&apos;ll follow up with next steps.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Request a Project Consultation</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
