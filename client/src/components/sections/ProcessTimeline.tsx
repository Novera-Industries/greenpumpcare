"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CalendarCheck, Sparkles, Wind } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book online",
    description:
      "Pick a time that works for your week. Evenings and Saturdays are open. No phone tag, promise.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Sparkles,
    title: "We deep clean",
    description:
      "We take the unit apart, wash the coils, treat for mould, and put it all back. Over an hour per head. We don't cut corners.",
    color: "from-mint to-primary",
  },
  {
    icon: Wind,
    title: "Breathe easy",
    description:
      "You'll get before/after photos on your phone. Your system runs smoother, your air feels fresher, and your warranty stays good.",
    color: "from-leaf to-mint",
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <AnimatedSection className="section bg-bg-light" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-5 tracking-[-0.035em] leading-[1.02]">
            Book. Clean.
            <br />
            <span className="text-primary">Breathe.</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto tracking-tight">
            Three steps. One deep clean. Cleaner air.
          </p>
        </div>

        {/* Progress line (desktop) */}
        <div className="hidden lg:block relative max-w-3xl mx-auto mb-12">
          <div className="h-0.5 bg-gray-200 rounded-full">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-primary to-mint rounded-full"
            />
          </div>
          {/* Dots */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.3, type: "spring", stiffness: 300 }}
                className="w-4 h-4 bg-primary rounded-full shadow-float ring-4 ring-bg-light"
              />
            ))}
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {steps.map((step, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="card-premium relative bg-white rounded-card p-6 shadow-card overflow-hidden text-center h-full flex flex-col">
                <div className="card-glow absolute -top-8 -right-8 w-28 h-28 bg-primary/10 rounded-full blur-2xl" />

                <div className={`card-icon-wrap relative z-10 w-14 h-14 bg-gradient-to-br ${step.color} rounded-card flex items-center justify-center mx-auto mb-4 shadow-float`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                <p className="relative z-10 text-primary/40 font-heading text-xs font-bold mb-2">
                  STEP {i + 1}
                </p>
                <h3 className="relative z-10 font-heading text-lg font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="relative z-10 text-gray-600 text-sm">
                  {step.description}
                </p>

                <div className="card-accent-line absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-mint" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
