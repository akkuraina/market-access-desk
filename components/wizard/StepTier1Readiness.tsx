"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ReadinessResult, ScoreFactor } from "@/lib/readinessScore";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
  Sparkles,
} from "lucide-react";

interface StepTier1ReadinessProps {
  result: ReadinessResult;
  onNext: () => void;
  onReturnToHub?: () => void;
  userName?: string;
}

function getFactorDetailExplanation(factor: ScoreFactor): {
  whatItMeasures: string;
  impactReason: string;
  howToImprove: string;
} {
  switch (factor.category) {
    case "Corridor Friction":
      return {
        whatItMeasures:
          "Evaluates bilateral trade treaties, preferential tariff concessions, customs pre-clearance protocols, and cross-border regulatory friction between origin and destination.",
        impactReason:
          factor.points >= 0
            ? "Active bilateral agreements (such as CEPA or CECA) eliminate standard import duties on over 90% of tariff lines, significantly reducing landed cost and border holding times."
            : "Destination customs enforces strict non-tariff barriers, mandatory continuous entry bonds, or complex safety filings that increase clearance lead times.",
        howToImprove:
          "Submit digital Certificate of Origin filings via trade authority portals and leverage pre-cleared direct electronic customs routing.",
      };
    case "Industry Regulation":
      return {
        whatItMeasures:
          "Assesses destination product compliance directives, safety testing standards (CE/UKCA/RoHS/FDA), phytosanitary mandates, and licensing requirements.",
        impactReason:
          factor.points >= 0
            ? "Your product category benefits from digital/zero-physical inspection regimes or mature standard harmonizations that allow rapid consignment clearance."
            : "Requires mandatory destination laboratory testing, health authority dossier registrations, or specialized handling verification prior to commercial release.",
        howToImprove:
          "Pre-register technical compliance files with destination authorities and obtain accredited third-party test conformity certificates.",
      };
    case "Experience":
      return {
        whatItMeasures:
          "Measures operational fluency with international documentation, customs shipping bills, currency hedging, and cross-border logistics execution.",
        impactReason:
          factor.points > 0
            ? "Prior multi-market export history dramatically reduces operational error rates in commercial invoicing, bill of lading documentation, and bank realization."
            : "First-time exporters face an initial learning curve establishing shipping documentation, LUT tax filings, and local distribution channels.",
        howToImprove:
          "Standardize digital documentation workflows and execute initial consignments under guided customs escrow support.",
      };
    case "Capital & Scale":
      return {
        whatItMeasures:
          "Evaluates working capital liquidity, foreign exchange volatility buffers, and capacity to support distributor payment cycles.",
        impactReason:
          factor.points >= 8
            ? "Substantial export liquidity allows offering flexible commercial payment terms and absorbing initial overseas registration deposits without strain."
            : "Early-stage capital allocation requires phased deployment across customs retainers, testing certifications, and currency conversion buffers.",
        howToImprove:
          "Utilize TradePe direct local currency clearing to eliminate 60-70% of intermediary wire fees and accelerate invoice cash realization.",
      };
    default:
      return {
        whatItMeasures: "Evaluates operational, legal, and banking parameters governing international trade clearance.",
        impactReason: factor.description,
        howToImprove: "Align documentation and local banking routing with TradePe direct-clearing protocols.",
      };
  }
}

export const StepTier1Readiness: React.FC<StepTier1ReadinessProps> = ({
  result,
  onNext,
  onReturnToHub,
  userName,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const topFactors = result.factors.slice(0, 3);
  const displayName = userName ? userName.trim().split(" ")[0] : null;

  const toggleFactor = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

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
        {displayName ? `Nice work, ${displayName}. Here's your score` : "Market Readiness Score"}
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

      {/* Interactive Expandable Factors List */}
      <div className="w-full space-y-3 mb-10 text-left">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            Key Scoring Drivers
          </span>
          <span className="font-mono-data text-[11px] text-[#706E6B]">
            Tap any factor to inspect diagnostic detail
          </span>
        </div>

        {topFactors.map((factor, idx) => {
          const isExpanded = expandedIndex === idx;
          const details = getFactorDetailExplanation(factor);

          return (
            <div
              key={idx}
              className={`rounded-2xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isExpanded ? "border-[#0A0A0A] shadow-md" : "border-black/10 hover:border-black/30"
              }`}
            >
              {/* Header Button */}
              <button
                type="button"
                onClick={() => toggleFactor(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {factor.impact === "positive" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                  )}
                  <span className="font-display font-semibold text-base sm:text-lg text-[#0A0A0A] truncate">
                    {factor.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span
                    className={`font-mono-data text-sm font-bold ${
                      factor.points >= 0 ? "text-emerald-700" : "text-orange-700"
                    }`}
                  >
                    {factor.points >= 0 ? `+${factor.points} pts` : `${factor.points} pts`}
                  </span>
                  <div
                    className={`p-1 rounded-full bg-black/5 text-[#0A0A0A] transition-transform duration-200 ${
                      isExpanded ? "rotate-180 bg-[#0A0A0A] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="factor-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.05 : 0.25,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-black/5 bg-[#FAF7F0]/40 space-y-3 text-xs sm:text-sm">
                      {/* What it measures */}
                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Diagnostic Scope
                        </span>
                        <p className="font-body text-[#0A0A0A] leading-relaxed">
                          {details.whatItMeasures}
                        </p>
                      </div>

                      {/* Why it impacts score */}
                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Score Impact Analysis
                        </span>
                        <p className="font-body text-[#706E6B] leading-relaxed">
                          {details.impactReason}
                        </p>
                      </div>

                      {/* How to improve */}
                      <div className="p-3 rounded-xl bg-black/[0.03] border border-black/5 flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                        <div className="font-body text-xs text-[#0A0A0A] leading-relaxed">
                          <strong className="font-semibold">Optimization Action:</strong>{" "}
                          {details.howToImprove}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
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
            ← Cancel and return to client portal
          </button>
        </div>
      )}
    </div>
  );
};
