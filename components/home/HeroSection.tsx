"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

const CORRIDOR_TICKER = [
  { corridor: "IN → UAE", score: 88, clearing: "4.2h", tariff: "0% (CEPA)", status: "Direct Clearing" },
  { corridor: "IN → UK", score: 74, clearing: "6.5h", tariff: "OSS VAT", status: "AD-1 Routed" },
  { corridor: "IN → US", score: 68, clearing: "8.0h", tariff: "CBP Verified", status: "ACH Direct" },
  { corridor: "IN → SG", score: 92, clearing: "3.8h", tariff: "0% (CECA)", status: "FAST Clearing" },
  { corridor: "IN → DE", score: 81, clearing: "7.1h", tariff: "EU OSS", status: "SEPA Rail" },
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-black/10 py-12 sm:py-20 lg:py-24 bg-[#FAF7F0]">
      {/* Live Corridor Readiness Ticker Strip (Matching TradePe FX Ticker) */}
      <div className="border-y border-black/10 bg-white py-2.5 mb-10 overflow-hidden select-none">
        <div className="flex animate-marquee-left whitespace-nowrap gap-8 text-xs font-mono-data text-[#0A0A0A]">
          {[...CORRIDOR_TICKER, ...CORRIDOR_TICKER, ...CORRIDOR_TICKER].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="font-bold text-[#0A0A0A]">{item.corridor}</span>
              <span className="px-1.5 py-0.5 rounded bg-black/5 font-semibold text-[#FF4D1C]">
                SCORE: {item.score}
              </span>
              <span className="text-[#52525B]">CLEARING: {item.clearing}</span>
              <span className="text-[#52525B]">TARIFF: {item.tariff}</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {item.status}
              </span>
              <span className="text-black/20">/</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Dense Spec-Sheet Hero */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Stat & Spec Header Badges (Matching TradePe Hero Pattern) */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant="subtle" size="sm">
                5-Tier Architecture
              </Badge>
              <span className="text-xs text-black/20 font-mono-data">·</span>
              <Badge variant="subtle" size="sm">
                40+ Corridor Profiles
              </Badge>
              <span className="text-xs text-black/20 font-mono-data">·</span>
              <Badge variant="gold" size="sm">
                Diagnostic in &lt;2 min
              </Badge>
            </div>

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

            {/* Spec-Sheet Telemetry Line */}
            <div className="mt-10 pt-5 border-t border-black/10 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-data text-[#52525B]">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span className="font-semibold text-[#0A0A0A]">TIERS 1–5 ACTIVE</span>
              </div>
              <span className="text-black/20">|</span>
              <div>
                <span>DIAGNOSTIC CRITERIA: </span>
                <strong className="text-[#0A0A0A]">12 WEIGHTED SIGNALS</strong>
              </div>
              <span className="text-black/20">|</span>
              <div>
                <span>SETTLEMENT RAILS: </span>
                <strong className="text-[#0A0A0A]">GBP · AED · USD · SGD · EUR</strong>
              </div>
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

