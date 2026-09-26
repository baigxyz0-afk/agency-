import Image from "next/image";
import type { PortfolioCategory } from "@/content/portfolio";

// High-fidelity interface mockups for portfolio thumbnails, built from CSS
// and inline SVG rather than photographs or screenshots — these are demo
// projects with no real product behind them, so a genuine screenshot can't
// exist. Real (but generic, illustrative) copy and numbers are used
// throughout — actual nav labels, chart legends, stat figures — so these
// read as believable interface renders rather than gray-box wireframes,
// without depicting a specific real brand, client, or dataset.

function LogoMark({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return <span className={`h-2.5 w-2.5 rounded-full ${tone === "ink" ? "bg-ink" : "bg-paper"}`} />;
}

// Real (freely-licensed, Unsplash) placeholder photography instead of flat
// gradient blocks, so these already-disclosed demo mockups ("Illustrative
// mockup, not a real client screenshot") read as believable interface
// renders. Each photoId is hand-picked to match its slot (an office/team
// photo for the studio hero, a bag for "Canvas Weekender," a staged living
// room for a listing card) rather than a random, unrelated stock photo.
function PhotoBlock({ className = "", photoId }: { className?: string; photoId: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(135deg,var(--color-photo-1)_0%,var(--color-photo-2)_45%,var(--color-photo-3)_100%)] ${className}`}
    >
      <Image
        src={`https://images.unsplash.com/${photoId}?w=640&h=480&fit=crop&auto=format`}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, 50vw"
        className="object-cover"
      />
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-2.5 w-2.5 ${filled ? "fill-accent" : "fill-border-strong"}`}>
      <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.7l-5.2 2.8 1-5.8L1.6 7.6l5.8-.8L10 1.5z" />
    </svg>
  );
}

function StarRating({ count = 4 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} filled={i < count} />
      ))}
      <span className="ml-1 text-[7px] text-muted">({count * 8})</span>
    </div>
  );
}

function TopNav({
  brand = "Brand",
  items = ["Home", "Product", "Pricing"],
  cta = "Sign In",
  ctaTone = "ink",
}: {
  brand?: string;
  items?: string[];
  cta?: string;
  ctaTone?: "ink" | "accent";
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
      <div className="flex items-center gap-1.5">
        <LogoMark />
        <span className="text-[9px] font-semibold tracking-tight text-ink">{brand}</span>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        {items.map((item) => (
          <span key={item} className="text-[7.5px] text-ink-soft">{item}</span>
        ))}
      </div>
      <span
        className={`rounded-sm px-2 py-1 text-[7.5px] font-medium ${
          ctaTone === "accent" ? "bg-accent text-paper" : "bg-ink text-paper"
        }`}
      >
        {cta}
      </span>
    </div>
  );
}

function LineChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 45 L25 38 L50 42 L75 22 L100 28 L125 14 L150 20 L175 8 L200 12 L200 60 L0 60 Z"
        fill="url(#chartFill)"
      />
      <path
        d="M0 45 L25 38 L50 42 L75 22 L100 28 L125 14 L150 20 L175 8 L200 12"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sparkline({ points, className = "" }: { points: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 20" preserveAspectRatio="none" className={className}>
      <path d={points} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendBadge({ value, positive = true }: { value: string; positive?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[8px] font-medium ${positive ? "text-success" : "text-error"}`}>
      {positive ? "▲" : "▼"} {value}
    </span>
  );
}

