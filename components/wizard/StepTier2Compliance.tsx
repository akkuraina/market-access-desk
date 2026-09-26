"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ReadinessResult, ComplianceItem } from "@/lib/readinessScore";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronDown,
  Building2,
  FileCheck2,
  Sparkles,
} from "lucide-react";

interface StepTier2ComplianceProps {
  result: ReadinessResult;
  onNext: () => void;
  onReturnToHub?: () => void;
  userName?: string;
}

function getComplianceItemDeepDetails(item: ComplianceItem, corridorCode: string): {
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

  if (titleLower.includes("escrow") || titleLower.includes("settlement") || titleLower.includes("routing") || titleLower.includes("iban") || titleLower.includes("account")) {
    return {
      authority: "TradePe Direct-Clearing Rails & Destination Central Banking Network",
      scope:
        "Dedicated virtual IBAN and domestic clearing rail provisioning in local tender (GBP/USD/AED/SGD/EUR).",
      requirements: "Standard KYC entity verification, active export billing bank mandate, and designated Indian realization bank linkage.",
      actionGuidance:
        "Enables foreign corporate buyers to pay via their standard domestic payment rails (Faster Payments, ACH, FTS, FAST, SEPA), bypassing expensive international correspondent wire deductions.",
    };
  }

  return {
    authority: "Destination Jurisdictional Regulatory Agency",
    scope: item.description,
    requirements: "Standard bilateral commercial invoice, packing list, certificate of origin, and transport bill of lading.",
    actionGuidance:
      "Essential regulatory prerequisite to guarantee smooth customs border clearance and compliance with bilateral trade guidelines.",
  };
}

export const StepTier2Compliance: React.FC<StepTier2ComplianceProps> = ({
  result,
  onNext,
  onReturnToHub,
  userName,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const checklist = result.complianceChecklist.slice(0, 4);
  const displayName = userName ? userName.trim().split(" ")[0] : null;

  const toggleItem = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Title */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
        {displayName ? `${displayName}'s Compliance Roadmap` : "Compliance Navigator"}
      </h1>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-8">
        Mandatory regulatory filings and customs prerequisites for {result.corridorCode}
      </p>

      {/* Checklist Items with Accordion Details */}
      <div className="w-full space-y-3.5 mb-10 text-left">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            Corridor Filing Prerequisites ({checklist.length} Mandatory &amp; Key Filings)
          </span>
          <span className="font-mono-data text-[11px] text-[#706E6B]">
            Tap any item for authority &amp; filing scope
          </span>
        </div>

        {checklist.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const details = getComplianceItemDeepDetails(item, result.corridorCode);

          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isExpanded ? "border-[#0A0A0A] shadow-md" : "border-black/10 hover:border-black/30"
              }`}
            >
              {/* Header Button */}
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
                  <span
                    className={`font-mono-data text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded ${
                      item.mandatory
                        ? "bg-black/5 text-[#0A0A0A]"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
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

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="compliance-content"
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
                      {/* Authority & Scope */}
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

                      {/* Scope & Why required */}
                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Why This Filing Is Required
                        </span>
                        <p className="font-body text-[#0A0A0A] leading-relaxed">
                          {details.actionGuidance}
                        </p>
                      </div>

                      {/* Required Documents / Action */}
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

      {/* Single Big Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <span>Set up your settlement account</span>
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
