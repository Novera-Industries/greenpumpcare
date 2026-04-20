"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Shield,
  Star,
  Leaf,
  Award,
  Quote,
  MapPin,
  Phone,
  Heart,
  Wrench,
  MessageSquare,
  Sparkles,
  FileText,
  Download,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { PageHero } from "@/components/layout/PageHero";
import { COMPANY, TESTIMONIALS } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-areas";

const promisePillars = [
  {
    icon: Wrench,
    title: "Professional",
    body:
      "We take the unit apart. Every time. Coils, fan barrel, drain lines. We wash with eco-friendly solutions and put it back the right way.",
  },
  {
    icon: Shield,
    title: "Reliable",
    body:
      "Before and after photos on your phone. A written service report. Priority booking for Care Plan members. No surprises on the invoice.",
  },
  {
    icon: MessageSquare,
    title: "Communicative",
    body:
      "We check in when we're on the way. We explain what we found. We teach you how to get the most out of your system. No pressure, no upsell.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Complete disassembly, always",
    body:
      "Every service is a full tear-down. Panels off, barrel fan out, coil accessible. No shortcut deep cleans.",
  },
  {
    icon: Leaf,
    title: "Eco-friendly, non-toxic",
    body:
      "Biodegradable products safe for kids, pets, and allergy-sensitive households. Never harsh chemicals.",
  },
  {
    icon: Award,
    title: "Warranty-compliant",
    body:
      "Service to manufacturer specifications. Digital service records delivered for your warranty file.",
  },
  {
    icon: Heart,
    title: "One thing, done thoroughly",
    body:
      "Heat pump cleaning is our entire focus. Not an add-on. Not a side hustle. Singular specialty, deeper expertise.",
  },
];

const craftPrinciples = [
  "Over an hour per indoor head. No timed visits.",
  "Drop sheets and wall-wrap. We leave cleaner than we found.",
  "Every coil photographed before and after.",
  "Every clean followed by a written report.",
  "Every technician trained on every major brand.",
  "Every customer followed up — not ghosted.",
];

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

