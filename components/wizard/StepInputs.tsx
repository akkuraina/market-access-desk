"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSelectMarket = (market: TargetMarket) => {
    setSelectedMarket(market);
    if (selectedIndustry) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onComplete(market, selectedIndustry);
      }, 250);
    }
  };

  const handleSelectIndustry = (industry: Industry) => {
    setSelectedIndustry(industry);
    if (selectedMarket) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onComplete(selectedMarket, industry);
      }, 250);
    }
  };

  const selectionCount = (selectedMarket ? 1 : 0) + (selectedIndustry ? 1 : 0);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Editorial Headline with Clear Hierarchy */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08] mb-3">
        Select target expansion corridor &amp; industry
      </h1>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-8 max-w-xl">
        Select both a destination market and product sector to generate your instant readiness diagnostic ({selectionCount} of 2 chosen).
      </p>

      {/* Row 1: Target Expansion Market */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            1. Target Market
          </span>
          {selectedMarket && (
            <span className="font-mono-data text-xs text-[#0A0A0A] font-semibold flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#FF4D1C]" /> Selected: {selectedMarket}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {MARKETS.map((m) => {
            const isSelected = selectedMarket === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMarket(m.id)}
                className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border-2 transition-all duration-150 ${
                  isSelected
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md -translate-y-1"
                    : "bg-white text-[#0A0A0A] border-black/10 hover:border-black/30 hover:bg-black/[0.02]"
                }`}
              >
                <span className="text-3xl sm:text-4xl mb-2">{m.flag}</span>
                <span className="font-display font-bold text-base sm:text-lg leading-tight">
                  {m.label}
                </span>
                <span
                  className={`font-mono-data text-xs mt-1 ${
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
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            2. Industry Sector
          </span>
          {selectedIndustry && (
            <span className="font-mono-data text-xs text-[#0A0A0A] font-semibold flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#FF4D1C]" /> Selected: {selectedIndustry}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => handleSelectIndustry(ind.id)}
                className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border-2 transition-all duration-150 ${
                  isSelected
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md -translate-y-1"
                    : "bg-white text-[#0A0A0A] border-black/10 hover:border-black/30 hover:bg-black/[0.02]"
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-2">{ind.icon}</span>
                <span className="font-display font-bold text-sm sm:text-base leading-tight">
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
