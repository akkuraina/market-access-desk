export type HomeMarket = "India" | "Vietnam" | "Indonesia" | "UAE" | "United Kingdom" | "United States";
export type Industry =
  | "Textiles & Apparel"
  | "Electronics & Hardware"
  | "Pharmaceuticals & Healthcare"
  | "Software & IT Services"
  | "Agriculture & Food Products"
  | "Other / General Goods";
export type TargetMarket = "UAE" | "Singapore" | "United Kingdom" | "United States" | "Germany";
export type RevenueBand = "<$100k" | "$100k-$1M" | "$1M-$10M" | "$10M+";
export type ExportExperience =
  | "First time exporting"
  | "Export to 1-2 markets"
  | "Export to 3+ markets";

export interface ScoreFactor {
  label: string;
  impact: "positive" | "negative";
  category: "Experience" | "Corridor Friction" | "Capital & Scale" | "Industry Regulation";
  points: number;
  description: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
  estimatedDays: number;
}

export interface ReadinessInputs {
  homeMarket: HomeMarket;
  industry: Industry;
  targetMarket: TargetMarket;
  exportRevenue: RevenueBand;
  exportExperience: ExportExperience;
}

export interface ReadinessResult {
  overallScore: number;
  scoreBand: "Early Exploration" | "Moderate Readiness" | "High Readiness" | "Institutional Ready";
  regulatoryComplexity: "Low" | "Medium" | "High";
  estimatedTimelineMonths: string;
  corridorCode: string;
  factors: ScoreFactor[];
  complianceChecklist: ComplianceItem[];
  corridorSummary: string;
  settlementBridgeMessage: string;
}

// Corridor Complexity and Bilateral Rule Matrix
interface CorridorSpec {
  complexity: "Low" | "Medium" | "High";
  baseScoreDelta: number;
  estimatedTimeline: string;
  summary: string;
  specificChecklist: ComplianceItem[];
}

