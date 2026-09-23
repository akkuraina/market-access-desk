import React from "react";
import Link from "next/link";

const tierLinks = [
  { href: "/readiness-score", label: "Tier 1: Market Readiness Score" },
  { href: "/compliance-navigator", label: "Tier 2: Regulatory & Compliance Navigator" },
  { href: "/settlement-setup", label: "Tier 3: Local Settlement & Banking Setup" },
  { href: "/partner-network", label: "Tier 4: Demand & Partner Network" },
  { href: "/trade-insights", label: "Tier 5: Trade Data Insights" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-mad-green/10 bg-mad-cream-alt">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Brand & Program Description */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-extrabold tracking-tight text-mad-green">
                MAD
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-mad-green/80">
                Market Access Desk
              </span>
            </div>
            <p className="max-w-md font-body text-sm text-mad-slate leading-relaxed">
              Market Access Desk (MAD) is an institutional-grade enablement suite providing cross-border
              enterprises with rapid compliance navigation, local currency settlement architecture,
              and predictive trade intelligence.
            </p>
            {/* Attribution element */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-mad-slate/20 bg-mad-cream px-3 py-1 text-xs">
                <span className="font-body text-mad-slate">A specialized program by</span>
                <span className="flex items-center gap-1 font-display font-bold text-mad-ink">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-tradepe-orange"
                  />
                  TradePe
                </span>
              </div>
            </div>
          </div>

          {/* Program Tiers Navigation */}
          <div className="md:col-span-4 lg:col-span-4 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-mad-green">
              Program Architecture
            </h4>
            <ul className="space-y-2.5">
              {tierLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-mad-slate hover:text-mad-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Resources */}
          <div className="md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-mad-green">
              Governance & Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-body text-sm text-mad-slate hover:text-mad-green cursor-pointer">
                  Terms of Access
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-mad-slate hover:text-mad-green cursor-pointer">
                  Regulatory Disclosures
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-mad-slate hover:text-mad-green cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-mad-slate hover:text-mad-green cursor-pointer">
                  Support & Desk Inquiries
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-mad-green/10 pt-8 sm:flex-row gap-4">
          <p className="font-body text-xs text-mad-slate">
            © {new Date().getFullYear()} Market Access Desk. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-mad-slate font-mono-data">
            <span>SECURE DESK ENVIRONMENT</span>
            <span>·</span>
            <span>MAD ENGINE v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
