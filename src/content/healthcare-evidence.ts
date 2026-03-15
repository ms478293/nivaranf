export type EvidenceLink = {
  title: string;
  href: string;
  source: string;
  note: string;
};

export const GENERAL_HEALTHCARE_EVIDENCE: EvidenceLink[] = [
  {
    title: "Nepal DHS 2022 Final Report",
    href: "https://dhsprogram.com/publications/publication-FR379-DHS-Final-Reports.cfm",
    source: "The DHS Program",
    note:
      "National survey reference for healthcare access, antenatal care, maternal health, and service-use patterns in Nepal.",
  },
  {
    title:
      "Government of Nepal and World Bank launch the Nepal Quality Health Systems Program",
    href: "https://www.worldbank.org/en/news/press-release/2023/12/01/government-of-nepal-and-world-bank-launch-103-84-million-nepal-quality-health-systems-program-to-strengthen-nepal-s-heal",
    source: "World Bank",
    note:
      "Official health-systems reference on equitable access, service quality, and system resilience in Nepal.",
  },
  {
    title: "WHO remarks for World Health Day 2023 in Nepal",
    href: "https://www.who.int/nepal/news/detail/07-04-2023-remarks-by-who-representative-to-nepal-for-world-health-day",
    source: "WHO Nepal",
    note:
      "Public-health reference on basic health services and the importance of equitable access in Nepal.",
  },
];

export const MATERNAL_HEALTH_EVIDENCE: EvidenceLink[] = [
  {
    title:
      "Nepal marks World Health Day with renewed commitment to maternal and newborn care",
    href: "https://www.who.int/nepal/news/detail/07-04-2025-nepal-marks-world-health-day-with-renewed-commitment-to-maternal-and-newborn-care",
    source: "WHO Nepal",
    note:
      "Official maternal and newborn health reference on equity, access, and remaining maternal mortality burden.",
  },
  ...GENERAL_HEALTHCARE_EVIDENCE,
];
