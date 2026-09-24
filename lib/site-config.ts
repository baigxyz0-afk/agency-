export const siteConfig = {
  name: "Fieldstone Digital",
  shortName: "Fieldstone",
  // TODO: replace with the real production domain before launch.
  url: "https://www.fieldstonedigital.com",
  description:
    "Full-stack web development, web applications, e-commerce, and technical SEO for businesses that need development and growth working from the same plan.",
  tagline: "Full-Stack Development & SEO for Businesses Ready to Grow",
  // TODO: replace with real contact details before launch.
  email: "hello@fieldstonedigital.com",
  phone: null as string | null,
  whatsapp: null as string | null,
  location: null as string | null,
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    github: null as string | null,
    instagram: null as string | null,
  },
  founded: null as number | null,
};

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Full-Stack Development", href: "/services/full-stack-development" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Web Applications", href: "/services/web-application-development" },
      { label: "E-commerce Development", href: "/services/ecommerce-development" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "Next.js Development", href: "/services/nextjs-development" },
      { label: "API Development", href: "/services/api-development" },
      { label: "Technical SEO", href: "/services/technical-seo" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
      { label: "International SEO", href: "/services/international-seo" },
      { label: "SEO Audits", href: "/services/seo-audits" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Resources", href: "/resources" },
  { label: "Directory", href: "/directory" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Work", href: "/work" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Full-Stack Development", href: "/services/full-stack-development" },
    { label: "Web Application Development", href: "/services/web-application-development" },
    { label: "E-commerce Development", href: "/services/ecommerce-development" },
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "Next.js Development", href: "/services/nextjs-development" },
  ],
  seo: [
    { label: "Technical SEO", href: "/services/technical-seo" },
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
    { label: "International SEO", href: "/services/international-seo" },
    { label: "SEO Audits", href: "/services/seo-audits" },
  ],
  industries: [
    { label: "Roofing", href: "/industries/roofing" },
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Legal", href: "/industries/legal" },
    { label: "E-commerce", href: "/industries/ecommerce" },
    { label: "All Industries", href: "/industries" },
  ],
  resources: [
    { label: "Directory", href: "/directory" },
    { label: "Resources", href: "/resources" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
