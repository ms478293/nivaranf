import { ProvinceCampaignData } from "@/content/Nepal-Info";

export const calculatedTotalStats = ProvinceCampaignData.reduce(
  (acc, curr) => ({
    totalGaupalikas: acc.totalGaupalikas + curr.gaupalikas_covered,
    totalCamp: acc.totalCamp + curr.total_camps_setup,
    workingDay:
      acc.workingDay +
      curr.districts_covered.reduce(
        (daysAcc, district) => daysAcc + district.days_covered,
        0
      ),
  }),
  { totalGaupalikas: 0, totalCamp: 0, workingDay: 0 }
);
