"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { InitialLoader } from "@/components/wizard/InitialLoader";
import { StepEntry } from "@/components/wizard/StepEntry";
import { StepIntroCinematic } from "@/components/wizard/StepIntroCinematic";
import { StepNewCustomerInfo } from "@/components/wizard/StepNewCustomerInfo";
import { StepSignIn } from "@/components/wizard/StepSignIn";
import { StepExistingHub, ExistingHubOption } from "@/components/wizard/StepExistingHub";
import { StepTradeInsightsSequential } from "@/components/wizard/StepTradeInsightsSequential";
import { StepStandaloneCompliance } from "@/components/wizard/StepStandaloneCompliance";
import { StepPartnerNetworkPreview } from "@/components/wizard/StepPartnerNetworkPreview";
import { StepInputs } from "@/components/wizard/StepInputs";
import { StepTierCompleteTransition } from "@/components/wizard/StepTierCompleteTransition";
import { StepTier1Readiness } from "@/components/wizard/StepTier1Readiness";
import { StepTier2Compliance } from "@/components/wizard/StepTier2Compliance";
import { StepTier3Settlement } from "@/components/wizard/StepTier3Settlement";
import { StepTier45Preview } from "@/components/wizard/StepTier45Preview";
import { StepProfileSnapshot } from "@/components/wizard/StepProfileSnapshot";
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
  | "new-intro"
  | "new-info"
  | "signin"
  | "hub"
  | "inputs"
  | "transition-to-tier1"
  | "tier1-readiness"
  | "transition-to-tier2"
  | "tier2-compliance"
  | "transition-to-tier3"
  | "tier3-settlement"
  | "transition-to-tier45"
  | "tier45-preview"
  | "transition-to-profile"
  | "profile-snapshot"
  | "standalone-compliance"
  | "trade-insights"
  | "partner-network"
  | "transition-hub-return";

