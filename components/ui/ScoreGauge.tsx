"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScoreGaugeProps {
  score?: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score = 72,
  maxScore = 100,
  size = 180,
  strokeWidth = 12,
  label = "Readiness Score",
  sublabel = "Tier 1: Global Access",
  className,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth - 4;
  const circumference = 2 * Math.PI * radius;
  // Arc representation (e.g. 270 degree arc or full circle)
  const normalizedScore = Math.min(Math.max(score, 0), maxScore);
  const strokeDashoffset = circumference - (normalizedScore / maxScore) * circumference;

  return (
    <div className={cn("inline-flex flex-col items-center justify-center", className)}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg] transform"
        >
          {/* Background track circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#F1ECDD"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors"
          />
          {/* Inner subtle guide track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#0E4D3B"
            strokeOpacity="0.08"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Gold Arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#C9A227"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono-data text-4xl sm:text-5xl font-medium tracking-tighter text-mad-green"
          >
            {normalizedScore}
          </motion.span>
          <span className="font-mono-data text-xs text-mad-slate/70 tracking-widest uppercase">
            / {maxScore}
          </span>
        </div>
      </div>

      {(label || sublabel) && (
        <div className="mt-3 text-center">
          {label && (
            <p className="font-display font-semibold text-sm text-mad-green tracking-tight">
              {label}
            </p>
          )}
          {sublabel && (
            <p className="font-body text-xs text-mad-slate mt-0.5">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
