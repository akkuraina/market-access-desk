"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  Landmark,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TierItem {
  number: string;
  code: string;
  tier: string;
  title: string;
  href: string;
  status: string;
  isPhase2?: boolean;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
}

const tiersData: TierItem[] = [
  {
    number: "01",
    code: "T1_DIAGNOSTIC",
    tier: "Tier 1",
    title: "Market Readiness Score",
    href: "/readiness-score",
    status: "Live & Active",
    tagline: "Multivariate diagnostic scoring product-market fit, compliance posture, and cross-border capability.",
    description:
      "Analyzes 24 critical operational variables across unit economics, customs friction, localized payment viability, and product certification readiness before cross-border capital commitment.",
    deliverables: [
      "Dynamic 0–100 weighted readiness index",
      "Corridor-specific tariff & duty exposure simulation",
      "Gap mitigation priority checklist",
      "Downloadable export readiness certificate",
    ],
    metrics: [
      { label: "Evaluation Vectors", value: "24 Factors" },
      { label: "Corridor Depth", value: "Global" },
      { label: "Turnaround", value: "< 3 Minutes" },
    ],
    icon: Compass,
  },
  {
    number: "02",
    code: "T2_COMPLIANCE",
    tier: "Tier 2",
    title: "Regulatory & Compliance Navigator",
    href: "/compliance-navigator",
    status: "Live & Active",
    tagline: "Dynamic tariff calculations, customs clearance roadmaps, and automated licensing checklists.",
    description:
      "Transforms complex bilateral trade treaties and customs schedules into clear operational steps, indexing HS codes, mandatory test certifications, and local filing authorities.",
    deliverables: [
      "Automated HS code classification engine",
      "Bilateral FTA benefit & origin rule calculator",
      "Document vault with jurisdictional e-filing templates",
      "Non-tariff barrier (NTB) risk flagging",
    ],
    metrics: [
      { label: "Treaties Covered", value: "35+ FTAs" },
      { label: "HS Code Coverage", value: "6-Digit Level" },
      { label: "Clearance Acc.", value: "99.4%" },
    ],
    icon: ShieldCheck,
  },
  {
    number: "03",
    code: "T3_SETTLEMENT",
    tier: "Tier 3",
    title: "Local Settlement & Banking Setup",
    href: "/settlement-setup",
    status: "Live & Active",
    tagline: "Frictionless escrow architectures, local currency routing, and foreign exchange hedging strategies.",
    description:
      "Enables cross-border exporters to bill and collect in local destination currencies (AED, USD, SGD, EUR) while settling in INR without traditional intermediary correspondent bank friction.",
    deliverables: [
      "Virtual IBAN & local collection account provisioning",
      "Programmatic multi-party escrow agreement generator",
      "Forward exchange rate locking & volatility protection",
      "Real-time SWIFT gpi & local rails payout tracking",
    ],
    metrics: [
      { label: "Settlement Speed", value: "T+0 / T+1" },
      { label: "Supported FX", value: "18 Currencies" },
      { label: "Fee Reduction", value: "~60% vs Wire" },
    ],
    icon: Landmark,
  },
  {
    number: "04",
    code: "T4_NETWORK",
    tier: "Tier 4",
    title: "Demand & Partner Network",
    href: "/partner-network",
    status: "Phase 2 Preview",
    isPhase2: true,
    tagline: "Pre-vetted institutional distributors, local buyers, and bonded 3PL logistics operators.",
    description:
      "A curated, invite-only marketplace connecting export-ready brands with verified destination buyers, authorized regional trade houses, and certified bonded warehousing providers.",
    deliverables: [
      "Institutional buyer credential & credit risk verification",
      "Bonded customs warehousing & localized 3PL routing",
      "Structured trade finance syndication introductions",
      "End-to-end corridor escrow milestone binding",
    ],
    metrics: [
      { label: "Network Access", value: "Curated" },
      { label: "Corridor Hubs", value: "MENA & SEA" },
      { label: "Verification", value: "Level 3 KYC" },
    ],
    icon: Users,
  },
  {
    number: "05",
    code: "T5_INTELLIGENCE",
    tier: "Tier 5",
    title: "Trade Data Insights",
    href: "/trade-insights",
    status: "Live & Active",
    tagline: "Real-time corridor analytics, shipment price parity benchmarks, and buyer volume trends.",
    description:
      "Consolidates historical bill-of-lading records, seasonal freight fluctuation indexes, and buyer price sensitivity data into actionable competitive telemetry for international operators.",
    deliverables: [
      "Commodity price parity & margin benchmarking",
      "Monthly corridor volume & shipment velocity index",
      "Competitor landed-cost breakdown telemetry",
      "Emerging trade corridor opportunity scans",
    ],
    metrics: [
      { label: "Data Records", value: "40M+ Shipments" },
      { label: "Refresh Frequency", value: "Daily Sync" },
      { label: "Corridor Indices", value: "50+ Routes" },
    ],
    icon: TrendingUp,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const FiveTierSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 sm:py-28 lg:py-36 bg-mad-cream relative">
      {/* Decorative Corridor Axis Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-mad-green/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-16 border-b border-mad-green/10">
          <SectionHeading
            badge="Institutional Architecture"
            title="Five-Tier Market Access Operating System"
            subtitle="A sequential operational framework engineered to systematically derisk international expansion from initial diagnostics through verified settlement."
            size="xl"
            className="max-w-3xl"
          />

          <div className="hidden lg:flex flex-col items-end text-right font-mono-data text-xs text-mad-slate space-y-1">
            <span className="text-mad-green font-semibold">MAD_FRAMEWORK_SPEC_2026</span>
            <span>END-TO-END TRADE RUNTIME</span>
          </div>
        </div>

        {/* Editorial Vertical Staggered Sequence */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 space-y-8"
        >
          {tiersData.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.code}
                variants={itemVariants}
                className={`group relative rounded-3xl border transition-all duration-300 p-6 sm:p-8 lg:p-10 ${
                  tier.isPhase2
                    ? "border-dashed border-mad-gold/40 bg-mad-cream-alt/60 hover:border-mad-gold/70"
                    : "border-mad-green/15 bg-mad-cream-alt hover:border-mad-green/35 hover:shadow-card"
                }`}
              >
                {/* Background Large Faint Tier Number in Margin */}
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-4 select-none font-mono-data text-7xl sm:text-9xl font-bold tracking-tighter text-mad-green/[0.04] group-hover:text-mad-green/[0.07] transition-colors pointer-events-none"
                >
                  {tier.number}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
                  {/* Left Column: Number, Title, Description, Metrics */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Status / Code Badge Row */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="font-mono-data text-xs font-bold text-mad-green bg-mad-green/10 px-2.5 py-1 rounded-md border border-mad-green/20">
                          {tier.tier}
                        </span>
                        <span className="font-mono-data text-[11px] text-mad-slate">
                          [{tier.code}]
                        </span>
                        {tier.isPhase2 ? (
                          <Badge variant="phase2" size="xs">
                            <Sparkles className="h-3 w-3 text-mad-gold" />
                            Phase 2 — Coming Soon
                          </Badge>
                        ) : (
                          <Badge variant="subtle" size="xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            Live System
                          </Badge>
                        )}
                      </div>

                      {/* Tier Title */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-mad-green tracking-tight group-hover:text-mad-green-light transition-colors">
                        {tier.title}
                      </h3>

                      {/* Tagline */}
                      <p className="mt-2 font-display text-base sm:text-lg text-mad-ink/80 font-medium leading-snug">
                        {tier.tagline}
                      </p>

                      {/* Extended Narrative */}
                      <p className="mt-3 font-body text-sm text-mad-slate leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Operational Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-mad-green/10">
                      {tier.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <p className="font-mono-data text-[10px] sm:text-xs text-mad-slate uppercase tracking-wider">
                            {m.label}
                          </p>
                          <p className="font-mono-data text-xs sm:text-sm font-semibold text-mad-green">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables & Direct Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-mad-cream/80 border border-mad-green/10 p-6 sm:p-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-7 w-7 rounded-lg bg-mad-green/10 text-mad-green flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-mad-green">
                          Core Operational Outputs
                        </h4>
                      </div>

                      <ul className="space-y-2.5">
                        {tier.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-mad-ink/85 font-body">
                            <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-mad-green/10">
                      {tier.isPhase2 ? (
                        <div className="flex items-center justify-between">
                          <span className="font-mono-data text-xs text-mad-slate flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5 text-mad-slate/60" /> Private Preview
                          </span>
                          <Link href={tier.href}>
                            <Button variant="outline" size="sm" className="border-mad-gold/40 hover:border-mad-gold text-mad-ink font-mono-data text-xs">
                              <span>View Roadmap</span>
                              <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Link href={tier.href} className="w-full block">
                          <Button variant="primary" size="md" className="w-full justify-between group/btn">
                            <span>Open {tier.tier} Workspace</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
