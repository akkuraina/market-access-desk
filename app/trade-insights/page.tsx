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
    <div className="flex-1 py-12 sm:py-16 lg:py-20 bg-mad-cream relative overflow-hidden">
      {/* Background Navigation Chart Grid Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full text-mad-green" viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="500" cy="500" r="450" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="500" y1="0" x2="500" y2="1000" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="500" x2="1000" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Sub-Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="subtle" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-mad-gold" />
              INTELLIGENCE & UNDERWRITING
            </Badge>
            <span className="text-xs text-mad-slate/40 font-mono-data">/</span>
            <span className="font-mono-data text-xs text-mad-slate uppercase tracking-wider">
              TIER 5 SPECIFICATION
            </span>
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

