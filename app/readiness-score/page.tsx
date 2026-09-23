import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Button } from "@/components/ui/Button";

export default function ReadinessScorePage() {
  return (
    <div className="flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="gold" size="md">
            Tier 1 Architecture
          </Badge>

          <SectionHeading
            align="center"
            title="Tier 1: Market Readiness Score"
            subtitle="Evaluate your cross-border readiness across 24 critical risk dimensions before deploying capital into target international markets."
            size="xl"
          />

          <Card className="w-full max-w-lg p-8">
            <CardHeader className="items-center text-center pb-6">
              <ScoreGauge score={72} maxScore={100} label="Preliminary Readiness Assessment" sublabel="Corridor: South Asia → MENA" />
              <CardTitle className="mt-6">Diagnostic Workspace</CardTitle>
              <CardDescription>
                Detailed scoring factors, category breakdowns, and actionable mitigation roadmaps will be configured in subsequent modules.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button variant="primary" size="md">
                Begin Assessment
              </Button>
              <Button variant="secondary" size="md">
                Download Criteria
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
