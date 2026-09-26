"use client";

import React from "react";
import { ReadinessResult } from "@/lib/readinessScore";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

interface StepTier1ReadinessProps {
  result: ReadinessResult;
  onNext: () => void;
}

export const StepTier1Readiness: React.FC<StepTier1ReadinessProps> = ({
  result,
  onNext,
}) => {
  // Extract top 2-3 factors
  const topFactors = result.factors.slice(0, 3);

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return {
          label: "Low Regulatory Friction",
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        };
      case "Medium":
        return {
          label: "Moderate Regulatory Friction",
          bg: "bg-amber-50 border-amber-200 text-amber-800",
        };
      default:
        return {
          label: "High Regulatory Friction",
          bg: "bg-orange-50 border-orange-200 text-orange-900",
        };
    }
  };

  const badgeInfo = getComplexityBadge(result.regulatoryComplexity);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-1">
        Tier 1: Market Readiness Score
      </h1>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-5">
        Operational corridor clearance index for {result.corridorCode}
      </p>

      {/* Score Gauge */}
      <div className="my-1">
        <ScoreGauge
          score={result.overallScore}
          size={210}
          strokeWidth={9}
          label=""
          sublabel=""
          corridor=""
        />
      </div>

      {/* Complexity & Status Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 mb-5">
        <span
          className={`font-mono-data text-[11px] px-2.5 py-1 rounded-full border font-semibold ${badgeInfo.bg}`}
        >
          {badgeInfo.label}
        </span>
        <span className="font-mono-data text-[11px] px-2.5 py-1 rounded-full border bg-white border-black/10 text-[#0A0A0A] font-semibold">
          Band: {result.scoreBand}
        </span>
      </div>

      {/* Key Factors Summary - 2-3 items */}
      <div className="w-full space-y-2 mb-8 text-left">
        {topFactors.map((factor, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              {factor.impact === "positive" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-orange-600 shrink-0" />
              )}
              <span className="font-medium text-[#0A0A0A] truncate">
                {factor.label}
              </span>
            </div>
            <span
              className={`font-mono-data text-xs font-semibold shrink-0 ml-2 ${
                factor.points >= 0 ? "text-emerald-700" : "text-orange-700"
              }`}
            >
              {factor.points >= 0 ? `+${factor.points} pts` : `${factor.points} pts`}
            </span>
          </div>
        ))}
      </div>

      {/* Single Big Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-base sm:text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <span>See your compliance checklist</span>
        <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
