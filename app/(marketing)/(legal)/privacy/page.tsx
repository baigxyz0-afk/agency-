import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information submitted through this site.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy" }]} />
      <Eyebrow>Legal</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: [add date on launch]. This is a template policy — have it
        reviewed by counsel for your jurisdiction before publishing.
      </p>

      <div className="prose mt-10 max-w-3xl space-y-8 text-ink-soft">
        <div>
          <h2 className="font-display text-2xl text-ink">Information we collect</h2>
          <p className="mt-3 leading-relaxed">
            When you submit the contact form on this site, we collect the
            information you provide: name, email address, company, website,
            country, industry, service of interest, budget range, project
            description, and timeline. We do not require account creation to
            browse this site.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">How we use it</h2>
          <p className="mt-3 leading-relaxed">
            Contact form submissions are used solely to respond to your inquiry
            and, if you engage us, to deliver the project. We do not sell or
            rent your information to third parties.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Where it&apos;s stored</h2>
          <p className="mt-3 leading-relaxed">
            Form submissions are stored in a Supabase-hosted database.
            Infrastructure providers we rely on may process data in
            accordance with their own privacy and security practices.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Cookies and analytics</h2>
          <p className="mt-3 leading-relaxed">
            See our{" "}
            <Link href="/cookies" className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              Cookie Policy
            </Link>{" "}
            for details on any analytics or tracking technology used on this
            site.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Your rights</h2>
          <p className="mt-3 leading-relaxed">
            Depending on your location, you may have rights to access, correct,
            or request deletion of information we hold about you. Contact{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              {siteConfig.email}
            </a>{" "}
            to make a request.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4 decoration-border-strong hover:text-accent">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
