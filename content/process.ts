export type ProcessStep = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  whatHappens: string[];
  clientReceives: string[];
  communication: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    slug: "discovery",
    title: "Discovery",
    summary: "We learn the business, the current site or product, and what's actually limiting growth before proposing anything.",
    whatHappens: [
      "Review of existing site, application, or codebase (where one exists)",
      "Stakeholder interviews to understand goals, constraints, and past attempts",
      "Technical and SEO baseline audit",
      "Competitive and market context review",
    ],
    clientReceives: [
      "Discovery summary document",
      "Baseline technical/SEO audit findings",
      "Initial scope recommendation",
    ],
    communication: "One or two structured working sessions, plus async document review.",
  },
  {
    number: "02",
    slug: "strategy",
    title: "Strategy",
    summary: "Discovery findings turn into a concrete plan: information architecture, technical approach, and SEO priorities.",
    whatHappens: [
      "Information architecture and sitemap definition",
      "Technical architecture decisions (framework, data layer, hosting)",
      "SEO strategy: keyword priorities, content gaps, technical fixes required",
      "Scope and milestone plan",
    ],
    clientReceives: ["Sitemap and architecture proposal", "SEO strategy brief", "Milestone-based project plan"],
    communication: "Strategy review call to walk through the plan before design begins.",
  },
  {
    number: "03",
    slug: "ux-ui-design",
    title: "UX/UI Design",
    summary: "Interface design grounded in the information architecture, built on the project's design system from the start.",
    whatHappens: [
      "Wireframes for key templates and flows",
      "Visual design system: typography, color, spacing, components",
      "High-fidelity designs for primary page templates",
      "Responsive design across mobile, tablet, and desktop",
    ],
    clientReceives: ["Design system reference", "High-fidelity page designs", "Prototype for key flows where useful"],
    communication: "Structured design review rounds with defined feedback windows.",
  },
  {
    number: "04",
    slug: "development",
    title: "Development",
    summary: "Build against the approved designs and architecture, with staging environments for ongoing review.",
    whatHappens: [
      "Frontend and backend implementation",
      "Database and API integration",
      "Staging environment for in-progress review",
      "Internal QA against defined acceptance criteria",
    ],
    clientReceives: ["Access to a staging environment throughout the build", "Progress updates at defined milestones"],
    communication: "Regular async updates plus a standing check-in call for active builds.",
  },
  {
    number: "05",
    slug: "seo-optimization",
    title: "SEO & Optimization",
    summary: "Technical SEO, structured data, and performance optimization applied before launch, not bolted on after.",
    whatHappens: [
      "Structured data implementation",
      "Metadata, sitemap, and robots.txt configuration",
      "Core Web Vitals optimization pass",
      "Accessibility review",
    ],
    clientReceives: ["Pre-launch SEO checklist results", "Performance benchmark report"],
    communication: "Findings walkthrough before launch sign-off.",
  },
  {
    number: "06",
    slug: "launch-growth",
    title: "Launch & Growth",
    summary: "Launch, verify, and move into a growth phase informed by real search and analytics data.",
    whatHappens: [
      "Production launch and DNS/redirect verification",
      "Analytics and Search Console configuration",
      "Post-launch monitoring window",
      "Ongoing SEO and maintenance engagement where scoped",
    ],
    clientReceives: ["Launch verification checklist", "Analytics and Search Console access", "Post-launch report"],
    communication: "Defined check-in cadence for any ongoing engagement.",
  },
];
