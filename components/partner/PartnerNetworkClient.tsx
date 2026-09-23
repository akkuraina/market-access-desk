"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Send,
  Warehouse,
  Network,
  Scale,
  Handshake,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ECOSYSTEM_PILLARS = [
  {
    icon: Building2,
    title: "Vetted Tier-1 Distributors & Retail Consortia",
    description:
      "Direct commercial introductions to pre-screened regional wholesalers, licensed importers, and authorized trade houses in destination markets with established retail distribution footprints.",
    deliverables: [
      "Financial solvency & creditworthiness underwriting",
      "Authorized channel distribution agreements",
      "B2B catalogue & pricing schedule distribution",
    ],
  },
  {
    icon: Warehouse,
    title: "Bonded Warehousing & 3PL Logistics",
    description:
      "Integration with accredited destination port warehouses (e.g. Jebel Ali Free Zone, Port of Singapore, Felixstowe) for local inventory staging, customs bonded storage, and automated fulfillment.",
    deliverables: [
      "Bonded customs warehouse slot allocation",
      "Temperature-controlled & cold-chain compliance",
      "Localized last-mile dispatch routing",
    ],
  },
  {
    icon: Network,
    title: "Structured Commercial Matching",
    description:
      "Automated matching protocol matching your certified HS code product lines and Tier 1 Readiness Profile with active buyer procurement tenders and institutional distributor RFQs.",
    deliverables: [
      "Direct RFQ matchmaking based on HS codes",
      "Verified buyer verification badges (Level 3 KYC)",
      "Standardized bilingual trade contract templates",
    ],
  },
  {
    icon: Scale,
    title: "Integrated Escrow Milestone Binding",
    description:
      "Seamless linkage to Tier 3 settlement infrastructure, locking buyer invoice funds in escrow until destination customs release or delivery confirmation milestones are verified.",
    deliverables: [
      "Inspection-conditional escrow releases",
      "Automated bill-of-lading title transfer triggers",
      "Dispute arbitration protocols backed by trade law",
    ],
  },
];

const ROADMAP_PHASES = [
  {
    phase: "Phase 2.1",
    status: "In Progress (Active)",
    title: "Ecosystem Partner Due Diligence & Vetting",
    timeframe: "Q3 2026",
    description:
      "Executing bilateral master service agreements with Tier-1 logistics providers and commercial chambers in UAE, UK, and Singapore.",
  },
  {
    phase: "Phase 2.2",
    status: "Up Next",
    title: "RFQ Matchmaking & Distributor Portal",
    timeframe: "Q4 2026",
    description:
      "Deploying the verified distributor registry, product catalogue indexing, and inbound buyer requirement discovery desk.",
  },
  {
    phase: "Phase 2.3",
    status: "Scheduled",
    title: "Programmatic Escrow Milestone Integration",
    timeframe: "Q1 2027",
    description:
      "Connecting partner fulfillment milestones directly to TradePe's local currency settlement and automated e-BRC generation.",
  },
];

const TARGET_CORRIDOR_OPTIONS = ["UAE (GCC)", "United Kingdom", "United States", "Singapore (ASEAN)", "Germany (EU)"];

