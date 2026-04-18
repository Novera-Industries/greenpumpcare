"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface Stat {
  value: string;
  label: string;
}

interface Badge {
  icon: LucideIcon;
  label: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: React.ReactNode;
  stats?: Stat[];
  badges?: Badge[];
  align?: "center" | "left";
}

export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  stats,
  badges,
  align = "center",
}: PageHeroProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const subtitleMx = align === "center" ? "mx-auto" : "";

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-28">
      {/* Background gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-stripe via-white to-white pointer-events-none" />

      {/* Teal radial glow top-right */}
      <div
        className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(9,164,122,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Mint radial glow bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(63,214,145,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(40,37,29,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 80%)",
        }}
      />

      <div className="container relative z-10 max-w-4xl">
        <div className={`flex flex-col ${alignClass}`}>
          {eyebrow && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-pill mb-8 shadow-sm"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-text leading-[1.02] tracking-[-0.04em]"
          >
            {title}
            {accent && (
              <>
                <br />
                <span className="text-primary">{accent}</span>
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className={`mt-8 text-gray-500 text-lg sm:text-xl leading-relaxed max-w-2xl ${subtitleMx}`}
            >
              {subtitle}
            </motion.p>
          )}

          {badges && badges.length > 0 && (
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={`mt-10 flex flex-wrap gap-5 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              {badges.map((b) => (
                <motion.li
                  key={b.label}
                  variants={staggerItem}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-primary" strokeWidth={2} />
                  </div>
                  <span className="text-text text-sm font-medium">{b.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`mt-14 grid grid-cols-3 gap-6 sm:gap-12 ${
                align === "center" ? "max-w-xl mx-auto" : "max-w-xl"
              }`}
            >
              {stats.map((s) => (
                <div key={s.label} className={align === "center" ? "text-center" : ""}>
                  <p className="font-heading text-3xl sm:text-4xl font-bold text-text">
                    {s.value}
                  </p>
                  <p className="text-gray-500 text-xs mt-2 font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
