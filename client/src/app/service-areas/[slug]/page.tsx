import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { SERVICES, BUNDLE, COMPANY } from "@/lib/constants";
import { ArticleActions } from "./ArticleActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) return {};

  const url = `${COMPANY.website}/service-areas/${area.slug}`;

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url,
      siteName: COMPANY.name,
      locale: "en_CA",
      type: "article",
      images: [{ url: `${COMPANY.website}/images/og-image.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
      images: [`${COMPANY.website}/images/og-image.jpg`],
    },
    other: {
      "geo.region": "CA-NS",
      "geo.placename": area.name,
      "geo.position": `${area.geo.lat};${area.geo.lng}`,
      ICBM: `${area.geo.lat}, ${area.geo.lng}`,
    },
  };
}

const PUBLISHED_ISO = "2026-04-18";
const PUBLISHED_DISPLAY = "April 18, 2026";

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const allBody = [area.heroIntro, ...area.whyParagraphs].join(" ");
  const readingMinutes = estimateReadingTime(allBody) + 2;

  const nearby = SERVICE_AREAS.filter((a) => a.slug !== area.slug).slice(0, 4);

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${COMPANY.website}/service-areas/${area.slug}#local-business`,
    name: `${COMPANY.legalName}. ${area.name}`,
    url: `${COMPANY.website}/service-areas/${area.slug}`,
    telephone: `+1${COMPANY.phone.replace(/\D/g, "")}`,
    email: COMPANY.email,
    priceRange: "$$",
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
      latitude: area.geo.lat,
      longitude: area.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nova Scotia",
      },
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: area.heroH1,
    description: area.metaDescription,
    datePublished: PUBLISHED_ISO,
    dateModified: PUBLISHED_ISO,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.website}/logos/greenpump-care-logo.png`,
      },
    },
    mainEntityOfPage: `${COMPANY.website}/service-areas/${area.slug}`,
  };

  const localFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer heat pump cleaning in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. GreenPump Care provides professional heat pump deep cleaning throughout ${area.name} and surrounding communities. All services, ductless, ducted, multi-head, and HRV/ERV deep cleans, are available. Book online or call ${COMPANY.phone}.`,
        },
      },
      {
        "@type": "Question",
        name: "How often should I have my heat pump cleaned?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most manufacturers recommend at least once per year to maintain warranty compliance and optimal efficiency. Homes with pets, allergies, or heavy use may benefit from cleaning every 6 months.",
        },
      },
      {
        "@type": "Question",
        name: `How much does heat pump cleaning cost in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "HRV/ERV from $129, ductless mini-splits from $199, HP+HRV bundles from $299, and ducted or multi-head systems from $349. Monthly Care Plans start at $15/month.",
        },
      },
    ],
  };

  const localFaqs = [
    {
      q: `Do you offer heat pump cleaning in ${area.name}?`,
      a: `Yes. We cover ${area.name} and surrounding communities with the same complete-disassembly deep clean we offer everywhere else in HRM.`,
    },
    {
      q: "How often should a heat pump be cleaned?",
      a: "Most manufacturers recommend at least once a year to keep the warranty valid and efficiency high. Homes with pets, allergies, or heavy use do better every six months.",
    },
    {
      q: `What does it cost in ${area.name}?`,
      a: "HRV/ERV from $129, ductless mini-splits from $199, HP+HRV bundles from $299, ducted and multi-head systems from $349. Monthly Care Plans start at $15/month.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
          { name: area.name, path: `/service-areas/${area.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="py-20 lg:py-28">
        <div className="container max-w-[720px] text-center">
          {/* Top meta row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-500 mb-8">
            <Link
              href="/service-areas"
              className="text-primary font-semibold uppercase tracking-[0.12em] text-[11px] hover:underline"
            >
              Service areas
            </Link>
            <span className="text-gray-300">·</span>
            <time dateTime={PUBLISHED_ISO}>{PUBLISHED_DISPLAY}</time>
            <span className="text-gray-300">·</span>
            <span>{readingMinutes} min read</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-text leading-[1.08] tracking-[-0.035em] mb-6">
            {area.heroH1}
          </h1>

          {/* Deck */}
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {area.heroIntro}
          </p>

          {/* Byline */}
          <div className="flex items-center justify-center gap-3 pb-10 mb-14 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-leaf flex items-center justify-center text-white font-heading font-bold text-sm">
              GP
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text">The GreenPump Care Team</p>
              <p className="text-xs text-gray-500">Halifax, Nova Scotia</p>
            </div>
          </div>

          {/* Body copy */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text tracking-tight mb-5">
              Why {area.name} homes need regular heat pump cleaning
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-[1.75]">
              {area.whyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                Every GreenPump Care visit involves a complete disassembly of your
                indoor unit. Not a quick filter rinse. We spend over an hour per
                head removing mould, allergens, and buildup you can&apos;t see or
                reach on your own.
              </p>
            </div>

            {/* Pullquote */}
            <figure className="my-16">
              <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-text leading-snug tracking-tight">
                A dirty heat pump can quietly cost you{" "}
                <span className="text-primary">10–25%</span> more on your energy bill.
              </blockquote>
              <figcaption className="mt-4 text-sm text-gray-500">
                Manufacturer efficiency guidance
              </figcaption>
            </figure>

            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text tracking-tight mb-5">
              What a GreenPump Care deep clean covers
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-[1.75]">
              <p>
                Every visit follows the same four-step process, regardless of where
                you live in {area.name} or what brand of system you have. We pull
                the unit apart, panels, filters, fan barrel, so we can reach the
                evaporator coil directly.
              </p>
              <p>
                From there we apply an eco-friendly solution to the coil, treat
                with an antimicrobial, reassemble, run a performance and airflow
                test, and send you a digital service report for your warranty
                file. The only thing left behind is a cleaner system and a quieter
                one.
              </p>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text tracking-tight mt-14 mb-5">
              Services and pricing
            </h2>
            <ul className="divide-y divide-gray-100 border-y border-gray-100 my-6">
              {[...SERVICES, BUNDLE].map((s) => (
                <li key={s.name} className="flex items-baseline justify-center gap-6 py-4">
                  <Link
                    href={"slug" in s && s.slug ? s.slug : "/what-we-offer"}
                    className="text-text font-medium hover:text-primary transition-colors"
                  >
                    {s.name}
                  </Link>
                  <span className="text-gray-500 tabular-nums whitespace-nowrap">
                    from ${s.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Prices before HST. Multi-head systems priced per head.
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text tracking-tight mt-16 mb-5">
              Common questions from {area.name}
            </h2>
            <dl className="space-y-8">
              {localFaqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-heading text-lg font-semibold text-text mb-2">
                    {f.q}
                  </dt>
                  <dd className="text-gray-700 text-base leading-[1.75] max-w-xl mx-auto">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Inline CTA */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-[0.15em] font-semibold">
              Book your clean
            </p>
            <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-text tracking-tight mb-4">
              Ready for a deep clean in {area.name}?
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Book online in two minutes. Free estimates, no obligation, evening
              and weekend slots available.
            </p>
            <div className="flex justify-center">
              <ArticleActions />
            </div>
          </div>

          {/* Nearby */}
          <div className="mt-24 pt-10 border-t border-gray-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
              More from service areas
            </p>
            <ul className="divide-y divide-gray-100">
              {nearby.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="group flex items-center justify-center gap-3 py-4 hover:text-primary transition-colors"
                  >
                    <span className="font-heading text-lg font-medium text-text group-hover:text-primary transition-colors">
                      {a.name}
                    </span>
                    <span className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
