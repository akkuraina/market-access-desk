"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  ExternalLink,
  Users,
  ChevronRight,
  Sparkles,
  Download,
  X,
  Send,
  Calendar,
  Layers,
  Scale,
} from "lucide-react";
import {
  COMPLIANCE_CORRIDORS,
  type CorridorComplianceData,
  type ComplianceRequirement,
} from "@/lib/complianceData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const CORRIDOR_OPTIONS = [
  { key: "India->UAE", label: "India → UAE", flag: "🇦🇪", desc: "CEPA Preferential Corridor" },
  { key: "India->United Kingdom", label: "India → UK", flag: "🇬🇧", desc: "DCTS & Post-Brexit Framework" },
  { key: "India->United States", label: "India → USA", flag: "🇺🇸", desc: "CBP Formal Entry & PGA Rules" },
  { key: "India->Singapore", label: "India → Singapore", flag: "🇸🇬", desc: "CECA & ASEAN Gateway" },
];

export const ComplianceNavigatorClient: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("India->UAE");
  const [humanReviewModalOpen, setHumanReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");

  const currentCorridor: CorridorComplianceData =
    COMPLIANCE_CORRIDORS[selectedKey] || COMPLIANCE_CORRIDORS["India->UAE"];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setHumanReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewEmail("");
      setReviewNotes("");
    }, 2500);
  };

  return (
    <div className="w-full space-y-12">
      {/* ========================================================================= */}
      {/* 1. CORRIDOR SELECTION HUB                                                 */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-mad-green/10">
          <div>
            <span className="font-mono-data text-xs text-mad-gold font-bold uppercase tracking-wider">
              CORRIDOR KNOWLEDGE ENGINE
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-mad-green mt-1">
              Select Trade Corridor
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setHumanReviewModalOpen(true)}
              className="gap-1.5"
            >
              <Users className="h-4 w-4" />
              <span>Request Human Review</span>
            </Button>
          </div>
        </div>

        {/* Rapid Corridor Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
          {CORRIDOR_OPTIONS.map((opt) => {
            const isSelected = selectedKey === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelectedKey(opt.key)}
                className={`flex flex-col justify-between p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-mad-green text-mad-cream border-mad-green shadow-sm ring-2 ring-mad-green/20"
                    : "bg-mad-cream border-mad-green/15 text-mad-ink hover:border-mad-green/40 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{opt.flag}</span>
                    <span className="font-display font-bold text-sm sm:text-base">{opt.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-mad-gold shrink-0" />}
                </div>
                <p
                  className={`font-mono-data text-[11px] mt-2.5 ${
                    isSelected ? "text-mad-cream/80" : "text-mad-slate"
                  }`}
                >
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CORRIDOR EXECUTIVE BRIEFING BANNER                                     */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCorridor.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 sm:p-10 shadow-card relative overflow-hidden">
            {/* Background Navigational Chart Watermark */}
            <svg
              className="absolute -top-10 -right-10 h-80 w-80 text-mad-green opacity-[0.04] pointer-events-none"
              viewBox="0 0 300 300"
              fill="none"
            >
              <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="150" cy="150" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            </svg>

            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono-data text-xs font-bold text-mad-green bg-mad-green/10 px-3 py-1 rounded-md border border-mad-green/20">
                  CORRIDOR: {currentCorridor.corridorTitle}
                </span>
                <Badge variant="gold" size="sm">
                  {currentCorridor.treatyStatus}
                </Badge>
              </div>

              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-mad-green">
                  {currentCorridor.corridorTitle} Compliance Protocol
                </h1>
                <p className="mt-2 font-body text-base text-mad-slate max-w-3xl leading-relaxed">
                  Governed by the <strong className="text-mad-green font-semibold">{currentCorridor.bilateralTreaty}</strong>. {currentCorridor.dutyAdvantageSummary}
                </p>
              </div>

              {/* Corridor Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-mad-green/10">
                <div className="rounded-2xl bg-mad-cream p-4 border border-mad-green/10">
                  <p className="font-mono-data text-[10px] uppercase text-mad-slate tracking-wider">
                    BILATERAL TREATY
                  </p>
                  <p className="font-display text-sm font-bold text-mad-green mt-1">
                    {currentCorridor.bilateralTreaty}
                  </p>
                </div>

                <div className="rounded-2xl bg-mad-cream p-4 border border-mad-green/10">
                  <p className="font-mono-data text-[10px] uppercase text-mad-slate tracking-wider">
                    CUSTOMS CLEARANCE SPEED
                  </p>
                  <p className="font-mono-data text-xl font-bold text-mad-green mt-1">
                    {currentCorridor.averageCustomsClearanceDays}
                  </p>
                </div>

                <div className="rounded-2xl bg-mad-cream p-4 border border-mad-green/10">
                  <p className="font-mono-data text-[10px] uppercase text-mad-slate tracking-wider">
                    TYPICAL COMPLIANCE TIMELINE
                  </p>
                  <p className="font-mono-data text-xl font-bold text-mad-gold mt-1">
                    {currentCorridor.overallTimeline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. STRUCTURED KNOWLEDGE BREAKDOWN SECTIONS                                */}
          {/* ========================================================================= */}

          {/* SECTION A: Tax & Registration Requirements */}
          <section className="space-y-6">
            <SectionHeading
              badge="Regulatory Vector 01"
              title="Tax & Corporate Registration Requirements"
              subtitle="Mandatory tax identifiers, non-resident registrations, and export tax exemption instruments."
              size="md"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {currentCorridor.taxAndRegistration.map((req) => (
                <Card key={req.id} className="flex flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-[11px] font-bold text-mad-green bg-mad-green/10 px-2.5 py-0.5 rounded border border-mad-green/20">
                        {req.tag}
                      </span>
                      <span className="font-mono-data text-xs text-mad-slate">
                        ~{req.estimatedDays}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display text-base font-bold text-mad-green leading-snug">
                        {req.title}
                      </h4>
                      <p className="font-mono-data text-[11px] text-mad-slate mt-0.5">
                        Authority: {req.authority}
                      </p>
                    </div>

                    <p className="font-body text-xs text-mad-slate leading-relaxed">
                      {req.description}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-mad-green/10">
                      {req.keyDetails.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-mad-ink/80 font-body">
                          <span className="text-mad-gold mt-0.5 font-bold">›</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-mad-green/10 flex items-center justify-between">
                    <span className="font-mono-data text-[10px] uppercase text-mad-green font-semibold">
                      {req.mandatory ? "● Mandatory Requirement" : "○ Recommended Option"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION B: Licensing & Standards */}
          <section className="space-y-6">
            <SectionHeading
              badge="Regulatory Vector 02"
              title="Licensing & Conformity Assessment"
              subtitle="Product safety standards, bilateral rules of origin certifications, and jurisdictional agency filings."
              size="md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCorridor.licensingAndApprovals.map((lic) => (
                <Card key={lic.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-[11px] font-bold text-mad-gold bg-mad-gold/15 px-2.5 py-0.5 rounded border border-mad-gold/30">
                      {lic.tag}
                    </span>
                    <span className="font-mono-data text-xs text-mad-slate">
                      Lead Time: {lic.estimatedDays}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-lg font-bold text-mad-green leading-snug">
                      {lic.title}
                    </h4>
                    <p className="font-mono-data text-xs text-mad-slate mt-0.5">
                      Filing Authority: {lic.authority}
                    </p>
                  </div>

                  <p className="font-body text-sm text-mad-slate leading-relaxed">
                    {lic.description}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-mad-green/10">
                    {lic.keyDetails.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-mad-ink/85 font-body">
                        <CheckCircle2 className="h-3.5 w-3.5 text-mad-green shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION C: Mandatory Documentation Checklist */}
          <section className="space-y-6">
            <SectionHeading
              badge="Regulatory Vector 03"
              title="Customs Documentation & Clearance Vault"
              subtitle="Core electronic manifests, title documents, and trade compliance certificates required for dispatch."
              size="md"
            />

            <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-mad-green/15 bg-mad-green/5 text-mad-green font-display text-xs uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Document Title</th>
                      <th className="px-6 py-4">Filing Authority</th>
                      <th className="px-6 py-4">Format</th>
                      <th className="px-6 py-4">Filing Lead Time</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mad-green/10 font-body">
                    {currentCorridor.mandatoryDocumentation.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-display font-bold text-mad-green">{doc.name}</p>
                          <p className="text-xs text-mad-slate mt-0.5">{doc.purpose}</p>
                        </td>
                        <td className="px-6 py-4 font-mono-data text-xs text-mad-slate">
                          {doc.filingAuthority}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-mad-cream border border-mad-green/10">
                            {doc.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono-data text-xs text-mad-slate">
                          {doc.leadTime}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono-data text-xs font-semibold text-mad-green bg-mad-green/10 px-2.5 py-1 rounded-full border border-mad-green/20">
                            Required
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION D: Typical Operational Timeline & Milestone Roadmap */}
          <section className="space-y-6">
            <SectionHeading
              badge="Regulatory Vector 04"
              title="Corridor Milestone Execution Roadmap"
              subtitle="Sequential operational phases from initial export licensing through port clearance and currency receipt."
              size="md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCorridor.timelineMilestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-6 flex flex-col justify-between space-y-4 hover:border-mad-green/35 transition-all shadow-card"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-xs font-bold text-mad-gold bg-mad-gold/15 px-2.5 py-0.5 rounded border border-mad-gold/30">
                        {ms.phase}
                      </span>
                      <span className="font-mono-data text-xs text-mad-slate">
                        {ms.timeframe}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-mad-green pt-1">
                      {ms.title}
                    </h4>

                    <p className="font-body text-xs text-mad-slate leading-relaxed">
                      {ms.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-mad-green/10">
                    <p className="font-mono-data text-[10px] uppercase text-mad-slate">Key Deliverable</p>
                    <p className="font-display text-xs font-semibold text-mad-green mt-0.5">
                      {ms.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. VISIBLE, LEGALLY SOUND DISCLAIMER NOTICE                               */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-mad-slate/20 bg-mad-cream-alt/70 p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="h-5 w-5 rounded-full bg-mad-slate/15 text-mad-slate flex items-center justify-center shrink-0 mt-0.5">
                <Info className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold text-xs text-mad-ink">
                  Regulatory & Compliance Advisory Notice
                </p>
                <p className="font-body text-xs text-mad-slate leading-relaxed">
                  This information is for planning purposes only and does not constitute legal, customs brokerage, or tax advice. Bilateral tariff schedules, partner government agency requirements, and exchange control regulations are subject to ongoing administrative updates. Consult a qualified professional or licensed customs attorney for your enterprise's specific operational parameters.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. TIER 2 → TIER 3 SETTLEMENT ACTION BRIDGE                               */}
          {/* ========================================================================= */}
          <div className="rounded-3xl border-2 border-mad-green bg-mad-green text-mad-cream p-8 sm:p-10 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-mono-data text-xs text-mad-gold font-bold bg-mad-gold/15 border border-mad-gold/30 px-2.5 py-1 rounded-full">
                  TIER 2 → TIER 3 CROSS-BORDER BRIDGE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-mad-cream">
                  Establish Local Settlement in {currentCorridor.targetMarket}
                </h3>
                <p className="font-body text-sm text-mad-cream/80 max-w-2xl leading-relaxed">
                  Once your documentation and customs compliance are in order, configure your local collection account, automated escrow milestones, and direct INR settlement rails.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link href={`/settlement-setup?target=${encodeURIComponent(currentCorridor.targetMarket)}`}>
                  <Button variant="gold" size="lg" className="w-full justify-between group">
                    <span>Configure Banking Setup</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setHumanReviewModalOpen(true)}
                  className="w-full text-mad-cream/80 hover:text-mad-cream hover:bg-mad-cream/10 font-mono-data text-xs"
                >
                  <span>Request Human Review with Desk</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. "REQUEST HUMAN REVIEW" MODAL (SEMI-AUTOMATED HYBRID MODEL AFFORDANCE)  */}
      {/* ========================================================================= */}
      {humanReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-mad-ink/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-3xl border border-mad-green/20 bg-mad-cream p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setHumanReviewModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-xl text-mad-slate hover:bg-mad-cream-alt hover:text-mad-ink"
            >
              <X className="h-5 w-5" />
            </button>

            {!reviewSubmitted ? (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div>
                  <Badge variant="gold" size="sm">
                    Human-in-the-Loop Consultation
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-mad-green mt-2">
                    Request Compliance Specialist Review
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-mad-slate mt-1">
                    Connect your {currentCorridor.corridorTitle} expansion plan with a dedicated MAD trade attorney or licensed customs broker for tailored legal validation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Business Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      placeholder="compliance@enterprise.com"
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink placeholder:text-mad-slate/50 focus:outline-none focus:ring-2 focus:ring-mad-green"
                    />
                  </div>

                  <div>
                    <label className="font-display text-xs font-bold text-mad-green block mb-1">
                      Product HS Codes or Specific Questions
                    </label>
                    <textarea
                      rows={3}
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="e.g., HS 6204.42 (Woven cotton apparel) — requesting CEPA origin rule verification..."
                      className="w-full rounded-xl border border-mad-green/20 bg-white p-3 font-body text-sm text-mad-ink placeholder:text-mad-slate/50 focus:outline-none focus:ring-2 focus:ring-mad-green"
                    />
                  </div>

                  <div className="rounded-xl bg-mad-cream-alt p-3 text-xs text-mad-slate font-mono-data">
                    <span>CORRIDOR: {currentCorridor.corridorTitle}</span>
                    <br />
                    <span>DESK_SLA: 24–48 Business Hours Response</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setHumanReviewModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" className="gap-1.5">
                    <Send className="h-4 w-4" />
                    <span>Submit Review Request</span>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="h-12 w-12 rounded-full bg-mad-green/10 text-mad-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-mad-green">
                  Review Request Dispatched
                </h3>
                <p className="font-body text-sm text-mad-slate max-w-sm mx-auto">
                  Your trade compliance dossier for <strong className="text-mad-green">{currentCorridor.corridorTitle}</strong> has been assigned to the MAD legal desk. A specialist will follow up shortly.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