const CORRIDOR_MATRIX: Record<string, CorridorSpec> = {
  "India->UAE": {
    complexity: "Low",
    baseScoreDelta: 18,
    estimatedTimeline: "1–2 Months",
    summary:
      "India-UAE CEPA treaty grants preferential zero-duty access on over 90% of tariff lines, with streamlined customs pre-clearance.",
    specificChecklist: [
      {
        id: "gst-lut",
        title: "GST Letter of Undertaking (LUT)",
        description: "Zero-rated export supply filing with Indian tax authorities to enable IGST-free shipments.",
        mandatory: true,
        estimatedDays: 3,
      },
      {
        id: "cepa-coo",
        title: "India-UAE CEPA Certificate of Origin",
        description: "Official COO from authorized Indian export agency to unlock 0% bilateral tariff concession in UAE.",
        mandatory: true,
        estimatedDays: 5,
      },
      {
        id: "mohap-esma",
        title: "MoIAT / MoHAP Standards Verification",
        description: "Confirm product packaging and labeling conforms to UAE GSO standardization rules.",
        mandatory: false,
        estimatedDays: 10,
      },
      {
        id: "aed-escrow",
        title: "Local AED Collection & Escrow Setup",
        description: "Virtual UAE IBAN routing to collect directly in Dirhams and hedge currency conversion back to INR.",
        mandatory: true,
        estimatedDays: 7,
      },
    ],
  },
  "India->Singapore": {
    complexity: "Low",
    baseScoreDelta: 15,
    estimatedTimeline: "2–3 Months",
    summary:
      "India-Singapore CECA agreement ensures streamlined electronic documentation, low tariffs, and rapid ASEAN logistics clearance.",
    specificChecklist: [
      {
        id: "gst-lut",
        title: "GST Letter of Undertaking (LUT)",
        description: "Export declaration to allow zero-rated exports without upfront tax disbursement.",
        mandatory: true,
        estimatedDays: 3,
      },
      {
        id: "ceca-coo",
        title: "India-Singapore CECA Preferential COO",
        description: "Certification demonstrating domestic value addition criteria under the bilateral CECA treaty.",
        mandatory: true,
        estimatedDays: 5,
      },
      {
        id: "singapore-customs-cr",
        title: "Singapore Customs Entity Identifier / UEN",
        description: "Registration with Singapore Customs TradeNet for direct import clearance and GST handling.",
        mandatory: true,
        estimatedDays: 4,
      },
      {
        id: "sgd-settlement",
        title: "SGD Virtual Account Provisioning",
        description: "Local currency routing to receive Singapore Dollars via FAST rails with immediate FX locking.",
        mandatory: true,
        estimatedDays: 6,
      },
    ],
  },
  "India->United Kingdom": {
    complexity: "Medium",
    baseScoreDelta: 8,
    estimatedTimeline: "3–4 Months",
    summary:
      "Post-Brexit customs protocol requires separate UK EORI numbers, UKCA/CE safety validation, and local VAT registration.",
    specificChecklist: [
      {
        id: "uk-eori",
        title: "UK Economic Operators Registration (EORI)",
        description: "Mandatory identifier for moving goods into or out of Great Britain customs boundaries.",
        mandatory: true,
        estimatedDays: 7,
      },
      {
        id: "uk-vat-reg",
        title: "HMRC Non-Established Taxable Person VAT",
        description: "UK VAT registration for cross-border merchants holding consignment or DDP stock in UK warehouses.",
        mandatory: true,
        estimatedDays: 21,
      },
      {
        id: "ukca-mark",
        title: "UKCA / CE Conformity Declaration",
        description: "Product safety conformity filing for commercial electronics, apparel, or industrial equipment.",
        mandatory: false,
        estimatedDays: 14,
      },
      {
        id: "gbp-routing",
        title: "GBP Faster Payments & Escrow Account",
        description: "Direct British Pound routing to prevent double-conversion FX leakage through USD intermediaries.",
        mandatory: true,
        estimatedDays: 8,
      },
    ],
  },
  "India->United States": {
    complexity: "High",
    baseScoreDelta: -2,
    estimatedTimeline: "4–6 Months",
    summary:
      "Large-scale commercial corridor requiring US Customs and Border Protection (CBP) formal entry, continuous surety bond, and federal agency clearance.",
    specificChecklist: [
      {
        id: "cbp-bond",
        title: "US Customs Continuous Entry Bond",
        description: "Surety bond required by CBP for commercial shipments exceeding $2,500 in value.",
        mandatory: true,
        estimatedDays: 10,
      },
      {
        id: "partner-gov-agency",
        title: "PGA Clearance (FDA / FCC / EPA)",
        description: "Prior notification and registration with relevant US regulatory commission depending on HS code.",
        mandatory: true,
        estimatedDays: 25,
      },
      {
        id: "isf-10-plus-2",
        title: "Importer Security Filing (ISF 10+2)",
        description: "Mandatory ocean cargo electronic filing transmitted 24 hours prior to vessel loading.",
        mandatory: true,
        estimatedDays: 2,
      },
      {
        id: "usd-fedwire",
        title: "US Domestic Fedwire / ACH Account",
        description: "Local USD routing with Tier 1 clearing bank to collect without correspondent wire deductions.",
        mandatory: true,
        estimatedDays: 7,
      },
    ],
  },
  "India->Germany": {
    complexity: "High",
    baseScoreDelta: -5,
    estimatedTimeline: "5–7 Months",
    summary:
      "Strict EU single-market regulatory framework with CE directives, EU CBAM carbon documentation, and REACH chemical safety standards.",
    specificChecklist: [
      {
        id: "eu-eori",
        title: "EU EORI & German Customs Registration",
        description: "Unified European identifier required for German Atlas customs electronic processing.",
        mandatory: true,
        estimatedDays: 10,
      },
      {
        id: "eu-cbam-audit",
        title: "EU Carbon Border Adjustment (CBAM) Filing",
        description: "Embedded greenhouse gas emission reporting for covered industrial and material commodities.",
        mandatory: false,
        estimatedDays: 30,
      },
      {
        id: "lucid-packaging",
        title: "German Packaging Act (LUCID) Registration",
        description: "Mandatory registration for all commercial packaging entering German recycling streams.",
        mandatory: true,
        estimatedDays: 5,
      },
      {
        id: "eur-sepa",
        title: "EUR SEPA Virtual Settlement Setup",
        description: "Direct Euro IBAN routing supporting SEPA Instant credit transfers for rapid settlement.",
        mandatory: true,
        estimatedDays: 7,
      },
    ],
  },
};

