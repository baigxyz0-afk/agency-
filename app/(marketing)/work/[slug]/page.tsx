import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectGraphic } from "@/components/portfolio/project-graphic";
import { portfolioProjects, getProjectBySlug } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: project.title, href: `/work/${project.slug}` },
          ]}
        />
        <Badge tone="demo">Demo Project — not a completed client engagement</Badge>
        <Eyebrow>{project.category}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{project.industry}</p>
      </Section>

      <Section className="!pb-0 !pt-0">
        <ProjectGraphic category={project.category} className="aspect-[16/9] border border-border" />
      </Section>

      <Section className="!pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl">Challenge</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl">Strategy</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{project.strategy}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl">Implementation</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{project.implementation}</p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-paper-dim p-6">
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Services</h3>
              <ul className="mt-3 space-y-1.5">
                {project.services.map((s) => (
                  <li key={s} className="text-sm text-ink-soft">{s}</li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-paper-dim p-6">
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Technology</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="border border-border-strong bg-surface px-2.5 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-14 border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Have a similar project in mind?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Start a Project</Button>
            <Button href="/work" variant="secondary">View More Work</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
