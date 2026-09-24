import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name}'s approach to full-stack development and SEO, our working methodology, and the industries we work in.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="!pb-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <Eyebrow>About</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">One team for development and SEO.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          {siteConfig.name} exists because development and SEO are usually sold as
          separate services by separate vendors, and the seam between them is where
          most websites lose performance, rankings, or both.
        </p>
      </Section>

      <Section className="!pt-0 space-y-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl">Why development and SEO, together</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            A developer optimizing for interface polish can ship a site that Google
            can&apos;t crawl properly. An SEO consultant working from the outside can
            recommend fixes a development team never implements correctly, or at all.
            We run both disciplines inside the same team and the same project plan, so
            decisions get made once, by people who understand both the code and the
            ranking factors it affects.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Development philosophy</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              We build on a small, deliberately chosen stack — Next.js, TypeScript,
              PostgreSQL — rather than the widest possible list of frameworks. Fewer
              moving parts means fewer places for a project to break, and a codebase
              your own team (or the next agency) can actually understand.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl">SEO philosophy</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Technical SEO is infrastructure, not a checklist run after launch.
              Structured data, sitemap architecture, and Core Web Vitals are part of
              the build from the first commit. Content and keyword strategy follow
              search intent — we don&apos;t write pages to satisfy a keyword density
              target no algorithm has used in years.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl">Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <ValueCard
              title="Evidence over claims"
              body="We don't promise specific rankings or guaranteed results — no one legitimately can. We report what's measurable and explain our reasoning."
            />
            <ValueCard
              title="One accountable team"
              body="No handoff between a design vendor, a dev shop, and an SEO consultant pointing fingers at each other when something underperforms."
            />
            <ValueCard
              title="Documented process"
              body="Every engagement follows the same six-step process, published on our Process page — not a different pitch for every prospect."
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl">Working methodology</h2>
          <p className="mt-4 max-w-3xl text-ink-soft leading-relaxed">
            Every engagement moves through discovery, strategy, design, development,
            SEO and optimization, then launch and growth — detailed on the{" "}
            <Link href="/process" className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              Process page
            </Link>
            . Communication is structured around defined milestones and review windows
            rather than open-ended, unscoped check-ins.
          </p>
        </div>

        <div className="border border-border bg-paper-dim p-8 text-center">
          <h2 className="font-display text-2xl">Want to talk through a project?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/contact">Start a Project</Button>
            <Button href="/process" variant="secondary">See Our Process</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border bg-surface p-6">
      <h3 className="font-display text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
