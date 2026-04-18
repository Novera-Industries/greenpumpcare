import { Check, Minus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type FeatureRow = {
  label: string;
  Essential: boolean | string;
  Comfort: boolean | string;
  Complete: boolean | string;
};

const FEATURES: FeatureRow[] = [
  {
    label: "Deep cleans per year",
    Essential: "1",
    Comfort: "2",
    Complete: "4",
  },
  {
    label: "Service discount",
    Essential: "10%",
    Comfort: "15%",
    Complete: "20%",
  },
  {
    label: "Priority booking",
    Essential: true,
    Comfort: true,
    Complete: true,
  },
  {
    label: "Maintenance reminders",
    Essential: true,
    Comfort: true,
    Complete: true,
  },
  {
    label: "Price lock guarantee (12 mo)",
    Essential: true,
    Comfort: true,
    Complete: true,
  },
  {
    label: "Satisfaction guarantee",
    Essential: true,
    Comfort: true,
    Complete: true,
  },
  {
    label: "Dedicated account manager",
    Essential: false,
    Comfort: true,
    Complete: true,
  },
  {
    label: "VIP priority booking",
    Essential: false,
    Comfort: false,
    Complete: true,
  },
  {
    label: "Emergency service priority",
    Essential: false,
    Comfort: false,
    Complete: true,
  },
  {
    label: "Diagnostic fee waiver ($99 value)",
    Essential: false,
    Comfort: false,
    Complete: true,
  },
];

function Cell({ value, isComfort }: { value: boolean | string; isComfort?: boolean }) {
  if (typeof value === "string") {
    return (
      <div className={`px-4 py-4 text-center text-sm font-semibold ${isComfort ? "text-mint" : "text-primary"}`}>
        {value}
      </div>
    );
  }
  if (value) {
    return (
      <div className="px-4 py-4 flex justify-center">
        <Check className={`w-4 h-4 ${isComfort ? "text-mint" : "text-primary"}`} />
      </div>
    );
  }
  return (
    <div className="px-4 py-4 flex justify-center">
      <Minus className="w-4 h-4 text-gray-300" />
    </div>
  );
}

export function TierComparison() {
  return (
    <AnimatedSection className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text mb-3 tracking-tight">
              Plan comparison
            </h2>
            <p className="text-gray-600">
              Every tier includes the basics. Higher tiers add more cleans, bigger discounts, and premium perks.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4">
              <div className="px-4 py-5 border-b border-gray-100" />
              <div className="px-4 py-5 text-center border-b border-gray-100">
                <p className="font-heading font-semibold text-text text-sm">Essential</p>
                <p className="text-xs text-gray-500 mt-0.5">from $22/mo</p>
              </div>
              <div className="px-4 py-5 text-center bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <p className="font-heading font-semibold text-white text-sm">Comfort</p>
                <p className="text-xs text-white/50 mt-0.5">from $35/mo</p>
              </div>
              <div className="px-4 py-5 text-center border-b border-gray-100">
                <p className="font-heading font-semibold text-text text-sm">Complete</p>
                <p className="text-xs text-gray-500 mt-0.5">from $55/mo</p>
              </div>
            </div>

            {/* Rows */}
            {FEATURES.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-4 border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-light"
                }`}
              >
                <div className="px-4 py-4 text-sm text-gray-700 flex items-center">
                  {row.label}
                </div>
                <Cell value={row.Essential} />
                <div className="bg-[#1a1a1a]/5">
                  <Cell value={row.Comfort} isComfort />
                </div>
                <Cell value={row.Complete} />
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Prices shown are for a single ductless head. See the head count table for multi-head pricing.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