// Generic fallback for corridors outside India
function getCorridorData(home: HomeMarket, target: TargetMarket): CorridorSpec {
  const key = `${home}->${target}`;
  if (CORRIDOR_MATRIX[key]) return CORRIDOR_MATRIX[key];

  // Intelligent heuristic for general international corridors
  const isHighFriction = target === "Germany" || target === "United States";
  const isLowFriction = target === "UAE" || target === "Singapore";

  return {
    complexity: isHighFriction ? "High" : isLowFriction ? "Low" : "Medium",
    baseScoreDelta: isHighFriction ? -4 : isLowFriction ? 14 : 6,
    estimatedTimeline: isHighFriction ? "4–6 Months" : isLowFriction ? "1–3 Months" : "3–4 Months",
    summary: `Standard bilateral commerce between ${home} and ${target} governed by international WTO rules and destination customs mandates.`,
    specificChecklist: [
      {
        id: "export-declaration",
        title: `${home} Export Clearance Filing`,
        description: "Official customs clearance documentation and export manifest transmission.",
        mandatory: true,
        estimatedDays: 4,
      },
      {
        id: "target-import-entry",
        title: `${target} Commercial Import License`,
        description: `Import clearance authorization and duty assessment filing with ${target} customs.`,
        mandatory: true,
        estimatedDays: 14,
      },
      {
        id: "settlement-routing",
        title: "Cross-Border Escrow & Currency Account",
        description: `Dedicated currency account provisioning to receive payments in local ${target} tender.`,
        mandatory: true,
        estimatedDays: 7,
      },
    ],
  };
}

