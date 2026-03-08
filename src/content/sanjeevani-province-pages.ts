import {
  CAMP_MASTER_LOG,
  PROVINCE_SUMMARY,
  type CampRecord,
} from "./sanjeevani-tracking-data";

export type ProvincePageConfig = {
  slug: string;
  province: string;
  keywordTitle: string;
  intro: string;
  challenge: string[];
  response: string[];
};

export type DistrictCoverageSummary = {
  province: string;
  provinceSlug: string;
  district: string;
  districtSlug: string;
  municipalities: string[];
  camps: CampRecord[];
  totalPatients: number;
  totalReferrals: number;
  totalMedicinesDistributed: number;
  effectiveDays: number;
  firstCamp?: CampRecord;
  latestCamp?: CampRecord;
  provinceIntro: string;
  provinceChallenge: string[];
  provinceResponse: string[];
  keywordTitle: string;
};

export const SANJEEVANI_PROVINCE_PAGES: ProvincePageConfig[] = [
  {
    slug: "karnali",
    province: "Karnali",
    keywordTitle: "Karnali healthcare in Nepal",
    intro:
      "Karnali Province includes some of the most difficult terrain in Nepal for routine medical access, which is why mobile healthcare delivery remains critical there.",
    challenge: [
      "Distance, altitude, and transport constraints increase the cost of reaching routine care in Karnali. Families often delay treatment until conditions become harder to manage.",
      "That makes first-contact care, screening, and referral planning especially important in districts where fixed infrastructure is sparse or difficult to reach.",
    ],
    response: [
      "Project Sanjeevani has concentrated a large share of its current rural camp footprint in Karnali, covering multiple districts and municipalities through phased field deployment.",
      "The current record shows repeated camp activity in Karnali as part of a broader effort to make rural healthcare delivery visible, trackable, and easier to scale responsibly.",
    ],
  },
  {
    slug: "sudurpashchim",
    province: "Sudurpashchim",
    keywordTitle: "Sudurpashchim healthcare in Nepal",
    intro:
      "Sudurpashchim Province combines distance, terrain, and uneven service access in ways that make outreach care highly relevant for remote families.",
    challenge: [
      "In rural Sudurpashchim, the cost of reaching care is not only medical. It also includes transport time, lost work, and delayed diagnosis when first access happens too late.",
      "That is why short-term camps matter most when they are built into a repeatable operating model rather than one-off visibility events.",
    ],
    response: [
      "Sanjeevani's current coverage in Sudurpashchim focuses on district-level camp delivery with verified field records and tracked patient totals.",
      "The goal is to reduce first-contact barriers, support basic treatment and screening, and identify cases that require referral beyond the camp setting.",
    ],
  },
  {
    slug: "bagmati",
    province: "Bagmati",
    keywordTitle: "Bagmati healthcare in Nepal",
    intro:
      "Bagmati is often associated with urban access, but rural and mountainous districts inside the province still face very different healthcare realities.",
    challenge: [
      "Province-level averages can hide access gaps in remote districts and municipalities where travel still delays screening, treatment, and follow-up.",
      "That makes targeted outreach important even in provinces with stronger urban health infrastructure overall.",
    ],
    response: [
      "Sanjeevani's current Bagmati footprint focuses on rural districts where mobile deployment can support first-contact care and improve visibility into field needs.",
      "By publishing verified camp data, the program makes it easier for partners and donors to understand how rural gaps differ even within better-known provinces.",
    ],
  },
  {
    slug: "lumbini",
    province: "Lumbini",
    keywordTitle: "Lumbini healthcare in Nepal",
    intro:
      "Lumbini Province includes communities where mountain access and rural logistics still shape whether families receive timely healthcare.",
    challenge: [
      "A province may include larger population centers, but remote municipalities inside it can still face long travel times and limited routine screening.",
      "For those communities, mobile camps help close the first-access gap and identify which needs can be treated in the field versus referred onward.",
    ],
    response: [
      "Sanjeevani's current Lumbini coverage shows camp deployment in underserved districts where practical access barriers remain significant.",
      "The program record helps connect district-level activity to a wider national healthcare rollout strategy rather than isolated outreach events.",
    ],
  },
  {
    slug: "madhesh",
    province: "Madhesh",
    keywordTitle: "Madhesh healthcare in Nepal",
    intro:
      "Madhesh Province has large populations and persistent healthcare access pressures, making early screening and outreach services important for underserved communities.",
    challenge: [
      "High population density does not automatically mean timely care. Coverage gaps, household costs, and delayed first contact can still prevent routine treatment.",
      "Programs working in Madhesh need to be explicit about where they operate and what they can realistically deliver.",
    ],
    response: [
      "Sanjeevani's current Madhesh footprint is early-stage but verified, giving the province a visible place in the wider national camp rollout.",
      "That matters for future scale because transparent baseline coverage makes expansion easier to evaluate and support.",
    ],
  },
  {
    slug: "gandaki",
    province: "Gandaki",
    keywordTitle: "Gandaki healthcare in Nepal",
    intro:
      "Gandaki Province includes rural and highland communities where terrain still shapes whether basic care is routine or difficult to reach.",
    challenge: [
      "Physical access remains one of the biggest healthcare barriers in remote areas of Gandaki, especially where travel itself can delay first treatment.",
      "A strong outreach model in the province depends on field coordination, realistic staffing, and clear post-camp reporting.",
    ],
    response: [
      "Sanjeevani's current Gandaki record shows verified entry into the province through rural camp delivery in hard-to-reach areas.",
      "Even a smaller early footprint matters because it gives the program a trackable operational base for future expansion in the province.",
    ],
  },
  {
    slug: "koshi",
    province: "Koshi",
    keywordTitle: "Koshi healthcare in Nepal",
    intro:
      "Koshi Province includes remote hill and mountain communities where first-contact care can still depend on whether a medical team comes closer to the village.",
    challenge: [
      "In these areas, delayed care is often driven by distance and travel complexity rather than clinical need alone.",
      "That creates a strong role for mobile health delivery that can screen, treat, and refer cases before conditions worsen.",
    ],
    response: [
      "Sanjeevani's current Koshi footprint is limited but verified, showing how the program has already reached into the province's rural geography.",
      "Publishing those records matters because geographic spread is part of what donors and partners evaluate when judging the credibility of national scale claims.",
    ],
  },
];

