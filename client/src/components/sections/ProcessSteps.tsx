"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { MobileMarquee } from "@/components/ui/MobileMarquee";
import type { ProcessStep } from "@/lib/constants";

interface ProcessStepsProps {
  title?: string;
  steps: ProcessStep[];
}

export function ProcessSteps({ title = "Our process", steps }: ProcessStepsProps) {
  return (
    <AnimatedSection className="section bg-bg-light">
      <div className="container">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-10 text-center">
          {title}
        </h2>

        {/* Tablet/desktop: stagger grid */}
        <StaggerContainer className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <StaggerItem key={step.step}>
              <StepItem step={step} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile: forward marquee (below sm) */}
        <div className="sm:hidden">
          <MobileMarquee speed={42} itemClassName="w-[220px] shrink-0 flex">
            {steps.map((step) => (
              <StepItem key={step.step} step={step} />
            ))}
          </MobileMarquee>
        </div>
      </div>
    </AnimatedSection>
  );
}

function StepItem({ step }: { step: ProcessStep }) {
  return (
    <div className="text-center w-full">
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mx-auto mb-3">
        {step.step}
      </div>
      <h3 className="font-heading text-base font-semibold text-text mb-2">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm">{step.description}</p>
    </div>
  );
}
