import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Market Access Desk (MAD) | by TradePe",
  description:
    "Institutional cross-border market entry engine: readiness evaluation, regulatory compliance, local settlement architecture, and real-time trade data intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mad-cream font-body text-mad-ink selection:bg-mad-green selection:text-mad-cream flex flex-col antialiased">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
