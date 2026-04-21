import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES, DUCTLESS_STEPS, GENERAL_FAQ } from "@/lib/constants";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { ServicePageContent } from "@/components/sections/ServicePageContent";

const service = SERVICES.find((s) => s.id === "ductless")!;

export const metadata: Metadata = generatePageMetadata({
  title: "Ductless mini-split cleaning Halifax | $199 deep clean",
  description:
    "Professional ductless mini-split deep cleaning in Halifax. Complete disassembly, eco-friendly coil wash, antimicrobial treatment. $199 per head. Book today.",
  slug: "/ductless-mini-split-cleaning",
});

export default function DuctlessMiniSplitPage() {
  return (
    <>
      <ServicePageContent
        service={service}
        steps={DUCTLESS_STEPS}
        faqItems={GENERAL_FAQ}
        photos={{
          hero: "/images/services/ductless-hero-v2.jpg",
          heroAlt: "Clean ductless mini-split indoor head installed in a Halifax home",
          before: "/images/services/ductless-before.jpg",
          beforeAlt: "Dirty ductless mini-split interior with dust and mould buildup",
          after: "/images/services/ductless-after-v2.jpg",
          afterAlt: "Ductless mini-split interior after GreenPump Care deep clean — coils and louvers clear",
        }}
      />
      <ServiceSchema service={service} />
    </>
  );
}
