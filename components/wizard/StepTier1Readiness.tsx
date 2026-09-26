"use client";

import React from "react";
import { ReadinessResult } from "@/lib/readinessScore";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { ArrowRight, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

interface StepTier1ReadinessProps {
  result: ReadinessResult;
  onNext: () => void;
  onReturnToHub?: () => void;
  userName?: string;
}

export const StepTier1Readiness: React.FC<StepTier1ReadinessProps> = ({
  result,
  onNext,
  onReturnToHub,
  userName,
}) => {
  const topFactors = result.factors.slice(0, 3);
  const displayName = userName ? userName.trim().split(" ")[0] : null;

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
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Elevated Headline & Subtitle */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
        {displayName ? `Nice work, ${displayName} — here's your score` : "Tier 1: Market Readiness Score"}
      </h1>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-6">
        Operational corridor clearance index for {result.corridorCode}
      </p>

      {/* Score Gauge Instrument */}
      <div className="my-2">
        <ScoreGauge
          score={result.overallScore}
          size={230}
          strokeWidth={10}
          label=""
          sublabel=""
          corridor=""
        />
      </div>

      {/* Complexity & Status Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4 mb-6">
        <span
          className={`font-mono-data text-xs px-3 py-1 rounded-full border font-semibold ${badgeInfo.bg}`}
        >
          {badgeInfo.label}
        </span>
        <span className="font-mono-data text-xs px-3 py-1 rounded-full border bg-white border-black/10 text-[#0A0A0A] font-semibold">
          Band: {result.scoreBand}
        </span>
      </div>

      {/* Key Factors Summary */}
      <div className="w-full space-y-2.5 mb-10 text-left">
        {topFactors.map((factor, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-black/10 shadow-sm text-sm sm:text-base"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {factor.impact === "positive" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
              )}
              <span className="font-medium text-[#0A0A0A] truncate">
                {factor.label}
              </span>
            </div>
            <span
              className={`font-mono-data text-sm font-bold shrink-0 ml-3 ${
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
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <span>See your compliance checklist</span>
        <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </button>

      {onReturnToHub && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onReturnToHub}
            className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
          >
            ← Cancel and return to Options Hub
          </button>
        </div>
      )}
    </div>
  );
};
