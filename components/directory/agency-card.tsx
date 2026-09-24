import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Agency } from "@/lib/directory/types";

export function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/directory/agency/${agency.slug}`}
      className="block border border-border bg-surface p-6 transition-colors hover:border-ink"
    >
      <div className="flex flex-wrap items-center gap-2">
        {agency.is_featured && <Badge tone="featured">Featured Partner</Badge>}
        {agency.is_sponsored && <Badge tone="sponsored">Sponsored</Badge>}
      </div>
      <h3 className="mt-3 font-display text-lg">{agency.name}</h3>
      {agency.location && (
        <p className="mt-1 text-sm text-muted">
          {agency.location.city.name}, {agency.location.region.name}, {agency.location.country.name}
        </p>
      )}
      {agency.description && <p className="mt-3 text-sm text-ink-soft line-clamp-2">{agency.description}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
        {agency.rating != null && <span>★ {agency.rating.toFixed(1)} ({agency.review_count})</span>}
        {agency.industries.slice(0, 3).map((i) => (
          <span key={i.id} className="border border-border-strong px-2 py-0.5">{i.name}</span>
        ))}
      </div>
    </Link>
  );
}
