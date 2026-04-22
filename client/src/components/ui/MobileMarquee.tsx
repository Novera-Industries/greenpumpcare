"use client";

import {
  ReactNode,
  Children,
  useEffect,
  useRef,
  useState,
} from "react";

interface MobileMarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop in CSS-animation mode, or px/sec in touch mode. */
  speed?: number;
  className?: string;
  itemClassName?: string;
  hideAt?: "md" | "lg";
  /** Remove the edge fade mask (useful when cards contrast strongly with the page bg). */
  noFade?: boolean;
  /** Pause auto-scroll while the user is touching and let them swipe freely. */
  pauseOnTouch?: boolean;
}

export function MobileMarquee({
  children,
  reverse = false,
  speed = 40,
  className = "",
  itemClassName = "w-[280px] shrink-0",
  hideAt = "md",
  noFade = false,
  pauseOnTouch = false,
}: MobileMarqueeProps) {
  const items = Children.toArray(children);
  const hideClass = hideAt === "lg" ? "lg:hidden" : "md:hidden";
  const maskClass = noFade ? "" : "mobile-marquee-fade";

  if (pauseOnTouch) {
    // Touch-aware variant: native horizontal scroll + JS-driven auto advance.
    // User can touch to pause and swipe. Resumes a moment after lift-off.
    return (
      <TouchMarquee
        items={items}
        reverse={reverse}
        speed={speed}
        hideClass={hideClass}
        maskClass={maskClass}
        itemClassName={itemClassName}
        className={className}
      />
    );
  }

  return (
    <div
      className={`mobile-marquee ${maskClass} ${hideClass} relative overflow-hidden -mx-4 ${className}`}
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

function TouchMarquee({
  items,
  reverse,
  speed,
  hideClass,
  maskClass,
  itemClassName,
  className,
}: {
  items: ReactNode[];
  reverse: boolean;
  speed: number;
  hideClass: string;
  maskClass: string;
  itemClassName: string;
  className: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  // Keep pausedRef in sync so the RAF loop always reads the latest value.
  pausedRef.current = paused;

  // pixels per second — convert from the loop-seconds convention used elsewhere.
  // A 40s loop for a ~2000px track is ~50 px/s; keep that feel.
  const pxPerSecond = Math.max(20, Math.round(2000 / Math.max(speed, 1)));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Kick off near the middle so reverse direction has headroom on both sides.
    const halfWidth = () => el.scrollWidth / 2;
    if (reverse) {
      el.scrollLeft = halfWidth();
    } else {
      el.scrollLeft = 0;
    }

    let rafId = 0;
    let last = performance.now();
    // scrollLeft snaps to int — accumulate sub-pixel delta so slow speeds still move.
    let accumulator = el.scrollLeft;

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!el) return;
      if (!pausedRef.current) {
        const half = halfWidth();
        if (half > 0) {
          accumulator += pxPerSecond * dt * (reverse ? -1 : 1);
          // Wrap in the "middle" so the loop is seamless.
          if (accumulator >= half) accumulator -= half;
          if (accumulator < 0) accumulator += half;
          el.scrollLeft = accumulator;
        }
      } else {
        // User is driving — keep accumulator in sync with whatever they scrolled to.
        accumulator = el.scrollLeft;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [reverse, pxPerSecond]);

  function handleTouchStart() {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setPaused(true);
  }

  function handleTouchEnd() {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    // Resume after a short grace period so the user has time to read.
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, 2500);
  }

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`mobile-marquee ${maskClass} ${hideClass} relative overflow-x-auto overflow-y-hidden -mx-4 scrollbar-hidden touch-pan-x ${className}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="flex w-max gap-4 py-2">
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
