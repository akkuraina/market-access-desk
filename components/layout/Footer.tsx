import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { TradePeWordmark } from "@/components/ui/TradePeWordmark";

const tierLinks = [
  { href: "/readiness-score", label: "Readiness Score" },
  { href: "/compliance-navigator", label: "Compliance Navigator" },
  { href: "/settlement-setup", label: "Settlement Setup" },
  { href: "/partner-network", label: "Partner Network" },
  { href: "/trade-insights", label: "Trade Insights" },
];

const legalLinks = [
  { href: "https://tradepe-landing.vercel.app", label: "Terms of Service" },
  { href: "https://tradepe-landing.vercel.app", label: "Privacy Policy" },
  { href: "https://tradepe-landing.vercel.app", label: "Cookie Policy" },
  { href: "https://tradepe-landing.vercel.app", label: "Grievance Policy" },
];

export const Footer: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TradePe Tech Pvt. Ltd.",
    alternateName: "Market Access Desk by TradePe",
    url: "https://tradepe-landing.vercel.app",
    logo: "https://tradepe-landing.vercel.app/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "61, Mittal Chambers, Nariman Point",
      addressLocality: "Mumbai",
      postalCode: "400021",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 8433708529",
      contactType: "customer support",
      email: "contactus@tradepe.com",
      availableLanguage: ["en", "hi"],
    },
    sameAs: ["https://www.linkedin.com/company/tradepe/"],
  };

  return (
    <footer className="mt-auto border-t border-black/10 bg-[#FAF7F0]">
      {/* Schema.org Organization Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Parent Brand & Identity (Lg 4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2">
              <TradePeWordmark className="text-2xl" />
            </div>
            <p className="font-body text-sm font-medium text-[#0A0A0A]">
              India&apos;s 1st Neobank for Global Trade
            </p>
            <p className="font-body text-xs text-[#52525B] leading-relaxed max-w-sm">
              Market Access Desk (MAD) is TradePe&apos;s direct-clearing market entry engine, providing quantitative readiness scoring, regulatory navigation, and institutional FX settlement.
            </p>
            <address className="not-italic text-xs text-[#52525B] flex items-start gap-2 pt-2 max-w-xs leading-relaxed">
              <MapPin className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" aria-hidden="true" />
              <span>61, Mittal Chambers, Nariman Point, Mumbai 400021</span>
            </address>
          </div>

          {/* Column 2: Program Navigation (Lg 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {tierLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policies (Lg 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#52525B] hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Contact (Lg 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              Support Desk &amp; Inquiries
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contactus@tradepe.com"
                  className="inline-flex items-center gap-2.5 text-[#52525B] hover:text-[#0A0A0A] transition-colors group"
                  aria-label="Email TradePe Support at contactus@tradepe.com"
                >
                  <div className="h-7 w-7 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-[#FF4D1C]/10 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-[#FF4D1C]" aria-hidden="true" />
                  </div>
                  <span className="font-body text-xs sm:text-sm">contactus@tradepe.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918433708529"
                  className="inline-flex items-center gap-2.5 text-[#52525B] hover:text-[#0A0A0A] transition-colors group"
                  aria-label="Call TradePe Support at +91 8433708529"
                >
                  <div className="h-7 w-7 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-[#FF4D1C]/10 transition-colors">
                    <Phone className="h-3.5 w-3.5 text-[#FF4D1C]" aria-hidden="true" />
                  </div>
                  <span className="font-mono-data text-xs sm:text-sm">+91 8433708529</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.linkedin.com/company/tradepe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#52525B] hover:text-[#0A0A0A] transition-colors group"
                  aria-label="Visit TradePe on LinkedIn"
                >
                  <div className="h-7 w-7 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-[#FF4D1C]/10 transition-colors">
                    <svg className="h-3.5 w-3.5 fill-[#FF4D1C]" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63a1.63 1.63 0 0 0-1.63-1.63Z" />
                    </svg>
                  </div>
                  <span className="font-body text-xs sm:text-sm">TradePe on LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-black/10 pt-8 sm:flex-row gap-4">
          <p className="font-body text-xs text-[#52525B] flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()}</span>
            <TradePeWordmark asLink={false} />
            <span>Tech Pvt. Ltd. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