export function getProvincePageConfig(slug: string) {
  return SANJEEVANI_PROVINCE_PAGES.find((item) => item.slug === slug);
}

function slugifyName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProvinceCoverageData(slug: string) {
  const config = getProvincePageConfig(slug);
  if (!config) return null;

  const provinceSummary = PROVINCE_SUMMARY.find(
    (item) => item.province === config.province
  );
  if (!provinceSummary) return null;

  const camps = CAMP_MASTER_LOG.filter((camp) => camp.province === config.province);
  const municipalities = Array.from(
    new Set(camps.map((camp) => camp.ruralMunicipality))
  );
  const latestCamp = [...camps].sort((a, b) => a.endDate.localeCompare(b.endDate)).at(-1);

  return {
    ...config,
    camps,
    provinceSummary,
    municipalities,
    latestCamp,
    totalPatients: camps.reduce((sum, camp) => sum + camp.totalPatients, 0),
    totalReferrals: camps.reduce((sum, camp) => sum + camp.referrals, 0),
    totalMedicinesDistributed: camps.reduce(
      (sum, camp) => sum + camp.medicinesDistributed,
      0
    ),
  };
}

export function getProvinceDistrictCoverage(
  provinceSlug: string
): DistrictCoverageSummary[] {
  const provinceData = getProvinceCoverageData(provinceSlug);
  if (!provinceData) return [];

  const groupedByDistrict = new Map<string, CampRecord[]>();

  provinceData.camps.forEach((camp) => {
    const existing = groupedByDistrict.get(camp.district) || [];
    existing.push(camp);
    groupedByDistrict.set(camp.district, existing);
  });

  return Array.from(groupedByDistrict.entries())
    .map(([district, camps]) => {
      const orderedCamps = [...camps].sort((a, b) =>
        a.endDate.localeCompare(b.endDate)
      );

      return {
        province: provinceData.province,
        provinceSlug,
        district,
        districtSlug: slugifyName(district),
        municipalities: Array.from(
          new Set(orderedCamps.map((camp) => camp.ruralMunicipality))
        ),
        camps: orderedCamps,
        totalPatients: orderedCamps.reduce(
          (sum, camp) => sum + camp.totalPatients,
          0
        ),
        totalReferrals: orderedCamps.reduce(
          (sum, camp) => sum + camp.referrals,
          0
        ),
        totalMedicinesDistributed: orderedCamps.reduce(
          (sum, camp) => sum + camp.medicinesDistributed,
          0
        ),
        effectiveDays: orderedCamps.reduce(
          (sum, camp) => sum + camp.effectiveDays,
          0
        ),
        firstCamp: orderedCamps[0],
        latestCamp: orderedCamps.at(-1),
        provinceIntro: provinceData.intro,
        provinceChallenge: provinceData.challenge,
        provinceResponse: provinceData.response,
        keywordTitle: provinceData.keywordTitle,
      };
    })
    .sort((a, b) => b.totalPatients - a.totalPatients);
}

export function getDistrictCoverageData(
  provinceSlug: string,
  districtSlug: string
) {
  return getProvinceDistrictCoverage(provinceSlug).find(
    (item) => item.districtSlug === districtSlug
  );
}

export function getAllDistrictCoverageParams() {
  return SANJEEVANI_PROVINCE_PAGES.flatMap((province) =>
    getProvinceDistrictCoverage(province.slug).map((district) => ({
      province: province.slug,
      district: district.districtSlug,
    }))
  );
}
