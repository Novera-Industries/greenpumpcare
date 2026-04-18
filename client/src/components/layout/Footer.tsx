import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Leaf, Award } from "lucide-react";
import { COMPANY } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Social icons                                                       */
/* ------------------------------------------------------------------ */

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/greenpumpcare",
    svg: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/greenpumpcare",
    svg: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Google",
    href: "https://www.google.com/search?q=greenpump+care+halifax",
    svg: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@greenpumpcare",
    svg: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
      </svg>
    ),
  },
];

const trustBadges = [
  { icon: Shield, label: "BBB A-rated" },
  { icon: Award, label: "Licensed & Insured" },
  { icon: Leaf, label: "Eco-friendly" },
];

const hoursSchedule = [
  { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM", closed: false },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", hours: "Closed", closed: true },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative bg-black text-white/70 overflow-hidden">

      {/* ============== MAIN ============== */}
      <div className="relative container pb-10" style={{ paddingTop: "15px" }}>
        {/* Main content grid. Max-w-6xl matches CTA width so edges align */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr] gap-12 lg:gap-20">
          {/* ===== CONTACT ===== */}
          <div className="lg:text-left text-center">
            <p className="text-white/35 text-[11px] font-semibold uppercase tracking-[0.22em] mb-7">
              Contact
            </p>

            <div className="space-y-6">
              <a href={COMPANY.phoneHref} className="group block">
                <p className="text-white/40 text-[12px] uppercase tracking-wider mb-1.5">
                  Call
                </p>
                <p className="text-white text-[17px] font-medium group-hover:text-primary transition-colors">
                  {COMPANY.phone}
                </p>
              </a>

              <a href={COMPANY.emailHref} className="group block">
                <p className="text-white/40 text-[12px] uppercase tracking-wider mb-1.5">
                  Email
                </p>
                <p className="text-white text-[17px] font-medium group-hover:text-primary transition-colors break-all">
                  {COMPANY.email}
                </p>
              </a>

              <div>
                <p className="text-white/40 text-[12px] uppercase tracking-wider mb-1.5">
                  Address
                </p>
                <p className="text-white text-[17px] font-medium leading-relaxed">
                  3600 Kempt Rd #212
                  <br />
                  <span className="text-white">Halifax, NS B3K 4X8</span>
                </p>
              </div>
            </div>
          </div>

          {/* ===== HOURS ===== */}
          <div className="text-center">
            <p className="text-white/35 text-[11px] font-semibold uppercase tracking-[0.22em] mb-7">
              Hours of operation
            </p>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {hoursSchedule.map((row) => (
                <li
                  key={row.day}
                  className="flex items-center justify-between py-4"
                >
                  <span className="text-white/80 text-[15px] font-medium">
                    {row.day}
                  </span>
                  <span
                    className={
                      row.closed
                        ? "text-white/40 text-[15px] font-medium"
                        : "text-white text-[15px] font-semibold tabular-nums"
                    }
                  >
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-center gap-2 text-white/50 text-[13px]">
              <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
              Serving all of Nova Scotia
            </div>
          </div>

          {/* ===== TRUST & SOCIAL ===== */}
          <div className="lg:text-right text-center">
            <p className="text-white/35 text-[11px] font-semibold uppercase tracking-[0.22em] mb-7">
              Trust
            </p>

            <div className="space-y-3 mb-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center justify-center lg:justify-end gap-3"
                >
                  <span className="text-white/80 text-[15px] font-medium">
                    {badge.label}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <badge.icon
                      className="w-4 h-4 text-primary"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/35 text-[11px] font-semibold uppercase tracking-[0.22em] mb-3">
              Follow
            </p>
            <div className="flex items-center justify-center lg:justify-end gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-11 h-11 bg-white/[0.04] hover:bg-primary border border-white/10 hover:border-primary rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============== BOTTOM STRIP ============== */}
      <div className="relative">
        <div className="container pt-4 text-white/35 text-[13px]" style={{ paddingBottom: "15px" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr] gap-12 lg:gap-20">
            <div />
            <p className="text-center">
              © {new Date().getFullYear()} {COMPANY.legalName} All rights reserved.
            </p>
            <div />
          </div>
        </div>
      </div>
    </footer>
  );
}
