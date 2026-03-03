// ─────────────────────────────────────────────────────────────
// Project Sanjeevani – Practical Tracking Data
// ─────────────────────────────────────────────────────────────
// CALCULATION BASIS (REALISTIC):
//   • Team of 7 people, 5–7 min consultation (avg 6 min)
//   • 12-hr shift with 2-hr break = 10 working hours = 600 min
//   • BUT: registration, intake, complex cases, terrain logistics
//     reduce effective throughput to ~65 patients/team/day
//   • 6 working days/week
//   • Phase 1: 1 team (Team A) — May 21 to Aug 30, 2025
//   • Phase 2: 2 teams (A + B) — Sep 1, 2025 to Feb 27, 2026
//   • Dashain (Oct) & Tihar (Nov) reduce effective days
//   • Cost per patient: ~$7.50 USD
//   • Total: ~17,355 patients across 16 camps
// ─────────────────────────────────────────────────────────────

/* ── Executive KPIs ─────────────────────────────────────── */
export const EXECUTIVE_DASHBOARD = {
  title: "PROJECT SANJEEVANI – NATIONAL RURAL HEALTH MISSION",
  targetYear: 2030,
  totalPatientsServed: 17_355,
  totalCampsConducted: 16,
  costPerPatient: 7.5, // USD
  totalSpendingSoFar: 130_163, // 17,355 × $7.50
  activeMedicalTeams: 2,
  teamSize: 7,
  workingHoursPerDay: 10, // 12-hr shift, 2-hr break
  minPerPatient: 6, // avg consultation minutes
  avgPatientsPerCamp: 1_085,
  avgPatientsPerMonth: 1_736,
  estimatedWeeklyCapacity: 780, // 2 teams × 65/day × 6 days
  estimatedAnnualCapacity: 33_000, // ~42 effective weeks/year
  estimatedAnnualBudget: 247_500, // USD
  ruralMunicipalitiesInNepal: 460,
  totalPalikasInNepal: 753,
  patientsPerTeamPerDay: 65,
};

/* ── Camp Master Log ────────────────────────────────────── */
export interface CampRecord {
  campId: string;
  province: string;
  district: string;
  ruralMunicipality: string;
  startDate: string;
  endDate: string;
  teamAssigned: string;
  teamSize: number;
  doctors: number;
  effectiveDays: number;
  totalPatients: number;
  male: number;
  female: number;
  children: number;
  majorCases: string;
  referrals: number;
  medicinesDistributed: number;
  totalCost: number;
  costPerPatient: number;
}

// Helper: 65 patients/team/day (realistic for rural Nepal), gender split 48/42/10
function camp(
  id: number,
  province: string,
  district: string,
  municipality: string,
  start: string,
  end: string,
  team: string,
  effectiveDays: number,
): CampRecord {
  const patients = effectiveDays * 65;
  return {
    campId: `CAMP-${String(id).padStart(3, "0")}`,
    province,
    district,
    ruralMunicipality: municipality,
    startDate: start,
    endDate: end,
    teamAssigned: team,
    teamSize: 7,
    doctors: 3,
    effectiveDays,
    totalPatients: patients,
    male: Math.round(patients * 0.48),
    female: Math.round(patients * 0.42),
    children: Math.round(patients * 0.10),
    majorCases: "General, Chronic, Maternal",
    referrals: Math.round(patients * 0.05),
    medicinesDistributed: Math.round(patients * 0.90),
    totalCost: Math.round(patients * 7.5),
    costPerPatient: 7.5,
  };
}

