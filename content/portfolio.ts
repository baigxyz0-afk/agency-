// All entries below are demonstration projects, not completed client work.
// They exist to show how we structure and describe a project — architecture,
// scope, technology choices — without presenting invented clients, results,
// or statistics as real. Replace with real client projects (and only real,
// verifiable results) as they become available.

export type PortfolioCategory =
  | "Websites"
  | "SaaS"
  | "E-commerce"
  | "Web Applications"
  | "Dashboards";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  industry: string;
  services: string[];
  technologies: string[];
  challenge: string;
  strategy: string;
  implementation: string;
  isDemo: true;
  liveUrl: string | null;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "demo-multi-location-service-site",
    title: "Multi-Location Service Business Site",
    category: "Websites",
    industry: "Home Services",
    services: ["Web Development", "Local SEO", "Technical SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a home-services business operating across several metro areas, with one generic \"service areas\" page and no per-location SEO structure.",
    strategy:
      "Template-driven location pages built from a single structured data source, so each service area gets a genuinely distinct page instead of a swapped city name on shared copy.",
    implementation:
      "Next.js site with statically generated location and service pages, LocalBusiness structured data per location, and a quote-request flow branched by job type.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-headless-commerce-storefront",
    title: "Headless Commerce Storefront",
    category: "E-commerce",
    industry: "E-commerce",
    services: ["E-commerce Development", "E-commerce SEO"],
    technologies: ["Next.js", "Headless Commerce", "Stripe", "Product Schema"],
    challenge:
      "Demonstration scenario: a mid-size catalog store whose faceted navigation generated thousands of duplicate, unindexable filter-combination URLs.",
    strategy:
      "Rebuild the storefront on a headless architecture with canonical and crawl controls on faceted URLs, and a category-page template built around differentiated content per category.",
    implementation:
      "Next.js storefront with server-rendered category and product pages, structured product data for rich results, and a streamlined checkout flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-saas-admin-platform",
    title: "SaaS Admin & Billing Platform",
    category: "SaaS",
    industry: "SaaS / Technology",
    services: ["SaaS Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Stripe"],
    challenge:
      "Demonstration scenario: an early-stage SaaS product needing multi-tenant architecture and subscription billing before onboarding its first paying customers.",
    strategy:
      "Design a tenant and permission model upfront so the product doesn't need a data-architecture rewrite once usage grows, with billing built on metered and seat-based pricing.",
    implementation:
      "Multi-tenant PostgreSQL schema, Supabase auth with role-based access, and Stripe billing integration supporting trial-to-paid conversion.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-client-portal-dashboard",
    title: "Client Portal & Reporting Dashboard",
    category: "Dashboards",
    industry: "Professional Services",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Demonstration scenario: a professional services firm managing client reporting through email and spreadsheets, with no self-serve visibility for clients.",
    strategy:
      "A role-based client portal replacing manual reporting with live dashboards, scoped so each client only sees their own data.",
    implementation:
      "Next.js application with row-level access control, real-time data views, and exportable reports.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-real-estate-listing-platform",
    title: "Real Estate Listing Platform",
    category: "Web Applications",
    industry: "Real Estate",
    services: ["Web Application Development", "Technical SEO"],
    technologies: ["Next.js", "IDX/MLS Integration", "RealEstateListing Schema"],
    challenge:
      "Demonstration scenario: a brokerage site pulling raw MLS feed data into pages with no SEO structure, and no handling for expired listings.",
    strategy:
      "Structured listing data model with automated redirect handling for expired listings, plus neighborhood landing pages connecting listings to local search intent.",
    implementation:
      "Next.js application with IDX feed integration, statically generated neighborhood pages, and structured data on individual listing pages.",
    isDemo: true,
    liveUrl: null,
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
