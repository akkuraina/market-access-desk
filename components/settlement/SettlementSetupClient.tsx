"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

interface MarketConfig {
  name: string;
  shortCode: string;
  flag: string;
  currency: string;
  currencyCode: string;
  rails: string;
  clearingSpeed: string;
  localAccountFormat: string;
  averageFeeSaving: string;
  typicalBuyerPreference: string;
}

const MARKET_CONFIGS: Record<string, MarketConfig> = {
  UK: {
    name: "United Kingdom",
    shortCode: "UK",
    flag: "🇬🇧",
    currency: "British Pound (£)",
    currencyCode: "GBP",
    rails: "Faster Payments & BACS Rails",
    clearingSpeed: "Instant – T+1",
    localAccountFormat: "UK Sort Code (6 digits) & Account Number",
    averageFeeSaving: "65% vs Wire",
    typicalBuyerPreference: "UK commercial buyers expect local domestic invoice settlement in GBP.",
  },
  UAE: {
    name: "United Arab Emirates",
    shortCode: "UAE",
    flag: "🇦🇪",
    currency: "UAE Dirham (AED)",
    currencyCode: "AED",
    rails: "UAE Funds Transfer System (FTS)",
    clearingSpeed: "Same-Day (T+0)",
    localAccountFormat: "UAE Dedicated Virtual IBAN (AE...)",
    averageFeeSaving: "70% vs SWIFT",
    typicalBuyerPreference: "Gulf buyers and free zone trading houses settle locally in AED without FX friction.",
  },
  USA: {
    name: "United States",
    shortCode: "USA",
    flag: "🇺🇸",
    currency: "US Dollar ($)",
    currencyCode: "USD",
    rails: "Fedwire & ACH Clearing Network",
    clearingSpeed: "T+0 / T+1",
    localAccountFormat: "US Domestic Routing Number (ABA) & Account",
    averageFeeSaving: "60% vs International Wire",
    typicalBuyerPreference: "US enterprise distributors require domestic ACH / Fedwire payment routing.",
  },
  Singapore: {
    name: "Singapore",
    shortCode: "Singapore",
    flag: "🇸🇬",
    currency: "Singapore Dollar (S$)",
    currencyCode: "SGD",
    rails: "FAST & GIRO Electronic Rails",
    clearingSpeed: "Instant Settlement",
    localAccountFormat: "Singapore Bank Code & Virtual Account",
    averageFeeSaving: "65% vs Correspondent Wire",
    typicalBuyerPreference: "Southeast Asian regional hubs settle seamlessly in SGD via instant FAST rails.",
  },
  Germany: {
    name: "Germany (European Union)",
    shortCode: "Germany",
    flag: "🇩🇪",
    currency: "Euro (€)",
    currencyCode: "EUR",
    rails: "SEPA & SEPA Instant Credit Transfer",
    clearingSpeed: "Instant – T+1",
    localAccountFormat: "European Virtual IBAN (DE...)",
    averageFeeSaving: "60% vs SWIFT Wire",
    typicalBuyerPreference: "EU corporate buyers mandate SEPA-compliant Euro settlement without cross-border fees.",
  },
};

function normalizeMarketParam(param: string | null): MarketConfig {
  if (!param) return MARKET_CONFIGS["UK"];
  const p = param.trim().toUpperCase();

  if (p === "UK" || p.includes("UNITED KINGDOM") || p.includes("BRITAIN") || p.includes("GB")) {
    return MARKET_CONFIGS["UK"];
  }
  if (p === "UAE" || p.includes("EMIRATES") || p.includes("DUBAI") || p.includes("ABU DHABI")) {
    return MARKET_CONFIGS["UAE"];
  }
  if (p === "USA" || p === "US" || p.includes("UNITED STATES") || p.includes("AMERICA")) {
    return MARKET_CONFIGS["USA"];
  }
  if (p.includes("SINGAPORE") || p === "SG") {
    return MARKET_CONFIGS["Singapore"];
  }
  if (p.includes("GERMANY") || p.includes("EU") || p.includes("EUROPE") || p === "DE") {
    return MARKET_CONFIGS["Germany"];
  }

  return MARKET_CONFIGS["UK"];
}

