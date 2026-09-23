import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { PartnerNetworkClient } from "@/components/partner/PartnerNetworkClient";

export const metadata: Metadata = {
  title: "Tier 4: Partner Network (Phase 2 Preview) | Market Access Desk",
  description:
    "Preview the Phase 2 Partner & Demand Network. Curated introductions to verified Tier-1 distributors, bonded 3PL warehouses, and institutional buyer consortia.",
};

export default function PartnerNetworkPage() {
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
        <PartnerNetworkClient />
      </div>
    </div>
  );
}

