"use client";

import { motion } from "motion/react";
import { staggerItem, cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function StaggerItem({ children, className, hover = false }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      {...(hover ? cardHover : {})}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
