import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES, HRV_STEPS, GENERAL_FAQ } from "@/lib/constants";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { ServicePageContent } from "@/components/sections/ServicePageContent";

const service = SERVICES.find((s) => s.id === "hrv")!;

export const metadata: Metadata = generatePageMetadata({
  title: "HRV ERV cleaning Halifax | $129 premium service",
  description:
    "The only premium HRV/ERV cleaning service in Halifax. Core, filters, and ductwork cleaning with eco-friendly products. $129. Book today.",
  slug: "/hrv-erv-cleaning",
});

export default function HrvErvPage() {
  return (
    <>
      <ServicePageContent
        service={service}
        steps={HRV_STEPS}
        faqItems={GENERAL_FAQ}
        badge="Only premium HRV service in Halifax"
      />
      <ServiceSchema service={service} />
    </>
  );
}
