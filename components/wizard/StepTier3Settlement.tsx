"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TargetMarket } from "@/lib/readinessScore";
import {
  ArrowRight,
  Zap,
  Percent,
  Landmark,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Building,
  Coins,
  ExternalLink,
} from "lucide-react";

interface StepTier3SettlementProps {
  targetMarket: TargetMarket;
  onNext: () => void;
  onReturnToHub?: () => void;
  isExistingCustomer?: boolean | null;
  userName?: string;
}

interface SettlementFeatureDetail {
  id: "rails" | "fee" | "speed";
  title: string;
  badge: string;
  shortHighlight: string;
  icon: React.ElementType;
  whatItMeans: string;
  whyItMatters: string;
  concreteBenefit: string;
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
    features: SettlementFeatureDetail[];
  }
> = {
  "United Kingdom": {
    currency: "British Pound (£)",
    currencyCode: "GBP",
    rails: "Faster Payments & BACS",
    speed: "Instant to T+1",
    savings: "65% vs SWIFT Wire",
    description: "Receive GBP locally with dedicated Sort Code and Account Number.",
    features: [
      {
        id: "rails",
        title: "Domestic UK Banking Rails",
        badge: "Faster Payments & BACS",
        shortHighlight: "UK Sort Code & Account No.",
        icon: Landmark,
        whatItMeans:
          "Provisioning of dedicated British Pound virtual account numbers linked directly to the UK clearing house.",
        whyItMatters:
          "UK enterprise buyers treat your invoice as a domestic local supplier transfer rather than an international cross-border remittance.",
        concreteBenefit:
          "Zero international wire delays, zero correspondent bank lifting fees, and immediate receipt confirmation via UK banking portals.",
      },
      {
        id: "fee",
        title: "Zero Correspondent Intermediary Deductions",
        badge: "65% Cost Savings",
        shortHighlight: "Wholesale Institutional FX",
        icon: Percent,
        whatItMeans:
          "Direct clearing eliminates the 2-3 intermediary correspondent banks that traditionally clip $25-$50 plus retail FX spreads off every wire.",
        whyItMatters:
          "Traditional SWIFT wires pass through intermediary clearing banks, causing unpredictable invoice shortfalls and margin erosion.",
        concreteBenefit:
          "Guaranteed full value payment credit with locked wholesale treasury conversion rates directly into INR.",
      },
      {
        id: "speed",
        title: "Accelerated Cash Realization",
        badge: "Instant to T+1 Settlement",
        shortHighlight: "Same-Day Bank Credit",
        icon: Zap,
        whatItMeans:
          "Instant payment notification with automated electronic Bank Realization Certificate (e-BRC) reconciliation.",
        whyItMatters:
          "Standard cross-border bank reconciliation takes 4-7 business days, creating working capital lag and export compliance backlog.",
        concreteBenefit:
          "Funds settle into your designated Indian realization account within hours, complete with automated EDPMS compliance logging.",
      },
    ],
  },
  "United States": {
    currency: "US Dollar ($)",
    currencyCode: "USD",
    rails: "Fedwire & ACH Clearing",
    speed: "Same-Day / T+0",
    savings: "60% vs International Wire",
    description: "Collect USD directly through US ABA routing numbers without correspondent deductions.",
    features: [
      {
        id: "rails",
        title: "US Domestic Fedwire & ACH Network",
        badge: "US ABA Routing & Account",
        shortHighlight: "Direct Fedwire Rails",
        icon: Landmark,
        whatItMeans:
          "Dedicated US Virtual Account with 9-digit ABA routing number operating on the Federal Reserve electronic payments system.",
        whyItMatters:
          "US commercial distributors mandate domestic ACH / Fedwire invoice clearing to fit standard accounts payable accounting software.",
        concreteBenefit:
          "Eliminates foreign bank wire hesitation from US corporate buyers and speeds up invoice approval cycles.",
      },
      {
        id: "fee",
        title: "Elimination of Intermediary SWIFT Fees",
        badge: "60% Cost Reduction",
        shortHighlight: "Interbank Treasury Rates",
        icon: Percent,
        whatItMeans:
          "Direct domestic collection removes correspondent transit banking spreads and incoming wire receipt penalties.",
        whyItMatters:
          "Correspondent intermediary deduction causes invoices to arrive short, requiring manual accounting reconciliations.",
        concreteBenefit:
          "Every dollar invoiced arrives in full, with transparent, upfront foreign exchange conversion rates.",
      },
      {
        id: "speed",
        title: "Same-Day INR Realization",
        badge: "T+0 Clearing Speed",
        shortHighlight: "Direct Hedging Engine",
        icon: Zap,
        whatItMeans:
          "Real-time USD collection with optional automated spot conversion or USD holding in dedicated export accounts.",
        whyItMatters:
          "Avoids the 3-5 day international wire clearing delays common with traditional correspondent banking networks.",
        concreteBenefit:
          "Accelerated working capital liquidity with automated electronic BRC issuance for tax authorities.",
      },
    ],
  },
  UAE: {
    currency: "UAE Dirham (AED)",
    currencyCode: "AED",
    rails: "UAE Funds Transfer System (FTS)",
    speed: "Instant (T+0)",
    savings: "70% vs SWIFT",
    description: "Virtual UAE IBAN to collect Dirhams locally and hedge currency repatriation.",
    features: [
      {
        id: "rails",
        title: "UAE Dedicated Virtual IBAN Rails",
        badge: "UAE Central Bank FTS Rails",
        shortHighlight: "Virtual UAE IBAN (AE...)",
        icon: Landmark,
        whatItMeans:
          "Provisioning of dedicated UAE virtual IBAN accounts clearing directly through the Central Bank UAE Funds Transfer System.",
        whyItMatters:
          "Gulf trading entities and free zone importers require local UAE Dirham transfers without cross-border wire documentation.",
        concreteBenefit:
          "Allows clients to settle in local Dirhams (AED) via local mobile banking or standard domestic corporate transfer.",
      },
      {
        id: "fee",
        title: "Preferential CEPA Corridor Fee Waivers",
        badge: "70% Cost Advantage",
        shortHighlight: "Zero Wire Deduction",
        icon: Percent,
        whatItMeans:
          "Direct bilateral clearing route eliminates multi-hop international SWIFT charges between UAE and Indian banking networks.",
        whyItMatters:
          "Standard SWIFT transfers between UAE and India frequently incur $35-$60 correspondent bank cuts plus retail FX spread markups.",
        concreteBenefit:
          "Maximized net export earnings with automated AED/INR wholesale conversion rates.",
      },
      {
        id: "speed",
        title: "Instant Same-Day Settlement",
        badge: "Real-Time T+0 Clearance",
        shortHighlight: "Immediate INR Remittance",
        icon: Zap,
        whatItMeans:
          "Direct linkage into Indian NEFT/RTGS rails for immediate credit into your designated home bank account.",
        whyItMatters:
          "Same-day settlement prevents foreign exchange rate slippage and improves exporter balance sheet velocity.",
        concreteBenefit:
          "Guaranteed same-day bank realization with automated digital Foreign Inward Remittance Certificate (FIRC) generation.",
      },
    ],
  },
  Singapore: {
    currency: "Singapore Dollar (S$)",
    currencyCode: "SGD",
    rails: "FAST & GIRO Network",
    speed: "Real-time Instant",
    savings: "65% vs Wire",
    description: "Domestic SGD collection rails with real-time conversion locking.",
    features: [
      {
        id: "rails",
        title: "Singapore FAST & GIRO Rails",
        badge: "MAS Cleared Virtual Account",
        shortHighlight: "FAST Electronic Clearing",
        icon: Landmark,
        whatItMeans:
          "Direct Singapore banking clearing accounts supporting FAST (Fast And Secure Transfers) and PayNow corporate rails.",
        whyItMatters:
          "Southeast Asian multinational regional treasuries execute B2B supplier payments instantly using domestic Singapore clearing.",
        concreteBenefit:
          "Instant settlement 24/7/365 without international bank operating hour constraints.",
      },
      {
        id: "fee",
        title: "Wholesale Asian FX Routing",
        badge: "65% Savings vs Wire",
        shortHighlight: "No Intermediary Charges",
        icon: Percent,
        whatItMeans:
          "Eliminates third-party correspondent bank charges across the Singapore-India commercial corridor.",
        whyItMatters:
          "Standard bank wires between ASEAN and India suffer dual currency conversion and high SWIFT cable fees.",
        concreteBenefit:
          "Direct SGD to INR conversion at institutional interbank spreads with zero hidden deductions.",
      },
      {
        id: "speed",
        title: "Real-Time Clearing & BRC",
        badge: "Instantaneous Realization",
        shortHighlight: "Immediate Export Credit",
        icon: Zap,
        whatItMeans:
          "Real-time payment receipt notification with immediate locking of repatriation foreign exchange rates.",
        whyItMatters:
          "Provides instant cash availability to fund production cycles and supplier payables.",
        concreteBenefit:
          "Automated compliance documentation matching Singapore customs import manifests with Indian bank credits.",
      },
    ],
  },
  Germany: {
    currency: "Euro (€)",
    currencyCode: "EUR",
    rails: "SEPA & SEPA Instant",
    speed: "Instant to T+1",
    savings: "60% vs SWIFT Wire",
    description: "Dedicated European virtual IBAN for frictionless SEPA credit transfers.",
    features: [
      {
        id: "rails",
        title: "European SEPA & SEPA Instant Rails",
        badge: "Dedicated Virtual IBAN (DE...)",
        shortHighlight: "Single Euro Payments Area",
        icon: Landmark,
        whatItMeans:
          "Dedicated European Virtual IBAN allowing buyers across all 27 EU member states to pay via domestic SEPA credit transfer.",
        whyItMatters:
          "European corporate buyers strictly mandate SEPA-compliant invoice settlement without international correspondent wire fees.",
        concreteBenefit:
          "Treats your export business as an EU domestic supplier, eliminating buyer wire hesitation across the Eurozone.",
      },
      {
        id: "fee",
        title: "Elimination of SWIFT Intermediary Fees",
        badge: "60% Lower Cost",
        shortHighlight: "Direct Wholesale EUR/INR",
        icon: Percent,
        whatItMeans:
          "Domestic SEPA processing bypasses expensive international correspondent bank routing networks.",
        whyItMatters:
          "Traditional international wires to Europe incur correspondent deductions that cause invoice balance reconciliation disputes.",
        concreteBenefit:
          "100% of the invoiced Euro amount is received and converted at competitive institutional rates.",
      },
      {
        id: "speed",
        title: "Instant to T+1 Eurozone Clearing",
        badge: "SEPA Instant Protocol",
        shortHighlight: "Automated INR Realization",
        icon: Zap,
        whatItMeans:
          "SEPA Instant transfers clear in under 10 seconds, with automated onward INR conversion to your Indian account.",
        whyItMatters:
          "Reduces payment transit times from 4-6 business days down to same-day execution.",
        concreteBenefit:
          "Seamless export realization with automated electronic BRC and EDPMS regulatory filing support.",
      },
    ],
  },
};

