import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGraphic } from "@/components/portfolio/project-graphic";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { portfolioProjects } from "@/content/portfolio";
import { processSteps } from "@/content/process";
import { siteStats } from "@/content/site-stats";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Full-Stack Development & SEO Agency` },
  description:
    "Professional full-stack web development, web applications, e-commerce, mobile apps, technical SEO and digital growth services for businesses worldwide.",
  alternates: { canonical: "/" },
};

const devServices = services.filter((s) => s.category === "development").slice(0, 6);
const seoServices = services.filter((s) => s.category === "seo").slice(0, 6);
const availableStats = siteStats.filter((s) => s.value !== null);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-agency grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Full-Stack Development &amp; SEO Agency</Eyebrow>
            <h1 className="text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Full-Stack Development &amp; SEO for Businesses Ready to Grow.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              We design, build, optimize, and scale high-performance websites, web
              applications, and digital platforms — with development and SEO
              working from the same plan instead of two disconnected teams.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Start a Project</Button>
              <Button href="/work" variant="secondary">View Our Work</Button>
            </div>
          </div>

          <BrowserMockup />
        </div>
      </section>

      {/* Trust */}
      <Section className="border-b border-border !py-14">
        {availableStats.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {availableStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-ink">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <TrustStatement
              title="One team, not a handoff"
              body="Design, engineering, and SEO worked by the same team from discovery through launch."
            />
            <TrustStatement
              title="Built on a modern stack"
              body="Next.js, TypeScript, and structured data from the first commit — not bolted on before launch."
            />
            <TrustStatement
              title="Transparent methodology"
              body="Every engagement follows a documented six-step process, published on our Process page."
            />
          </div>
        )}
      </Section>

      {/* Services */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Development and SEO, under one roof.</h2>
          <p className="mt-4 text-ink-soft">
            Two disciplines that are usually sold separately, and usually suffer for it.
            We run them as one engagement so the site that gets built is also the site
            that ranks.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[...devServices.slice(0, 3), ...seoServices.slice(0, 3)].map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col bg-surface p-7 transition-colors hover:bg-paper-dim"
            >
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-accent">
                {service.category === "development" ? "Development" : "SEO"}
              </span>
              <h3 className="mt-3 font-display text-xl text-ink">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{service.summary}</p>
              <span className="mt-4 text-sm font-medium text-ink-soft group-hover:text-accent transition-colors">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/services" variant="secondary">View All Services</Button>
        </div>
      </Section>

      {/* Development expertise */}
      <Section className="bg-paper-dim">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Development Expertise</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">A stack chosen for speed and longevity.</h2>
            <p className="mt-4 max-w-md text-ink-soft">
              We standardize on a small set of technologies we can stand behind in
              production, not the widest possible list of buzzwords.
            </p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2">
            <ExpertiseGroup title="Frontend" items={["Next.js", "React", "TypeScript", "Tailwind CSS"]} />
            <ExpertiseGroup title="Backend" items={["Node.js", "REST APIs", "Server Actions", "Authentication"]} />
            <ExpertiseGroup title="Database" items={["PostgreSQL", "Supabase", "Prisma"]} />
            <ExpertiseGroup title="Infrastructure" items={["Vercel", "GitHub", "CI/CD", "CDN & Monitoring"]} />
          </dl>
        </div>
      </Section>

      {/* SEO expertise */}
      <Section>
        <Eyebrow>SEO Expertise</Eyebrow>
        <h2 className="max-w-xl text-3xl sm:text-4xl">SEO built into the platform, not layered on after.</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <SeoPillar
            title="Technical SEO"
            items={["Crawlability", "Indexation", "Schema", "Core Web Vitals"]}
            href="/services/technical-seo"
          />
          <SeoPillar
            title="On-Page SEO"
            items={["Keyword mapping", "Search intent", "Content structure", "Metadata"]}
            href="/services/technical-seo"
          />
          <SeoPillar
            title="Local SEO"
            items={["Location pages", "Google Business Profile", "Citations", "Local schema"]}
            href="/services/local-seo"
          />
          <SeoPillar
            title="E-commerce SEO"
            items={["Category optimization", "Product SEO", "Faceted navigation", "Internal linking"]}
            href="/services/ecommerce-seo"
          />
        </div>
      </Section>

      {/* Industries */}
      <Section className="bg-paper-dim">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Industries</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">Built for how each industry actually converts.</h2>
          </div>
          <Button href="/industries" variant="secondary">All Industries</Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 6).map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="border border-border bg-surface p-6 transition-colors hover:border-ink"
            >
              <h3 className="font-display text-lg">{industry.name}</h3>
              <p className="mt-2 text-sm text-muted line-clamp-3">{industry.heroSummary}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Portfolio preview */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">Demonstration projects</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              The projects below are demonstration builds illustrating our approach and
              technology choices, not completed client engagements.
            </p>
          </div>
          <Button href="/work" variant="secondary">View Work</Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block border border-border bg-surface transition-colors hover:border-ink"
            >
              <ProjectGraphic category={project.category} className="aspect-[4/3]" />
              <div className="p-6">
                <Badge tone="demo">Demo Project</Badge>
                <h3 className="mt-3 font-display text-lg">{project.title}</h3>
                <p className="mt-2 text-sm text-muted">{project.industry}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Process teaser */}
      <Section className="bg-paper-dim">
        <Eyebrow>Process</Eyebrow>
        <h2 className="max-w-xl text-3xl sm:text-4xl">A documented six-step process.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.slug} className="border border-border bg-surface p-6">
              <span className="font-display text-2xl text-accent">{step.number}</span>
              <h3 className="mt-2 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.summary}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/process" variant="secondary">See the Full Process</Button>
        </div>
      </Section>

      {/* CTA */}
      <Section className="!py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl sm:text-4xl">
          Ready to discuss a website, application, or SEO engagement?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Tell us what you&apos;re building or what&apos;s underperforming — we&apos;ll follow up
          with next steps.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/contact">Request a Project Consultation</Button>
          <Button href="/services/seo-audits" variant="secondary">Get an SEO Audit</Button>
        </div>
      </Section>
    </>
  );
}

function TrustStatement({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-accent pl-5">
      <h3 className="font-display text-lg">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{body}</p>
    </div>
  );
}

function ExpertiseGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-[0.14em] uppercase text-muted">{title}</dt>
      <dd className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="border border-border-strong px-3 py-1.5 text-sm text-ink-soft">
            {item}
          </span>
        ))}
      </dd>
    </div>
  );
}

function SeoPillar({ title, items, href }: { title: string; items: string[]; href: string }) {
  return (
    <Link href={href} className="block border border-border bg-surface p-6 transition-colors hover:border-ink">
      <h3 className="font-display text-lg">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted">
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}

function BrowserMockup() {
  return (
    <div className="relative">
      <div className="border border-border-strong bg-surface shadow-[8px_8px_0_0_var(--color-accent)]">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="col-span-2 space-y-3">
            <div className="relative h-24 overflow-hidden bg-border-strong">
              <Image
                src="https://picsum.photos/seed/fieldstone-hero-mockup/640/320"
                alt=""
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="h-3 w-3/4 bg-border-strong" />
            <div className="h-3 w-1/2 bg-border-strong" />
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-accent/25" />
            <div className="h-16 bg-border-strong" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 border-t border-border p-4">
          {[62, 84, 45, 73].map((h, i) => (
            <div key={i} className="flex h-20 items-end">
              <div className="w-full bg-accent" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-5 -right-5 hidden border border-border-strong bg-ink px-4 py-3 text-paper shadow-[6px_6px_0_0_var(--color-accent)] sm:block">
        <p className="text-xs tracking-wide text-paper/60">Core Web Vitals</p>
        <p className="font-display text-lg">All Green</p>
      </div>
    </div>
  );
}
