"use client";

import React from "react";
import { TargetMarket } from "@/lib/readinessScore";
import { ArrowRight, Zap, Percent, Landmark, ArrowLeft } from "lucide-react";

interface StepTier3SettlementProps {
  targetMarket: TargetMarket;
  onNext: () => void;
  onReturnToHub?: () => void;
  isExistingCustomer?: boolean | null;
  userName?: string;
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
  onReturnToHub,
  isExistingCustomer,
  userName,
}) => {
  const details = SETTLEMENT_DETAILS[targetMarket] || SETTLEMENT_DETAILS["United Kingdom"];
  const displayName = userName ? userName.trim().split(" ")[0] : null;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Title */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
        Tier 3: Settlement Setup
      </h1>
      <p className="font-display font-semibold text-xl sm:text-2xl text-[#0A0A0A] mb-2">
        {displayName
          ? `Ready to configure, ${displayName} — your ${targetMarket} account`
          : `Your ${targetMarket} settlement account is ready to configure.`}
      </p>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-10 max-w-xl">
        Direct domestic clearing eliminates correspondent intermediary banking fees and foreign exchange margin drag.
      </p>

      {/* 3 Metric Cards with Large Mono Stats */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
        <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#FF4D1C]">
              <Landmark className="h-4 w-4" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                Local Rails
              </span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-[#0A0A0A] mb-1 block">
              {details.rails}
            </span>
          </div>
          <span className="font-body text-xs text-[#706E6B] mt-3">
            {details.currency}
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <Percent className="h-4 w-4" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                Fee Advantage
              </span>
            </div>
            <span className="font-mono-data font-bold text-2xl sm:text-3xl text-emerald-700 mb-1 block">
              {details.savings}
            </span>
          </div>
          <span className="font-body text-xs text-[#706E6B] mt-3">
            Zero correspondent wire cuts
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Zap className="h-4 w-4" />
              <span className="font-mono-data text-xs uppercase tracking-wider font-semibold text-[#706E6B]">
                Clearing Speed
              </span>
            </div>
            <span className="font-mono-data font-bold text-2xl sm:text-3xl text-[#0A0A0A] mb-1 block">
              {details.speed}
            </span>
          </div>
          <span className="font-body text-xs text-[#706E6B] mt-3">
            Direct INR settlement
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      {isExistingCustomer ? (
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
            onClick={onNext}
            className="flex-1 group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-white text-[#0A0A0A] font-display font-semibold text-lg border-2 border-black/10 hover:border-black shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Preview Ecosystem Roadmap</span>
            <ArrowRight className="h-5 w-5 text-black/40 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>Continue to Ecosystem Preview</span>
          <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      )}

      {onReturnToHub && !isExistingCustomer && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onReturnToHub}
            className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
          >
            ← Return to Options Hub
          </button>
        </div>
      )}
    </div>
  );
};
