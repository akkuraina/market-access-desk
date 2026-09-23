import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteSplashScreen } from "@/components/ui/RouteSplashScreen";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Market Access Desk (MAD) | by TradePe",
  description:
    "Direct-clearing trade enablement suite by TradePe: quantitative readiness scoring, regulatory compliance navigation, multi-currency local settlement architecture, and real-time trade data telemetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-[#FAF7F0] font-body text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white flex flex-col antialiased">
        <RouteSplashScreen />
        <Header />
        <main className="flex-1 flex flex-col relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

