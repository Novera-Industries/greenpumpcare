"use client";

import { ReactNode, Children } from "react";

interface MobileMarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
  itemClassName?: string;
  hideAt?: "md" | "lg";
}

export function MobileMarquee({
  children,
  reverse = false,
  speed = 40,
  className = "",
  itemClassName = "w-[280px] shrink-0",
  hideAt = "md",
}: MobileMarqueeProps) {
  const items = Children.toArray(children);
  const hideClass = hideAt === "lg" ? "lg:hidden" : "md:hidden";

  return (
    <div
      className={`mobile-marquee ${hideClass} relative overflow-hidden -mx-4 ${className}`}
    >
      <div
        className={`flex w-max gap-4 py-2 ${
          reverse ? "mobile-marquee-reverse" : "mobile-marquee-forward"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex gap-4 pl-4 pr-0 shrink-0">
          {items.map((child, i) => (
            <div key={`a-${i}`} className={itemClassName}>
              {child}
            </div>
          ))}
        </div>
        <div className="flex gap-4 pl-4 pr-0 shrink-0" aria-hidden="true">
          {items.map((child, i) => (
            <div key={`b-${i}`} className={itemClassName}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
