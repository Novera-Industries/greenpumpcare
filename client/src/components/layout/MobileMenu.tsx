"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, Phone } from "lucide-react";
import { slideInRight } from "@/lib/animations";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { openBookingModal } from "@/lib/housecallpro";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-white shadow-elevated flex flex-col"
          >
            {/* Close */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-heading text-lg font-bold text-primary">Menu</span>
              <button onClick={onClose} className="p-2 -mr-2" aria-label="Close menu">
                <X className="w-5 h-5 text-text" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block px-6 py-3 text-text font-medium hover:text-primary hover:bg-stripe transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="p-6 space-y-3 border-t border-gray-100">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center justify-center gap-2 w-full py-3 text-primary font-semibold"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
              <Button
                onClick={() => {
                  onClose();
                  openBookingModal();
                }}
                className="w-full"
              >
                Book now
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
