"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TargetMarket, calculateReadinessScore, ComplianceItem } from "@/lib/readinessScore";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  Building2,
  FileCheck2,
} from "lucide-react";

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

function getComplianceItemDeepDetails(item: ComplianceItem): {
  authority: string;
  scope: string;
  requirements: string;
  actionGuidance: string;
} {
  const titleLower = item.title.toLowerCase();

  if (titleLower.includes("lut") || titleLower.includes("letter of undertaking")) {
    return {
      authority: "Central Board of Indirect Taxes & Customs (CBIC, India)",
      scope:
        "Filing submitted annually through the GST common portal to classify international shipments as zero-rated exports.",
      requirements: "Valid active GSTIN, authorized signatory Digital Signature Certificate (DSC), and clean tax filing track record.",
      actionGuidance:
        "Eliminates the requirement to pay upfront Integrated GST (IGST) on exports, preventing cash lockup and avoiding multi-month government refund cycles.",
    };
  }

  if (titleLower.includes("cepa") || titleLower.includes("ceca") || titleLower.includes("origin") || titleLower.includes("coo")) {
    return {
      authority: "Directorate General of Foreign Trade (DGFT) / Authorized Export Inspection Council",
      scope:
        "Official certification validating that product inputs meet domestic value-addition criteria stipulated under the bilateral free trade treaty.",
      requirements: "BOM (Bill of Materials) breakdown, manufacturer declaration, factory inspection records, and HS Code classification verification.",
      actionGuidance:
        "Directly unlocks 0% preferential customs tariff clearance in the destination port, providing an immediate 5% to 10% landed cost advantage over non-treaty competitors.",
    };
  }

  if (titleLower.includes("eori") || titleLower.includes("customs") || titleLower.includes("cbp") || titleLower.includes("tradenet") || titleLower.includes("entity")) {
    return {
      authority: "Destination Customs & Border Security Administration",
      scope:
        "Unique commercial identifier required to submit electronic import declarations, clear cargo manifests, and process duty drawback reconciliations.",
      requirements: "Entity registration certificate, local Importer of Record (IOR) assignment, and digital customs portal onboarding.",
      actionGuidance:
        "Mandatory for all commercial freight entering port boundaries; without active pre-registration, shipments face port demurrage detention and cargo release holds.",
    };
  }

  if (titleLower.includes("vat") || titleLower.includes("tax")) {
    return {
      authority: "Destination Ministry of Finance / National Revenue & Tax Authority",
      scope:
        "Non-resident commercial VAT/tax registration required when supplying goods on Delivery Duty Paid (DDP) terms or holding localized consignment stock.",
      requirements: "Corporate entity documentation, bank certificate, authorized tax representative appointment, and estimated annual turnover declaration.",
      actionGuidance:
        "Allows legally charging and reclaiming local destination VAT while issuing compliant commercial tax invoices directly to local buyers.",
    };
  }

  return {
    authority: "TradePe Direct-Clearing Rails & Destination Central Banking Network",
    scope: item.description,
    requirements: "Standard KYC entity verification, active export billing bank mandate, and designated Indian realization bank linkage.",
    actionGuidance:
      "Enables foreign corporate buyers to pay via standard domestic payment rails, bypassing expensive international correspondent wire deductions.",
  };
}

export const StepStandaloneCompliance: React.FC<StepStandaloneComplianceProps> = ({
  onReturnToHub,
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<TargetMarket>("United Kingdom");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

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
            Regulatory Diagnostic Guide
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
          Compliance Navigator
        </h1>
        <p className="font-body text-base sm:text-lg text-[#706E6B] font-light leading-relaxed">
          Select a corridor to view bilateral tariffs, mandatory certifications, and local filing lead times.
        </p>
      </div>

      {/* Corridor Selector Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
        {CORRIDORS.map((c) => {
          const isSelected = selectedCorridor === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSelectedCorridor(c.id);
                setExpandedIndex(null);
              }}
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

      {/* Interactive Expandable Checklist Items */}
      <div className="w-full space-y-3 mb-10 text-left">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            Mandatory &amp; Key Filings ({checklist.length})
          </span>
          <span className="font-mono-data text-[11px] text-[#706E6B]">
            Tap any item for authority &amp; prerequisites
          </span>
        </div>

        {checklist.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const details = getComplianceItemDeepDetails(item);

          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isExpanded ? "border-[#0A0A0A] shadow-md" : "border-black/10 hover:border-black/30"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF4D1C] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-base sm:text-lg text-[#0A0A0A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#706E6B] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-2 mt-0.5">
                  <span className="font-mono-data text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded bg-black/5 text-[#0A0A0A]">
                    {item.mandatory ? "Mandatory" : "Recommended"}
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

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="standalone-compliance-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.05 : 0.25,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-black/5 bg-[#FAF7F0]/40 space-y-3.5 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-white border border-black/10">
                          <div className="flex items-center gap-1.5 text-[#706E6B] mb-1">
                            <Building2 className="h-3.5 w-3.5 text-[#FF4D1C]" />
                            <span className="font-mono-data text-[11px] uppercase font-semibold">
                              Regulatory Authority
                            </span>
                          </div>
                          <span className="font-body text-xs text-[#0A0A0A] font-medium block">
                            {details.authority}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-black/10">
                          <div className="flex items-center gap-1.5 text-[#706E6B] mb-1">
                            <Clock className="h-3.5 w-3.5 text-[#FF4D1C]" />
                            <span className="font-mono-data text-[11px] uppercase font-semibold">
                              Standard Lead Time
                            </span>
                          </div>
                          <span className="font-mono-data text-xs text-[#0A0A0A] font-semibold block">
                            ~{item.estimatedDays} business days turnaround
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Why This Filing Is Required
                        </span>
                        <p className="font-body text-[#0A0A0A] leading-relaxed">
                          {details.actionGuidance}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-black/[0.03] border border-black/5">
                        <div className="flex items-center gap-1.5 text-[#0A0A0A] font-semibold mb-1">
                          <FileCheck2 className="h-3.5 w-3.5 text-[#FF4D1C]" />
                          <span className="font-mono-data text-[11px] uppercase">
                            Required Prerequisites &amp; Documents
                          </span>
                        </div>
                        <p className="font-body text-xs text-[#706E6B] leading-relaxed">
                          {details.requirements}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
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
