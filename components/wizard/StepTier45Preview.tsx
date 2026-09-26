"use client";

import React from "react";
import { Network, BarChart3, RotateCcw, Sparkles } from "lucide-react";

interface StepTier45PreviewProps {
  onRestart: () => void;
}

export const StepTier45Preview: React.FC<StepTier45PreviewProps> = ({ onRestart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 border border-black/10 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
        <span className="font-mono-data text-[10px] uppercase tracking-wider font-semibold text-[#0A0A0A]">
          Roadmap Preview
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-1">
        Tier 4 & Tier 5: Ecosystem Suite
      </h1>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-6 max-w-lg">
        Advanced distribution network and real-time trade telemetry launching in Phase 2.
      </p>

      {/* Two Preview Cards */}
      <div className="w-full space-y-3 mb-8 text-left">
        {/* Tier 4 */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0A0A0A]">
              <Network className="h-4 w-4 text-[#FF4D1C]" />
              <h3 className="font-display font-semibold text-sm sm:text-base">
                Tier 4: Vetted Partner Network
              </h3>
            </div>
            <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-black/5 text-[#706E6B]">
              Phase 2
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
            Direct commercial introductions to pre-screened Tier-1 regional distributors, accredited bonded port warehousing, and automated RFQ matchmaking.
          </p>
        </div>

        {/* Tier 5 */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0A0A0A]">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
              <h3 className="font-display font-semibold text-sm sm:text-base">
                Tier 5: Trade Data Insights
              </h3>
            </div>
            <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-black/5 text-[#706E6B]">
              Phase 2
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
            Aggregated cross-border liquidity analytics, live FX spread benchmarking, and algorithmically matched peer expansion corridors.
          </p>
        </div>
      </div>

      {/* Single Closing Button */}
      <button
        type="button"
        onClick={onRestart}
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-base sm:text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <RotateCcw className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-rotate-90 transition-transform duration-300" />
        <span>Restart Demo</span>
      </button>
    </div>
  );
};
