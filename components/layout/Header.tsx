"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

const navItems = [
  { href: "/readiness-score", label: "Readiness Score", tier: "Tier 1" },
  { href: "/compliance-navigator", label: "Compliance", tier: "Tier 2" },
  { href: "/settlement-setup", label: "Settlement", tier: "Tier 3" },
  { href: "/partner-network", label: "Partner Network", tier: "Tier 4", comingSoon: true },
  { href: "/trade-insights", label: "Trade Insights", tier: "Tier 5" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#FAF7F0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-baseline gap-2.5 transition-opacity hover:opacity-95">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
              MAD
            </span>
            <div className="hidden flex-col border-l border-black/15 pl-2.5 sm:flex">
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#0A0A0A]">
                Market Access Desk
              </span>
              <span className="font-mono-data text-[10px] text-[#52525B]">
                Direct-Clearing Infrastructure
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-body font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#0A0A0A] text-white shadow-sm"
                    : "text-[#0A0A0A]/80 hover:bg-black/5 hover:text-[#0A0A0A]"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {item.comingSoon && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[9px] font-mono-data uppercase tracking-wider",
                        isActive
                          ? "bg-[#FF4D1C] text-white font-bold"
                          : "bg-[#FF4D1C]/15 text-[#0A0A0A] border border-[#FF4D1C]/40"
                      )}
                    >
                      P2
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right Corner: Standardized "by TradePe" Attribution & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1 text-xs shadow-subtle">
            <span className="font-body font-normal text-[#52525B]">by</span>
            <TradePeWordmark />
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-[#0A0A0A] hover:bg-black/5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-black/10 bg-[#FAF7F0] px-4 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-body font-medium transition-colors",
                pathname === "/"
                  ? "bg-[#0A0A0A] text-white"
                  : "text-[#0A0A0A] hover:bg-black/5"
              )}
            >
              Overview (Home)
            </Link>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-body font-medium transition-colors",
                    isActive
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#0A0A0A] hover:bg-black/5"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="font-mono-data text-xs text-[#52525B]">
                    {item.tier} {item.comingSoon && "· Phase 2"}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

