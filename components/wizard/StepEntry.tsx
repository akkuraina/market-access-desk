"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, UserCheck, Sparkles } from "lucide-react";

interface StepEntryProps {
  onSelect: (isExistingCustomer: boolean) => void;
}

export const StepEntry: React.FC<StepEntryProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8">
      {/* Single Short Headline */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] tracking-tight mb-10 sm:mb-12">
        Are you already working with TradePe?
      </h1>

      {/* Exactly Two Large Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        {/* Yes Button */}
        <button
          type="button"
          onClick={() => onSelect(true)}
          className="flex-1 group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-7 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-[#FF4D1C] transition-colors">
              <UserCheck className="h-5 w-5" />
            </span>
            <span className="font-display font-semibold text-lg sm:text-xl text-white">
              Yes, I&apos;m a TradePe customer
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all mt-3 sm:mt-0" />
        </button>

        {/* No Button */}
        <button
          type="button"
          onClick={() => onSelect(false)}
          className="flex-1 group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-7 rounded-2xl bg-white text-[#0A0A0A] border-2 border-black/10 hover:border-[#0A0A0A] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/5 text-[#0A0A0A] group-hover:bg-[#FF4D1C] group-hover:text-white transition-colors">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display font-semibold text-lg sm:text-xl text-[#0A0A0A]">
              No, I&apos;m new here
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-black/40 group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-all mt-3 sm:mt-0" />
        </button>
      </div>
    </div>
  );
};
