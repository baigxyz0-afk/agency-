// All entries below are demonstration projects, not completed client work.
// They exist to show how we structure and describe a project — architecture,
// scope, technology choices — without presenting invented clients, results,
// or statistics as real. Replace with real client projects (and only real,
// verifiable results) as they become available.

export type PortfolioCategory =
  | "Websites"
  | "SaaS"
  | "E-commerce"
  | "Web Applications"
  | "Dashboards";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  industry: string;
  services: string[];
  technologies: string[];
  challenge: string;
  strategy: string;
  implementation: string;
  isDemo: true;
  liveUrl: string | null;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "demo-multi-location-service-site",
    title: "Multi-Location Service Business Site",
    category: "Websites",
    industry: "Home Services",
    services: ["Web Development", "Local SEO", "Technical SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a home-services business operating across several metro areas, with one generic \"service areas\" page and no per-location SEO structure.",
    strategy:
      "Template-driven location pages built from a single structured data source, so each service area gets a genuinely distinct page instead of a swapped city name on shared copy.",
    implementation:
      "Next.js site with statically generated location and service pages, LocalBusiness structured data per location, and a quote-request flow branched by job type.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-headless-commerce-storefront",
    title: "Headless Commerce Storefront",
    category: "E-commerce",
    industry: "E-commerce",
    services: ["E-commerce Development", "E-commerce SEO"],
    technologies: ["Next.js", "Headless Commerce", "Stripe", "Product Schema"],
    challenge:
      "Demonstration scenario: a mid-size catalog store whose faceted navigation generated thousands of duplicate, unindexable filter-combination URLs.",
    strategy:
      "Rebuild the storefront on a headless architecture with canonical and crawl controls on faceted URLs, and a category-page template built around differentiated content per category.",
    implementation:
      "Next.js storefront with server-rendered category and product pages, structured product data for rich results, and a streamlined checkout flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-saas-admin-platform",
    title: "SaaS Admin & Billing Platform",
    category: "SaaS",
    industry: "SaaS / Technology",
    services: ["SaaS Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Stripe"],
    challenge:
      "Demonstration scenario: an early-stage SaaS product needing multi-tenant architecture and subscription billing before onboarding its first paying customers.",
    strategy:
      "Design a tenant and permission model upfront so the product doesn't need a data-architecture rewrite once usage grows, with billing built on metered and seat-based pricing.",
    implementation:
      "Multi-tenant PostgreSQL schema, Supabase auth with role-based access, and Stripe billing integration supporting trial-to-paid conversion.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-client-portal-dashboard",
    title: "Client Portal & Reporting Dashboard",
    category: "Dashboards",
    industry: "Professional Services",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Demonstration scenario: a professional services firm managing client reporting through email and spreadsheets, with no self-serve visibility for clients.",
    strategy:
      "A role-based client portal replacing manual reporting with live dashboards, scoped so each client only sees their own data.",
    implementation:
      "Next.js application with row-level access control, real-time data views, and exportable reports.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-real-estate-listing-platform",
    title: "Real Estate Listing Platform",
    category: "Web Applications",
    industry: "Real Estate",
    services: ["Web Application Development", "Technical SEO"],
    technologies: ["Next.js", "IDX/MLS Integration", "RealEstateListing Schema"],
    challenge:
      "Demonstration scenario: a brokerage site pulling raw MLS feed data into pages with no SEO structure, and no handling for expired listings.",
    strategy:
      "Structured listing data model with automated redirect handling for expired listings, plus neighborhood landing pages connecting listings to local search intent.",
    implementation:
      "Next.js application with IDX feed integration, statically generated neighborhood pages, and structured data on individual listing pages.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-roofing-storm-response-site",
    title: "Storm-Response Roofing Site",
    category: "Websites",
    industry: "Roofing",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Click-to-call tracking"],
    challenge:
      "Demonstration scenario: a multi-crew roofing company with one generic contact page, no separation between emergency storm-damage traffic and planned-project research traffic.",
    strategy:
      "Split the homepage into an emergency path (click-to-call first) and a planned-project path (financing and material comparison content), backed by per-city landing pages.",
    implementation:
      "Next.js site with LocalBusiness structured data per service area, a lightweight image pipeline for before/after galleries, and call tracking wired into the CTA.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-plumbing-emergency-dispatch-site",
    title: "24/7 Plumbing Dispatch Site",
    category: "Websites",
    industry: "Plumbing",
    services: ["Web Development", "Local SEO", "Technical SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Google Business Profile"],
    challenge:
      "Demonstration scenario: a plumbing company losing map-pack visibility to competitors with tighter service-area pages and more consistent review volume.",
    strategy:
      "Rebuilt service-area architecture with genuinely distinct per-city content and a review-request workflow triggered right after job completion.",
    implementation:
      "Next.js site with structured data matched to Google Business Profile categories, and a click-to-call-first mobile layout for after-hours searches.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-patient-intake-portal",
    title: "Patient Intake & Scheduling Portal",
    category: "Web Applications",
    industry: "Healthcare",
    services: ["Web Application Development", "Technical SEO"],
    technologies: ["Next.js", "PostgreSQL", "Supabase"],
    challenge:
      "Demonstration scenario: a multi-provider clinic handling intake forms on paper, creating data-entry delays and no online scheduling visibility.",
    strategy:
      "A role-based patient portal for online scheduling and digital intake forms, scoped so staff only see the fields relevant to their role.",
    implementation:
      "Next.js application with Supabase auth and row-level security, structured intake forms, and calendar-integrated scheduling.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-law-firm-practice-site",
    title: "Multi-Practice-Area Law Firm Site",
    category: "Websites",
    industry: "Legal",
    services: ["Web Development", "Technical SEO"],
    technologies: ["Next.js", "LegalService Schema", "Attorney Schema"],
    challenge:
      "Demonstration scenario: a firm with five practice areas sharing one generic services page, diluting relevance for any single practice-area search.",
    strategy:
      "Dedicated practice-area pages with distinct case-outcome content (anonymized/illustrative) and attorney bio pages structured for E-E-A-T signals.",
    implementation:
      "Next.js site with LegalService and Attorney structured data, and a consultation-request flow branched by practice area.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-hvac-seasonal-demand-site",
    title: "Seasonal-Demand HVAC Site",
    category: "Websites",
    industry: "HVAC",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Click-to-call tracking"],
    challenge:
      "Demonstration scenario: an HVAC company whose site traffic (and revenue) swings hard by season, with no year-round content strategy for maintenance plans.",
    strategy:
      "Separate emergency no-heat/no-AC landing pages from a maintenance-plan funnel designed to convert in the shoulder seasons.",
    implementation:
      "Next.js site with seasonal content scheduling, LocalBusiness schema per service area, and a maintenance-plan signup flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-construction-portfolio-site",
    title: "Commercial Construction Portfolio Site",
    category: "Websites",
    industry: "Construction",
    services: ["Web Development", "Technical SEO"],
    technologies: ["Next.js", "Image optimization pipeline"],
    challenge:
      "Demonstration scenario: a commercial contractor whose past-projects page is a slow, unstructured image dump with no way to filter by project type.",
    strategy:
      "A structured project-evidence system — filterable by sector and project size — built to carry the long sales cycle on credibility rather than a single-visit pitch.",
    implementation:
      "Next.js site with a lightweight image pipeline for high-resolution project photography and a filterable case-study index.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-dental-practice-booking-site",
    title: "Dental Practice Booking Site",
    category: "Websites",
    industry: "Dental",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Online booking integration"],
    challenge:
      "Demonstration scenario: a dental practice whose booking flow required a phone call, losing anxious or unfamiliar patients who wanted to self-serve first.",
    strategy:
      "An online booking path alongside enough procedure and comfort-focused information to reduce first-visit anxiety before a patient calls.",
    implementation:
      "Next.js site with an embedded booking widget, LocalBusiness structured data, and a procedure-page template reused across services.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-restaurant-menu-site",
    title: "Multi-Location Restaurant Site",
    category: "Websites",
    industry: "Restaurants",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "Restaurant Schema", "Menu CMS"],
    challenge:
      "Demonstration scenario: a three-location restaurant group whose menu lived only in a downloadable PDF, invisible to search and unusable on mobile.",
    strategy:
      "A fast, mobile-first menu built as real HTML per location, with hours and location data structured for map-pack visibility.",
    implementation:
      "Next.js site with Restaurant structured data per location and a lightweight menu CMS so pricing updates don't require a developer.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-insurance-quote-tool",
    title: "Instant Insurance Quote Tool",
    category: "Web Applications",
    industry: "Insurance",
    services: ["Web Application Development", "Conversion Optimization"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Demonstration scenario: an independent insurance agency whose only quote path was a long contact form with a multi-day follow-up before a real quote appeared.",
    strategy:
      "A guided, multi-step quote tool that narrows to a real estimate range immediately, with a human-follow-up handoff for the final bind.",
    implementation:
      "Next.js application with branching form logic, a PostgreSQL-backed rate lookup, and a CRM handoff on submission.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-auto-dealer-inventory-site",
    title: "Auto Dealer Inventory Site",
    category: "Web Applications",
    industry: "Automotive",
    services: ["Web Application Development", "E-commerce SEO"],
    technologies: ["Next.js", "Vehicle Schema", "Inventory feed integration"],
    challenge:
      "Demonstration scenario: a used-car dealer whose inventory feed generated one generic listing template with no model-specific SEO value.",
    strategy:
      "Structured vehicle listing pages with Vehicle schema and canonical handling for sold/relisted inventory, plus a scheduling flow for test drives.",
    implementation:
      "Next.js application with an automated inventory feed sync, Vehicle structured data, and a service-scheduling widget.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-hotel-direct-booking-site",
    title: "Direct-Booking Hotel Site",
    category: "Web Applications",
    industry: "Hotels",
    services: ["Web Application Development", "E-commerce SEO"],
    technologies: ["Next.js", "Booking engine integration", "Hotel Schema"],
    challenge:
      "Demonstration scenario: an independent hotel losing most bookings to OTA commissions because its own site's booking flow was slower and less trustworthy-looking than the OTA listing.",
    strategy:
      "A direct-booking flow faster than the OTA alternative, with rate-parity messaging and real property photography replacing stock imagery.",
    implementation:
      "Next.js site integrated with a booking engine API, Hotel structured data, and a mobile-first checkout flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-saas-trial-conversion-site",
    title: "B2B SaaS Trial Conversion Site",
    category: "SaaS",
    industry: "SaaS",
    services: ["SaaS Development", "Conversion Optimization"],
    technologies: ["Next.js", "TypeScript", "Stripe"],
    challenge:
      "Demonstration scenario: a B2B SaaS product whose marketing site took visitors four scrolls to understand what the product actually does.",
    strategy:
      "A homepage rebuilt around a single, immediately clear value proposition and a self-serve trial flow with no sales call required to start.",
    implementation:
      "Next.js marketing site with an embedded trial signup flow, Stripe billing on conversion, and product-usage-driven onboarding emails.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-finance-compliance-dashboard",
    title: "Financial Services Compliance Dashboard",
    category: "Dashboards",
    industry: "Finance",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "Supabase"],
    challenge:
      "Demonstration scenario: a financial services firm tracking compliance documentation across spreadsheets with no audit trail.",
    strategy:
      "A dashboard that makes compliance status visible at a glance, with every change logged for audit purposes, staying inside what's legally sayable in the UI copy.",
    implementation:
      "Next.js application with Supabase-backed row-level access control and a full change-history log per record.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-school-enrollment-portal",
    title: "School Enrollment & Course Portal",
    category: "Web Applications",
    industry: "Education",
    services: ["Web Application Development", "Technical SEO"],
    technologies: ["Next.js", "PostgreSQL", "Course Schema"],
    challenge:
      "Demonstration scenario: a training provider whose enrollment process was a downloadable PDF form emailed back and forth before anyone could actually register.",
    strategy:
      "An online enrollment funnel with program pages structured to rank for actual program-name searches, not just the school's brand name.",
    implementation:
      "Next.js application with a structured course catalog, Course schema per program, and an online enrollment and payment flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-gym-class-booking-site",
    title: "Gym & Studio Class Booking Site",
    category: "Websites",
    industry: "Fitness",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Class booking integration", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a boutique gym whose free-trial signup required an in-person visit during business hours, losing after-hours interest entirely.",
    strategy:
      "A self-serve free-class booking flow available any time, with real class-schedule data instead of a static PDF timetable.",
    implementation:
      "Next.js site with an embedded class-booking widget and LocalBusiness structured data for each location.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-salon-booking-site",
    title: "Salon & Spa Booking Site",
    category: "Websites",
    industry: "Beauty",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "Booking integration", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a salon whose real work (the actual haircuts and styling) never appeared on the site — just stock photography and a phone number.",
    strategy:
      "A real portfolio gallery structure paired with an online booking flow, so visual trust and easy scheduling do the conversion work together.",
    implementation:
      "Next.js site with a lightweight image pipeline for portfolio photography and an embedded booking widget.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-solar-lead-qualification-site",
    title: "Solar Lead Qualification Site",
    category: "Web Applications",
    industry: "Solar",
    services: ["Web Application Development", "Conversion Optimization"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Demonstration scenario: a solar installer whose only lead-capture path was a generic contact form, sending unqualified leads straight to a sales call.",
    strategy:
      "A guided qualification tool covering roof type, energy usage, and incentives before a lead ever reaches a salesperson, cutting wasted consultations.",
    implementation:
      "Next.js application with a multi-step qualification form, address-based incentive lookup, and a scored-lead handoff to the CRM.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-freight-capacity-dashboard",
    title: "Freight Capacity & Quote Dashboard",
    category: "Dashboards",
    industry: "Logistics",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "API Development"],
    challenge:
      "Demonstration scenario: a freight broker's business customers had to call in to check capacity and request quotes, slowing down time-sensitive B2B decisions.",
    strategy:
      "A self-serve dashboard for checking capacity and requesting quotes directly, cutting the sales cycle down to what a B2B buyer actually needs.",
    implementation:
      "Next.js application with a real-time capacity view and an API-driven quote request flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-manufacturer-spec-site",
    title: "Industrial Manufacturer Spec Site",
    category: "Websites",
    industry: "Manufacturing",
    services: ["Web Development", "Technical SEO"],
    technologies: ["Next.js", "Product Schema", "Spec sheet CMS"],
    challenge:
      "Demonstration scenario: an industrial manufacturer's product pages used marketing language that didn't match how engineers and procurement teams actually search by spec.",
    strategy:
      "Spec-first product pages with downloadable datasheets and search-friendly technical terminology instead of marketing copy.",
    implementation:
      "Next.js site with structured Product data, a searchable spec-sheet library, and an RFQ (request-for-quote) flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-tour-operator-booking-site",
    title: "Tour Operator Booking Site",
    category: "E-commerce",
    industry: "Travel",
    services: ["E-commerce Development", "E-commerce SEO"],
    technologies: ["Next.js", "Stripe", "TouristTrip Schema"],
    challenge:
      "Demonstration scenario: a tour operator whose booking flow redirected to a generic third-party checkout that didn't match the brand or build destination excitement.",
    strategy:
      "Rich destination content paired with a booking flow that stays on-brand end to end, rather than handing the visitor off mid-decision.",
    implementation:
      "Next.js storefront with Stripe checkout, TouristTrip structured data, and a destination-content template built for search intent.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-local-service-business-site",
    title: "Single-Location Local Business Site",
    category: "Websites",
    industry: "Local Businesses",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a single-location local business relying entirely on word of mouth, with no website and an unclaimed Google Business Profile.",
    strategy:
      "A fast, honest, single-purpose site plus a fully optimized Google Business Profile — the two things that matter most at this scale, before anything more elaborate.",
    implementation:
      "Next.js site kept intentionally small and fast, with LocalBusiness structured data and Google Business Profile alignment.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-landscaping-seasonal-site",
    title: "Seasonal Landscaping Company Site",
    category: "Websites",
    industry: "Landscaping",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Image optimization pipeline", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a landscaping company whose quote requests all arrived after the spring rush had already booked out their season.",
    strategy:
      "Off-season content and early-booking incentives designed to pull quote requests forward, backed by a real project-photo gallery for visual proof.",
    implementation:
      "Next.js site with a lightweight image pipeline for seasonal project photography and a structured quote-request flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-pest-control-recurring-plan-site",
    title: "Pest Control Recurring-Plan Site",
    category: "Websites",
    industry: "Pest Control",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Subscription signup flow"],
    challenge:
      "Demonstration scenario: a pest control company selling one-time treatments almost exclusively, with no clear path for visitors to sign up for a recurring maintenance plan.",
    strategy:
      "Separated emergency one-time-treatment requests from a recurring maintenance-plan signup path, each with its own conversion flow.",
    implementation:
      "Next.js site with LocalBusiness structured data and a dedicated recurring-plan signup and billing flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-moving-company-quote-site",
    title: "Moving Company Instant Quote Site",
    category: "Web Applications",
    industry: "Moving & Storage",
    services: ["Web Application Development", "Conversion Optimization"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Demonstration scenario: a moving company whose only quote path was a phone call, common in an industry known for lowball-then-upsell reputations that make visitors hesitant to call at all.",
    strategy:
      "A transparent, self-serve estimate tool covering distance, inventory, and timing, so a visitor gets a real number before ever picking up the phone.",
    implementation:
      "Next.js application with a multi-step estimate calculator and a PostgreSQL-backed pricing model.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-cleaning-service-recurring-site",
    title: "Recurring Cleaning Service Site",
    category: "Websites",
    industry: "Cleaning Services",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Booking integration", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a cleaning company whose site emphasized price over trust, in a category where letting someone into your home is the real decision being made.",
    strategy:
      "Rebuilt around trust signals — background-checked staff, insurance, real reviews — with easy recurring booking as the primary CTA.",
    implementation:
      "Next.js site with an embedded recurring-booking widget and LocalBusiness structured data.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-veterinary-clinic-site",
    title: "Veterinary Clinic Booking Site",
    category: "Websites",
    industry: "Veterinary",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema", "Booking integration"],
    challenge:
      "Demonstration scenario: a veterinary practice with no distinction between routine-appointment and emergency traffic, both routed to the same generic contact form.",
    strategy:
      "Separated emergency messaging (with an always-visible phone number) from routine online booking, matching the urgency level of the actual visitor.",
    implementation:
      "Next.js site with an embedded booking widget, LocalBusiness structured data, and an emergency-path banner.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-chiropractic-patient-site",
    title: "Chiropractic Patient Acquisition Site",
    category: "Websites",
    industry: "Chiropractic",
    services: ["Web Development", "Local SEO"],
    technologies: ["Next.js", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a chiropractic practice's service pages were organized by treatment name, which doesn't match how patients actually search by pain point.",
    strategy:
      "Restructured content around symptoms and pain points first, with treatment explanations as the second layer, matching real search behavior.",
    implementation:
      "Next.js site with symptom-first landing pages, LocalBusiness structured data, and an online booking flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-med-spa-treatment-site",
    title: "Med Spa Treatment & Booking Site",
    category: "Websites",
    industry: "Med Spa & Aesthetics",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Booking integration", "Image optimization pipeline"],
    challenge:
      "Demonstration scenario: a med spa whose before/after content was inconsistent and unclear about provider credentials, undermining trust in a results-driven category.",
    strategy:
      "A real treatment menu with credentialed provider bios and a consistent, compliant before/after presentation format.",
    implementation:
      "Next.js site with a structured treatment-menu template, provider bio pages, and an embedded booking widget.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-property-management-portal",
    title: "Owner & Tenant Property Portal",
    category: "Web Applications",
    industry: "Property Management",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "Supabase"],
    challenge:
      "Demonstration scenario: a property management company serving two very different audiences — prospective tenants and property owners — from one undifferentiated homepage.",
    strategy:
      "Split the experience into a tenant-facing listings and maintenance-request path, and an owner-facing portal for performance reporting.",
    implementation:
      "Next.js application with Supabase-backed role-based access, a maintenance-request workflow, and owner reporting dashboards.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-photography-portfolio-site",
    title: "Photography & Videography Portfolio Site",
    category: "Websites",
    industry: "Photography & Videography",
    services: ["Web Development", "Web Performance"],
    technologies: ["Next.js", "Image optimization pipeline"],
    challenge:
      "Demonstration scenario: a photographer whose portfolio site took over eight seconds to load full-resolution images on mobile, losing visitors before the work ever appeared.",
    strategy:
      "A performance-first image pipeline that keeps genuine image quality while cutting load time, since the portfolio itself is the entire sales pitch.",
    implementation:
      "Next.js site with responsive image optimization, lazy-loaded galleries, and a lightweight booking-inquiry flow.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-nonprofit-donation-site",
    title: "Nonprofit Donation & Impact Site",
    category: "E-commerce",
    industry: "Nonprofits",
    services: ["E-commerce Development", "Conversion Optimization"],
    technologies: ["Next.js", "Stripe", "Donation flow integration"],
    challenge:
      "Demonstration scenario: a nonprofit whose donation flow redirected to a generic third-party form, and whose impact reporting was a single static PDF from two years ago.",
    strategy:
      "A frictionless, on-brand donation flow paired with a real, regularly-updated impact-reporting page — transparency over persuasion copy.",
    implementation:
      "Next.js site with a Stripe-backed donation flow (one-time and recurring) and a structured, updatable impact-report template.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-event-planning-portfolio-site",
    title: "Event Planning Portfolio & Inquiry Site",
    category: "Websites",
    industry: "Event Planning",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Image optimization pipeline"],
    challenge:
      "Demonstration scenario: an event planning company whose site was a single About page with a contact email, no evidence of past events or process.",
    strategy:
      "A structured portfolio of past events by type and size, paired with a transparent process page to build trust in execution under pressure.",
    implementation:
      "Next.js site with a filterable event-portfolio gallery and a detailed inquiry form branched by event type.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-msp-client-reporting-dashboard",
    title: "MSP Client Reporting Dashboard",
    category: "Dashboards",
    industry: "IT Services & MSP",
    services: ["Web Application Development", "API Development"],
    technologies: ["Next.js", "PostgreSQL", "API Development"],
    challenge:
      "Demonstration scenario: a managed service provider whose clients had no visibility into response times or security status, relying entirely on a monthly email summary.",
    strategy:
      "A live client-facing dashboard proving response time and security posture in real time, since reliability is the entire product being sold.",
    implementation:
      "Next.js application with API-driven uptime and ticket-response metrics, and per-client scoped dashboard access.",
    isDemo: true,
    liveUrl: null,
  },
  {
    slug: "demo-pet-grooming-boarding-site",
    title: "Pet Grooming & Boarding Booking Site",
    category: "Websites",
    industry: "Pet Services",
    services: ["Web Development", "Conversion Optimization"],
    technologies: ["Next.js", "Booking integration", "LocalBusiness Schema"],
    challenge:
      "Demonstration scenario: a grooming and boarding business with no visible safety or certification information, a real trust barrier for anyone booking overnight care for a pet.",
    strategy:
      "Certification and safety information surfaced prominently alongside an easy booking flow, addressing the trust barrier before the convenience sell.",
    implementation:
      "Next.js site with an embedded booking widget, LocalBusiness structured data, and a dedicated safety/certification page.",
    isDemo: true,
    liveUrl: null,
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
