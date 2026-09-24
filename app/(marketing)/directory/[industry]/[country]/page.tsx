import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FeaturedListing } from "@/components/directory/featured-listing";
import { AgencyCard } from "@/components/directory/agency-card";
import {
  getIndustryBySlug as getDirectoryIndustryBySlug,
  getCountryBySlug,
  getRegionsForIndustryCountry,
  searchAgencies,
} from "@/lib/directory/public-queries";
import { getIndustryBySlug as getContentIndustryBySlug } from "@/content/industries";
import { getServiceCountryBySlug } from "@/content/service-areas";
import { slugify } from "@/lib/slugify";

type Props = { params: Promise<{ industry: string; country: string }> };

async function loadContext(params: Props["params"]) {
  const { industry: industrySlug, country: countrySlug } = await params;
  const content = getContentIndustryBySlug(industrySlug);
  const directoryIndustry = await getDirectoryIndustryBySlug(industrySlug);
  const serviceCountry = getServiceCountryBySlug(countrySlug);
  const directoryCountry = await getCountryBySlug(countrySlug);
  return { content, directoryIndustry, serviceCountry, directoryCountry, industrySlug, countrySlug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { content, directoryIndustry, serviceCountry, directoryCountry, industrySlug, countrySlug } = await loadContext(params);
  if ((!content && !directoryIndustry) || (!serviceCountry && !directoryCountry)) return {};

  const industryName = content?.name ?? directoryIndustry!.name;
  const countryName = serviceCountry?.country ?? directoryCountry!.name;

  return {
    title: `${industryName} Web Development & SEO in ${countryName}`,
    description: `${industryName} development and SEO services for businesses in ${countryName}.`,
    alternates: { canonical: `/directory/${industrySlug}/${countrySlug}` },
  };
}

export default async function CountryDirectoryPage({ params }: Props) {
  const { content, directoryIndustry, serviceCountry, directoryCountry, industrySlug, countrySlug } = await loadContext(params);
  if ((!content && !directoryIndustry) || (!serviceCountry && !directoryCountry)) notFound();

  const industryName = content?.name ?? directoryIndustry!.name;
  const countryName = serviceCountry?.country ?? directoryCountry!.name;

  const regions = directoryIndustry && directoryCountry
    ? await getRegionsForIndustryCountry(directoryIndustry.id, countrySlug)
    : [];

  const { agencies: verifiedAgencies } = directoryIndustry && directoryCountry
    ? await searchAgencies({ industryId: directoryIndustry.id, countryId: directoryCountry.id, pageSize: 9 })
    : { agencies: [] };

  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: industryName, href: `/directory/${industrySlug}` },
          { label: countryName, href: `/directory/${industrySlug}/${countrySlug}` },
        ]}
      />
      <Eyebrow>Directory</Eyebrow>
      <h1 className="max-w-2xl text-4xl sm:text-5xl">{industryName} Web Development &amp; SEO in {countryName}</h1>
      {content && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{content.heroSummary}</p>}

      <FeaturedListing industryName={industryName} industrySlug={industrySlug} content={content} locationLabel={countryName} />

      {serviceCountry && serviceCountry.cities.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl">Cities We Serve in {countryName}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceCountry.cities.map((city) => (
              <Link
                key={city}
                href={`/directory/${industrySlug}/${countrySlug}/${slugify(city)}`}
                className="border border-border-strong bg-surface px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-display text-2xl">Other Verified {industryName} Agencies in {countryName}</h2>
        {verifiedAgencies.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        ) : (
          <p className="mt-4 max-w-xl border border-border bg-paper-dim p-6 text-ink-soft">
            No other agencies have been independently verified here yet. We only list a
            third-party agency once we&apos;ve confirmed it&apos;s real — see our{" "}
            <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">methodology</Link>.
          </p>
        )}
      </div>

      {regions.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl">Verified {industryName} Agencies by Region</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map(({ region, count }) => (
              <Link
                key={region.id}
                href={`/directory/${industrySlug}/${countrySlug}/${region.slug}`}
                className="border border-border bg-surface p-6 transition-colors hover:border-ink"
              >
                <h3 className="font-display text-lg">{region.name}</h3>
                <p className="mt-1 text-sm text-muted">{count} {count === 1 ? "agency" : "agencies"}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 border border-border bg-paper-dim p-8 text-center">
        <h2 className="font-display text-2xl">Need {industryName.toLowerCase()} help in {countryName}?</h2>
        <div className="mt-6 flex justify-center gap-4">
          <Button href="/contact">Request a Project Consultation</Button>
        </div>
      </div>
    </Section>
  );
}
