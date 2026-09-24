import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGraphic } from "@/components/portfolio/project-graphic";
import { getDemoCategoryForIndustry, type Industry } from "@/content/industries";
import { processSteps } from "@/content/process";
import { siteConfig } from "@/lib/site-config";

export function FeaturedListing({
  industryName,
  industrySlug,
  content,
  locationLabel,
}: {
  industryName: string;
  industrySlug: string;
  content?: Industry;
  locationLabel: string;
}) {
  const demoCategory = getDemoCategoryForIndustry(industrySlug);

  return (
    <div className="mt-10">
      <div className="border border-ink bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink font-display text-sm">1</span>
          <Badge tone="featured">Featured — Not an Independent Ranking</Badge>
        </div>
        <h2 className="mt-4 font-display text-2xl">{siteConfig.name}</h2>
        <p className="mt-1 text-sm text-muted">Remote — serving {locationLabel}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Web Development", "SEO", `${industryName} Websites`].map((tag) => (
            <span key={tag} className="border border-border-strong bg-paper-dim px-2.5 py-1 text-xs">{tag}</span>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">
          We work with {industryName.toLowerCase()} businesses in {locationLabel} remotely — same
          team, same process, wherever you&apos;re based.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
              What a {industryName.toLowerCase()} site could look like
            </h3>
            <ProjectGraphic category={demoCategory} className="mt-3 aspect-[4/3] border border-border" />
            <p className="mt-2 text-xs text-muted">Illustrative mockup, not a real client screenshot.</p>
          </div>

          <div className="space-y-6">
            {content && (
              <div>
                <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                  How we&apos;d build this
                </h3>
                <ul className="mt-3 space-y-2">
                  {content.developmentSolutions.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">How we work</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {processSteps.map((step) => (
                  <span key={step.slug} className="text-xs text-muted">
                    <span className="text-accent">{step.number}</span> {step.title}
                  </span>
                ))}
              </div>
              <Link href="/process" className="mt-2 inline-block text-sm text-ink-soft underline underline-offset-4 hover:text-accent">
                See our full process →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button href="/contact">Get a Quote</Button>
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
        This directory is published by {siteConfig.name}, and we list ourselves first on every
        page — clearly labeled, not the result of independent research. We&apos;ve never taken
        payment to include, move, or exclude any other listing. See our{" "}
        <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">directory methodology</Link>.
      </p>
    </div>
  );
}
