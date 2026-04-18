"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, AlertTriangle, Camera } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [userInteracted, setUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const isDragging = useRef(false);

  // Auto-slide side to side using a sine wave. Stops once user interacts
  useEffect(() => {
    if (userInteracted) return;

    let rafId: number;
    const start = performance.now();
    const duration = 7000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = (elapsed % duration) / duration;
      const eased = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
      const pos = 15 + eased * 70;
      setSliderPos(pos);
      setProgress(t * 100);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [userInteracted]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    setUserInteracted(true);
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  // Which side shows more. Dirty is revealed as slider moves right
  const isMostlyBefore = sliderPos > 50;

  return (
    <AnimatedSection className="section relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-gradient-to-br from-stripe via-transparent to-mint/10 blur-3xl opacity-60" />
      </div>

      <div className="container relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-pill px-3 py-1.5 mb-5 shadow-sm"
          >
            <Camera className="w-3 h-3 text-primary" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text">
              Real customer · real results
            </span>
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text mb-5 tracking-[-0.035em] leading-[1.02]">
            Dirty.
            <br />
            <span className="text-primary">Then spotless.</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto tracking-tight">
            Drag to reveal the difference.
          </p>
        </div>

        {/* Slider + floating callouts wrapper */}
        <div className="relative max-w-5xl mx-auto">
          {/* ============ FLOATING CALLOUTS ============ */}

          {/* Before callout. Left top */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              opacity: isMostlyBefore ? 1 : 0.4,
              scale: isMostlyBefore ? 1 : 0.95,
            }}
            className="hidden lg:block absolute -left-[52px] top-[412px] z-30 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-4 w-[300px] text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-600" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Before
                </span>
              </div>
              <p className="font-heading text-text text-[15px] font-semibold leading-snug mb-1">
                Dust, mould & grime
              </p>
              <p className="text-gray-500 text-[12px] leading-relaxed">
                Years of buildup on coils and filters.
                <br />
                Reduced airflow and lowered air quality.
              </p>
            </div>
          </motion.div>

          {/* After callout. Right top */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              opacity: !isMostlyBefore ? 1 : 0.4,
              scale: !isMostlyBefore ? 1 : 0.95,
            }}
            className="hidden lg:block absolute -right-[52px] top-[412px] z-30 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-4 w-[300px] text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  After
                </span>
              </div>
              <p className="font-heading text-text text-[15px] font-semibold leading-snug mb-1">
                Pristine & restored
              </p>
              <p className="text-gray-500 text-[12px] leading-relaxed">
                Deep cleaned, antimicrobial-treated.
                <br />
                Warranty-compliant and breathing easy.
              </p>
            </div>
          </motion.div>

          {/* ============ MAIN SLIDER FRAME ============ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto lg:mx-16"
          >
            {/* Gradient border frame */}
            <div className="relative rounded-3xl p-[3px] bg-gradient-to-br from-primary via-mint to-leaf shadow-premium">
              <div
                ref={containerRef}
                className="relative aspect-[16/10] rounded-[22px] overflow-hidden cursor-col-resize select-none bg-gray-900"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
              >
                {/* "After". Full background (clean) */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/before-after/clean.png"
                    alt="Spotless heat pump filter after GreenPump Care deep clean"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-cover"
                    draggable={false}
                  />
                  {/* After side subtle tint */}
                  <div className="absolute inset-0 bg-gradient-to-l from-primary/10 via-transparent to-transparent" />
                </div>

                {/* "Before". Clipped left portion (dirty) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src="/images/before-after/dirty.png"
                    alt="Dirty heat pump filter before cleaning"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Before side subtle tint */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-900/15 via-transparent to-transparent" />
                </div>

                {/* Corner label pills */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-5 left-5 z-20"
                >
                  <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-white px-3.5 py-1.5 rounded-pill border border-white/10">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-5 right-5 z-20"
                >
                  <div className="inline-flex items-center gap-2 bg-primary text-white px-3.5 py-1.5 rounded-pill shadow-card">
                    <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      After
                    </span>
                  </div>
                </motion.div>

                {/* ============ SLIDER LINE + HANDLE ============ */}
                <div
                  className="absolute top-0 bottom-0 z-10"
                  style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
                >
                  {/* Line */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.6)]" />

                  {/* Handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/* Pulsing ring */}
                    {!userInteracted && (
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                    {/* Handle circle */}
                    <div className="relative w-14 h-14 bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center border-[3px] border-primary/90">
                      <ChevronLeft className="w-4 h-4 text-primary -mr-1" strokeWidth={3} />
                      <ChevronRight className="w-4 h-4 text-primary -ml-1" strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {/* Auto-play progress bar at bottom */}
                {!userInteracted && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-mint origin-left"
                      style={{
                        transform: `scaleX(${progress < 50 ? progress / 50 : (100 - progress) / 50})`,
                        transformOrigin: progress < 50 ? "left" : "right",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Shadow reflection below */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-primary/10 blur-2xl rounded-full pointer-events-none" />
          </motion.div>

          {/* ============ BOTTOM STATEMENT ============ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-text tracking-[-0.035em] leading-[1.05] max-w-3xl mx-auto">
              That&apos;s what you&apos;re{" "}
              <span className="text-primary">breathing in.</span>
            </p>
          </motion.div>

          <AnimatePresence>
            {!userInteracted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-400 text-[12px] mt-6 flex items-center justify-center gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Auto-playing. Drag to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
}
