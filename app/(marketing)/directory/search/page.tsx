import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AgencyCard } from "@/components/directory/agency-card";
import { getIndustriesWithCounts, searchAgencies } from "@/lib/directory/public-queries";
import type { AgencySort } from "@/lib/directory/types";

export const metadata: Metadata = {
  title: "Search the Directory",
  robots: { index: false, follow: true },
};

const PAGE_SIZE = 20;

type SearchParams = { q?: string; industry?: string; sort?: string; page?: string };

export default async function DirectorySearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;
  const sort = (params.sort as AgencySort) ?? "relevance";

  const industries = await getIndustriesWithCounts();
  const selectedIndustry = industries.find((i) => i.slug === params.industry);

  const { agencies, total } = await searchAgencies({
    q: params.q,
    industryId: selectedIndustry?.id,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory", href: "/directory" }, { label: "Search", href: "/directory/search" }]} />
      <Eyebrow>Directory</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Search Results</h1>

      <form action="/directory/search" className="mt-8 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={params.q}
          placeholder="Search agencies…"
          className="min-w-[240px] flex-1 border border-border-strong bg-surface px-4 py-2.5 text-sm"
        />
        <select name="industry" defaultValue={params.industry ?? ""} className="border border-border-strong bg-surface px-3.5 py-2.5 text-sm">
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>{i.name}</option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className="border border-border-strong bg-surface px-3.5 py-2.5 text-sm">
          <option value="relevance">Relevance</option>
          <option value="rating">Rating</option>
          <option value="reviews">Reviews</option>
          <option value="recent">Recently Verified</option>
        </select>
        <button type="submit" className="border border-ink bg-ink px-6 py-2.5 text-sm font-medium text-paper">
          Search
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">{total} {total === 1 ? "result" : "results"}</p>

      {agencies.length === 0 ? (
        <div className="mt-6 border border-border bg-paper-dim p-6 text-ink-soft">
          No agencies match this search yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const query = new URLSearchParams();
            if (params.q) query.set("q", params.q);
            if (params.industry) query.set("industry", params.industry);
            query.set("sort", sort);
            query.set("page", String(p));
            return (
              <Link
                key={p}
                href={`/directory/search?${query.toString()}`}
                className={`border px-3 py-1.5 text-sm ${p === page ? "border-ink bg-ink text-paper" : "border-border-strong"}`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </Section>
  );
}
