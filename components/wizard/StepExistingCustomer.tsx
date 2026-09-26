"use client";

import React from "react";
import { TrendingUp, Award, Network, RotateCcw, Zap } from "lucide-react";

interface StepExistingCustomerProps {
  onRestart: () => void;
}

export const StepExistingCustomer: React.FC<StepExistingCustomerProps> = ({
  onRestart,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-1">
        TradePe Trade Telemetry
      </h1>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-6">
        Tier 5: Real-time clearing telemetry & AI corridor expansion for active accounts.
      </p>

      {/* Illustrative Telemetry Cards */}
      <div className="w-full space-y-3 mb-8 text-left">
        {/* Metric 1: Volume Growth */}
        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm sm:text-base text-[#0A0A0A]">
                Volume Growth: +40% this quarter
              </span>
              <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Active
              </span>
            </div>
            <p className="font-body text-xs text-[#706E6B] mt-0.5">
              Current USD/INR monthly run-rate reached $635k with zero correspondent fees.
            </p>
          </div>
        </div>

        {/* Metric 2: Benchmark Telemetry */}
        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display font-semibold text-sm sm:text-base text-[#0A0A0A]">
              Corridor Execution Metrics
            </span>
            <p className="font-body text-xs text-[#706E6B] mt-0.5">
              Average settlement: 4.2 hours • Effective FX spread: 0.18% • 99.4% clearance success.
            </p>
          </div>
        </div>

        {/* Metric 3: Peer Expansion Suggestion */}
        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm sm:text-base text-[#0A0A0A]">
                Recommended Corridor: Germany 🇩🇪
              </span>
              <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-black/5 text-[#0A0A0A]">
                94% Match
              </span>
            </div>
            <p className="font-body text-xs text-[#706E6B] mt-0.5">
              Apparel exporters with &gt;$500k UK volume unlock German retail channels with +14% margin lift.
            </p>
          </div>
        </div>

        {/* Tier 4 Roadmap Note */}
        <div className="p-3.5 rounded-xl bg-[#0A0A0A]/[0.02] border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-[#FF4D1C]" />
            <span className="font-body text-xs text-[#0A0A0A] font-medium">
              Tier 4 Partner Network: RFQ distribution launching in Phase 2
            </span>
          </div>
          <span className="font-mono-data text-[10px] uppercase font-semibold text-[#706E6B]">
            Roadmap
          </span>
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
