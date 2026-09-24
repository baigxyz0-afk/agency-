import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Articles on web development, technical SEO, e-commerce, and business technology.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }]} />
      <Eyebrow>Resources</Eyebrow>
      <h1 className="max-w-2xl text-4xl sm:text-5xl">Resources</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Practical articles on web development, technical SEO, and business
        technology — written by the people doing the work, not filler.
      </p>

      {resources.length === 0 ? (
        <div className="mt-14 border border-border bg-paper-dim p-10 text-center">
          <h2 className="font-display text-xl">Articles are in progress</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            We&apos;d rather publish nothing than publish filler. Check back soon, or{" "}
            <Link href="/contact" className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              get in touch
            </Link>{" "}
            if there&apos;s a specific topic you want us to cover.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link key={r.slug} href={`/resources/${r.slug}`} className="border border-border bg-surface p-6 hover:border-ink">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent">{r.category}</span>
              <h2 className="mt-3 font-display text-lg">{r.title}</h2>
              <p className="mt-2 text-sm text-muted">{r.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
