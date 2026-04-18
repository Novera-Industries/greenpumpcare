"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
