"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur">
      <div className="container-agency flex h-[4.5rem] items-center justify-between py-4">
        <Link href="/" className="font-display text-xl tracking-tight text-ink" onClick={() => setOpen(false)}>
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs">▾</span>
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 border border-border bg-surface p-5 shadow-sm">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-sm px-2 py-1.5 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors"
                          onClick={() => setServicesOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/contact" className="!px-5 !py-2.5">
            Start a Project
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            className="text-ink"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-6 border-t border-ink" />
            <span className="mt-1.5 block w-6 border-t border-ink" />
            <span className="mt-1.5 block w-4 border-t border-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-paper lg:hidden">
          <nav className="container-agency flex flex-col gap-1 py-4" aria-label="Mobile">
            {primaryNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-muted hover:text-ink"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button href="/contact" className="mt-3 justify-center" >
              Start a Project
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
