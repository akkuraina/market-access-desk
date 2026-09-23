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
      <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10">
          <div>
            <span className="font-mono-data text-xs text-[#FF4D1C] font-semibold uppercase tracking-wider">
              CORRIDOR KNOWLEDGE ENGINE
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A] mt-1">
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
              <span>Request Specialist Review</span>
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
                    ? "bg-[#0A0A0A] text-white border-black shadow-sm"
                    : "bg-[#FAF7F0] border-black/10 text-[#0A0A0A] hover:border-black/30 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{opt.flag}</span>
                    <span className="font-body font-semibold text-sm sm:text-base">{opt.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-[#FF4D1C] shrink-0" />}
                </div>
                <p
                  className={`font-mono-data text-[11px] mt-2.5 ${
                    isSelected ? "text-zinc-300" : "text-[#52525B]"
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
          <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 shadow-subtle relative overflow-hidden">
            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono-data text-xs font-bold text-[#0A0A0A] bg-black/5 px-3 py-1 rounded-md border border-black/10">
                  CORRIDOR: {currentCorridor.corridorTitle}
                </span>
                <Badge variant="orange" size="sm">
                  {currentCorridor.treatyStatus}
                </Badge>
              </div>

              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#0A0A0A]">
                  {currentCorridor.corridorTitle} Compliance Protocol
                </h1>
                <p className="mt-2 font-body text-base text-[#52525B] max-w-3xl leading-relaxed">
                  Governed by the <strong className="text-[#0A0A0A] font-semibold">{currentCorridor.bilateralTreaty}</strong>. {currentCorridor.dutyAdvantageSummary}
                </p>
              </div>

              {/* Corridor Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                  <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                    BILATERAL TREATY
                  </p>
                  <p className="font-body text-sm font-bold text-[#0A0A0A] mt-1">
                    {currentCorridor.bilateralTreaty}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                  <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                    CUSTOMS CLEARANCE SPEED
                  </p>
                  <p className="font-mono-data text-xl font-bold text-[#0A0A0A] mt-1">
                    {currentCorridor.averageCustomsClearanceDays}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                  <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                    TYPICAL COMPLIANCE TIMELINE
                  </p>
                  <p className="font-mono-data text-xl font-bold text-[#FF4D1C] mt-1">
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
              badge="REGULATORY VECTOR 01"
              title="Tax & Corporate Registration Requirements"
              subtitle="Mandatory tax identifiers, non-resident registrations, and export tax exemption instruments."
              size="md"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {currentCorridor.taxAndRegistration.map((req) => (
                <Card key={req.id} className="flex flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-[11px] font-bold text-[#0A0A0A] bg-black/5 px-2.5 py-0.5 rounded border border-black/10">
                        {req.tag}
                      </span>
                      <span className="font-mono-data text-xs text-[#52525B]">
                        ~{req.estimatedDays}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display text-base font-semibold text-[#0A0A0A] leading-snug">
                        {req.title}
                      </h4>
                      <p className="font-mono-data text-[11px] text-[#52525B] mt-0.5">
                        Authority: {req.authority}
                      </p>
                    </div>

                    <p className="font-body text-xs text-[#52525B] leading-relaxed">
                      {req.description}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-black/10">
                      {req.keyDetails.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#0A0A0A]/85 font-body">
                          <span className="text-[#FF4D1C] mt-0.5 font-bold">›</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="font-mono-data text-[10px] uppercase text-[#0A0A0A] font-semibold">
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
              badge="REGULATORY VECTOR 02"
              title="Licensing & Conformity Assessment"
              subtitle="Product safety standards, bilateral rules of origin certifications, and jurisdictional agency filings."
              size="md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCorridor.licensingAndApprovals.map((lic) => (
                <Card key={lic.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-[11px] font-bold text-[#FF4D1C] bg-[#FF4D1C]/10 px-2.5 py-0.5 rounded border border-[#FF4D1C]/30">
                      {lic.tag}
                    </span>
                    <span className="font-mono-data text-xs text-[#52525B]">
                      Lead Time: {lic.estimatedDays}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-lg font-semibold text-[#0A0A0A] leading-snug">
                      {lic.title}
                    </h4>
                    <p className="font-mono-data text-xs text-[#52525B] mt-0.5">
                      Filing Authority: {lic.authority}
                    </p>
                  </div>

                  <p className="font-body text-sm text-[#52525B] leading-relaxed">
                    {lic.description}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-black/10">
                    {lic.keyDetails.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0A0A0A]/90 font-body">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4D1C] shrink-0 mt-0.5" />
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
              badge="REGULATORY VECTOR 03"
              title="Customs Documentation & Clearance Vault"
              subtitle="Core electronic manifests, title documents, and trade compliance certificates required for dispatch."
              size="md"
            />

            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden shadow-subtle">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-black/10 bg-[#FAF7F0] text-[#0A0A0A] font-mono-data text-xs uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Document Title</th>
                      <th className="px-6 py-4">Filing Authority</th>
                      <th className="px-6 py-4">Format</th>
                      <th className="px-6 py-4">Filing Lead Time</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 font-body">
                    {currentCorridor.mandatoryDocumentation.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF7F0]/60 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-display font-semibold text-[#0A0A0A]">{doc.name}</p>
                          <p className="text-xs text-[#52525B] mt-0.5">{doc.purpose}</p>
                        </td>
                        <td className="px-6 py-4 font-mono-data text-xs text-[#52525B]">
                          {doc.filingAuthority}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-[#FAF7F0] border border-black/10">
                            {doc.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono-data text-xs text-[#52525B]">
                          {doc.leadTime}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono-data text-xs font-semibold text-[#0A0A0A] bg-black/5 px-2.5 py-1 rounded-full border border-black/10">
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
              badge="REGULATORY VECTOR 04"
              title="Corridor Milestone Execution Roadmap"
              subtitle="Sequential operational phases from initial export licensing through port clearance and currency receipt."
              size="md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCorridor.timelineMilestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-black/10 bg-white p-6 flex flex-col justify-between space-y-4 hover:border-black/30 transition-all shadow-subtle"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-xs font-bold text-[#FF4D1C] bg-[#FF4D1C]/10 px-2.5 py-0.5 rounded border border-[#FF4D1C]/25">
                        {ms.phase}
                      </span>
                      <span className="font-mono-data text-xs text-[#52525B]">
                        {ms.timeframe}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-semibold text-[#0A0A0A] pt-1">
                      {ms.title}
                    </h4>

                    <p className="font-body text-xs text-[#52525B] leading-relaxed">
                      {ms.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10">
                    <p className="font-mono-data text-[10px] uppercase text-[#52525B]">Key Deliverable</p>
                    <p className="font-body text-xs font-semibold text-[#0A0A0A] mt-0.5">
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
          <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 shadow-subtle">
            <div className="flex items-start gap-3.5">
              <div className="h-5 w-5 rounded-full bg-black/5 text-[#52525B] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold text-xs text-[#0A0A0A]">
                  Regulatory & Compliance Advisory Notice
                </p>
                <p className="font-body text-xs text-[#52525B] leading-relaxed">
                  This information is for planning purposes only and does not constitute legal, customs brokerage, or tax advice. Bilateral tariff schedules, partner government agency requirements, and exchange control regulations are subject to ongoing administrative updates. Consult a qualified professional or licensed customs attorney for your enterprise&apos;s specific operational parameters.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. TIER 2 → TIER 3 SETTLEMENT ACTION BRIDGE                               */}
          {/* ========================================================================= */}
          <div className="rounded-3xl border border-black bg-[#0A0A0A] text-white p-8 sm:p-10 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-mono-data text-xs text-[#FF4D1C] font-semibold bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 px-2.5 py-1 rounded-full">
                  TIER 2 → TIER 3 CROSS-BORDER BRIDGE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Establish Direct Local Settlement in {currentCorridor.targetMarket}
                </h3>
                <p className="font-body text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Once your documentation and customs compliance are in order, configure your dedicated local collection account, automated escrow milestones, and direct INR settlement rails.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link href={`/settlement-setup?target=${encodeURIComponent(currentCorridor.targetMarket)}`}>
                  <Button variant="orange" size="lg" className="w-full justify-between group">
                    <span>Configure Banking Setup</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setHumanReviewModalOpen(true)}
                  className="w-full text-zinc-300 hover:text-white hover:bg-white/10 font-mono-data text-xs"
                >
                  <span>Request Specialist Review</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setHumanReviewModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-xl text-[#52525B] hover:bg-black/5 hover:text-[#0A0A0A]"
            >
              <X className="h-5 w-5" />
            </button>

            {!reviewSubmitted ? (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div>
                  <Badge variant="orange" size="sm">
                    Specialist Consultation Desk
                  </Badge>
                  <h3 className="font-display text-2xl font-semibold text-[#0A0A0A] mt-2">
                    Request Compliance Specialist Review
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#52525B] mt-1">
                    Connect your {currentCorridor.corridorTitle} expansion plan with a dedicated MAD trade attorney or licensed customs broker for tailored legal validation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-display text-xs font-semibold text-[#0A0A0A] block mb-1">
                      Business Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      placeholder="compliance@enterprise.com"
                      className="w-full rounded-xl border border-black/20 bg-white p-3 font-body text-sm text-[#0A0A0A] placeholder:text-[#52525B]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D1C]"
                    />
                  </div>

                  <div>
                    <label className="font-display text-xs font-semibold text-[#0A0A0A] block mb-1">
                      Product HS Codes or Specific Questions
                    </label>
                    <textarea
                      rows={3}
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="e.g., HS 6204.42 (Woven cotton apparel) — requesting CEPA origin rule verification..."
                      className="w-full rounded-xl border border-black/20 bg-white p-3 font-body text-sm text-[#0A0A0A] placeholder:text-[#52525B]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D1C]"
                    />
                  </div>

                  <div className="rounded-xl bg-[#FAF7F0] p-3 text-xs text-[#52525B] font-mono-data">
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
                  <Button type="submit" variant="orange" size="md" className="gap-1.5">
                    <Send className="h-4 w-4" />
                    <span>Submit Review Request</span>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#0A0A0A]">
                  Review Request Dispatched
                </h3>
                <p className="font-body text-sm text-[#52525B] max-w-sm mx-auto">
                  Your trade compliance dossier for <strong className="text-[#0A0A0A]">{currentCorridor.corridorTitle}</strong> has been assigned to the MAD legal desk. A specialist will follow up shortly.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

