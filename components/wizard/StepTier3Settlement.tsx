"use client";

import React from "react";
import { TargetMarket } from "@/lib/readinessScore";
import { ArrowRight, Zap, ShieldCheck, Percent, Landmark } from "lucide-react";

interface StepTier3SettlementProps {
  targetMarket: TargetMarket;
  onNext: () => void;
}

const SETTLEMENT_DETAILS: Record<
  TargetMarket,
  {
    currency: string;
    currencyCode: string;
    rails: string;
    speed: string;
    savings: string;
    description: string;
  }
> = {
  "United Kingdom": {
    currency: "British Pound (£)",
    currencyCode: "GBP",
    rails: "Faster Payments & BACS",
    speed: "Instant – T+1",
    savings: "65% vs SWIFT Wire",
    description: "Receive GBP locally with dedicated Sort Code and Account Number.",
  },
  "United States": {
    currency: "US Dollar ($)",
    currencyCode: "USD",
    rails: "Fedwire & ACH Clearing",
    speed: "Same-Day / T+0",
    savings: "60% vs International Wire",
    description: "Collect USD directly through US ABA routing numbers without correspondent deductions.",
  },
  UAE: {
    currency: "UAE Dirham (AED)",
    currencyCode: "AED",
    rails: "UAE Funds Transfer System (FTS)",
    speed: "Instant (T+0)",
    savings: "70% vs SWIFT",
    description: "Virtual UAE IBAN to collect Dirhams locally and hedge currency repatriation.",
  },
  Singapore: {
    currency: "Singapore Dollar (S$)",
    currencyCode: "SGD",
    rails: "FAST & GIRO Network",
    speed: "Real-time Instant",
    savings: "65% vs Wire",
    description: "Domestic SGD collection rails with real-time conversion locking.",
  },
  Germany: {
    currency: "Euro (€)",
    currencyCode: "EUR",
    rails: "SEPA & SEPA Instant",
    speed: "Instant – T+1",
    savings: "60% vs SWIFT Wire",
    description: "Dedicated European virtual IBAN for frictionless SEPA credit transfers.",
  },
};

export const StepTier3Settlement: React.FC<StepTier3SettlementProps> = ({
  targetMarket,
  onNext,
}) => {
  const details = SETTLEMENT_DETAILS[targetMarket] || SETTLEMENT_DETAILS["United Kingdom"];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-1">
        Tier 3: Settlement Setup
      </h1>
      <p className="font-body text-sm sm:text-base font-medium text-[#0A0A0A] mb-1">
        Your {targetMarket} settlement account is ready to configure.
      </p>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-6">
        Direct domestic clearing eliminates correspondent intermediary banking fees.
      </p>

      {/* 3 Metric Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-1.5 text-[#FF4D1C]">
            <Landmark className="h-4 w-4" />
            <span className="font-mono-data text-[10px] uppercase tracking-wider font-semibold text-[#706E6B]">
              Rails
            </span>
          </div>
          <span className="font-display font-bold text-sm text-[#0A0A0A] mb-1">
            {details.rails}
          </span>
          <span className="font-body text-[11px] text-[#706E6B]">
            {details.currency}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-600">
            <Percent className="h-4 w-4" />
            <span className="font-mono-data text-[10px] uppercase tracking-wider font-semibold text-[#706E6B]">
              Fee Advantage
            </span>
          </div>
          <span className="font-display font-bold text-sm text-[#0A0A0A] mb-1">
            {details.savings}
          </span>
          <span className="font-body text-[11px] text-[#706E6B]">
            Zero correspondent wire cuts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-1.5 text-blue-600">
            <Zap className="h-4 w-4" />
            <span className="font-mono-data text-[10px] uppercase tracking-wider font-semibold text-[#706E6B]">
              Clearing Speed
            </span>
          </div>
          <span className="font-display font-bold text-sm text-[#0A0A0A] mb-1">
            {details.speed}
          </span>
          <span className="font-body text-[11px] text-[#706E6B]">
            Same-day INR settlement
          </span>
        </div>
      </div>

      {/* Single Big Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-base sm:text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <span>Continue to Ecosystem Preview</span>
        <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
