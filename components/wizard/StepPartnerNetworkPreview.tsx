"use client";

import React from "react";
import { Network, Building2, Warehouse, Scale, ArrowLeft, Sparkles } from "lucide-react";

interface StepPartnerNetworkPreviewProps {
  onReturnToHub: () => void;
}

export const StepPartnerNetworkPreview: React.FC<StepPartnerNetworkPreviewProps> = ({
  onReturnToHub,
}) => {
  const pillars = [
    {
      icon: Building2,
      title: "Vetted Institutional Distributors & Retail Consortia",
      description:
        "Direct commercial introductions to pre-screened regional wholesalers, licensed importers, and authorized trade houses in destination markets.",
      deliverables: "Financial solvency underwriting & commercial channel distribution agreements.",
    },
    {
      icon: Warehouse,
      title: "Bonded Port Warehousing & 3PL Integration",
      description:
        "Integration with accredited destination port warehouses (Jebel Ali Free Zone, Port of Singapore, Felixstowe) for local inventory staging and customs bonded storage.",
      deliverables: "Customs bonded slots & localized last-mile dispatch routing.",
    },
    {
      icon: Scale,
      title: "Automated HS-Code RFQ Matchmaking",
      description:
        "Automated protocol matching your verified HS code catalogue and Market Readiness Profile with active institutional buyer procurement tenders.",
      deliverables: "Level 3 KYC buyer badges & standardized bilingual trade contracts.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Title */}
      <div className="w-full text-left mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
          <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#0A0A0A]">
            Partner Network Roadmap (Phase 2 Preview)
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-2">
          Partner Network
        </h1>
        <p className="font-body text-base sm:text-lg text-[#706E6B] font-light leading-relaxed">
          Pre-screened overseas distributors and bonded port infrastructure launching in Phase 2.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="w-full space-y-4 mb-10 text-left">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#FF4D1C] shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-[#0A0A0A]">
                  {p.title}
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-[#706E6B] pl-13 leading-relaxed">
                {p.description}
              </p>
              <div className="pl-13 pt-1 font-mono-data text-xs text-[#0A0A0A]">
                <strong className="text-[#FF4D1C]">Includes:</strong> {p.deliverables}
              </div>
            </div>
          );
        })}
      </div>

      {/* Single Return Button */}
      <button
        type="button"
        onClick={onReturnToHub}
        className="w-full sm:w-auto min-w-[280px] group flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-translate-x-1 transition-all" />
        <span>Return to Options Hub</span>
      </button>
    </div>
  );
};
