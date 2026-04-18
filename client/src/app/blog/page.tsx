import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Heat pump cleaning blog | Tips and guides for Halifax homeowners",
  description:
    "Expert tips on heat pump maintenance, HRV cleaning, indoor air quality, and seasonal guides for Halifax homeowners.",
  slug: "/blog",
});

export default function BlogPage() {
  return <BlogContent />;
}
