import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { AgencyCard } from "@/components/directory/agency-card";
import {
  getIndustryBySlug,
  getCountryBySlug,
  getRegionBySlug,
  getCityBySlug,
  searchAgencies,
} from "@/lib/directory/public-queries";
import { MIN_LISTINGS_TO_INDEX } from "@/lib/directory/types";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ industry: string; country: string; region: string; city: string }> };

async function loadContext(params: Props["params"]) {
  const { industry: industrySlug, country: countrySlug, region: regionSlug, city: citySlug } = await params;
  const industry = await getIndustryBySlug(industrySlug);
  const country = await getCountryBySlug(countrySlug);
  const region = country ? await getRegionBySlug(country.id, regionSlug) : null;
  const city = region ? await getCityBySlug(region.id, citySlug) : null;
  return { industry, country, region, city };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry, country, region, city } = await loadContext(params);
  if (!industry || !country || !region || !city) return {};

  const { agencies } = await searchAgencies({ industryId: industry.id, cityId: city.id, pageSize: 50 });

  return {
    title: `${industry.name} Agencies in ${city.name}, ${country.name}`,
    description: `Verified ${industry.name.toLowerCase()} development and SEO agencies in ${city.name}, ${region.name}.`,
    alternates: { canonical: `/directory/${industry.slug}/${country.slug}/${region.slug}/${city.slug}` },
    robots: agencies.length < MIN_LISTINGS_TO_INDEX ? { index: false, follow: true } : undefined,
  };
}

export default async function CityDirectoryPage({ params }: Props) {
  const { industry, country, region, city } = await loadContext(params);
  if (!industry || !country || !region || !city) notFound();

  const { agencies } = await searchAgencies({ industryId: industry.id, cityId: city.id, pageSize: 50 });

  const itemListJsonLd =
    agencies.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: agencies.map((agency, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteConfig.url}/directory/agency/${agency.slug}`,
            name: agency.name,
          })),
        }
      : null;

  return (
    <Section>
      {itemListJsonLd && <JsonLd data={itemListJsonLd} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: industry.name, href: `/directory/${industry.slug}` },
          { label: country.name, href: `/directory/${industry.slug}/${country.slug}` },
          { label: region.name, href: `/directory/${industry.slug}/${country.slug}/${region.slug}` },
          { label: city.name, href: `/directory/${industry.slug}/${country.slug}/${region.slug}/${city.slug}` },
        ]}
      />
      <Eyebrow>Directory</Eyebrow>
      <h1 className="max-w-2xl text-4xl sm:text-5xl">
        {industry.name} Agencies in {city.name}, {country.name}
      </h1>

      {agencies.length === 0 ? (
        <p className="mt-6 max-w-xl border border-border bg-paper-dim p-6 text-ink-soft">
          No verified {industry.name.toLowerCase()} agencies are listed yet in {city.name}.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}
    </Section>
  );
}
