import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = generatePageMetadata({
  title: "About GreenPump Care | Halifax heat pump cleaning experts",
  description:
    "Learn about GreenPump Care. Halifax's premium heat pump cleaning service. BBB A-rated, 5.0 Google stars, eco-friendly products. Meet our team.",
  slug: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
