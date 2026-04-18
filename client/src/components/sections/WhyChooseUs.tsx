"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { DIFFERENTIATORS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export function WhyChooseUs() {
  return (
    <AnimatedSection className="section bg-bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            Why choose GreenPump Care?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We deliver a white-glove experience that no general HVAC contractor
            or budget cleaner can match.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-white rounded-card p-6 shadow-card">
                {(() => { const Icon = getIcon(item.icon); return <Icon className="w-8 h-8 text-primary mb-3" />; })()}
                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
