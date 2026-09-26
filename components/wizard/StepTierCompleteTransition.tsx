"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface StepTierCompleteTransitionProps {
  headline: string;
  subtext: string;
  onComplete: () => void;
  badge?: string;
  duration?: number;
}

export const StepTierCompleteTransition: React.FC<StepTierCompleteTransitionProps> = ({
  headline,
  subtext,
  onComplete,
  badge = "MILESTONE ACHIEVED",
  duration = 1800,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(onComplete, 200);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration, shouldReduceMotion]);

  return (
    <div
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onComplete();
      }}
      className="fixed inset-0 z-40 bg-[#FAF7F0] flex flex-col items-center justify-center p-6 sm:p-12 text-center select-none cursor-pointer focus:outline-none"
      title="Click anywhere to continue"
    >
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02, y: shouldReduceMotion ? 0 : -10 }}
        transition={{
          duration: shouldReduceMotion ? 0.05 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Animated Check Motif */}
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-black/5 border border-black/10 text-[#FF4D1C] mb-8">
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
          <span className="font-mono-data text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]">
            {badge}
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08] mb-4">
          {headline}
        </h1>

        {/* Distinct Smaller Subtext */}
        <p className="font-body text-base sm:text-xl text-[#706E6B] font-light leading-relaxed mb-8 max-w-lg">
          {subtext}
        </p>

        {/* Tap to skip */}
        <div className="flex items-center gap-2 font-mono-data text-xs text-[#706E6B] opacity-60 hover:opacity-100 transition-opacity">
          <span>Tap anywhere to advance</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </motion.div>
    </div>
  );
};
