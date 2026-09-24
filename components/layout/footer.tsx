import Link from "next/link";
import { siteConfig, footerNav } from "@/lib/site-config";
import { Container } from "@/components/ui/container";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Company", items: footerNav.company },
  { title: "Services", items: footerNav.services },
  { title: "SEO", items: footerNav.seo },
  { title: "Industries", items: footerNav.industries },
  { title: "Resources", items: footerNav.resources },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-paper-dim text-ink/90">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-xl text-ink">
              {siteConfig.shortName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink/60">{siteConfig.description}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-ink/50">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink/75 hover:text-ink transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
