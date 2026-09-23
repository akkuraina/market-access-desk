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
    tagline: "Multivariate diagnostic scoring product-market fit, compliance posture, and cross-border capability across 12 weighted signals.",
    description:
      "Computes operational readiness across origin tax regimes, bilateral customs friction, localized settlement viability, and product certification standards in <2 minutes.",
    deliverables: [
      "Dynamic 0–100 weighted readiness index with radar breakdown",
      "Corridor-specific tariff & duty exposure simulation",
      "Regulatory gap mitigation checklist with timeline estimates",
      "Deterministic corridor qualification summary",
    ],
    metrics: [
      { label: "Evaluation Signals", value: "12 Signals" },
      { label: "Corridor Profiles", value: "40+ Corridors" },
      { label: "Runtime", value: "< 2 Minutes" },
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
    tagline: "Bilateral tariff schedules, customs filing protocols, and mandatory import licensing matrices.",
    description:
      "Indexes HS code classifications, bilateral FTA preferential duty rules (CEPA, CECA, ECTA), VAT/GST OSS mechanisms, and mandatory technical certifications per corridor.",
    deliverables: [
      "HS-code tariff calculator with preferential duty delta",
      "Corridor tax & licensing checklist (HMRC, CBP, FTA, EU OSS)",
      "Mandatory shipping & customs documentation matrix",
      "Bilateral clearance timeline benchmarks",
    ],
    metrics: [
      { label: "Treaties Indexed", value: "35+ Treaties" },
      { label: "Tariff Resolution", value: "6-Digit HS" },
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
    tagline: "Local currency collection accounts, wholesale spot FX rates, and direct RBI AD-1 settlement.",
    description:
      "Enables exporters to invoice and collect locally in destination currencies (GBP, AED, USD, SGD, EUR) while settling into domestic INR accounts within 4-8 business hours.",
    deliverables: [
      "Virtual IBAN & domestic collection account provisioning",
      "Direct RBI EDPMS filing with automated e-BRC generation",
      "Institutional wholesale FX spot rates without wire margins",
      "Multi-party escrow agreement milestone triggers",
    ],
    metrics: [
      { label: "Settlement Speed", value: "4.2h – 8.0h" },
      { label: "FX Currencies", value: "5 G10 Rails" },
      { label: "Cost Savings", value: "~65% vs Wire" },
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
    tagline: "Pre-screened Tier-1 distributors, bonded 3PL logistics hubs, and verified buyer consortia.",
    description:
      "Bilateral business onboarding connecting readiness-certified exporters with accredited destination distributors, JAFZA/Singapore bonded fulfillment centers, and verified buyer tenders.",
    deliverables: [
      "Level 3 KYC institutional distributor solvency underwriting",
      "Bonded warehouse slot allocation at key trade hubs",
      "Standardized bilingual commercial contract templates",
      "Inspection-conditional escrow fund release binding",
    ],
    metrics: [
      { label: "Onboarding Model", value: "Bilateral MSAs" },
      { label: "Initial Hubs", value: "UAE · UK · SG" },
      { label: "Vetting Standard", value: "Level 3 KYC" },
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
    tagline: "Corridor settlement telemetry, peer expansion trajectories, and portable Expansion Credit Scores.",
    description:
      "Transforms continuous cross-border transaction telemetry into underwriting intelligence—benchmarking unit economics and generating a portable credit score recognized by trade financiers.",
    deliverables: [
      "Cryptographic Expansion Credit Score (0–850 underwriting)",
      "Real-time monthly corridor settlement volume telemetry",
      "Peer cohort expansion recommendations based on HS codes",
      "Unit economics and clearing velocity benchmarks",
    ],
    metrics: [
      { label: "Credit Underwriting", value: "Grade A1 Model" },
      { label: "Telemetry Basis", value: "Real Rails Data" },
      { label: "Corridor Benchmarks", value: "LTM Run-Rate" },
    ],
    icon: TrendingUp,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const FiveTierSection: React.FC = () => {
  return (
    <section id="architecture" className="py-16 sm:py-24 lg:py-32 bg-[#FAF7F0] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-black/10">
          <SectionHeading
            badge="OPERATIONAL ARCHITECTURE"
            title={
              <>
                Five-Tier Market Access{" "}
                <span className="font-italic-accent text-[#FF4D1C] font-normal italic">
                  Operating System
                </span>
              </>
            }
            subtitle="A sequential operational framework engineered to systematically derisk international expansion from initial diagnostics through verified settlement."
            size="xl"
            className="max-w-3xl"
          />
        </div>

        {/* Editorial Vertical Staggered Sequence */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 space-y-6"
        >
          {tiersData.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.code}
                variants={itemVariants}
                className={`group relative rounded-3xl border transition-all duration-200 p-6 sm:p-8 lg:p-10 ${
                  tier.isPhase2
                    ? "border-dashed border-black/25 bg-white/70 hover:border-[#FF4D1C]/60"
                    : "border-black/10 bg-white hover:border-black/30 hover:shadow-subtle"
                }`}
              >
                {/* Background Large Faint Tier Number in Margin */}
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-4 select-none font-mono-data text-7xl sm:text-9xl font-bold tracking-tighter text-black/[0.03] group-hover:text-black/[0.05] transition-colors pointer-events-none"
                >
                  {tier.number}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
                  {/* Left Column: Number, Title, Description, Metrics */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Status / Code Badge Row */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="font-mono-data text-xs font-bold text-[#0A0A0A] bg-black/5 px-2.5 py-1 rounded-md border border-black/10">
                          {tier.tier}
                        </span>
                        <span className="font-mono-data text-[11px] text-[#52525B]">
                          [{tier.code}]
                        </span>
                        {tier.isPhase2 ? (
                          <Badge variant="phase2" size="xs">
                            Phase 2 · Preview
                          </Badge>
                        ) : (
                          <Badge variant="subtle" size="xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            Live System
                          </Badge>
                        )}
                      </div>

                      {/* Tier Title */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0A0A0A] tracking-tight group-hover:text-[#FF4D1C] transition-colors">
                        {tier.title}
                      </h3>

                      {/* Tagline */}
                      <p className="mt-2 font-display text-base sm:text-lg text-[#0A0A0A]/85 font-normal leading-snug">
                        {tier.tagline}
                      </p>

                      {/* Extended Narrative */}
                      <p className="mt-3 font-body text-sm text-[#52525B] leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Operational Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-black/10">
                      {tier.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <p className="font-mono-data text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider">
                            {m.label}
                          </p>
                          <p className="font-mono-data text-xs sm:text-sm font-bold text-[#0A0A0A]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables & Direct Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FAF7F0] border border-black/10 p-6 sm:p-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-7 w-7 rounded-lg bg-black/5 text-[#0A0A0A] flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                          CORE OPERATIONAL DELIVERABLES
                        </h4>
                      </div>

                      <ul className="space-y-2.5">
                        {tier.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A0A0A]/90 font-body">
                            <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-black/10">
                      {tier.isPhase2 ? (
                        <div className="flex items-center justify-between">
                          <span className="font-mono-data text-xs text-[#52525B] flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5 text-[#52525B]" /> Private Preview
                          </span>
                          <Link href={tier.href}>
                            <Button variant="outline" size="sm" className="border-black/20 hover:border-black text-[#0A0A0A] font-mono-data text-xs">
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