export const CAMP_MASTER_LOG: CampRecord[] = [
  // ── Phase 1: 1 Team (Team A) — May 21 to Aug 30, 2025 ──
  camp(1, "Karnali", "Dolpa", "Mudkechula", "2025-05-21", "2025-05-31", "Team A", 7),         // 455
  camp(2, "Karnali", "Humla", "Namkha", "2025-06-02", "2025-06-28", "Team A", 20),            // 1,300
  camp(3, "Karnali", "Jumla", "Hima", "2025-07-01", "2025-07-26", "Team A", 20),              // 1,300
  camp(4, "Sudurpashchim", "Bajura", "Swamikartik", "2025-08-01", "2025-08-27", "Team A", 18), // 1,170

  // ── Phase 2: 2 Teams (A + B) — Sep 1, 2025 onward ──
  camp(5, "Sudurpashchim", "Achham", "Turmakhand", "2025-09-01", "2025-09-25", "Team A", 18),        // 1,170
  camp(6, "Lumbini", "Rukum East", "Putha Uttarganga", "2025-09-01", "2025-09-25", "Team B", 18),    // 1,170

  camp(7, "Gandaki", "Gorkha", "Chum Nubri", "2025-10-01", "2025-10-20", "Team A", 12),              // 780 (Dashain)
  camp(8, "Koshi", "Taplejung", "Meringden", "2025-10-01", "2025-10-20", "Team B", 12),              // 780 (Dashain)

  camp(9, "Lumbini", "Rolpa", "Thawang", "2025-11-01", "2025-11-22", "Team A", 15),                  // 975 (Tihar)
  camp(10, "Madhesh", "Mahottari", "Sonama", "2025-11-01", "2025-11-22", "Team B", 15),              // 975 (Tihar)

  camp(11, "Bagmati", "Rasuwa", "Gosaikunda", "2025-12-01", "2025-12-25", "Team A", 18),             // 1,170
  camp(12, "Karnali", "Mugu", "Mugum Karmarong", "2025-12-01", "2025-12-25", "Team B", 18),          // 1,170

  camp(13, "Bagmati", "Sindhuli", "Kamalamai", "2026-01-05", "2026-01-31", "Team A", 20),            // 1,300
  camp(14, "Karnali", "Kalikot", "Pachaljharana", "2026-01-05", "2026-01-31", "Team B", 20),         // 1,300

  camp(15, "Sudurpashchim", "Darchula", "Mahakali", "2026-02-02", "2026-02-27", "Team A", 18),       // 1,170
  camp(16, "Karnali", "Dailekh", "Dullu", "2026-02-02", "2026-02-27", "Team B", 18),                 // 1,170
];

/* ── Monthly Progress Tracker ──────────────────────────── */
export interface MonthlyRecord {
  month: string;
  teams: number;
  campsConducted: number;
  effectiveDays: number;
  patientsThisMonth: number;
  cumulativePatients: number;
  budgetSpent: number;
  avgPatientsPerCamp: number;
}

export const MONTHLY_TRACKER: MonthlyRecord[] = [
  // Phase 1 — 1 team, 65 patients/team/day
  { month: "May 2025", teams: 1, campsConducted: 1, effectiveDays: 7,  patientsThisMonth: 455,   cumulativePatients: 455,    budgetSpent: 3_413,  avgPatientsPerCamp: 455 },
  { month: "Jun 2025", teams: 1, campsConducted: 1, effectiveDays: 20, patientsThisMonth: 1_300, cumulativePatients: 1_755,  budgetSpent: 9_750,  avgPatientsPerCamp: 1_300 },
  { month: "Jul 2025", teams: 1, campsConducted: 1, effectiveDays: 20, patientsThisMonth: 1_300, cumulativePatients: 3_055,  budgetSpent: 9_750,  avgPatientsPerCamp: 1_300 },
  { month: "Aug 2025", teams: 1, campsConducted: 1, effectiveDays: 18, patientsThisMonth: 1_170, cumulativePatients: 4_225,  budgetSpent: 8_775,  avgPatientsPerCamp: 1_170 },
  // Phase 2 — 2 teams, 65 patients/team/day
  { month: "Sep 2025", teams: 2, campsConducted: 2, effectiveDays: 18, patientsThisMonth: 2_340, cumulativePatients: 6_565,  budgetSpent: 17_550, avgPatientsPerCamp: 1_170 },
  { month: "Oct 2025", teams: 2, campsConducted: 2, effectiveDays: 12, patientsThisMonth: 1_560, cumulativePatients: 8_125,  budgetSpent: 11_700, avgPatientsPerCamp: 780 },
  { month: "Nov 2025", teams: 2, campsConducted: 2, effectiveDays: 15, patientsThisMonth: 1_950, cumulativePatients: 10_075, budgetSpent: 14_625, avgPatientsPerCamp: 975 },
  { month: "Dec 2025", teams: 2, campsConducted: 2, effectiveDays: 18, patientsThisMonth: 2_340, cumulativePatients: 12_415, budgetSpent: 17_550, avgPatientsPerCamp: 1_170 },
  { month: "Jan 2026", teams: 2, campsConducted: 2, effectiveDays: 20, patientsThisMonth: 2_600, cumulativePatients: 15_015, budgetSpent: 19_500, avgPatientsPerCamp: 1_300 },
  { month: "Feb 2026", teams: 2, campsConducted: 2, effectiveDays: 18, patientsThisMonth: 2_340, cumulativePatients: 17_355, budgetSpent: 17_550, avgPatientsPerCamp: 1_170 },
];

