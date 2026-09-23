"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  ShieldCheck,
  ArrowUpRight,
  BarChart3,
  Sparkles,
  Info,
  DollarSign,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

// Sample monthly volume data by corridor (in thousands USD)
const MONTHLY_DATA = [
  { month: "Oct '25", uae: 120, uk: 85, usa: 60, total: 265 },
  { month: "Nov '25", uae: 145, uk: 95, usa: 75, total: 315 },
  { month: "Dec '25", uae: 190, uk: 130, usa: 110, total: 430 },
  { month: "Jan '26", uae: 160, uk: 115, usa: 90, total: 365 },
  { month: "Feb '26", uae: 175, uk: 140, usa: 105, total: 420 },
  { month: "Mar '26", uae: 210, uk: 165, usa: 135, total: 510 },
  { month: "Apr '26", uae: 230, uk: 180, usa: 150, total: 560 },
  { month: "May '26", uae: 255, uk: 210, usa: 170, total: 635 },
  { month: "Jun '26", uae: 280, uk: 225, usa: 195, total: 700 },
];

const CORRIDOR_BENCHMARKS = [
  {
    corridor: "India → UAE (GCC)",
    currency: "AED",
    avgSettlementHours: "4.2 hrs",
    fxSpread: "0.18%",
    clearanceSuccess: "99.4%",
    monthlyRunRate: "$280k",
    growthYoY: "+38.4%",
  },
  {
    corridor: "India → United Kingdom",
    currency: "GBP",
    avgSettlementHours: "6.5 hrs",
    fxSpread: "0.22%",
    clearanceSuccess: "98.8%",
    monthlyRunRate: "$225k",
    growthYoY: "+29.1%",
  },
  {
    corridor: "India → United States",
    currency: "USD",
    avgSettlementHours: "8.0 hrs",
    fxSpread: "0.19%",
    clearanceSuccess: "98.2%",
    monthlyRunRate: "$195k",
    growthYoY: "+22.6%",
  },
];

const PEER_EXPANSION_SUGGESTIONS = [
  {
    targetCorridor: "Germany (European Union)",
    flag: "🇩🇪",
    fitScore: "94% Match",
    headline: "High-margin expansion path for established UK apparel & textile exporters",
    rationale:
      "76% of Indian exporters with >$1.5M in annual UK trade volume successfully unlocked German direct retail channels within 6 months by leveraging unified CE marking and EU OSS VAT structures.",
    avgMarginLift: "+14.8%",
    regulatoryDifficulty: "Medium (OSS VAT registration)",
    actionHref: "/compliance-navigator?corridor=IN-DE",
    actionLabel: "View Germany Compliance Guide",
  },
  {
    targetCorridor: "Australia (ECTA FTA)",
    flag: "🇦🇺",
    fitScore: "89% Match",
    headline: "Zero-tariff duty access under the India-Australia Economic Cooperation Agreement",
    rationale:
      "Preferential 0% customs duty applies to 96% of tariff lines. Exporters with verified Level 3 KYC trade history qualify for 24-hour expedited automated customs release at Sydney and Melbourne ports.",
    avgMarginLift: "+11.4%",
    regulatoryDifficulty: "Low (Rules of Origin certificate)",
    actionHref: "/readiness-score",
    actionLabel: "Assess Australia Readiness",
  },
];