export const SettlementSetupClient: React.FC = () => {
  const searchParams = useSearchParams();
  const marketQuery = searchParams.get("market") || searchParams.get("target") || searchParams.get("corridor");
  const market = normalizeMarketParam(marketQuery);

  const [activeMarketCode, setActiveMarketCode] = useState<string>(market.shortCode);
  const activeMarket = MARKET_CONFIGS[activeMarketCode] || market;

  return (
    <div className="w-full space-y-16">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH TARGET MARKET PERSONALIZATION                        */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="relative space-y-6 max-w-4xl">
          {/* Top Context Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono-data text-xs font-semibold text-brand-dark bg-black/5 px-3 py-1 rounded-md border border-black/10">
              TIER 3 ARCHITECTURE · SETTLEMENT HANDOFF
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono-data text-brand-muted">
              <span>TARGET CORRIDOR:</span>
              <span className="text-brand-dark font-bold">
                {activeMarket.flag} {activeMarket.name}
              </span>
            </div>
          </div>

          {/* Dynamic Personalized Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-brand-dark leading-[1.08]">
            Set up your {activeMarket.shortCode}{" "}
            <span className="font-italic-accent text-[#FF4D1C] font-normal italic">settlement</span> account.
          </h1>

          {/* Natural Handoff Subtitle */}
          <p className="font-body text-base sm:text-lg text-brand-muted leading-relaxed max-w-3xl">
            You've assessed your readiness and verified compliance — here's how{" "}
            <TradePeWordmark /> makes the money side simple, eliminating correspondent wire hops,
            lifting 2–4% FX margins, and clearing domestically via AD-1 partner banking rails.
          </p>

          {/* Market Switcher Quick Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono-data text-xs text-brand-muted mr-1">Switch Destination:</span>
            {Object.keys(MARKET_CONFIGS).map((code) => {
              const cfg = MARKET_CONFIGS[code];
              const isSelected = activeMarket.shortCode === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setActiveMarketCode(code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono-data text-xs transition-all ${
                    isSelected
                      ? "bg-brand-dark text-white font-semibold shadow-sm"
                      : "bg-[#F4F2EC] border border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                  }`}
                >
                  <span>{cfg.flag}</span>
                  <span>{cfg.shortCode}</span>
                </button>
              );
            })}
          </div>

          {/* Key Corridor Telemetry Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/10">
            <div className="rounded-xl bg-brand-bg p-3.5 border border-black/10">
              <p className="font-mono-data text-[10px] uppercase text-brand-muted">Local Currency</p>
              <p className="font-mono-data text-sm font-semibold text-brand-dark mt-0.5">
                {activeMarket.currencyCode}
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-3.5 border border-black/10">
              <p className="font-mono-data text-[10px] uppercase text-brand-muted">Settlement Rails</p>
              <p className="font-body text-xs font-semibold text-brand-dark mt-0.5 truncate">
                {activeMarket.rails}
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-3.5 border border-black/10">
              <p className="font-mono-data text-[10px] uppercase text-brand-muted">Clearing Speed</p>
              <p className="font-mono-data text-sm font-semibold text-[#FF4D1C] mt-0.5">
                {activeMarket.clearingSpeed}
              </p>
            </div>

            <div className="rounded-xl bg-brand-bg p-3.5 border border-black/10">
              <p className="font-mono-data text-[10px] uppercase text-brand-muted">Cost Reduction</p>
              <p className="font-mono-data text-sm font-semibold text-emerald-700 mt-0.5">
                {activeMarket.averageFeeSaving}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE-STEP LOCAL-CURRENCY ACCOUNT VISUAL WORKFLOW                     */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="orange" size="sm">
            DIRECT CLEARING SPECIFICATION
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-brand-dark">
            How Local Settlement Operates
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-muted">
            Provide your buyers with domestic payment instructions while receiving funds directly in your home currency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-black/30 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark text-white font-mono-data text-xs font-semibold shadow-sm">
                  01
                </span>
                <span className="font-mono-data text-[11px] text-brand-muted uppercase tracking-wider">
                  PROVISIONING
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-normal text-brand-dark">
                  Open Virtual Account
                </h3>
                <p className="font-mono-data text-xs text-[#FF4D1C] font-medium mt-0.5">
                  Turnaround: &lt; 48 Hours
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                Receive a dedicated {activeMarket.shortCode} virtual account (
                <strong className="text-brand-dark">{activeMarket.localAccountFormat}</strong>) in your business name without incorporating a foreign legal subsidiary.
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 font-mono-data text-xs text-brand-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-dark font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Zero foreign incorporation cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Automated KYC / UBO verification</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-black/30 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark text-white font-mono-data text-xs font-semibold shadow-sm">
                  02
                </span>
                <span className="font-mono-data text-[11px] text-brand-muted uppercase tracking-wider">
                  COLLECTION
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-normal text-brand-dark">
                  Receive Local Payments
                </h3>
                <p className="font-mono-data text-xs text-[#FF4D1C] font-medium mt-0.5">
                  Rails: {activeMarket.rails}
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                Your destination buyer in {activeMarket.name} pays invoice balances in{" "}
                <strong className="text-brand-dark">{activeMarket.currencyCode}</strong> via standard domestic clearing without expensive international wire deductions.
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 font-mono-data text-xs text-brand-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-dark font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Payer pays standard local transfer fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Escrow milestone binding supported</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-black/30 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark text-white font-mono-data text-xs font-semibold shadow-sm">
                  03
                </span>
                <span className="font-mono-data text-[11px] text-brand-muted uppercase tracking-wider">
                  SETTLEMENT
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-normal text-brand-dark">
                  Settle in Domestic Bank
                </h3>
                <p className="font-mono-data text-xs text-[#FF4D1C] font-medium mt-0.5">
                  Speed: Same-Day / Next-Day
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                Funds convert at live interbank mid-market FX rates and settle directly into your home operating account (INR) with automated regulatory remittance certificates (e-BRC / FIRC).
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 font-mono-data text-xs text-brand-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-dark font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Transparent live interbank spread</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span>Automated digital e-BRC generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRADEPE CORE VALUE PROPOSITION PILLARS                                */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-black/10 bg-white p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="zinc" size="sm">
            INSTITUTIONAL TREASURY INFRASTRUCTURE
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-brand-dark">
            Why Cross-Border Exporters Choose <TradePeWordmark />
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-muted">
            Built on Tier-1 authorized dealer banking partnerships to deliver enterprise transparency, regulatory rigor, and margin protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 1: Real FX Rates */}
          <div className="rounded-xl bg-brand-bg p-6 border border-black/10 space-y-3">
            <div className="h-9 w-9 rounded-lg bg-black/5 text-brand-dark flex items-center justify-center">
              <Percent className="h-5 w-5 text-[#FF4D1C]" />
            </div>
            <h3 className="font-display text-lg font-normal text-brand-dark">
              Real Interbank FX Rates
            </h3>
            <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
              No hidden 2–4% exchange rate markups or opaque correspondent intermediary deductions. Access wholesale interbank mid-market spreads with upfront transparency on every conversion.
            </p>
          </div>

          {/* Pillar 2: Fast Settlement */}
          <div className="rounded-xl bg-brand-bg p-6 border border-black/10 space-y-3">
            <div className="h-9 w-9 rounded-lg bg-black/5 text-brand-dark flex items-center justify-center">
              <Zap className="h-5 w-5 text-[#FF4D1C]" />
            </div>
            <h3 className="font-display text-lg font-normal text-brand-dark">
              Rapid Domestic Clearing
            </h3>
            <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
              Eliminate multi-day SWIFT wire routing bottlenecks. Payments clear through local destination rails ({activeMarket.rails}) and settle domestically on accelerated T+0 / T+1 schedules.
            </p>
          </div>

          {/* Pillar 3: AD-1 Bank Backed */}
          <div className="rounded-xl bg-brand-bg p-6 border border-black/10 space-y-3">
            <div className="h-9 w-9 rounded-lg bg-black/5 text-brand-dark flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-[#FF4D1C]" />
            </div>
            <h3 className="font-display text-lg font-normal text-brand-dark">
              AD-1 Bank Backed & e-BRC
            </h3>
            <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
              Operates in partnership with RBI-licensed Authorized Dealer Category-I banks. Inward remittances automatically generate digital e-BRC / FIRC documentation for seamless EDPMS customs closure.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP CTA HANDOFF TO TRADEPE ONBOARDING FLOW                        */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-black/10 bg-brand-dark text-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-xs text-[#FF4D1C] font-semibold bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                READY FOR LIVE DISPATCH
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              Get started with <TradePeWordmark href="https://tradepe-landing.vercel.app" variant="orange" />
            </h3>

            <p className="font-body text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Open your dedicated <strong className="text-white font-semibold">{activeMarket.name} ({activeMarket.currencyCode})</strong> virtual collection account today. Accelerate cross-border collections, lock wholesale exchange rates, and eliminate correspondent wire deductions.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-end">
            <a
              href="https://tradepe-landing.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="orange" size="xl" className="w-full justify-between group text-base sm:text-lg">
                <span className="inline-flex items-center gap-1.5 text-white font-semibold">
                  Get Started with <TradePeWordmark asLink={false} variant="white" />
                </span>
                <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link href="/readiness-score" className="w-full">
              <Button
                variant="ghost"
                size="md"
                className="w-full text-white/70 hover:text-white hover:bg-white/10 font-mono-data text-xs"
              >
                <span>Recalculate Readiness Diagnostic</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
