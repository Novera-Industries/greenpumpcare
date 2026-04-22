"use client";

import { Phone, ArrowRight, Shield, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";

const perks = [
  { icon: CheckCircle2, label: "Free estimates" },
  { icon: Shield, label: "No obligation" },
  { icon: Clock, label: "Evening & weekend slots" },
];

export function BookingCTA() {
  return (
    <AnimatedSection className="section bg-white">
      <div className="container">
        <div className="relative max-w-6xl mx-auto bg-black rounded-[24px] sm:rounded-[32px] overflow-hidden md:scale-75 md:origin-center">
          {/* ============ MAIN CONTENT ============ */}
          <div className="relative px-6 sm:px-14 lg:px-20 py-14 sm:py-20 lg:py-28 text-center">
            {/* Eyebrow */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-pill mb-8"
            >
              <span className="w-1 h-1 bg-primary rounded-full" />
              Your heat pump is waiting
            </motion.div>

            {/* Massive headline */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl lg:text-[88px] font-semibold text-white mb-5 sm:mb-6 leading-[0.98] tracking-[-0.04em]"
            >
              Ready when
              <br />
              <span className="relative inline-block pb-2">
                <span className="relative z-10 text-primary">you are.</span>
                {/* Underline accent. Starts under the "o" */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-[0.5em] right-0 h-1 bg-primary rounded-full origin-left"
                />
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-base sm:text-2xl mb-8 sm:mb-10 max-w-2xl mx-auto tracking-tight"
            >
              From <span className="text-white font-semibold">$129</span>. Free estimate.
              Book in <span className="text-white font-semibold">2 minutes</span>.
            </motion.p>

            {/* CTAs with glow */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              {/* Primary CTA with subtle pulsing glow */}
              <div className="relative">
                {/* Soft pulsing glow halo */}
                <motion.div
                  animate={{ opacity: [0.35, 0.6, 0.35] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-pill bg-primary blur-xl pointer-events-none"
                />
                <Button
                  onClick={openBookingModal}
                  size="lg"
                  className="relative shadow-[0_0_24px_rgba(9,164,122,0.5)]"
                >
                  Book your clean
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Phone CTA. Matches primary size, outlined */}
              <Button
                href={COMPANY.phoneHref}
                variant="secondary-light"
                size="lg"
              >
                <Phone className="w-5 h-5" />
                <span className="md:hidden">Call now</span>
                <span className="hidden md:inline">{COMPANY.phone}</span>
              </Button>
            </motion.div>

            {/* Perks with icons */}
            <motion.ul
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-3"
            >
              {perks.map((perk) => (
                <li
                  key={perk.label}
                  className="flex items-center gap-2.5 text-white/70 text-sm sm:text-lg"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/15 flex items-center justify-center">
                    <perk.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
                  </div>
                  {perk.label}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
