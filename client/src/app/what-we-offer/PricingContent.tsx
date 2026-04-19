"use client";

import Link from "next/link";
import { ArrowRight, Package, Stethoscope, Wrench, Percent, Check, AlertCircle } from "lucide-react";
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
      <AnimatedSection id="services" className="section scroll-mt-24">
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

      {/* Repairs */}
      <AnimatedSection id="repairs" className="section scroll-mt-24">
        <div className="container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Repair services
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text tracking-tight mb-3">
              Repairs
            </h2>
            <p className="text-gray-600">
              When something goes wrong, we diagnose, fix, and protect your system. Transparent pricing, no hidden fees.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            <StaggerItem hover>
              <div className="bg-white rounded-card shadow-card p-8 h-full flex flex-col text-center">
                <Stethoscope className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">
                  Diagnostic visit
                </p>
                <p className="mb-2">
                  <span className="text-primary font-heading text-3xl font-bold">$99</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Flat-rate diagnostic fee, applied toward the repair cost if you proceed.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem hover>
              <div className="bg-white rounded-card shadow-card p-8 h-full flex flex-col text-center">
                <Wrench className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">
                  Repair labour
                </p>
                <p className="mb-2">
                  <span className="text-primary font-heading text-3xl font-bold">$125</span>
                  <span className="text-gray-500 text-lg font-medium">/hr</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Transparent hourly rate. Quality parts billed separately, always quoted before work begins.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem hover>
              <div className="bg-white rounded-card shadow-card p-8 h-full flex flex-col text-center">
                <Percent className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">
                  Care Plan savings
                </p>
                <p className="mb-2">
                  <span className="text-primary font-heading text-3xl font-bold">Up to 20%</span>
                </p>
                <p className="text-gray-600 text-sm">
                  All repairs discounted for Care Plan members. 10%, 15%, or 20% based on your tier.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-stripe rounded-card p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary text-center mb-4">
                What we repair
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                {[
                  "Ductless mini-splits (all brands)",
                  "Ducted heat pump systems",
                  "HRV/ERV ventilation units",
                  "Thermostats & controls",
                  "Condensate drain issues",
                  "Electrical & wiring faults",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-card p-8 border border-amber-100">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 text-center mb-4">
                Signs your system needs service
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                {[
                  "Reduced heating or cooling performance",
                  "Unusual noises (grinding, rattling, squealing)",
                  "Musty or unpleasant odors from vents",
                  "Higher-than-normal energy bills",
                  "Water leaking from the indoor unit",
                  "Ice on the outdoor unit outside defrost cycles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <FAQ items={GENERAL_FAQ} />

      {/* CTA */}
      <BookingCTA />
    </>
  );
}
