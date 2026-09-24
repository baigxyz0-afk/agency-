// Real, honest coverage messaging — the regions and major cities Fieldstone
// can serve clients remotely, not a claim that third-party agencies are
// listed there. Keep this list to real, well-known places only.

import { slugify } from "@/lib/slugify";

export type ServiceRegion = {
  region: string;
  countries: { country: string; cities: string[] }[];
};

export const serviceAreas: ServiceRegion[] = [
  {
    region: "North America",
    countries: [
      { country: "United States", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Austin", "Seattle", "Denver"] },
      { country: "Canada", cities: ["Toronto", "Vancouver", "Montreal", "Calgary"] },
    ],
  },
  {
    region: "Europe",
    countries: [
      { country: "United Kingdom", cities: ["London", "Manchester", "Birmingham", "Edinburgh"] },
      { country: "Germany", cities: ["Berlin", "Munich"] },
      { country: "Ireland", cities: ["Dublin"] },
    ],
  },
  {
    region: "Middle East",
    countries: [
      { country: "United Arab Emirates", cities: ["Dubai", "Abu Dhabi"] },
      { country: "Saudi Arabia", cities: ["Riyadh", "Jeddah"] },
    ],
  },
  {
    region: "South Asia",
    countries: [
      { country: "Pakistan", cities: ["Karachi", "Lahore", "Islamabad"] },
      { country: "India", cities: ["Mumbai", "Bangalore", "Delhi"] },
    ],
  },
  {
    region: "Australia",
    countries: [{ country: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"] }],
  },
];

export function getAllCityCount() {
  return serviceAreas.reduce(
    (sum, r) => sum + r.countries.reduce((s, c) => s + c.cities.length, 0),
    0
  );
}

export type ServiceCountry = { region: string; country: string; slug: string; cities: string[] };

export function getAllServiceCountries(): ServiceCountry[] {
  return serviceAreas.flatMap((r) =>
    r.countries.map((c) => ({ region: r.region, country: c.country, slug: slugify(c.country), cities: c.cities }))
  );
}

export function getServiceCountryBySlug(slug: string): ServiceCountry | undefined {
  return getAllServiceCountries().find((c) => c.slug === slug);
}

export type ServiceCity = { city: string; slug: string; country: string; countrySlug: string; region: string };

export function getServiceCityBySlug(countrySlug: string, citySlug: string): ServiceCity | undefined {
  const country = getServiceCountryBySlug(countrySlug);
  if (!country) return undefined;
  const city = country.cities.find((c) => slugify(c) === citySlug);
  if (!city) return undefined;
  return { city, slug: citySlug, country: country.country, countrySlug: country.slug, region: country.region };
}
