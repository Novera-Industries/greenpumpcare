import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SYSTEM_PLAN_PRICING, type PlanTier } from "@/lib/constants";

const TIERS: PlanTier[] = ["Essential", "Comfort", "Complete"];

const HEAD_COUNTS = [1, 2, 3, 4, 5];

function getPrice(tier: PlanTier, heads: number): string {
  const base = SYSTEM_PLAN_PRICING.ductless.basePrice[tier];
  const extra = SYSTEM_PLAN_PRICING.ductless.additionalHeadPrice[tier];
  const price = base + extra * Math.max(0, heads - 1);
  return heads === 5 ? `$${price}+` : `$${price}`;
}

export function DuctlessHeadTable() {
  return (
    <AnimatedSection className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text mb-3 tracking-tight">
              Ductless pricing by head count
            </h2>
            <p className="text-gray-600">
              Each additional indoor head adds a small monthly fee. Your base plan covers your first head.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-[#1a1a1a] text-white">
              <div className="px-6 py-4 text-sm font-semibold text-white/60">Heads</div>
              {TIERS.map((tier) => (
                <div key={tier} className="px-6 py-4 text-sm font-semibold text-center">
                  {tier}
                </div>
              ))}
            </div>

            {/* Rows */}
            {HEAD_COUNTS.map((heads, i) => {
              const isLast = heads === 5;
              return (
                <div
                  key={heads}
                  className={`grid grid-cols-4 border-b border-gray-100 last:border-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-bg-light"
                  }`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-text">
                    {isLast ? "5+ heads" : `${heads} head${heads > 1 ? "s" : ""}`}
                  </div>
                  {TIERS.map((tier) => (
                    <div
                      key={tier}
                      className={`px-6 py-4 text-center font-heading font-bold ${
                        tier === "Comfort" ? "text-primary" : "text-text"
                      }`}
                    >
                      {getPrice(tier, heads)}
                      <span className="text-gray-400 text-xs font-normal">/mo</span>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Footer note */}
            <div className="px-6 py-4 bg-stripe border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Add-on rate per additional head:{" "}
                <span className="font-medium text-text">
                  Essential +$10 · Comfort +$15 · Complete +$22
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
