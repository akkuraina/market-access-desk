"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

interface InitialLoaderProps {
  onComplete: () => void;
  duration?: number;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({
  onComplete,
  duration = 1450,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration, shouldReduceMotion]);

  // Geometry for the instrument arc
  const size = 200;
  const strokeWidth = 4.5;
  const center = size / 2;
  const radius = center - strokeWidth - 14;
  const circumference = 2 * Math.PI * radius;
  const sweepAngle = 270;
  const arcLength = (sweepAngle / 360) * circumference;

  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] px-6 text-center select-none overflow-hidden"
      role="status"
      aria-label="Market Access Desk Loading"
    >
      <div className="relative flex flex-col items-center max-w-xl mx-auto -translate-y-2">
        {/* Layer 1: Radial Speed Trails / Motion Shockwave Rings during zoom */}
        {!shouldReduceMotion && (
          <>
            {/* Rapid Fading Trail Echo 1 */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0.12, opacity: 0.55 }}
              animate={{ scale: 1.35, opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none rounded-full border border-[#FF4D1C]/40"
              style={{
                width: size,
                height: size,
                top: 0,
                left: 0,
                right: 0,
                margin: "0 auto",
              }}
            />

            {/* Rapid Fading Trail Echo 2 */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0.18, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              className="absolute pointer-events-none rounded-full border border-[#FF4D1C]/25"
              style={{
                width: size,
                height: size,
                top: 0,
                left: 0,
                right: 0,
                margin: "0 auto",
              }}
            />

            {/* Subtle Amber Warp Burst */}
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0.1, opacity: 0.35, filter: "blur(8px)" }}
              animate={{ scale: [0.1, 1.2, 1.4], opacity: [0.35, 0.15, 0] }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none rounded-full bg-[#FF4D1C]/20"
              style={{
                width: size * 0.85,
                height: size * 0.85,
                top: size * 0.075,
                left: 0,
                right: 0,
                margin: "0 auto",
              }}
            />
          </>
        )}

        {/* Layer 2: Main Zoom/Expand Arc Motif */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { scale: 0.14, opacity: 0, rotate: -25 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  scale: [0.14, 1.05, 1],
                  opacity: [0, 1, 1],
                  rotate: [-25, 0, 0],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.9,
            times: shouldReduceMotion ? undefined : [0, 0.78, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center mb-5 sm:mb-6"
          style={{ width: size, height: size }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="loaderOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="1" stdDeviation="5" floodColor="#FF4D1C" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Inner Concentric Calibration Guide Ring */}
            <circle
              cx={center}
              cy={center}
              r={radius - 12}
              fill="none"
              stroke="#0A0A0A"
              strokeOpacity="0.05"
              strokeWidth="1"
              strokeDasharray="3 4"
            />

            {/* Precision Crosshair Ticks */}
            <line
              x1={center - radius + 5}
              y1={center}
              x2={center - radius + 13}
              y2={center}
              stroke="#0A0A0A"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <line
              x1={center + radius - 13}
              y1={center}
              x2={center + radius - 5}
              y2={center}
              stroke="#0A0A0A"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <line
              x1={center}
              y1={center - radius + 5}
              x2={center}
              y2={center - radius + 13}
              stroke="#0A0A0A"
              strokeOpacity="0.1"
              strokeWidth="1"
            />

            {/* Outer Background Track Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#0A0A0A"
              strokeOpacity="0.07"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              transform={`rotate(135 ${center} ${center})`}
            />

            {/* Dynamic Primary Orange Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#FF4D1C"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              transform={`rotate(135 ${center} ${center})`}
              filter="url(#loaderOrangeGlow)"
            />

            {/* Central Focal Indicator */}
            <circle
              cx={center}
              cy={center}
              r={3}
              fill="#0A0A0A"
              fillOpacity="0.25"
            />
          </svg>
        </motion.div>

        {/* Layer 3: Staggered Headline Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.5,
            delay: shouldReduceMotion ? 0.1 : 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08]"
        >
          Market Access Desk
        </motion.h1>

        {/* Layer 4: Staggered Signature Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.45,
            delay: shouldReduceMotion ? 0.15 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
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
