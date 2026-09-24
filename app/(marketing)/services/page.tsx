import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web development, web applications, e-commerce, SaaS, and technical SEO services — scoped and delivered by one team.",
  alternates: { canonical: "/services" },
};

const devServices = services.filter((s) => s.category === "development");
const seoServices = services.filter((s) => s.category === "seo");

export default function ServicesPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
        <Eyebrow>Services</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Development and SEO, scoped as one engagement.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Every service below is delivered by the same team that builds the site — so
          technical SEO decisions get made during development, not discovered in an
          audit six months after launch.
        </p>
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">Development</h2>
        <ServiceGrid items={devServices} />
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl">SEO</h2>
        <ServiceGrid items={seoServices} />
      </Section>
    </>
  );
}

function ServiceGrid({ items }: { items: typeof services }) {
  return (
    <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group flex flex-col bg-surface p-7 transition-colors hover:bg-paper-dim"
        >
          <h3 className="font-display text-xl">{service.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{service.summary}</p>
          <span className="mt-4 text-sm font-medium text-ink-soft group-hover:text-accent transition-colors">
            View service →
          </span>
        </Link>
      ))}
    </div>
  );
}
