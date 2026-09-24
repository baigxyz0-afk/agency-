import Link from "next/link";
import { getDashboardCounts } from "@/lib/directory/admin-queries";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts();

  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Directory overview.</p>

      {!counts ? (
        <div className="mt-8 border border-border bg-surface p-6 text-sm text-ink-soft">
          Supabase isn&apos;t configured yet — set <code>SUPABASE_URL</code>,{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code>, <code>NEXT_PUBLIC_SUPABASE_URL</code>, and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>, then run{" "}
          <code>supabase/phase2-directory-schema.sql</code>.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Agencies" value={counts.total} />
          <StatCard label="Verified" value={counts.verified} />
          <StatCard label="Unverified / Pending" value={counts.pending} />
          <StatCard label="Featured" value={counts.featured} />
          <StatCard label="Sponsored" value={counts.sponsored} />
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/admin/agencies/new">Add Agency</Button>
        <Button href="/admin/agencies/import" variant="secondary">Import CSV</Button>
        <Button href="/admin/agencies" variant="secondary">View All Agencies</Button>
      </div>

      <p className="mt-8 text-sm text-muted">
        New agencies default to <strong>Unverified</strong> and won&apos;t appear on the public{" "}
        <Link href="/directory" className="underline underline-offset-4 hover:text-accent">Directory</Link>{" "}
        until you mark them Verified.
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-surface p-5">
      <p className="font-display text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
