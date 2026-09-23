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
    <div className="flex-1 py-12 sm:py-16 lg:py-20 bg-brand-bg relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PartnerNetworkClient />
      </div>
    </div>
  );
}

