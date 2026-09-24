// Empty on purpose. Per the "no AI filler content" rule, we do not ship
// placeholder blog posts. Add real, human-reviewed articles here as they're
// written — each becomes a page automatically via app/resources/[slug].
export type ResourceCategory =
  | "Web Development"
  | "SEO"
  | "Technical SEO"
  | "E-commerce"
  | "SaaS"
  | "Local SEO"
  | "Web Performance"
  | "Conversion Optimization"
  | "Business Technology";

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  publishedAt: string;
  body: string[];
};

export const resources: Resource[] = [];

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}
