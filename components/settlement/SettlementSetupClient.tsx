"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  Globe2,
  Building2,
  ExternalLink,
  ChevronRight,
  CreditCard,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
      <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-10 lg:p-12 shadow-card relative overflow-hidden">
        {/* Background Navigation Chart Watermark */}
        <svg
          className="absolute -top-16 -right-16 h-[420px] w-[420px] text-mad-green opacity-[0.045] pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        </svg>

        <div className="relative space-y-6 max-w-4xl">
          {/* Top Context Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono-data text-xs font-bold text-mad-green bg-mad-green/10 px-3 py-1 rounded-md border border-mad-green/20">
              TIER 3 ARCHITECTURE · SETTLEMENT HANDOFF
            </span>
            <div className="flex items-center gap-1 text-xs font-mono-data text-mad-slate">
              <span>TARGET CORRIDOR:</span>
              <span className="text-mad-green font-bold">
                {activeMarket.flag} {activeMarket.name}
              </span>
            </div>
          </div>

          {/* Dynamic Personalized Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-mad-green leading-[1.08]">
            Set up your {activeMarket.shortCode} settlement account.
          </h1>

          {/* Natural Handoff Subtitle */}
          <p className="font-display text-base sm:text-xl text-mad-ink/85 font-medium leading-relaxed max-w-3xl">
            You've assessed your readiness and verified compliance — here's how{" "}
            <span className="font-bold text-mad-green">TradePe</span> makes the money side simple,
            eliminating correspondent wire fees and volatile FX deductions.
          </p>

          {/* Market Switcher Quick Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono-data text-xs text-mad-slate mr-1">Switch Destination:</span>
            {Object.keys(MARKET_CONFIGS).map((code) => {
              const cfg = MARKET_CONFIGS[code];
              const isSelected = activeMarket.shortCode === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setActiveMarketCode(code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono-data text-xs transition-all ${
                    isSelected
                      ? "bg-mad-green text-mad-cream font-bold shadow-sm"
                      : "bg-mad-cream border border-mad-green/15 text-mad-ink hover:border-mad-green/40 hover:bg-white"
                  }`}
                >
                  <span>{cfg.flag}</span>
                  <span>{cfg.shortCode}</span>
                </button>
              );
            })}
          </div>

          {/* Key Corridor Telemetry Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-mad-green/10">
            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">Local Currency</p>
              <p className="font-mono-data text-sm font-bold text-mad-green mt-0.5">
                {activeMarket.currencyCode}
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">Settlement Rails</p>
              <p className="font-display text-xs font-bold text-mad-green mt-0.5 truncate">
                {activeMarket.rails}
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">Clearing Speed</p>
              <p className="font-mono-data text-sm font-bold text-mad-gold mt-0.5">
                {activeMarket.clearingSpeed}
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">Cost Reduction</p>
              <p className="font-mono-data text-sm font-bold text-emerald-700 mt-0.5">
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
          <Badge variant="gold" size="sm">
            Frictionless Cross-Border Flow
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-mad-green">
            How Local Settlement Operates
          </h2>
          <p className="font-body text-sm sm:text-base text-mad-slate">
            Provide your buyers with domestic payment instructions while receiving funds directly in your home currency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-card hover:border-mad-green/35 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mad-green text-mad-cream font-mono-data text-sm font-bold shadow-sm">
                  01
                </span>
                <span className="font-mono-data text-xs text-mad-slate uppercase tracking-wider">
                  PROVISIONING
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-mad-green">
                  Open Virtual Account
                </h3>
                <p className="font-mono-data text-xs text-mad-gold font-semibold mt-0.5">
                  Turnaround: &lt; 48 Hours
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
                Receive a dedicated {activeMarket.shortCode} virtual account (
                <strong className="text-mad-green">{activeMarket.localAccountFormat}</strong>) in your business name without incorporating a foreign legal subsidiary.
              </p>
            </div>

            <div className="pt-4 border-t border-mad-green/10 font-mono-data text-xs text-mad-slate space-y-1">
              <div className="flex items-center gap-1.5 text-mad-green font-semibold">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Zero foreign incorporation cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Automated KYC / UBO verification</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-card hover:border-mad-green/35 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mad-green text-mad-cream font-mono-data text-sm font-bold shadow-sm">
                  02
                </span>
                <span className="font-mono-data text-xs text-mad-slate uppercase tracking-wider">
                  COLLECTION
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-mad-green">
                  Receive Local Payments
                </h3>
                <p className="font-mono-data text-xs text-mad-gold font-semibold mt-0.5">
                  Rails: {activeMarket.rails}
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
                Your destination buyer in {activeMarket.name} pays invoice balances in{" "}
                <strong className="text-mad-green">{activeMarket.currencyCode}</strong> via standard domestic clearing without expensive international wire deductions.
              </p>
            </div>

            <div className="pt-4 border-t border-mad-green/10 font-mono-data text-xs text-mad-slate space-y-1">
              <div className="flex items-center gap-1.5 text-mad-green font-semibold">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Payer pays standard local transfer fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Escrow milestone binding supported</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-card hover:border-mad-green/35 transition-all relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mad-green text-mad-cream font-mono-data text-sm font-bold shadow-sm">
                  03
                </span>
                <span className="font-mono-data text-xs text-mad-slate uppercase tracking-wider">
                  SETTLEMENT
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-mad-green">
                  Settle in Domestic Bank
                </h3>
                <p className="font-mono-data text-xs text-mad-gold font-semibold mt-0.5">
                  Speed: Same-Day / Next-Day
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
                Funds convert at live interbank mid-market FX rates and settle directly into your home operating account (INR) with automated regulatory remittance certificates (e-BRC / FIRC).
              </p>
            </div>

            <div className="pt-4 border-t border-mad-green/10 font-mono-data text-xs text-mad-slate space-y-1">
              <div className="flex items-center gap-1.5 text-mad-green font-semibold">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Transparent live interbank spread</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />
                <span>Automated digital e-BRC generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRADEPE CORE VALUE PROPOSITION PILLARS                                */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-10 lg:p-12 shadow-card space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="subtle" size="sm">
            Institutional Treasury Infrastructure
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-mad-green">
            Why Cross-Border Exporters Choose TradePe
          </h2>
          <p className="font-body text-sm sm:text-base text-mad-slate">
            Built on Tier-1 authorized dealer banking partnerships to deliver enterprise transparency, regulatory rigor, and margin protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 1: Real FX Rates */}
          <div className="rounded-2xl bg-mad-cream p-6 border border-mad-green/10 space-y-3">
            <div className="h-9 w-9 rounded-xl bg-mad-gold/20 text-mad-gold flex items-center justify-center">
              <Percent className="h-5 w-5 text-mad-gold" />
            </div>
            <h3 className="font-display text-lg font-bold text-mad-green">
              Real Interbank FX Rates
            </h3>
            <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
              No hidden 2–4% exchange rate markups or opaque correspondent intermediary deductions. Access wholesale interbank mid-market spreads with upfront transparency on every conversion.
            </p>
          </div>

          {/* Pillar 2: Fast Settlement */}
          <div className="rounded-2xl bg-mad-cream p-6 border border-mad-green/10 space-y-3">
            <div className="h-9 w-9 rounded-xl bg-mad-green/15 text-mad-green flex items-center justify-center">
              <Zap className="h-5 w-5 text-mad-green" />
            </div>
            <h3 className="font-display text-lg font-bold text-mad-green">
              Rapid Domestic Clearing
            </h3>
            <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
              Eliminate multi-day SWIFT wire routing bottlenecks. Payments clear through local destination rails ({activeMarket.rails}) and settle domestically on accelerated T+0 / T+1 schedules.
            </p>
          </div>

          {/* Pillar 3: AD-1 Bank Backed */}
          <div className="rounded-2xl bg-mad-cream p-6 border border-mad-green/10 space-y-3">
            <div className="h-9 w-9 rounded-xl bg-mad-green/15 text-mad-green flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-mad-green" />
            </div>
            <h3 className="font-display text-lg font-bold text-mad-green">
              AD-1 Bank Backed & e-BRC
            </h3>
            <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
              Operates in partnership with RBI-licensed Authorized Dealer Category-I banks. Inward remittances automatically generate digital e-BRC / FIRC documentation for seamless EDPMS customs closure.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP CTA HANDOFF TO TRADEPE ONBOARDING FLOW                        */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-mad-green bg-mad-green text-mad-cream p-8 sm:p-12 shadow-card relative overflow-hidden">
        {/* Subtle background motif */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-xs text-mad-gold font-bold bg-mad-gold/15 border border-mad-gold/30 px-3 py-1 rounded-full">
                READY FOR LIVE DISPATCH
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-mad-cream">
              Get started with TradePe
            </h3>

            <p className="font-body text-sm sm:text-base text-mad-cream/80 max-w-2xl leading-relaxed">
              Open your dedicated <strong className="text-mad-gold font-semibold">{activeMarket.name} ({activeMarket.currencyCode})</strong> virtual collection account today. Accelerate cross-border collections, lock favorable exchange rates, and eliminate international wire friction.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-end">
            <a
              href="https://tradepe.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="gold" size="xl" className="w-full justify-between group text-base sm:text-lg">
                <span>Get Started with TradePe</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link href="/readiness-score" className="w-full">
              <Button
                variant="ghost"
                size="md"
                className="w-full text-mad-cream/80 hover:text-mad-cream hover:bg-mad-cream/10 font-mono-data text-xs"
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
