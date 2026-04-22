"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus, Plus, TrendingDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import {
  SYSTEM_PLAN_PRICING,
  ductlessOneTimePrice,
  DUCTLESS_ONETIME_PRICING,
  DUCTLESS_EXTRA_HEAD_PRICE,
  type PlanTier,
  type SystemType,
} from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";
import { cn } from "@/lib/utils";

const TIERS: { tier: PlanTier; badge?: string }[] = [
  { tier: "Essential" },
  { tier: "Comfort", badge: "Most popular" },
  { tier: "Complete", badge: "Best value" },
];

function calcMonthlyPrice(
  tier: PlanTier,
  systems: Set<SystemType>,
  ductlessHeads: number
): number {
  let total = 0;
  if (systems.has("ductless")) {
    const base = SYSTEM_PLAN_PRICING.ductless.basePrice[tier];
    const extra = SYSTEM_PLAN_PRICING.ductless.additionalHeadPrice[tier];
    total += base + extra * Math.max(0, ductlessHeads - 1);
  }
  if (systems.has("hrv")) total += SYSTEM_PLAN_PRICING.hrv.flatRate[tier];
  if (systems.has("ducted")) total += SYSTEM_PLAN_PRICING.ducted.flatRate[tier];
  return total;
}

function calcOneTimeCostPerYear(
  tier: PlanTier,
  systems: Set<SystemType>,
  ductlessHeads: number
): number {
  let total = 0;
  if (systems.has("ductless")) {
    total +=
      ductlessOneTimePrice(ductlessHeads) *
      SYSTEM_PLAN_PRICING.ductless.cleansPerYear[tier];
  }
  if (systems.has("hrv")) {
    total +=
      SYSTEM_PLAN_PRICING.hrv.oneTimePrice *
      SYSTEM_PLAN_PRICING.hrv.cleansPerYear[tier];
  }
  if (systems.has("ducted")) {
    total +=
      SYSTEM_PLAN_PRICING.ducted.oneTimePrice *
      SYSTEM_PLAN_PRICING.ducted.cleansPerYear[tier];
  }
  return total;
}

function countTotalCleans(
  tier: PlanTier,
  systems: Set<SystemType>
): number {
  // Each system contributes its own cleans. But for display simplicity use the
  // primary system's cleans (they're the same across systems for the same tier
  // except ducted Essential has 2)
  const sys = systems.has("ducted") ? "ducted" : systems.has("ductless") ? "ductless" : "hrv";
  return SYSTEM_PLAN_PRICING[sys].cleansPerYear[tier];
}

