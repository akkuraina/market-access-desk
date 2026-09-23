import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ComplianceNavigatorPage() {
  return (
    <div className="flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="green" size="md">
            Tier 2 Architecture
          </Badge>

          <SectionHeading
            align="center"
            title="Tier 2: Regulatory & Compliance Navigator"
            subtitle="Automate HS code classification, duty estimation, non-tariff barrier discovery, and jurisdictional filing requirements."
            size="xl"
          />

          <Card className="w-full max-w-lg p-8">
            <CardHeader className="items-center text-center pb-6">
              <span className="font-mono-data text-xs uppercase tracking-widest text-mad-gold font-bold">
                COMPLIANCE_NAVIGATOR_ENGINE
              </span>
              <CardTitle className="mt-4">Regulatory Protocol Matrix</CardTitle>
              <CardDescription>
                Live customs tariff schedules, bilateral trade treaty benefits, and digital document vaults will be built here in subsequent iterations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button variant="primary" size="md">
                Search HS Classifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
