import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function PartnerNetworkPage() {
  return (
    <div className="flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center gap-2">
            <Badge variant="slate" size="md">
              Tier 4 Architecture
            </Badge>
            <Badge variant="phase2" size="md">
              Phase 2 — Coming Soon
            </Badge>
          </div>

          <SectionHeading
            align="center"
            title="Tier 4: Demand & Partner Network"
            subtitle="Connect directly with pre-vetted institutional distributors, verified local buyer consortia, and bonded 3PL logistics partners."
            size="xl"
          />

          <Card className="w-full max-w-lg p-8 border-dashed border-mad-slate/30 bg-mad-cream-alt/50">
            <CardHeader className="items-center text-center pb-6">
              <span className="font-mono-data text-xs uppercase tracking-widest text-mad-gold font-bold">
                PARTNER_ECOSYSTEM_REGISTRY
              </span>
              <CardTitle className="mt-4">Bilateral Ecosystem Matching</CardTitle>
              <CardDescription>
                This module is currently in private preview under Phase 2 rollout. Pre-qualification and network onboarding protocols are actively being indexed.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button variant="outline" size="md" disabled>
                Phase 2 In Development
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
