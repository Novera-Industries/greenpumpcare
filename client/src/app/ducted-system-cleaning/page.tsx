import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES, DUCTED_STEPS, GENERAL_FAQ } from "@/lib/constants";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { ServicePageContent } from "@/components/sections/ServicePageContent";

const service = SERVICES.find((s) => s.id === "ducted")!;

export const metadata: Metadata = generatePageMetadata({
  title: "Ducted heat pump system cleaning Halifax | $349",
  description:
    "Comprehensive ducted heat pump system cleaning in Halifax. Full coil and component deep clean with eco-friendly products. $349. Book today.",
  slug: "/ducted-system-cleaning",
});

export default function DuctedSystemPage() {
  return (
    <>
      <ServicePageContent
        service={service}
        steps={DUCTED_STEPS}
        faqItems={GENERAL_FAQ}
        photos={{
          hero: "/images/services/ducted-hero.jpg",
          heroAlt: "Ducted heat pump evaporator coil exposed during a deep clean",
          before: "/images/services/ducted-before-v2.jpg",
          beforeAlt: "Dust-caked ducted system blower drum before cleaning",
          after: "/images/services/ducted-after-v2.jpg",
          afterAlt: "Ducted system blower fitted with a fresh filter after GreenPump Care service",
        }}
      />
      <ServiceSchema service={service} />
    </>
  );
}
