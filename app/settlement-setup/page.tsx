import React, { Suspense } from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SettlementSetupClient } from "@/components/settlement/SettlementSetupClient";

export const metadata: Metadata = {
  title: "Tier 3: Local Settlement & Banking Setup | Market Access Desk",
  description:
    "Provision local currency collection accounts, multi-party escrow agreements, and automated INR settlement rails powered by TradePe's AD-1 banking infrastructure.",
};

export default function SettlementSetupPage() {
  return (
    <div className="flex-1 py-12 sm:py-16 lg:py-20 bg-brand-bg relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Sub-Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="orange" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
              TREASURY & RAILS ARCHITECTURE
            </Badge>
            <span className="text-xs text-brand-muted/40 font-mono-data">/</span>
            <span className="font-mono-data text-xs text-brand-muted uppercase tracking-wider">
              TIER 3 SPECIFICATION
            </span>
          </div>

          <SectionHeading
            align="center"
            title="Local Settlement & Banking Setup"
            subtitle="Bridge verified readiness into programmatic execution. Collect locally in buyer currencies (GBP, AED, USD, SGD, EUR) with wholesale FX rates and rapid domestic clearing."
            size="xl"
          />
        </div>

        {/* Suspense boundary for useSearchParams */}
        <Suspense
          fallback={
            <div className="rounded-2xl border border-black/10 bg-white p-12 text-center font-mono-data text-sm text-brand-muted">
              Loading corridor settlement architecture...
            </div>
          }
        >
          <SettlementSetupClient />
        </Suspense>
      </div>
    </div>
  );
}
