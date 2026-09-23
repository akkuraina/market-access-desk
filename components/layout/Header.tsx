"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-50 w-full border-b border-mad-green/10 bg-mad-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-baseline gap-2.5 transition-opacity hover:opacity-95">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-mad-green">
              MAD
            </span>
            <div className="hidden flex-col border-l border-mad-green/20 pl-2.5 sm:flex">
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-mad-green">
                Market Access Desk
              </span>
              <span className="font-body text-[10px] text-mad-slate">
                Global Commerce Enablement
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
                  "relative rounded-xl px-3.5 py-2 text-sm font-display font-medium transition-all duration-150",
                  isActive
                    ? "bg-mad-green text-mad-cream shadow-sm"
                    : "text-mad-ink/80 hover:bg-mad-cream-alt hover:text-mad-green"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {item.comingSoon && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[9px] font-mono-data uppercase tracking-wider",
                        isActive
                          ? "bg-mad-gold text-mad-ink font-bold"
                          : "bg-mad-gold/20 text-mad-ink border border-mad-gold/40"
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

        {/* Right Corner: Small "by TradePe" Attribution & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Understated "by TradePe" Pill — ONLY usage of tradepe-orange on the site */}
          <div className="flex items-center gap-1.5 rounded-full border border-mad-slate/20 bg-mad-cream-alt/70 px-2.5 py-1 text-[11px] shadow-sm">
            <span className="font-body font-normal text-mad-slate">by</span>
            <span className="flex items-center gap-1 font-display font-bold text-mad-ink">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-tradepe-orange"
              />
              TradePe
            </span>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-mad-green hover:bg-mad-cream-alt lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-mad-green/10 bg-mad-cream px-4 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-display font-medium transition-colors",
                pathname === "/"
                  ? "bg-mad-green text-mad-cream"
                  : "text-mad-ink hover:bg-mad-cream-alt"
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
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-display font-medium transition-colors",
                    isActive
                      ? "bg-mad-green text-mad-cream"
                      : "text-mad-ink hover:bg-mad-cream-alt"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="font-mono-data text-xs text-mad-slate opacity-80">
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
