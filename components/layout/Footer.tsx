import React from "react";
import Link from "next/link";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

const tierLinks = [
  { href: "/readiness-score", label: "Tier 1: Market Readiness Score" },
  { href: "/compliance-navigator", label: "Tier 2: Regulatory & Compliance Navigator" },
  { href: "/settlement-setup", label: "Tier 3: Local Settlement & Banking Setup" },
  { href: "/partner-network", label: "Tier 4: Demand & Partner Network" },
  { href: "/trade-insights", label: "Tier 5: Trade Data Insights" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-black/10 bg-[#FAF7F0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Brand & Program Description */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                MAD
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#0A0A0A]">
                Market Access Desk
              </span>
            </div>
            <p className="max-w-md font-body text-sm text-[#52525B] leading-relaxed">
              Market Access Desk is <TradePeWordmark />&apos;s direct-clearing market entry engine. Compute multi-signal regulatory readiness, resolve bilateral HS-code customs requirements, provision local currency accounts, and underwrite portable export credit.
            </p>
            {/* Attribution element */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1 text-xs shadow-subtle">
                <span className="font-body text-[#52525B]">A direct program by</span>
                <TradePeWordmark />
              </div>
            </div>
          </div>

          {/* Program Tiers Navigation */}
          <div className="md:col-span-4 lg:col-span-4 space-y-3">
            <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              PROGRAM ARCHITECTURE
            </h4>
            <ul className="space-y-2.5">
              {tierLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Resources */}
          <div className="md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              GOVERNANCE & AUDIT
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] cursor-pointer">
                  Direct Clearing Terms
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] cursor-pointer">
                  AD-1 Regulatory Disclosures
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] cursor-pointer">
                  Data Protection & Privacy
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] cursor-pointer">
                  Desk Support Telemetry
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-black/10 pt-8 sm:flex-row gap-4">
          <p className="font-body text-xs text-[#52525B]">
            © {new Date().getFullYear()} Market Access Desk. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#52525B] font-mono-data">
            <span>DIRECT RAILS VERIFIED</span>
            <span>·</span>
            <span>MAD ENGINE v1.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

