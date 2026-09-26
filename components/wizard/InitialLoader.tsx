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
  const size = 180;
  const strokeWidth = 6;
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
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] px-6 text-center select-none"
      role="status"
      aria-label="Market Access Desk Loading"
    >
      <div className="flex flex-col items-center max-w-lg mx-auto">
        {/* Arc Motif */}
        <div className="relative flex items-center justify-center mb-8" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="loaderGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#C9A227" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Background Track Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#0A0A0A"
              strokeOpacity="0.08"
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
                strokeWidth={strokeWidth + 1}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(135 ${center} ${center})`}
                initial={{ strokeDashoffset: arcLength }}
                animate={{
                  strokeDashoffset: [arcLength, 0],
                }}
                transition={{
                  duration: 1.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                filter="url(#loaderGoldGlow)"
              />
            ) : (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#FF4D1C"
                strokeWidth={strokeWidth + 1}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                transform={`rotate(135 ${center} ${center})`}
              />
            )}
          </svg>

          {/* Center Monogram / Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-mono-data text-[11px] font-semibold tracking-widest text-[#0A0A0A]/60 uppercase">
              MAD
            </span>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-tight"
        >
          Market Access Desk
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 flex items-center justify-center gap-1.5 font-mono-data text-xs sm:text-sm tracking-wide text-[#706E6B]"
        >
          <span>A</span>
          <TradePeWordmark asLink={false} className="text-xs sm:text-sm" />
          <span>initiative</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
