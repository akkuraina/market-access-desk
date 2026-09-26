"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

interface InitialLoaderProps {
  onComplete: () => void;
  duration?: number;
}

// Each letter's scattered starting position/rotation before assembly
const LETTER_CONFIGS = [
  // M — comes from upper-left
  { x: -220, y: -120, rotate: -18, delay: 0 },
  // A — comes from below center
  { x: 20, y: 200, rotate: 12, delay: 0.08 },
  // D — comes from upper-right
  { x: 200, y: -100, rotate: 20, delay: 0.04 },
];

const LETTERS = ["M", "A", "D"];

// Spring for the letter assembly — weighted, with overshoot
const LETTER_SPRING = {
  type: "spring" as const,
  stiffness: 160,
  damping: 18,
  mass: 1.1,
};

// Route-line SVG path: a stylised trade-corridor arc sweeping left to right
const ROUTE_PATH = "M 10,14 C 55,2 115,26 160,14 C 195,5 215,18 240,14";
const ROUTE_PATH_LENGTH = 240;

export const InitialLoader: React.FC<InitialLoaderProps> = ({
  onComplete,
  duration = 3200,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const exitDuration = shouldReduceMotion ? 400 : duration;
    const timer = setTimeout(onComplete, exitDuration);
    return () => clearTimeout(timer);
  }, [onComplete, duration, shouldReduceMotion]);

  // Reduced-motion: single static fade-in of the composed state
  if (shouldReduceMotion) {
    return (
      <motion.div
        key="initial-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] px-6 text-center select-none overflow-hidden"
        role="status"
        aria-label="Market Access Desk Loading"
      >
        <div className="flex flex-col items-center gap-5">
          <div
            className="font-display font-black leading-none tracking-[-0.04em] text-[#0A0A0A]"
            style={{ fontSize: "clamp(96px, 18vw, 144px)" }}
          >
            MA<span style={{ color: "#FF4D1C" }}>D</span>
          </div>
          <div className="w-48 h-[2px] bg-[#FF4D1C] rounded-full" />
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.08]">
            Market Access Desk
          </h1>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <span className="font-display text-sm sm:text-base text-[#706E6B] font-light tracking-wide">
              A
            </span>
            <TradePeWordmark asLink={false} className="text-sm sm:text-base" />
            <span className="font-display text-sm sm:text-base text-[#706E6B] font-light tracking-wide">
              initiative
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full kinetic animation
  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] px-6 text-center select-none overflow-hidden"
      role="status"
      aria-label="Market Access Desk Loading"
    >
      <div className="flex flex-col items-center" style={{ gap: 0 }}>

        {/* Phase 1 + 2: Scattered letters assemble into "MAD" */}
        <div
          className="flex items-end justify-center leading-none"
          aria-label="MAD"
          style={{ overflow: "visible", marginBottom: "4px" }}
        >
          {LETTERS.map((letter, i) => {
            const cfg = LETTER_CONFIGS[i];
            return (
              <motion.span
                key={letter}
                aria-hidden="true"
                className="font-display font-black leading-none tracking-[-0.03em] inline-block"
                style={{
                  fontSize: "clamp(88px, 16vw, 136px)",
                  color: letter === "D" ? "#FF4D1C" : "#0A0A0A",
                }}
                initial={{ x: cfg.x, y: cfg.y, rotate: cfg.rotate, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{
                  ...LETTER_SPRING,
                  delay: 0.1 + cfg.delay,
                  opacity: {
                    duration: 0.25,
                    delay: 0.1 + cfg.delay,
                    ease: "easeOut",
                  },
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>

        {/* Phase 3: Route-line SVG draws beneath the letters */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 250 28"
          width="250"
          height="28"
          style={{ overflow: "visible", display: "block", marginBottom: "24px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.55 }}
        >
          {/* Faint full-path track */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#0A0A0A"
            strokeOpacity="0.08"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Animated orange draw-on line */}
          <motion.path
            d={ROUTE_PATH}
            fill="none"
            stroke="#FF4D1C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={ROUTE_PATH_LENGTH}
            initial={{ strokeDashoffset: ROUTE_PATH_LENGTH }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Origin dot */}
          <motion.circle
            cx="10"
            cy="14"
            r="2.5"
            fill="#0A0A0A"
            fillOpacity={0.25}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.55 }}
            style={{ transformOrigin: "10px 14px" }}
          />

          {/* Destination dot */}
          <motion.circle
            cx="240"
            cy="14"
            r="3.5"
            fill="#FF4D1C"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.25 }}
            style={{ transformOrigin: "240px 14px" }}
          />
        </motion.svg>

        {/* Phase 4: Full headline settles in */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-[52px] text-[#0A0A0A] tracking-tight leading-[1.08]"
        >
          Market Access Desk
        </motion.h1>

        {/* Phase 5: Attribution line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 flex items-center justify-center gap-1.5"
        >
          <span className="font-display text-sm sm:text-base text-[#706E6B] font-light tracking-wide">
            A
          </span>
          <TradePeWordmark asLink={false} className="text-sm sm:text-base" />
          <span className="font-display text-sm sm:text-base text-[#706E6B] font-light tracking-wide">
            initiative
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
