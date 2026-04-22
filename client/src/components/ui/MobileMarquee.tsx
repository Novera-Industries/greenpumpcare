"use client";

import { ReactNode, Children, useRef, useEffect } from "react";

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

  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let halfWidth = inner.scrollWidth / 2;
    if (reverse) track.scrollLeft = halfWidth;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (
        !pausedRef.current &&
        halfWidth > 0 &&
        track.offsetParent !== null
      ) {
        const dir = reverse ? -1 : 1;
        const pxPerSec = halfWidth / speed;
        let next = track.scrollLeft + pxPerSec * dt * dir;
        if (next >= halfWidth) next -= halfWidth;
        if (next < 0) next += halfWidth;
        track.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      if (halfWidth <= 0) return;
      if (track.scrollLeft >= halfWidth) track.scrollLeft -= halfWidth;
      else if (track.scrollLeft < 0) track.scrollLeft += halfWidth;
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      halfWidth = inner.scrollWidth / 2;
    });
    ro.observe(inner);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [speed, reverse]);

  const pauseScroll = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, 2500);
  };

  return (
    <div
      ref={trackRef}
      onTouchStart={pauseScroll}
      onTouchEnd={scheduleResume}
      onTouchCancel={scheduleResume}
      className={`mobile-marquee ${hideClass} relative overflow-x-auto overflow-y-hidden -mx-4 ${className}`}
    >
      <div ref={innerRef} className="flex w-max gap-4 py-2">
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
