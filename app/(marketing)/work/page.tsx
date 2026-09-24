import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ProjectGraphic } from "@/components/portfolio/project-graphic";
import { portfolioProjects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description: "Development and SEO project examples across websites, e-commerce, SaaS, and web applications.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }]} />
        <Eyebrow>Work</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Selected work</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          The projects below are demonstration builds that show how we approach a
          given problem and which technologies we&apos;d use — not completed client
          engagements. Real client work will replace these as it becomes available
          for public display.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block border border-border bg-surface transition-colors hover:border-ink"
            >
              <ProjectGraphic category={project.category} className="aspect-[4/3]" />
              <div className="p-6">
                <Badge tone="demo">Demo Project</Badge>
                <h2 className="mt-3 font-display text-lg">{project.title}</h2>
                <p className="mt-2 text-sm text-muted">{project.industry} · {project.services.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