export const PartnerNetworkClient: React.FC = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedCorridors, setSelectedCorridors] = useState<string[]>(["UAE (GCC)"]);
  const [industry, setIndustry] = useState("Textiles & Apparel");
  const [timeline, setTimeline] = useState("Next 1–3 Months");
  const [submitted, setSubmitted] = useState(false);

  const toggleCorridor = (c: string) => {
    if (selectedCorridors.includes(c)) {
      if (selectedCorridors.length > 1) {
        setSelectedCorridors(selectedCorridors.filter((item) => item !== c));
      }
    } else {
      setSelectedCorridors([...selectedCorridors, c]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full space-y-16">
      {/* ========================================================================= */}
      {/* 1. HERO VISION CARD: HONEST & DELIBERATE PHASE 2 PRESENTATION             */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-mad-gold/30 bg-mad-cream-alt p-6 sm:p-10 lg:p-12 shadow-card relative overflow-hidden">
        {/* Background Navigation Chart Watermark */}
        <svg
          className="absolute -top-16 -right-16 h-[400px] w-[400px] text-mad-gold opacity-[0.06] pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        </svg>

        <div className="relative space-y-6 max-w-4xl">
          {/* Phase 2 Badge Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="phase2" size="sm">
              <Sparkles className="h-3 w-3 text-mad-gold" />
              PHASE 2 ARCHITECTURE · PRIVATE PREVIEW
            </Badge>
            <span className="font-mono-data text-xs text-mad-slate">
              [TIER 4 SPECIFICATION]
            </span>
          </div>

          {/* Vision Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-mad-green leading-[1.08]">
            Demand & Partner Network
          </h1>

          {/* Honest Vision Statement */}
          <p className="font-display text-base sm:text-xl text-mad-ink/85 font-medium leading-relaxed max-w-3xl">
            Connecting readiness-certified exporters with pre-vetted institutional distributors,
            bonded warehousing hubs, and verified buyer consortia in destination markets.
          </p>

          <p className="font-body text-sm sm:text-base text-mad-slate max-w-3xl leading-relaxed">
            While Tiers 1 through 3 deliver the core mathematical readiness diagnostic, customs compliance vaults, and local currency banking rails, Tier 4 is actively being curated through formal bilateral business partnerships. Rather than launching a generic unvetted directory, we are onboarding accredited institutional partners corridor by corridor.
          </p>

          {/* Key Status Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-mad-green/10">
            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">ROLLOUT STATUS</p>
              <p className="font-mono-data text-xs sm:text-sm font-bold text-mad-gold mt-0.5">
                Phase 2 In Dev
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">INITIAL HUBS</p>
              <p className="font-mono-data text-xs sm:text-sm font-bold text-mad-green mt-0.5">
                UAE · UK · Singapore
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">VETTING STANDARD</p>
              <p className="font-mono-data text-xs sm:text-sm font-bold text-mad-green mt-0.5">
                Tier-1 / Level 3 KYC
              </p>
            </div>

            <div className="rounded-2xl bg-mad-cream p-3.5 border border-mad-green/10">
              <p className="font-mono-data text-[10px] uppercase text-mad-slate">ACCESS MODEL</p>
              <p className="font-mono-data text-xs sm:text-sm font-bold text-mad-green mt-0.5">
                Curated / Invitation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. WHAT TIER 4 WILL DELIVER (VISION ARCHITECTURE PILLARS)                 */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="subtle" size="sm">
            Ecosystem Blueprint
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-mad-green">
            Institutional Network Capabilities Under Construction
          </h2>
          <p className="font-body text-sm sm:text-base text-mad-slate">
            Every partner in Tier 4 is subjected to mandatory solvency auditing, compliance history verification, and operational capacity vetting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECOSYSTEM_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card key={idx} className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-mad-green/10 text-mad-green flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono-data text-[11px] text-mad-gold font-bold px-2 py-0.5 rounded bg-mad-gold/15 border border-mad-gold/30">
                      PHASE 2 SCOPE
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-mad-green">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-mad-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-mad-green/10 space-y-2">
                  <p className="font-mono-data text-[10px] uppercase text-mad-slate tracking-wider font-semibold">
                    Core Operational Deliverables
                  </p>
                  {pillar.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-mad-ink/80 font-body">
                      <CheckCircle2 className="h-3.5 w-3.5 text-mad-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRANSPARENT PHASE 2 DEVELOPMENT ROADMAP                                */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-10 shadow-card space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="gold" size="sm">
            Milestone Timeline
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-mad-green">
            Tier 4 Partner Network Roadmap
          </h2>
          <p className="font-body text-sm text-mad-slate">
            Our staged deployment schedule ensuring regulatory and operational integrity before open commercial matchmaking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_PHASES.map((ph, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-mad-cream p-6 border border-mad-green/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-xs font-bold text-mad-green bg-mad-green/10 px-2.5 py-0.5 rounded border border-mad-green/20">
                    {ph.phase}
                  </span>
                  <span className="font-mono-data text-xs text-mad-slate font-medium">
                    {ph.timeframe}
                  </span>
                </div>

                <h4 className="font-display text-base font-bold text-mad-green pt-1">
                  {ph.title}
                </h4>

                <p className="font-body text-xs text-mad-slate leading-relaxed">
                  {ph.description}
                </p>
              </div>

              <div className="pt-3 border-t border-mad-green/10">
                <span
                  className={`font-mono-data text-[11px] font-semibold ${
                    ph.status.includes("Active") ? "text-mad-gold" : "text-mad-slate"
                  }`}
                >
                  ● {ph.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GENUINE LOW-FRICTION EARLY ACCESS INTEREST CAPTURE FORM                */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-mad-green/25 bg-mad-cream-alt p-6 sm:p-10 lg:p-12 shadow-card">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="phase2" size="sm">
              Early Access Program
            </Badge>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-mad-green">
              Interested in Early Partner Introductions?
            </h2>
            <p className="font-body text-sm sm:text-base text-mad-slate max-w-xl mx-auto">
              Tell us about your target expansion corridors. Enterprises in our priority registry receive early access to verified distributor matches as bilateral hubs activate.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="capture-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Business Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@export-enterprise.com"
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink placeholder:text-mad-slate/50 focus:outline-none focus:ring-2 focus:ring-mad-green"
                    />
                  </div>

                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Global Exports Ltd"
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink placeholder:text-mad-slate/50 focus:outline-none focus:ring-2 focus:ring-mad-green"
                    />
                  </div>
                </div>

                {/* Target Corridors Multi-Select */}
                <div>
                  <label className="font-display text-xs font-bold text-mad-green block mb-1.5">
                    Target Expansion Corridors of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_CORRIDOR_OPTIONS.map((c) => {
                      const isSelected = selectedCorridors.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleCorridor(c)}
                          className={`px-3.5 py-1.5 rounded-xl font-mono-data text-xs transition-all ${
                            isSelected
                              ? "bg-mad-green text-mad-cream font-bold shadow-sm"
                              : "bg-white border border-mad-green/20 text-mad-ink hover:border-mad-green/40"
                          }`}
                        >
                          {isSelected ? `✓ ${c}` : `+ ${c}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Industry Sector
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink focus:outline-none focus:ring-2 focus:ring-mad-green"
                    >
                      <option value="Textiles & Apparel">Textiles & Apparel</option>
                      <option value="Electronics & Hardware">Electronics & Hardware</option>
                      <option value="Pharmaceuticals & Healthcare">Pharmaceuticals & Healthcare</option>
                      <option value="Software & IT Services">Software & IT Services</option>
                      <option value="Agriculture & Food Products">Agriculture & Food Products</option>
                      <option value="Other / General Goods">Other / General Goods</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Planned Expansion Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink focus:outline-none focus:ring-2 focus:ring-mad-green"
                    >
                      <option value="Next 1–3 Months">Next 1–3 Months</option>
                      <option value="3–6 Months">3–6 Months</option>
                      <option value="6–12 Months">6–12 Months</option>
                      <option value="Exploring for 2027">Exploring for 2027</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-mono-data text-xs text-mad-slate">
                    PRIVACY: No spam. Used strictly for Tier 4 priority matching.
                  </span>
                  <Button type="submit" variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    <span>Register for Early Partner Access</span>
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-mad-cream border border-mad-green/20 p-8 text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-mad-green/10 text-mad-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-mad-green">
                  Priority Access Registered
                </h3>
                <p className="font-body text-sm text-mad-slate max-w-md mx-auto leading-relaxed">
                  Thank you for submitting details for <strong className="text-mad-green">{companyName}</strong>. Your enterprise has been indexed for priority matchmaking across <strong className="text-mad-green">{selectedCorridors.join(", ")}</strong> as Phase 2 partner hubs go live.
                </p>
                <div className="pt-2 font-mono-data text-xs text-mad-slate bg-mad-cream-alt p-3 rounded-xl max-w-sm mx-auto border border-mad-green/10">
                  <span>CONFIRMATION_ID: MAD-T4-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. CROSS-TIER NAVIGATION: EXPLORE LIVE OPERATIONAL TIERS                 */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-mad-green">
              While Phase 2 is in preparation, explore our live tools
            </h3>
            <p className="font-body text-xs sm:text-sm text-mad-slate">
              Complete your Tier 1 diagnostic score or review bilateral customs compliance protocols.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/readiness-score">
              <Button variant="outline" size="sm">
                <span>Calculate Readiness (Tier 1)</span>
              </Button>
            </Link>
            <Link href="/compliance-navigator">
              <Button variant="secondary" size="sm">
                <span>Compliance Navigator (Tier 2)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
