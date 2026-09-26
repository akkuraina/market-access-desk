"use client";

import React from "react";
import { Network, BarChart3, RotateCcw, Sparkles, ArrowLeft } from "lucide-react";

interface StepTier45PreviewProps {
  onRestart: () => void;
  onReturnToHub?: () => void;
  onFinish?: () => void;
  isExistingCustomer?: boolean | null;
}

export const StepTier45Preview: React.FC<StepTier45PreviewProps> = ({
  onRestart,
  onReturnToHub,
  onFinish,
  isExistingCustomer,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
        <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]">
          Roadmap Preview
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
        Tier 4 &amp; Tier 5: Ecosystem Suite
      </h1>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-10 max-w-xl">
        Advanced distribution network and real-time trade telemetry launching in Phase 2 for scale operations.
      </p>

      {/* Two Preview Cards */}
      <div className="w-full space-y-4 mb-10 text-left">
        {/* Tier 4 */}
        <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#0A0A0A]">
              <Network className="h-5 w-5 text-[#FF4D1C]" />
              <h3 className="font-display font-bold text-lg sm:text-xl">
                Tier 4: Vetted Partner Network
              </h3>
            </div>
            <span className="font-mono-data text-xs uppercase font-semibold px-2.5 py-1 rounded bg-black/5 text-[#706E6B]">
              Phase 2
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
            Direct commercial introductions to pre-screened Tier-1 regional distributors, accredited bonded port warehousing across Jebel Ali, Singapore, and Felixstowe, and automated RFQ matchmaking.
          </p>
        </div>

        {/* Tier 5 */}
        <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#0A0A0A]">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h3 className="font-display font-bold text-lg sm:text-xl">
                Tier 5: Trade Data Insights
              </h3>
            </div>
            <span className="font-mono-data text-xs uppercase font-semibold px-2.5 py-1 rounded bg-black/5 text-[#706E6B]">
              Phase 2
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
            Aggregated cross-border liquidity analytics, live FX spread benchmarking, and algorithmically matched peer expansion corridors.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {isExistingCustomer && onReturnToHub ? (
        <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onReturnToHub}
            className="flex-1 group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-translate-x-1 transition-all" />
            <span>Return to Options Hub</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-white text-[#0A0A0A] font-display font-semibold text-lg border-2 border-black/10 hover:border-black shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4 text-black/50 group-hover:text-black group-hover:-rotate-90 transition-transform" />
            <span>Restart Demo</span>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onFinish || onRestart}
            className="w-full sm:w-auto min-w-[280px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Finish — View Profile Snapshot</span>
            <Sparkles className="h-5 w-5 text-[#FF4D1C]" />
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restart demo</span>
          </button>
        </div>
      )}
    </div>
  );
};