export function calculateReadinessScore(inputs: ReadinessInputs): ReadinessResult {
  const { homeMarket, industry, targetMarket, exportRevenue, exportExperience } = inputs;
  const factors: ScoreFactor[] = [];

  // 1. Base Score
  let score = 40;

  // 2. Export Experience Logic
  let experiencePoints = 0;
  if (exportExperience === "First time exporting") {
    experiencePoints = 0;
    factors.push({
      label: "First-Time Exporter Learning Curve",
      impact: "negative",
      category: "Experience",
      points: 0,
      description:
        "Entering new international markets for the first time requires establishing initial customs, logistics, and compliance infrastructure.",
    });
  } else if (exportExperience === "Export to 1-2 markets") {
    experiencePoints = 15;
    score += experiencePoints;
    factors.push({
      label: "Proven Multi-Market Experience",
      impact: "positive",
      category: "Experience",
      points: 15,
      description:
        "Existing operational familiarity with cross-border logistics and invoicing significantly reduces execution friction in new corridors.",
    });
  } else if (exportExperience === "Export to 3+ markets") {
    experiencePoints = 25;
    score += experiencePoints;
    factors.push({
      label: "Established Global Operations",
      impact: "positive",
      category: "Experience",
      points: 25,
      description:
        "Mature export infrastructure and repeatable documentation workflows provide strong foundation for rapid corridor scaling.",
    });
  }

  // 3. Corridor Regulatory Complexity Logic
  const corridorSpec = getCorridorData(homeMarket, targetMarket);
  score += corridorSpec.baseScoreDelta;

  if (corridorSpec.complexity === "Low") {
    factors.push({
      label: `Favorable Bilateral Treaty Corridor (${homeMarket} → ${targetMarket})`,
      impact: "positive",
      category: "Corridor Friction",
      points: corridorSpec.baseScoreDelta,
      description: corridorSpec.summary,
    });
  } else if (corridorSpec.complexity === "Medium") {
    factors.push({
      label: `Moderate Corridor Regulatory Requirements (${targetMarket})`,
      impact: "positive",
      category: "Corridor Friction",
      points: corridorSpec.baseScoreDelta,
      description: corridorSpec.summary,
    });
  } else {
    factors.push({
      label: `High Jurisdictional Compliance Friction (${targetMarket})`,
      impact: "negative",
      category: "Corridor Friction",
      points: corridorSpec.baseScoreDelta,
      description: corridorSpec.summary,
    });
  }

  // 4. Industry-Specific Friction
  let industryDelta = 0;
  switch (industry) {
    case "Software & IT Services":
      industryDelta = 12;
      factors.push({
        label: "Digital Fulfillment Advantage",
        impact: "positive",
        category: "Industry Regulation",
        points: 12,
        description:
          "Zero physical customs inspection, no freight tariff barriers, and instant cross-border software service delivery.",
      });
      break;
    case "Textiles & Apparel":
      industryDelta = 8;
      factors.push({
        label: "Preferential Rules of Origin Alignment",
        impact: "positive",
        category: "Industry Regulation",
        points: 8,
        description:
          "High standard treaty concessions and mature freight forwarding lanes reduce landed costs and inspection lead times.",
      });
      break;
    case "Electronics & Hardware":
      industryDelta = -4;
      factors.push({
        label: "Hardware Safety & RoHS Testing Mandates",
        impact: "negative",
        category: "Industry Regulation",
        points: -4,
        description:
          "Target destination requires mandatory electromagnetic compatibility (EMC), RoHS, and consumer safety testing filings.",
      });
      break;
    case "Pharmaceuticals & Healthcare":
      industryDelta = -14;
      factors.push({
        label: "Stringent Health Authority Dossier Registration",
        impact: "negative",
        category: "Industry Regulation",
        points: -14,
        description:
          "Health products require extensive bio-equivalence data, GMP inspection certificates, and destination drug authority approvals.",
      });
      break;
    case "Agriculture & Food Products":
      industryDelta = -8;
      factors.push({
        label: "Phytosanitary & Perishable Logistics Inspection",
        impact: "negative",
        category: "Industry Regulation",
        points: -8,
        description:
          "Food safety compliance requires cold chain provenance, residual chemical limits, and import quarantine clearance.",
      });
      break;
    default:
      industryDelta = 0;
      break;
  }
  score += industryDelta;

  // 5. Export Revenue / Capital Scale Logic
  let revenueDelta = 0;
  switch (exportRevenue) {
    case "<$100k":
      revenueDelta = 2;
      factors.push({
        label: "Early-Stage Capital Allocation",
        impact: "negative",
        category: "Capital & Scale",
        points: 2,
        description:
          "Budget for customs retainers, destination legal counsel, and foreign exchange hedging buffer may require phased allocation.",
      });
      break;
    case "$100k-$1M":
      revenueDelta = 8;
      factors.push({
        label: "Balanced Expansion Liquidity",
        impact: "positive",
        category: "Capital & Scale",
        points: 8,
        description:
          "Sufficient commercial operating capital to absorb initial customs deposits, testing certifications, and localized marketing.",
      });
      break;
    case "$1M-$10M":
      revenueDelta = 14;
      factors.push({
        label: "Strong Balance Sheet for Escrow & Inventory",
        impact: "positive",
        category: "Capital & Scale",
        points: 14,
        description:
          "Ability to support flexible distributor payment terms, consignment stock, and dedicated banking credit lines.",
      });
      break;
    case "$10M+":
      revenueDelta = 18;
      factors.push({
        label: "Institutional Scale & Trade Finance Capacity",
        impact: "positive",
        category: "Capital & Scale",
        points: 18,
        description:
          "High-volume transaction capacity unlocks institutional FX treasury rates and Tier 1 banking rails.",
      });
      break;
  }
  score += revenueDelta;

  // Clamp final score between 0 and 100
  const finalScore = Math.min(Math.max(score, 0), 100);

  // Score Band Calculation
  let scoreBand: ReadinessResult["scoreBand"] = "Moderate Readiness";
  if (finalScore >= 80) {
    scoreBand = "Institutional Ready";
  } else if (finalScore >= 65) {
    scoreBand = "High Readiness";
  } else if (finalScore >= 45) {
    scoreBand = "Moderate Readiness";
  } else {
    scoreBand = "Early Exploration";
  }

  const corridorCode = `${homeMarket} → ${targetMarket}`;

  return {
    overallScore: finalScore,
    scoreBand,
    regulatoryComplexity: corridorSpec.complexity,
    estimatedTimelineMonths: corridorSpec.estimatedTimeline,
    corridorCode,
    factors,
    complianceChecklist: corridorSpec.specificChecklist,
    corridorSummary: corridorSpec.summary,
    settlementBridgeMessage: `Ready to move money in ${targetMarket}? Configure your local currency collection and settlement architecture.`,
  };
}
