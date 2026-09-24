import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { industries as industryPages } from "@/content/industries";
import { portfolioProjects } from "@/content/portfolio";
import { caseStudies } from "@/content/case-studies";
import { resources } from "@/content/resources";
import { getAllServiceCountries } from "@/content/service-areas";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { AGENCY_SELECT, mapAgencyRow } from "@/lib/directory/map-agency";

async function getDirectoryRoutes(base: string, now: Date) {
  // The 39 /directory/[industry] pages, and industry x country pages built
  // from our own real service-area data, are content-rich pages (our own
  // overview + Featured placement) regardless of Supabase — always indexable.
  const industrySlugs = new Set<string>(industryPages.map((i) => i.slug));
  const industryCountrySlugs = new Set<string>();
  const industryCountryRegionSlugs = new Set<string>();
  const industryCountryRegionCitySlugs = new Set<string>();
  const agencySlugs = new Set<string>();

  const serviceCountries = getAllServiceCountries();
  for (const industry of industryPages) {
    for (const country of serviceCountries) {
      industryCountrySlugs.add(`${industry.slug}/${country.slug}`);
    }
  }

  const supabase = getSupabasePublicClient();
  if (supabase) {
    const { data } = await supabase.from("agencies").select(AGENCY_SELECT).eq("verification_status", "verified");
    const agencies = (data ?? []).map(mapAgencyRow);

    for (const agency of agencies) {
      agencySlugs.add(agency.slug);
      if (!agency.location) continue;
      const { country, region, city } = agency.location;
      for (const industry of agency.industries) {
        industrySlugs.add(industry.slug);
        industryCountrySlugs.add(`${industry.slug}/${country.slug}`);
        industryCountryRegionSlugs.add(`${industry.slug}/${country.slug}/${region.slug}`);
        industryCountryRegionCitySlugs.add(`${industry.slug}/${country.slug}/${region.slug}/${city.slug}`);
      }
    }
  }

  return [
    { url: `${base}/directory`, lastModified: now },
    ...Array.from(industrySlugs).map((slug) => ({ url: `${base}/directory/${slug}`, lastModified: now })),
    ...Array.from(industryCountrySlugs).map((path) => ({ url: `${base}/directory/${path}`, lastModified: now })),
    ...Array.from(industryCountryRegionSlugs).map((path) => ({ url: `${base}/directory/${path}`, lastModified: now })),
    ...Array.from(industryCountryRegionCitySlugs).map((path) => ({ url: `${base}/directory/${path}`, lastModified: now })),
    ...Array.from(agencySlugs).map((slug) => ({ url: `${base}/directory/agency/${slug}`, lastModified: now })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/case-studies",
    "/about",
    "/process",
    "/industries",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
  }));

  const industryPageRoutes = industryPages.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
  }));

  const workRoutes = portfolioProjects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
  }));

  const resourceRoutes = resources.map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: now,
  }));

  const directoryRoutes = await getDirectoryRoutes(base, now);

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryPageRoutes,
    ...workRoutes,
    ...caseStudyRoutes,
    ...resourceRoutes,
    ...directoryRoutes,
  ];
}
