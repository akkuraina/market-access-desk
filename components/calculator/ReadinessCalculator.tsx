"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import {
  calculateReadinessScore,
  type HomeMarket,
  type Industry,
  type TargetMarket,
  type RevenueBand,
  type ExportExperience,
  type ReadinessInputs,
  type ReadinessResult,
} from "@/lib/readinessScore";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const HOME_MARKETS: { value: HomeMarket; label: string; flag: string }[] = [
  { value: "India", label: "India", flag: "🇮🇳" },
  { value: "Vietnam", label: "Vietnam", flag: "🇻🇳" },
  { value: "Indonesia", label: "Indonesia", flag: "🇮🇩" },
  { value: "UAE", label: "United Arab Emirates", flag: "🇦🇪" },
  { value: "United Kingdom", label: "United Kingdom", flag: "🇬🇧" },
  { value: "United States", label: "United States", flag: "🇺🇸" },
];

const INDUSTRIES: { value: Industry; label: string; desc: string }[] = [
  {
    value: "Textiles & Apparel",
    label: "Textiles & Apparel",
    desc: "Garments, technical fabrics, yarn, home textiles",
  },
  {
    value: "Electronics & Hardware",
    label: "Electronics & Hardware",
    desc: "Consumer devices, PCBAs, sensors, electrical gear",
  },
  {
    value: "Pharmaceuticals & Healthcare",
    label: "Pharmaceuticals & Healthcare",
    desc: "Generics, active ingredients (APIs), medical devices",
  },
  {
    value: "Software & IT Services",
    label: "Software & IT Services",
    desc: "SaaS, enterprise cloud software, managed tech services",
  },
  {
    value: "Agriculture & Food Products",
    label: "Agriculture & Food Products",
    desc: "Spices, processed foods, tea/coffee, agri-commodities",
  },
  {
    value: "Other / General Goods",
    label: "Other / General Goods",
    desc: "Specialty chemicals, metals, handicrafts, manufactured goods",
  },
];

const TARGET_MARKETS: { value: TargetMarket; label: string; region: string; flag: string }[] = [
  { value: "UAE", label: "United Arab Emirates", region: "Middle East (GCC / CEPA)", flag: "🇦🇪" },
  { value: "Singapore", label: "Singapore", region: "Southeast Asia (ASEAN / CECA)", flag: "🇸🇬" },
  { value: "United Kingdom", label: "United Kingdom", region: "Europe (UKCA / HMRC)", flag: "🇬🇧" },
  { value: "United States", label: "United States", region: "North America (CBP / FDA)", flag: "🇺🇸" },
  { value: "Germany", label: "Germany", region: "European Union (CE / CBAM)", flag: "🇩🇪" },
];

const REVENUE_BANDS: { value: RevenueBand; label: string; subtext: string }[] = [
  { value: "<$100k", label: "Under $100,000", subtext: "Early or pilot cross-border transactions" },
  { value: "$100k-$1M", label: "$100,000 – $1,000,000", subtext: "Active scaling export revenue" },
  { value: "$1M-$10M", label: "$1,000,000 – $10,000,000", subtext: "Established commercial trade operations" },
  { value: "$10M+", label: "$10,000,000+", subtext: "Large-scale institutional exporter" },
];

const EXPERIENCE_OPTIONS: { value: ExportExperience; label: string; desc: string }[] = [
  {
    value: "First time exporting",
    label: "First time exporting",
    desc: "Initial cross-border venture; setting up domestic export compliance and foreign accounts.",
  },
  {
    value: "Export to 1-2 markets",
    label: "Export to 1–2 markets",
    desc: "Operational experience in select bilateral routes with basic freight/invoicing setups.",
  },
  {
    value: "Export to 3+ markets",
    label: "Export to 3+ markets",
    desc: "Mature global footprint with structured trade finance and multi-currency billing.",
  },
];

const stepSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

