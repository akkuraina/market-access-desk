"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, TrendingUp, Zap, Award, Sparkles } from "lucide-react";

interface StepTradeInsightsSequentialProps {
  onReturnToHub: () => void;
}

export const StepTradeInsightsSequential: React.FC<StepTradeInsightsSequentialProps> = ({
  onReturnToHub,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [miniStep, setMiniStep] = useState<0 | 1 | 2>(0);

  const miniVariants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Subtle Step Dots within Insights Flow */}
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              miniStep === idx
                ? "w-8 bg-[#FF4D1C]"
                : miniStep > idx
                ? "w-2 bg-[#0A0A0A]"
                : "w-2 bg-black/15"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* MINI-SCREEN A: Dominant Growth Metric */}
        {miniStep === 0 && (
          <motion.div
            key="insight-a"
            variants={miniVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 mb-6">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold">
                Quarterly Volume Telemetry
              </span>
            </div>

            <div className="mb-4">
              <span className="font-mono-data text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#0A0A0A] block leading-none">
                +40.2%
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight mb-3">
              Quarterly Direct-Clearing Growth
            </h2>

            <p className="font-body text-base sm:text-lg text-[#706E6B] font-light max-w-lg mb-10 leading-relaxed">
              Your annualized USD/INR volume velocity scaled to <strong className="text-[#0A0A0A] font-semibold">$635,000 monthly</strong> with zero intermediary correspondent banking deductions.
            </p>

            <button
              type="button"
              onClick={() => setMiniStep(1)}
              className="w-full sm:w-auto min-w-[280px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Next: Execution Metrics</span>
              <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>
        )}

        {/* MINI-SCREEN B: Corridor Execution Metrics (3 Big Mono Numbers) */}
        {miniStep === 1 && (
          <motion.div
            key="insight-b"
            variants={miniVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 mb-6">
              <Zap className="h-3.5 w-3.5" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold">
                Corridor Performance Benchmarks
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-2">
              Direct-Rail Execution Telemetry
            </h2>
            <p className="font-body text-sm sm:text-base text-[#706E6B] font-light mb-8">
              Live settlement performance measured across your India → UAE &amp; US corridors.
            </p>

            {/* 3 Large Side-by-Side Instrument Numbers */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
                <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                  Avg Settlement
                </span>
                <div className="my-3">
                  <span className="font-mono-data text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                    4.2 <span className="text-xl sm:text-2xl font-normal text-[#706E6B]">hrs</span>
                  </span>
                </div>
                <span className="font-body text-xs text-[#706E6B]">
                  vs. 3–5 days standard SWIFT
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
                <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                  Effective Spread
                </span>
                <div className="my-3">
                  <span className="font-mono-data text-4xl sm:text-5xl font-bold tracking-tight text-emerald-700">
                    0.18%
                  </span>
                </div>
                <span className="font-body text-xs text-[#706E6B]">
                  Institutional wholesale rate
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
                <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                  Clearance Rate
                </span>
                <div className="my-3">
                  <span className="font-mono-data text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                    99.4%
                  </span>
                </div>
                <span className="font-body text-xs text-[#706E6B]">
                  First-pass compliance pass
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setMiniStep(0)}
                className="py-4 px-6 rounded-xl bg-white border-2 border-black/10 hover:border-black text-[#0A0A0A] font-display font-semibold text-base transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setMiniStep(2)}
                className="flex-1 sm:flex-initial min-w-[240px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Next: Expansion Match</span>
                <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </motion.div>
        )}

        {/* MINI-SCREEN C: Recommended Corridor Moment */}
        {miniStep === 2 && (
          <motion.div
            key="insight-c"
            variants={miniVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 mb-6">
              <Award className="h-3.5 w-3.5" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold">
                AI Peer Expansion Intelligence
              </span>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-black/10 shadow-card w-full text-left mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                    RECOMMENDED TARGET MARKET
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">🇩🇪</span>
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight">
                      Germany (European Union)
                    </h3>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="font-mono-data text-4xl sm:text-5xl font-bold text-[#FF4D1C] tracking-tight block">
                    94%
                  </span>
                  <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                    Corridor Fit Match
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/[0.03] border border-black/5 mb-4">
                <span className="font-mono-data text-xs font-semibold text-[#0A0A0A] block mb-1">
                  Average Margin Lift: <strong className="text-emerald-700">+14.8%</strong>
                </span>
                <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
                  76% of Indian exporters with &gt;$500k in UK trade volume successfully unlocked German retail channels within 6 months by leveraging unified CE marking and EU One-Stop-Shop (OSS) VAT structures.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono-data text-xs text-[#706E6B]">
                <Sparkles className="h-4 w-4 text-[#FF4D1C]" />
                <span>Ready to clear in EUR via SEPA Virtual IBAN rails.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onReturnToHub}
              className="w-full sm:w-auto min-w-[280px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-translate-x-1 transition-all" />
              <span>Return to Options Hub</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiet Secondary Return to Hub Affordance */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onReturnToHub}
          className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
        >
          ← Return to Options Hub
        </button>
      </div>
    </div>
  );
};