export const MarketAccessWizard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState<WizardStep>("loader");
  const [isExistingCustomer, setIsExistingCustomer] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    company?: string;
    email: string;
    pan?: string;
  } | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<TargetMarket>("United Kingdom");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("Textiles & Apparel");
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [hubReturnMessage, setHubReturnMessage] = useState<{ headline: string; subtext: string }>({
    headline: "Diagnostic Complete",
    subtext: "Returning to your client portal.",
  });

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
      setCurrentStep("new-intro");
    }
  };

  // Handler for Screen 1b Sign In (Existing customer)
  const handleSignInContinue = (data: { name: string; pan: string; email: string }) => {
    setUserData(data);
    setIsExistingCustomer(true);
    setCurrentStep("hub");
  };

  // Handler for New Customer Info Capture
  const handleNewCustomerInfoContinue = (data: { name: string; company: string; email: string }) => {
    setUserData(data);
    setCurrentStep("inputs");
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

  // Handler for Returning to Hub with transition screen
  const triggerHubReturn = (headline: string, subtext: string) => {
    setHubReturnMessage({ headline, subtext });
    setCurrentStep("transition-hub-return");
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
    setCurrentStep("transition-to-tier1");
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
        {/* Initial Loader */}
        {currentStep === "loader" && (
          <InitialLoader key="loader" onComplete={() => setCurrentStep("entry")} />
        )}

        {/* Step 1: Entry */}
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

        {/* New Customer Intro Sequence (Screen A -> Screen B) */}
        {currentStep === "new-intro" && (
          <StepIntroCinematic
            key="new-intro"
            onComplete={() => setCurrentStep("new-info")}
          />
        )}

        {/* New Customer Basic Info Capture */}
        {currentStep === "new-info" && (
          <motion.div
            key="new-info"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepNewCustomerInfo
              onContinue={handleNewCustomerInfoContinue}
              onBack={() => setCurrentStep("entry")}
            />
          </motion.div>
        )}

        {/* Existing Customer Sign In */}
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

        {/* Existing Customer Hub */}
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
              onFinishProfile={() => setCurrentStep("transition-to-profile")}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {/* Trade Insights Sequential */}
        {currentStep === "trade-insights" && (
          <motion.div
            key="trade-insights"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepTradeInsightsSequential
              onReturnToHub={() =>
                triggerHubReturn(
                  "Trade Insights — reviewed.",
                  "Returning to your client portal."
                )
              }
            />
          </motion.div>
        )}

        {/* Standalone Compliance */}
        {currentStep === "standalone-compliance" && (
          <motion.div
            key="standalone-compliance"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepStandaloneCompliance
              onReturnToHub={() =>
                triggerHubReturn(
                  "Compliance Checklist — reviewed.",
                  "Returning to your client portal."
                )
              }
            />
          </motion.div>
        )}

        {/* Partner Network Preview */}
        {currentStep === "partner-network" && (
          <motion.div
            key="partner-network"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepPartnerNetworkPreview
              onReturnToHub={() =>
                triggerHubReturn(
                  "Partner Network — previewed.",
                  "Returning to your client portal."
                )
              }
            />
          </motion.div>
        )}

        {/* Inputs (Market & Industry selection) */}
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

        {/* Transition: Inputs -> Tier 1 */}
        {currentStep === "transition-to-tier1" && (
          <StepTierCompleteTransition
            key="transition-to-tier1"
            badge="PROFILE CAPTURED"
            headline="Corridor & Sector — selected."
            subtext="Let's compute your Tier 1: Readiness Score."
            onComplete={() => setCurrentStep("tier1-readiness")}
          />
        )}

        {/* Tier 1 Readiness Score */}
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
              userName={userData?.name}
              onNext={() => setCurrentStep("transition-to-tier2")}
              onReturnToHub={
                isExistingCustomer
                  ? () =>
                      triggerHubReturn(
                        "Readiness Score — calculated.",
                        "Returning to your client portal."
                      )
                  : undefined
              }
            />
          </motion.div>
        )}

        {/* Transition: Tier 1 -> Tier 2 */}
        {currentStep === "transition-to-tier2" && (
          <StepTierCompleteTransition
            key="transition-to-tier2"
            badge="TIER 1 COMPLETE"
            headline="Readiness Diagnostic — scored."
            subtext="Let's move to Tier 2: Compliance Checklist."
            onComplete={() => setCurrentStep("tier2-compliance")}
          />
        )}

        {/* Tier 2 Compliance Checklist */}
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
              userName={userData?.name}
              onNext={() => setCurrentStep("transition-to-tier3")}
              onReturnToHub={
                isExistingCustomer
                  ? () =>
                      triggerHubReturn(
                        "Compliance Checklist — reviewed.",
                        "Returning to your client portal."
                      )
                  : undefined
              }
            />
          </motion.div>
        )}

        {/* Transition: Tier 2 -> Tier 3 */}
        {currentStep === "transition-to-tier3" && (
          <StepTierCompleteTransition
            key="transition-to-tier3"
            badge="TIER 2 COMPLETE"
            headline="Regulatory Filings — mapped."
            subtext="Let's move to Tier 3: Settlement Setup."
            onComplete={() => setCurrentStep("tier3-settlement")}
          />
        )}

        {/* Tier 3 Settlement */}
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
              userName={userData?.name}
              onNext={() => setCurrentStep("transition-to-tier45")}
              onReturnToHub={
                isExistingCustomer
                  ? () =>
                      triggerHubReturn(
                        "Settlement Rails — verified.",
                        "Returning to your client portal."
                      )
                  : undefined
              }
              isExistingCustomer={isExistingCustomer}
            />
          </motion.div>
        )}

        {/* Transition: Tier 3 -> Tier 4/5 */}
        {currentStep === "transition-to-tier45" && (
          <StepTierCompleteTransition
            key="transition-to-tier45"
            badge="TIER 3 COMPLETE"
            headline="Settlement Rails — configured."
            subtext="Let's move to Tier 4 & 5: Ecosystem Suite."
            onComplete={() => setCurrentStep("tier45-preview")}
          />
        )}

        {/* Tier 4 & Tier 5 Preview */}
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
              onFinish={() => setCurrentStep("transition-to-profile")}
              onReturnToHub={
                isExistingCustomer
                  ? () =>
                      triggerHubReturn(
                        "Ecosystem Suite — previewed.",
                        "Returning to your client portal."
                      )
                  : undefined
              }
              isExistingCustomer={isExistingCustomer}
            />
          </motion.div>
        )}

        {/* Transition: To Profile Snapshot */}
        {currentStep === "transition-to-profile" && (
          <StepTierCompleteTransition
            key="transition-to-profile"
            badge="PORTFOLIO READY"
            headline="Market Access Profile — assembled."
            subtext="Generating your verified TradePe growth snapshot."
            onComplete={() => setCurrentStep("profile-snapshot")}
          />
        )}

        {/* Transition: Return to Hub */}
        {currentStep === "transition-hub-return" && (
          <StepTierCompleteTransition
            key="transition-hub-return"
            badge="CORRIDOR LOGGED"
            headline={hubReturnMessage.headline}
            subtext={hubReturnMessage.subtext}
            onComplete={() => setCurrentStep("hub")}
          />
        )}

        {/* Shared Closing Screen: Profile Snapshot */}
        {currentStep === "profile-snapshot" && (
          <motion.div
            key="profile-snapshot"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex justify-center"
          >
            <StepProfileSnapshot
              userName={userData?.name}
              companyName={userData?.company}
              isExistingCustomer={isExistingCustomer}
              selectedMarket={selectedMarket}
              selectedIndustry={selectedIndustry}
              readinessResult={readinessResult}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketAccessWizard;
