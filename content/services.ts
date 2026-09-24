export type ServiceCategory = "development" | "seo";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string[];
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  outcome: string;
  related: string[];
};

export const services: Service[] = [
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    category: "development",
    summary:
      "Design and engineering of scalable web platforms using modern frontend, backend, API, database, and cloud technologies.",
    description: [
      "Full-stack engagements cover the entire system: the interface a customer touches, the API and business logic behind it, the database it reads and writes, and the infrastructure that keeps it online. We work as a single team across all three layers instead of handing a design off to one contractor and a backend to another.",
      "Most projects start from an existing product — a legacy site, a spreadsheet-driven process, or a platform that has outgrown its original architecture — rather than a blank page. We assess what's there, decide what to keep, and rebuild the rest with a stack that can grow with the business.",
    ],
    capabilities: [
      "Frontend architecture with Next.js, React, and TypeScript",
      "Backend services, authentication, and business logic",
      "Database schema design and query optimization",
      "Third-party integrations (payments, CRM, email, analytics)",
      "CI/CD pipelines and staging environments",
      "Ongoing performance and reliability monitoring",
    ],
    deliverables: [
      "Technical architecture document",
      "Production-ready codebase with test coverage on critical paths",
      "Deployment pipeline and environment configuration",
      "Handover documentation for internal teams",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Vercel"],
    outcome:
      "A platform your team can extend without rewriting it, built on infrastructure that scales with traffic instead of breaking under it.",
    related: ["web-application-development", "api-development", "saas-development"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "development",
    summary:
      "Marketing sites and corporate websites engineered for speed, clarity, and search visibility from day one.",
    description: [
      "A website is usually the first serious interaction a prospect has with a business. We build sites that load fast, communicate clearly, and are structured so search engines can actually understand and rank them — treating design, copy structure, and technical SEO as one job, not three separate handoffs.",
      "Every site is built on a component system your team can maintain: consistent typography, spacing, and content blocks that don't require a developer for routine updates.",
    ],
    capabilities: [
      "Information architecture and content strategy",
      "Responsive, accessible interface design",
      "Component-based build in Next.js and TypeScript",
      "On-page and technical SEO built in from the start",
      "CMS integration for teams that need to self-edit content",
      "Core Web Vitals optimization",
    ],
    deliverables: [
      "Sitemap and content architecture",
      "Fully responsive, production website",
      "Editable content model (where a CMS is in scope)",
      "Launch checklist: redirects, analytics, search console setup",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity/Contentful (optional)", "Vercel"],
    outcome: "A site that loads quickly, ranks on the terms that matter, and is easy for your team to keep current.",
    related: ["technical-seo", "local-seo", "website-redesign"],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    category: "development",
    summary:
      "Custom dashboards, portals, and internal tools built around how your team actually works.",
    description: [
      "Web applications differ from marketing sites in one key way: they're built for repeat use by people who already know your business. That means the priority shifts from persuasion to efficiency — fewer clicks, clear data, dependable state management.",
      "We scope these projects around specific workflows (onboarding, reporting, order management, client portals) rather than trying to build a general-purpose platform on the first pass.",
    ],
    capabilities: [
      "Role-based authentication and permissions",
      "Custom dashboard and data visualization interfaces",
      "Real-time data sync where the workflow requires it",
      "Admin panel and internal tooling",
      "Third-party API and data source integration",
      "Audit logging and activity history",
    ],
    deliverables: [
      "User flow and permission model documentation",
      "Working application with role-based access",
      "Admin interface for day-to-day management",
      "Deployment and monitoring setup",
    ],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase Auth", "Node.js"],
    outcome: "An internal tool your team actually uses, instead of a spreadsheet workaround nobody trusts.",
    related: ["full-stack-development", "api-development", "saas-development"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "development",
    summary:
      "Storefronts and custom commerce platforms built for conversion, catalog scale, and checkout reliability.",
    description: [
      "E-commerce builds carry unique constraints: catalog and inventory data at scale, payment and tax logic that has to be correct every time, and checkout flows where a half-second of load time has a measurable revenue cost.",
      "We build on established commerce platforms where they fit the catalog and operational needs, and custom platforms where off-the-shelf constraints would work against the business.",
    ],
    capabilities: [
      "Product catalog architecture and faceted navigation",
      "Checkout, payments, and tax integration",
      "Inventory and order management integration",
      "Category and product page SEO architecture",
      "Site speed optimization for high-SKU catalogs",
      "Headless commerce builds where flexibility matters more than convention",
    ],
    deliverables: [
      "Catalog and category information architecture",
      "Production storefront with tested checkout flow",
      "Integration with payment, tax, and fulfillment systems",
      "Performance benchmark report at launch",
    ],
    technologies: ["Next.js", "Shopify/Headless Commerce", "Stripe", "PostgreSQL", "Vercel"],
    outcome: "A storefront that stays fast as the catalog grows and doesn't lose orders to checkout friction.",
    related: ["ecommerce-seo", "full-stack-development", "conversion-rate-optimization"],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    category: "development",
    summary:
      "Multi-tenant application architecture, billing, and product engineering for subscription software.",
    description: [
      "SaaS products carry requirements a typical web app doesn't: tenant isolation, subscription billing, usage metering, and an architecture that has to hold up as customer count and data volume grow well past the first cohort of users.",
      "We work on both new SaaS builds and existing products that need to re-architect for scale, security, or a pricing model change.",
    ],
    capabilities: [
      "Multi-tenant data architecture",
      "Subscription billing and usage-based pricing integration",
      "Role-based access control across organizations and teams",
      "API design for third-party and partner integrations",
      "Onboarding flow and trial-to-paid conversion paths",
      "Infrastructure built for horizontal scale",
    ],
    deliverables: [
      "Tenant and data architecture documentation",
      "Billing integration (Stripe or equivalent)",
      "Production application with role and permission structure",
      "API documentation for integrations",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Stripe", "Node.js"],
    outcome: "Product architecture that doesn't need a rewrite the moment you sign your first enterprise customer.",
    related: ["api-development", "full-stack-development", "web-application-development"],
  },
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    category: "development",
    summary:
      "App Router architecture, Server Components, and rendering strategy tuned for performance and SEO.",
    description: [
      "Next.js is our default framework for both marketing sites and application builds because its rendering model — a mix of static generation, server rendering, and client interactivity — maps well onto the dual requirement of search visibility and interface responsiveness.",
      "We make deliberate choices about what renders on the server versus the client, rather than defaulting everything to client-side rendering, which is one of the most common causes of slow, poorly-indexed Next.js sites.",
    ],
    capabilities: [
      "App Router architecture and route organization",
      "Server Components and selective client hydration",
      "Static, dynamic, and incremental rendering strategy",
      "Server Actions for form and mutation handling",
      "Image, font, and script optimization",
      "Migration from legacy React or other frameworks",
    ],
    deliverables: [
      "Rendering strategy documentation per route type",
      "Production Next.js application",
      "Core Web Vitals baseline and optimization report",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Vercel"],
    outcome: "Pages that render fast for users and are fully crawlable and indexable for search engines.",
    related: ["react-development", "technical-seo", "full-stack-development"],
  },
  {
    slug: "react-development",
    title: "React Development",
    category: "development",
    summary: "Component architecture and interface engineering for web applications built on React.",
    description: [
      "React work covers interface engineering inside a larger application: reusable component systems, state management that doesn't turn into a tangle of prop-drilling, and interfaces that stay maintainable as the product grows past its first version.",
    ],
    capabilities: [
      "Component library and design system implementation",
      "State management architecture",
      "Performance profiling and re-render optimization",
      "Accessibility implementation (WCAG-conscious markup and keyboard support)",
      "Integration with existing backend and API layers",
    ],
    deliverables: [
      "Component library documented for reuse",
      "Production interface code with defined state architecture",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    outcome: "An interface layer your team can extend without every new feature becoming a refactor.",
    related: ["nextjs-development", "web-application-development"],
  },
  {
    slug: "api-development",
    title: "API Development",
    category: "development",
    summary: "REST and server action-based APIs designed for internal use, partner integrations, or public consumption.",
    description: [
      "APIs are the contract between your systems and everything that depends on them — internal tools, mobile apps, partner integrations. We design that contract deliberately: consistent resource structure, versioning strategy, and authentication that fits how the API will actually be consumed.",
    ],
    capabilities: [
      "REST API design and resource modeling",
      "Authentication and authorization (API keys, OAuth, JWT)",
      "Rate limiting and abuse protection",
      "Webhook and event-driven integration design",
      "API documentation",
    ],
    deliverables: ["API specification/documentation", "Production API with authentication and rate limiting", "Integration test coverage on critical endpoints"],
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "REST"],
    outcome: "An API your own team and outside integrators can build against without guessing at behavior.",
    related: ["saas-development", "web-application-development", "full-stack-development"],
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    category: "seo",
    summary: "Crawlability, indexation, structured data, and Core Web Vitals work that removes the barriers between your content and search rankings.",
    description: [
      "Technical SEO is infrastructure work: making sure search engines can crawl your site efficiently, index the right pages, understand what those pages are about through structured data, and load them fast enough to satisfy Core Web Vitals thresholds.",
      "This is usually the first engagement for a site with a content or authority problem that turns out, on audit, to be a technical one — pages that can't be crawled, canonical tags pointing at the wrong URL, or JavaScript rendering that hides content from crawlers.",
    ],
    capabilities: [
      "Crawl budget and indexation audits",
      "Canonical tag and duplicate content resolution",
      "Structured data (schema.org) implementation",
      "Core Web Vitals diagnosis and remediation",
      "XML sitemap and robots.txt architecture",
      "Internal linking structure",
      "Site migration SEO (domain, platform, or URL structure changes)",
    ],
    deliverables: ["Technical SEO audit report with prioritized fixes", "Implemented structured data and sitemap", "Post-implementation crawl verification"],
    technologies: ["Schema.org", "Google Search Console", "Core Web Vitals tooling"],
    outcome: "A site search engines can fully crawl, understand, and rank without technical barriers getting in the way.",
    related: ["seo-audits", "nextjs-development", "on-page-seo"],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    category: "seo",
    summary: "Google Business Profile optimization, local landing pages, citations, and local schema for businesses that serve specific geographies.",
    description: [
      "Local SEO is the discipline for any business where customers search by location — service areas, city-specific landing pages, and the Google Business Profile signals that determine map pack visibility.",
    ],
    capabilities: [
      "Google Business Profile optimization",
      "Local landing page architecture (service-area and city pages)",
      "Citation building and NAP consistency audits",
      "LocalBusiness schema implementation",
      "Review strategy and management workflow",
    ],
    deliverables: ["Local SEO audit", "Optimized Google Business Profile", "Local landing page template and rollout"],
    technologies: ["LocalBusiness Schema", "Google Business Profile", "Google Search Console"],
    outcome: "Stronger visibility in map pack and local organic results for the specific areas you serve.",
    related: ["technical-seo", "seo-audits"],
  },
  {
    slug: "ecommerce-seo",
    title: "E-commerce SEO",
    category: "seo",
    summary: "Category and product page optimization, faceted navigation architecture, and technical SEO built for large catalogs.",
    description: [
      "E-commerce SEO has to solve for scale: thousands of product and category pages, faceted navigation that can accidentally generate infinite duplicate URLs, and product content that needs to be genuinely differentiated to avoid thin-content penalties.",
    ],
    capabilities: [
      "Category and product page optimization",
      "Faceted navigation and filter URL architecture",
      "Product schema (price, availability, reviews)",
      "Internal linking for catalog depth",
      "Duplicate content resolution across variants",
    ],
    deliverables: ["E-commerce SEO audit", "Category/product page template optimization", "Faceted navigation crawl strategy"],
    technologies: ["Product Schema", "Google Merchant Center", "Google Search Console"],
    outcome: "Category and product pages that rank without the catalog generating thousands of duplicate, unindexable URLs.",
    related: ["ecommerce-development", "technical-seo"],
  },
  {
    slug: "international-seo",
    title: "International SEO",
    category: "seo",
    summary: "hreflang architecture, country and language targeting, and localized keyword research for multi-market businesses.",
    description: [
      "International SEO governs how a site targets multiple countries or languages without those versions competing against each other in search results — hreflang implementation, URL structure decisions (subdomains, subdirectories, or ccTLDs), and market-specific keyword research.",
    ],
    capabilities: [
      "hreflang implementation and validation",
      "Country/language URL structure strategy",
      "Market-specific keyword research",
      "Localized content architecture",
      "International Search Console configuration",
    ],
    deliverables: ["International SEO architecture recommendation", "hreflang implementation", "Market-specific keyword map"],
    technologies: ["hreflang", "Google Search Console"],
    outcome: "Each country or language version of your site targets its own market without cannibalizing the others.",
    related: ["technical-seo", "keyword-research"],
  },
  {
    slug: "seo-audits",
    title: "SEO Audits",
    category: "seo",
    summary: "A full technical, on-page, and content audit that identifies what's actually limiting organic performance.",
    description: [
      "An audit is diagnostic work, not a sales pitch — a structured review of crawlability, indexation, on-page structure, content quality, and backlink profile, with findings prioritized by impact and effort rather than delivered as an undifferentiated list.",
    ],
    capabilities: [
      "Technical crawl and indexation analysis",
      "On-page and content quality review",
      "Backlink profile assessment",
      "Competitor gap analysis",
      "Prioritized action plan",
    ],
    deliverables: ["Full audit report", "Prioritized recommendation list", "Findings walkthrough call"],
    technologies: ["Google Search Console", "Crawl tooling", "Core Web Vitals tooling"],
    outcome: "A clear, prioritized understanding of what's holding organic performance back and what to fix first.",
    related: ["technical-seo", "keyword-research"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory) {
  return services.filter((service) => service.category === category);
}
