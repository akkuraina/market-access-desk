"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WizardStep } from "@/components/wizard/MarketAccessWizard";

interface StepProgressIndicatorProps {
  currentStep: WizardStep;
  isExistingCustomer: boolean | null;
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({
  currentStep,
  isExistingCustomer,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (currentStep === "loader") {
    return null;
  }

  let progress = 0.15;
  let totalSteps = 6;

  if (isExistingCustomer === true) {
    totalSteps = 4;
    switch (currentStep) {
      case "signin":
        progress = 0.25;
        break;
      case "hub":
        progress = 0.5;
        break;
      case "trade-insights":
      case "standalone-compliance":
      case "partner-network":
        progress = 0.85;
        break;
      case "transition-hub-return":
        progress = 0.65;
        break;
      case "inputs":
        progress = 0.6;
        break;
      case "transition-to-tier1":
        progress = 0.65;
        break;
      case "tier1-readiness":
        progress = 0.75;
        break;
      case "transition-to-tier2":
        progress = 0.8;
        break;
      case "tier2-compliance":
        progress = 0.85;
        break;
      case "transition-to-tier3":
        progress = 0.9;
        break;
      case "tier3-settlement":
      case "transition-to-tier45":
      case "tier45-preview":
        progress = 0.95;
        break;
      case "transition-to-profile":
      case "profile-snapshot":
        progress = 1.0;
        break;
      default:
        progress = 0.5;
    }
  } else {
    totalSteps = 6;
    switch (currentStep) {
      case "entry":
        progress = 0.1;
        break;
      case "new-intro":
        progress = 0.18;
        break;
      case "new-info":
        progress = 0.28;
        break;
      case "inputs":
        progress = 0.38;
        break;
      case "transition-to-tier1":
        progress = 0.45;
        break;
      case "tier1-readiness":
        progress = 0.55;
        break;
      case "transition-to-tier2":
        progress = 0.65;
        break;
      case "tier2-compliance":
        progress = 0.75;
        break;
      case "transition-to-tier3":
        progress = 0.82;
        break;
      case "tier3-settlement":
        progress = 0.88;
        break;
      case "transition-to-tier45":
        progress = 0.92;
        break;
      case "tier45-preview":
        progress = 0.96;
        break;
      case "transition-to-profile":
      case "profile-snapshot":
        progress = 1.0;
        break;
      default:
        progress = 0.15;
    }
  }

  const percentage = Math.min(Math.max(progress * 100, 8), 100);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 w-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Background Track */}
      <div className="w-full h-[3px] bg-black/[0.06] relative overflow-hidden">
        {/* Animated Progress Fill */}
        <motion.div
          className="h-full bg-[#FF4D1C] relative"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.35,
            ease: "easeOut",
          }}
        >
          {/* Subtle Glow at leading edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#FF4D1C] shadow-[0_0_8px_#FF4D1C]" />
        </motion.div>
      </div>

      {/* Subtle Segment Hairline Ticks */}
      <div className="absolute top-0 left-0 right-0 h-[3px] flex justify-between px-0">
        {Array.from({ length: totalSteps - 1 }).map((_, idx) => (
          <div
            key={idx}
            className="h-full w-[1px] bg-black/10"
            style={{ left: `${((idx + 1) / totalSteps) * 100}%`, position: "absolute" }}
          />
        ))}
      </div>
    </div>
  );
};
