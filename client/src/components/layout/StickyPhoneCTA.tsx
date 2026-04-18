"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { slideUp } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";

export function StickyPhoneCTA() {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center gap-3 w-full bg-primary text-white py-4 font-semibold text-base shadow-elevated"
      >
        <Phone className="w-5 h-5" />
        Call {COMPANY.phone}
      </a>
    </motion.div>
  );
}
