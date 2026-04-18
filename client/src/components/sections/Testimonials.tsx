"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowRight, ArrowLeft, Quote, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TESTIMONIALS, COMPANY } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Avatar color palette (reserved neutral tones, no heavy teal)       */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  "bg-gradient-to-br from-amber-400 to-orange-500",
  "bg-gradient-to-br from-sky-400 to-blue-500",
  "bg-gradient-to-br from-rose-400 to-pink-500",
  "bg-gradient-to-br from-violet-400 to-purple-500",
  "bg-gradient-to-br from-primary to-primary-dark",
  "bg-gradient-to-br from-slate-400 to-slate-600",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i <= rating ? "#FBBF24" : "none"}
          stroke={i <= rating ? "#FBBF24" : "#d1d5db"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials Section                                                */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = TESTIMONIALS.length;

  function goTo(index: number) {
    setActiveIndex(index);
    resetInterval();
  }
  function next() {
    goTo((activeIndex + 1) % total);
  }
  function prev() {
    goTo((activeIndex - 1 + total) % total);
  }
  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);
  }

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const active = TESTIMONIALS[activeIndex];

  return (
    <AnimatedSection className="section bg-bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-pill mb-4">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            {COMPANY.googleRating} out of 5 stars on Google
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-5 tracking-[-0.035em] leading-[1.02]">
            Proof,
            <br />
            <span className="text-primary">not promises.</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto tracking-tight">
            {COMPANY.googleReviewCount} five-star Google reviews. 100% satisfaction.
          </p>
        </div>

        {/* Featured carousel */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <a
            href={COMPANY.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more reviews on Google"
            className="group relative block bg-white rounded-2xl p-8 sm:p-10 shadow-card border border-gray-100 hover:border-primary/30 hover:shadow-hover transition-all cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Quote icon */}
                <Quote
                  className="w-10 h-10 text-primary/15 mb-4"
                  fill="currentColor"
                />

                {/* Review text */}
                <p className="font-heading text-xl sm:text-2xl text-text leading-relaxed mb-8">
                  &ldquo;{active.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        AVATAR_COLORS[activeIndex % AVATAR_COLORS.length]
                      }`}
                    >
                      {getInitials(active.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-text text-sm">
                        {active.name}
                      </p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        {active.source}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </p>
                    </div>
                  </div>
                  <StarRating rating={active.rating} />
                </div>
              </motion.div>
            </AnimatePresence>
          </a>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Auto-advance progress bar */}
          <div className="mt-6 h-0.5 bg-gray-200 rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div
              key={activeIndex}
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
        </div>

        {/* Grid of more reviews */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-heading text-xl font-semibold text-text text-center mb-8">
            More from our customers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((review, i) => (
              <motion.a
                key={review.name}
                href={COMPANY.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`See ${review.name}'s review on Google`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(9,164,122,0.15)",
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-white rounded-card p-5 border border-gray-100 hover:border-primary/30 h-full flex flex-col cursor-pointer overflow-hidden"
              >
                {/* Top accent line. Scales in on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-mint scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

                {/* Corner glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-3">
                  <StarRating rating={review.rating} />
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="relative z-10 flex items-center gap-2.5 pt-3 border-t border-gray-100 mt-auto">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs transition-transform duration-300 group-hover:scale-110 ${
                      AVATAR_COLORS[i % AVATAR_COLORS.length]
                    }`}
                  >
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-text text-xs">
                      {review.name}
                    </p>
                    <p className="text-gray-400 text-[10px]">{review.source}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
