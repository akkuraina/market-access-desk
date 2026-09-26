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

  // SVG Gauge Arc Geometry
  const size = 210;
  const strokeWidth = 4.5;
  const center = size / 2;
  const radius = center - strokeWidth - 16;
  const circumference = 2 * Math.PI * radius;
  const sweepAngle = 270;
  const arcLength = (sweepAngle / 360) * circumference;

  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] px-6 text-center select-none"
      role="status"
      aria-label="Market Access Desk Loading"
    >
      <div className="flex flex-col items-center max-w-xl mx-auto -translate-y-2">
        {/* Abstract Loading Arc Instrument */}
        <div
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
                <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#FF4D1C" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Subtle Inner Concentric Guide Ring */}
            <circle
              cx={center}
              cy={center}
              r={radius - 12}
              fill="none"
              stroke="#0A0A0A"
              strokeOpacity="0.04"
              strokeWidth="1"
              strokeDasharray="3 4"
            />

            {/* Subtle Crosshair Ticks */}
            <line
              x1={center - radius + 6}
              y1={center}
              x2={center - radius + 14}
              y2={center}
              stroke="#0A0A0A"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            <line
              x1={center + radius - 14}
              y1={center}
              x2={center + radius - 6}
              y2={center}
              stroke="#0A0A0A"
              strokeOpacity="0.08"
              strokeWidth="1"
            />

            {/* Outer Hairline Background Track Arc */}
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

            {/* Smooth Animated Arc Draw-in */}
            {!shouldReduceMotion ? (
              <motion.circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#FF4D1C"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(135 ${center} ${center})`}
                initial={{ strokeDashoffset: arcLength }}
                animate={{
                  strokeDashoffset: [arcLength, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                filter="url(#loaderOrangeGlow)"
              />
            ) : (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#FF4D1C"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                transform={`rotate(135 ${center} ${center})`}
              />
            )}
          </svg>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08]"
        >
          Market Access Desk
        </motion.h1>

        {/* Quiet, Refined Attribution Signature */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 font-mono-data text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#706E6B]/80 font-normal"
        >
          <span>A</span>
          <TradePeWordmark asLink={false} className="text-[11px] sm:text-xs tracking-normal" />
          <span>initiative</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
