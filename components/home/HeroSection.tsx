"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-black/10 pt-6 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 bg-[#FAF7F0]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col items-start text-left max-w-4xl"
        >
          {/* Subtle Classification Tag */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Badge variant="zinc" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
              INSTITUTIONAL TRADE ENABLEMENT SUITE
            </Badge>
          </div>

          {/* Dominant Fraunces Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#0A0A0A] leading-[1.06]">
            Market Access{" "}
            <span className="font-italic-accent text-[#FF4D1C] font-normal italic">
              Desk
            </span>
          </h1>

          {/* Dense Spec-Sheet Lead */}
          <p className="mt-5 font-display text-lg sm:text-2xl text-[#0A0A0A]/90 font-normal leading-snug max-w-3xl">
            Direct-clearing trade enablement for global exporters. Assess quantitative corridor readiness across 12 signals, automate bilateral compliance, provision local currency accounts, and underwrite portable export credit.
          </p>

          {/* Technical Subtext */}
          <p className="mt-3 font-body text-sm sm:text-base text-[#52525B] leading-relaxed max-w-2xl">
            Powered by <TradePeWordmark /> AD-1 banking infrastructure. Bypass correspondent banking delays, eliminate unvetted middlemen, and execute cross-border expansion with deterministic regulatory and settlement certainty.
          </p>

          {/* High-Impact CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/readiness-score">
              <Button variant="orange" size="lg" className="group shadow-subtle text-base sm:text-lg">
                <span>Calculate Readiness Score</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#architecture">
              <Button variant="secondary" size="lg">
                <span>Explore Desk Architecture</span>
              </Button>
            </Link>
          </div>

          {/* Lightweight Telemetry Highlight Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-black/10 w-full max-w-4xl">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-black/10 shadow-subtle">
              <p className="font-mono-data text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider">Evaluation Matrix</p>
              <p className="font-mono-data text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">12 Signals</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-black/10 shadow-subtle">
              <p className="font-mono-data text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider">Bilateral Corridors</p>
              <p className="font-mono-data text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">40+ Active Pairs</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-black/10 shadow-subtle">
              <p className="font-mono-data text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider">Domestic Clearing</p>
              <p className="font-mono-data text-sm sm:text-base font-bold text-[#FF4D1C] mt-0.5">T+0 / T+1 Direct</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-black/10 shadow-subtle">
              <p className="font-mono-data text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider">FX Settlement</p>
              <p className="font-mono-data text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">Wholesale Mid-Market</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
