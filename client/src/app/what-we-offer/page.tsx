import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Heat Pump Care Plans from $15/mo | GreenPump Care Halifax",
  description:
    "Monthly heat pump maintenance plans from $15/mo. Includes scheduled deep cleans, priority booking & 10-20% off all services. No contracts. Cancel anytime. GreenPump Care Halifax.",
  slug: "/what-we-offer",
  keywords: [
    "heat pump care plan Halifax",
    "heat pump maintenance subscription",
    "HVAC care plan Nova Scotia",
    "heat pump cleaning prices Halifax",
    "ductless mini-split maintenance",
  ],
});

export default function PricingPage() {
  return <PricingContent />;
}
