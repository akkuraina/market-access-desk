"use client";

import React, { useState } from "react";
import { TargetMarket, calculateReadinessScore } from "@/lib/readinessScore";
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

interface StepStandaloneComplianceProps {
  onReturnToHub: () => void;
}

const CORRIDORS: { id: TargetMarket; label: string; flag: string; treaty: string }[] = [
  { id: "United Kingdom", label: "United Kingdom", flag: "🇬🇧", treaty: "Post-Brexit EORI / VAT" },
  { id: "United States", label: "United States", flag: "🇺🇸", treaty: "CBP Formal Entry / Bond" },
  { id: "UAE", label: "UAE (CEPA)", flag: "🇦🇪", treaty: "0% Preferential Bilateral Tariff" },
  { id: "Singapore", label: "Singapore", flag: "🇸🇬", treaty: "CECA TradeNet Clearance" },
  { id: "Germany", label: "Germany (EU)", flag: "🇩🇪", treaty: "EU OSS VAT / LUCID Directives" },
];

export const StepStandaloneCompliance: React.FC<StepStandaloneComplianceProps> = ({
  onReturnToHub,
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<TargetMarket>("United Kingdom");

  const result = calculateReadinessScore({
    homeMarket: "India",
    industry: "Textiles & Apparel",
    targetMarket: selectedCorridor,
    exportRevenue: "$100k-$1M",
    exportExperience: "Export to 1-2 markets",
  });

  const checklist = result.complianceChecklist.slice(0, 4);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Title */}
      <div className="w-full text-left mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-[#FF4D1C]" />
          <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#0A0A0A]">
            Tier 2 Standalone Diagnostic
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
          Regulatory Compliance Navigator
        </h1>
        <p className="font-body text-base sm:text-lg text-[#706E6B] font-light leading-relaxed">
          Select a corridor to view bilateral tariffs, mandatory certifications, and local filing lead times.
        </p>
      </div>

      {/* Corridor Selector Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
        {CORRIDORS.map((c) => {
          const isSelected = selectedCorridor === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCorridor(c.id)}
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center text-center ${
                isSelected
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md -translate-y-0.5"
                  : "bg-white text-[#0A0A0A] border-black/10 hover:border-black/30 hover:bg-black/[0.02]"
              }`}
            >
              <span className="text-2xl mb-1">{c.flag}</span>
              <span className="font-display font-bold text-xs sm:text-sm leading-tight">
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Corridor Summary Card */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm mb-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#FF4D1C]">
            ACTIVE CORRIDOR: INDIA → {selectedCorridor.toUpperCase()}
          </span>
          <span className="font-mono-data text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/5 text-[#0A0A0A]">
            Complexity: {result.regulatoryComplexity}
          </span>
        </div>
        <p className="font-body text-xs sm:text-sm text-[#706E6B] leading-relaxed">
          {result.corridorSummary}
        </p>
      </div>

      {/* Checklist Items */}
      <div className="w-full space-y-3 mb-10 text-left">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col gap-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#0A0A0A]">
                  {item.title}
                </h3>
              </div>
              <span className="font-mono-data text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded bg-black/5 text-[#0A0A0A] shrink-0">
                {item.mandatory ? "Mandatory" : "Recommended"}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#706E6B] pl-7">
              {item.description}
            </p>
            <div className="flex items-center gap-1.5 pl-7 pt-1 font-mono-data text-xs text-[#706E6B]">
              <Clock className="h-3.5 w-3.5 text-[#FF4D1C]" />
              <span>Est. turnaround: ~{item.estimatedDays} business days</span>
            </div>
          </div>
        ))}
      </div>

      {/* Single Return Button */}
      <button
        type="button"
        onClick={onReturnToHub}
        className="w-full sm:w-auto min-w-[280px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-translate-x-1 transition-all" />
        <span>Return to Options Hub</span>
      </button>
    </div>
  );
};