export const TradeInsightsClient: React.FC = () => {
  const [activeCorridorFilter, setActiveCorridorFilter] = useState<"all" | "uae" | "uk" | "usa">("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = 750; // max scale in thousands

  return (
    <div className="w-full space-y-12">
      {/* ========================================================================= */}
      {/* 1. ENTERPRISE MOCK HEADER & EXPLICIT SAMPLE DATA BANNER                   */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Sample Data Disclaimer Alert */}
        <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-black/5 text-[#FF4D1C] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono-data text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Preview: Trade Insights Dashboard · Sample Data Shown
              </p>
              <p className="font-body text-xs sm:text-sm text-brand-muted mt-0.5">
                This page previews the data-forward telemetry and portable credit profiling generated for active exporters on the <TradePeWordmark /> rails. All metrics below represent an illustrative sample account.
              </p>
            </div>
          </div>

          <Badge variant="orange" size="sm" className="shrink-0 self-start sm:self-center">
            ILLUSTRATIVE ENTERPRISE VIEW
          </Badge>
        </div>

        {/* Mock Enterprise Context Bar */}
        <div className="rounded-2xl bg-white border border-black/10 p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-brand-dark text-white flex items-center justify-center font-display text-xl font-normal shrink-0">
              AG
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg sm:text-xl font-normal text-brand-dark">
                  Apex Global Exports Pvt. Ltd.
                </h2>
                <Badge variant="zinc" size="sm">
                  Active Client
                </Badge>
              </div>
              <p className="font-mono-data text-xs text-brand-muted mt-0.5">
                IE_CODE: 0518049214 · GSTIN: 27AABCA1234F1Z5 · BASE: Mumbai, IN
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono-data text-xs">
            <div className="bg-brand-bg px-3.5 py-2 rounded-lg border border-black/10">
              <span className="text-brand-muted">PRIMARY SECTOR:</span>{" "}
              <strong className="text-brand-dark">Textiles & Apparel</strong>
            </div>
            <div className="bg-brand-bg px-3.5 py-2 rounded-lg border border-black/10">
              <span className="text-brand-muted">EXPORT TENURE:</span>{" "}
              <strong className="text-brand-dark">28 Months</strong>
            </div>
            <div className="bg-brand-bg px-3.5 py-2 rounded-lg border border-black/10">
              <span className="text-brand-muted">ACTIVE RAILS:</span>{" "}
              <strong className="text-[#FF4D1C]">3 Corridors</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRICS RIBBON (SAMPLE NUMBERS)                                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="font-mono-data text-xs uppercase tracking-wider">Settled Volume (LTM)</span>
            <DollarSign className="h-4 w-4 text-brand-dark" />
          </div>
          <p className="font-mono-data text-2xl sm:text-3xl font-semibold text-brand-dark">
            $4,820,000
          </p>
          <div className="flex items-center gap-1.5 mt-2 font-mono-data text-xs text-emerald-700 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+31.4% vs previous 12m</span>
            <span className="text-[10px] text-brand-muted/60 font-normal">[Sample]</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="font-mono-data text-xs uppercase tracking-wider">Avg Settlement Velocity</span>
            <Clock className="h-4 w-4 text-brand-dark" />
          </div>
          <p className="font-mono-data text-2xl sm:text-3xl font-semibold text-brand-dark">
            5.8 Hours
          </p>
          <div className="flex items-center gap-1.5 mt-2 font-mono-data text-xs text-brand-muted">
            <span>Domestic RTGS/NEFT Clearing</span>
            <span className="text-[10px] text-brand-muted/60 font-normal">[Sample]</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="font-mono-data text-xs uppercase tracking-wider">Dispute-Free Rate</span>
            <ShieldCheck className="h-4 w-4 text-brand-dark" />
          </div>
          <p className="font-mono-data text-2xl sm:text-3xl font-semibold text-brand-dark">
            99.6%
          </p>
          <div className="flex items-center gap-1.5 mt-2 font-mono-data text-xs text-emerald-700 font-semibold">
            <span>48 of 48 shipments verified</span>
            <span className="text-[10px] text-brand-muted/60 font-normal">[Sample]</span>
          </div>
        </Card>

        <Card className="p-5 border-[#FF4D1C]/30 bg-white">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="font-mono-data text-xs uppercase tracking-wider text-[#FF4D1C] font-semibold">
              Expansion Credit Score
            </span>
            <Award className="h-4 w-4 text-[#FF4D1C]" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-mono-data text-2xl sm:text-3xl font-semibold text-brand-dark">
              784
            </p>
            <span className="font-mono-data text-xs text-brand-muted">/ 850</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 font-mono-data text-xs text-[#FF4D1C] font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Grade A1 · Prime Exporter</span>
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 3. EXPANSION CREDIT SCORE STRATEGIC CARD (PRD SECTION 4.1 CORE CONCEPT)   */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="orange" size="sm">
              <Award className="h-3.5 w-3.5 text-[#FF4D1C]" />
              PRD SECTION 4.1 STRATEGIC DIFFERENTIATOR
            </Badge>
            <span className="font-mono-data text-xs text-brand-muted">
              PORTABLE CROSS-BORDER CREDIT UNDERWRITING
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-normal text-brand-dark">
            The Expansion Credit{" "}
            <span className="font-italic-accent text-[#FF4D1C] font-normal italic">Score</span>
          </h2>

          <div className="space-y-3 font-body text-sm sm:text-base text-brand-dark/90 leading-relaxed bg-brand-bg p-5 sm:p-6 rounded-xl border border-black/10">
            <p>
              The <strong>Expansion Credit Score</strong> is a portable, cryptographically verifiable trade underwriting index continuously compiled from your real transaction telemetry on the <TradePeWordmark /> rails—evaluating your customs clearance history, dispute-free deliveries, FX fulfillment punctuality, and buyer payment velocity.
            </p>
            <p>
              Unlike traditional domestic bank audits that demand heavy local real estate collateral, this portable trade score is recognized across MAD partner institutions and international trade financiers, allowing you to instantly secure low-cost pre-shipment credit lines and invoice financing whenever you enter a new destination market.
            </p>
          </div>

          {/* Factor Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl bg-brand-bg p-4 border border-black/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-data">
                <span className="font-semibold text-brand-dark">Customs Clearance Punctuality</span>
                <strong className="text-brand-dark">98 / 100</strong>
              </div>
              <div className="w-full bg-black/10 rounded-full h-2">
                <div className="bg-brand-dark h-2 rounded-full" style={{ width: "98%" }} />
              </div>
              <p className="text-[11px] font-body text-brand-muted">
                Zero customs holds or documentation discrepancies across 48 export declarations.
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-4 border border-black/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-data">
                <span className="font-semibold text-brand-dark">AD-1 Settlement & FX Compliance</span>
                <strong className="text-brand-dark">96 / 100</strong>
              </div>
              <div className="w-full bg-black/10 rounded-full h-2">
                <div className="bg-brand-dark h-2 rounded-full" style={{ width: "96%" }} />
              </div>
              <p className="text-[11px] font-body text-brand-muted">
                100% automated e-BRC reconciliation with RBI EDPMS reporting completed within 24 hours.
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-4 border border-black/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-data">
                <span className="font-semibold text-brand-dark">Buyer Delivery & Dispute Track Record</span>
                <strong className="text-brand-dark">94 / 100</strong>
              </div>
              <div className="w-full bg-black/10 rounded-full h-2">
                <div className="bg-brand-dark h-2 rounded-full" style={{ width: "94%" }} />
              </div>
              <p className="text-[11px] font-body text-brand-muted">
                Zero commercial claims, quality disputes, or chargebacks from UK/UAE buyer consortia.
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-4 border border-black/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-data">
                <span className="font-semibold text-brand-dark">Cross-Corridor Multiplicity Index</span>
                <strong className="text-[#FF4D1C]">88 / 100</strong>
              </div>
              <div className="w-full bg-[#FF4D1C]/20 rounded-full h-2">
                <div className="bg-[#FF4D1C] h-2 rounded-full" style={{ width: "88%" }} />
              </div>
              <p className="text-[11px] font-body text-brand-muted">
                Active commercial settlement across 3 independent sovereign currency zones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE CORRIDOR VOLUME & CASH FLOW TRENDS (SVG + MOTION)          */}
      {/* ========================================================================= */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-dark" />
              <h3 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                Corridor Settlement Volume Trajectory
              </h3>
            </div>
            <p className="font-body text-xs sm:text-sm text-brand-muted">
              Monthly export settlement telemetry aggregated across active overseas collection accounts.
            </p>
          </div>

          {/* Corridor Filter Switcher */}
          <div className="flex items-center p-1 bg-brand-bg rounded-lg border border-black/10">
            <button
              onClick={() => setActiveCorridorFilter("all")}
              className={`px-3 py-1.5 rounded-md font-mono-data text-xs font-semibold transition-all ${
                activeCorridorFilter === "all"
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              All Corridors
            </button>
            <button
              onClick={() => setActiveCorridorFilter("uae")}
              className={`px-3 py-1.5 rounded-md font-mono-data text-xs font-semibold transition-all ${
                activeCorridorFilter === "uae"
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              UAE (AED)
            </button>
            <button
              onClick={() => setActiveCorridorFilter("uk")}
              className={`px-3 py-1.5 rounded-md font-mono-data text-xs font-semibold transition-all ${
                activeCorridorFilter === "uk"
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              UK (GBP)
            </button>
            <button
              onClick={() => setActiveCorridorFilter("usa")}
              className={`px-3 py-1.5 rounded-md font-mono-data text-xs font-semibold transition-all ${
                activeCorridorFilter === "usa"
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              USA (USD)
            </button>
          </div>
        </div>

        {/* Lightweight SVG Interactive Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="relative w-full h-[220px] flex items-end justify-between gap-2 sm:gap-6 border-b border-black/10 px-2 sm:px-6">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full border-t border-dashed border-black" />
              <div className="w-full border-t border-dashed border-black" />
              <div className="w-full border-t border-dashed border-black" />
              <div className="w-full border-t border-dashed border-black" />
            </div>

            {MONTHLY_DATA.map((d, idx) => {
              const currentVal =
                activeCorridorFilter === "all"
                  ? d.total
                  : activeCorridorFilter === "uae"
                  ? d.uae
                  : activeCorridorFilter === "uk"
                  ? d.uk
                  : d.usa;

              const heightPct = Math.max(12, Math.round((currentVal / maxVal) * 100));

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip on Hover */}
                  {hoveredIndex === idx && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-2.5 py-1.5 rounded-md font-mono-data text-[11px] whitespace-nowrap shadow-lg z-20 pointer-events-none border border-white/20">
                      <div>${currentVal}k Settled</div>
                      <div className="text-[9px] text-[#FF4D1C]">{d.month} · Sample</div>
                    </div>
                  )}

                  {/* Animated Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`w-full max-w-[48px] rounded-t-md transition-colors ${
                      hoveredIndex === idx
                        ? "bg-[#FF4D1C]"
                        : "bg-brand-dark hover:bg-[#FF4D1C]"
                    }`}
                  />
                  <span className="font-mono-data text-[10px] sm:text-xs text-brand-muted mt-2 text-center">
                    {d.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 font-mono-data text-xs text-brand-muted">
            <span>SCALE: $0k – $750k USD MONTHLY VOLUME</span>
            <span className="text-[#FF4D1C] font-semibold">● SAMPLE TELEMETRY</span>
          </div>
        </div>

        {/* Corridor Benchmarking Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left font-body text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-black/10 font-mono-data text-xs text-brand-muted">
                <th className="pb-3 font-semibold">Active Corridor</th>
                <th className="pb-3 font-semibold">Currency</th>
                <th className="pb-3 font-semibold">Avg Clearing</th>
                <th className="pb-3 font-semibold">FX Cost Basis</th>
                <th className="pb-3 font-semibold">Customs Pass Rate</th>
                <th className="pb-3 font-semibold text-right">Run Rate (LTM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {CORRIDOR_BENCHMARKS.map((b, i) => (
                <tr key={i} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-3.5 font-body font-semibold text-brand-dark">{b.corridor}</td>
                  <td className="py-3.5 font-mono-data text-brand-muted">{b.currency}</td>
                  <td className="py-3.5 font-mono-data text-brand-dark">{b.avgSettlementHours}</td>
                  <td className="py-3.5 font-mono-data text-brand-dark font-semibold">{b.fxSpread}</td>
                  <td className="py-3.5 font-mono-data text-brand-dark">{b.clearanceSuccess}</td>
                  <td className="py-3.5 font-mono-data text-right font-semibold text-brand-dark">
                    {b.monthlyRunRate} <span className="text-[#FF4D1C] font-normal text-xs">({b.growthYoY})</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* 5. "BUSINESSES LIKE YOU EXPANDED HERE NEXT" INTELLIGENCE CARDS            */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge variant="zinc" size="sm">
            <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
            PEER COHORT INTELLIGENCE
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-brand-dark">
            Businesses Like You Expanded Here Next
          </h2>
          <p className="font-body text-sm text-brand-muted">
            Predictive destination recommendations synthesized from aggregate cross-border trade patterns of peer exporters with matching HS code profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PEER_EXPANSION_SUGGESTIONS.map((sug, idx) => (
            <Card key={idx} className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sug.flag}</span>
                    <h3 className="font-display text-lg sm:text-xl font-normal text-brand-dark">
                      {sug.targetCorridor}
                    </h3>
                  </div>
                  <Badge variant="orange" size="sm">
                    {sug.fitScore}
                  </Badge>
                </div>

                <h4 className="font-display text-sm sm:text-base font-semibold text-brand-dark">
                  {sug.headline}
                </h4>

                <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {sug.rationale}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-data">
                  <div className="bg-brand-bg p-2.5 rounded-lg border border-black/10">
                    <span className="text-brand-muted block text-[10px]">EST. MARGIN LIFT</span>
                    <strong className="text-emerald-700 text-sm">{sug.avgMarginLift}</strong>
                  </div>
                  <div className="bg-brand-bg p-2.5 rounded-lg border border-black/10">
                    <span className="text-brand-muted block text-[10px]">REGULATORY FRICTION</span>
                    <strong className="text-brand-dark text-xs">{sug.regulatoryDifficulty}</strong>
                  </div>
                </div>

                <Link href={sug.actionHref} className="block">
                  <Button variant="secondary" size="sm" className="w-full justify-between group">
                    <span>{sug.actionLabel}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NEXT STEPS & FULL ECOSYSTEM INTEGRATION BAR                           */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-normal text-brand-dark">
            Ready to generate your own live enterprise telemetry?
          </h3>
          <p className="font-body text-xs sm:text-sm text-brand-muted">
            Begin with the 5-step Tier 1 Market Readiness Score or set up local currency collection accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/readiness-score">
            <Button variant="orange" size="sm">
              <span>Run Readiness Calculator</span>
            </Button>
          </Link>
          <Link href="/settlement-setup">
            <Button variant="secondary" size="sm">
              <span>Setup Settlement Rails</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
