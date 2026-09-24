import { Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function MarketingNotFound() {
  return (
    <Section className="text-center !py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-4xl sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="secondary">Contact Us</Button>
      </div>
    </Section>
  );
}
