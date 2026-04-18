"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/Button";
import { SERVICES, BUNDLES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { formatPrice } from "@/lib/utils";

export function ServicesOverview() {
  return (
    <AnimatedSection className="section" id="services">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-5 tracking-[-0.035em] leading-[1.02]">
            Three services.
            <br />
            <span className="text-primary">One standard.</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto tracking-tight">
            Deep cleans, eco-friendly. Photo-documented every time.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SERVICES.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem key={service.id}>
                <Link href="/pricing" className="block h-full">
                  <div className="card-premium relative bg-white rounded-card shadow-card p-8 h-full flex flex-col overflow-hidden">
                    {/* Corner glow on hover */}
                    <div className="card-glow absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

                    <div className="card-icon-wrap relative z-10 w-12 h-12 bg-stripe rounded-card flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="relative z-10 font-heading text-xl font-semibold text-text mb-2">
                      {service.name}
                    </h3>
                    <p className="relative z-10 mb-3">
                      {service.id === "ductless" && (
                        <span className="text-gray-500 text-sm font-medium mr-1">
                          From
                        </span>
                      )}
                      <span className="text-primary font-heading text-2xl font-bold">
                        {formatPrice(service.price)}
                      </span>
                    </p>
                    <p className="relative z-10 text-gray-600 text-sm mb-4 flex-1">
                      {service.shortDescription}
                    </p>
                    <span className="relative z-10 text-primary font-medium text-sm flex items-center gap-1">
                      Learn more <ArrowRight className="w-4 h-4 card-arrow" />
                    </span>

                    {/* Bottom accent line */}
                    <div className="card-accent-line absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-mint" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bundle cards. Dark premium style */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary text-center mb-4">
            Bundle & save
          </p>
        </div>
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {BUNDLES.map((bundle) => (
            <StaggerItem key={bundle.id}>
              <div className="relative bg-[#1a1a1a] rounded-card p-6 overflow-hidden h-full flex flex-col">
                {/* Animated glows */}
                <div className="glow-teal glow-animate-1 -top-12 -right-12 !w-36 !h-36 opacity-25" />

                <div className="relative z-10 flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-card flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-mint" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-white leading-tight mb-1">
                      {bundle.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {bundle.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <p className="text-white font-heading text-3xl font-bold leading-none">
                      {formatPrice(bundle.price)}
                    </p>
                    <p className="text-mint text-[11px] font-semibold mt-1">
                      Save {formatPrice(bundle.savings)}
                    </p>
                  </div>
                  <Button href="/pricing" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
