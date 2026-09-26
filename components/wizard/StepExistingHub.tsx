"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2, FileText, TrendingUp, Network, ArrowRight, RotateCcw } from "lucide-react";

export type ExistingHubOption =
  | "expand-market"
  | "check-compliance"
  | "trade-insights"
  | "partner-network";

interface StepExistingHubProps {
  userName: string;
  onSelectOption: (option: ExistingHubOption) => void;
  onRestart: () => void;
}

export const StepExistingHub: React.FC<StepExistingHubProps> = ({
  userName,
  onSelectOption,
  onRestart,
}) => {
  const firstName = userName.trim().split(" ")[0] || "there";

  const options: {
    id: ExistingHubOption;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    tier: string;
    highlightColor: string;
  }[] = [
    {
      id: "expand-market",
      tier: "Tier 1 → Tier 3",
      title: "Expand into a new market",
      description:
        "Run an end-to-end readiness diagnostic, compliance roadmap, and settlement rails setup for a new global corridor.",
      icon: Globe2,
      badge: "Full Journey",
      highlightColor: "group-hover:border-[#FF4D1C]",
    },
    {
      id: "check-compliance",
      tier: "Tier 2 Standalone",
      title: "Check regulatory compliance",
      description:
        "Instantly explore mandatory customs filings, bilateral treaty tariffs (CEPA/CECA), and local tax registrations.",
      icon: FileText,
      badge: "Diagnostic",
      highlightColor: "group-hover:border-[#0A0A0A]",
    },
    {
      id: "trade-insights",
      tier: "Tier 5 Telemetry",
      title: "View your trade growth insights",
      description:
        "Inspect your quarterly USD/INR volume velocity, live settlement benchmarks, and AI-recommended expansion routes.",
      icon: TrendingUp,
      badge: "Live Telemetry",
      highlightColor: "group-hover:border-emerald-600",
    },
    {
      id: "partner-network",
      tier: "Tier 4 Roadmap",
      title: "Explore the Partner Network",
      description:
        "Preview direct commercial matchmaking with accredited Tier-1 overseas distributors and bonded port warehousing.",
      icon: Network,
      badge: "Phase 2 Preview",
      highlightColor: "group-hover:border-[#0A0A0A]",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Personalized Greeting with Considered Fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full text-left mb-8 sm:mb-12"
      >
        <span className="font-mono-data text-xs uppercase tracking-widest text-[#FF4D1C] font-semibold block mb-2">
          TRADEPE CLIENT PORTAL
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-[1.08] mb-3">
          Hello, {firstName}.
        </h1>
        <p className="font-body text-base sm:text-xl text-[#706E6B] font-light leading-relaxed max-w-2xl">
          Welcome to Market Access Desk. How can we help you today?
        </p>
      </motion.div>

      {/* 4 Large Premium Option Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectOption(opt.id)}
              className={`group relative text-left p-6 sm:p-7 rounded-2xl bg-white border-2 border-black/10 shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${opt.highlightColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B]">
                      {opt.tier}
                    </span>
                  </div>
                  <span className="font-mono-data text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-black/5 text-[#0A0A0A]">
                    {opt.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] tracking-tight mb-2 group-hover:text-[#FF4D1C] transition-colors">
                  {opt.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#706E6B] font-light leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[#0A0A0A] group-hover:text-[#FF4D1C] transition-colors">
                <span>Launch flow</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Quiet Secondary Exit Affordance */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Restart demo</span>
        </button>
      </div>
    </div>
  );
};
