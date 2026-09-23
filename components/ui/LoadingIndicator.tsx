"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

interface LoadingIndicatorProps {
  statusText?: string;
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  statusText = "INITIALIZING CLEARING RAILS",
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // SVG Gauge Arc dimensions
  const size = 150;
  const strokeWidth = 5;
  const center = size / 2;
  const radius = center - strokeWidth - 10;
  const circumference = 2 * Math.PI * radius;
  // 270 degree dial arc
  const sweepAngle = 270;
  const arcLength = (sweepAngle / 360) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Gauge Arc + MAD Center Wordmark */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transform"
          aria-hidden="true"
        >
          {/* Background Dial Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E8E4DA"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(135 ${center} ${center})`}
          />

          {/* Animated Instrument Sweep Arc */}
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
                strokeDashoffset: [arcLength, 0, arcLength],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
              strokeDashoffset={arcLength * 0.3}
              strokeLinecap="round"
              transform={`rotate(135 ${center} ${center})`}
            />
          )}
        </svg>

        {/* Center MAD Dominant Wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A0A0A] leading-none">
            MAD
          </span>
        </div>
      </div>

      {/* Powered by TradePe Subtext */}
      <div className="flex items-baseline gap-1.5 text-xs font-body text-[#52525B] mt-2">
        <span>Powered by</span>
        <TradePeWordmark asLink={false} className="text-xs" />
      </div>

      {/* Diagnostic Pulse Indicator */}
      <div className="mt-4 flex items-center gap-2">
        {!shouldReduceMotion && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D1C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D1C]" />
          </span>
        )}
        <span className="font-mono-data text-[10px] uppercase tracking-widest text-[#52525B]">
          {statusText}
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
