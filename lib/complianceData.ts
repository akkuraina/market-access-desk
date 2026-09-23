export interface ComplianceRequirement {
  id: string;
  title: string;
  authority: string;
  mandatory: boolean;
  description: string;
  keyDetails: string[];
  estimatedDays: string;
  tag: "Tax" | "Corporate" | "Licensing" | "Documentation" | "Customs";
}

export interface CorridorComplianceData {
  id: string;
  homeMarket: string;
  targetMarket: string;
  corridorTitle: string;
  bilateralTreaty: string;
  treatyStatus: string;
  averageCustomsClearanceDays: string;
  overallTimeline: string;
  dutyAdvantageSummary: string;
  taxAndRegistration: ComplianceRequirement[];
  licensingAndApprovals: ComplianceRequirement[];
  mandatoryDocumentation: {
    name: string;
    filingAuthority: string;
    format: string;
    leadTime: string;
    mandatory: boolean;
    purpose: string;
  }[];
  timelineMilestones: {
    phase: string;
    timeframe: string;
    title: string;
    description: string;
    deliverable: string;
  }[];
}

export const COMPLIANCE_CORRIDORS: Record<string, CorridorComplianceData> = {
  "India->UAE": {
    id: "IND-UAE",
    homeMarket: "India",
    targetMarket: "UAE",
    corridorTitle: "India → United Arab Emirates",
    bilateralTreaty: "Comprehensive Economic Partnership Agreement (CEPA)",
    treatyStatus: "Active (Enforced May 2022)",
    averageCustomsClearanceDays: "1–2 Days",
    overallTimeline: "3–4 Weeks",
    dutyAdvantageSummary:
      "Preferential 0% customs tariff on ~90% of HS codes under CEPA, compared to standard 5% GCC tariff.",
    taxAndRegistration: [
      {
        id: "uae-vat",
        title: "Federal Tax Authority (FTA) Non-Resident VAT",
        authority: "UAE Federal Tax Authority",
        mandatory: true,
        estimatedDays: "5–7 Days",
        tag: "Tax",
        description:
          "Mandatory VAT registration (5% standard rate) if holding inventory locally in UAE mainland or designated free zones selling into mainland.",
        keyDetails: [
          "Standard UAE VAT rate: 5%",
          "Required prior to making first taxable supply if importing under DDP terms",
          "Tax Identification Number (TRN) generated electronically via EmaraTax portal",
        ],
      },
      {
        id: "gst-lut-india",
        title: "GST Letter of Undertaking (LUT) Filing",
        authority: "Central Board of Indirect Taxes & Customs (CBIC, India)",
        mandatory: true,
        estimatedDays: "2–3 Days",
        tag: "Tax",
        description:
          "Permits Indian exporters to supply goods/services to UAE without paying upfront Integrated Goods & Services Tax (IGST).",
        keyDetails: [
          "Annual online submission via GST Common Portal",
          "Eliminates tax lockup and duty refund delays",
          "Requires active GSTIN and valid authorized signatory DSC/EVC",
        ],
      },
      {
        id: "uae-customs-code",
        title: "Dubai Customs Client / Importer Registration",
        authority: "Dubai Customs / Port & Customs Authority",
        mandatory: true,
        estimatedDays: "2–4 Days",
        tag: "Customs",
        description:
          "Direct Customs Code required for commercial clearance across Jebel Ali (DP World), Dubai International Airport, and Khalifa Port.",
        keyDetails: [
          "Requires commercial trade license copy or local authorized importer of record",
          "Mirsal II electronic clearance linkage",
          "Annual validity with automatic renewal option",
        ],
      },
    ],
    licensingAndApprovals: [
      {
        id: "moiat-gso",
        title: "Ministry of Industry & Advanced Tech (MoIAT) Standards",
        authority: "UAE Ministry of Industry (MoIAT)",
        mandatory: false,
        estimatedDays: "7–10 Days",
        tag: "Licensing",
        description:
          "Conformity certification (ECAS / EQM) for regulated product categories (cosmetics, electrical, packaged foods, apparel).",
        keyDetails: [
          "Emirates Conformity Assessment Scheme (ECAS) registration",
          "GSO (Gulf Standardization Organization) label and Arabic translation verification",
          "Lab test reports from ISO 17025 accredited testing facilities",
        ],
      },
      {
        id: "cepa-preferential-coo",
        title: "CEPA Preferential Rules of Origin Verification",
        authority: "Directorate General of Foreign Trade (DGFT, India)",
        mandatory: true,
        estimatedDays: "3–5 Days",
        tag: "Licensing",
        description:
          "Certification of 35%–40% domestic Value Addition (VA) + CTSH change in tariff subheading to claim 0% import duty in UAE.",
        keyDetails: [
          "Issued via DGFT electronic CoO portal",
          "Digital verification QR code on official CEPA form",
          "Submitted alongside Bill of Entry to UAE Customs",
        ],
      },
    ],
    mandatoryDocumentation: [
      {
        name: "Commercial Invoice & Packing List (Attested)",
        filingAuthority: "Destination Customs / Mirsal II",
        format: "PDF / Structured EDI XML",
        leadTime: "T-0 at dispatch",
        mandatory: true,
        purpose: "Declares itemized HS codes, CIF/FOB value, currency (AED/USD), and item count.",
      },
      {
        name: "Digitally Signed CEPA Certificate of Origin",
        filingAuthority: "DGFT India / UAE Customs",
        format: "DGFT Official Digital Template",
        leadTime: "3 Days prior to arrival",
        mandatory: true,
        purpose: "Unlocks 0% tariff benefit under India-UAE bilateral agreement.",
      },
      {
        name: "Air Waybill (AWB) / Ocean Bill of Lading (B/L)",
        filingAuthority: "Carriers / Terminal Operators",
        format: "Sea-Waybill / Master B/L",
        leadTime: "Issued upon vessel departure",
        mandatory: true,
        purpose: "Title document establishing freight consignee, destination port, and gross weight.",
      },
      {
        name: "Electronic Bank Realisation Certificate (e-BRC)",
        filingAuthority: "Authorized Dealer Bank (India) / DGFT",
        format: "e-BRC Digital Repository",
        leadTime: "Post-settlement (within 9 months)",
        mandatory: true,
        purpose: "Proofs inward foreign exchange remittance closure to Indian Central Bank (RBI).",
      },
    ],
    timelineMilestones: [
      {
        phase: "Week 1",
        timeframe: "Days 1–7",
        title: "Origin Filing & Digital LUT",
        description: "Execute annual GST LUT export declaration and verify HS Code 8-digit tariff classifications.",
        deliverable: "Active GST LUT ARN & DGFT Profile Verification",
      },
      {
        phase: "Week 2",
        timeframe: "Days 8–14",
        title: "CEPA Preferential COO & Label Review",
        description: "Submit value-addition cost sheet to DGFT and approve Arabic/English bilingual product packaging.",
        deliverable: "Digital CEPA COO & MoIAT Label Approval",
      },
      {
        phase: "Week 3",
        timeframe: "Days 15–21",
        title: "Logistics Manifest & Customs Code",
        description: "Link freight forwarder to UAE Mirsal II Customs Code and generate sea/air freight manifest.",
        deliverable: "Customs Import Declaration Draft & Consignee Linkage",
      },
      {
        phase: "Week 4",
        timeframe: "Days 22–28",
        title: "Clearance & Settlement Account Routing",
        description: "Direct port clearance under 0% CEPA tariff and route inward AED receipt to dedicated virtual IBAN.",
        deliverable: "Final Out-of-Charge Customs Clearance & AED Wire Closure",
      },
    ],
  },
  "India->United Kingdom": {
    id: "IND-UK",
    homeMarket: "India",
    targetMarket: "United Kingdom",
    corridorTitle: "India → United Kingdom",
    bilateralTreaty: "Developing Countries Trading Scheme (DCTS) / UK-India FTA In-Progress",
    treatyStatus: "Active (DCTS Enhanced Preferences)",
    averageCustomsClearanceDays: "2–4 Days",
    overallTimeline: "4–6 Weeks",
    dutyAdvantageSummary:
      "Preferential lower or zero tariffs on thousands of industrial and consumer tariff lines under the UK DCTS framework.",
    taxAndRegistration: [
      {
        id: "uk-eori-num",
        title: "UK Economic Operators Registration and Identification (GB EORI)",
        authority: "His Majesty's Revenue & Customs (HMRC)",
        mandatory: true,
        estimatedDays: "5–7 Days",
        tag: "Tax",
        description:
          "Mandatory alphanumeric registration required to lodge declarations in the UK Customs Declaration Service (CDS).",
        keyDetails: [
          "Required for all businesses moving commercial shipments into Great Britain",
          "GB-prefixed 12-digit number verified against HMRC CDS system",
          "Can be held by non-UK resident entities",
        ],
      },
      {
        id: "uk-netp-vat",
        title: "UK Non-Established Taxable Person (NETP) VAT",
        authority: "HMRC",
        mandatory: true,
        estimatedDays: "18–25 Days",
        tag: "Tax",
        description:
          "Required for non-UK sellers holding stock in 3PL warehouses or fulfilling DDP consignments to UK business buyers.",
        keyDetails: [
          "Zero threshold limit: applies from the first £1 of UK sales for non-resident businesses",
          "Standard UK VAT rate: 20% (with input VAT reclaim on port import VAT)",
          "Postponed VAT Accounting (PVA) option available to avoid upfront import VAT cash drain",
        ],
      },
      {
        id: "duty-deferment",
        title: "UK Duty Deferment Account (DDA) & Customs Guarantee",
        authority: "HMRC Customs",
        mandatory: false,
        estimatedDays: "10–14 Days",
        tag: "Customs",
        description:
          "Enables monthly consolidated direct debit for customs duty and import VAT instead of paying per individual consignment.",
        keyDetails: [
          "Speeds up port gate clearance at Felixstowe, Southampton, and Heathrow",
          "Requires waiver or bank financial security based on merchant credit standing",
        ],
      },
    ],
    licensingAndApprovals: [
      {
        id: "ukca-conformity",
        title: "UKCA / CE Conformity Assessment & Technical File",
        authority: "UK Dept for Business and Trade (DBT)",
        mandatory: true,
        estimatedDays: "10–15 Days",
        tag: "Licensing",
        description:
          "Declaration of Conformity and technical documentation demonstrating compliance with UK product safety regulations.",
        keyDetails: [
          "UK recognizes both CE and UKCA marks for most manufactured goods through ongoing transition rules",
          "Technical dossier must be retained for 10 years after product placement",
          "Requires designated UK Responsible Person for cosmetics and medical devices",
        ],
      },
      {
        id: "dcts-origin-rule",
        title: "UK DCTS Origin Declaration on Commercial Invoice",
        authority: "Exporters / HMRC Verification",
        mandatory: true,
        estimatedDays: "2–3 Days",
        tag: "Licensing",
        description:
          "Self-certification origin statement on invoice referencing DCTS preference to reduce UK customs tariff rate.",
        keyDetails: [
          "No separate third-party chamber endorsement required under modernized DCTS",
          "Exporters retain Bill of Materials (BOM) showing non-originating materials < 50%",
        ],
      },
    ],
    mandatoryDocumentation: [
      {
        name: "Customs Declaration Service (CDS) Import Entry",
        filingAuthority: "HMRC CDS Electronic System",
        format: "XML Declaration / Transit Accompanying Document",
        leadTime: "T-24h prior to arrival",
        mandatory: true,
        purpose: "Lodges commodity code, customs valuation, and calculates applicable duty/VAT.",
      },
      {
        name: "Commercial Invoice with DCTS Origin Statement",
        filingAuthority: "HMRC Border Force",
        format: "Standard Commercial Format (PDF)",
        leadTime: "With shipping consignment",
        mandatory: true,
        purpose: "Declares FOB/CIF values, terms of sale (Incoterms 2020), and origin claim.",
      },
      {
        name: "Safety and Security (ENS) Declaration",
        filingAuthority: "HMRC Safety & Security System",
        format: "Electronic Cargo Manifest",
        leadTime: "Pre-departure (2h air, 24h sea)",
        mandatory: true,
        purpose: "Border risk analysis and automated anti-smuggling clearance.",
      },
    ],
    timelineMilestones: [
      {
        phase: "Week 1–2",
        timeframe: "Days 1–14",
        title: "GB EORI & HMRC NETP VAT Submission",
        description: "Obtain GB EORI code and file for Non-Established Taxable Person VAT registration with HMRC.",
        deliverable: "Active GB EORI Identifier & VAT Application Reference",
      },
      {
        phase: "Week 3",
        timeframe: "Days 15–21",
        title: "Technical Dossier & DCTS Rules Review",
        description: "Compile technical file, check Incoterms 2020 (DDP vs DAP), and verify invoice origin statement.",
        deliverable: "Complete Technical Declaration & Invoice Template",
      },
      {
        phase: "Week 4–5",
        timeframe: "Days 22–35",
        title: "Logistics Booking & CDS Pre-Lodgement",
        description: "Book freight with bonded freight forwarder and pre-lodge electronic declaration into HMRC CDS.",
        deliverable: "Master Bill of Lading & Movement Reference Number (MRN)",
      },
      {
        phase: "Week 6",
        timeframe: "Days 36–42",
        title: "Border Clearance & Postponed VAT Accounting",
        description: "Execute port clearance using PVA to defer import VAT and route GBP settlement to virtual account.",
        deliverable: "C88/CDS Proof of Clearance & Settlement Receipt",
      },
    ],
  },
  "India->United States": {
    id: "IND-US",
    homeMarket: "India",
    targetMarket: "United States",
    corridorTitle: "India → United States",
    bilateralTreaty: "Trade Policy Forum (TPF) Bilateral Framework",
    treatyStatus: "Active Trade Dialogue",
    averageCustomsClearanceDays: "2–5 Days",
    overallTimeline: "5–8 Weeks",
    dutyAdvantageSummary:
      "World's largest consumer market; duties determined by US Harmonized Tariff Schedule (HTSUS) with potential Generalized System of Preferences (GSP) updates.",
    taxAndRegistration: [
      {
        id: "us-ein-nonres",
        title: "Employer Identification Number (EIN) & W-8BEN-E",
        authority: "Internal Revenue Service (IRS)",
        mandatory: true,
        estimatedDays: "10–14 Days",
        tag: "Tax",
        description:
          "Federal tax identifier and international withholding treaty declaration required for opening US bank accounts and corporate invoicing.",
        keyDetails: [
          "IRS Form W-8BEN-E verifies foreign non-resident corporate status",
          "Prevents mandatory 30% US federal backup withholding on commercial remittances",
          "Required by US marketplace facilitators and institutional corporate buyers",
        ],
      },
      {
        id: "cbp-ior",
        title: "Importer of Record (IOR) Registration & Continuous Customs Bond",
        authority: "US Customs and Border Protection (CBP)",
        mandatory: true,
        estimatedDays: "7–10 Days",
        tag: "Customs",
        description:
          "CBP Form 5106 registration and annual continuous surety bond (minimum $50,000 face value) for commercial imports.",
        keyDetails: [
          "Continuous entry bond covers all US ports of entry (New York/Newark, LA/Long Beach, Chicago)",
          "Required for all formal commercial entries valued over $2,500",
          "Underwritten by US Treasury-approved surety insurance underwriters",
        ],
      },
      {
        id: "state-nexus-tax",
        title: "State Sales Tax Economic Nexus Compliance",
        authority: "Individual US State Depts of Revenue",
        mandatory: false,
        estimatedDays: "14–20 Days",
        tag: "Tax",
        description:
          "State tax registration if direct-to-enterprise sales exceed state economic thresholds (typically $100,000 / 200 transactions).",
        keyDetails: [
          "Exempt if selling exclusively through marketplace facilitators (Amazon US, Walmart Marketplace)",
          "State-by-state resale exemption certificates required for wholesale B2B distribution",
        ],
      },
    ],
    licensingAndApprovals: [
      {
        id: "pga-clearance",
        title: "Partner Government Agency (PGA) Registration (FDA / FCC / EPA)",
        authority: "US FDA / FCC / CPSC",
        mandatory: true,
        estimatedDays: "14–25 Days",
        tag: "Licensing",
        description:
          "Facility registration, product listing, and US Agent designation for food, pharmaceutical, medical, electronics, or chemical goods.",
        keyDetails: [
          "FDA Food Facility Registration & Foreign Supplier Verification Program (FSVP)",
          "FCC equipment authorization for telecommunications / wireless radiofrequency devices",
          "Mandatory US resident agent required for official regulatory notices",
        ],
      },
      {
        id: "cpsc-childrens-safety",
        title: "Consumer Product Safety Commission (CPSC) Testing",
        authority: "US CPSC",
        mandatory: false,
        estimatedDays: "10–14 Days",
        tag: "Licensing",
        description:
          "Children's Product Certificate (CPC) and General Certificate of Conformity (GCC) from CPSC-accredited laboratory.",
        keyDetails: [
          "Mandatory for children's toys, apparel, cribs, and child-care items",
          "Testing for lead content, phthalates, and flammability",
        ],
      },
    ],
    mandatoryDocumentation: [
      {
        name: "Importer Security Filing (ISF '10+2')",
        filingAuthority: "US CBP Automated Commercial Environment (ACE)",
        format: "Electronic ACE Transmission",
        leadTime: "Strictly 24h prior to vessel departure",
        mandatory: true,
        purpose: "Ocean freight security filing. Failure to file on time incurs $5,000 CBP statutory penalty.",
      },
      {
        name: "CBP Form 7501 (Entry Summary)",
        filingAuthority: "US CBP / Licensed Customs Broker",
        format: "ACE Electronic Entry",
        leadTime: "Within 10 calendar days of arrival",
        mandatory: true,
        purpose: "Official entry document declaring duty rate, merchandise processing fee (MPF), and harbor maintenance fee (HMF).",
      },
      {
        name: "PGA Prior Notice Confirmation",
        filingAuthority: "US FDA / Relevant Agency",
        format: "Electronic PN Barcode",
        leadTime: "Prior to arrival at US port",
        mandatory: true,
        purpose: "Mandatory prior notice for food, dietary supplements, and medical devices.",
      },
    ],
    timelineMilestones: [
      {
        phase: "Week 1–2",
        timeframe: "Days 1–14",
        title: "IRS EIN & Customs Bond Underwriting",
        description: "Acquire federal EIN, file W-8BEN-E, and secure $50,000 continuous customs surety bond via US broker.",
        deliverable: "Active CBP IOR Account & Underwritten Surety Bond",
      },
      {
        phase: "Week 3–4",
        timeframe: "Days 15–28",
        title: "PGA Agency Registration & US Agent",
        description: "Appoint US resident agent and complete facility registrations (FDA / FCC / EPA) for relevant HS lines.",
        deliverable: "PGA Facility Registration Number & Compliance Dossier",
      },
      {
        phase: "Week 5",
        timeframe: "Days 29–35",
        title: "ISF 10+2 Ocean Filing & Cargo Loading",
        description: "Transmit ISF 10+2 electronic manifest 24 hours prior to container loading at Indian seaport (Nhava Sheva / Mundra).",
        deliverable: "ISF Acceptance Match Transaction Number",
      },
      {
        phase: "Week 6–8",
        timeframe: "Days 36–56",
        title: "US Entry Clearance & USD Wire Setup",
        description: "Process formal entry at port of discharge and route USD proceeds through US domestic clearing bank.",
        deliverable: "CBP Form 7501 Liquidation & ACH Settlement Account",
      },
    ],
  },
  "India->Singapore": {
    id: "IND-SG",
    homeMarket: "India",
    targetMarket: "Singapore",
    corridorTitle: "India → Singapore",
    bilateralTreaty: "Comprehensive Economic Cooperation Agreement (CECA)",
    treatyStatus: "Active Bilateral Treaty",
    averageCustomsClearanceDays: "1–2 Days",
    overallTimeline: "2–4 Weeks",
    dutyAdvantageSummary:
      "Virtually all tariff lines enter Singapore duty-free (0% customs duty), with only standard Singapore GST (9%) applicable on import.",
    taxAndRegistration: [
      {
        id: "singapore-customs-uen",
        title: "Singapore Customs Entity Identifier / UEN Activation",
        authority: "Singapore Customs / ACRA",
        mandatory: true,
        estimatedDays: "3–5 Days",
        tag: "Customs",
        description:
          "Unique Entity Number (UEN) activation with Singapore Customs to enable TradeNet import permit generation.",
        keyDetails: [
          "Required for all commercial consignments entering PSA Singapore terminals or Changi Air Cargo Complex",
          "Can operate via local appointed declaring agent or registered foreign entity branch",
        ],
      },
      {
        id: "singapore-gst-mes",
        title: "Major Exporter Scheme (MES) / 9% GST Handling",
        authority: "Inland Revenue Authority of Singapore (IRAS)",
        mandatory: true,
        estimatedDays: "7–10 Days",
        tag: "Tax",
        description:
          "Singapore Goods and Services Tax (GST) is 9%. Exporters utilizing Singapore as a regional re-export hub can apply for GST suspension under MES.",
        keyDetails: [
          "Standard Import GST rate: 9%",
          "Import GST is deferred or suspended if goods are stored in zero-GST / bonded warehouses",
        ],
      },
    ],
    licensingAndApprovals: [
      {
        id: "ceca-preferential-origin",
        title: "CECA Preferential Rules of Origin (India-Singapore)",
        authority: "DGFT India / Singapore Customs",
        mandatory: true,
        estimatedDays: "3–5 Days",
        tag: "Licensing",
        description:
          "Qualifying criteria proving 35% domestic value-add in India with substantial transformation to benefit from bilateral protocol.",
        keyDetails: [
          "Issued electronically via DGFT CoO platform",
          "Accelerates green-channel customs clearance at Port of Singapore",
        ],
      },
      {
        id: "sfa-food-import",
        title: "Singapore Food Agency (SFA) / HSA Product Approvals",
        authority: "SFA / Health Sciences Authority (HSA)",
        mandatory: false,
        estimatedDays: "10–14 Days",
        tag: "Licensing",
        description:
          "Import permits and health certificates for agricultural products, beverages, cosmetics, and complementary health products.",
        keyDetails: [
          "Electronic permit via TradeNet with SFA product code",
          "Mandatory nutritional labeling and English ingredient list standards",
        ],
      },
    ],
    mandatoryDocumentation: [
      {
        name: "Singapore TradeNet Inward Payment Permit (INP)",
        filingAuthority: "Singapore Customs TradeNet",
        format: "Electronic TradeNet Permit (PDF)",
        leadTime: "T-1 Day prior to arrival",
        mandatory: true,
        purpose: "Official customs clearance permit allowing cargo delivery from port terminal.",
      },
      {
        name: "CECA Certificate of Origin",
        filingAuthority: "DGFT India",
        format: "Digital COO Format",
        leadTime: "Prior to shipment arrival",
        mandatory: true,
        purpose: "Proves origin under bilateral CECA agreement.",
      },
      {
        name: "Commercial Invoice with Incoterms & Packing List",
        filingAuthority: "Singapore Customs",
        format: "PDF Document",
        leadTime: "With shipping consignment",
        mandatory: true,
        purpose: "Declares itemized values in SGD/USD and cargo breakdown.",
      },
    ],
    timelineMilestones: [
      {
        phase: "Week 1",
        timeframe: "Days 1–7",
        title: "GST LUT & CECA Origin Documentation",
        description: "Complete domestic export filings in India and initiate CECA origin application.",
        deliverable: "Digital CECA Certificate of Origin Draft",
      },
      {
        phase: "Week 2",
        timeframe: "Days 8–14",
        title: "TradeNet Permitting & Forwarder Coordination",
        description: "Engage Singapore declaring agent and lodge electronic Inward Permit in TradeNet.",
        deliverable: "TradeNet Inward Permit Authorization",
      },
      {
        phase: "Week 3–4",
        timeframe: "Days 15–28",
        title: "Fast Port Clearance & SGD FX Settlement",
        description: "Execute port gate clearance at PSA and receive payment in SGD via local FAST banking rails.",
        deliverable: "Customs Out-of-Charge & Settlement Confirmation",
      },
    ],
  },
};
