"use client";

import React from "react";
import { ReadinessResult } from "@/lib/readinessScore";
import { ArrowRight, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

interface StepTier2ComplianceProps {
  result: ReadinessResult;
  onNext: () => void;
}

export const StepTier2Compliance: React.FC<StepTier2ComplianceProps> = ({
  result,
  onNext,
}) => {
  const checklist = result.complianceChecklist.slice(0, 4);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-1">
        Tier 2: Compliance Checklist
      </h1>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-6">
        Mandatory regulatory filings and prerequisites for {result.corridorCode}
      </p>

      {/* Checklist Items */}
      <div className="w-full space-y-3 mb-8 text-left">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col gap-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                <h3 className="font-display font-semibold text-sm sm:text-base text-[#0A0A0A]">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.mandatory ? (
                  <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-black/5 text-[#0A0A0A]">
                    Mandatory
                  </span>
                ) : (
                  <span className="font-mono-data text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                    Recommended
                  </span>
                )}
              </div>
            </div>
            <p className="font-body text-xs text-[#706E6B] pl-6">
              {item.description}
            </p>
            <div className="flex items-center gap-1 pl-6 pt-0.5 font-mono-data text-[11px] text-[#0A0A0A]/70">
              <Clock className="h-3 w-3 text-[#706E6B]" />
              <span>Est. turnaround: ~{item.estimatedDays} business days</span>
            </div>
          </div>
        ))}
      </div>

      {/* Single Big Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-base sm:text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <span>Set up your settlement account</span>
        <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
