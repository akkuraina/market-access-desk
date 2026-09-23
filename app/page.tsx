import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Landmark, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScoreGauge } from "@/components/ui/ScoreGauge";

const tierCards = [
  {
    tier: "Tier 1",
    title: "Market Readiness Score",
    href: "/readiness-score",
    description: "Multivariate diagnostic scoring product-market fit, compliance posture, and cross-border capability.",
    icon: Compass,
    action: "Evaluate Readiness",
  },
  {
    tier: "Tier 2",
    title: "Regulatory & Compliance Navigator",
    href: "/compliance-navigator",
    description: "Dynamic tariff calculations, customs clearance roadmaps, and automated licensing checklists.",
    icon: ShieldCheck,
    action: "Navigate Compliance",
  },
  {
    tier: "Tier 3",
    title: "Local Settlement & Banking Setup",
    href: "/settlement-setup",
    description: "Frictionless escrow architectures, local currency routing, and foreign exchange hedging strategies.",
    icon: Landmark,
    action: "Configure Settlement",
  },
  {
    tier: "Tier 4",
    title: "Demand & Partner Network",
    href: "/partner-network",
    description: "Verified institutional distributors, logistics operators, and authorized market makers.",
    icon: Users,
    action: "View Network",
    badge: "Phase 2 — Coming Soon",
  },
  {
    tier: "Tier 5",
    title: "Trade Data Insights",
    href: "/trade-insights",
    description: "Real-time corridor analytics, shipment price parity benchmarks, and buyer volume trends.",
    icon: TrendingUp,
    action: "Explore Insights",
  },
];

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-mad-green/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="md">
                  Institutional Cross-Border Engine
                </Badge>
                <Badge variant="slate" size="md">
                  MAD v1.0
                </Badge>
              </div>

              <SectionHeading
                title="Market Access Desk"
                subtitle="The structured five-tier operating system designed to accelerate cross-border trade readiness, ensure regulatory clearance, and automate local currency settlement."
                size="xl"
              />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/readiness-score">
                  <Button variant="primary" size="lg" className="group">
                    <span>Calculate Readiness Score</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/compliance-navigator">
                  <Button variant="secondary" size="lg">
                    <span>Explore Tiers</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Teaser */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-3xl border border-mad-green/15 bg-mad-cream-alt p-8 shadow-card max-w-sm w-full flex flex-col items-center text-center">
                <ScoreGauge
                  score={72}
                  maxScore={100}
                  label="Sample Market Readiness Index"
                  sublabel="India → UAE Export Corridor"
                />
                <div className="mt-6 pt-6 border-t border-mad-green/10 w-full flex items-center justify-between text-xs font-mono-data text-mad-slate">
                  <span>TIER: T1_BENCHMARK</span>
                  <span className="text-mad-green font-bold">STATUS: READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Architecture Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              badge="Full Lifecycle Coverage"
              title="Five-Tier Market Access Architecture"
              subtitle="Each tier delivers specialized operational primitives tailored for global enterprises entering new trade corridors."
              size="lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tierCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.href} interactive className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-xs font-semibold uppercase tracking-wider text-mad-gold">
                        {card.tier}
                      </span>
                      {card.badge && (
                        <Badge variant="phase2" size="sm">
                          {card.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mad-green/10 text-mad-green">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{card.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-3">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 mt-auto">
                    <Link href={card.href} className="w-full">
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span>{card.action}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
