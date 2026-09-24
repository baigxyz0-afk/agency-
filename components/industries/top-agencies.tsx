import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgencyCard } from "@/components/directory/agency-card";
import { searchAgencies } from "@/lib/directory/public-queries";
import { siteConfig } from "@/lib/site-config";

// Partner disclosure: a real, named business relationship, shown with its
// own label rather than folded into an unlabeled "organic" ranking — the
// same standard this site holds its own #1 placement to everywhere else in
// the directory (see /disclaimer). Not pulled from the agencies table since
// it isn't a directory listing we researched independently; it's disclosed
// here specifically as a partner.
const PARTNER = {
  name: "Devnexy",
  website: "https://devnexy.com",
  description: "A web design and development agency.",
};

export async function TopAgencies({ industryName }: { industryName: string }) {
  const { agencies } = await searchAgencies({ sort: "reviews", pageSize: 8 });

  return (
    <div>
      <h2 className="font-display text-2xl">Agencies for {industryName} Web Development</h2>
      <p className="mt-3 max-w-2xl text-ink-soft">
        We list ourselves first, clearly labeled — this isn&apos;t an independent ranking.
        Other entries are either a disclosed partner or agencies we independently
        confirmed are real, live businesses. See our{" "}
        <Link href="/disclaimer" className="underline underline-offset-4 hover:text-accent">directory methodology</Link>.
      </p>

      <div className="mt-8 space-y-4">
        <div className="border border-ink bg-surface p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-ink font-display text-sm">1</span>
            <Badge tone="featured">Featured — Not an Independent Ranking</Badge>
          </div>
          <h3 className="mt-3 font-display text-xl">{siteConfig.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">
            We build and optimize {industryName.toLowerCase()} websites — the approach is on this
            page above.
          </p>
          <div className="mt-4">
            <Button href="/contact">Get a Quote</Button>
          </div>
        </div>

        <div className="border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border-strong font-display text-sm">2</span>
            <Badge tone="partner">Partner Agency</Badge>
          </div>
          <h3 className="mt-3 font-display text-xl">{PARTNER.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{PARTNER.description}</p>
          <a
            href={PARTNER.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
          >
            {PARTNER.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>

      {agencies.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
            Other agencies we&apos;ve independently confirmed are real
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
