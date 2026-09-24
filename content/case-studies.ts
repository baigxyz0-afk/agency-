// Sample case studies illustrating methodology and structure. These are not
// completed client engagements — no results, metrics, or outcomes below are
// real. Each is clearly labeled "Sample Case Study" wherever it's displayed.
// Replace with real client case studies (real metrics only) as they exist.

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  isSample: true;
  overview: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  uxUi: string;
  development: string;
  seo: string;
  technicalImplementation: string[];
  measurementApproach: string;
  lessons: string;
  technologies: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-headless-commerce-rebuild",
    title: "Rebuilding a Faceted-Navigation E-commerce Catalog",
    client: "Sample Client — Illustrative",
    industry: "E-commerce",
    isSample: true,
    overview:
      "This sample case study walks through how we'd approach a common e-commerce SEO and performance problem: faceted navigation generating thousands of duplicate, unindexable URLs on a mid-size catalog store.",
    challenge:
      "A catalog store's filter combinations (size, color, price range, brand) were each generating a unique, crawlable URL with near-identical content, diluting crawl budget and creating duplicate-content signals across the category structure.",
    objectives: [
      "Stop faceted navigation from generating unbounded crawlable URLs",
      "Preserve filter usability for shoppers without sacrificing SEO",
      "Improve category and product page load speed on mobile",
    ],
    strategy:
      "Separate the SEO-relevant category structure (a defined set of canonical category and subcategory pages) from the filter UI, which uses client-side state and query parameters that are explicitly excluded from indexation via canonical tags and a crawl directive.",
    uxUi:
      "Filter interactions redesigned to feel instant (client-side state) while the underlying URL strategy stays clean for search engines — no perceptible change in shopping experience for the end user.",
    development:
      "Next.js storefront with statically generated canonical category pages, a client-side filter layer, and canonical tags pointing filtered views back to their parent category page.",
    seo:
      "Product schema added for price, availability, and aggregate rating; internal linking restructured so canonical category pages — not filter permutations — carry the primary link equity.",
    technicalImplementation: [
      "Canonical tag logic tied to the category taxonomy, not the current query string",
      "Robots directives excluding filter-parameter URLs from crawl where canonicalization alone wasn't sufficient",
      "Product structured data validated against Google's Rich Results test",
    ],
    measurementApproach:
      "In a real engagement, we'd track indexed-page count, category page crawl frequency, and organic entrances to category pages before and after, using Search Console and log-file analysis — not final traffic or revenue numbers, which depend on factors outside the technical work itself.",
    lessons:
      "The technical fix (separating canonical structure from filter UI) is usually less risky and faster to ship than a full replatform, and it's worth ruling out before assuming a catalog needs to move platforms entirely.",
    technologies: ["Next.js", "Product Schema", "Google Search Console"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
