"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CarePlans } from "@/components/sections/CarePlans";
import { TierComparison } from "@/components/sections/TierComparison";
import { DuctlessHeadTable } from "@/components/sections/DuctlessHeadTable";
import { DeepCleanDetails } from "@/components/sections/DeepCleanDetails";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { FAQ } from "@/components/sections/FAQ";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { SERVICES, BUNDLES, GENERAL_FAQ } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { formatPrice } from "@/lib/utils";

export function PricingContent() {
  return (
    <>
      <PageHero
        eyebrow="Transparent pricing"
        title="What it costs."
        accent="Nothing hidden."
        subtitle="From $129. Every service includes eco-friendly products, before/after documentation, and a written report."
        stats={[
          { value: "$129", label: "HRV / ERV" },
          { value: "$199", label: "Ductless" },
          { value: "$349", label: "Ducted" },
        ]}
      />

      {/* Interactive price calculator. First thing clients see */}
      <PriceCalculator />

      {/* Individual services */}
      <AnimatedSection className="section">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-text mb-8 text-center">
            Individual services
          </h2>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id} hover>
                <Link href={service.slug} className="block h-full">
                  <div className="bg-white rounded-card shadow-card p-8 h-full flex flex-col text-center hover:shadow-hover transition-shadow">
                    {(() => { const Icon = getIcon(service.icon); return <Icon className="w-10 h-10 text-primary mx-auto mb-4" />; })()}
                    <h3 className="font-heading text-xl font-semibold text-text mb-2">
                      {service.name}
                    </h3>
                    <p className="mb-2">
                      {service.id === "ductless" && (
                        <span className="text-gray-500 text-sm font-medium mr-1.5">
                          From
                        </span>
                      )}
                      <span className="text-primary font-heading text-3xl font-bold">
                        {formatPrice(service.price)}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs mb-4">{service.duration}</p>
                    <p className="text-gray-600 text-sm mb-2 flex-1">
                      {service.shortDescription}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bundle options */}
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary text-center mb-4">
              Bundle & save
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUNDLES.map((bundle) => (
                <div
                  key={bundle.id}
                  className="bg-stripe rounded-card shadow-card p-6 flex flex-col h-full"
                >
                  <Package className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-semibold text-text mb-1.5">
                    {bundle.name}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1 mb-4">
                    {bundle.description}
                  </p>
                  <div className="flex items-end justify-between pt-3 border-t border-white/60">
                    <div>
                      <p className="text-primary font-heading text-2xl font-bold leading-none">
                        {formatPrice(bundle.price)}
                      </p>
                      <p className="text-leaf text-xs font-semibold mt-1">
                        Save {formatPrice(bundle.savings)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Care plans */}
      <CarePlans />

      {/* Tier comparison table */}
      <TierComparison />

      {/* Ductless head count pricing */}
      <DuctlessHeadTable />

      {/* What's included in each deep clean */}
      <DeepCleanDetails />

      {/* FAQ */}
      <FAQ items={GENERAL_FAQ} />

      {/* CTA */}
      <BookingCTA />
    </>
  );
}
