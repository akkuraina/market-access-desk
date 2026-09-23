import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReadinessCalculator } from "@/components/calculator/ReadinessCalculator";

export const metadata: Metadata = {
  title: "Tier 1: Market Readiness Score | Market Access Desk",
  description:
    "Evaluate cross-border export readiness across 12 weighted operational signals: tariff exposure, regulatory friction, working capital depth, and local settlement viability.",
};

export default function ReadinessScorePage() {
  return (
    <div className="flex-1 py-10 sm:py-16 bg-[#FAF7F0] relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="subtle" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
              DIAGNOSTIC ENGINE
            </Badge>
            <span className="text-xs text-black/20 font-mono-data">·</span>
            <span className="font-mono-data text-xs text-[#52525B] uppercase tracking-wider">
              TIER 1 SPECIFICATION
            </span>
          </div>

          <SectionHeading
            align="center"
            title={
              <>
                Market Readiness{" "}
                <span className="font-italic-accent text-[#FF4D1C] font-normal italic">
                  Score Calculator
                </span>
              </>
            }
            subtitle="Quantitative 0–100 operational index computed across 12 signals: origin licensing, bilateral tariffs, destination customs compliance, and local currency banking clearing."
            size="xl"
          />
        </div>

        {/* Interactive Calculator Workspace */}
        <ReadinessCalculator />
      </div>
    </div>
  );
}

