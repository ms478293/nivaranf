export interface BudgetRange {
  low: number;
  base: number;
  high: number;
}

export interface PhaseOperatingYear {
  year: number;
  teams: number;
  projectedPatients: number;
  projectedCamps: number;
  estimatedBudget: number;
  note: string;
}

export interface RealisticScalingScenario {
  teams: number;
  annualCapacity: number;
  annualBudget: number;
  municipalitiesPerYear: number;
  yearsToComplete: number;
  supportStaffFootprint: number;
}

export interface CapitalPhasePlan {
  phase: string;
  title: string;
  budget: BudgetRange;
  summary: string;
  note: string;
}

export const SANJEEVANI_FINANCE_MODEL = {
  variableClinicalCostPerPatient: {
    low: 7,
    base: 7.5,
    high: 9,
  } satisfies BudgetRange,
  fullyLoadedCostPerPatient: {
    low: 25.5,
    base: 28.9,
    high: 36.5,
  } satisfies BudgetRange,
  currentAnnualOperatingBudget: {
    low: 763_821,
    base: 953_872,
    high: 1_202_946,
  } satisfies BudgetRange,
  phaseOneOperatingEnvelope: {
    low: 7_000_000,
    base: 7_754_000,
    high: 9_000_000,
  } satisfies BudgetRange,
  phaseOnePlusTwoTranche: 18_000_000,
  currentOperatingAssumptions: {
    totalStaff: 50,
    medicalStaff: 24,
    activeFieldTeams: 2,
    currentAnnualPatientCapacity: 33_000,
  },
};

export const PHASE_ONE_OPERATING_PATH: PhaseOperatingYear[] = [
  {
    year: 2025,
    teams: 2,
    projectedPatients: 12_415,
    projectedCamps: 16,
    estimatedBudget: 550_000,
    note: "Partial-year launch, field systems setup, and first verified 16 camps.",
  },
  {
    year: 2026,
    teams: 2,
    projectedPatients: 33_000,
    projectedCamps: 24,
    estimatedBudget: 953_872,
    note: "Base-case fully loaded operating budget for the current two-team model.",
  },
  {
    year: 2027,
    teams: 3,
    projectedPatients: 49_500,
    projectedCamps: 36,
    estimatedBudget: 1_220_000,
    note: "Third team added with larger logistics, compliance, and support footprint.",
  },
  {
    year: 2028,
    teams: 4,
    projectedPatients: 66_000,
    projectedCamps: 48,
    estimatedBudget: 1_480_000,
    note: "National reach expands with stronger back-office and supply-chain load.",
  },
  {
    year: 2029,
    teams: 5,
    projectedPatients: 82_500,
    projectedCamps: 60,
    estimatedBudget: 1_730_000,
    note: "Five-team scale with wider field logistics, training, and equipment renewal.",
  },
  {
    year: 2030,
    teams: 5,
    projectedPatients: 82_500,
    projectedCamps: 60,
    estimatedBudget: 1_820_128,
    note: "Steady-state Phase I operating path with inflation and quality controls included.",
  },
];

export const REALISTIC_SCALING_SCENARIOS: RealisticScalingScenario[] = [
  {
    teams: 2,
    annualCapacity: 33_000,
    annualBudget: 953_872,
    municipalitiesPerYear: 24,
    yearsToComplete: 19.2,
    supportStaffFootprint: 50,
  },
  {
    teams: 3,
    annualCapacity: 49_500,
    annualBudget: 1_220_000,
    municipalitiesPerYear: 36,
    yearsToComplete: 12.8,
    supportStaffFootprint: 60,
  },
  {
    teams: 4,
    annualCapacity: 66_000,
    annualBudget: 1_480_000,
    municipalitiesPerYear: 48,
    yearsToComplete: 9.6,
    supportStaffFootprint: 72,
  },
  {
    teams: 5,
    annualCapacity: 82_500,
    annualBudget: 1_730_000,
    municipalitiesPerYear: 60,
    yearsToComplete: 7.7,
    supportStaffFootprint: 84,
  },
];

export const CAPITAL_PHASE_PLAN: CapitalPhasePlan[] = [
  {
    phase: "Phase I",
    title: "Mobile outreach and team scale",
    budget: {
      low: 7_000_000,
      base: 7_754_000,
      high: 9_000_000,
    },
    summary: "2-5 field teams, diagnostics, medicine, transport, field lodging, and operating support through 2030.",
    note: "Operating budget only. No hospital construction inside this figure.",
  },
  {
    phase: "Phase II",
    title: "Regional hubs and referral readiness",
    budget: {
      low: 7_500_000,
      base: 10_500_000,
      high: 13_500_000,
    },
    summary: "Provincial hubs, ambulance or referral support, telehealth, depots, and stronger emergency response coverage.",
    note: "Mixed capital and operating layer. Still separate from hospital network capex.",
  },
  {
    phase: "Phase III",
    title: "77-hospital network",
    budget: {
      low: 100_000_000,
      base: 125_000_000,
      high: 150_000_000,
    },
    summary: "Local hospital buildout, fit-out, equipment, commissioning, systems, and start-up if Nivaran directly owns or funds the network.",
    note: "Public Nepal construction signals alone imply roughly $75M-$96M in civil works before equipment and commissioning.",
  },
  {
    phase: "Phase IV",
    title: "700+ bed central hospital",
    budget: {
      low: 40_000_000,
      base: 55_000_000,
      high: 70_000_000,
    },
    summary: "Tertiary referral center with major diagnostics, emergency capability, and specialist infrastructure.",
    note: "Public benchmark interpolation suggests civil works alone may already sit around $33M-$43M.",
  },
];

export const VISION_MODEL_OPTIONS = {
  directOwnership: {
    low: 155_000_000,
    high: 242_000_000,
  },
  partnershipModel: {
    low: 38_000_000,
    high: 84_000_000,
  },
};
