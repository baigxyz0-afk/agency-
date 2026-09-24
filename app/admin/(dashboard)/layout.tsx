import Link from "next/link";
import { logout } from "@/app/admin/actions/auth";
import { siteConfig } from "@/lib/site-config";
import { QuickAddAgencyForm } from "@/components/admin/quick-add-agency-form";

const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Agencies", href: "/admin/agencies" },
  { label: "Import CSV", href: "/admin/agencies/import" },
  { label: "Industries & Locations", href: "/admin/taxonomy" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper-dim">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface sm:flex">
        <div className="border-b border-border px-6 py-5">
          <Link href="/admin" className="font-display text-lg">{siteConfig.shortName}</Link>
          <p className="text-xs text-muted">Admin</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4" aria-label="Admin">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <QuickAddAgencyForm />
          </div>
        </div>

        <form action={logout} className="border-t border-border p-4">
          <button type="submit" className="w-full rounded-sm px-3 py-2 text-left text-sm text-muted hover:bg-paper-dim hover:text-ink">
            Sign out
          </button>
        </form>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4 sm:hidden">
          <Link href="/admin" className="font-display text-lg">{siteConfig.shortName} Admin</Link>
          <form action={logout}>
            <button type="submit" className="text-sm text-muted">Sign out</button>
          </form>
        </header>
        <main className="p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
