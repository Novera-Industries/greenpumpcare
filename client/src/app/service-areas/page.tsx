import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service Areas | Heat Pump Cleaning Halifax Regional Municipality",
  description:
    "GreenPump Care serves Halifax, Dartmouth, Bedford, Sackville, Cole Harbour, Tantallon, Fall River, and 15+ communities across HRM. Local heat pump deep cleaning. From $129.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | GreenPump Care Halifax",
    description:
      "Heat pump cleaning across Halifax Regional Municipality. 20+ communities served from $129.",
    url: `${COMPANY.website}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
        ]}
      />

      {/* Hero. Centered, generous whitespace */}
      <section className="pt-28 pb-20 lg:pt-40 lg:pb-28">
        <div className="container max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Service areas
          </p>
          <h1 className="font-heading text-[44px] sm:text-6xl lg:text-7xl font-semibold text-text leading-[1.02] tracking-[-0.04em]">
            Heat pump care,
            <br />
            <span className="text-primary">wherever you are in HRM.</span>
          </h1>
          <p className="mt-8 text-gray-500 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
            We service twenty communities across Halifax Regional Municipality.
            Same deep clean. Same eco-friendly products. Same pricing.
          </p>
        </div>
      </section>

      {/* Thin divider */}
      <div className="container max-w-4xl">
        <hr className="border-gray-100" />
      </div>

      {/* Areas list. Centered, minimal chrome */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-4xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-1">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex items-center justify-center gap-3 py-4 border-b border-gray-100 hover:border-primary transition-colors"
                >
                  <span className="text-text text-lg font-medium group-hover:text-primary transition-colors">
                    {area.name}
                  </span>
                  <span className="text-gray-300 text-base group-hover:text-primary group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer CTA. Centered */}
      <section className="pb-28 lg:pb-40">
        <div className="container max-w-3xl text-center">
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Not sure if you&apos;re in our service area?{" "}
            <a
              href={COMPANY.phoneHref}
              className="text-primary font-semibold hover:underline"
            >
              Give us a call
            </a>
            {". "}
            {COMPANY.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