function AnimatedPrice({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

type Mode = "plan" | "onetime";

export function PriceCalculator() {
  const [mode, setMode] = useState<Mode>("plan");
  const [tier, setTier] = useState<PlanTier>("Comfort");
  const [systems, setSystems] = useState<Set<SystemType>>(new Set(["ductless"]));
  const [ductlessHeads, setDuctlessHeads] = useState(1);

  function toggleSystem(sys: SystemType) {
    setSystems((prev) => {
      const next = new Set(prev);
      if (next.has(sys)) {
        if (next.size === 1) return prev;
        next.delete(sys);
      } else {
        next.add(sys);
      }
      return next;
    });
  }

  const monthlyTotal = calcMonthlyPrice(tier, systems, ductlessHeads);
  const annualTotal = monthlyTotal * 12;
  const oneTimeCostPerYear = calcOneTimeCostPerYear(tier, systems, ductlessHeads);
  const annualSavings = oneTimeCostPerYear - annualTotal;
  const savingsPercent = oneTimeCostPerYear > 0
    ? Math.round((annualSavings / oneTimeCostPerYear) * 100)
    : 0;
  const cleans = countTotalCleans(tier, systems);
  const perCleanCost = Math.round(annualTotal / cleans);
  const oneTimePerClean = systems.has("ductless") && systems.size === 1
    ? ductlessOneTimePrice(ductlessHeads)
    : systems.has("ducted") && systems.size === 1
    ? SYSTEM_PLAN_PRICING.ducted.oneTimePrice
    : systems.has("hrv") && systems.size === 1
    ? SYSTEM_PLAN_PRICING.hrv.oneTimePrice
    : null;
  // Total one-time cost per visit across all selected systems (combined, not the yearly)
  const oneTimePerVisitTotal =
    (systems.has("ductless") ? ductlessOneTimePrice(ductlessHeads) : 0) +
    (systems.has("hrv") ? SYSTEM_PLAN_PRICING.hrv.oneTimePrice : 0) +
    (systems.has("ducted") ? SYSTEM_PLAN_PRICING.ducted.oneTimePrice : 0);

  const breakdown: { label: string; amount: number }[] = [];
  if (systems.has("ductless")) {
    const base = SYSTEM_PLAN_PRICING.ductless.basePrice[tier];
    const extra = SYSTEM_PLAN_PRICING.ductless.additionalHeadPrice[tier];
    breakdown.push({
      label: `Ductless (${ductlessHeads} head${ductlessHeads > 1 ? "s" : ""})`,
      amount: base + extra * Math.max(0, ductlessHeads - 1),
    });
  }
  if (systems.has("hrv"))
    breakdown.push({ label: "HRV/ERV", amount: SYSTEM_PLAN_PRICING.hrv.flatRate[tier] });
  if (systems.has("ducted"))
    breakdown.push({ label: "Ducted Heat Pump", amount: SYSTEM_PLAN_PRICING.ducted.flatRate[tier] });

  return (
    <AnimatedSection id="pricing" className="section bg-bg-light scroll-mt-24">
      <div className="container">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-text mb-3 sm:mb-4 tracking-[-0.035em]">
            Build your plan.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto">
            Select your system, heads, and tier. See your exact monthly price and how much you save vs. booking one-time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-card shadow-card overflow-hidden">
          {/* Mode toggle: Care plan vs One-time */}
          <div className="p-5 sm:p-8 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Step 1. Pricing option
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("plan")}
                className={cn(
                  "relative rounded-xl border-2 p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer",
                  mode === "plan"
                    ? "border-primary bg-stripe ring-2 ring-primary"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                {mode === "plan" && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-primary">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                )}
                <p className="font-heading font-semibold text-sm text-text">
                  Care plan
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly subscription, lower per-clean cost
                </p>
              </button>
              <button
                onClick={() => setMode("onetime")}
                className={cn(
                  "relative rounded-xl border-2 p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer",
                  mode === "onetime"
                    ? "border-primary bg-stripe ring-2 ring-primary"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                {mode === "onetime" && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-primary">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                )}
                <p className="font-heading font-semibold text-sm text-text">
                  One-time
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Book a single service, no subscription
                </p>
              </button>
            </div>
          </div>

          {/* Step 2. Tier — only shown for plan mode */}
          {mode === "plan" && (
          <div className="p-5 sm:p-8 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Step 2. Choose your tier
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {TIERS.map(({ tier: t, badge }) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={cn(
                    "relative rounded-xl border-2 p-3 sm:p-4 text-center sm:text-left transition-all duration-200 cursor-pointer",
                    tier === t
                      ? t === "Comfort"
                        ? "border-primary bg-[#1a1a1a] ring-2 ring-primary"
                        : t === "Complete"
                        ? "border-leaf bg-white ring-2 ring-leaf"
                        : "border-primary bg-white ring-2 ring-primary"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  {/* Badge */}
                  {badge && (
                    <span
                      className={cn(
                        "absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide whitespace-nowrap",
                        t === "Comfort"
                          ? "bg-primary text-white"
                          : "bg-leaf text-white"
                      )}
                    >
                      {badge}
                    </span>
                  )}

                  {tier === t && (
                    <span
                      className={cn(
                        "absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 rounded-full flex items-center justify-center",
                        t === "Comfort" ? "bg-mint" : "bg-primary"
                      )}
                    >
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <p
                    className={cn(
                      "font-heading font-semibold text-sm mt-1",
                      tier === t && t === "Comfort" ? "text-white" : "text-text"
                    )}
                  >
                    {t}
                  </p>
                  <p
                    className={cn(
                      "text-[11px] sm:text-xs mt-0.5 leading-tight",
                      tier === t && t === "Comfort" ? "text-white/60" : "text-gray-400"
                    )}
                  >
                    <span className="sm:hidden">
                      {t === "Essential" ? "10% off" : t === "Comfort" ? "15% off" : "20% off"}
                    </span>
                    <span className="hidden sm:inline">
                      {t === "Essential"
                        ? "10% service discount"
                        : t === "Comfort"
                        ? "15% service discount"
                        : "20% service discount"}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Systems step — renumber based on mode */}
          <div className="p-5 sm:p-8 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Step {mode === "plan" ? "3" : "2"}. Select your system(s)
            </p>
            <div className="space-y-3">
              {/* Ductless */}
              <div
                className={cn(
                  "rounded-xl border-2 p-4 transition-all duration-200",
                  systems.has("ductless") ? "border-primary bg-stripe" : "border-gray-200 bg-white"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    onClick={() => toggleSystem("ductless")}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0",
                        systems.has("ductless") ? "bg-primary border-primary" : "border-gray-300 bg-white"
                      )}
                    >
                      {systems.has("ductless") && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-text">Ductless Mini-Split</p>
                      <p className="text-xs text-gray-500">
                        {mode === "plan" ? (
                          <>
                            ${SYSTEM_PLAN_PRICING.ductless.basePrice[tier]}/mo starting rate
                            {" "}· stand-alone{" "}
                            <span className="font-semibold text-text">
                              ${DUCTLESS_ONETIME_PRICING[1]}
                            </span>
                            /visit
                          </>
                        ) : (
                          <>
                            stand-alone{" "}
                            <span className="font-semibold text-text">
                              ${DUCTLESS_ONETIME_PRICING[1]}
                            </span>
                            /visit
                          </>
                        )}
                      </p>
                    </div>
                  </button>

                  {systems.has("ductless") && (
                    <div className="flex items-center justify-center sm:justify-end gap-3 pl-8 sm:pl-0">
                      <span className="text-xs text-gray-500 font-medium">Heads:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDuctlessHeads((h) => Math.max(1, h - 1))}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-heading font-bold text-text w-6 text-center">
                          {ductlessHeads}
                        </span>
                        <button
                          onClick={() => setDuctlessHeads((h) => Math.min(8, h + 1))}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* HRV/ERV */}
              <button
                onClick={() => toggleSystem("hrv")}
                className={cn(
                  "w-full rounded-xl border-2 p-4 flex items-center gap-3 text-left transition-all duration-200 cursor-pointer",
                  systems.has("hrv") ? "border-primary bg-stripe" : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                    systems.has("hrv") ? "bg-primary border-primary" : "border-gray-300 bg-white"
                  )}
                >
                  {systems.has("hrv") && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-text">HRV/ERV</p>
                  <p className="text-xs text-gray-500">
                    ${SYSTEM_PLAN_PRICING.hrv.flatRate[tier]}/mo flat rate
                    {" "}· stand-alone{" "}
                    <span className="font-semibold text-text">
                      ${SYSTEM_PLAN_PRICING.hrv.oneTimePrice}
                    </span>
                    /visit
                  </p>
                </div>
              </button>

              {/* Ducted */}
              <button
                onClick={() => toggleSystem("ducted")}
                className={cn(
                  "w-full rounded-xl border-2 p-4 flex items-center gap-3 text-left transition-all duration-200 cursor-pointer",
                  systems.has("ducted") ? "border-primary bg-stripe" : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                    systems.has("ducted") ? "bg-primary border-primary" : "border-gray-300 bg-white"
                  )}
                >
                  {systems.has("ducted") && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-text">Ducted Heat Pump</p>
                  <p className="text-xs text-gray-500">
                    ${SYSTEM_PLAN_PRICING.ducted.flatRate[tier]}/mo flat rate
                    {" "}· stand-alone{" "}
                    <span className="font-semibold text-text">
                      ${SYSTEM_PLAN_PRICING.ducted.oneTimePrice}
                    </span>
                    /visit
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="p-5 sm:p-8 bg-gradient-to-br from-bg-light to-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                {mode === "plan" ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      Your monthly total
                    </p>
                    <div className="flex items-end gap-1 mb-3">
                      <span className="font-heading text-4xl sm:text-5xl font-bold text-primary">
                        $<AnimatedPrice value={monthlyTotal} />
                      </span>
                      <span className="text-gray-500 mb-1.5">/mo</span>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-1 mb-4">
                      {breakdown.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <span>{item.label}</span>
                          <span className="text-gray-400 ml-auto">${item.amount}/mo</span>
                        </div>
                      ))}
                      {breakdown.length > 1 && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-text pt-1 border-t border-gray-200 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>Total</span>
                          <span className="ml-auto">${monthlyTotal}/mo</span>
                        </div>
                      )}
                    </div>

                    {/* Stand-alone cost reference */}
                    <div className="text-xs text-gray-500 mb-3 space-y-1">
                      <p>
                        Stand-alone per visit:{" "}
                        <span className="font-semibold text-text tabular-nums">
                          ${oneTimePerVisitTotal}
                        </span>
                        {systems.has("ductless") && ductlessHeads > 1 && (
                          <span className="text-gray-400">
                            {" "}({ductlessHeads} ductless heads)
                          </span>
                        )}
                      </p>
                      <p className="text-gray-400">
                        Plan covers {cleans} cleaning{cleans === 1 ? "" : "s"}/year · one-time{" "}
                        <span className="line-through">${oneTimeCostPerYear}/yr</span>
                      </p>
                    </div>

                    {/* Savings vs one-time */}
                    <AnimatePresence mode="wait">
                      {annualSavings > 0 ? (
                        <motion.div
                          key={`savings-${annualSavings}`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm font-medium"
                        >
                          <TrendingDown className="w-4 h-4 shrink-0" />
                          <span>
                            Save{" "}
                            <span className="font-bold">${annualSavings}/yr</span>
                            {" "}({savingsPercent}%) vs booking one-time
                          </span>
                        </motion.div>
                      ) : (
                        <motion.p
                          key={`included-${tier}`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-primary text-sm font-medium"
                        >
                          + priority booking · {tier === "Essential" ? "10%" : tier === "Comfort" ? "15%" : "20%"} off all service calls
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      One-time service total
                    </p>
                    <div className="flex items-end gap-1 mb-3">
                      <span className="font-heading text-4xl sm:text-5xl font-bold text-primary">
                        $<AnimatedPrice value={oneTimePerVisitTotal} />
                      </span>
                      <span className="text-gray-500 mb-1.5">one-time</span>
                    </div>

                    {/* Breakdown for one-time */}
                    <div className="space-y-1 mb-4">
                      {systems.has("ductless") && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <span>Ductless ({ductlessHeads} {ductlessHeads === 1 ? "head" : "heads"})</span>
                          <span className="text-gray-400 ml-auto">
                            ${ductlessOneTimePrice(ductlessHeads)}
                          </span>
                        </div>
                      )}
                      {systems.has("hrv") && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <span>HRV/ERV</span>
                          <span className="text-gray-400 ml-auto">
                            ${SYSTEM_PLAN_PRICING.hrv.oneTimePrice}
                          </span>
                        </div>
                      )}
                      {systems.has("ducted") && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <span>Ducted</span>
                          <span className="text-gray-400 ml-auto">
                            ${SYSTEM_PLAN_PRICING.ducted.oneTimePrice}
                          </span>
                        </div>
                      )}
                      {systems.size > 1 && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-text pt-1 border-t border-gray-200 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>Total</span>
                          <span className="ml-auto">${oneTimePerVisitTotal}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      No subscription. Book a single visit, free estimate, no obligation.
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <Button onClick={openBookingModal} variant="primary" className="w-full sm:w-auto">
                  {mode === "plan" ? "Get started" : "Book service"}
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  {mode === "plan" ? `${tier} plan · No lock-in` : "No subscription"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
