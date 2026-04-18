import type { Variants, Transition } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Easing curves                                                      */
/* ------------------------------------------------------------------ */

export const smooth = [0.25, 0.46, 0.45, 0.94] as const;
export const spring = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Transitions                                                        */
/* ------------------------------------------------------------------ */

export const springConfig: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 20,
};

/* ------------------------------------------------------------------ */
/*  Scroll-reveal variants                                             */
/* ------------------------------------------------------------------ */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: spring },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smooth },
  },
};

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

/* ------------------------------------------------------------------ */
/*  Line & number reveals                                              */
/* ------------------------------------------------------------------ */

export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: smooth },
  },
};

export const numberReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Stagger                                                            */
/* ------------------------------------------------------------------ */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smooth },
  },
};

/* ------------------------------------------------------------------ */
/*  Card hover                                                         */
/* ------------------------------------------------------------------ */

export const cardHover = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(9,164,122,0.15)",
  },
  transition: { duration: 0.4, ease: smooth },
};

export const cardHoverSubtle = {
  whileHover: { y: -4, boxShadow: "0 8px 24px rgba(9,164,122,0.12)" },
  transition: springConfig,
};

/* ------------------------------------------------------------------ */
/*  Button hover / tap                                                 */
/* ------------------------------------------------------------------ */

export const buttonHover = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: springSnappy,
};

/* ------------------------------------------------------------------ */
/*  Page transition                                                    */
/* ------------------------------------------------------------------ */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/* ------------------------------------------------------------------ */
/*  Slide up (sticky phone CTA)                                        */
/* ------------------------------------------------------------------ */

export const slideUp: Variants = {
  hidden: { y: 100 },
  visible: {
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

/* ------------------------------------------------------------------ */
/*  Floating drift (for hero notification cards)                       */
/* ------------------------------------------------------------------ */

export const floatDrift = (
  yRange: [number, number] = [-8, 8],
  duration = 4
) => ({
  y: yRange,
  transition: {
    y: {
      duration,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
});
