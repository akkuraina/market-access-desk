import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComplianceNavigatorClient } from "@/components/compliance/ComplianceNavigatorClient";

export const metadata: Metadata = {
  title: "Tier 2: Regulatory & Compliance Navigator | Market Access Desk",
  description:
    "Consult bilateral trade treaty requirements, non-resident tax registrations, customs documentation vaults, and compliance milestone roadmaps for major export corridors.",
};

export default function ComplianceNavigatorPage() {
  return (
    <div className="flex-1 py-10 sm:py-16 bg-[#FAF7F0] relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="subtle" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
              KNOWLEDGE BASE & PROTOCOL VAULT
            </Badge>
            <span className="text-xs text-black/20 font-mono-data">·</span>
            <span className="font-mono-data text-xs text-[#52525B] uppercase tracking-wider">
              TIER 2 SPECIFICATION
            </span>
          </div>

          <SectionHeading
            align="center"
            title={
              <>
                Regulatory & Compliance{" "}
                <span className="font-italic-accent text-[#FF4D1C] font-normal italic">
                  Navigator
                </span>
              </>
            }
            subtitle="Explore comprehensive jurisdictional requirements, bilateral free trade agreements, mandatory customs documents, and operational filing timelines across key trade corridors."
            size="xl"
          />
        </div>

        {/* Interactive Knowledge Base Workspace */}
        <ComplianceNavigatorClient />
      </div>
    </div>
  );
}