export const StepTier3Settlement: React.FC<StepTier3SettlementProps> = ({
  targetMarket,
  onNext,
  onReturnToHub,
  isExistingCustomer,
  userName,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const details = SETTLEMENT_DETAILS[targetMarket] || SETTLEMENT_DETAILS["United Kingdom"];
  const displayName = userName ? userName.trim().split(" ")[0] : null;

  const toggleFeature = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
      {/* Title */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
        Settlement Setup
      </h1>
      <p className="font-display font-semibold text-xl sm:text-2xl text-[#0A0A0A] mb-2">
        {displayName
          ? `Ready to configure, ${displayName}. Your ${targetMarket} account is ready.`
          : `Your ${targetMarket} settlement account is ready to configure.`}
      </p>
      <p className="font-body text-base sm:text-lg text-[#706E6B] font-light mb-8 max-w-xl">
        Direct domestic clearing eliminates correspondent intermediary banking fees and foreign exchange margin drag.
      </p>

      {/* Interactive Expandable Settlement Feature Cards */}
      <div className="w-full space-y-3.5 mb-10 text-left">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="font-mono-data text-xs uppercase tracking-wider text-[#706E6B] font-semibold">
            Direct-Clearing Infrastructure ({details.currency})
          </span>
          <span className="font-mono-data text-[11px] text-[#706E6B]">
            Tap any feature to inspect banking mechanics
          </span>
        </div>

        {details.features.map((feat, idx) => {
          const isExpanded = expandedIndex === idx;
          const Icon = feat.icon;

          return (
            <div
              key={feat.id}
              className={`rounded-2xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isExpanded ? "border-[#0A0A0A] shadow-md" : "border-black/10 hover:border-black/30"
              }`}
            >
              {/* Card Header Button */}
              <button
                type="button"
                onClick={() => toggleFeature(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/5 text-[#FF4D1C]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block">
                      {feat.badge}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0A0A0A]">
                      {feat.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="font-mono-data text-xs sm:text-sm font-semibold text-[#0A0A0A] hidden sm:inline">
                    {feat.shortHighlight}
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
                    key="settlement-feature-content"
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
                      {/* What it means */}
                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Operational Architecture
                        </span>
                        <p className="font-body text-[#0A0A0A] leading-relaxed">
                          {feat.whatItMeans}
                        </p>
                      </div>

                      {/* Why it matters */}
                      <div>
                        <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#706E6B] block mb-1">
                          Why Traditional Banking Fails Here
                        </span>
                        <p className="font-body text-[#706E6B] leading-relaxed">
                          {feat.whyItMatters}
                        </p>
                      </div>

                      {/* Concrete benefit */}
                      <div className="p-3.5 rounded-xl bg-black/[0.03] border border-black/5 flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                        <div className="font-body text-xs text-[#0A0A0A] leading-relaxed">
                          <strong className="font-semibold">Direct Exporter Value:</strong>{" "}
                          {feat.concreteBenefit}
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

      {/* Action Buttons: Primary External Conversion + Secondary Demo Navigation */}
      <div className="w-full space-y-2.5">
        <div className="w-full flex flex-col sm:flex-row gap-3 items-stretch justify-center">
          <a
            href="https://www.tradepe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#FF4D1C] text-white font-display font-semibold text-base sm:text-lg border-2 border-[#FF4D1C] hover:bg-[#E03D0E] hover:border-[#E03D0E] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 text-center"
          >
            <span>Open a TradePe Account</span>
            <ExternalLink className="h-4 w-4 text-white/80 group-hover:text-white transition-all shrink-0" />
          </a>

          <button
            type="button"
            onClick={onNext}
            className="flex-1 group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white text-[#0A0A0A] font-display font-semibold text-base sm:text-lg border-2 border-black/10 hover:border-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
          >
            <span>Continue to Ecosystem Preview</span>
            <ArrowRight className="h-4 w-4 text-black/40 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
          </button>
        </div>

        {/* Microcopy disclaimer */}
        <p className="font-mono-data text-[11px] text-[#706E6B] text-center">
          Opens TradePe&apos;s live platform in a new tab
        </p>
      </div>

      {onReturnToHub && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onReturnToHub}
            className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
          >
            ← Return to client portal
          </button>
        </div>
      )}
    </div>
  );
};
