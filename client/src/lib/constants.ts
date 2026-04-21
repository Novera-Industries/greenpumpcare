/* Icon names are strings so constants can be used in Server Components.
   Resolve to actual components via ICON_MAP in client code. */

/* ------------------------------------------------------------------ */
/*  Company                                                            */
/* ------------------------------------------------------------------ */

export const COMPANY = {
  name: "greenpump care",
  legalName: "GreenPump Care Inc.",
  phone: "(782) 830-5900",
  phoneHref: "tel:+17828305900",
  email: "info@greenpumpcare.com",
  emailHref: "mailto:info@greenpumpcare.com",
  website: "https://www.greenpumpcare.ca",
  address: {
    street: "3600 Kempt Rd #212",
    city: "Halifax",
    province: "NS",
    postal: "B3K 4X8",
    full: "3600 Kempt Rd #212, Halifax, NS B3K 4X8",
  },
  license: "#4615849",
  hours: {
    weekdays: "Mon – Fri: 8 am – 8 pm",
    saturday: "Sat: 10 am – 5 pm",
    sunday: "Sun: Closed",
  },
  googleRating: 5.0,
  googleReviewCount: 38,
  brandPromise: "Professional. Reliable. Communicative.",
  tagline: "Halifax's premium heat pump cleaning service",
  googleBusinessUrl: "https://share.google/i9rQhmzOL3u7NbEcN",
  description:
    "GreenPump Care is Halifax's premium heat pump cleaning and maintenance service. We deliver thorough, white-glove deep cleans with eco-friendly products. Because your home's air quality matters.",
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "What We Offer",
    href: "/what-we-offer",
    children: [
      { label: "Cleaning", href: "/what-we-offer#services" },
      { label: "Repairs", href: "/what-we-offer#repairs" },
      { label: "Pricing", href: "/what-we-offer" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  duration: string;
  features: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: "ductless",
    name: "Ductless mini-split deep clean",
    slug: "/ductless-mini-split-cleaning",
    price: 199,
    description:
      "Our signature service. Complete disassembly, coil wash, antimicrobial treatment, and before/after photo documentation. One hour or more per head. Not a quick spray-and-go.",
    shortDescription:
      "Complete disassembly, deep coil wash, and antimicrobial treatment.",
    duration: "1+ Hour Per Head",
    features: [
      "Full disassembly of indoor unit (panels, filters, louvers)",
      "High-pressure evaporator coil wash",
      "Barrel fan deep clean",
      "Eco-friendly antimicrobial treatment",
      "Drain pan flush and condensate line clearing",
      "Outdoor unit visual inspection",
      "Before and after photo documentation",
      "Written service report",
    ],
    icon: "Droplets",
  },
  {
    id: "ducted",
    name: "Ducted system deep clean",
    slug: "/ducted-system-cleaning",
    price: 349,
    description:
      "Comprehensive ducted system service with full coil and component cleaning. Covers your entire ducted heat pump system from intake to output.",
    shortDescription:
      "Full ducted system service with complete coil and component cleaning.",
    duration: "2–3 Hours",
    features: [
      "Evaporator coil deep clean",
      "Blower assembly cleaning",
      "Drain pan sanitation",
      "Standard filter replacement included",
      "Electrical connection inspection",
      "Thermostat calibration",
      "Full system performance test",
      "Before and after photo documentation",
      "Written service report",
    ],
    icon: "AirVent",
  },
  {
    id: "hrv",
    name: "HRV/ERV cleaning",
    slug: "/hrv-erv-cleaning",
    price: 129,
    description:
      "The only premium HRV/ERV cleaning service in Halifax. Core, filters, and ductwork. Keeping your ventilation system running efficiently and your indoor air fresh.",
    shortDescription:
      "Core, filters, and ductwork. The only premium HRV service in Halifax.",
    duration: "0.5–1 Hours",
    features: [
      "Heat exchange core removal and deep cleaning",
      "Filter assessment and replacement recommendation",
      "Condensate drain and pan flush",
      "Airflow balance check (supply vs. exhaust)",
      "Performance verification and testing",
      "Written performance report",
    ],
    icon: "Wind",
  },
];

export interface BundleOffer {
  id: string;
  name: string;
  price: number;
  savings: number;
  description: string;
  services: string[];
  icon: string;
}

export const BUNDLES: BundleOffer[] = [
  {
    id: "mini-hrv",
    name: "Mini-split + HRV",
    price: 299,
    savings: 29,
    description:
      "Ductless mini-split deep clean + HRV/ERV cleaning in one visit.",
    services: ["ductless", "hrv"],
    icon: "Package",
  },
  {
    id: "ducted-hrv",
    name: "Ducted + HRV",
    price: 449,
    savings: 29,
    description:
      "Ducted system deep clean + HRV/ERV cleaning in one visit.",
    services: ["ducted", "hrv"],
    icon: "Package",
  },
  {
    id: "ducted-plus-head",
    name: "Ducted + 1 ductless head",
    price: 499,
    savings: 49,
    description:
      "Ducted system deep clean + one ductless head cleaned in the same visit.",
    services: ["ducted", "ductless"],
    icon: "Package",
  },
];

/** Legacy export — keeps the headline bundle for places that expect a single item. */
export const BUNDLE = BUNDLES[0];

/** Non-linear one-time pricing for ductless by head count. */
export const DUCTLESS_ONETIME_PRICING: Record<number, number> = {
  1: 199,
  2: 349,
  3: 479,
  4: 599,
};
export const DUCTLESS_EXTRA_HEAD_PRICE = 110; // per head beyond 4

export function ductlessOneTimePrice(heads: number): number {
  if (heads <= 4) return DUCTLESS_ONETIME_PRICING[heads] ?? DUCTLESS_ONETIME_PRICING[1];
  return DUCTLESS_ONETIME_PRICING[4] + (heads - 4) * DUCTLESS_EXTRA_HEAD_PRICE;
}

/* ------------------------------------------------------------------ */
/*  Care plans                                                         */
/* ------------------------------------------------------------------ */

export interface CarePlan {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
}

export const CARE_PLANS: CarePlan[] = [
  {
    name: "Essential",
    monthlyPrice: 22,
    description: "Annual maintenance for worry-free performance.",
    features: [
      "1 service visit/year",
      "10% service discount",
      "Priority booking",
      "Maintenance reminders",
      "Price lock guarantee\n(12 months)",
      "Satisfaction guarantee",
    ],
    isPopular: false,
  },
  {
    name: "Comfort",
    monthlyPrice: 35,
    description: "Bi-annual deep cleans with priority service.",
    features: [
      "2 service visits/year",
      "15% service discount",
      "Priority booking",
      "Maintenance reminders",
      "Price lock guarantee\n(12 months)",
      "Satisfaction guarantee",
      "Dedicated account manager",
    ],
    isPopular: true,
  },
  {
    name: "Complete",
    monthlyPrice: 55,
    description: "The ultimate protection for your system.",
    features: [
      "4 service visits/year",
      "20% service discount",
      "VIP priority booking",
      "Emergency service priority",
      "Diagnostic fee waiver",
      "Maintenance reminders",
      "Price lock guarantee\n(12 months)",
      "Satisfaction guarantee",
    ],
    isPopular: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Care plan pricing by system type                                  */
/* ------------------------------------------------------------------ */

export const SYSTEM_PLAN_PRICING = {
  ductless: {
    label: "Ductless Mini-Split",
    basePrice: { Essential: 22, Comfort: 35, Complete: 55 },
    additionalHeadPrice: { Essential: 10, Comfort: 15, Complete: 22 },
    cleansPerYear: { Essential: 1, Comfort: 2, Complete: 4 },
    oneTimePrice: 199, // per head per visit
  },
  hrv: {
    label: "HRV/ERV",
    flatRate: { Essential: 15, Comfort: 25, Complete: 40 },
    cleansPerYear: { Essential: 1, Comfort: 2, Complete: 4 },
    oneTimePrice: 129, // per visit
  },
  ducted: {
    label: "Ducted Heat Pump",
    flatRate: { Essential: 35, Comfort: 50, Complete: 75 },
    cleansPerYear: { Essential: 2, Comfort: 2, Complete: 4 },
    oneTimePrice: 349, // per visit
  },
} as const;

export type PlanTier = "Essential" | "Comfort" | "Complete";
export type SystemType = "ductless" | "hrv" | "ducted";

/* ------------------------------------------------------------------ */
/*  Differentiators                                                    */
/* ------------------------------------------------------------------ */

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "1+ Hour Deep Cleans",
    description:
      "Complete disassembly and thorough cleaning. Not a 15-minute spray-and-go.",
    icon: "Clock",
  },
  {
    title: "Before/After Photos",
    description:
      "Every service includes photo documentation so you can see the difference.",
    icon: "Camera",
  },
  {
    title: "Eco-Friendly Products",
    description:
      "Non-toxic, environmentally responsible cleaning solutions safe for families and pets.",
    icon: "Leaf",
  },
  {
    title: "Warranty Compliant",
    description:
      "Service performed to manufacturer specifications, preserving your warranty coverage.",
    icon: "ShieldCheck",
  },
  {
    title: "Extended Hours",
    description:
      "Mon–Fri 8 am – 8 pm, Sat 10 am – 5 pm. We work around your schedule.",
    icon: "CalendarClock",
  },
  {
    title: "All Brands Serviced",
    description:
      "We service every make and model. Mitsubishi, Daikin, Fujitsu, LG, and more.",
    icon: "Wrench",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  source: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ken Ballem",
    text: "Very professional, efficient, helpful and cheerful. She did a thorough cleaning of our heat pump and was helpful about the best use of our system.",
    rating: 5,
    source: "Google Review",
  },
  {
    name: "Mary Jayne Kelly",
    text: "Fantastic! She checked in frequently to keep us informed. Very thorough and professional. Would definitely recommend this company.",
    rating: 5,
    source: "Google Review",
  },
  {
    name: "James Warnell",
    text: "She was very friendly and did a wonderful job. Plus she was very good with our dog.",
    rating: 5,
    source: "Google Review",
  },
  {
    name: "Terry",
    text: "Professional, friendly and did a thorough job cleaning our heat pump.",
    rating: 5,
    source: "Google Review",
  },
  {
    name: "Mark",
    text: "Very professional and thorough in her cleaning. She explained everything clearly and was very helpful.",
    rating: 5,
    source: "Google Review",
  },
  {
    name: "Alain",
    text: "Very professional and efficient. Did a great job cleaning our heat pump system and was very knowledgeable about best practices.",
    rating: 5,
    source: "Google Review",
  },
];

/* Blog posts now live in @/lib/blog-posts */

/* ------------------------------------------------------------------ */
/*  Process steps (for service pages)                                  */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const DUCTLESS_STEPS: ProcessStep[] = [
  { step: 1, title: "Inspection", description: "Full visual and operational assessment of your unit." },
  { step: 2, title: "Disassembly", description: "Careful removal of covers, filters, barrel fan, and components." },
  { step: 3, title: "Deep clean", description: "Thorough cleaning of coils, fan, drain pan, and housing with eco-friendly solution." },
  { step: 4, title: "Antimicrobial treatment", description: "Professional-grade antimicrobial applied to prevent mould and bacteria growth." },
  { step: 5, title: "Reassembly and testing", description: "Unit reassembled, tested for operation, and before/after photos delivered." },
];

export const DUCTED_STEPS: ProcessStep[] = [
  { step: 1, title: "System assessment", description: "Full inspection of the ducted system, registers, and air handler." },
  { step: 2, title: "Access and preparation", description: "Safe access to coil, fan assembly, and drainage components." },
  { step: 3, title: "Coil and component cleaning", description: "Deep cleaning of evaporator coil, blower fan, and drain system." },
  { step: 4, title: "Antimicrobial treatment", description: "Professional-grade treatment applied to all cleaned surfaces." },
  { step: 5, title: "Testing and documentation", description: "System tested, airflow verified, and before/after photos delivered." },
];

export const HRV_STEPS: ProcessStep[] = [
  { step: 1, title: "Unit inspection", description: "Full assessment of the HRV/ERV unit, filters, and connections." },
  { step: 2, title: "Core removal", description: "Heat recovery core carefully removed for cleaning." },
  { step: 3, title: "Core and filter cleaning", description: "Thorough wash of the heat exchange core and filter assessment." },
  { step: 4, title: "Condensate and duct check", description: "Drain lines cleared, ductwork inspected for blockages." },
  { step: 5, title: "Reassembly and testing", description: "Unit reassembled, airflow tested, and documentation provided." },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export type FAQCategory = "cleanings" | "repairs" | "maintenance";

export interface FAQItem {
  question: string;
  answer: string;
  category?: FAQCategory;
}

export const GENERAL_FAQ: FAQItem[] = [
  {
    category: "cleanings",
    question: "How long does a cleaning take?",
    answer:
      "A ductless mini-split deep clean takes 1+ hour per indoor head. Ducted systems take 2–3 hours. HRV/ERV cleaning takes 0.5–1 hours. We never rush. Thoroughness is our priority.",
  },
  {
    category: "cleanings",
    question: "Are your cleaning products safe for pets and children?",
    answer:
      "Absolutely. We use only non-toxic, eco-friendly cleaning solutions that are safe for your family and pets. No harsh chemicals.",
  },
  {
    category: "cleanings",
    question: "Will cleaning void my warranty?",
    answer:
      "No. Our service is performed to manufacturer specifications, which actually helps maintain your warranty coverage. Regular maintenance is typically required by manufacturers.",
  },
  {
    category: "cleanings",
    question: "What areas do you serve?",
    answer:
      "We serve the entire Halifax Regional Municipality, including Dartmouth, Bedford, Sackville, and surrounding areas.",
  },
  {
    category: "cleanings",
    question: "How do I book a cleaning?",
    answer:
      "You can book online through our website, call us at (782) 830-5900, or email info@greenpumpcare.com. We offer flexible scheduling including evenings and Saturdays.",
  },
  {
    category: "cleanings",
    question: "What is the satisfaction guarantee?",
    answer:
      "If you're not satisfied with a service, we'll re-service your system at no cost. If you're still not happy, we'll refund that month's payment. No questions asked.",
  },
  {
    category: "maintenance",
    question: "What is a care plan?",
    answer:
      "Our care plans are monthly subscriptions that include scheduled deep cleanings, priority booking, and discounts on additional services. Plans start at $22/month for a single ductless head.",
  },
  {
    category: "maintenance",
    question: "How does care plan billing work?",
    answer:
      "Plans are billed monthly to the credit card on file. Your first payment is charged at signup, then on the same day each month going forward.",
  },
  {
    category: "maintenance",
    question: "Can I cancel my care plan?",
    answer:
      "Yes. No cancellation fees. We simply ask for 30 days notice so we can schedule your final service.",
  },
  {
    category: "maintenance",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely. You can change your tier at any time and it takes effect at the next billing cycle.",
  },
  {
    category: "maintenance",
    question: "Are repairs included in my care plan?",
    answer:
      "Repairs are billed separately, but care plan members receive their tier discount. 10% on Essential, 15% on Comfort, and 20% on Complete. Complete members also receive a diagnostic fee waiver (a $99 value) on any service call.",
  },
  {
    category: "maintenance",
    question: "How do I schedule my included cleanings?",
    answer:
      "We send automatic maintenance reminders when your cleaning is due. You can also schedule directly through your client portal, by calling (782) 830-5900, or by emailing info@greenpumpcare.com.",
  },
  {
    category: "maintenance",
    question: "How often does my heat pump need cleaning?",
    answer:
      "Ductless mini-splits: 1–2 deep cleans per year (spring and fall); 4 per year for high-use homes or those with pets and allergies. HRV/ERV units: 1–2 per year. Ducted systems: 1–2 per year, plus filter replacement every 1–3 months. Regular maintenance keeps your warranty valid and efficiency high.",
  },
  {
    category: "maintenance",
    question: "What happens if I skip regular maintenance?",
    answer:
      "A neglected heat pump can lose up to 30% of its efficiency. Dirty coils, blocked blower wheels, contaminated drain lines, and clogged filters lead to higher energy bills, poorer indoor air, and premature component failure. Maintained systems last up to twice as long.",
  },
  {
    category: "maintenance",
    question: "How often should I rinse or replace my filters?",
    answer:
      "Rinse ductless filters monthly. Ducted system filters should be replaced every 1–3 months (included in Ducted Care Plans). HRV/ERV filters should be checked every 2–3 months and replaced as needed.",
  },
  {
    category: "repairs",
    question: "How much does a diagnostic visit cost?",
    answer:
      "$99 flat-rate. Our licensed technician checks electrical connections, refrigerant levels, airflow, controls, and mechanical components to pinpoint the exact problem. If you proceed with the repair, the $99 is applied toward the cost.",
  },
  {
    category: "repairs",
    question: "How is repair labour priced?",
    answer:
      "Repair labour is billed at $125/hr with no hidden fees. Quality parts are billed separately and always quoted before work begins. Care Plan members receive their tier discount (10%, 15%, or 20%) on all repair costs.",
  },
  {
    category: "repairs",
    question: "What systems and brands do you repair?",
    answer:
      "Ductless mini-splits (all brands), ducted heat pump systems, HRV/ERV ventilation units, thermostats and controls, condensate drain issues, and electrical or wiring faults. Our technicians can read and diagnose error codes on all major brands.",
  },
  {
    category: "repairs",
    question: "What are the signs my heat pump needs service?",
    answer:
      "Reduced heating or cooling performance, unusual noises (grinding, rattling, squealing), musty odors from vents, higher-than-normal energy bills, water leaking from the indoor unit, or ice on the outdoor unit outside defrost cycles. If you notice any of these, call us for a diagnostic.",
  },
  {
    category: "repairs",
    question: "Do you offer same-day repair service?",
    answer:
      "Often yes. We schedule diagnostic visits as quickly as possible, with same-day or next-day availability prioritized for Care Plan members.",
  },
  {
    category: "repairs",
    question: "Do you warranty your repair work?",
    answer:
      "Yes. If the same issue returns within our warranty period, we'll address it at no additional cost. You also receive a written report with the diagnosis, work performed, parts used, and recommendations to prevent future problems.",
  },
  {
    category: "repairs",
    question: "Should I repair my heat pump or replace it?",
    answer:
      "Generally repair if the system is under 10 years old, the repair cost is under 50% of replacement, and it's the first major issue. Consider replacement if the system is 12–15+ years old, repair costs exceed 50% of replacement, it uses older R-22 refrigerant, or you're seeing frequent breakdowns. We'll give you an honest recommendation after the diagnostic.",
  },
];
