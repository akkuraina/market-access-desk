"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";


export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-black/10 py-12 sm:py-20 lg:py-24 bg-[#FAF7F0]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Dense Spec-Sheet Hero */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >

            {/* Dominant Fraunces Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#0A0A0A] leading-[1.08]">
              Market Access{" "}
              <span className="font-italic-accent text-[#FF4D1C] font-normal italic">
                Desk
              </span>
            </h1>

            {/* Dense Spec-Sheet Lead */}
            <p className="mt-6 font-display text-lg sm:text-xl text-[#0A0A0A]/90 font-normal leading-snug max-w-2xl">
              Direct-clearing trade enablement for global exporters. Assess quantitative corridor readiness across 12 signals, automate HS-code duty compliance, provision local currency accounts, and underwrite portable export credit.
            </p>

            {/* Technical Subtext */}
            <p className="mt-3 font-body text-sm text-[#52525B] leading-relaxed max-w-xl">
              Powered by <TradePeWordmark /> AD-1 banking infrastructure. Bypass correspondent banking delays, eliminate unvetted middlemen, and execute cross-border expansion with deterministic regulatory and settlement certainty.
            </p>

            {/* High-Impact Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/readiness-score">
                <Button variant="orange" size="lg" className="group shadow-subtle">
                  <span>Calculate Readiness Score</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#architecture">
                <Button variant="secondary" size="lg">
                  <span>Explore 5-Tier Spec</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: High-End ScoreGauge Console Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-subtle">
              {/* Console Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#FF4D1C]" />
                  <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    READINESS INSTRUMENT
                  </span>
                </div>
                <span className="font-mono-data text-[10px] text-[#52525B] bg-[#F4F2EC] px-2 py-0.5 rounded border border-black/10">
                  SPEC: MAD-T1-DIAG
                </span>
              </div>

              {/* Enhanced Circular Instrument Gauge (Preserves Precision Instrument Dial) */}
              <ScoreGauge
                score={72}
                maxScore={100}
                size={230}
                label="Corridor Readiness Baseline"
                sublabel="Multi-vector evaluation across tariff exposure, banking, and compliance"
                corridor="India → UAE / GCC"
              />

              {/* Console Bottom Action Bar */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-mono-data text-[10px] text-[#52525B] uppercase">DIAGNOSTIC STATUS</p>
                  <p className="font-body text-xs font-bold text-[#0A0A0A]">Tier 1 Verification Passed</p>
                </div>
                <Link href="/readiness-score">
                  <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors group">
                    <span>Launch Diagnostic</span>
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

