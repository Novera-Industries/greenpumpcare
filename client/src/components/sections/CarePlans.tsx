"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CARE_PLANS } from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";
import { cn } from "@/lib/utils";

export function CarePlans() {
  return (
    <AnimatedSection className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-5 tracking-[-0.035em] leading-[1.02]">
            Protection,
            <br />
            <span className="text-primary">on repeat.</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto tracking-tight">
            Monthly plans. Priority booking. Zero hassle.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CARE_PLANS.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={cn(
                  "relative rounded-card p-8 h-full flex flex-col overflow-hidden card-premium",
                  plan.isPopular
                    ? "bg-[#1a1a1a] text-white shadow-premium"
                    : "bg-white shadow-card"
                )}
              >
                {/* Animated glows for popular card */}
                {plan.isPopular && (
                  <>
                    <div className="glow-teal glow-animate-1 -top-16 -right-16 !w-40 !h-40 opacity-40" />
                    <div className="glow-mint glow-animate-2 -bottom-12 -left-12 !w-36 !h-36 opacity-25" />
                  </>
                )}

                {/* Badge */}
                {plan.isPopular && (
                  <span className="relative z-10 inline-flex items-center gap-2 self-start bg-primary/30 text-mint text-xs font-semibold px-3 py-1.5 rounded-pill mb-4">
                    <span className="w-1.5 h-1.5 bg-mint rounded-full pulse-dot" />
                    Most popular
                  </span>
                )}

                {/* Top accent line. Green bar animating in on hover (all cards) */}
                <div className="card-accent-line absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-mint z-20" />

                <h3
                  className={cn(
                    "relative z-10 font-heading text-xl font-semibold mb-1",
                    plan.isPopular ? "text-white" : "text-text"
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "relative z-10 text-sm mb-4",
                    plan.isPopular ? "text-white/70" : "text-gray-500"
                  )}
                >
                  {plan.description}
                </p>

                <div className="relative z-10 mb-6">
                  <span className="font-heading text-4xl font-bold">
                    <AnimatedCounter
                      target={plan.monthlyPrice}
                      prefix="$"
                      className={cn(
                        "font-heading text-4xl font-bold",
                        plan.isPopular ? "text-white" : "text-primary"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-sm ml-1",
                      plan.isPopular ? "text-white/60" : "text-gray-500"
                    )}
                  >
                    /month
                  </span>
                </div>

                <ul className="relative z-10 space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={cn(
                        "flex items-start gap-2 text-sm whitespace-pre-line",
                        plan.isPopular ? "text-white/90" : "text-gray-700"
                      )}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          plan.isPopular ? "text-mint" : "text-primary"
                        )}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <Button
                  onClick={openBookingModal}
                  variant={plan.isPopular ? "secondary-light" : "primary"}
                  className="relative z-10 w-full"
                >
                  Get started
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
