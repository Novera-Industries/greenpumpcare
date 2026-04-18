"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className, delay = 0, id }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay }}
        className={cn(className)}
      >
        {children}
      </motion.section>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";
