"use client";

import { MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { COMPANY } from "@/lib/constants";

export function MapPlaceholder() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    COMPANY.address.full
  )}`;

  return (
    <div className="relative bg-white rounded-card shadow-card overflow-hidden h-full flex flex-col min-h-[460px]">
      {/* Map surface */}
      <div className="relative flex-1 overflow-hidden">
        {/* Base teal-to-stripe gradient to mimic a Halifax aerial look */}
        <div className="absolute inset-0 bg-gradient-to-br from-stripe via-white to-mint/20" />

        {/* Faux "water" area */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 65% 70%, rgba(9,164,122,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Grid pattern (streets) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(40,37,29,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(40,37,29,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px, 32px 32px",
          }}
        />

        {/* Diagonal "main road" */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(35deg, transparent 48%, rgba(40,37,29,0.08) 48%, rgba(40,37,29,0.08) 52%, transparent 52%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(-55deg, transparent 49%, rgba(40,37,29,0.06) 49%, rgba(40,37,29,0.06) 51%, transparent 51%)",
          }}
        />

        {/* Center pin */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          {/* Pin pulse */}
          <div className="relative flex items-center justify-center">
            <span className="absolute w-16 h-16 rounded-full bg-primary/20 animate-ping" />
            <span className="absolute w-10 h-10 rounded-full bg-primary/30" />
            <div className="relative w-12 h-12 rounded-full bg-primary shadow-[0_8px_24px_rgba(9,164,122,0.4)] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" strokeWidth={2.5} fill="white" />
            </div>
          </div>

          {/* Pin label card */}
          <div className="mt-3 bg-white border border-gray-100 rounded-card shadow-card px-4 py-2.5 text-center whitespace-nowrap">
            <p className="font-heading text-sm font-bold text-text">
              GreenPump Care
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              3600 Kempt Rd #212, Halifax
            </p>
          </div>
        </motion.div>

        {/* Corner compass */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full w-10 h-10 shadow-card flex items-center justify-center">
          <Navigation className="w-4 h-4 text-primary" />
        </div>

        {/* Corner scale bar */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-pill px-3 py-1.5 shadow-card flex items-center gap-2">
          <div className="w-10 h-0.5 bg-text/60" />
          <span className="text-[10px] font-semibold text-text/70 uppercase tracking-wider">
            500 m
          </span>
        </div>
      </div>

      {/* Footer bar with address + directions link */}
      <div className="relative bg-white border-t border-gray-100 px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Our location
          </p>
          <p className="text-text font-medium text-sm">
            {COMPANY.address.street}, {COMPANY.address.city} {COMPANY.address.postal}
          </p>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
        >
          Directions
          <Navigation className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
