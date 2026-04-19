"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import type { FAQItem, FAQCategory } from "@/lib/constants";

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

const CATEGORY_TABS: { key: FAQCategory; label: string }[] = [
  { key: "cleanings", label: "Cleanings" },
  { key: "repairs", label: "Repairs" },
  { key: "maintenance", label: "Maintenance" },
];

export function FAQ({ title = "Frequently asked questions", items }: FAQProps) {
  const hasCategories = items.some((item) => item.category);
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("cleanings");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleItems = hasCategories
    ? items.filter((item) => item.category === activeCategory)
    : items;

  const changeCategory = (category: FAQCategory) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  return (
    <AnimatedSection className="section">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-8 text-center">
          {title}
        </h2>

        {hasCategories && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-stripe rounded-pill p-1">
              {CATEGORY_TABS.map((tab) => {
                const isActive = tab.key === activeCategory;
                return (
                  <button
                    key={tab.key}
                    onClick={() => changeCategory(tab.key)}
                    className={cn(
                      "px-5 py-2 rounded-pill text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-white shadow-card"
                        : "text-gray-600 hover:text-text"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {visibleItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={`${activeCategory}-${i}`}
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