function StatusPill({ label, tone }: { label: string; tone: "accent" | "success" | "muted" }) {
  const toneClasses = {
    accent: "bg-accent-soft text-accent",
    success: "bg-success/10 text-success",
    muted: "bg-border-strong/50 text-muted",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[7px] font-medium ${toneClasses[tone]}`}>{label}</span>;
}

function WebsiteGraphic() {
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <TopNav brand="Northline" items={["Home", "Services", "Work", "About"]} cta="Get Started" />
      <div className="grid flex-1 grid-cols-2 items-center gap-4 p-5">
        <div className="space-y-2">
          <p className="text-[8px] font-medium uppercase tracking-wide text-accent">Full-Service Studio</p>
          <p className="text-[13px] font-semibold leading-tight text-ink">Design that moves your business forward</p>
          <p className="text-[8px] leading-snug text-muted">
            We plan, build, and optimize websites that convert visitors into customers.
          </p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-sm bg-ink px-2.5 py-1.5 text-[7.5px] font-medium text-paper">Book a Call</span>
            <span className="rounded-sm border border-border-strong px-2.5 py-1.5 text-[7.5px] font-medium text-ink-soft">
              See Our Work
            </span>
          </div>
        </div>
        <PhotoBlock className="aspect-[4/3] w-full" photoId="photo-1557804506-669a67965ba0" />
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-border p-4">
        {[
          { label: "Strategy", body: "Research-led planning" },
          { label: "Design", body: "Interfaces that convert" },
          { label: "Launch", body: "Fast, measurable results" },
        ].map((f) => (
          <div key={f.label} className="space-y-1">
            <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-[7.5px] font-semibold text-ink">{f.label}</p>
            <p className="text-[7px] text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcommerceGraphic() {
  const products = [
    { name: "Canvas Weekender", price: "$128", was: "$160", rating: 5, photoId: "photo-1546938576-04917ec516ee" },
    { name: "Studio Tote", price: "$64", was: null, rating: 4, photoId: "photo-1604712941007-2627cfd759fd" },
    { name: "Field Jacket", price: "$210", was: null, rating: 4, photoId: "photo-1548883354-d056ab7b441f" },
    { name: "Wool Scarf", price: "$48", was: "$60", rating: 5, photoId: "photo-1609803384069-19f3e5a70e75" },
    { name: "Leather Belt", price: "$72", was: null, rating: 4, photoId: "photo-1664286074176-5206ee5dc878" },
    { name: "Travel Kit", price: "$36", was: null, rating: 5, photoId: "photo-1553265472-b913dd3e32a2" },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <TopNav brand="Fieldmark" items={["Shop", "Collections", "Sale"]} cta="Cart (2)" ctaTone="accent" />
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[7px] font-medium text-paper">All</span>
          <span className="rounded-full border border-border-strong px-2.5 py-1 text-[7px] text-ink-soft">Bags</span>
          <span className="rounded-full border border-border-strong px-2.5 py-1 text-[7px] text-ink-soft">Outerwear</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {products.map((p) => (
            <div key={p.name} className="space-y-1">
              <PhotoBlock className="aspect-square w-full" photoId={p.photoId} />
              <p className="truncate text-[7.5px] font-medium text-ink">{p.name}</p>
              <StarRating count={p.rating} />
              <div className="flex items-baseline gap-1.5">
                {p.was && <span className="text-[7px] text-muted line-through">{p.was}</span>}
                <span className="text-[8.5px] font-semibold text-accent-dark">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SaasGraphic() {
  const stats = [
    { label: "Revenue", value: "$48.2k", trend: "12%", positive: true },
    { label: "Active Users", value: "12,847", trend: "8%", positive: true },
    { label: "Churn Rate", value: "2.4%", trend: "4%", positive: false },
  ];
  return (
    <div className="flex h-full w-full bg-surface">
      <div className="hidden w-12 shrink-0 flex-col items-center gap-4 border-r border-border bg-ink py-4 sm:flex">
        <LogoMark tone="paper" />
        <div className="flex flex-col gap-3">
          {["home", "chart", "users", "settings"].map((icon, i) => (
            <span key={icon} className={`h-4 w-4 rounded-sm ${i === 0 ? "bg-accent" : "bg-paper/20"}`} />
          ))}
        </div>
        <span className="mt-auto h-5 w-5 rounded-full bg-paper/25" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="text-[9px] font-semibold text-ink">Overview</p>
          <span className="h-4 w-4 rounded-full bg-border-strong" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="grid shrink-0 grid-cols-3 gap-2.5">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1 border border-border p-2">
                <p className="text-[7px] text-muted">{s.label}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold text-ink">{s.value}</span>
                  <TrendBadge value={s.trend} positive={s.positive} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 border border-border p-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-medium text-ink-soft">Revenue Trend</p>
              <p className="text-[7px] text-muted">Last 6 months</p>
            </div>
            <LineChart className="mt-1 h-[calc(100%-14px)] min-h-14 w-full" />
            <div className="flex justify-between text-[6.5px] text-muted">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardGraphic() {
  const stats = [
    { label: "Sessions", value: "24.1k", d: "M0 15 L15 12 L30 14 L45 6 L60 9", tone: "text-accent" },
    { label: "Conversions", value: "892", d: "M0 8 L15 10 L30 6 L45 12 L60 4", tone: "text-success" },
    { label: "Avg. Order", value: "$64", d: "M0 12 L15 14 L30 8 L45 10 L60 6", tone: "text-accent" },
    { label: "Bounce Rate", value: "38%", d: "M0 6 L15 9 L30 13 L45 7 L60 11", tone: "text-error" },
  ];
  const campaigns = [
    { name: "Summer Sale", clicks: "3,204", status: "Active", tone: "success" as const },
    { name: "Newsletter", clicks: "1,857", status: "Active", tone: "success" as const },
    { name: "Retargeting", clicks: "946", status: "Paused", tone: "muted" as const },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <TopNav brand="Insight" items={["Dashboard", "Reports"]} cta="Export" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid shrink-0 grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1 border border-border p-2">
              <p className="truncate text-[6.5px] text-muted">{s.label}</p>
              <p className="text-[9px] font-semibold text-ink">{s.value}</p>
              <Sparkline points={s.d} className={`h-4 w-full ${s.tone}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 border border-border p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[7.5px] font-medium text-ink-soft">Traffic Overview</p>
            <span className="flex items-center gap-1 text-[6.5px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Sessions
            </span>
          </div>
          <LineChart className="mt-1 h-[calc(100%-12px)] min-h-14 w-full" />
        </div>
        <div className="shrink-0 space-y-1.5 border border-border p-2.5">
          {campaigns.map((c) => (
            <div key={c.name} className="flex items-center justify-between">
              <p className="text-[7.5px] text-ink-soft">{c.name}</p>
              <p className="text-[7px] text-muted">{c.clicks} clicks</p>
              <StatusPill label={c.status} tone={c.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebAppGraphic() {
  const listings = [
    { title: "Unit 204 — 2BR Loft", meta: "1,120 sqft · Downtown", price: "$2,150/mo", active: false, photoId: "photo-1738168279272-c08d6dd22002" },
    { title: "Unit 118 — 3BR Corner", meta: "1,450 sqft · Riverside", price: "$2,600/mo", active: true, photoId: "photo-1666282167632-c613fbeb163c" },
    { title: "Unit 305 — Studio", meta: "620 sqft · Midtown", price: "$1,480/mo", active: false, photoId: "photo-1682184805271-11671b7ecf4c" },
    { title: "Unit 402 — 1BR + Den", meta: "890 sqft · Arts District", price: "$1,890/mo", active: false, photoId: "photo-1628592102751-ba83b0314276" },
  ];
  return (
    <div className="flex h-full w-full bg-surface">
      <div className="flex flex-1 flex-col border-r border-border">
        <div className="flex items-center gap-2 border-b border-border p-3">
          <span className="flex-1 rounded-sm border border-border-strong px-2 py-1 text-[7px] text-muted">
            Search listings…
          </span>
          <span className="h-5 w-5 shrink-0 rounded-sm border border-border-strong" />
        </div>
        <div className="space-y-2 p-3">
          {listings.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-2 border p-2 ${item.active ? "border-accent bg-accent-soft/40" : "border-border"}`}
            >
              <PhotoBlock className="h-9 w-11 shrink-0" photoId={item.photoId} />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="truncate text-[7.5px] font-medium text-ink">{item.title}</p>
                <p className="truncate text-[6.5px] text-muted">{item.meta}</p>
              </div>
              <span className="shrink-0 text-[7px] font-semibold text-accent-dark">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden w-2/5 flex-col gap-2.5 p-4 sm:flex">
        <PhotoBlock className="aspect-[4/3] w-full" photoId="photo-1666282167632-c613fbeb163c" />
        <p className="text-[8.5px] font-semibold text-ink">Unit 118 — 3BR Corner</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Beds", value: "3" },
            { label: "Baths", value: "2" },
            { label: "Sqft", value: "1,450" },
            { label: "Price", value: "$2,600" },
          ].map((spec) => (
            <div key={spec.label}>
              <p className="text-[6.5px] text-muted">{spec.label}</p>
              <p className="text-[8px] font-medium text-ink">{spec.value}</p>
            </div>
          ))}
        </div>
        <span className="mt-1 rounded-sm bg-ink px-2 py-1.5 text-center text-[7.5px] font-medium text-paper">
          Schedule a Tour
        </span>
      </div>
    </div>
  );
}

const graphicsByCategory: Record<PortfolioCategory, () => React.ReactElement> = {
  Websites: WebsiteGraphic,
  "E-commerce": EcommerceGraphic,
  SaaS: SaasGraphic,
  Dashboards: DashboardGraphic,
  "Web Applications": WebAppGraphic,
};

export function ProjectGraphic({ category, className = "" }: { category: PortfolioCategory; className?: string }) {
  const Graphic = graphicsByCategory[category] ?? WebsiteGraphic;
  return (
    <div className={`overflow-hidden border-b border-border ${className}`}>
      <Graphic />
    </div>
  );
}
