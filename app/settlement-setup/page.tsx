import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function SettlementSetupPage() {
  return (
    <div className="flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="green" size="md">
            Tier 3 Architecture
          </Badge>

          <SectionHeading
            align="center"
            title="Tier 3: Local Settlement & Banking Setup"
            subtitle="Architect local currency collection accounts, multi-party escrow agreements, and automated FX risk hedging."
            size="xl"
          />

          <Card className="w-full max-w-lg p-8">
            <CardHeader className="items-center text-center pb-6">
              <span className="font-mono-data text-xs uppercase tracking-widest text-mad-gold font-bold">
                SETTLEMENT_ROUTING_CORE
              </span>
              <CardTitle className="mt-4">Treasury & Escrow Workbench</CardTitle>
              <CardDescription>
                Correspondent banking routing protocols, virtual IBAN generation, and FX rate locks will be configured here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button variant="primary" size="md">
                Configure Virtual Settlement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
