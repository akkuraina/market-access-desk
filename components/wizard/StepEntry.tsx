"use client";

import React from "react";
import { ArrowRight, UserCheck, Sparkles } from "lucide-react";

interface StepEntryProps {
  onSelect: (isExistingCustomer: boolean) => void;
}

export const StepEntry: React.FC<StepEntryProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20">
      {/* Editorial Headline with Elevated Type Scale */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08] mb-12 sm:mb-16">
        Are you already working with TradePe?
      </h1>

      {/* Exactly Two Large Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center">
        {/* Yes Button */}
        <button
          type="button"
          onClick={() => onSelect(true)}
          className="flex-1 group relative flex flex-col sm:flex-row items-center justify-between p-7 sm:p-8 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-1 text-left"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-[#FF4D1C] transition-colors">
              <UserCheck className="h-6 w-6" />
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Yes, I&apos;m a TradePe customer
            </span>
          </div>
          <ArrowRight className="h-6 w-6 text-white/50 group-hover:text-white group-hover:translate-x-1.5 transition-all mt-4 sm:mt-0" />
        </button>

        {/* No Button */}
        <button
          type="button"
          onClick={() => onSelect(false)}
          className="flex-1 group relative flex flex-col sm:flex-row items-center justify-between p-7 sm:p-8 rounded-2xl bg-white text-[#0A0A0A] border-2 border-black/10 hover:border-[#0A0A0A] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-1 text-left"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/5 text-[#0A0A0A] group-hover:bg-[#FF4D1C] group-hover:text-white transition-colors">
              <Sparkles className="h-6 w-6" />
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] tracking-tight">
              No, I&apos;m new here
            </span>
          </div>
          <ArrowRight className="h-6 w-6 text-black/40 group-hover:text-[#0A0A0A] group-hover:translate-x-1.5 transition-all mt-4 sm:mt-0" />
        </button>
      </div>
    </div>
  );
};