export const ReadinessCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isCalculated, setIsCalculated] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ReadinessInputs>({
    homeMarket: "India",
    industry: "Textiles & Apparel",
    targetMarket: "UAE",
    exportRevenue: "$100k-$1M",
    exportExperience: "Export to 1-2 markets",
  });

  const [result, setResult] = useState<ReadinessResult | null>(null);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate
      const calculated = calculateReadinessScore(formData);
      setResult(calculated);
      setIsCalculated(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsCalculated(false);
    setCurrentStep(1);
    setDirection(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isCalculated ? (
          /* ========================================================================= */
          /* MULTI-STEP INPUT FLOW WIZARD                                              */
          /* ========================================================================= */
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl"
          >
            {/* Wizard Header Progress Bar matching Instrument Dial aesthetic */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark text-white font-mono-data text-xs font-semibold shadow-sm">
                    0{currentStep}
                  </div>
                  <div>
                    <p className="font-mono-data text-[11px] text-brand-muted uppercase tracking-wider">
                      DIAGNOSTIC VECTOR {currentStep} OF {totalSteps}
                    </p>
                    <h3 className="font-display text-base font-normal text-brand-dark">
                      {currentStep === 1 && "Select Home Jurisdiction"}
                      {currentStep === 2 && "Select Commercial Sector"}
                      {currentStep === 3 && "Select Target Expansion Corridor"}
                      {currentStep === 4 && "Select Export Revenue Scale"}
                      {currentStep === 5 && "Select Cross-Border Experience"}
                    </h3>
                  </div>
                </div>

                {/* Progress Dial Arc Indicator */}
                <div className="flex items-center gap-2 font-mono-data text-xs text-brand-muted">
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i + 1 === currentStep
                            ? "w-8 bg-[#FF4D1C]"
                            : i + 1 < currentStep
                            ? "w-4 bg-brand-dark"
                            : "w-4 bg-black/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-brand-dark font-semibold">
                    {Math.round((currentStep / totalSteps) * 100)}%
                  </span>
                </div>
              </div>

              {/* Step Questions with AnimatePresence */}
              <div className="pt-6 min-h-[320px] flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* STEP 1: Home Market */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={stepSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                          Where is your enterprise headquartered?
                        </h2>
                        <p className="font-body text-sm text-brand-muted mt-1">
                          Determines origin tax regimes, domestic export licensing (e.g. IEC / GST LUT in India), and bilateral treaty eligibility.
                        </p>
                      </div>

                      <div role="radiogroup" aria-label="Home Market" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {HOME_MARKETS.map((m) => {
                          const isSelected = formData.homeMarket === m.value;
                          return (
                            <button
                              key={m.value}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, homeMarket: m.value })}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-black/20"
                                  : "bg-[#F4F2EC] border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{m.flag}</span>
                                <div>
                                  <p className="font-body font-semibold text-sm">{m.label}</p>
                                  <p
                                    className={`font-mono-data text-[11px] ${
                                      isSelected ? "text-white/70" : "text-brand-muted"
                                    }`}
                                  >
                                    ORIGIN JURISDICTION
                                  </p>
                                </div>
                              </div>
                              {isSelected && <Check className="h-5 w-5 text-[#FF4D1C]" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Industry Sector */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={stepSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                          What is your primary product or service vertical?
                        </h2>
                        <p className="font-body text-sm text-brand-muted mt-1">
                          Applies sector-specific compliance weightings (e.g. testing standards, phytosanitary checks, or digital fulfillment).
                        </p>
                      </div>

                      <div role="radiogroup" aria-label="Industry Sector" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {INDUSTRIES.map((ind) => {
                          const isSelected = formData.industry === ind.value;
                          return (
                            <button
                              key={ind.value}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, industry: ind.value })}
                              className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-black/20"
                                  : "bg-[#F4F2EC] border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full">
                                <p className="font-body font-semibold text-sm">{ind.label}</p>
                                {isSelected && <Check className="h-4 w-4 text-[#FF4D1C] shrink-0 ml-2" />}
                              </div>
                              <p
                                className={`font-body text-xs mt-2 leading-relaxed ${
                                  isSelected ? "text-white/80" : "text-brand-muted"
                                }`}
                              >
                                {ind.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Target Expansion Market */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={stepSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                          Which target market are you evaluating for entry?
                        </h2>
                        <p className="font-body text-sm text-brand-muted mt-1">
                          Evaluates bilateral trade treaties, customs entry bonds, import licensing friction, and currency settlement options.
                        </p>
                      </div>

                      <div role="radiogroup" aria-label="Target Expansion Market" className="grid grid-cols-1 gap-3 pt-2">
                        {TARGET_MARKETS.map((tm) => {
                          const isSelected = formData.targetMarket === tm.value;
                          return (
                            <button
                              key={tm.value}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, targetMarket: tm.value })}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-black/20"
                                  : "bg-[#F4F2EC] border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <span className="text-2xl">{tm.flag}</span>
                                <div>
                                  <p className="font-body font-semibold text-base">{tm.label}</p>
                                  <p
                                    className={`font-mono-data text-xs ${
                                      isSelected ? "text-white/80" : "text-brand-muted"
                                    }`}
                                  >
                                    {tm.region}
                                  </p>
                                </div>
                              </div>
                              {isSelected ? (
                                <div className="flex items-center gap-2">
                                  <span className="font-mono-data text-xs text-[#FF4D1C] font-semibold">SELECTED CORRIDOR</span>
                                  <Check className="h-5 w-5 text-[#FF4D1C]" />
                                </div>
                              ) : (
                                <span className="font-mono-data text-xs text-brand-muted/60">Select</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Annual Export Revenue */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      custom={direction}
                      variants={stepSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                          What is your current approximate annual export revenue?
                        </h2>
                        <p className="font-body text-sm text-brand-muted mt-1">
                          Assesses working capital depth for customs bonds, international escrow buffers, and localized marketing support.
                        </p>
                      </div>

                      <div role="radiogroup" aria-label="Annual Export Revenue" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {REVENUE_BANDS.map((rev) => {
                          const isSelected = formData.exportRevenue === rev.value;
                          return (
                            <button
                              key={rev.value}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, exportRevenue: rev.value })}
                              className={`flex flex-col justify-between p-5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-black/20"
                                  : "bg-[#F4F2EC] border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`font-mono-data text-base font-semibold ${
                                    isSelected ? "text-[#FF4D1C]" : "text-brand-dark"
                                  }`}
                                >
                                  {rev.label}
                                </span>
                                {isSelected && <Check className="h-4 w-4 text-[#FF4D1C]" />}
                              </div>
                              <p
                                className={`font-body text-xs mt-3 ${
                                  isSelected ? "text-white/80" : "text-brand-muted"
                                }`}
                              >
                                {rev.subtext}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Current Export Experience */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      custom={direction}
                      variants={stepSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-normal text-brand-dark">
                          What is your enterprise's cross-border export experience?
                        </h2>
                        <p className="font-body text-sm text-brand-muted mt-1">
                          Evaluates existing logistics maturity, customs filing experience, and multi-currency billing readiness.
                        </p>
                      </div>

                      <div role="radiogroup" aria-label="Export Experience" className="space-y-3 pt-2">
                        {EXPERIENCE_OPTIONS.map((exp) => {
                          const isSelected = formData.exportExperience === exp.value;
                          return (
                            <button
                              key={exp.value}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, exportExperience: exp.value })}
                              className={`flex items-start justify-between w-full p-4 sm:p-5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-black/20"
                                  : "bg-[#F4F2EC] border-black/10 text-brand-dark hover:border-black/30 hover:bg-white"
                              }`}
                            >
                              <div className="space-y-1 max-w-xl">
                                <p className="font-body font-semibold text-base">{exp.label}</p>
                                <p
                                  className={`font-body text-xs sm:text-sm leading-relaxed ${
                                    isSelected ? "text-white/80" : "text-brand-muted"
                                  }`}
                                >
                                  {exp.desc}
                                </p>
                              </div>
                              <div className="mt-1">
                                <div
                                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? "border-[#FF4D1C] bg-[#FF4D1C] text-white"
                                      : "border-black/30 bg-transparent"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3.5 w-3.5 font-bold" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Form Action Controls */}
                <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                    <span>Back</span>
                  </Button>

                  <Button variant="orange" size="lg" onClick={handleNext} className="group">
                    <span>{currentStep === totalSteps ? "Generate Readiness Score" : "Next Factor"}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* INTERACTIVE RESULTS REPORT VIEW                                           */
          /* ========================================================================= */
          result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Results Top Hero Card */}
              <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 shadow-subtle relative overflow-hidden">
                <div className="relative">
                  {/* Top Bar: Corridor Breadcrumb & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-data text-xs font-bold text-[#0A0A0A] bg-black/5 px-3 py-1 rounded-md border border-black/10">
                        CORRIDOR: {result.corridorCode}
                      </span>
                      <Badge variant="orange" size="sm">
                        {result.scoreBand}
                      </Badge>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-data text-[#52525B] hover:text-[#0A0A0A] px-3 py-1.5 rounded-lg border border-black/15 bg-white hover:bg-[#F4F2EC] transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Modify Parameters</span>
                    </button>
                  </div>

                  {/* Main Results Layout: Gauge + Summary Telemetry */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
                    {/* Left: Score Gauge Instrument */}
                    <div className="lg:col-span-5 flex justify-center">
                      <ScoreGauge
                        score={result.overallScore}
                        maxScore={100}
                        size={250}
                        label="Calculated Readiness Index"
                        sublabel={result.scoreBand}
                        corridor={result.corridorCode}
                      />
                    </div>

                    {/* Right: Telemetry & Executive Summary */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0A0A0A]">
                          Corridor Access Analysis
                        </h2>
                        <p className="mt-2 font-body text-sm sm:text-base text-[#52525B] leading-relaxed">
                          {result.corridorSummary}
                        </p>
                      </div>

                      {/* Primary Diagnostic Metrics Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                        <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                          <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                            ESTIMATED TIMELINE
                          </p>
                          <p className="font-mono-data text-xl sm:text-2xl font-bold text-[#0A0A0A] mt-1">
                            {result.estimatedTimelineMonths}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                          <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                            REGULATORY FRICTION
                          </p>
                          <p
                            className={`font-mono-data text-xl sm:text-2xl font-bold mt-1 ${
                              result.regulatoryComplexity === "Low"
                                ? "text-emerald-700"
                                : result.regulatoryComplexity === "Medium"
                                ? "text-[#FF4D1C]"
                                : "text-amber-700"
                            }`}
                          >
                            {result.regulatoryComplexity}
                          </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#FAF7F0] p-4 border border-black/10">
                          <p className="font-mono-data text-[10px] uppercase text-[#52525B] tracking-wider">
                            SECTOR PROFILE
                          </p>
                          <p className="font-body text-sm font-bold text-[#0A0A0A] mt-1 truncate">
                            {formData.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Section: Factor Breakdown + Compliance Checklist */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Column 1: Specific Impact Factors (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#0A0A0A]">
                        Scoring Factor Breakdown
                      </h3>
                      <p className="font-body text-xs text-[#52525B] mt-0.5">
                        Specific positive drivers and regulatory frictions impacting your score.
                      </p>
                    </div>
                    <span className="font-mono-data text-xs text-[#52525B]">
                      {result.factors.length} Evaluated Factors
                    </span>
                  </div>

                  <div className="space-y-3">
                    {result.factors.map((factor, idx) => {
                      const isPositive = factor.impact === "positive";
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-black/10 bg-white p-5 transition-all hover:border-black/25 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              {isPositive ? (
                                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full bg-[#FF4D1C]/10 text-[#FF4D1C] flex items-center justify-center shrink-0">
                                  <AlertTriangle className="h-4 w-4" />
                                </div>
                              )}
                              <h4 className="font-display text-sm font-semibold text-[#0A0A0A]">
                                {factor.label}
                              </h4>
                            </div>

                            <span
                              className={`font-mono-data text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                isPositive
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-[#FF4D1C]/10 text-[#FF4D1C] border border-[#FF4D1C]/20"
                              }`}
                            >
                              {factor.points >= 0 ? `+${factor.points} pts` : `${factor.points} pts`}
                            </span>
                          </div>

                          <p className="font-body text-xs text-[#52525B] leading-relaxed pl-8">
                            {factor.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Corridor Compliance Checklist (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0A0A0A]">
                      Corridor Compliance Roadmap
                    </h3>
                    <p className="font-body text-xs text-[#52525B] mt-0.5">
                      Key documentation & filing milestones required for {result.corridorCode}.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-black/10 bg-white p-6 space-y-4 shadow-subtle">
                    {result.complianceChecklist.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-black/10 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xs font-semibold text-[#0A0A0A]">
                            {idx + 1}. {item.title}
                          </span>
                          <span className="font-mono-data text-[10px] text-[#52525B]">
                            ~{item.estimatedDays} Days
                          </span>
                        </div>
                        <p className="font-body text-xs text-[#52525B] leading-relaxed">
                          {item.description}
                        </p>
                        {item.mandatory && (
                          <div className="pt-1">
                            <span className="font-mono-data text-[9px] uppercase tracking-wider text-[#FF4D1C] font-semibold">
                              ● Mandatory Requirement
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="pt-2">
                      <Link href="/compliance-navigator" className="w-full block">
                        <Button variant="outline" size="sm" className="w-full justify-between font-mono-data text-xs">
                          <span>Explore Compliance Navigator Checklist</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flagship Readiness → Settlement Bridge Card */}
              <div className="rounded-3xl border border-black bg-[#0A0A0A] text-white p-8 sm:p-10 shadow-card">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-data text-xs text-[#FF4D1C] font-semibold bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 px-2.5 py-1 rounded-full">
                        READINESS → SETTLEMENT ARCHITECTURE BRIDGE
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                      Direct Local Currency Settlement in {formData.targetMarket}
                    </h3>

                    <p className="font-body text-sm text-zinc-300 max-w-2xl leading-relaxed">
                      Your readiness diagnostic is verified for the {result.corridorCode} trade corridor. Proceed to provision your dedicated local currency collection accounts, multi-party escrow agreements, and automated INR settlement rails.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                    <Link href={`/settlement-setup?target=${encodeURIComponent(formData.targetMarket)}`}>
                      <Button variant="orange" size="lg" className="w-full justify-between group">
                        <span>Configure Settlement Setup</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link href="/compliance-navigator">
                      <Button variant="ghost" size="md" className="w-full text-zinc-300 hover:text-white hover:bg-white/10 font-mono-data text-xs">
                        <span>Review Full Compliance Vault</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

