import Link from "next/link";
import { listAgenciesAdmin } from "@/lib/directory/admin-queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 25;

export default async function AdminAgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;
  const verification = (params.status as "all" | "verified" | "pending" | "unverified") ?? "all";

  const { agencies, total } = await listAgenciesAdmin({
    search: params.q,
    verification,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl">Agencies</h1>
          <p className="mt-1 text-sm text-muted">{total} total</p>
        </div>
        <div className="flex gap-3">
          <Button href="/admin/agencies/export" variant="secondary">Export CSV</Button>
          <Button href="/admin/agencies/new">Add Agency</Button>
        </div>
      </div>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={params.q}
          placeholder="Search by name…"
          className="border border-border-strong bg-surface px-3.5 py-2 text-sm"
        />
        <select name="status" defaultValue={verification} className="border border-border-strong bg-surface px-3.5 py-2 text-sm">
          <option value="all">All statuses</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="unverified">Unverified</option>
        </select>
        <Button type="submit" variant="secondary">Filter</Button>
      </form>

      <div className="mt-8 overflow-x-auto border border-border bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-paper-dim text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {agencies.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No agencies yet. Add one or import a CSV.
                </td>
              </tr>
            )}
            {agencies.map((agency) => (
              <tr key={agency.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{agency.name}</td>
                <td className="px-4 py-3 text-muted">
                  {agency.location ? `${agency.location.city.name}, ${agency.location.country.name}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={agency.verification_status === "verified" ? "accent" : "neutral"}>
                    {agency.verification_status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {agency.is_featured && <Badge tone="featured">Featured</Badge>}
                    {agency.is_sponsored && <Badge tone="sponsored">Sponsored</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/agencies/${agency.id}`} className="text-sm underline underline-offset-4 hover:text-accent">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const query = new URLSearchParams();
            if (params.q) query.set("q", params.q);
            if (params.status) query.set("status", params.status);
            query.set("page", String(p));
            return (
              <Link
                key={p}
                href={`/admin/agencies?${query.toString()}`}
                className={`border px-3 py-1.5 text-sm ${p === page ? "border-ink bg-ink text-paper" : "border-border-strong"}`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
