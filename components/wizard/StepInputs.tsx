"use client";

import React, { useState, useEffect } from "react";
import { TargetMarket, Industry } from "@/lib/readinessScore";
import { Check } from "lucide-react";

interface StepInputsProps {
  onComplete: (market: TargetMarket, industry: Industry) => void;
  defaultMarket?: TargetMarket | null;
  defaultIndustry?: Industry | null;
}

const MARKETS: { id: TargetMarket; label: string; flag: string; currency: string }[] = [
  { id: "United Kingdom", label: "UK", flag: "🇬🇧", currency: "GBP" },
  { id: "United States", label: "USA", flag: "🇺🇸", currency: "USD" },
  { id: "UAE", label: "UAE", flag: "🇦🇪", currency: "AED" },
  { id: "Singapore", label: "Singapore", flag: "🇸🇬", currency: "SGD" },
  { id: "Germany", label: "Germany", flag: "🇩🇪", currency: "EUR" },
];

const INDUSTRIES: { id: Industry; label: string; icon: string }[] = [
  { id: "Textiles & Apparel", label: "Textiles & Apparel", icon: "🧵" },
  { id: "Electronics & Hardware", label: "Electronics & Hardware", icon: "⚡" },
  { id: "Software & IT Services", label: "Software & IT", icon: "💻" },
  { id: "Pharmaceuticals & Healthcare", label: "Pharma & Health", icon: "💊" },
  { id: "Agriculture & Food Products", label: "Agri & Food", icon: "🌾" },
];

export const StepInputs: React.FC<StepInputsProps> = ({
  onComplete,
  defaultMarket = null,
  defaultIndustry = null,
}) => {
  const [selectedMarket, setSelectedMarket] = useState<TargetMarket | null>(defaultMarket);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(defaultIndustry);

  const handleSelectMarket = (market: TargetMarket) => {
    setSelectedMarket(market);
    if (selectedIndustry) {
      // Auto advance immediately
      onComplete(market, selectedIndustry);
    }
  };

  const handleSelectIndustry = (industry: Industry) => {
    setSelectedIndustry(industry);
    if (selectedMarket) {
      // Auto advance immediately
      onComplete(selectedMarket, industry);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-4">
      {/* Clear Headline */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-2">
        Select target expansion corridor & industry
      </h1>
      <p className="font-body text-xs sm:text-sm text-[#706E6B] mb-8 max-w-lg">
        Tap your destination market and product sector to generate your instant diagnostic.
      </p>

      {/* Row 1: Target Expansion Market */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="font-mono-data text-[11px] uppercase tracking-wider text-[#706E6B] font-semibold">
            1. Target Market
          </span>
          {selectedMarket && (
            <span className="font-mono-data text-[11px] text-[#0A0A0A] font-medium flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-[#FF4D1C]" /> Selected: {selectedMarket}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {MARKETS.map((m) => {
            const isSelected = selectedMarket === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMarket(m.id)}
                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-150 ${
                  isSelected
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md -translate-y-0.5"
                    : "bg-white text-[#0A0A0A] border-black/10 hover:border-black/30 hover:bg-black/[0.02]"
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1">{m.flag}</span>
                <span className="font-display font-bold text-sm sm:text-base leading-tight">
                  {m.label}
                </span>
                <span
                  className={`font-mono-data text-[10px] mt-0.5 ${
                    isSelected ? "text-white/70" : "text-[#706E6B]"
                  }`}
                >
                  {m.currency}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Industry Sector */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="font-mono-data text-[11px] uppercase tracking-wider text-[#706E6B] font-semibold">
            2. Industry Sector
          </span>
          {selectedIndustry && (
            <span className="font-mono-data text-[11px] text-[#0A0A0A] font-medium flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-[#FF4D1C]" /> Selected: {selectedIndustry}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => handleSelectIndustry(ind.id)}
                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-150 ${
                  isSelected
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md -translate-y-0.5"
                    : "bg-white text-[#0A0A0A] border-black/10 hover:border-black/30 hover:bg-black/[0.02]"
                }`}
              >
                <span className="text-xl sm:text-2xl mb-1">{ind.icon}</span>
                <span className="font-display font-bold text-xs sm:text-sm leading-tight">
                  {ind.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
