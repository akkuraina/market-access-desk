"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface StepIntroCinematicProps {
  onComplete: () => void;
}

export const StepIntroCinematic: React.FC<StepIntroCinematicProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [screenIndex, setScreenIndex] = useState<0 | 1>(0);

  const advance = useCallback(() => {
    if (screenIndex === 0) {
      setScreenIndex(1);
    } else {
      onComplete();
    }
  }, [screenIndex, onComplete]);

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(advance, 300);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(advance, 2800);
    return () => clearTimeout(timer);
  }, [screenIndex, advance, shouldReduceMotion]);

  const screens = [
    {
      badge: "TRADEPE ONBOARDING",
      text: "Hi there, welcome to TradePe's Market Access Desk.",
    },
    {
      badge: "OUR PHILOSOPHY",
      text: "At TradePe, we believe our clients grow — and we grow with them.",
    },
  ];

  const current = screens[screenIndex];

  return (
    <div
      onClick={advance}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") advance();
      }}
      className="fixed inset-0 z-40 bg-[#FAF7F0] flex flex-col items-center justify-center p-6 sm:p-12 text-center select-none cursor-pointer focus:outline-none"
      title="Click anywhere to continue"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={screenIndex}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
          transition={{
            duration: shouldReduceMotion ? 0.05 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Subtle Monogram / Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
            <span className="font-mono-data text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]">
              {current.badge}
            </span>
          </div>

          {/* Cinematic Large Statement */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0A0A0A] tracking-tight leading-[1.08] mb-8">
            {current.text}
          </h1>

          {/* Tap Anywhere Cue */}
          <div className="flex items-center gap-2 font-mono-data text-xs text-[#706E6B] opacity-60 hover:opacity-100 transition-opacity">
            <span>Tap anywhere to skip</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-10 flex items-center gap-2">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            screenIndex === 0 ? "w-8 bg-[#FF4D1C]" : "w-2 bg-black/20"
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            screenIndex === 1 ? "w-8 bg-[#FF4D1C]" : "w-2 bg-black/20"
          }`}
        />
      </div>
    </div>
  );
};
