"use client";

import Image from "next/image";
import { Check, ArrowRight, Phone, Clock, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ProcessSteps } from "./ProcessSteps";
import { BookingCTA } from "./BookingCTA";
import { FAQ } from "./FAQ";
import { formatPrice } from "@/lib/utils";
import {
  COMPANY,
  type Service,
  type ProcessStep as ProcessStepType,
  type FAQItem,
} from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";

interface ServicePhotos {
  hero: string;
  heroAlt: string;
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
}

interface ServicePageContentProps {
  service: Service;
  steps: ProcessStepType[];
  faqItems: FAQItem[];
  photos?: ServicePhotos;
  badge?: string;
}

export function ServicePageContent({
  service,
  steps,
  faqItems,
  photos,
  badge,
}: ServicePageContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-14 lg:pt-24 lg:pb-20">
        {/* Soft background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stripe via-white to-bg-light pointer-events-none" />
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(9,164,122,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container relative">
          <div
            className={
              photos
                ? "grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center"
                : "max-w-3xl"
            }
          >
            {/* Left: copy */}
            <div>
              {badge ? (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-pill mb-4"
                >
                  {badge}
                </motion.div>
              ) : (
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4"
                >
                  Deep clean service
                </motion.p>
              )}
              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-text leading-[1.05] tracking-[-0.035em] mb-5"
              >
                {service.name}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl"
              >
                {service.description}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8"
              >
                <span className="font-heading text-4xl font-bold text-primary tabular-nums">
                  {formatPrice(service.price)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  {service.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                  <Leaf className="w-4 h-4 text-primary" />
                  Eco-Friendly
                </span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3"
              >
                <Button onClick={openBookingModal} size="lg">
                  Book this service
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button href={COMPANY.phoneHref} variant="secondary" size="lg">
                  <Phone className="w-5 h-5" />
                  {COMPANY.phone}
                </Button>
              </motion.div>
            </div>

            {/* Right: hero image — desktop only */}
            {photos && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-elevated">
                  <Image
                    src={photos.hero}
                    alt={photos.heroAlt}
                    fill
                    priority
                    sizes="520px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* What's included */}
      <AnimatedSection className="section">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              What&apos;s included
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text tracking-[-0.025em]">
              Every visit, same thorough standard.
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {service.features.map((feature) => (
              <motion.div
                key={feature}
                variants={staggerItem}
                className="flex items-start gap-3 bg-white border border-gray-100 rounded-[14px] p-4 hover:border-primary/30 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                </span>
                <span className="text-text text-[15px] leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* See the difference */}
      {photos && (
        <AnimatedSection className="section bg-bg-light">
          <div className="container max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                See the difference
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text tracking-[-0.025em]">
                Real results from real jobs.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ComparisonCard
                kind="before"
                src={photos.before}
                alt={photos.beforeAlt}
                label="Before"
                caption="Years of dust and buildup"
              />
              <ComparisonCard
                kind="after"
                src={photos.after}
                alt={photos.afterAlt}
                label="After"
                caption="Deep cleaned and restored"
              />
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Process steps */}
      <ProcessSteps steps={steps} />

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* CTA */}
      <BookingCTA />
    </>
  );
}

function ComparisonCard({
  kind,
  src,
  alt,
  label,
  caption,
}: {
  kind: "before" | "after";
  src: string;
  alt: string;
  label: string;
  caption: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-[20px] overflow-hidden shadow-card bg-white"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-pill backdrop-blur ${
            kind === "before"
              ? "bg-gray-900/70 text-white"
              : "bg-primary text-white"
          }`}
        >
          {label}
        </span>
      </div>
      <figcaption className="px-5 py-4 text-sm text-gray-600">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
