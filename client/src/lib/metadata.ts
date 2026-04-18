import type { Metadata } from "next";
import { COMPANY } from "./constants";

interface PageMeta {
  title: string;
  description: string;
  slug?: string;
  keywords?: string[];
}

export function generatePageMetadata({
  title,
  description,
  slug = "",
  keywords,
}: PageMeta): Metadata {
  const url = `${COMPANY.website}${slug}`;
  const fullTitle = slug === "" ? title : `${title} | ${COMPANY.name}`;
  const ogImage = `${COMPANY.website}/images/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.name,
      locale: "en_CA",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    other: {
      "geo.region": "CA-NS",
      "geo.placename": "Halifax",
      "geo.position": "44.6605;-63.6083",
      ICBM: "44.6605, -63.6083",
    },
  };
}
