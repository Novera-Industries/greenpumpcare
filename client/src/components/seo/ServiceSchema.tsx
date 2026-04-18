import { COMPANY, type Service } from "@/lib/constants";

export function ServiceSchema({ service }: { service: Service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.legalName,
      telephone: COMPANY.phone,
    },
    areaServed: "Halifax Regional Municipality",
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "CAD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
