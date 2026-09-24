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
  getRegionBySlug,
  getCitiesForIndustryCountryRegion,
  searchAgencies,
} from "@/lib/directory/public-queries";
import { getIndustryBySlug as getContentIndustryBySlug } from "@/content/industries";
import { getServiceCityBySlug } from "@/content/service-areas";

type Props = { params: Promise<{ industry: string; country: string; region: string }> };

async function loadContext(params: Props["params"]) {
  const { industry: industrySlug, country: countrySlug, region: citySlug } = await params;
  const content = getContentIndustryBySlug(industrySlug);
  const directoryIndustry = await getDirectoryIndustryBySlug(industrySlug);
  const serviceCity = getServiceCityBySlug(countrySlug, citySlug);

  // Real third-party data (Supabase) uses a country -> region -> city
  // hierarchy; our own content-driven pages skip the "region/state" layer
  // entirely, so this only resolves when real DB data actually exists there.
  const country = await getCountryBySlug(countrySlug);
  const dbRegion = !serviceCity && country ? await getRegionBySlug(country.id, citySlug) : null;

  return { content, directoryIndustry, serviceCity, country, dbRegion, industrySlug, countrySlug, citySlug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { content, directoryIndustry, serviceCity, industrySlug, countrySlug, citySlug } = await loadContext(params);
  if ((!content && !directoryIndustry) || !serviceCity) return {};

  const industryName = content?.name ?? directoryIndustry!.name;

  return {
    title: `${industryName} Web Development & SEO in ${serviceCity.city}, ${serviceCity.country}`,
    description: `${industryName} development and SEO services for businesses in ${serviceCity.city}, ${serviceCity.country}.`,
    alternates: { canonical: `/directory/${industrySlug}/${countrySlug}/${citySlug}` },
    // Genuinely thinner than the industry/country pages — just a city name
    // swapped into reused copy — so these stay out of the index until real
    // third-party listings or real local content differentiate them.
    robots: { index: false, follow: true },
  };
}

export default async function CityDirectoryPage({ params }: Props) {
  const { content, directoryIndustry, serviceCity, country, dbRegion, industrySlug, countrySlug, citySlug } = await loadContext(params);

  if (serviceCity && (content || directoryIndustry)) {
    const industryName = content?.name ?? directoryIndustry!.name;

    const { agencies: countryAgencies } = directoryIndustry && country
      ? await searchAgencies({ industryId: directoryIndustry.id, countryId: country.id, pageSize: 30 })
      : { agencies: [] };
    const cityAgencies = countryAgencies.filter(
      (a) => a.location?.city.name.toLowerCase() === serviceCity.city.toLowerCase()
    );

    return (
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Directory", href: "/directory" },
            { label: industryName, href: `/directory/${industrySlug}` },
            { label: serviceCity.country, href: `/directory/${industrySlug}/${countrySlug}` },
            { label: serviceCity.city, href: `/directory/${industrySlug}/${countrySlug}/${citySlug}` },
          ]}
        />
        <Eyebrow>Directory</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">
          {industryName} Web Development &amp; SEO in {serviceCity.city}
        </h1>
        {content && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{content.heroSummary}</p>}

        <FeaturedListing
          industryName={industryName}
          industrySlug={industrySlug}
          content={content}
          locationLabel={`${serviceCity.city}, ${serviceCity.country}`}
        />

        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
          This page isn&apos;t submitted for search indexing until it has enough real local
          content or verified third-party listings to justify ranking on its own.
        </p>

        <div className="mt-12">
          <h2 className="font-display text-2xl">Other Verified {industryName} Agencies in {serviceCity.city}</h2>
          {cityAgencies.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cityAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-xl border border-border bg-paper-dim p-6 text-ink-soft">
              No other agencies have been independently verified in {serviceCity.city} yet. We
              only list a third-party agency once we&apos;ve confirmed it&apos;s real — see our{" "}
              <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">methodology</Link>.
            </p>
          )}
        </div>

        <div className="mt-12 border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Need {industryName.toLowerCase()} help in {serviceCity.city}?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Request a Project Consultation</Button>
            <Button href={`/directory/${industrySlug}/${countrySlug}`} variant="secondary">
              More of {serviceCity.country}
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  // Fall back to the real, DB-backed region/state listing when this segment
  // matches an actual verified-agency region rather than one of our cities.
  if (!directoryIndustry || !dbRegion) notFound();
  const dbCountry = await getCountryBySlug(countrySlug);
  if (!dbCountry) notFound();

  const cities = await getCitiesForIndustryCountryRegion(directoryIndustry.id, dbCountry.slug, citySlug);

  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: directoryIndustry.name, href: `/directory/${industrySlug}` },
          { label: dbCountry.name, href: `/directory/${industrySlug}/${countrySlug}` },
          { label: dbRegion.name, href: `/directory/${industrySlug}/${countrySlug}/${citySlug}` },
        ]}
      />
      <Eyebrow>Directory</Eyebrow>
      <h1 className="max-w-2xl text-4xl sm:text-5xl">
        {directoryIndustry.name} Agencies in {dbRegion.name}, {dbCountry.name}
      </h1>

      {cities.length === 0 ? (
        <p className="mt-6 max-w-xl border border-border bg-paper-dim p-6 text-ink-soft">
          No verified {directoryIndustry.name.toLowerCase()} agencies are listed yet here.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map(({ city, count }) => (
            <Link
              key={city.id}
              href={`/directory/${industrySlug}/${countrySlug}/${citySlug}/${city.slug}`}
              className="border border-border bg-surface p-6 transition-colors hover:border-ink"
            >
              <h2 className="font-display text-lg">{city.name}</h2>
              <p className="mt-1 text-sm text-muted">{count} {count === 1 ? "agency" : "agencies"}</p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
