import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a project consultation for web development, web applications, e-commerce, or SEO.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl sm:text-5xl">Request a Project Consultation</h1>
          <p className="mt-5 text-lg text-ink-soft">
            Tell us about the project and we&apos;ll follow up with next steps — usually
            a short call to confirm scope before anything is proposed in writing.
          </p>

          <div className="mt-10 space-y-4">
            <ContactMethod label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            {siteConfig.whatsapp && (
              <ContactMethod label="WhatsApp" value={siteConfig.whatsapp} href={`https://wa.me/${siteConfig.whatsapp}`} />
            )}
            {siteConfig.location && <ContactMethod label="Location" value={siteConfig.location} />}
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}

function ContactMethod({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block text-ink-soft hover:text-accent">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-ink-soft">{value}</p>
      )}
    </div>
  );
}
