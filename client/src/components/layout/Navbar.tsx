"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Phone, Menu, LogIn, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { openBookingModal, HCP_PORTAL_URL } from "@/lib/housecallpro";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (latest > 100 && diff > 5) setHidden(true);
    else if (diff < -5) setHidden(false);
    setScrolled(latest > 50);
    lastScrollY.current = latest;
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-[20px] border-b border-gray-100"
            : "bg-white/70 backdrop-blur-[12px]"
        )}
      >
        <div className="container relative flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="GreenPump Care. Home">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative h-12 w-[150px]"
            >
              <Image
                src="/logos/nav-logo.png"
                alt="GreenPump Care"
                fill
                priority
                sizes="150px"
                className="object-contain object-left"
              />
            </motion.div>
          </Link>

          {/* Desktop nav. Absolutely centered so it aligns with hero */}
          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]));

              if (link.children && link.children.length > 0) {
                const isOpen = openDropdown === link.label;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "relative flex items-center gap-1 font-body text-[14px] font-medium transition-colors py-1 tracking-wide",
                        isActive ? "text-primary" : "text-gray-600 hover:text-text"
                      )}
                      onFocus={() => setOpenDropdown(link.label)}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                        strokeWidth={2.25}
                      />
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 right-6 h-px bg-primary transition-transform duration-300 origin-center",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                        >
                          <div className="min-w-[180px] bg-white rounded-card shadow-elevated border border-gray-100 py-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-primary hover:bg-stripe transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-body text-[14px] font-medium transition-colors py-1 tracking-wide",
                    isActive ? "text-primary" : "text-gray-600 hover:text-text"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px bg-primary transition-transform duration-300 origin-center",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={HCP_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-[14px] font-medium tracking-wide"
            >
              <LogIn className="w-3.5 h-3.5" strokeWidth={2} />
              Client login
            </a>
            <Button onClick={openBookingModal} size="sm" className="!px-5 !py-2 !text-[13px]">
              Book now
            </Button>
          </div>

          {/* Mobile. Phone icon + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={COMPANY.phoneHref}
              aria-label="Call us"
              className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-stripe transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center w-10 h-10 rounded-full text-text hover:bg-stripe transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-[64px]" />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
