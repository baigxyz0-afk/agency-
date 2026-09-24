import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { AgencyCard } from "@/components/directory/agency-card";
import { getFeaturedAgencies } from "@/lib/directory/public-queries";
import { industries } from "@/content/industries";
import { serviceAreas } from "@/content/service-areas";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Directory",
  description: "Development and SEO services by industry and location, plus a directory of verified agencies.",
  alternates: { canonical: "/directory" },
};

export default async function DirectoryPage() {
  const featured = await getFeaturedAgencies();

  const websiteSearchJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${siteConfig.url}/directory`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/directory/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteSearchJsonLd} />
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory", href: "/directory" }]} />
        <Eyebrow>Directory</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Development and SEO help, by industry.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Browse by industry to see how we approach it and where we work, or search the
          directory for other verified agencies. Nothing here is fabricated — see our{" "}
          <Link href="/disclaimer" className="underline underline-offset-4 decoration-border-strong hover:text-accent">
            directory methodology
          </Link>
          .
        </p>

        <form action="/directory/search" className="mt-8 flex max-w-xl gap-3">
          <input
            type="text"
            name="q"
            placeholder="Search agencies, industries, or locations…"
            className="flex-1 border border-border-strong bg-surface px-4 py-3 text-sm"
          />
          <button type="submit" className="border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper">
            Search
          </button>
        </form>
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">Areas We Work In</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          We serve clients remotely across these regions, for any of the industries below —
          not a directory of local offices.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((region) => (
            <div key={region.region} className="border border-border bg-surface p-5">
              <h3 className="font-display text-base">{region.region}</h3>
              <div className="mt-3 space-y-2">
                {region.countries.map((c) => (
                  <div key={c.country}>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">{c.country}</p>
                    <p className="mt-1 text-sm text-ink-soft">{c.cities.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {featured.length > 0 && (
        <Section className="!pt-0">
          <h2 className="font-display text-2xl">Featured Agencies</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </Section>
      )}

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">Browse by Industry</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Each page covers our approach for that industry and the regions we work in.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/directory/${industry.slug}`}
              className="border border-border bg-surface p-6 transition-colors hover:border-ink"
            >
              <h3 className="font-display text-lg">{industry.name}</h3>
              <p className="mt-1 text-sm text-muted line-clamp-2">{industry.heroSummary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
