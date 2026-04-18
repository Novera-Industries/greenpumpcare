"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/lib/constants";

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export function FAQ({ title = "Frequently asked questions", items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AnimatedSection className="section">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-8 text-center">
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-card shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-text pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-primary shrink-0 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
