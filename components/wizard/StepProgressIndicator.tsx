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

  let progress = 0.16;
  let totalSteps = 6;

  if (isExistingCustomer === true) {
    totalSteps = 3;
    switch (currentStep) {
      case "signin":
        progress = 1 / 3;
        break;
      case "hub":
        progress = 2 / 3;
        break;
      case "trade-insights":
      case "standalone-compliance":
      case "partner-network":
        progress = 3 / 3;
        break;
      case "inputs":
        progress = 2 / 4;
        break;
      case "tier1-readiness":
        progress = 3 / 5;
        break;
      case "tier2-compliance":
        progress = 4 / 5;
        break;
      case "tier3-settlement":
      case "tier45-preview":
        progress = 5 / 5;
        break;
      default:
        progress = 1 / 3;
    }
  } else {
    totalSteps = 6;
    switch (currentStep) {
      case "entry":
        progress = 1 / 6;
        break;
      case "inputs":
        progress = 2 / 6;
        break;
      case "tier1-readiness":
        progress = 3 / 6;
        break;
      case "tier2-compliance":
        progress = 4 / 6;
        break;
      case "tier3-settlement":
        progress = 5 / 6;
        break;
      case "tier45-preview":
        progress = 6 / 6;
        break;
      default:
        progress = 1 / 6;
    }
  }

  const percentage = Math.min(Math.max(progress * 100, 10), 100);

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
