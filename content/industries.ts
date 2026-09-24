export type IndustryFaq = { question: string; answer: string };

export type Industry = {
  slug: string;
  name: string;
  heroSummary: string;
  overview: string[];
  problems: string[];
  websiteRequirements: string[];
  seoOpportunities: string[];
  developmentSolutions: string[];
  conversionFocus: string[];
  localSeoStrategy: string[];
  technologies: string[];
  projectTypes: string[];
  faqs: IndustryFaq[];
};

export const industries: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    heroSummary:
      "Roofing companies compete on emergency response and local trust — the website has to convert a storm-damage search into a phone call in under a minute.",
    overview: [
      "Roofing is a high-intent, low-research-time category: most searches happen after damage — storm, leak, age — and the buyer wants a fast, credible response, not a long brand story. Search behavior splits between emergency terms (\"roof leak repair near me\") and planned-project terms (\"metal roof cost [city]\"), which need different landing experiences.",
      "The category is also intensely local. A roofing company in Houston is not competing nationally; it's competing against six other companies that show up in the same map pack for the same zip codes.",
    ],
    problems: [
      "Single-page sites with no service-specific or location-specific landing pages",
      "No clear path from \"I have a problem\" to a phone call or form in under two clicks",
      "Google Business Profile out of sync with actual service areas",
      "No before/after project documentation, which is the primary trust signal in this category",
      "Slow-loading image-heavy pages on mobile, where most emergency searches happen",
    ],
    websiteRequirements: [
      "Service pages split by roof type and job type (repair, replacement, inspection, storm damage)",
      "Location pages for each city or service area, not one generic \"service area\" page",
      "Click-to-call as the dominant mobile CTA, not a buried contact form",
      "Project gallery with real before/after photos",
      "Financing and insurance-claim information, since many jobs are insurance-driven",
    ],
    seoOpportunities: [
      "Map pack visibility for \"[service] + [city]\" queries",
      "Storm-damage and emergency-intent content that spikes seasonally",
      "Review volume and recency as a ranking and conversion factor",
      "Service + material combination pages (e.g. \"metal roof installation\")",
    ],
    developmentSolutions: [
      "Location page template driven by a single data model so new service areas don't require custom pages",
      "Lightweight image pipeline for project galleries so photo-heavy pages still load fast",
      "Quote-request form with job-type branching instead of one generic contact form",
    ],
    conversionFocus: [
      "Phone number visible and tappable on every screen, not just the homepage",
      "Emergency vs. planned-project paths separated at the top of the homepage",
      "Financing and insurance messaging near the CTA, where cost objections actually surface",
    ],
    localSeoStrategy: [
      "Google Business Profile categories and service list matched exactly to what's offered",
      "City-specific landing pages with genuinely different content, not swapped city names on one template",
      "Citation consistency across directories using one canonical name/address/phone record",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile", "Click-to-call tracking"],
    projectTypes: [
      "Multi-location roofing company site with per-city landing pages",
      "Lead-generation site redesign focused on storm-damage search intent",
      "Local SEO engagement for a single-market roofing contractor",
    ],
    faqs: [
      {
        question: "Do we need a separate page for every city we serve?",
        answer:
          "Only where there's genuine local relevance and enough content to make the page useful — a city page with three sentences and a swapped place name is a thin page that can hurt more than it helps. We build a template that supports real per-city content (service area specifics, local project examples) rather than mass-generating near-duplicate pages.",
      },
      {
        question: "How fast can a roofing site realistically rank for local terms?",
        answer:
          "It depends on current domain history, competition density in the specific metro, and how consistent your Google Business Profile and citations already are. We don't quote fixed timelines up front — an audit gives a realistic baseline before any commitment.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    heroSummary:
      "Plumbing searches are dominated by urgent, high-intent terms — the site and local presence need to win the map pack, not just the organic ten-blue-links.",
    overview: [
      "Like roofing, plumbing search intent is split between emergencies (burst pipe, no hot water) and planned work (bathroom remodel plumbing, water heater installation). Emergency searches convert on speed and visible availability; planned work converts on trust signals and pricing transparency.",
      "Map pack placement matters disproportionately here because a large share of plumbing searches happen on mobile, close to the point of need.",
    ],
    problems: [
      "No 24/7 availability messaging where it's actually offered",
      "Service list buried in a PDF or a single unstructured paragraph",
      "No pricing guidance at all, which pushes price-sensitive searchers to a competitor who shows a starting rate",
      "Google Business Profile categories that don't match actual specialties (drain cleaning vs. full re-pipe, for example)",
    ],
    websiteRequirements: [
      "Emergency availability messaging visible above the fold",
      "Service pages by job type: drain cleaning, water heater, repiping, leak detection, fixture installation",
      "Transparent pricing ranges or at minimum a clear \"request a quote\" path",
      "Licensing and insurance information, which is a real trust and compliance signal in this trade",
    ],
    seoOpportunities: [
      "Emergency-intent keyword coverage (\"emergency plumber [city]\")",
      "Service + fixture combination pages",
      "Map pack optimization tied to service-area accuracy",
    ],
    developmentSolutions: [
      "Service-page template with job-type branching for quote requests",
      "Fast-loading mobile experience prioritized over desktop, matching actual search behavior",
    ],
    conversionFocus: [
      "Call button fixed and visible on mobile scroll",
      "Same-day/emergency availability stated explicitly, not implied",
    ],
    localSeoStrategy: [
      "Service list in Google Business Profile matched to actual licensed capabilities",
      "Review generation workflow tied to completed job follow-up",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile"],
    projectTypes: [
      "Emergency-focused landing page redesign for a residential plumbing company",
      "Multi-service-area site for a regional plumbing franchise",
    ],
    faqs: [
      {
        question: "Should pricing be listed on the site?",
        answer:
          "Full fixed pricing rarely works for plumbing because job scope varies too much sight-unseen, but a starting range or transparent estimate process reduces bounce from price-sensitive searchers who'd otherwise leave without contacting you.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    heroSummary:
      "Real estate sites live or die on listing data freshness, search/filter usability, and how well individual property pages are structured for both buyers and search engines.",
    overview: [
      "Real estate websites serve two very different audiences from the same page: buyers searching by neighborhood, price, or property type, and search engines trying to index thousands of individual listing pages that change or expire constantly.",
      "The category also has a strong local-search dimension — neighborhood and market-specific content performs where generic \"homes for sale\" content doesn't.",
    ],
    problems: [
      "Listing data pulled from an MLS feed with no SEO structure applied to the resulting pages",
      "Expired listings left live as broken or stale pages instead of properly redirected",
      "Search/filter interfaces that generate crawlable near-duplicate URLs for every filter combination",
      "No neighborhood or market-level content connecting listings to local search intent",
    ],
    websiteRequirements: [
      "Listing pages with structured, consistent data (price, beds, baths, square footage, photos)",
      "Search and filter UI that doesn't fragment SEO equity across thousands of filter-combination URLs",
      "Neighborhood/market landing pages that aggregate listings with genuine local context",
      "Saved search and alert functionality for repeat visitors",
    ],
    seoOpportunities: [
      "Neighborhood and market-level content targeting local buyer/seller intent",
      "Structured data for listings (RealEstateListing/Product schema where applicable)",
      "Proper handling of expired/sold listings via redirects instead of soft-404s",
    ],
    developmentSolutions: [
      "MLS/IDX feed integration with a clean data model separate from presentation",
      "Faceted search architecture with canonicalization to prevent duplicate-URL indexation issues",
      "Automated redirect handling for expired listings",
    ],
    conversionFocus: [
      "Clear agent/office contact path on every listing page",
      "Saved search and lead-capture without gating basic listing browsing",
    ],
    localSeoStrategy: [
      "Market and neighborhood pages built around genuine local data (schools, walkability, price trends)",
      "Agent/office Google Business Profiles optimized where the brokerage has physical locations",
    ],
    technologies: ["Next.js", "IDX/MLS integration", "RealEstateListing Schema", "PostgreSQL"],
    projectTypes: [
      "Brokerage site with IDX integration and neighborhood landing pages",
      "Agent portfolio site with lead-capture and saved-search functionality",
    ],
    faqs: [
      {
        question: "How do you handle SEO for listings that come and go constantly?",
        answer:
          "Expired or sold listings get redirected to the relevant neighborhood or search page rather than left as dead pages or soft-404s — that preserves whatever link equity and rankings the listing page had accumulated instead of losing it every time a property sells.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    heroSummary:
      "Healthcare sites need to balance patient-facing clarity, accessibility, and compliance-aware handling of any forms that touch personal health information.",
    overview: [
      "Healthcare websites — practices, clinics, specialists — serve patients who are often searching under stress or time pressure, and need appointment booking, insurance information, and provider credentials to be easy to find, not buried in navigation.",
      "Accessibility is a higher-stakes requirement in this category than most, since patients researching care may be doing so with visual, motor, or cognitive impairments the site needs to accommodate.",
    ],
    problems: [
      "Appointment booking that requires a phone call when online scheduling would reduce no-shows and friction",
      "Provider bios with no specialty or credential structure, making it hard for patients to find the right fit",
      "Forms collecting patient information without appropriate handling — any form gathering health data needs deliberate data-handling design",
      "Insurance-accepted information missing or out of date",
    ],
    websiteRequirements: [
      "Clear provider directory with specialties, credentials, and accepted insurance",
      "Accessible design meeting WCAG-conscious standards throughout, not just on the homepage",
      "Deliberate, minimal data collection on any form — never collect more than the workflow requires",
      "Location and hours information structured for both patients and search engines",
    ],
    seoOpportunities: [
      "Provider and specialty pages targeting \"[specialty] near me\" and condition-specific searches",
      "LocalBusiness/MedicalOrganization schema for practice locations",
      "Content addressing common patient questions in plain, accurate language",
    ],
    developmentSolutions: [
      "Provider directory with structured specialty and credential data",
      "Accessible form components with clear validation and error messaging",
      "Integration with scheduling systems where the practice already uses one",
    ],
    conversionFocus: [
      "Appointment request as the primary CTA, phone as the fallback",
      "Insurance and cost transparency reducing pre-visit uncertainty",
    ],
    localSeoStrategy: [
      "Individual location pages for multi-site practices",
      "Google Business Profile accuracy for hours, services, and accepted insurance",
    ],
    technologies: ["Next.js", "MedicalOrganization Schema", "Accessible form components"],
    projectTypes: [
      "Multi-provider clinic site with specialty-based provider directory",
      "Single-practice site redesign focused on accessibility and appointment conversion",
    ],
    faqs: [
      {
        question: "Do you handle HIPAA compliance for patient data?",
        answer:
          "We design forms and data flows to collect the minimum necessary information and avoid storing sensitive health data in the website layer itself, routing anything sensitive to compliant systems the practice already uses. Full HIPAA compliance for a practice's data infrastructure is a legal and operational responsibility the practice's compliance officer or counsel should confirm — we build to reduce risk, not to certify compliance.",
      },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    heroSummary:
      "Legal websites compete on trust and specialization — practice-area depth and credible case-outcome content matter more than broad service lists.",
    overview: [
      "Legal search behavior varies enormously by practice area: personal injury and criminal defense are high-urgency, high-competition local searches, while corporate or IP law is slower-cycle and more content/authority driven.",
      "Trust signals carry unusual weight in this category — bar admissions, case results (where ethically permitted to disclose), and clear attorney credentials matter more than typical service-business trust signals.",
    ],
    problems: [
      "Generic \"practice areas\" pages with no depth on any individual area",
      "No clear differentiation between attorneys' specialties on a multi-attorney site",
      "Contact forms that don't set expectations about response time or confidentiality",
      "Weak or absent local SEO despite most legal searches being geographically qualified",
    ],
    websiteRequirements: [
      "Dedicated page per practice area with genuine depth, not a shared template with swapped headlines",
      "Attorney profile pages with bar admissions, credentials, and specialty focus",
      "Clear confidentiality and consultation-process messaging near any intake form",
      "Case results or notable outcomes where local bar rules permit disclosure",
    ],
    seoOpportunities: [
      "Practice-area + location combination pages for firms serving specific metros",
      "Content addressing common legal questions within ethical advertising guidelines",
      "LocalBusiness/Attorney schema for firm and individual attorney visibility",
    ],
    developmentSolutions: [
      "Practice-area content architecture supporting deep, differentiated pages",
      "Intake form with clear confidentiality messaging and conflict-check-aware routing",
    ],
    conversionFocus: [
      "Free consultation offer (where applicable) presented clearly, not buried",
      "Response-time expectations set explicitly to reduce intake anxiety",
    ],
    localSeoStrategy: [
      "Practice-area + city landing pages for firms with defined service regions",
      "Google Business Profile and directory consistency (Avvo, FindLaw, etc.) alongside core SEO work",
    ],
    technologies: ["Next.js", "Attorney/LegalService Schema", "Accessible form components"],
    projectTypes: [
      "Multi-attorney firm site with practice-area depth and attorney profiles",
      "Solo practitioner site focused on a single high-competition practice area",
    ],
    faqs: [
      {
        question: "Can you write practice-area content for us?",
        answer:
          "We structure and optimize practice-area pages, but the legal substance and any claims about outcomes or specialization should be reviewed and approved by the attorneys of record — legal advertising rules vary by state bar, and that review has to happen on your side.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    heroSummary:
      "E-commerce businesses need catalog architecture, checkout performance, and SEO working as one system — not a fast storefront with an SEO problem, or the reverse.",
    overview: [
      "E-commerce is the category where development and SEO decisions are most directly coupled: how the catalog is structured, how filters generate URLs, and how fast product pages load all directly affect both conversion rate and organic visibility.",
      "Growth usually comes from a combination of category/product SEO, checkout and page-speed optimization, and structured data that makes listings eligible for rich results.",
    ],
    problems: [
      "Faceted navigation generating thousands of thin, duplicate, or unindexable URLs",
      "Product pages with manufacturer-supplied descriptions duplicated across dozens of competing stores",
      "Checkout flows with unnecessary steps or slow-loading payment pages",
      "No structured data, so listings miss out on price/availability/review rich results",
    ],
    websiteRequirements: [
      "Catalog architecture that scales to the full product range without duplicate-URL sprawl",
      "Differentiated product content, not manufacturer copy pasted as-is",
      "Fast, minimal-step checkout",
      "Structured data for products, reviews, and availability",
    ],
    seoOpportunities: [
      "Category page optimization for high-volume commercial-intent terms",
      "Product schema enabling rich results (price, rating, availability)",
      "Internal linking strategy connecting categories, subcategories, and related products",
    ],
    developmentSolutions: [
      "Faceted navigation with canonical/crawl controls to prevent index bloat",
      "Performance optimization pass on product and checkout pages specifically",
      "Headless or hybrid architecture where the existing platform limits page speed or content control",
    ],
    conversionFocus: [
      "Checkout step reduction and payment method coverage",
      "Product page trust signals: reviews, clear return policy, real availability",
    ],
    localSeoStrategy: [
      "Applicable primarily for e-commerce brands with physical retail locations — local schema and Google Business Profile for those locations specifically",
    ],
    technologies: ["Next.js", "Shopify/Headless Commerce", "Product Schema", "Stripe"],
    projectTypes: [
      "Headless storefront rebuild for a mid-size catalog with faceted navigation issues",
      "Category and product page SEO overhaul without a full replatform",
    ],
    faqs: [
      {
        question: "Do we need to replatform to fix our SEO problems?",
        answer:
          "Not always — a large share of e-commerce SEO issues (thin category pages, faceted navigation bloat, missing schema) can be fixed on the existing platform. Replatforming is worth considering when the platform itself hard-limits URL structure, rendering, or page speed in ways that can't be configured around.",
      },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    heroSummary:
      "HVAC demand swings hard with the seasons — the site has to convert emergency no-heat/no-AC searches year-round while also selling maintenance plans in the shoulder seasons.",
    overview: [
      "HVAC search behavior splits three ways: emergency repair (system down, urgent), seasonal installation/replacement (planned, higher ticket, more research), and maintenance contracts (recurring revenue, often sold to existing customers rather than found in search). Each needs a different page and a different call to action — a maintenance-plan pitch on an emergency-repair landing page loses the visitor who just wants a working AC unit today.",
      "Demand is also sharply seasonal by region: summer cooling emergencies and winter heating emergencies drive search volume spikes that a site and its Google Business Profile need to be ready for before they hit, not during.",
    ],
    problems: [
      "One generic 'HVAC services' page instead of separate repair, installation, and maintenance paths",
      "No visible emergency/same-day availability messaging during peak season",
      "Maintenance plans mentioned once on the homepage instead of having their own page that actually sells the recurring value",
      "Brand and efficiency-rating information (SEER ratings, manufacturer partnerships) missing, which matters for higher-consideration replacement purchases",
    ],
    websiteRequirements: [
      "Separate pages for repair, installation/replacement, and maintenance plans",
      "Emergency availability and response-time messaging prominent in-season",
      "Financing information for higher-ticket replacement systems",
      "Manufacturer/brand and efficiency-rating details for comparison-minded buyers",
    ],
    seoOpportunities: [
      "Emergency-intent keyword coverage that ramps before seasonal demand peaks, not after",
      "Installation/replacement content targeting comparison and cost-research queries",
      "Maintenance-plan landing pages targeting existing-customer retention searches",
      "Map pack optimization tied to accurate service-area and emergency-availability data",
    ],
    developmentSolutions: [
      "Service-page template split by repair/install/maintenance with independent CTAs",
      "Seasonal content scheduling so emergency messaging is live before peak demand, not reactive",
      "Financing calculator or estimate-request flow for replacement system inquiries",
    ],
    conversionFocus: [
      "Emergency path gets a phone number and nothing else in the way; planned-purchase path gets more information and a quote form",
      "Maintenance plan value (fewer breakdowns, priority scheduling) stated explicitly, not implied",
    ],
    localSeoStrategy: [
      "Google Business Profile hours and emergency availability kept current through seasonal swings",
      "Service-area pages reflecting the actual coverage radius, not an inflated regional claim",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile", "Click-to-call tracking"],
    projectTypes: [
      "Seasonal-campaign-ready site redesign for a residential HVAC contractor",
      "Maintenance-plan sales funnel built as its own conversion path",
    ],
    faqs: [
      {
        question: "Should emergency and maintenance-plan traffic land on the same page?",
        answer:
          "No — they're different intents with different urgency. We build separate landing paths so an emergency visitor sees a phone number immediately, while a maintenance-plan visitor sees pricing and value details without being rushed toward a call.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    heroSummary:
      "Construction sales cycles are long and portfolio-driven — the site's job is to build credibility through real project evidence, not to close a sale in one visit.",
    overview: [
      "Unlike emergency home-service trades, construction — general contracting, remodeling, commercial build-outs — runs on longer consideration windows. Buyers research for weeks, compare portfolios, and check licensing and insurance before ever submitting an inquiry. The website's job is to survive that research phase credibly, not to force an immediate conversion.",
      "The category also splits between residential and commercial work, which usually need different proof points: homeowners care about design sensibility and communication; commercial clients care about bonding, safety record, and project scale.",
    ],
    problems: [
      "Project galleries with a handful of low-resolution photos and no context on scope, timeline, or budget range",
      "No visible licensing, bonding, or insurance information, which is a hard trust requirement for larger jobs",
      "Residential and commercial work mixed on the same pages with no clear path for either audience",
      "No structured way to request a quote beyond a generic contact form that doesn't capture project scope",
    ],
    websiteRequirements: [
      "Project/portfolio pages organized by project type and scale, with real detail (not just photos)",
      "Licensing, bonding, and insurance information stated clearly, not buried in a footer",
      "Separate paths for residential and commercial inquiries",
      "A quote-request flow that captures project type, scope, and timeline upfront",
    ],
    seoOpportunities: [
      "Project-type + location content (e.g., \"kitchen remodeling [city]\", \"commercial build-out [city]\")",
      "Portfolio pages structured for both human browsing and search visibility",
      "Content addressing the research-phase questions buyers actually have (process, timeline, permitting)",
    ],
    developmentSolutions: [
      "Portfolio content model supporting project type, scope, budget range, and timeline metadata",
      "Quote-request form branched by residential vs. commercial and project type",
      "Image-heavy pages optimized so a large portfolio doesn't tank page speed",
    ],
    conversionFocus: [
      "Credibility signals (licensing, insurance, years in business) placed near every quote-request CTA",
      "Process transparency (what happens after you submit a quote request) reduces the hesitation that's specific to high-consideration purchases",
    ],
    localSeoStrategy: [
      "Location and project-type combination pages for firms serving multiple metros",
      "Google Business Profile and review strategy tuned for a longer, less frequent review cycle than emergency trades",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Image optimization pipeline"],
    projectTypes: [
      "Portfolio-driven site rebuild for a residential remodeling contractor",
      "Commercial general contractor site with separate bid-request flow",
    ],
    faqs: [
      {
        question: "How much of the portfolio should go on the site?",
        answer:
          "Depth matters more than volume — a handful of projects documented with real scope, timeline, and outcome detail builds more credibility than dozens of thumbnail-only photos. We prioritize the projects that best represent the work you want more of.",
      },
    ],
  },
  {
    slug: "dental",
    name: "Dental",
    heroSummary:
      "Dental practices compete on local visibility and patient trust — the site needs to make booking easy while giving anxious or unfamiliar patients enough information to feel comfortable.",
    overview: [
      "Dental search splits between routine care (\"dentist near me\", cleanings, checkups) and higher-consideration procedures (implants, Invisalign, cosmetic work) where patients research more before booking. Both need online scheduling with as little friction as possible — a practice that requires a phone call during business hours loses patients who search and decide outside those hours.",
      "Trust signals matter more here than in most categories: patients are choosing someone to work on their body, so provider credentials, technology used, and patient reviews carry real weight.",
    ],
    problems: [
      "No online booking, forcing every new patient through a phone call",
      "Cosmetic and specialty procedures buried in a general 'services' list instead of getting dedicated pages with real information",
      "Provider bios missing credentials, specialties, or photos that build comfort with an unfamiliar provider",
      "No New Patient information (forms, insurance, what to expect at a first visit) reducing friction for first-time bookings",
    ],
    websiteRequirements: [
      "Online appointment booking integrated with the practice's scheduling system where possible",
      "Dedicated pages for higher-consideration procedures (implants, cosmetic, orthodontics) with real detail",
      "Provider profiles with credentials, specialties, and approachable photography",
      "Clear new-patient information: accepted insurance, forms, first-visit expectations",
    ],
    seoOpportunities: [
      "\"[procedure] + [city]\" content for both routine and cosmetic/specialty searches",
      "Provider and specialty pages targeting patients researching a specific procedure",
      "LocalBusiness/Dentist schema and consistent NAP across directories",
    ],
    developmentSolutions: [
      "Scheduling system integration or a low-friction appointment-request flow",
      "Procedure page template supporting real depth (what it involves, recovery, cost factors) rather than a one-paragraph service list entry",
      "Accessible design given a patient base that skews older for many routine-care searches",
    ],
    conversionFocus: [
      "Book Now as the dominant CTA, phone as the fallback for patients who prefer to call",
      "New-patient friction reduced with clear insurance and forms information before the first visit",
    ],
    localSeoStrategy: [
      "Google Business Profile optimized with accurate hours, accepted insurance, and services",
      "Review generation tied to a post-visit follow-up workflow, since reviews are a major trust signal in this category",
    ],
    technologies: ["Next.js", "Dentist/MedicalOrganization Schema", "Online scheduling integration"],
    projectTypes: [
      "General and cosmetic dental practice site with online booking",
      "Multi-provider practice site with specialty-based provider directory",
    ],
    faqs: [
      {
        question: "Do you write the procedure content, or does the practice?",
        answer:
          "We structure and optimize procedure pages, but clinical claims and specific patient guidance should be reviewed and approved by the practice's dentists — we're not positioned to make clinical claims on a provider's behalf.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    heroSummary:
      "Restaurant sites live or die on three things loading instantly on a phone: the menu, the hours, and a map — everything else is secondary.",
    overview: [
      "Restaurant search is overwhelmingly mobile and overwhelmingly local: someone deciding where to eat right now, or in the next hour, needs the menu, hours, location, and a reservation or ordering path to load fast without hunting for it. A slow menu PDF or a site that requires zooming to read defeats the entire purpose of the visit.",
      "The category also increasingly depends on third-party integrations — reservation platforms, delivery/ordering services, review sites — that the website needs to connect to cleanly rather than compete with.",
    ],
    problems: [
      "Menu published only as a PDF, which is slow to load and often not mobile-readable",
      "Hours out of sync between the website, Google Business Profile, and delivery platforms",
      "No online reservation or ordering path, pushing every request to a phone call during service hours",
      "Location and parking information missing or buried, which matters more for restaurants than almost any other category",
    ],
    websiteRequirements: [
      "Menu published as real, fast-loading web content — not a PDF — with prices kept current",
      "Reservation and/or online ordering integrated directly, not just linked out with no context",
      "Hours, location, and parking/access information immediately visible on mobile",
      "Multi-location support with per-location hours, menu variations, and maps where applicable",
    ],
    seoOpportunities: [
      "Local pack visibility for \"[cuisine] restaurant [city]\" and near-me searches",
      "Menu schema and Restaurant/LocalBusiness structured data for rich results",
      "Consistent hours and NAP across the website, Google Business Profile, and delivery platforms — inconsistency actively hurts local rankings",
    ],
    developmentSolutions: [
      "Menu managed as structured content so updates don't require a developer",
      "Reservation/ordering platform integration (OpenTable, Resy, Toast, etc.) embedded cleanly into the site experience",
      "Multi-location architecture for restaurant groups with shared branding and per-location details",
    ],
    conversionFocus: [
      "Reserve/Order as the primary above-the-fold action on mobile, where most restaurant traffic happens",
      "Menu accessible in one tap from any page, not buried in a dropdown",
    ],
    localSeoStrategy: [
      "Google Business Profile kept in sync with actual hours, especially around holidays",
      "Per-location pages for multi-location restaurant groups, each with genuinely distinct information",
    ],
    technologies: ["Next.js", "Restaurant/Menu Schema", "Reservation/ordering platform integration"],
    projectTypes: [
      "Single-location restaurant site with integrated reservations and a fast, real menu",
      "Multi-location restaurant group site with per-location hours and menu variation",
    ],
    faqs: [
      {
        question: "Can the menu update without a developer?",
        answer:
          "Yes — we structure the menu as editable content rather than hardcoding it into page templates, so pricing and item changes can be made directly without a code deployment.",
      },
    ],
  },
  {
    slug: "home-services",
    name: "Home Services",
    heroSummary:
      "Home services — cleaning, pest control, landscaping, handyman work — compete on trust and service-area clarity more than any single differentiating feature.",
    overview: [
      "Home services covers a wide range of recurring and one-off work where the buying decision usually comes down to trust (licensed, insured, background-checked), price transparency, and whether the company actually serves the customer's specific area. Unlike roofing or plumbing, urgency is usually lower, which shifts more weight onto reviews and service-area credibility than emergency response speed.",
    ],
    problems: [
      "One combined 'services' page instead of separate pages for each distinct service line",
      "No visible trust signals (licensed, insured, bonded, background-checked staff) despite these being the actual deciding factor for many buyers",
      "Service area stated vaguely (\"the greater metro area\") instead of a specific, checkable list of cities or zip codes",
      "No recurring-service or subscription information for categories like cleaning or lawn care where repeat business is the real revenue driver",
    ],
    websiteRequirements: [
      "Dedicated page per service line, not one page trying to cover everything",
      "Trust signals (licensing, insurance, background checks) stated explicitly near every CTA",
      "Specific, accurate service-area information",
      "Recurring-service/subscription options presented clearly where applicable",
    ],
    seoOpportunities: [
      "Service + location combination pages for each service line and city served",
      "Review-driven local pack visibility, since trust signals are the primary ranking and conversion factor here",
      "Content addressing common pre-purchase questions (pricing ranges, what's included, how scheduling works)",
    ],
    developmentSolutions: [
      "Service-line page template supporting distinct content per service rather than one shared template with swapped headlines",
      "Quote-request form branched by service type",
      "Recurring-booking or subscription-signup flow for repeat-service categories",
    ],
    conversionFocus: [
      "Trust signals placed directly next to the quote-request form, not on a separate About page",
      "Transparent pricing ranges where the business model supports it, since price uncertainty is a major drop-off point",
    ],
    localSeoStrategy: [
      "Accurate, specific service-area pages rather than one generic regional page",
      "Google Business Profile service list matched exactly to what's actually offered",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile"],
    projectTypes: [
      "Multi-service home services company site with per-service landing pages",
      "Recurring-service (cleaning/lawn care) site with subscription booking",
    ],
    faqs: [
      {
        question: "How specific should service-area pages be?",
        answer:
          "Specific enough to be genuinely useful — real neighborhoods or cities you actually serve, not a padded list designed purely for SEO. A page that overpromises coverage and then can't actually schedule the job erodes trust fast.",
      },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    heroSummary:
      "Insurance is a comparison-shopping category — the site's job is to make getting a quote fast and to build enough credibility that a visitor trusts you with a policy.",
    overview: [
      "Insurance buyers — whether shopping for auto, home, life, or commercial coverage — typically compare multiple agents or carriers before deciding. The website's primary jobs are reducing the friction to get a quote and establishing the credibility (licensing, carrier partnerships, local presence) that differentiates one agent from the next in a category where the underlying product is often similar.",
      "Independent agents and multi-location agencies have a distinct need here: each licensed agent or location often needs its own page for both compliance and local search purposes.",
    ],
    problems: [
      "Quote requests routed through a generic contact form with no sense of what type of coverage is being requested",
      "No visible licensing information or carrier partnerships, which are real trust and compliance signals in this category",
      "Multi-agent agencies with no individual agent pages, losing the local-search value of each licensed agent's own reputation",
      "No clear content addressing coverage questions, pushing price-sensitive and coverage-confused visitors to a competitor who explains it better",
    ],
    websiteRequirements: [
      "Coverage-type quote request flow (auto, home, life, commercial) rather than one generic form",
      "Licensing and carrier-partnership information stated clearly",
      "Individual agent pages for multi-agent agencies, each with contact info and specialties",
      "Educational content addressing common coverage questions",
    ],
    seoOpportunities: [
      "Coverage-type + location content (\"auto insurance [city]\", \"small business insurance [city]\")",
      "Individual agent pages targeting branded and local searches for that agent specifically",
      "Content addressing comparison and coverage-explainer queries, which carry real search volume in this category",
    ],
    developmentSolutions: [
      "Quote-request flow branched by coverage type, routed to the right agent or carrier system",
      "Agent directory with individual profile pages and structured data",
      "Compliance-aware content review process given state-specific insurance advertising regulations",
    ],
    conversionFocus: [
      "Get a Quote as the dominant CTA, with coverage type selected upfront to reduce back-and-forth",
      "Licensing and carrier credibility signals placed near the quote form, where trust hesitation actually surfaces",
    ],
    localSeoStrategy: [
      "Individual agent/location pages optimized for local search, not just one agency-wide page",
      "Google Business Profile per location where the agency has multiple physical offices",
    ],
    technologies: ["Next.js", "InsuranceAgency/LocalBusiness Schema", "Google Business Profile"],
    projectTypes: [
      "Multi-agent independent insurance agency site with individual agent pages",
      "Single-line specialist agency site (e.g., commercial-only) with a coverage-specific quote flow",
    ],
    faqs: [
      {
        question: "Can you make specific coverage or pricing claims on the site?",
        answer:
          "Coverage details, pricing, and specific claims need to be reviewed and approved by your licensed agents and compliance process — insurance advertising is regulated at the state level, and that review has to happen on your side. We build the structure and optimize the content; you own the substance of any coverage claim.",
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    heroSummary:
      "Auto repair shops and dealers compete on trust and turnaround time — the site needs to make scheduling service or browsing inventory faster than calling around.",
    overview: [
      "Automotive splits into repair/service shops (recurring, trust- and speed-driven) and dealerships (inventory-driven, higher consideration). Repair customers want to book a slot and know roughly what it'll cost; dealership shoppers want to browse real inventory with accurate pricing before they'll pick up the phone.",
    ],
    problems: [
      "No online service scheduling, forcing every booking through a phone call during shop hours",
      "Dealership inventory out of sync between the site and the actual lot",
      "No visible certifications (ASE, manufacturer-specific) that build trust with an unfamiliar shop",
      "Pricing given as \"call for quote\" on jobs that could reasonably show a starting range",
    ],
    websiteRequirements: [
      "Online service scheduling integrated with the shop's calendar",
      "Inventory feed integration for dealerships, kept current automatically",
      "Certifications and specialties stated clearly",
      "Starting price ranges for common services where feasible",
    ],
    seoOpportunities: [
      "\"[service] + [city]\" content for repair shops (brakes, oil change, diagnostics)",
      "VDP (vehicle detail page) SEO and schema for dealership inventory",
      "Map pack visibility tied to review volume and service-area accuracy",
    ],
    developmentSolutions: [
      "Scheduling system integration for service shops",
      "Inventory feed sync (DMS/inventory management integration) for dealers",
    ],
    conversionFocus: [
      "Book Service as the dominant CTA for repair shops; VDP-to-lead-form path for dealers",
      "Certifications and reviews placed near the booking action, where trust hesitation surfaces",
    ],
    localSeoStrategy: [
      "Google Business Profile service list matched to actual capabilities",
      "Review generation tied to service completion, since trust is the primary local ranking factor",
    ],
    technologies: ["Next.js", "AutoRepair/Vehicle Schema", "DMS/inventory feed integration"],
    projectTypes: ["Repair shop site with online scheduling", "Dealership site with live inventory feed"],
    faqs: [
      {
        question: "Can you integrate with our existing shop management or DMS system?",
        answer:
          "In most cases yes — we assess what your current system exposes (API, feed export) during discovery and build the integration around it rather than asking you to switch systems.",
      },
    ],
  },
  {
    slug: "hotels",
    name: "Hotels",
    heroSummary:
      "Hotel sites compete against OTA commissions — every design and SEO decision should nudge a visitor toward booking direct instead of through a third party.",
    overview: [
      "Hotels and short-term rental operators face a structural challenge: OTAs (Booking.com, Expedia) often outrank and outspend a property's own site, while charging a commission on every booking those platforms send. A hotel website's job is to be fast, accurately show real-time rates and availability, and give a visitor a genuine reason to book direct — rate parity guarantees, loyalty perks, or simply a better browsing experience.",
    ],
    problems: [
      "Booking engine slow, clunky, or visually disconnected from the rest of the site",
      "Room photos and descriptions thinner than what's already on OTA listings",
      "No direct-booking incentive, so price-equal visitors default to the OTA they already trust",
      "Local attraction/area content missing, which is genuine SEO opportunity OTAs don't compete as hard for",
    ],
    websiteRequirements: [
      "Fast, integrated booking engine showing real-time rate and availability",
      "Room and property photography presented at real quality, not thumbnail-only",
      "A stated direct-booking incentive (rate match, free perk, no fees)",
      "Local area/attraction content supporting both SEO and trip planning",
    ],
    seoOpportunities: [
      "Property + destination content targeting trip-planning search intent",
      "Hotel/LodgingBusiness schema for rich results (rate, rating, amenities)",
      "Local pack visibility for \"[hotel type] in [destination]\" queries",
    ],
    developmentSolutions: [
      "Booking engine integration (channel manager-aware, so rates stay in sync with OTA listings)",
      "Fast image delivery for photo-heavy room and property pages",
    ],
    conversionFocus: [
      "Book Direct messaging placed wherever a visitor might otherwise leave for an OTA",
      "Rate parity or added-value messaging stated explicitly, not assumed",
    ],
    localSeoStrategy: [
      "Google Business Profile and LodgingBusiness schema kept current with amenities and rates",
      "Destination-area content supporting both bookings and general local search visibility",
    ],
    technologies: ["Next.js", "LodgingBusiness Schema", "Channel manager/booking engine integration"],
    projectTypes: ["Independent hotel site with direct-booking engine", "Boutique property site competing on experience over OTA reach"],
    faqs: [
      {
        question: "Can a hotel website really compete with OTA visibility?",
        answer:
          "Not head-to-head on every generic query, but a well-optimized property site can win branded searches, destination-specific long-tail terms, and — most importantly — convert visitors who already found you elsewhere into direct bookings instead of OTA ones.",
      },
    ],
  },
  {
    slug: "saas",
    name: "SaaS",
    heroSummary:
      "B2B SaaS marketing sites live or die on how fast a visitor understands what the product does and how easy it is to start a trial.",
    overview: [
      "As an industry (distinct from our SaaS *development* service), this covers marketing and content sites for software companies: the homepage, pricing page, comparison/alternative pages, and content hub that drive trial signups and demo requests. The SEO opportunity is unusually strong here — comparison and \"alternative to X\" searches carry high commercial intent and are often under-served by the incumbents they're compared against.",
    ],
    problems: [
      "Homepage explains the company instead of the product, burying what it actually does",
      "Pricing page vague or missing, pushing every prospect into a \"contact sales\" dead end",
      "No comparison/alternative content despite competitors clearly ranking for those exact searches",
      "Docs and changelog living outside the main site, losing SEO value and internal linking equity",
    ],
    websiteRequirements: [
      "Homepage that states the product, the problem it solves, and who it's for within the first screen",
      "Clear pricing (or clearly explained pricing model) reducing sales-call friction",
      "Comparison and alternative pages targeting real competitor searches",
      "Docs/knowledge base integrated into the main site's domain and navigation",
    ],
    seoOpportunities: [
      "\"[competitor] alternative\" and \"[category] software\" comparison content",
      "Use-case and integration pages targeting specific buyer searches",
      "Docs/help content contributing to topical authority and long-tail traffic",
    ],
    developmentSolutions: [
      "Fast, server-rendered marketing site separate from (but linked to) the product app",
      "Trial/demo signup flow with minimal friction and clear next steps",
    ],
    conversionFocus: [
      "Start Trial or Book Demo as the dominant CTA, matched to the actual sales motion (self-serve vs. sales-led)",
      "Social proof (logos, case studies) placed near the CTA, not just on a separate customers page",
    ],
    localSeoStrategy: [
      "Not typically applicable — SaaS is usually a global/national play, not location-based, unless serving a specific regional market",
    ],
    technologies: ["Next.js", "SoftwareApplication Schema", "Product analytics integration"],
    projectTypes: ["Marketing site rebuild for an early-stage SaaS product", "Comparison/alternative content program for an established product"],
    faqs: [
      {
        question: "Should the marketing site and the app share a codebase?",
        answer:
          "Usually not — the marketing site has very different performance, SEO, and update-cadence needs than the application. We typically build it as a separate, faster-iterating Next.js site under the same domain, linked cleanly to the app.",
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    heroSummary:
      "Technology and hardware companies need product and spec content that satisfies both technical buyers and the search engines trying to rank it.",
    overview: [
      "Broader than SaaS, this covers hardware, IT products, and technology companies selling through a mix of direct, reseller, and partner channels. Buyers here often need detailed specifications, compatibility information, and partner/reseller locators — content that's easy to under-invest in but that technical buyers specifically search for.",
    ],
    problems: [
      "Spec sheets published only as PDFs, invisible to search and slow on mobile",
      "No partner or reseller locator despite most purchases happening through a channel",
      "Product pages written for marketing rather than the technical buyers actually comparing options",
      "Support and documentation disconnected from the marketing site's domain and SEO equity",
    ],
    websiteRequirements: [
      "Product pages with real, structured specifications — not PDF-only",
      "Partner/reseller locator where the sales model relies on channel partners",
      "Comparison content for buyers evaluating multiple products or vendors",
      "Support/documentation integrated into the main domain",
    ],
    seoOpportunities: [
      "Spec and comparison content targeting technical, high-intent search queries",
      "Product schema for rich results on pricing and availability",
      "Partner/integration pages capturing co-marketing search demand",
    ],
    developmentSolutions: [
      "Structured product data model supporting specs, compatibility, and variants",
      "Partner/reseller locator with location or capability-based filtering",
    ],
    conversionFocus: [
      "Clear path from spec-comparison research to a quote request or partner referral",
      "Technical credibility (specs, certifications, case studies) placed where technical buyers actually look",
    ],
    localSeoStrategy: [
      "Applicable mainly for partner/reseller locator pages tied to specific regions",
    ],
    technologies: ["Next.js", "Product Schema", "Partner locator integration"],
    projectTypes: ["Product marketing site rebuild for a hardware manufacturer", "Partner locator and spec-comparison content program"],
    faqs: [
      {
        question: "Do spec sheets need to be redesigned as web pages?",
        answer:
          "For anything you want to rank or be easily comparable on mobile, yes — a PDF can stay available as a download, but the core specs should also exist as real, structured page content search engines and buyers can actually use.",
      },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    heroSummary:
      "Financial services sites carry real compliance weight — the design and content work has to build trust while staying inside what's legally sayable.",
    overview: [
      "Fintech, lending, wealth management, and advisory sites all share a common constraint: the claims that would be most persuasive (guaranteed returns, specific rate promises) are often the ones regulation restricts. The website's job is to build credibility through transparency, tools (calculators, comparisons), and clear disclosures rather than through bold claims.",
    ],
    problems: [
      "Calculators or tools missing, despite being one of the highest-converting content types in this category",
      "Required disclosures buried or missing entirely, a compliance risk as much as a trust one",
      "Lead forms asking for sensitive information without clear explanation of how it's used",
      "No clear differentiation from competitors beyond generic trust language",
    ],
    websiteRequirements: [
      "Interactive calculators or comparison tools relevant to the specific product (loan, investment, insurance-adjacent)",
      "Disclosures and regulatory information clearly present, reviewed by compliance",
      "Lead forms that explain what happens after submission and how data is handled",
      "Advisor/team credentials and credentials (licenses, certifications) stated clearly",
    ],
    seoOpportunities: [
      "Calculator and tool pages, which attract links and repeat visits alongside search traffic",
      "Educational content addressing common financial questions in the category",
      "Local content for advisory/lending businesses with a physical or regional presence",
    ],
    developmentSolutions: [
      "Calculator/tool development as genuine interactive features, not lead-gated gimmicks",
      "Secure, compliant handling of any sensitive data collected through forms",
    ],
    conversionFocus: [
      "Tools and calculators as the primary engagement driver, with a clear next step after use",
      "Credentials and regulatory standing placed near every conversion point",
    ],
    localSeoStrategy: [
      "Applicable for advisory firms, lenders, and agents with a physical or regional service area",
    ],
    technologies: ["Next.js", "FinancialService Schema", "Secure form handling"],
    projectTypes: ["Lead-gen site with an interactive loan/investment calculator", "Advisory firm site with compliance-reviewed content"],
    faqs: [
      {
        question: "Do you handle the compliance review of financial content?",
        answer:
          "No — we build the structure, tools, and optimization, but compliance review of financial claims and disclosures has to come from your compliance officer or counsel, since requirements vary by product type and jurisdiction.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    heroSummary:
      "Schools, course providers, and training programs need enrollment funnels that work as well as their program content ranks.",
    overview: [
      "Education spans K-12 and higher-ed institutions, online course providers, and professional training programs — each with a different enrollment cycle but a shared need: program/course pages have to answer a prospective student's real questions (cost, format, outcomes, accreditation) clearly enough to move them toward applying or enrolling.",
    ],
    problems: [
      "Program pages listing course names with no information on format, cost, or outcomes",
      "Application/enrollment process buried behind multiple clicks or an unclear first step",
      "No accreditation or outcome information, which matters heavily for buyer trust in this category",
      "Course catalog structured in a way that generates thin, near-duplicate pages",
    ],
    websiteRequirements: [
      "Program/course pages with real detail: format, cost, duration, outcomes",
      "Clear, low-friction path to apply or enroll",
      "Accreditation and outcome data presented where it exists",
      "Course catalog architecture that avoids thin near-duplicate pages",
    ],
    seoOpportunities: [
      "Program + \"near me\" or format (\"online\", \"part-time\") content",
      "Course schema for rich results where applicable",
      "Content addressing prospective-student research questions (cost, ROI, format comparisons)",
    ],
    developmentSolutions: [
      "Program page template supporting real structured detail per course/program",
      "Application/enrollment flow simplified to its essential steps",
    ],
    conversionFocus: [
      "Apply/Enroll as the dominant CTA, with cost and format information visible before the click, not after",
      "Outcome and accreditation data placed near the decision point",
    ],
    localSeoStrategy: [
      "Applicable for institutions and providers with a physical campus or regional service area",
    ],
    technologies: ["Next.js", "Course/EducationalOrganization Schema"],
    projectTypes: ["Training program site with a structured course catalog", "Institution site with an application-funnel rebuild"],
    faqs: [
      {
        question: "Can the course catalog scale without generating thin pages?",
        answer:
          "Yes, if each program page has genuinely distinct content — format, outcomes, cost, curriculum specifics. The problem isn't catalog size, it's templates that only swap a course name across otherwise identical pages.",
      },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    heroSummary:
      "Gyms and studios convert on a free trial or class booking — the site's main job is to make that first step effortless.",
    overview: [
      "Fitness businesses — gyms, boutique studios, personal trainers — compete heavily on local visibility and on removing friction from the first interaction: a trial class, a consultation, or a membership signup. Class schedules and pricing need to be genuinely current, since nothing loses trust faster than a schedule that doesn't match reality.",
    ],
    problems: [
      "Class schedule outdated or disconnected from the actual booking system",
      "Membership pricing unclear or requiring a call to find out",
      "No trial offer or unclear path to try before committing",
      "Instructor/trainer bios missing, despite being a real differentiator in boutique fitness",
    ],
    websiteRequirements: [
      "Live class schedule integrated with the actual booking system",
      "Clear membership tiers and pricing",
      "A visible trial or introductory offer with a simple signup path",
      "Instructor/trainer profiles where they're a selling point",
    ],
    seoOpportunities: [
      "\"[gym/class type] near me\" and local map pack visibility",
      "Class-type and specialty content (e.g., \"HIIT classes [city]\")",
      "Review generation, which weighs heavily in this trust- and community-driven category",
    ],
    developmentSolutions: [
      "Booking system integration for classes and trials",
      "Membership signup flow with clear tier comparison",
    ],
    conversionFocus: [
      "Free trial or first-class offer as the primary CTA, ahead of a full membership commitment",
      "Schedule and pricing visible without requiring a call",
    ],
    localSeoStrategy: [
      "Google Business Profile with accurate class types, hours, and amenities",
      "Location pages for multi-location gyms and studio chains",
    ],
    technologies: ["Next.js", "LocalBusiness/ExerciseGym Schema", "Class booking integration"],
    projectTypes: ["Boutique studio site with trial-class booking", "Multi-location gym chain site with per-location schedules"],
    faqs: [
      {
        question: "Can the class schedule update automatically?",
        answer:
          "Yes — we integrate directly with the booking platform you already use (Mindbody, Glofox, etc.) so the schedule on the site is always the real one, not a manually maintained copy that drifts out of sync.",
      },
    ],
  },
  {
    slug: "beauty",
    name: "Beauty",
    heroSummary:
      "Salons and spas convert on visual trust and easy booking — service menus and real work examples matter more than long copy.",
    overview: [
      "Beauty businesses — salons, spas, nail studios, barbershops — sell a visual, personal-taste-driven service, which makes booking friction and visual proof (not written claims) the main levers. Prospective clients want to see real work and book a slot without calling during business hours.",
    ],
    problems: [
      "No online booking, losing after-hours and mobile-browsing clients to a competitor who has one",
      "Service menu vague on pricing, pushing price-sensitive visitors elsewhere",
      "Stylist/technician portfolios missing, despite being a genuine differentiator and booking driver",
      "Gallery content thin or outdated relative to what's on the business's own social accounts",
    ],
    websiteRequirements: [
      "Online booking integrated with the salon's actual scheduling system",
      "Clear service menu with pricing or starting rates",
      "Individual stylist/technician profiles and portfolios where relevant",
      "A current, genuine work gallery",
    ],
    seoOpportunities: [
      "\"[service] near me\" and local map pack visibility",
      "Service-specific pages (color, extensions, specific spa treatments) beyond one general services list",
      "Review generation, a strong local ranking and trust factor in this category",
    ],
    developmentSolutions: [
      "Booking system integration with real-time availability",
      "Lightweight gallery/portfolio architecture that stays fast despite being image-heavy",
    ],
    conversionFocus: [
      "Book Now as the dominant CTA, visible without scrolling",
      "Pricing transparency reducing the \"what does this actually cost\" hesitation before booking",
    ],
    localSeoStrategy: [
      "Google Business Profile with accurate services, hours, and photos",
      "Location pages for multi-location salon and spa groups",
    ],
    technologies: ["Next.js", "LocalBusiness/BeautySalon Schema", "Booking platform integration"],
    projectTypes: ["Single-location salon site with online booking", "Multi-location spa group with per-location service menus"],
    faqs: [
      {
        question: "Can before/after photos go on the site?",
        answer:
          "Yes, with the client's explicit consent for each image — we build the gallery to support that, but sourcing and permission for the photos themselves is on your side.",
      },
    ],
  },
  {
    slug: "solar",
    name: "Solar",
    heroSummary:
      "Solar is a high-consideration purchase — the site needs to qualify and educate a lead well before a sales conversation, not just capture contact info.",
    overview: [
      "Solar installation sits closer to construction than to home-service trades: long research phase, financing and incentive complexity, and a sales process that depends on qualifying the lead (roof type, energy usage, location) before a quote makes sense. A generic \"get a quote\" form underperforms here compared to a guided estimate flow.",
    ],
    problems: [
      "One generic contact form instead of a qualifying flow that captures the information sales actually needs",
      "No incentive/rebate information, despite that being a major purchase driver",
      "Financing options unclear, leaving cost as an unresolved objection",
      "No real project examples or savings context to make the pitch concrete",
    ],
    websiteRequirements: [
      "A guided estimate/qualification flow instead of a generic contact form",
      "Current incentive and rebate information for the service area",
      "Financing options explained clearly",
      "Real project examples with system size and context (not fabricated savings figures)",
    ],
    seoOpportunities: [
      "\"solar installation [city]\" and incentive/rebate-specific content",
      "Cost and financing comparison content addressing the research phase directly",
      "Local content given solar incentives and regulations vary significantly by region",
    ],
    developmentSolutions: [
      "Multi-step estimate flow capturing roof/usage/location data before routing to sales",
      "Incentive/rebate content kept current as programs change",
    ],
    conversionFocus: [
      "Get a Custom Estimate as the primary CTA, framed as a qualification step rather than a generic \"contact us\"",
      "Financing and incentive information placed before the cost objection has a chance to stall the visitor",
    ],
    localSeoStrategy: [
      "Service-area pages reflecting actual install regions and region-specific incentives",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Multi-step form/estimate flow"],
    projectTypes: ["Residential solar installer site with a guided estimate flow", "Commercial solar site with a longer-cycle lead-qualification path"],
    faqs: [
      {
        question: "Should the site show specific savings numbers?",
        answer:
          "Only if they're real, system-specific figures from actual installations — generic \"save up to X%\" claims without basis are exactly the kind of unverifiable statistic we won't fabricate. A qualification flow that produces a genuine estimate is a better substitute.",
      },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    heroSummary:
      "Freight and logistics sites sell capability and reliability to other businesses — the site needs to make requesting a quote or checking capacity fast for a B2B buyer.",
    overview: [
      "Logistics and freight — trucking, 3PL, freight brokerage — is a B2B category where buyers care about lanes served, capacity, equipment types, and reliability more than visual polish. The website's job is to get a qualified quote request in front of the right person fast, and to rank for the specific lane and service-type searches procurement teams actually run.",
    ],
    problems: [
      "No lane or service-area specificity, just a general \"we ship anywhere\" claim",
      "Quote request forms that don't capture the shipment details a broker or carrier actually needs",
      "No tracking or shipment-status visibility for existing customers",
      "Equipment and capability information thin, despite being a real differentiator to procurement buyers",
    ],
    websiteRequirements: [
      "Lane and service-area pages with real specificity",
      "Quote request forms capturing shipment type, volume, and route",
      "Equipment and capability information stated clearly",
      "Shipment tracking or status visibility where the business offers it",
    ],
    seoOpportunities: [
      "Lane and service-type content (\"[origin] to [destination] freight\", \"LTL shipping [region]\")",
      "Equipment-specific content (reefer, flatbed, etc.) targeting procurement searches",
    ],
    developmentSolutions: [
      "Quote-request flow structured around actual shipment data",
      "Integration with existing TMS (transportation management system) for tracking, where applicable",
    ],
    conversionFocus: [
      "Get a Quote as the primary CTA, built to capture what a dispatcher or broker needs to respond quickly",
      "Capability and lane information placed where procurement buyers are actually evaluating vendors",
    ],
    localSeoStrategy: [
      "Applicable at the regional/lane level rather than a single physical location",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "TMS integration"],
    projectTypes: ["Regional trucking company site with a structured quote-request flow", "3PL/freight brokerage site with lane-specific content"],
    faqs: [
      {
        question: "Do you integrate with our TMS or dispatch software?",
        answer:
          "Where the system exposes an API or data feed, yes — we scope that integration during discovery rather than assuming a one-size-fits-all connector exists.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    heroSummary:
      "Industrial manufacturers sell to engineers and procurement teams who search by spec — the site needs to speak that language, not marketing language.",
    overview: [
      "Manufacturing websites serve a technical B2B buyer: an engineer or procurement specialist searching for a specific capability, material, or tolerance, then requesting a quote (RFQ). The content that actually converts here is specification detail, capability lists, and certifications — not brand storytelling.",
    ],
    problems: [
      "Capability and spec information thin or only available as a downloadable catalog PDF",
      "No RFQ (request for quote) path, just a general contact form",
      "Certifications (ISO, industry-specific) missing, despite being a hard requirement for many procurement processes",
      "Distributor/rep network not represented, losing buyers who need a regional contact",
    ],
    websiteRequirements: [
      "Capability and spec pages with real technical detail",
      "A structured RFQ flow capturing part specs, quantity, and timeline",
      "Certifications and quality standards stated clearly",
      "Distributor/rep locator where the sales model relies on one",
    ],
    seoOpportunities: [
      "Capability and material/process-specific content targeting technical search queries",
      "Certification and compliance content, which procurement teams specifically search for",
    ],
    developmentSolutions: [
      "Structured RFQ form capturing the technical detail a quote actually requires",
      "Distributor/rep locator with region or capability-based filtering",
    ],
    conversionFocus: [
      "Request a Quote as the primary CTA, built for the technical detail procurement teams provide",
      "Certifications and capability data placed where technical buyers evaluate vendors",
    ],
    localSeoStrategy: [
      "Applicable mainly for distributor/rep locator pages by region",
    ],
    technologies: ["Next.js", "Product/Organization Schema", "RFQ form workflow"],
    projectTypes: ["Industrial manufacturer site with a structured RFQ flow", "Distributor locator and capability-content program"],
    faqs: [
      {
        question: "Do you write the technical specification content?",
        answer:
          "We structure and optimize it, but the specs themselves need to come from your engineering team — accuracy on tolerances, materials, and certifications isn't something we can originate.",
      },
    ],
  },
  {
    slug: "travel",
    name: "Travel",
    heroSummary:
      "Travel agencies and tour operators sell an experience before it happens — the site needs rich destination content and a booking path that doesn't feel like a generic OTA.",
    overview: [
      "Travel agencies and tour operators compete against large OTAs on a different axis: curated expertise, itinerary depth, and personal service. The website's content — destination guides, itinerary detail, trip-planning resources — is both a genuine trust-builder and a real SEO opportunity in a category with enormous, if competitive, search volume.",
    ],
    problems: [
      "Destination content thin compared to what OTAs and travel blogs already rank for",
      "Itinerary/package pages light on detail, making it hard to justify booking through an agent over an OTA",
      "No clear booking or inquiry path, just a phone number",
      "Trip-planning resources missing, losing the early-research-phase traffic to competitors",
    ],
    websiteRequirements: [
      "Destination and itinerary content with genuine depth and specificity",
      "Clear package/trip pages with pricing context and what's included",
      "A structured inquiry or booking flow",
      "Trip-planning resources supporting the early research phase",
    ],
    seoOpportunities: [
      "Destination and itinerary-specific content targeting trip-planning search intent",
      "\"[trip type] + [destination]\" combination content",
      "TravelAgency/TouristTrip schema for rich results where applicable",
    ],
    developmentSolutions: [
      "Itinerary/package content model supporting rich, structured detail",
      "Inquiry flow capturing trip type, dates, and group size upfront",
    ],
    conversionFocus: [
      "Plan My Trip or Request a Quote as the primary CTA, positioned as personal service versus a generic OTA checkout",
      "Depth of itinerary detail as the differentiator over lower-effort competitor listings",
    ],
    localSeoStrategy: [
      "Applicable for agencies with a physical office or a specific regional specialty",
    ],
    technologies: ["Next.js", "TravelAgency/TouristTrip Schema"],
    projectTypes: ["Boutique travel agency site with destination-specific content", "Tour operator site with structured itinerary pages"],
    faqs: [
      {
        question: "How do we compete with OTA content volume?",
        answer:
          "Not by matching volume — by going deeper on the destinations and trip types you actually specialize in. A handful of genuinely expert, detailed guides outperforms a shallow attempt to cover everything.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    heroSummary:
      "Consultants, accountants, and agencies sell expertise — the site's job is to demonstrate it credibly enough to earn a first conversation.",
    overview: [
      "Professional services — accounting, consulting, agencies, and similar expertise-based businesses — convert through credibility more than any visual or transactional feature. Case studies, clear service scoping, and a low-friction way to start a conversation matter more than a polished storefront.",
    ],
    problems: [
      "Services described in vague, interchangeable language that could apply to any firm",
      "No case studies or work examples demonstrating actual expertise",
      "Contact process unclear — one generic form with no sense of what happens next",
      "No content addressing the specific problems the ideal client is actually searching to solve",
    ],
    websiteRequirements: [
      "Service pages describing specific, differentiated capabilities and outcomes",
      "Case studies or work examples with real detail",
      "A clear next-step process (consultation, discovery call) explained upfront",
      "Content addressing the client's actual problem, not just the firm's service list",
    ],
    seoOpportunities: [
      "Problem-focused content targeting how the ideal client actually searches",
      "Case study and outcome content supporting both credibility and long-tail SEO",
      "Local content for firms serving a specific region",
    ],
    developmentSolutions: [
      "Case study content model supporting real client work (with permission)",
      "Consultation/discovery-call booking flow",
    ],
    conversionFocus: [
      "Book a Consultation as the primary CTA, with clear expectations set about what that call involves",
      "Case studies and credentials placed near every conversion point",
    ],
    localSeoStrategy: [
      "Applicable for firms with a physical office or regionally defined client base",
    ],
    technologies: ["Next.js", "ProfessionalService Schema"],
    projectTypes: ["Consulting firm site with case-study-driven content", "Accounting/advisory firm site with a consultation-booking flow"],
    faqs: [
      {
        question: "Can you write our case studies for us?",
        answer:
          "We structure and can help draft them, but the underlying facts, figures, and client permission have to come from you — we don't fabricate outcomes or attribute results to clients who haven't confirmed them.",
      },
    ],
  },
  {
    slug: "local-businesses",
    name: "Local Businesses",
    heroSummary:
      "Small, single-location local businesses need a fast, honest site and a strong Google Business Profile more than a large feature set.",
    overview: [
      "This covers small, budget-conscious local businesses that don't fit neatly into a single trade category — independent retailers, small service providers, local shops. The priorities are the same regardless of what's being sold: a fast, accurate, mobile-first site and a well-maintained Google Business Profile, since that combination is what actually drives most local discovery for a small operator.",
    ],
    problems: [
      "No website at all, or one built years ago on a platform that's since been abandoned",
      "Hours, address, or phone number inconsistent between the site, Google, and social profiles",
      "No mobile optimization despite most local searches happening on a phone",
      "Google Business Profile unclaimed or poorly maintained",
    ],
    websiteRequirements: [
      "A fast, simple, mobile-first site covering what the business does, where it is, and how to contact it",
      "Consistent NAP (name, address, phone) across the site and every listing",
      "Basic but real SEO fundamentals — title tags, structured data, a claimed Google Business Profile",
    ],
    seoOpportunities: [
      "Local map pack visibility, which matters more than broad organic rankings for most single-location businesses",
      "Google Business Profile optimization, often the single highest-leverage action available",
    ],
    developmentSolutions: [
      "Lightweight, fast site built on a small, maintainable footprint appropriate to a small business budget",
      "Google Business Profile claim and optimization as part of the engagement",
    ],
    conversionFocus: [
      "Contact/visit information immediately visible, without requiring navigation",
      "Simplicity over feature count — a small business site doesn't need to do everything",
    ],
    localSeoStrategy: [
      "Google Business Profile as the primary local SEO lever for a single-location business",
      "Consistent citations across the directories relevant to the business type",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile"],
    projectTypes: ["New site for a small business with no prior web presence", "Rebuild of an outdated site with local SEO fundamentals applied"],
    faqs: [
      {
        question: "Is a full custom build overkill for a small local business?",
        answer:
          "Sometimes, yes — for a single-location business with a simple offering, we'll say so and scope something appropriately lightweight rather than overbuilding. The goal is a fast, accurate site that supports local discovery, not maximum feature count.",
      },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    heroSummary:
      "Landscaping companies sell on seasonal timing and visual proof — the site needs real project photos and a quote path that works before the season peaks.",
    overview: [
      "Landscaping spans one-off design/install projects (higher ticket, portfolio-driven) and recurring maintenance (lawn care, seasonal cleanup). Demand is sharply seasonal in most climates, so the site and its SEO need to be ready before spring and fall demand spikes, not scrambling during them.",
    ],
    problems: [
      "Project gallery thin or outdated, despite being the main trust signal for design/install work",
      "No distinction between one-off design/install and recurring maintenance services",
      "Quote requests generic, not capturing property size or service type",
      "Seasonal content and availability not updated ahead of the actual season",
    ],
    websiteRequirements: [
      "A real, current project gallery organized by project type",
      "Separate paths for design/install versus recurring maintenance",
      "Quote request forms capturing property size, service type, and timeline",
      "Seasonal service information kept current ahead of demand",
    ],
    seoOpportunities: [
      "Service + location content (\"landscape design [city]\", \"lawn care [city]\")",
      "Seasonal content timed to rank before demand peaks",
    ],
    developmentSolutions: [
      "Portfolio content model supporting project type, scope, and photos",
      "Quote-request flow branched by design/install vs. recurring maintenance",
    ],
    conversionFocus: [
      "Separate, clear CTAs for one-off quotes versus recurring service signup",
      "Real project photos placed near the quote request, where design credibility is decided",
    ],
    localSeoStrategy: [
      "Service-area pages matched to actual coverage, since landscaping is inherently local and route-dependent",
    ],
    technologies: ["Next.js", "LocalBusiness Schema"],
    projectTypes: ["Design/install company site with a project portfolio", "Recurring lawn care company site with subscription signup"],
    faqs: [
      {
        question: "When should seasonal content go live?",
        answer:
          "Ahead of the season, not during it — ranking takes time to build, so spring-demand content needs to be live and indexed in winter, not published once the first warm week hits.",
      },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    heroSummary:
      "Pest control sells urgency and recurring peace of mind at the same time — the site needs both an emergency path and a maintenance-plan path.",
    overview: [
      "Pest control splits between urgent, specific infestations (visible pests, urgent booking) and recurring prevention plans (quarterly service, sold on peace of mind rather than an active problem). Trust and licensing matter heavily, since the service involves chemicals and access to a customer's home.",
    ],
    problems: [
      "No distinction between urgent single-visit treatment and recurring prevention plans",
      "Licensing and safety information missing, despite being a real trust and compliance signal",
      "Pest-specific content thin, when customers often search by the specific pest they're dealing with",
      "No visible service-plan pricing, pushing every prospect to call for basic information",
    ],
    websiteRequirements: [
      "Separate paths for urgent treatment and recurring prevention plans",
      "Licensing and safety information stated clearly",
      "Pest-specific pages (ants, termites, rodents, etc.) rather than one general pest-control page",
      "Visible plan pricing or starting rates",
    ],
    seoOpportunities: [
      "Pest-specific + location content (\"termite treatment [city]\")",
      "Emergency-intent keyword coverage for active infestations",
      "Recurring-plan content targeting prevention-minded searches",
    ],
    developmentSolutions: [
      "Service-page template split by pest type and by one-time vs. recurring service",
      "Quote/booking flow branched by urgency",
    ],
    conversionFocus: [
      "Emergency path leads with phone and availability; prevention-plan path leads with pricing and value",
      "Licensing and safety messaging placed near the booking action",
    ],
    localSeoStrategy: [
      "Google Business Profile service list matched to pests actually treated",
      "Service-area accuracy, since treatment is route- and license-region-dependent",
    ],
    technologies: ["Next.js", "LocalBusiness Schema"],
    projectTypes: ["Residential pest control site with pest-specific landing pages", "Recurring prevention-plan sales funnel"],
    faqs: [
      {
        question: "Should pricing be shown for pest treatments?",
        answer:
          "A starting range or plan pricing usually helps more than it hurts — treatment scope varies with infestation severity, but price-sensitive visitors are likely to leave without any pricing context at all.",
      },
    ],
  },
  {
    slug: "moving-storage",
    name: "Moving & Storage",
    heroSummary:
      "Moving companies convert on trust and an accurate estimate — the site's job is to make getting a real quote easy without a lowball-then-upsell reputation.",
    overview: [
      "Moving and storage is a high-trust-deficit category — customers are wary of lowball quotes and hidden fees, and search behavior splits between local moves (smaller, faster decision) and long-distance moves (higher consideration, more research). Storage add-ons are a natural upsell but need their own clear information, not a buried mention.",
    ],
    problems: [
      "Estimate process opaque, feeding directly into the industry's trust problem",
      "No distinction between local and long-distance moving, which have very different booking and pricing dynamics",
      "Licensing/insurance (USDOT number for interstate movers) missing, a real trust and compliance signal",
      "Storage options mentioned only in passing instead of having real pricing and unit information",
    ],
    websiteRequirements: [
      "A clear, honest estimate process explaining how pricing works",
      "Separate local and long-distance moving paths",
      "Licensing and insurance information (USDOT number where applicable) stated clearly",
      "Storage pricing and unit information if offered",
    ],
    seoOpportunities: [
      "\"movers in [city]\" and \"[city] to [city] moving\" content",
      "Seasonal content ahead of peak moving season (typically summer)",
    ],
    developmentSolutions: [
      "Estimate request flow capturing move size, distance, and date",
      "Storage add-on presented as its own clear offering with real pricing",
    ],
    conversionFocus: [
      "Transparent estimate process as the core trust-builder, addressing the category's reputation problem directly",
      "Licensing/insurance credentials placed near every quote CTA",
    ],
    localSeoStrategy: [
      "Service-area and route-specific pages for the metros and corridors actually served",
    ],
    technologies: ["Next.js", "LocalBusiness Schema"],
    projectTypes: ["Local moving company site with an honest estimate flow", "Long-distance mover site with route-specific content"],
    faqs: [
      {
        question: "How do we differentiate from competitors known for lowball quotes?",
        answer:
          "Transparency is the actual differentiator — clearly explaining how estimates are calculated and what could change the final price does more to build trust than any amount of marketing copy claiming honesty.",
      },
    ],
  },
  {
    slug: "cleaning-services",
    name: "Cleaning Services",
    heroSummary:
      "Cleaning companies sell trust and convenience — background-checked staff and easy recurring booking matter more than almost anything else on the site.",
    overview: [
      "Residential and commercial cleaning services compete on trust (letting someone into your home or business) and on how easy it is to book and manage recurring service. Residential and commercial buyers have different needs — one-time deep cleans versus recurring contracts — and often deserve separate paths.",
    ],
    problems: [
      "No trust signals (background checks, bonding, insurance) despite being the actual deciding factor for many buyers",
      "Residential and commercial cleaning mixed on the same generic page",
      "No online booking or recurring-schedule management, forcing every change through a phone call",
      "Pricing unclear, common in this category but a real source of drop-off",
    ],
    websiteRequirements: [
      "Trust signals (background-checked staff, bonding, insurance) stated explicitly",
      "Separate residential and commercial paths",
      "Online booking with recurring-schedule management",
      "Transparent pricing or a clear instant-estimate tool",
    ],
    seoOpportunities: [
      "\"[cleaning type] near me\" and local map pack visibility",
      "Recurring-service content targeting subscription-minded searches",
    ],
    developmentSolutions: [
      "Booking system supporting both one-time and recurring scheduling",
      "Instant estimate tool based on space size and service type",
    ],
    conversionFocus: [
      "Book Now with instant or fast estimate as the primary CTA",
      "Trust signals placed directly next to the booking action",
    ],
    localSeoStrategy: [
      "Google Business Profile and service-area accuracy, since cleaning is route-dependent",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Booking/scheduling integration"],
    projectTypes: ["Residential cleaning company site with recurring booking", "Commercial cleaning site with a contract-inquiry flow"],
    faqs: [
      {
        question: "Can pricing really be shown upfront for cleaning services?",
        answer:
          "For standardized residential services, often yes — an instant estimate based on square footage and service type works well. Commercial contracts usually need a scoped quote instead, which we'd route through a separate inquiry path.",
      },
    ],
  },
  {
    slug: "veterinary",
    name: "Veterinary",
    heroSummary:
      "Veterinary practices need the same booking ease as human healthcare, with an added layer of urgency messaging for pet emergencies.",
    overview: [
      "Veterinary practices serve routine care (checkups, vaccinations) and urgent/emergency cases, often for anxious pet owners who want reassurance as much as information. Online booking, clear emergency guidance, and approachable provider profiles all matter more here than in most B2C categories.",
    ],
    problems: [
      "No online booking, forcing every appointment through a phone call",
      "Emergency guidance unclear — what counts as an emergency, and what to do outside business hours",
      "Provider bios missing the specialties and approachability that build comfort with an unfamiliar vet",
      "No new-patient information for pet owners switching practices",
    ],
    websiteRequirements: [
      "Online appointment booking",
      "Clear emergency and after-hours guidance",
      "Provider profiles with specialties and photos",
      "New-patient information (what to bring, what to expect)",
    ],
    seoOpportunities: [
      "\"vet near me\" and emergency-intent local searches",
      "Specialty content (exotic pets, specific conditions) where the practice has real expertise",
    ],
    developmentSolutions: [
      "Scheduling system integration for routine appointments",
      "Clear emergency-routing content and information architecture",
    ],
    conversionFocus: [
      "Book Appointment as the primary CTA, with emergency guidance clearly separated from routine booking",
      "Provider approachability (photos, bios) reducing new-client anxiety",
    ],
    localSeoStrategy: [
      "Google Business Profile with accurate hours and emergency availability",
    ],
    technologies: ["Next.js", "VeterinaryCare/MedicalOrganization Schema", "Scheduling integration"],
    projectTypes: ["General veterinary practice site with online booking", "Specialty/emergency vet site with clear urgent-care routing"],
    faqs: [
      {
        question: "Should emergency information be on every page?",
        answer:
          "It should be easy to find from anywhere on the site — a persistent header link or banner works better than burying it on a single emergency page a stressed pet owner has to search for.",
      },
    ],
  },
  {
    slug: "chiropractic",
    name: "Chiropractic",
    heroSummary:
      "Chiropractic patients search by pain point, not by treatment name — the site needs to meet them where their actual search starts.",
    overview: [
      "Chiropractic search behavior is often symptom-first (\"lower back pain relief\") rather than treatment-first (\"chiropractic adjustment\"), which changes what content actually captures new-patient search demand. New-patient offers, insurance information, and a low-friction booking path all matter for converting that search traffic into a first visit.",
    ],
    problems: [
      "Content organized only around treatment types, missing the symptom-first way patients actually search",
      "No visible new-patient offer or clear first-visit expectations",
      "Insurance and pricing information unclear, a common drop-off point",
      "No online booking, requiring a call during business hours",
    ],
    websiteRequirements: [
      "Symptom/condition-focused content alongside treatment-type pages",
      "A clear new-patient offer and first-visit walkthrough",
      "Insurance and pricing information",
      "Online appointment booking",
    ],
    seoOpportunities: [
      "Symptom + location content (\"lower back pain treatment [city]\")",
      "New-patient and condition-specific content targeting research-phase searches",
    ],
    developmentSolutions: [
      "Content architecture organized by both symptom and treatment type",
      "Scheduling integration for new and returning patients",
    ],
    conversionFocus: [
      "New-patient offer as the primary CTA for first-time visitors",
      "Insurance and pricing clarity placed before the booking step, not after",
    ],
    localSeoStrategy: [
      "Google Business Profile and review generation, both strong local ranking factors in this category",
    ],
    technologies: ["Next.js", "MedicalOrganization Schema", "Scheduling integration"],
    projectTypes: ["Single-practitioner chiropractic site with symptom-focused content", "Multi-provider clinic site with online booking"],
    faqs: [
      {
        question: "Can you write the symptom/condition content?",
        answer:
          "We structure and optimize it, but clinical descriptions and treatment claims should be reviewed and approved by the practicing chiropractor — we're not positioned to make clinical claims on the practice's behalf.",
      },
    ],
  },
  {
    slug: "med-spa-aesthetics",
    name: "Med Spa & Aesthetics",
    heroSummary:
      "Med spas sell results and trust at once — the site needs a real treatment menu, credentialed provider information, and careful, compliant before/after presentation.",
    overview: [
      "Medical aesthetics — injectables, laser treatments, body contouring — sits between beauty and healthcare: visual proof matters, but so do provider credentials and treatment safety information. This is also one of the more regulated categories for before/after imagery and outcome claims, which needs practice sign-off, not agency invention.",
    ],
    problems: [
      "Treatment menu vague on what's actually involved, downtime, or results timeline",
      "Provider credentials (medical director, licensed injectors) unclear, a real trust gap for procedures involving medical risk",
      "Consultation booking unclear or requiring a call",
      "Before/after content either missing or used without clear consent and compliance review",
    ],
    websiteRequirements: [
      "Treatment pages with real detail: what's involved, downtime, expected results timeline",
      "Provider credentials stated clearly (medical director, licensing)",
      "Online consultation booking",
      "Before/after content used only with documented consent and compliance review",
    ],
    seoOpportunities: [
      "Treatment + location content (\"[treatment] [city]\")",
      "Provider and credential content, since credentials are a genuine differentiator and trust signal",
    ],
    developmentSolutions: [
      "Treatment page template supporting real procedural detail",
      "Consultation booking flow with intake-form integration",
    ],
    conversionFocus: [
      "Book a Consultation as the primary CTA, with credentials and safety information nearby",
      "Realistic expectations (downtime, timeline) reducing post-booking dissatisfaction",
    ],
    localSeoStrategy: [
      "Google Business Profile and review generation, both significant in this trust-sensitive category",
    ],
    technologies: ["Next.js", "MedicalOrganization Schema", "Consultation booking integration"],
    projectTypes: ["Med spa site with a structured treatment menu and consultation booking", "Provider-credential-focused site for a physician-led practice"],
    faqs: [
      {
        question: "Can you use before/after photos and specific result claims?",
        answer:
          "Only with the practice's documented client consent and compliance review — this category is genuinely regulated around outcome claims and imagery, and that review has to happen on your side, by your medical director or counsel.",
      },
    ],
  },
  {
    slug: "property-management",
    name: "Property Management",
    heroSummary:
      "Property management sites serve two audiences at once — prospective tenants browsing listings and property owners evaluating whether to hire the company.",
    overview: [
      "Property management is unusual in serving two very different visitors on the same site: tenants looking for a place to rent, and property owners evaluating whether to hand over management of their asset. Conflating these into one generic experience underserves both — owners don't want to wade through listings to find management pricing, and tenants don't need to read an owner sales pitch.",
    ],
    problems: [
      "Owner and tenant content mixed together with no clear separate paths",
      "Listings outdated or disconnected from the actual property management software",
      "No owner-facing information on management fees, services, or process",
      "Maintenance requests for existing tenants routed through a generic contact form instead of a proper portal",
    ],
    websiteRequirements: [
      "Clearly separated tenant (listings) and owner (services, fees) paths from the homepage",
      "Live listings synced with the property management system",
      "Owner-facing pages explaining services, fees, and onboarding process",
      "A maintenance request portal or clear path for existing tenants",
    ],
    seoOpportunities: [
      "Listing pages optimized for rental search (RentalListing schema, location-specific content)",
      "\"property management [city]\" content targeting owner-side search intent",
    ],
    developmentSolutions: [
      "Listings feed integration with the property management platform",
      "Separate owner-lead and tenant-inquiry forms routed appropriately",
    ],
    conversionFocus: [
      "Distinct CTAs for \"Find a Rental\" and \"I'm a Property Owner\" from the first screen",
      "Owner-side trust signals (portfolio size, tenant screening process) placed where owners actually decide",
    ],
    localSeoStrategy: [
      "Google Business Profile and location pages for firms managing properties across multiple submarkets",
    ],
    technologies: ["Next.js", "RentalListing Schema", "Property management software integration"],
    projectTypes: ["Property management company site with live listings and owner-lead funnel", "Tenant portal integration for maintenance requests"],
    faqs: [
      {
        question: "Can listings stay in sync automatically?",
        answer:
          "Yes, if your property management platform exposes a feed or API — we integrate against that rather than requiring listings to be re-entered manually on the website.",
      },
    ],
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    heroSummary:
      "Photography and videography businesses sell almost entirely on portfolio quality — the site has to load that portfolio fast without gutting the image quality that sells the work.",
    overview: [
      "For photographers and videographers, the portfolio essentially is the sales pitch. The central technical challenge is real: showing high-quality imagery without so much page weight that the site becomes slow — which, ironically, undermines the professionalism the images are meant to convey. Niche specialization (wedding, corporate, real estate, product) also changes what a buyer needs to see and how they book.",
    ],
    problems: [
      "Portfolio images unoptimized, making an image-heavy site slow, especially on mobile",
      "No clear packages or pricing, common in this category but a real source of lost inquiries",
      "Niche specialties (wedding, corporate, product) not separated, diluting the portfolio's relevance to a given buyer",
      "Booking/inquiry process unclear beyond a generic contact form",
    ],
    websiteRequirements: [
      "A fast-loading, high-quality portfolio using proper image optimization",
      "Package and pricing information, or at least a clear starting range",
      "Niche-specific portfolio sections rather than one mixed gallery",
      "A structured inquiry or booking flow capturing event date and type",
    ],
    seoOpportunities: [
      "Niche + location content (\"wedding photographer [city]\", \"real estate photography [city]\")",
      "Portfolio pages structured for both visual browsing and search visibility",
    ],
    developmentSolutions: [
      "Image optimization pipeline (responsive sizes, modern formats, lazy loading) tuned specifically for a photography-heavy site",
      "Inquiry flow capturing event/project type, date, and budget range",
    ],
    conversionFocus: [
      "Check Availability or Get Pricing as the primary CTA, matched to how buyers actually shop in this category",
      "Niche-specific portfolios placed where a buyer can immediately see relevant work",
    ],
    localSeoStrategy: [
      "Applicable for photographers serving a specific metro or willing to travel within a defined radius",
    ],
    technologies: ["Next.js", "Image optimization pipeline", "LocalBusiness Schema"],
    projectTypes: ["Wedding photographer site with a fast, niche-focused portfolio", "Commercial/product photography site with package pricing"],
    faqs: [
      {
        question: "How do you keep an image-heavy portfolio fast?",
        answer:
          "Responsive image sizing, modern formats, and lazy loading so only the images actually in view load at full resolution — the visual quality doesn't change, but the page weight and load time do.",
      },
    ],
  },
  {
    slug: "nonprofits",
    name: "Nonprofits",
    heroSummary:
      "Nonprofit sites need a frictionless donation path and honest impact reporting — trust and transparency convert better than persuasion copy.",
    overview: [
      "Nonprofit websites serve donors, volunteers, and program beneficiaries at once, with the donation flow as the highest-stakes conversion point on the site — friction or distrust there directly costs the organization funding. Impact reporting (where donations actually go) is both an ethical expectation and a genuine conversion driver for skeptical donors.",
    ],
    problems: [
      "Donation flow with too many steps or an unclear sense of where funds go",
      "Impact/outcomes reporting vague or missing entirely",
      "Volunteer signup buried or disconnected from actual program needs",
      "Financial transparency (annual reports, ratings) not linked or referenced",
    ],
    websiteRequirements: [
      "A short, trustworthy donation flow with clear fund allocation information",
      "Real impact reporting — outcomes, not just activity counts",
      "A clear volunteer signup path connected to actual current needs",
      "Financial transparency information linked or referenced (annual reports, third-party ratings)",
    ],
    seoOpportunities: [
      "Cause and program-specific content targeting both donor and volunteer search intent",
      "Impact/outcome content, which also supports grant and partnership credibility beyond just SEO",
    ],
    developmentSolutions: [
      "Donation platform integration with a minimal-step, trustworthy flow",
      "Volunteer signup connected to real, current program needs rather than a static form",
    ],
    conversionFocus: [
      "Donate as the primary CTA with fund-use transparency directly alongside it",
      "Impact reporting placed where a hesitant donor is deciding whether to trust the organization",
    ],
    localSeoStrategy: [
      "Applicable for organizations with a specific local service area or physical presence",
    ],
    technologies: ["Next.js", "NGO/Organization Schema", "Donation platform integration"],
    projectTypes: ["Nonprofit site rebuild with a streamlined donation flow", "Impact-reporting content program for a grant-seeking organization"],
    faqs: [
      {
        question: "Can you help write our impact reporting content?",
        answer:
          "We structure and present it, but the underlying data and outcomes have to come from your organization's own reporting — we don't originate or embellish impact figures.",
      },
    ],
  },
  {
    slug: "event-planning",
    name: "Event Planning",
    heroSummary:
      "Event planners sell trust in execution under pressure — the site's portfolio and process transparency matter more than any single feature.",
    overview: [
      "Event planning and coordination — weddings, corporate events, private parties — is sold almost entirely on the planner's portfolio and the buyer's confidence that the event will come together as promised. Package clarity and a real consultation process reduce the anxiety inherent in hiring someone for a high-stakes, non-repeatable event.",
    ],
    problems: [
      "Portfolio thin or not organized by event type, making it hard for a buyer to gauge relevant experience",
      "Package/pricing structure unclear, a common source of hesitation in this category",
      "No clear consultation process explained, leaving buyers unsure what hiring actually involves",
      "Vendor relationships and coordination capability not communicated, despite being a real value driver",
    ],
    websiteRequirements: [
      "A portfolio organized by event type with real detail, not just photos",
      "Package structure or starting pricing information",
      "A clearly explained consultation and planning process",
      "Vendor network or coordination capability communicated where relevant",
    ],
    seoOpportunities: [
      "Event type + location content (\"corporate event planner [city]\", \"wedding planner [city]\")",
      "Portfolio pages structured for both visual browsing and search visibility",
    ],
    developmentSolutions: [
      "Portfolio content model supporting event type, scale, and real project detail",
      "Consultation-booking flow capturing event type, date, and budget range",
    ],
    conversionFocus: [
      "Book a Consultation as the primary CTA, with process transparency reducing pre-commitment anxiety",
      "Relevant portfolio examples surfaced by event type, not a single undifferentiated gallery",
    ],
    localSeoStrategy: [
      "Applicable for planners serving a specific metro or venue network",
    ],
    technologies: ["Next.js", "LocalBusiness Schema"],
    projectTypes: ["Wedding planning site with a type-organized portfolio", "Corporate event planning site with a consultation-booking flow"],
    faqs: [
      {
        question: "Should exact pricing be published?",
        answer:
          "Full fixed pricing rarely fits this category since scope varies enormously by event, but package tiers or a starting range give price-sensitive visitors enough context to reach out instead of leaving.",
      },
    ],
  },
  {
    slug: "it-services-msp",
    name: "IT Services & MSP",
    heroSummary:
      "Managed service providers sell reliability to businesses that don't want to think about IT — the site needs to prove response time and security credibility fast.",
    overview: [
      "IT services and managed service providers (MSPs) sell to business owners and IT decision-makers who are often evaluating multiple providers on response time, security posture, and industry-specific compliance experience (healthcare, finance, legal clients have distinct compliance needs). Generic \"we do IT\" messaging underperforms against a competitor who names specific SLAs and compliance experience.",
    ],
    problems: [
      "Services described generically instead of by the SLA, response time, or compliance experience that actually differentiates providers",
      "No industry-specific pages despite serving clients with genuinely different compliance needs (healthcare, finance, legal)",
      "Security credentials and certifications missing, a real trust requirement for this category",
      "Contact process generic, not capturing company size or current IT setup",
    ],
    websiteRequirements: [
      "Service pages with specific SLAs, response times, and support scope",
      "Industry-specific pages for verticals with distinct compliance needs",
      "Security certifications and credentials stated clearly",
      "A structured inquiry flow capturing company size and current IT environment",
    ],
    seoOpportunities: [
      "\"IT support [city]\" and \"managed IT services [city]\" content",
      "Industry-specific content (\"IT support for healthcare practices\", \"law firm IT services\")",
    ],
    developmentSolutions: [
      "Industry-specific landing page template supporting compliance and use-case detail",
      "Inquiry flow capturing the technical context a sales conversation actually needs",
    ],
    conversionFocus: [
      "Get a Free IT Assessment or similar low-commitment CTA, since a full contract is a longer sales cycle",
      "Certifications and SLA specificity placed where technical and compliance-minded buyers evaluate vendors",
    ],
    localSeoStrategy: [
      "Google Business Profile and service-area pages for MSPs offering on-site support in specific regions",
    ],
    technologies: ["Next.js", "ProfessionalService Schema"],
    projectTypes: ["MSP site with industry-specific compliance-focused pages", "IT support company site with SLA-driven service pages"],
    faqs: [
      {
        question: "Should we publish specific SLA numbers on the site?",
        answer:
          "If they're real and something you'll stand behind contractually, yes — specific response-time commitments are more persuasive to a technical buyer than vague reliability language, as long as they're accurate.",
      },
    ],
  },
  {
    slug: "pet-services",
    name: "Pet Services",
    heroSummary:
      "Grooming, boarding, and daycare businesses sell trust with someone's pet — booking ease and visible safety/certification information both matter.",
    overview: [
      "Pet services — grooming, boarding, daycare, dog walking — combine convenience (easy recurring booking) with the trust required to leave a pet in someone else's care. Certifications, facility safety information, and real photos of the space matter more here than in most convenience-service categories.",
    ],
    problems: [
      "No online booking, forcing scheduling through a phone call",
      "Certifications and safety information (staff training, facility protocols) missing",
      "Pricing unclear across service types (grooming packages, boarding rates, daycare passes)",
      "No real facility photos, leaving pet owners without visibility into where their pet will actually stay",
    ],
    websiteRequirements: [
      "Online booking for grooming, boarding, and daycare",
      "Staff certifications and facility safety protocols stated clearly",
      "Clear pricing across all service types",
      "Real facility photos, not stock imagery",
    ],
    seoOpportunities: [
      "\"[service] near me\" and local map pack visibility",
      "Service-specific content (grooming, boarding, daycare) rather than one combined page",
    ],
    developmentSolutions: [
      "Booking system integration supporting multiple service types and scheduling patterns",
      "Facility gallery built to load fast despite being photo-heavy",
    ],
    conversionFocus: [
      "Book Now as the primary CTA across all service types",
      "Safety and certification information placed near the booking step, where a pet owner's hesitation actually is",
    ],
    localSeoStrategy: [
      "Google Business Profile with accurate services, hours, and photos",
    ],
    technologies: ["Next.js", "LocalBusiness Schema", "Booking platform integration"],
    projectTypes: ["Grooming salon site with online booking", "Boarding and daycare facility site with real facility photography"],
    faqs: [
      {
        question: "Can boarding and daycare share one booking flow?",
        answer:
          "They usually need slightly different flows since boarding involves date ranges and daycare is often single-day or subscription-based — we scope the booking system around the actual service structure rather than forcing both into one form.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

// Maps each industry to the closest-fitting existing portfolio mockup
// category (see content/portfolio.ts) for the "what this site could look
// like" demo image on directory pages — illustrative, not a real screenshot,
// same as the portfolio section. Anything not listed defaults to "Websites",
// the right fit for most local-service industries.
const DEMO_CATEGORY_OVERRIDES: Record<string, "Websites" | "SaaS" | "E-commerce" | "Web Applications" | "Dashboards"> = {
  ecommerce: "E-commerce",
  "real-estate": "Web Applications",
  "property-management": "Web Applications",
  saas: "SaaS",
  technology: "SaaS",
  finance: "Dashboards",
  logistics: "Dashboards",
  "it-services-msp": "Dashboards",
};

export function getDemoCategoryForIndustry(slug: string) {
  return DEMO_CATEGORY_OVERRIDES[slug] ?? "Websites";
}
