"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScoreGauge } from "@/components/ui/ScoreGauge";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-mad-green/10 py-16 sm:py-24 lg:py-32 bg-mad-cream">
      {/* Background Navigation Chart / Route Map Motif Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <svg
          className="absolute -top-24 -right-24 h-[750px] w-[750px] sm:h-[900px] sm:w-[900px] text-mad-green stroke-current opacity-[0.045]"
          viewBox="0 0 800 800"
          fill="none"
        >
          {/* Concentric Great Circles / Latitudes */}
          <circle cx="400" cy="400" r="120" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="400" cy="400" r="240" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="400" cy="400" r="360" strokeWidth="1.2" strokeDasharray="3 5" />
          <circle cx="400" cy="400" r="480" strokeWidth="1" strokeDasharray="8 12" />

          {/* Compass Radial Meridian Rays */}
          <line x1="400" y1="20" x2="400" y2="780" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="20" y1="400" x2="780" y2="400" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="130" y1="130" x2="670" y2="670" strokeWidth="0.8" strokeDasharray="4 6" />
          <line x1="670" y1="130" x2="130" y2="670" strokeWidth="0.8" strokeDasharray="4 6" />

          {/* Route Arcs between nodes */}
          <path
            d="M 160 520 Q 380 220 640 340"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 220 280 Q 450 480 680 200"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* Navigational Crosshairs */}
          <g strokeWidth="1">
            <path d="M 635 340 L 645 340 M 640 335 L 640 345" />
            <path d="M 155 520 L 165 520 M 160 515 L 160 525" />
            <path d="M 395 400 L 405 400 M 400 395 L 400 405" />
            <path d="M 445 480 L 455 480 M 450 475 L 450 485" />
          </g>
        </svg>

        {/* Faint Grid Marks */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0E4D3B 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Asymmetric, Confident Editorial Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Subtle, Left-Aligned Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant="subtle" size="xs">
                <span className="h-1 w-1 rounded-full bg-mad-gold" />
                Cross-Border Enablement Architecture
              </Badge>
              <span className="text-xs text-mad-slate/40 font-mono-data">/</span>
              <span className="font-mono-data text-[11px] text-mad-slate/80 tracking-wider">
                PROGRAM_SYS_v1.0
              </span>
            </div>

            {/* Dominant Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-mad-green leading-[1.06]">
              Market Access Desk
            </h1>

            {/* Accent-Treated Subheading with Typographic Shift */}
            <div className="mt-6 font-display text-lg sm:text-xl lg:text-2xl text-mad-ink/90 font-medium leading-relaxed max-w-2xl">
              The institutional engine for{" "}
              <span className="font-semibold text-mad-gold relative inline-block">
                cross-border market readiness
                <span className="absolute left-0 bottom-0.5 w-full h-[2px] bg-mad-gold/40 rounded-full" />
              </span>
              , automated regulatory clearance, and local currency settlement.
            </div>

            {/* Editorial Body Description */}
            <p className="mt-4 font-body text-sm sm:text-base text-mad-slate leading-relaxed max-w-xl">
              MAD establishes a definitive five-tier operational protocol for enterprises navigating
              high-growth international trade corridors — replacing fragmented advisory with verified
              readiness telemetry and programmatic execution.
            </p>

            {/* High-Impact Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/readiness-score">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button variant="primary" size="xl" className="group shadow-card">
                    <span>Calculate Readiness Score</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="#architecture">
                <Button variant="secondary" size="lg">
                  <span>Explore 5 Tiers</span>
                </Button>
              </Link>
            </div>

            {/* Micro Telemetry Bar */}
            <div className="mt-10 pt-6 border-t border-mad-green/10 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-data text-mad-slate">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>ACTIVE TIERS: T1–T5</span>
              </div>
              <span className="text-mad-slate/30">|</span>
              <div className="flex items-center gap-1.5">
                <span>DIAGNOSTIC CRITERIA: 24 VECTORS</span>
              </div>
              <span className="text-mad-slate/30">|</span>
              <div className="flex items-center gap-1.5">
                <span>CURRENCY ROUTING: 18+ CORRIDORS</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-End ScoreGauge Console Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-mad-green/15 bg-mad-cream-alt/95 p-6 sm:p-8 shadow-card overflow-hidden">
              {/* Subtle inner decorative ring & card corner route watermark */}
              <div className="absolute inset-1.5 rounded-[22px] border border-mad-green/8 pointer-events-none" />
              
              <svg
                className="absolute -bottom-10 -right-10 h-48 w-48 text-mad-green opacity-[0.05] pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              </svg>

              {/* Console Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-mad-green/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-mad-gold animate-ping" />
                  <span className="font-mono-data text-xs font-semibold uppercase tracking-wider text-mad-green">
                    LIVE GAUGE INSTRUMENT
                  </span>
                </div>
                <span className="font-mono-data text-[10px] text-mad-slate/80 bg-mad-cream px-2 py-0.5 rounded border border-mad-green/10">
                  REF: MAD-INDEX-01
                </span>
              </div>

              {/* Enhanced Circular Instrument Gauge */}
              <ScoreGauge
                score={72}
                maxScore={100}
                size={230}
                label="Corridor Readiness Baseline"
                sublabel="Multi-vector evaluation across tariff exposure, banking, and compliance"
                corridor="India → UAE / GCC"
              />

              {/* Console Bottom Action Bar */}
              <div className="mt-6 pt-5 border-t border-mad-green/10 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-mono-data text-[10px] text-mad-slate uppercase">Diagnostic Status</p>
                  <p className="font-display text-xs font-bold text-mad-green">Tier 1 Verification Passed</p>
                </div>
                <Link href="/readiness-score">
                  <span className="inline-flex items-center gap-1 text-xs font-display font-semibold text-mad-green hover:text-mad-green-light group">
                    <span>Full Diagnostic</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
