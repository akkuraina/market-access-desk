"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScoreGaugeProps {
  score?: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  corridor?: string;
  className?: string;
  animateOnView?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score = 72,
  maxScore = 100,
  size = 240,
  strokeWidth = 10,
  label = "Market Readiness Index",
  sublabel = "Tier 1 Comprehensive Diagnostic",
  corridor = "India → UAE / MENA",
  className,
  animateOnView = true,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const controls = useAnimation();

  const center = size / 2;
  const radius = center - strokeWidth - 28;
  const circumference = 2 * Math.PI * radius;

  // Arc calculation: 270-degree sweep (-225deg to +45deg) for an instrument dial feel
  const sweepAngle = 270;
  const arcLength = (sweepAngle / 360) * circumference;
  const normalizedScore = Math.min(Math.max(score, 0), maxScore);
  const targetOffset = arcLength - (normalizedScore / maxScore) * arcLength;

  // Generate tick marks around the 270 degree dial
  const totalTicks = 36;
  const ticks = Array.from({ length: totalTicks + 1 }, (_, i) => {
    const fraction = i / totalTicks;
    // Map from 135deg (bottom-left) to 405deg (bottom-right)
    const angleDeg = 135 + fraction * sweepAngle;
    const angleRad = (angleDeg * Math.PI) / 180;
    const isMajor = i % 6 === 0;
    const tickLength = isMajor ? 8 : 4;
    const innerR = radius + strokeWidth / 2 + 6;
    const outerR = innerR + tickLength;

    const x1 = center + innerR * Math.cos(angleRad);
    const y1 = center + innerR * Math.sin(angleRad);
    const x2 = center + outerR * Math.cos(angleRad);
    const y2 = center + outerR * Math.sin(angleRad);

    const isFilled = fraction <= normalizedScore / maxScore;

    return { x1, y1, x2, y2, isMajor, isFilled, key: i };
  });

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(easeProgress * normalizedScore));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    controls.start({
      strokeDashoffset: targetOffset,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    });

    return () => window.cancelAnimationFrame(animFrame);
  }, [normalizedScore, targetOffset, controls]);

  return (
    <div className={cn("relative flex flex-col items-center select-none", className)}>
      {/* Gauge Instrument Housing */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Subtle background glow for instrument */}
        <div
          className="absolute inset-4 rounded-full opacity-60 pointer-events-none blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, rgba(14, 77, 59, 0.04) 60%, transparent 80%)",
          }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          <defs>
            {/* Gold Arc Glow Filter */}
            <filter id="gaugeGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#C9A227" floodOpacity="0.45" />
            </filter>
            {/* Inner Dial Gradient */}
            <radialGradient id="innerDialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#F1ECDD" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E5DEC9" stopOpacity="0.5" />
            </radialGradient>
          </defs>

          {/* Inner Instrument Bezel */}
          <circle
            cx={center}
            cy={center}
            r={radius - 8}
            fill="url(#innerDialGrad)"
            stroke="#0E4D3B"
            strokeOpacity="0.08"
            strokeWidth="1"
          />

          {/* Navigational Crosshairs (Subtle Compass Grid) */}
          <line
            x1={center - radius + 12}
            y1={center}
            x2={center + radius - 12}
            y2={center}
            stroke="#0E4D3B"
            strokeOpacity="0.07"
            strokeDasharray="2 3"
          />
          <line
            x1={center}
            y1={center - radius + 12}
            x2={center}
            y2={center + radius - 12}
            stroke="#0E4D3B"
            strokeOpacity="0.07"
            strokeDasharray="2 3"
          />

          {/* Concentric Interior Radar Guide */}
          <circle
            cx={center}
            cy={center}
            r={(radius - 8) * 0.6}
            fill="none"
            stroke="#0E4D3B"
            strokeOpacity="0.06"
            strokeDasharray="3 4"
          />

          {/* Tick Graduations */}
          {ticks.map((t) => (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isFilled ? "#C9A227" : "#0E4D3B"}
              strokeOpacity={t.isFilled ? (t.isMajor ? 0.9 : 0.6) : (t.isMajor ? 0.25 : 0.12)}
              strokeWidth={t.isMajor ? 1.75 : 1}
              strokeLinecap="round"
            />
          ))}

          {/* Background Track Arc (270 degrees) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#0E4D3B"
            strokeOpacity="0.1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform={`rotate(135 ${center} ${center})`}
          />

          {/* Dynamic Animated Gold Gauge Arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#C9A227"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={controls}
            filter="url(#gaugeGoldGlow)"
            strokeLinecap="round"
            transform={`rotate(135 ${center} ${center})`}
          />
        </svg>

        {/* Center Display Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* Micro Telemetry Label */}
          <span className="font-mono-data text-[10px] tracking-widest uppercase text-mad-slate/80 font-medium">
            INDEX SCORE
          </span>

          {/* Large Mono Score */}
          <div className="flex items-baseline justify-center -my-0.5">
            <span className="font-mono-data text-5xl sm:text-6xl font-medium tracking-tighter text-mad-green">
              {displayScore}
            </span>
          </div>

          {/* Benchmark denominator */}
          <div className="flex items-center gap-1.5 font-mono-data text-xs text-mad-slate">
            <span>SCALE</span>
            <span className="text-mad-green font-semibold">0-{maxScore}</span>
          </div>

          {/* Status Chip */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-mad-green/10 border border-mad-green/20">
            <span className="h-1.5 w-1.5 rounded-full bg-mad-gold animate-pulse" />
            <span className="font-mono-data text-[9px] uppercase tracking-wider font-semibold text-mad-green">
              CORRIDOR CLEARED
            </span>
          </div>
        </div>
      </div>

      {/* External Labels & Corridor Context */}
      {(label || sublabel || corridor) && (
        <div className="mt-4 text-center space-y-1">
          {label && (
            <h4 className="font-display font-bold text-sm sm:text-base text-mad-green tracking-tight">
              {label}
            </h4>
          )}
          {sublabel && (
            <p className="font-body text-xs text-mad-slate max-w-xs mx-auto">
              {sublabel}
            </p>
          )}
          {corridor && (
            <div className="pt-1">
              <span className="font-mono-data text-[11px] text-mad-slate/90 px-2.5 py-0.5 rounded-md bg-mad-cream-alt border border-mad-green/10">
                ACTIVE CORRIDOR: <strong className="text-mad-green font-semibold">{corridor}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
