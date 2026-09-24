import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { QuickInquiryWidget } from "@/components/quick-inquiry/quick-inquiry-widget";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickInquiryWidget />
    </div>
  );
}
