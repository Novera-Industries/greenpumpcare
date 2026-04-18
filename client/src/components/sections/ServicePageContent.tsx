"use client";

import { Check, ArrowRight, Phone, Award } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ProcessSteps } from "./ProcessSteps";
import { BookingCTA } from "./BookingCTA";
import { FAQ } from "./FAQ";
import { formatPrice } from "@/lib/utils";
import { COMPANY, type Service, type ProcessStep as ProcessStepType, type FAQItem } from "@/lib/constants";
import { openBookingModal } from "@/lib/housecallpro";

interface ServicePageContentProps {
  service: Service;
  steps: ProcessStepType[];
  faqItems: FAQItem[];
  badge?: string;
}

export function ServicePageContent({ service, steps, faqItems, badge }: ServicePageContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark">
        <div className="container py-16 lg:py-24">
          <div className="max-w-2xl">
            {badge && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-pill mb-4"
              >
                <Award className="w-4 h-4" />
                {badge}
              </motion.div>
            )}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {service.name}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="text-white/90 text-lg mb-6"
            >
              {service.description}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6"
            >
              <span className="font-heading text-4xl font-bold text-white">
                {formatPrice(service.price)}
              </span>
              <span className="text-white/70 text-sm">{service.duration}</span>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Button
                onClick={openBookingModal}
                variant="secondary-light"
                size="lg"
              >
                Book this service
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                href={COMPANY.phoneHref}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <AnimatedSection className="section">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-text mb-8 text-center">
            What&apos;s included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 bg-stripe rounded-card p-4"
              >
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-text text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process steps */}
      <ProcessSteps steps={steps} />

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* CTA */}
      <BookingCTA />
    </>
  );
}
