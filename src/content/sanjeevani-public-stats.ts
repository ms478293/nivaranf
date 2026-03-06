import {
  EXECUTIVE_DASHBOARD,
  PROVINCE_SUMMARY,
  RURAL_COVERAGE,
} from "./sanjeevani-tracking-data";

function formatCompactUsd(amount: number) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`;
  return `$${amount.toLocaleString("en-US")}`;
}

export const SANJEEVANI_PUBLIC_STATS = {
  patientsServed: EXECUTIVE_DASHBOARD.totalPatientsServed,
  patientsServedText: EXECUTIVE_DASHBOARD.totalPatientsServed.toLocaleString("en-US"),
  campsCompleted: EXECUTIVE_DASHBOARD.totalCampsConducted,
  campsCompletedText: EXECUTIVE_DASHBOARD.totalCampsConducted.toLocaleString("en-US"),
  provincesCovered: PROVINCE_SUMMARY.length,
  provincesCoveredText: PROVINCE_SUMMARY.length.toString(),
  municipalitiesCovered: RURAL_COVERAGE.coveredSoFar,
  municipalitiesCoveredText: RURAL_COVERAGE.coveredSoFar.toString(),
  investmentSoFar: EXECUTIVE_DASHBOARD.totalSpendingSoFar,
  investmentSoFarText: `$${EXECUTIVE_DASHBOARD.totalSpendingSoFar.toLocaleString("en-US")}`,
  investmentSoFarCompactText: formatCompactUsd(EXECUTIVE_DASHBOARD.totalSpendingSoFar),
  averagePatientsPerCamp: EXECUTIVE_DASHBOARD.avgPatientsPerCamp,
  averagePatientsPerCampText: EXECUTIVE_DASHBOARD.avgPatientsPerCamp.toLocaleString("en-US"),
  targetYear: EXECUTIVE_DASHBOARD.targetYear,
  targetYearText: EXECUTIVE_DASHBOARD.targetYear.toString(),
};

export const SANJEEVANI_PUBLIC_COPY = {
  summary: `${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps in all ${SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces of Nepal.`,
  summaryWithMunicipalities: `${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps and ${SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText} rural municipalities.`,
  pressSummary: `Current tracking records show ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps, ${SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText} rural municipalities, and all ${SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces of Nepal.`,
  trackingMetadata: `Real-time progress tracking for Nepal's National Rural Health Mission. ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across all ${SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces through ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps.`,
};
