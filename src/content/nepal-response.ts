// Nepal flood response — verified situation data.
// Every figure below is attributed to a named public source and dated.
// Do not add a number here without a source. Do not add Nivaran delivery
// claims here: this campaign is fundraising to deploy, not reporting delivery.

const OFFICIAL_FLOOD_UPDATE_URL =
  "https://www.mofa.gov.np/content/1884/the-ministry-s-regular-press-briefing--11-september/";

// Dated official reporting, not a live counter. Refresh the report and its date together.
export const LATEST_NEPAL_FLOOD_UPDATE = {
  reportDate: "2026-09-11",
  reportDateLabel: "11 September 2026",
  sourceLabel: "Nepal Ministry of Foreign Affairs",
  sourceUrl: OFFICIAL_FLOOD_UPDATE_URL,
  summary:
    "Families in Rasuwa, Nuwakot and Dhading face displacement and damaged homes, roads and bridges after the 26 August Bhote Koshi floods. Search, rescue and relief efforts continue.",
  figures: [
    { value: "1,385", label: "bodies recovered" },
    { value: "~5,130", label: "people still missing" },
    { value: "13,676", label: "people rescued" },
  ],
} as const;

export const NEPAL_RESPONSE = {
  reviewedAt: "2026-09-14",
  eventDate: "2026-08-26",
  title: "Nepal flood recovery",

  // Uses the existing checkout and campaign designation, not a separate processor.
  floodFundUrl: "/donate/nepal-flood-recovery#flood-giving",

  // Publish a target only when an approved budget exists. Empty = not shown.
  target: "",

  source: "https://www.who.int/nepal/emergencies/2026-rasuwa-flash-floods",
  updateSource: "https://www.unicef.org.au/nepal-floods-explainer",

  districts: ["Rasuwa", "Nuwakot", "Dhading", "Gorkha", "Chitwan"],

  cause:
    "On August 26, 2026 a mass of ice and rock collapsed from a glacier near the Nepal–Tibet border, high on Langtang Lirung. The collapse sent a surge of water and debris down the Bhote Koshi river, through the Trishuli valley and on into districts more than 100 kilometres downstream.",

  // Each figure carries the source that reported it. Where sources differ,
  // both are shown rather than averaged.
  figures: [
    ...LATEST_NEPAL_FLOOD_UPDATE.figures.map((figure) => ({
      ...figure,
      attribution: "Nepal Ministry of Foreign Affairs, 11 September 2026",
      href: OFFICIAL_FLOOD_UPDATE_URL,
    })),
    {
      value: "65,000",
      label: "people affected, including 22,100 children",
      attribution: "UNICEF, September 2026",
      href: "https://www.unicef.org.au/nepal-floods-explainer",
    },
    {
      value: "8,000+",
      label: "homes destroyed",
      attribution: "Nepal government damage assessment, early September 2026",
      href: "https://en.wikipedia.org/wiki/2026_Nepal_floods",
    },
    {
      value: "32",
      label: "bridges and roughly 55 km of road swept away",
      attribution: "Nepali officials, reported by UNICEF",
      href: "https://www.unicef.org.au/nepal-floods-explainer",
    },
  ],

  priorities: [
    {
      title: "Safe water & sanitation",
      description:
        "Water sources across the affected valleys are contaminated and unsafe to drink or bathe in. UNICEF places emergency water and sanitation needs at roughly 65,000 people.",
    },
    {
      title: "Healthcare access",
      description:
        "Communities in Rasuwa and upper Nuwakot were reached by a small number of roads and bridges through steep river valleys. The flood removed those routes, cutting health posts off from the people who depend on them.",
    },
    {
      title: "Mothers & children",
      description:
        "Reporting from health agencies identifies nutrition support for around 10,500 pregnant and nursing women, and treatment for roughly 2,600 children with severe malnutrition.",
    },
  ],

  // Reference sources shown on the page. Add here, do not hard-code in JSX.
  sources: [
    { label: "Nepal Ministry of Foreign Affairs — flood update, 11 September 2026", href: OFFICIAL_FLOOD_UPDATE_URL },
    { label: "WHO — 2026 Rasuwa flash floods", href: "https://www.who.int/nepal/emergencies/2026-rasuwa-flash-floods" },
    { label: "UNICEF — Nepal flash floods explainer", href: "https://www.unicef.org.au/nepal-floods-explainer" },
    { label: "CNN — rescue efforts, September 5, 2026", href: "https://www.cnn.com/2026/09/05/world/live-news/nepal-china-flood" },
    { label: "UN News — Himalayan flood disaster", href: "https://news.un.org/en/story/2026/08/1168213" },
  ],
};