/* ── 5-Year Rollout Plan ───────────────────────────────── */
// 65 patients/team/day × 6 days/week × ~42 effective weeks/year
// 1 team ≈ 16,380/yr • 2 teams ≈ 33,000/yr
export interface RolloutYear {
  year: number;
  teams: number;
  projectedPatients: number;
  projectedCamps: number;
  estimatedBudget: number;
  cumulativePatients: number;
}

export const FIVE_YEAR_ROLLOUT: RolloutYear[] = [
  { year: 2025, teams: 2, projectedPatients: 12_415,  projectedCamps: 12, estimatedBudget: 93_113,   cumulativePatients: 12_415 },
  { year: 2026, teams: 2, projectedPatients: 33_000,  projectedCamps: 24, estimatedBudget: 247_500,  cumulativePatients: 45_415 },
  { year: 2027, teams: 3, projectedPatients: 49_500,  projectedCamps: 36, estimatedBudget: 371_250,  cumulativePatients: 94_915 },
  { year: 2028, teams: 4, projectedPatients: 66_000,  projectedCamps: 48, estimatedBudget: 495_000,  cumulativePatients: 160_915 },
  { year: 2029, teams: 5, projectedPatients: 82_500,  projectedCamps: 60, estimatedBudget: 618_750,  cumulativePatients: 243_415 },
  { year: 2030, teams: 5, projectedPatients: 82_500,  projectedCamps: 60, estimatedBudget: 618_750,  cumulativePatients: 325_915 },
];

/* ── Scaling Scenarios ─────────────────────────────────── */
// Each team: 12 municipalities/year (1 per month per team)
export interface ScalingScenario {
  teams: number;
  annualCapacity: number;
  annualBudget: number;
  municipalitiesPerYear: number;
  yearsToComplete: number;
}

export const SCALING_SCENARIOS: ScalingScenario[] = [
  { teams: 2, annualCapacity: 33_000,  annualBudget: 247_500, municipalitiesPerYear: 24, yearsToComplete: 19.2 },
  { teams: 3, annualCapacity: 49_500,  annualBudget: 371_250, municipalitiesPerYear: 36, yearsToComplete: 12.8 },
  { teams: 4, annualCapacity: 66_000,  annualBudget: 495_000, municipalitiesPerYear: 48, yearsToComplete: 9.6 },
  { teams: 5, annualCapacity: 82_500,  annualBudget: 618_750, municipalitiesPerYear: 60, yearsToComplete: 7.7 },
];

/* ── Impact Metrics ────────────────────────────────────── */
export const IMPACT_METRICS = {
  totalPatientsServed: 17_355,
  womenBeneficiaries: 7_289, // 42%
  childrenBeneficiaries: 1_736, // 10%
  estimatedReferrals: 868, // 5%
  medicinesDistributed: 15_620, // 90%
};

/* ── Financial Summary ─────────────────────────────────── */
export const FINANCIAL_SUMMARY = {
  totalSpentSoFar: 130_163, // 17,355 × $7.50
  projectedAnnualBudget: 247_500, // 2 teams full year
  projected5YearBudget: 2_444_363, // sum of 5-year rollout
};

/* ── Rural Coverage ────────────────────────────────────── */
export const RURAL_COVERAGE = {
  totalRuralMunicipalities: 460,
  coveredSoFar: 16,
  coveragePercent: (16 / 460) * 100,
};

/* ── Province-wise Camp Distribution ───────────────────── */
export interface ProvinceSummary {
  province: string;
  campsCompleted: number;
  totalPatients: number;
  districts: string[];
}

export const PROVINCE_SUMMARY: ProvinceSummary[] = [
  { province: "Karnali", campsCompleted: 6, totalPatients: 6_695, districts: ["Dolpa", "Humla", "Jumla", "Mugu", "Kalikot", "Dailekh"] },
  { province: "Sudurpashchim", campsCompleted: 3, totalPatients: 3_510, districts: ["Bajura", "Achham", "Darchula"] },
  { province: "Bagmati", campsCompleted: 2, totalPatients: 2_470, districts: ["Rasuwa", "Sindhuli"] },
  { province: "Lumbini", campsCompleted: 2, totalPatients: 2_145, districts: ["Rukum East", "Rolpa"] },
  { province: "Madhesh", campsCompleted: 1, totalPatients: 975, districts: ["Mahottari"] },
  { province: "Gandaki", campsCompleted: 1, totalPatients: 780, districts: ["Gorkha"] },
  { province: "Koshi", campsCompleted: 1, totalPatients: 780, districts: ["Taplejung"] },
];