function TestimonialCard({
  text,
  name,
  index,
}: {
  text: string;
  name: string;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative bg-white rounded-[20px] border border-gray-100 p-7 shadow-card hover:shadow-float transition-all h-full flex flex-col"
    >
      <Quote
        className="absolute top-5 right-5 w-6 h-6 text-primary/15"
        fill="currentColor"
      />
      <div className="flex items-center gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill="#FBBF24"
            stroke="#FBBF24"
          />
        ))}
      </div>
      <blockquote className="text-text text-[15px] leading-relaxed mb-5 font-medium italic flex-1">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-heading font-bold text-xs ${
            AVATAR_COLORS[index % AVATAR_COLORS.length]
          }`}
        >
          {getInitials(name)}
        </div>
        <div>
          <p className="font-heading font-semibold text-text text-sm">{name}</p>
          <p className="text-gray-500 text-xs">Google Review · Halifax</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function AboutContent() {
  return (
    <>
      <PageHero
        eyebrow="About GreenPump Care"
        title="Halifax's heat pump cleaning,"
        accent="done right."
        subtitle="We're a small, local team obsessed with one thing: getting your heat pump spotless. Five stars, thirty-eight reviews, zero unhappy customers."
        stats={[
          { value: `${COMPANY.googleRating}★`, label: "Google rating" },
          { value: `${COMPANY.googleReviewCount}`, label: "5-star reviews" },
          { value: "100%", label: "Satisfaction" },
        ]}
      />

      {/* Brand promise — three pillars */}
      <AnimatedSection className="section">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Our brand promise
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05]">
              Professional. Reliable.{" "}
              <span className="text-primary">Communicative.</span>
            </h2>
            <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto">
              Three words we work to earn on every job, from the first phone
              call to the follow-up text after.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {promisePillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="h-full bg-white border border-gray-100 rounded-[20px] p-7 hover:border-primary/30 hover:shadow-card transition-all">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Testimonials — proof from our community */}
      <AnimatedSection className="section bg-bg-light">
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center gap-6 mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Halifax homeowners, in their own words
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05]">
              38 reviews.
              <br />
              <span className="text-primary">Zero complaints.</span>
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill="#FBBF24"
                    stroke="#FBBF24"
                  />
                ))}
              </div>
              <span className="font-heading text-xl font-bold text-text">
                {COMPANY.googleRating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-xs">
                out of 5 on Google
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <TestimonialCard
                key={t.name}
                text={t.text}
                name={t.name}
                index={i}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={COMPANY.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Read all {COMPANY.googleReviewCount} reviews on Google
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* The craft — proud of the work */}
      <AnimatedSection className="section">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                The craft
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05] mb-6">
                We take pride
                <br />
                <span className="text-primary">in how we work.</span>
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-[1.75]">
                <p>
                  Heat pump cleaning, done right, is slow work. It means pulling
                  the unit apart, washing every coil, treating for mould, and
                  putting it all back with the same care you'd want in your own
                  home.
                </p>
                <p>
                  That's the whole job. No upsells, no bolt-on services, no
                  rushing to the next appointment. Just one thing, done
                  thoroughly, every time.
                </p>
                <p>
                  When a customer on Kempt Road calls us back a year later to
                  say the system is still running quieter than it did after
                  installation — that's the win.
                </p>
              </div>
            </div>

            <ul className="flex flex-col justify-between gap-3 h-full">
              {craftPrinciples.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-[14px] px-5 py-5 flex-1"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="block w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-text text-[15px] font-medium leading-relaxed">
                    {p}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Values grid */}
      <AnimatedSection className="section bg-bg-light">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              What drives us
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05]">
              Values that show up{" "}
              <span className="text-primary">in the work.</span>
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-[18px] p-6 h-full hover:border-primary/30 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-text mb-1.5">
                      {v.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed">
                      {v.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Halifax roots — community section */}
      <AnimatedSection className="section">
        <div className="container max-w-5xl">
          <div className="relative bg-[#0d0d0d] rounded-[28px] overflow-hidden p-10 sm:p-14 lg:p-16">
            {/* Nova Scotia map silhouette — actual geography (Natural Earth 50m) */}
            <svg
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
              fill="white"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
              style={{ filter: "blur(3.5px)" }}
            >
              <path d="M 316.3,211.6 L 322.3,209.4 L 330.3,201.5 L 338.4,191.6 L 353.8,189.6 L 356.8,184.2 L 379.0,192.5 L 403.5,208.1 L 422.8,205.0 L 431.1,205.5 L 452.6,215.3 L 458.6,220.2 L 461.9,224.5 L 472.7,223.6 L 488.3,219.8 L 516.4,220.7 L 546.3,226.3 L 543.8,234.7 L 539.3,240.6 L 562.7,238.6 L 577.3,244.6 L 582.4,241.7 L 586.0,238.0 L 615.1,227.8 L 652.5,206.5 L 657.0,209.2 L 658.7,217.2 L 663.6,230.4 L 678.0,239.4 L 695.0,241.5 L 718.5,234.6 L 727.7,240.6 L 738.7,252.1 L 749.1,267.2 L 748.5,272.6 L 735.0,277.3 L 722.9,284.1 L 773.4,286.9 L 778.5,289.8 L 784.1,295.7 L 779.0,301.7 L 774.2,304.7 L 765.1,301.2 L 748.2,304.4 L 733.4,312.2 L 717.7,316.5 L 707.6,317.0 L 696.4,320.6 L 686.1,326.2 L 675.5,327.8 L 642.3,341.7 L 608.4,350.6 L 572.9,365.0 L 536.7,374.0 L 499.1,384.9 L 490.9,385.9 L 481.5,385.5 L 460.0,396.1 L 449.4,394.6 L 438.6,396.5 L 426.1,394.2 L 417.6,389.8 L 424.1,401.0 L 426.0,411.4 L 422.8,415.9 L 416.8,421.2 L 395.2,420.2 L 386.7,416.5 L 376.6,411.0 L 372.0,402.1 L 361.2,395.7 L 354.8,404.5 L 354.8,411.1 L 346.8,420.1 L 337.4,404.7 L 320.4,410.4 L 312.9,426.7 L 316.7,431.3 L 321.9,443.8 L 313.5,450.3 L 307.3,448.5 L 294.4,466.8 L 278.7,473.5 L 262.6,492.2 L 243.5,506.4 L 238.3,515.9 L 206.3,537.7 L 194.1,537.0 L 185.2,537.7 L 171.7,546.8 L 169.6,565.1 L 163.7,562.7 L 157.6,563.3 L 154.5,569.0 L 150.0,570.0 L 138.2,564.6 L 124.4,567.5 L 113.5,563.4 L 99.6,536.5 L 92.3,527.1 L 79.3,524.1 L 75.9,529.8 L 70.8,535.3 L 58.3,524.3 L 48.7,483.1 L 48.7,473.2 L 62.0,438.6 L 95.0,407.5 L 84.5,406.5 L 55.3,428.0 L 58.3,422.8 L 63.3,417.4 L 73.1,408.6 L 88.0,400.3 L 107.9,395.5 L 121.5,394.8 L 130.9,390.2 L 144.6,382.2 L 147.1,377.9 L 135.0,382.8 L 114.9,387.7 L 120.1,381.3 L 125.1,377.9 L 232.5,322.1 L 254.1,312.9 L 297.2,301.2 L 303.2,293.5 L 297.3,288.6 L 314.0,293.0 L 312.7,299.3 L 310.0,304.0 L 309.1,311.9 L 310.7,319.4 L 327.7,323.1 L 341.9,337.2 L 335.1,318.1 L 347.9,307.2 L 397.0,292.7 L 438.1,291.2 L 451.2,284.4 L 416.1,279.9 L 374.5,282.3 L 348.7,277.3 L 313.2,280.6 L 275.6,277.4 L 264.1,281.6 L 254.8,290.6 L 242.6,286.6 L 236.7,286.0 L 231.1,282.8 L 243.3,267.3 L 281.4,244.1 L 304.6,223.9 L 311.1,219.7 L 316.3,211.6 Z M 773.6,194.7 L 778.5,195.9 L 797.7,188.4 L 807.8,188.7 L 807.4,194.1 L 790.9,200.0 L 783.3,204.4 L 792.8,208.5 L 792.7,211.2 L 781.2,217.9 L 775.5,225.1 L 780.2,232.0 L 798.5,225.2 L 806.1,225.1 L 816.3,226.7 L 826.0,224.6 L 831.5,221.2 L 863.8,194.4 L 865.5,191.0 L 830.7,196.5 L 826.6,192.9 L 849.4,176.7 L 847.7,168.1 L 859.2,154.6 L 869.7,146.6 L 877.5,142.1 L 888.7,138.0 L 896.4,144.4 L 898.9,155.9 L 917.9,154.3 L 936.6,156.6 L 950.3,161.5 L 952.5,164.3 L 952.7,168.7 L 948.1,176.6 L 940.5,183.2 L 955.6,191.5 L 953.6,195.2 L 928.9,204.6 L 914.8,214.2 L 901.9,225.9 L 876.1,239.6 L 835.2,249.4 L 822.3,249.4 L 806.9,246.4 L 791.7,247.1 L 776.7,250.7 L 762.1,250.3 L 755.0,252.3 L 748.2,252.1 L 742.5,248.2 L 730.4,237.3 L 724.5,230.0 L 718.1,195.2 L 720.1,176.9 L 730.4,159.8 L 745.6,148.4 L 754.4,139.4 L 791.1,85.6 L 798.3,73.3 L 807.1,62.9 L 822.9,52.6 L 843.3,35.2 L 849.7,31.7 L 861.4,30.0 L 873.0,31.0 L 869.7,37.2 L 870.5,43.4 L 883.8,67.4 L 883.7,72.2 L 876.4,91.3 L 862.4,122.2 L 858.8,139.2 L 860.7,144.4 L 855.0,153.0 L 848.9,159.5 L 825.0,171.8 L 812.8,174.7 L 801.1,179.3 L 773.6,194.7 Z M 794.1,265.0 L 788.2,266.3 L 786.8,264.1 L 777.8,257.7 L 777.0,254.5 L 784.9,251.5 L 801.1,253.1 L 795.3,261.1 L 794.1,265.0 Z M 37.2,450.3 L 30.0,455.7 L 31.7,450.4 L 40.5,436.9 L 46.2,434.8 L 37.2,450.3 Z M 961.4,504.8 L 942.2,510.3 L 925.7,509.9 L 914.8,504.9 L 914.4,502.7 L 940.2,504.8 L 950.2,503.6 L 970.0,495.0 L 961.4,504.8 Z" />
            </svg>

            {/* Glow effects */}
            <div
              className="absolute -top-16 -right-16 w-[360px] h-[360px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(9,164,122,0.2) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-[280px] h-[280px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(63,214,145,0.14) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-mint to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-pill mb-6">
                <MapPin className="w-3 h-3" />
                Halifax, Nova Scotia
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-[-0.03em] mb-5 max-w-3xl">
                We're from here.
                <br />
                <span className="text-primary">We clean for here.</span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl">
                GreenPump Care is headquartered at 3600 Kempt Road. Our
                technicians live in the neighbourhoods they service. From North
                End Halifax to Dartmouth&apos;s harbour, Bedford to Timberlea,
                Fall River to the Eastern Shore. Twenty communities call us for
                the same deep clean, and we drive to every one of them
                ourselves.
              </p>

              <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                {SERVICE_AREAS.slice(0, 12).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/service-areas/${a.slug}`}
                    className="inline-flex items-center bg-white/5 border border-white/10 text-white/80 hover:bg-primary hover:border-primary hover:text-white text-sm font-medium px-3.5 py-1.5 rounded-pill transition-colors"
                  >
                    {a.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/service-areas"
                className="mt-[50px] inline-flex items-center gap-1.5 text-primary font-semibold text-sm px-3.5 py-1.5 hover:gap-2 transition-all"
              >
                See all service areas
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Credentials row */}
      <AnimatedSection className="section bg-bg-light">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Accredited & insured
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text tracking-[-0.025em] leading-[1.1]">
              Credentials that back the work.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-[18px] border border-gray-100 p-6 text-center">
              <Shield
                className="w-9 h-9 text-primary mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="font-heading font-bold text-2xl text-text">
                Guaranteed
              </p>
              <p className="text-gray-500 text-xs mt-1">100% Satisfaction</p>
            </div>
            <div className="bg-white rounded-[18px] border border-gray-100 p-6 text-center">
              <Star
                className="w-9 h-9 text-star mx-auto mb-3"
                fill="#FBBF24"
                strokeWidth={1.5}
              />
              <p className="font-heading font-bold text-2xl text-text">
                {COMPANY.googleRating.toFixed(1)} / 5.0
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {COMPANY.googleReviewCount} Google reviews
              </p>
            </div>
            <div className="bg-white rounded-[18px] border border-gray-100 p-6 text-center">
              <Award
                className="w-9 h-9 text-primary mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="font-heading font-bold text-2xl text-text">
                Licensed
              </p>
              <p className="text-gray-500 text-xs mt-1">
                &amp; fully insured
              </p>
            </div>
            <div className="bg-white rounded-[18px] border border-gray-100 p-6 text-center">
              <Leaf
                className="w-9 h-9 text-leaf mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="font-heading font-bold text-2xl text-text">
                Eco-certified
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Non-toxic products only
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 font-semibold hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              {COMPANY.phone}
            </a>
            <span className="text-gray-300">·</span>
            <span>{COMPANY.hours.weekdays}</span>
            <span className="text-gray-300">·</span>
            <span>{COMPANY.hours.saturday}</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Documentation — downloadable PDFs */}
      <AnimatedSection className="section">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Documentation
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05]">
              Guides you can{" "}
              <span className="text-primary">download.</span>
            </h2>
            <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto">
              Free PDF resources for our clients. No email required.
            </p>
          </div>

          {/* Guides */}
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 text-center mb-6">
              Guides
            </p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GUIDES.map((doc) => (
                <DocCard key={doc.file} doc={doc} />
              ))}
            </StaggerContainer>
          </div>

          {/* Brochures */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 text-center mb-6">
              Brochures
            </p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BROCHURES.map((doc) => (
                <DocCard key={doc.file} doc={doc} compact />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      <BookingCTA />
    </>
  );
}

interface DocumentEntry {
  title: string;
  description: string;
  file: string;
  size: string;
}

function DocCard({ doc, compact = false }: { doc: DocumentEntry; compact?: boolean }) {
  return (
    <StaggerItem>
      <a
        href={doc.file}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full bg-white border border-gray-100 rounded-[20px] p-6 hover:border-primary/30 hover:shadow-card transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-heading font-semibold text-text mb-1.5 ${compact ? "text-base" : "text-xl"}`}>
              {doc.title}
            </h3>
            <p className={`text-gray-600 leading-relaxed mb-4 ${compact ? "text-sm" : "text-[15px]"}`}>
              {doc.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                PDF · {doc.size}
              </span>
              <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                <Download className="w-4 h-4" />
                Download
              </span>
            </div>
          </div>
        </div>
      </a>
    </StaggerItem>
  );
}

const GUIDES: DocumentEntry[] = [
  {
    title: "Heat Pump Maintenance Guide",
    description:
      "How your heat pump works, what goes wrong without regular cleaning, our professional process, and the recommended service schedule by system type.",
    file: "/documents/greenpump-maintenance-guide.pdf",
    size: "12 MB",
  },
  {
    title: "Heat Pump Repairs Guide",
    description:
      "Common heat pump problems, our diagnostic and repair process, transparent pricing, and guidance on when to repair vs. replace your system.",
    file: "/documents/greenpump-repairs-guide.pdf",
    size: "14 MB",
  },
  {
    title: "Care Plans Guide",
    description:
      "What's included in each Care Plan tier, how billing works, and why members get priority booking, service discounts, and warranty support.",
    file: "/documents/greenpump-care-plans-guide.pdf",
    size: "12 MB",
  },
  {
    title: "HRV/ERV Guide",
    description:
      "How your ventilation system works, why cleaning matters for indoor air quality, and what a GreenPump Care HRV/ERV deep clean covers.",
    file: "/documents/greenpump-hrv-erv-guide.pdf",
    size: "11 MB",
  },
];

const BROCHURES: DocumentEntry[] = [
  {
    title: "Ductless Mini-Split",
    description: "Deep clean service overview, what's included, and pricing at a glance.",
    file: "/documents/greenpump-ductless-brochure.pdf",
    size: "11 MB",
  },
  {
    title: "Ducted System",
    description: "Full ducted system service summary with timeline and price.",
    file: "/documents/greenpump-ducted-brochure.pdf",
    size: "13 MB",
  },
  {
    title: "HRV/ERV Cleaning",
    description: "The only premium HRV/ERV service in Halifax. Core, filters, and ductwork.",
    file: "/documents/greenpump-hrv-erv-brochure.pdf",
    size: "11 MB",
  },
  {
    title: "Care Plans",
    description: "Monthly maintenance tiers, benefits, and discount summary.",
    file: "/documents/greenpump-care-plans-brochure.pdf",
    size: "13 MB",
  },
  {
    title: "Repairs",
    description: "Diagnostic pricing, labour rates, and what we repair at a glance.",
    file: "/documents/greenpump-repairs-brochure.pdf",
    size: "13 MB",
  },
  {
    title: "Bundle & Save",
    description: "Our combined service packages and savings on multi-service visits.",
    file: "/documents/greenpump-cross-promo-brochure.pdf",
    size: "13 MB",
  },
];
