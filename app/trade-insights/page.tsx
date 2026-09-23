import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TradeInsightsClient } from "@/components/insights/TradeInsightsClient";

export const metadata: Metadata = {
  title: "Tier 5: Trade Data Insights & Credit Score | Market Access Desk",
  description:
    "Preview the Trade Insights dashboard. Real-time corridor volume telemetry, Expansion Credit Score underwriting, and predictive peer corridor migration intelligence.",
};

export default function TradeInsightsPage() {
  return (
    <div className="flex-1 py-12 sm:py-16 lg:py-20 bg-brand-bg relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Sub-Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="orange" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
              INTELLIGENCE & UNDERWRITING
            </Badge>
          </div>

          <SectionHeading
            align="center"
            title="Trade Data Insights & Expansion Credit Score"
            subtitle="Explore how real-time cross-border settlement telemetry powers predictive corridor recommendations and portable credit underwriting for global trade expansion."
            size="xl"
          />
        </div>

        <TradeInsightsClient />
      </div>
    </div>
  );
}

