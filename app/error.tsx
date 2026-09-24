"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border py-5">
        <div className="container-agency">
          <Link href="/" className="font-display text-xl tracking-tight text-ink">
            {siteConfig.shortName}
          </Link>
        </div>
      </header>
      <Section className="flex-1 text-center !py-32">
        <Eyebrow>Error</Eyebrow>
        <h1 className="text-4xl sm:text-5xl">Something went wrong</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
          An unexpected error occurred. You can try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="secondary">Back to Home</Button>
        </div>
      </Section>
    </div>
  );
}
