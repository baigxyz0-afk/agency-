// Real, human-reviewed articles only — see the "no AI filler content" rule.
// Each entry becomes a page automatically via app/resources/[slug].
export type ResourceCategory =
  | "Web Development"
  | "SEO"
  | "Technical SEO"
  | "E-commerce"
  | "SaaS"
  | "Local SEO"
  | "Web Performance"
  | "Conversion Optimization"
  | "Business Technology";

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  publishedAt: string;
  body: string[];
};

export const resources: Resource[] = [
  {
    slug: "core-web-vitals-explained",
    title: "Core Web Vitals, Explained Without the Jargon",
    category: "Web Performance",
    summary:
      "What LCP, INP, and CLS actually measure, why Google cares, and where most sites lose points.",
    publishedAt: "2026-02-03",
    body: [
      "Core Web Vitals are the three performance metrics Google uses as a ranking signal and, more importantly, as a proxy for whether a real visitor had a good experience on your page. There are three of them, and each measures something different: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
      "LCP measures how long it takes the largest visible element — usually a hero image, a heading, or a banner — to render. Google considers 2.5 seconds or faster 'good.' The most common cause of a slow LCP isn't server speed, it's an unoptimized hero image: a 4MB PNG served at full resolution to a phone on a mobile connection will blow the budget by itself, regardless of how fast your server responds.",
      "INP replaced First Input Delay as the official responsiveness metric in March 2024. It measures the time between a user interaction — a click, a tap, a keypress — and the next time the browser can actually paint the result on screen, sampled across every interaction on the page, not just the first one. Good is 200 milliseconds or under. Heavy client-side JavaScript that blocks the main thread is the usual culprit, which is one reason we default to server-rendered pages and only add client-side interactivity where the page actually needs it.",
      "CLS measures visual stability: how much content jumps around as a page loads. It's caused by images without reserved dimensions, web fonts that swap in and reflow text, or ads and embeds injected above existing content. Good is a CLS score under 0.1. It's usually the cheapest of the three to fix — reserving space for images and embeds before they load eliminates most of it — and one of the most visible to a real visitor, since a shifting page is what makes a site feel cheap even when it 'works.'",
      "None of these numbers are pass/fail gates that flip a switch in rankings. They're one input among many, and a page can rank well with mediocre vitals if everything else about it is strong. But they're also the rare SEO factor you can measure directly, for free, in Chrome's own DevTools or via Google's PageSpeed Insights — so there's no excuse for not knowing where a site actually stands before guessing at fixes.",
    ],
  },
  {
    slug: "local-seo-checklist-for-service-businesses",
    title: "A Local SEO Checklist for Service Businesses",
    category: "Local SEO",
    summary:
      "The specific, checkable things that move a local service business into the map pack — not vague advice.",
    publishedAt: "2026-02-17",
    body: [
      "Local SEO for a service business — a roofer, a plumber, a dentist, a law firm with one office — runs on different rules than SEO for a national e-commerce brand. The prize isn't the ten blue links; it's the three-pack of map results that shows above them for a huge share of local searches. Getting there is less about mystery and more about a checklist most businesses simply haven't finished.",
      "Start with the Google Business Profile, because it carries more weight for local pack rankings than almost anything on the website itself. The business name should match your actual signage exactly — no keyword-stuffed variations. The primary category should be the single most accurate one available, not the broadest. Every service you offer should be listed individually, service areas should reflect where you actually work, and photos should be real, current, and added regularly rather than left untouched since setup.",
      "Next, name/address/phone (NAP) consistency across the web. If your Google profile says '123 Main St, Suite 4' and your Yelp listing says '123 Main Street #4,' that inconsistency is noise Google has to resolve, and it can dilute the trust signal that consistent citations build. Pick one canonical format and use it everywhere — the website footer, every directory listing, every citation.",
      "On the website itself, a single generic 'service areas' page listing twelve city names is close to worthless. Each city or service area that matters commercially deserves its own page with genuinely different content: a specific reference to that area, any location-specific details (permit requirements, climate factors, typical job types), and its own LocalBusiness structured data. A template that only swaps the city name in a sentence is thin content, and it reads that way to both users and Google.",
      "Reviews are the last major lever, and the two things that matter are volume and recency — a business with 40 reviews from three years ago and nothing since reads as less active than one with 15 reviews trickling in every month. Make asking for a review part of the actual service workflow (a text or email sent right after the job, not a sign in the waiting room) rather than an afterthought, and respond to every review, positive or negative — that response is public and read by the next prospective customer, not just the reviewer.",
    ],
  },
  {
    slug: "faceted-navigation-without-duplicate-content",
    title: "Faceted Navigation Without the Duplicate-Content Mess",
    category: "E-commerce",
    summary:
      "Why filterable e-commerce catalogs generate thousands of near-duplicate URLs, and the fixes that actually scale.",
    publishedAt: "2026-03-02",
    body: [
      "Faceted navigation — the size, color, price, and brand filters on a category page — is one of the best conversion tools an e-commerce site has, and one of the most reliable ways to accidentally generate tens of thousands of near-duplicate URLs that choke a crawl budget. Every combination of filters a shopper can select is, by default, its own unique URL with its own query parameters. A catalog with even a modest number of filters can produce combinatorial URL counts in the hundreds of thousands.",
      "The core problem is that most of those combinations return nearly identical content to the base category page, just re-sorted or lightly filtered, which is the textbook definition of duplicate content at scale. Search engines that spend their limited crawl budget on 50,000 filter-combination URLs are spending less of it on the pages you actually want indexed — new products, restocked items, the pages that convert.",
      "The fix starts with deciding, deliberately, which filter combinations deserve to be indexable pages and which don't. A combination with real, sustained search demand — 'women's running shoes size 8,' say — can justify being a real, canonical, indexable page with its own title and intro copy. A combination like 'blue AND size 8 AND under $50 AND in stock' almost never has search demand of its own and should be handled as a non-indexable, parameter-driven view instead.",
      "Mechanically, that split is enforced with a combination of canonical tags pointing non-indexable combinations back to their parent category, a robots meta noindex on the thinnest combinations, and — where the platform supports it — keeping those parameters out of Google Search Console's indexed count entirely via URL parameter handling or a well-structured robots.txt disallow pattern. None of these tools work well in isolation; they need to agree with each other, because a page that's both canonicalized elsewhere and separately noindexed sends a mixed signal.",
      "The last piece is internal linking discipline: only link to the filter combinations you've decided should be indexable, from places like curated collection pages or navigation, so crawlers discover the right subset organically instead of finding every combination through the filter UI itself. Get this right once, as part of the information architecture, and it doesn't need revisiting every time a new product attribute gets added.",
    ],
  },
  {
    slug: "structured-data-what-to-add-first",
    title: "Structured Data: What to Add First, and What to Skip",
    category: "Technical SEO",
    summary:
      "Not every schema type is worth your time. Here's what actually earns rich results, in priority order.",
    publishedAt: "2026-03-18",
    body: [
      "Structured data — usually written as JSON-LD, Google's preferred format — is a way of describing a page's content in a vocabulary search engines can parse directly, rather than inferring it from headings and body text. Done well, it earns rich results: star ratings in a search snippet, an FAQ accordion, a job posting card. Done badly, or added everywhere indiscriminately, it does nothing and wastes development time that could go toward something that moves rankings.",
      "Organization and WebSite schema belong on every site regardless of type — they're cheap to add, low-risk, and help search engines understand who's behind a site and how its internal search works. BreadcrumbList schema is nearly as universal: it's inexpensive to generate from whatever navigation structure already exists, and it reliably improves how a URL's breadcrumb trail displays in search results.",
      "Past that baseline, the right schema depends entirely on the page type. A local service business should prioritize LocalBusiness schema with accurate address, hours, and service-area data — it's one of the more direct connections between structured data and local pack visibility. An e-commerce product page should carry Product schema with price, availability, and — only if genuinely present — AggregateRating, since Google has become stricter about rejecting review markup it can't verify against visible on-page reviews.",
      "FAQPage schema deserves a specific caution: Google significantly narrowed which sites are eligible to show FAQ rich results, largely limiting them to well-established government and health sites. Adding FAQPage markup to a general business site in 2026 mostly no longer produces the rich result it used to, even though the schema itself is still valid. It's not harmful to include, but it shouldn't be treated as a growth lever anymore.",
      "The highest-leverage habit isn't adding more schema types, it's validating the ones already in place. A LocalBusiness entry with a phone number that doesn't match the visible page, or a Product entry with a price that's out of sync with what's actually charged at checkout, is worse than having no markup at all — it's the kind of inconsistency that can trigger a manual structured-data spam action. Test with Google's Rich Results Test after every deploy that touches a templated page, not just once at launch.",
    ],
  },
  {
    slug: "why-we-build-on-nextjs-typescript-postgresql",
    title: "Why We Build on Next.js, TypeScript, and PostgreSQL",
    category: "Web Development",
    summary:
      "The reasoning behind a small, deliberately chosen stack, instead of picking a new framework per project.",
    publishedAt: "2026-04-05",
    body: [
      "Every framework decision is a bet on what will still be maintainable — by us or by whoever inherits the codebase — three years from now, not just what ships fastest this quarter. That's the filter behind standardizing on Next.js, TypeScript, and PostgreSQL rather than picking whatever's newest for each new engagement.",
      "Next.js earns its place because it's one of the few frameworks that treats both rendering strategy and SEO as first-class concerns rather than afterthoughts. Server-side rendering and static generation are built in, not bolted on with a plugin, which matters directly for Core Web Vitals and crawlability — the two things a marketing site or e-commerce storefront can't afford to get wrong. Its App Router also makes it straightforward to keep most of a page server-rendered and add client-side interactivity only where a page genuinely needs it, which keeps JavaScript payloads — and therefore INP — under control by default rather than by discipline.",
      "TypeScript's value shows up less on day one and more on day two hundred. A marketing site with thirty content-driven pages, or a directory with a schema spanning agencies, industries, and locations, has a lot of surface area for a typo or a mismatched field name to cause a silent bug. Catching that at compile time, before it reaches a client's production site, is worth the modest overhead of writing types — especially on a codebase more than one person will ever touch.",
      "PostgreSQL is the choice for anything that needs real relational data — a directory, a contact form's submissions, an admin dashboard's authentication. It's mature, well-documented, handles relational integrity properly through foreign keys and constraints rather than leaving that enforcement to application code, and has a long enough track record that hosting, backups, and tooling are all solved problems rather than open questions. Building on Supabase specifically adds a managed Postgres instance with authentication and row-level security already wired together, which removes a meaningful amount of infrastructure work without giving up the ability to run direct SQL when a project genuinely needs it.",
      "None of this is a claim that other stacks are wrong — plenty of good sites run on other combinations. It's a claim that switching frameworks per project, chasing whatever's trending, trades short-term novelty for long-term maintenance cost, and that a smaller set of tools we know deeply produces fewer surprises in production than a wider set we know shallowly.",
    ],
  },
  {
    slug: "seo-safe-website-redesign-checklist",
    title: "How to Redesign a Website Without Losing Your Rankings",
    category: "SEO",
    summary:
      "A redesign is one of the few events that can tank years of SEO progress in a single launch. Here's how to not do that.",
    publishedAt: "2026-04-22",
    body: [
      "A website redesign is, from a search engine's perspective, indistinguishable from a site disappearing and a different site appearing in its place — unless the redesign is executed with that risk explicitly managed. The single most common cause of a post-redesign traffic collapse isn't a design decision at all; it's URL structure changing without a complete redirect map from every old URL to its new equivalent.",
      "Before any design work starts, crawl the existing site and export every indexed URL, along with its current organic traffic and ranking keywords from whatever analytics and search console access is available. That list is the redirect map's starting point, and it's also the baseline you'll compare against after launch to know whether the redesign actually held its ground. Skipping this step because 'the new sitemap is simpler' is exactly how high-traffic pages quietly vanish.",
      "Every old URL that has any organic traffic or backlinks needs a 301 redirect to its most relevant new equivalent — not a blanket redirect to the homepage, which passes almost none of the original page's authority and tells search engines the old content is simply gone. Where a page's content and purpose genuinely didn't survive the redesign, redirecting it to the closest topical match is still better than the homepage or a 404.",
      "Content shouldn't shrink during a redesign, and this is where 'let's simplify the site' most often goes wrong from an SEO standpoint. A page carrying 800 words of content that a new template compresses into 150 words of vague copy loses whatever search intent it was originally satisfying, even if the URL redirects perfectly. If a design system genuinely can't accommodate the old content depth, that's a signal to reconsider the design system, not to quietly drop the content.",
      "Launch on a staging environment first, verify every redirect actually works with a full crawl before flipping DNS, and keep the old site's XML sitemap active alongside the new one for the first few weeks so search engines have both discovery paths while re-indexing settles. Then watch rankings and organic traffic daily for the first month, not just at the one-month mark — catching a broken redirect chain on day three is a five-minute fix; catching it on day thirty after rankings have already dropped is a much longer recovery.",
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}
