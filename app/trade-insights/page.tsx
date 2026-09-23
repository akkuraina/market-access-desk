import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function TradeInsightsPage() {
  return (
    <div className="flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="gold" size="md">
            Tier 5 Architecture
          </Badge>

          <SectionHeading
            align="center"
            title="Tier 5: Trade Data Insights"
            subtitle="Access macro and corridor-level trade flows, historical freight indices, unit economics benchmarks, and buyer liquidity patterns."
            size="xl"
          />

          <Card className="w-full max-w-lg p-8">
            <CardHeader className="items-center text-center pb-6">
              <span className="font-mono-data text-xs uppercase tracking-widest text-mad-gold font-bold">
                TRADE_INTELLIGENCE_FEED
              </span>
              <CardTitle className="mt-4">Macro & Corridor Analytics Desk</CardTitle>
              <CardDescription>
                Corridor volume telemetry, seasonal freight fluctuation indexes, and predictive price parity metrics will be rendered here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button variant="primary" size="md">
                Launch Market Telemetry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
