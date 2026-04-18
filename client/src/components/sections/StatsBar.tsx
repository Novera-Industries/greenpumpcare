"use client";

import { motion } from "motion/react";
import { lineReveal } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 38, suffix: "+", label: "Five-star reviews" },
  { value: 99, suffix: "+", label: "Jobs completed" },
  { value: 1, suffix: " hr+", label: "Per head clean time" },
  { value: 100, suffix: "%", label: "Satisfaction rate" },
];

export function StatsBar() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Top accent line */}
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
      />

      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                duration={stat.value > 50 ? 2.5 : 1.5}
                className="font-heading text-4xl sm:text-5xl font-bold text-primary"
              />
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
      />
    </section>
  );
}
