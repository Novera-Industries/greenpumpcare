import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.greenpumpcare.ca";
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/ductless-mini-split-cleaning`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ducted-system-cleaning`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hrv-erv-cleaning`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-offer`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const areas: MetadataRoute.Sitemap = SERVICE_AREAS.map((a) => ({
    url: `${base}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...areas, ...posts];
}
