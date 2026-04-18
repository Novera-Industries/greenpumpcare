import { COMPANY, SERVICES, CARE_PLANS, BUNDLE } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { HCP_TOKEN, HCP_ORG_NAME } from "@/lib/housecallpro";

const HCP_BOOK_URL = `https://book.housecallpro.com/book/${HCP_ORG_NAME}/${HCP_TOKEN}?v2=true`;

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": `${COMPANY.website}/#business`,
  name: COMPANY.legalName,
  alternateName: ["GreenPump Care", "Green Pump Care"],
  description:
    "Halifax's dedicated heat pump cleaning and maintenance company. Professional complete disassembly deep cleans for ductless mini-split, ducted heat pump, multi-head, and HRV/ERV systems using eco-friendly, biodegradable products.",
  url: COMPANY.website,
  logo: `${COMPANY.website}/logos/greenpump-care-logo.png`,
  image: [
    `${COMPANY.website}/images/og-image.jpg`,
    `${COMPANY.website}/logos/greenpump-care-logo.png`,
  ],
  telephone: `+1${COMPANY.phone.replace(/\D/g, "")}`,
  email: COMPANY.email,
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit, Interac",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.province,
    postalCode: COMPANY.address.postal,
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.6605,
    longitude: -63.6083,
  },
  hasMap: "https://www.google.com/maps/place/GreenPump+Care+Inc.",
  areaServed: [
    ...SERVICE_AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nova Scotia",
      },
    })),
    {
      "@type": "AdministrativeArea",
      name: "Halifax Regional Municipality",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nova Scotia",
      },
    },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 44.6605,
      longitude: -63.6083,
    },
    geoRadius: "50000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: COMPANY.googleRating,
    reviewCount: COMPANY.googleReviewCount,
    bestRating: 5,
  },
  founder: [
    { "@type": "Person", name: "Fouad Gerges" },
    { "@type": "Person", name: "Johny Gerges" },
  ],
  employee: [
    { "@type": "Person", name: "Chris Wood", jobTitle: "Director of Operations" },
    { "@type": "Person", name: "Djomar Karam", jobTitle: "General Manager" },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 10,
  },
  foundingDate: "2023",
  isicV4: "4322",
  naics: "238220",
  knowsAbout: [
    "heat pump cleaning",
    "heat pump deep clean",
    "ductless mini-split cleaning",
    "ducted heat pump maintenance",
    "HRV cleaning",
    "ERV cleaning",
    "multi-head heat pump cleaning",
    "indoor air quality",
    "heat pump maintenance",
    "HVAC cleaning Halifax",
    "eco-friendly HVAC cleaning",
    "heat pump care plan",
    "heat pump cleaning Halifax",
    "heat pump cleaning Dartmouth",
    "heat pump cleaning Bedford",
    "heat pump cleaning Nova Scotia",
    "best heat pump cleaning company",
    "mini-split deep clean Halifax",
    "heat pump warranty maintenance",
    "ductless heat pump cleaning near me",
  ],
  knowsLanguage: ["en", "fr"],
  slogan: "Halifax's Heat Pump Cleaning Specialists",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Heat Pump Cleaning Services",
    itemListElement: [
      ...SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          serviceType: "Heat Pump Cleaning",
          provider: { "@id": `${COMPANY.website}/#business` },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Halifax Regional Municipality",
          },
        },
        priceCurrency: "CAD",
        price: String(s.price),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(s.price),
          priceCurrency: "CAD",
          unitText: "starting price",
        },
        availability: "https://schema.org/InStock",
      })),
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: BUNDLE.name,
          description: BUNDLE.description,
          serviceType: "Heat Pump Cleaning",
          provider: { "@id": `${COMPANY.website}/#business` },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Halifax Regional Municipality",
          },
        },
        priceCurrency: "CAD",
        price: String(BUNDLE.price),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(BUNDLE.price),
          priceCurrency: "CAD",
          unitText: "starting price",
        },
        availability: "https://schema.org/InStock",
      },
      ...CARE_PLANS.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `GreenPump Care Plan. ${p.name}`,
          description: p.description,
          serviceType: "Heat Pump Maintenance Plan",
          provider: { "@id": `${COMPANY.website}/#business` },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Halifax Regional Municipality",
          },
        },
        priceCurrency: "CAD",
        price: String(p.monthlyPrice),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(p.monthlyPrice),
          priceCurrency: "CAD",
          unitText: "per month",
        },
        availability: "https://schema.org/InStock",
      })),
    ],
  },
  potentialAction: [
    {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: HCP_BOOK_URL,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Book Heat Pump Cleaning Online",
      },
    },
    {
      "@type": "CommunicateAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: COMPANY.phoneHref,
      },
      name: "Call GreenPump Care",
    },
  ],
  sameAs: [
    "https://www.facebook.com/greenpumpcare",
    "https://www.instagram.com/greenpumpcare",
    "https://www.google.com/maps/place/GreenPump+Care+Inc.",
    `https://book.housecallpro.com/book/${HCP_ORG_NAME}/${HCP_TOKEN}`,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GreenPump Care",
  alternateName: COMPANY.legalName,
  url: COMPANY.website,
};

export function LocalBusinessSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
