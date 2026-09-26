"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { InitialLoader } from "@/components/wizard/InitialLoader";
import { StepEntry } from "@/components/wizard/StepEntry";
import { StepSignIn } from "@/components/wizard/StepSignIn";
import { StepExistingHub, ExistingHubOption } from "@/components/wizard/StepExistingHub";
import { StepTradeInsightsSequential } from "@/components/wizard/StepTradeInsightsSequential";
import { StepStandaloneCompliance } from "@/components/wizard/StepStandaloneCompliance";
import { StepPartnerNetworkPreview } from "@/components/wizard/StepPartnerNetworkPreview";
import { StepInputs } from "@/components/wizard/StepInputs";
import { StepTier1Readiness } from "@/components/wizard/StepTier1Readiness";
import { StepTier2Compliance } from "@/components/wizard/StepTier2Compliance";
import { StepTier3Settlement } from "@/components/wizard/StepTier3Settlement";
import { StepTier45Preview } from "@/components/wizard/StepTier45Preview";
import { StepProgressIndicator } from "@/components/wizard/StepProgressIndicator";
import {
  TargetMarket,
  Industry,
  ReadinessResult,
  calculateReadinessScore,
} from "@/lib/readinessScore";

export type WizardStep =
  | "loader"
  | "entry"
  | "signin"
  | "hub"
  | "inputs"
  | "tier1-readiness"
  | "tier2-compliance"
  | "tier3-settlement"
  | "tier45-preview"
  | "standalone-compliance"
  | "trade-insights"
  | "partner-network";

export const MarketAccessWizard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState<WizardStep>("loader");
  const [isExistingCustomer, setIsExistingCustomer] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<{ name: string; pan: string; email: string } | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<TargetMarket>("United Kingdom");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("Textiles & Apparel");
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);

  // Transition variants
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.35,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.25,
        ease: "easeIn",
      },
    },
  };

  // Handler for Screen 1 Entry
  const handleEntrySelect = (isExisting: boolean) => {
    setIsExistingCustomer(isExisting);
    if (isExisting) {
      setCurrentStep("signin");
    } else {
      setCurrentStep("inputs");
    }
  };

  // Handler for Screen 1b Sign In
  const handleSignInContinue = (data: { name: string; pan: string; email: string }) => {
    setUserData(data);
    setIsExistingCustomer(true);
    setCurrentStep("hub");
  };

  // Handler for Hub Options
  const handleHubSelectOption = (option: ExistingHubOption) => {
    switch (option) {
      case "expand-market":
        setCurrentStep("inputs");
        break;
      case "check-compliance":
        setCurrentStep("standalone-compliance");
        break;
      case "trade-insights":
        setCurrentStep("trade-insights");
        break;
      case "partner-network":
        setCurrentStep("partner-network");
        break;
    }
  };

  // Handler for Return to Hub
  const handleReturnToHub = () => {
    setCurrentStep("hub");
  };

  // Handler for Screen 2 Inputs
  const handleInputsComplete = (market: TargetMarket, industry: Industry) => {
    setSelectedMarket(market);
    setSelectedIndustry(industry);

    // Calculate score immediately
    const result = calculateReadinessScore({
      homeMarket: "India",
      industry: industry,
      targetMarket: market,
      exportRevenue: "$100k-$1M",
      exportExperience: "Export to 1-2 markets",
    });

    setReadinessResult(result);
    setCurrentStep("tier1-readiness");
  };

  // Handler to restart demo
  const handleRestart = () => {
    setIsExistingCustomer(null);
    setUserData(null);
    setReadinessResult(null);
    setCurrentStep("entry");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-center items-center py-6 sm:py-12 px-4 relative overflow-hidden">
      {/* Top Fixed Step Progress Indicator */}
      <StepProgressIndicator
        currentStep={currentStep}
        isExistingCustomer={isExistingCustomer}
      />

      <AnimatePresence mode="wait">
        {currentStep === "loader" && (
          <InitialLoader key="loader" onComplete={() => setCurrentStep("entry")} />
        )}

        {currentStep === "entry" && (
          <motion.div
            key="entry"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepEntry onSelect={handleEntrySelect} />
          </motion.div>
        )}

        {currentStep === "signin" && (
          <motion.div
            key="signin"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepSignIn
              onContinue={handleSignInContinue}
              onBack={() => setCurrentStep("entry")}
            />
          </motion.div>
        )}

        {currentStep === "hub" && userData && (
          <motion.div
            key="hub"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepExistingHub
              userName={userData.name}
              onSelectOption={handleHubSelectOption}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {currentStep === "trade-insights" && (
          <motion.div
            key="trade-insights"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTradeInsightsSequential onReturnToHub={handleReturnToHub} />
          </motion.div>
        )}

        {currentStep === "standalone-compliance" && (
          <motion.div
            key="standalone-compliance"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepStandaloneCompliance onReturnToHub={handleReturnToHub} />
          </motion.div>
        )}

        {currentStep === "partner-network" && (
          <motion.div
            key="partner-network"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepPartnerNetworkPreview onReturnToHub={handleReturnToHub} />
          </motion.div>
        )}

        {currentStep === "inputs" && (
          <motion.div
            key="inputs"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepInputs
              defaultMarket={selectedMarket}
              defaultIndustry={selectedIndustry}
              onComplete={handleInputsComplete}
            />
          </motion.div>
        )}

        {currentStep === "tier1-readiness" && readinessResult && (
          <motion.div
            key="tier1-readiness"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTier1Readiness
              result={readinessResult}
              onNext={() => setCurrentStep("tier2-compliance")}
              onReturnToHub={isExistingCustomer ? handleReturnToHub : undefined}
            />
          </motion.div>
        )}

        {currentStep === "tier2-compliance" && readinessResult && (
          <motion.div
            key="tier2-compliance"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTier2Compliance
              result={readinessResult}
              onNext={() => setCurrentStep("tier3-settlement")}
              onReturnToHub={isExistingCustomer ? handleReturnToHub : undefined}
            />
          </motion.div>
        )}

        {currentStep === "tier3-settlement" && (
          <motion.div
            key="tier3-settlement"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTier3Settlement
              targetMarket={selectedMarket}
              onNext={() => setCurrentStep("tier45-preview")}
              onReturnToHub={isExistingCustomer ? handleReturnToHub : undefined}
              isExistingCustomer={isExistingCustomer}
            />
          </motion.div>
        )}

        {currentStep === "tier45-preview" && (
          <motion.div
            key="tier45-preview"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTier45Preview
              onRestart={handleRestart}
              onReturnToHub={isExistingCustomer ? handleReturnToHub : undefined}
              isExistingCustomer={isExistingCustomer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketAccessWizard;
