"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  ArrowRight,
  Star,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Award,
  Leaf,
} from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  floatDrift,
} from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { COMPANY } from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 38, suffix: "+", label: "5-Star Reviews" },
  { value: 99, suffix: "+", label: "Jobs Completed" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

const liveActivity = [
  {
    name: "Sarah M.",
    location: "Halifax · North End",
    action: "booked a deep clean",
    time: "2 mins ago",
  },
  {
    name: "Mark T.",
    location: "Dartmouth",
    action: "left a 5-star review",
    time: "18 mins ago",
  },
  {
    name: "Jennifer R.",
    location: "Bedford",
    action: "booked an HRV clean",
    time: "1 hour ago",
  },
  {
    name: "Alain P.",
    location: "Halifax · West End",
    action: "left a 5-star review",
    time: "3 hours ago",
  },
];

/* ------------------------------------------------------------------ */
/*  Live activity ticker                                               */
/* ------------------------------------------------------------------ */

function LiveActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % liveActivity.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const item = liveActivity[index];

  return (
    <div className="flex items-center justify-center mb-14">
      <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-pill pl-3 pr-5 py-2 shadow-sm">
        <span className="relative flex w-2 h-2 shrink-0">
          <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-60 animate-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-2 text-[13px]"
          >
            <span className="font-semibold text-text">{item.name}</span>
            <span className="text-gray-500">{item.action}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">{item.time}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating "Next Available" card                                     */
/* ------------------------------------------------------------------ */

function NextAvailableCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden xl:block absolute right-[76px] top-[22%] z-20"
    >
      <motion.div
        animate={floatDrift([-4, 4], 5)}
        className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-5 w-[260px]"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Next available
            </span>
          </div>
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-pill">
            <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            OPEN
          </span>
        </div>
        <p className="font-heading text-[18px] font-bold text-text leading-tight mb-2">
          Tomorrow, 10:00 AM
        </p>
        <div className="flex items-center gap-3 text-[12px] text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Halifax
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~1 hr/head
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating review card                                               */
/* ------------------------------------------------------------------ */

function FloatingReviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden xl:block absolute left-[76px] top-[22%] z-20"
    >
      <motion.div
        animate={floatDrift([6, -6], 6)}
        className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-4 w-[240px]"
      >
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill="#FBBF24"
              stroke="#FBBF24"
            />
          ))}
          <span className="ml-1 text-[11px] font-bold text-text">5.0</span>
        </div>
        <p className="text-[12px] text-text leading-snug italic mb-2.5">
          &ldquo;Very professional and thorough. Explained everything clearly.&rdquo;
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">M</span>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            Mark · Google Review
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Before/After preview peek                                          */
/* ------------------------------------------------------------------ */

function BeforeAfterPeek() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative max-w-4xl mx-auto mt-4"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          See the difference
        </span>
        <span className="text-[11px] text-gray-400">
          ↓ Real results below
        </span>
      </div>

      <div className="relative grid grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border border-gray-200 shadow-card">
        {/* Before */}
        <div className="relative aspect-[3/1] bg-stripe flex items-center justify-center overflow-hidden">
          <Image
            src="/images/before-after/filter-dirty.png"
            alt="Dust-caked heat pump filter before cleaning"
            fill
            sizes="(max-width: 768px) 50vw, 400px"
            className="object-contain"
          />
          <span className="absolute top-2 left-2 bg-gray-800/80 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-pill backdrop-blur">
            Before
          </span>
          <div className="relative text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-gray-700 text-sm shadow-sm">
              ⚠
            </div>
            <p className="text-[11px] text-gray-800 font-semibold bg-white/70 backdrop-blur px-2 py-0.5 rounded-pill">
              Dust & buildup
            </p>
          </div>
        </div>
        {/* After */}
        <div className="relative aspect-[3/1] bg-stripe flex items-center justify-center overflow-hidden">
          <Image
            src="/images/before-after/filter-clean.png"
            alt="Spotless heat pump filter after cleaning"
            fill
            sizes="(max-width: 768px) 50vw, 400px"
            className="object-contain"
          />
          <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-pill">
            After
          </span>
          <div className="relative text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-white text-sm shadow-sm">
              ✓
            </div>
            <p className="text-[11px] text-primary-dark font-semibold bg-white/70 backdrop-blur px-2 py-0.5 rounded-pill">
              Spotless & fresh
            </p>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary -translate-x-1/2 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary shadow-card flex items-center justify-center">
            <span className="text-primary text-xs">⇄</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Halifax aerial video background. Constrained to above-the-fold with fade-to-white */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        >
          <source src="/videos/halifax-aerial.mp4" type="video/mp4" />
        </video>

        {/* White overlay to soften video further */}
        <div className="absolute inset-0 bg-white/20" />

        {/* Bottom fade to white. Blends video into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(9,164,122,0.06), transparent 60%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(40,37,29,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 70% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Floating cards. Anchored to 1400px max wrapper so they never touch text */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full max-w-[1400px] mx-auto">
          <div className="pointer-events-auto">
            <NextAvailableCard />
            <FloatingReviewCard />
          </div>
        </div>
      </div>

      {/* ============ Above the fold. Centered in viewport ============ */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 max-w-[1400px]">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Availability badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-stripe border border-primary/20 text-primary-dark text-sm font-medium px-4 py-2 rounded-pill mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
            </span>
            Now booking in Halifax, Nova Scotia
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-[96px] font-semibold text-text leading-[0.95] mb-6 tracking-[-0.04em]"
          >
            Cleaner air.
            <br />
            <span className="text-primary">Done right.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-xl sm:text-2xl mb-10 leading-snug max-w-2xl mx-auto tracking-tight font-normal"
          >
            Halifax&apos;s premium deep clean. Disassembled, eco-cleaned,
            photo-documented.
          </motion.p>

          {/* Trust badges. Same as footer */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mb-10 max-w-2xl mx-auto"
          >
            {[
              { icon: Shield, label: "Satisfaction Guaranteed" },
              { icon: Award, label: "Licensed & Insured" },
              { icon: Leaf, label: "Eco-Friendly" },
            ].map((badge) => (
              <motion.li
                key={badge.label}
                variants={staggerItem}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <span className="text-text text-sm font-medium">{badge.label}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10 scale-75 origin-center"
          >
            <Button onClick={openBookingModal} size="lg" className="pulse-glow">
              Book your clean
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href={COMPANY.phoneHref} variant="secondary" size="lg">
              <Phone className="w-5 h-5" />
              {COMPANY.phone}
            </Button>
          </motion.div>

          {/* Live activity ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <LiveActivityTicker />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5 text-gray-400"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Scroll
              </span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ Below the fold. Stats + peek ============ */}
      <div className="container relative z-10 pb-20 max-w-[1400px]">
        <div className="max-w-4xl mx-auto">
          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-10 sm:gap-20 pt-12 pb-12 border-y border-gray-200"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="font-heading text-3xl sm:text-5xl font-bold text-text"
                />
                <p className="text-gray-500 text-xs mt-2 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Before/after peek */}
          <div className="mt-16">
            <BeforeAfterPeek />
          </div>
        </div>
      </div>
    </section>
  );
}
