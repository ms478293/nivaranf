export type blogListType = {
  slug: string;
  title: string;
  summary: string;
  thumbnailImage: string;
  date: string;
  author: string;
  featured?: boolean;
  type:
    | "Story"
    | "Collaboration"
    | "News"
    | "Opinion"
    | "Analysis"
    | "Project"
    | "Article";
};

export const globalBlogs: blogListType[] = [
  {
    slug: "the-unseen-crisis-ocular-disorders-among-internally-displaced-persons-in-benue-state",
    title: "The Unseen Crisis: Ocular Disorders Among Internally Displaced Persons in Benue State",
    summary:
      "A new study reveals a staggering 62.5% prevalence of ocular disorders among internally displaced persons in Benue State, Nigeria, highlighting critical gaps in health access and the profound impact of displacement on vision and quality of life. This analysis, in the Nivaran/Founder tone, delves into the systemic failures and urgent humanitarian imperatives, underscoring how economic, educational, and geographical distances transform treatable conditions into debilitating impairments.",
    thumbnailImage: "/images/placeholder-image-for-nivaran.webp",
    date: "2026-02-24",
    author: "Nivaran/Founder",
    featured: true,
    type: "Analysis",
  },
  {
    slug: "uniting-for-africa-s-future-first-ladies-championing-health-education-and-economic-empowerment",
    title: "Uniting for Africa's Future: First Ladies Championing Health, Education, and Economic Empowerment",
    summary:
      "African First Ladies are uniting to tackle health, education, and economic disparities for women and vulnerable communities, inspired by Ghana's First Lady Lordina Mahama. This collaborative effort, epitomized by the Lordina Foundation's impactful work, aims to bridge critical gaps across the continent, proving that collective action can overcome the systemic 'distances' that impede progress.",
    thumbnailImage: "", // Will be fetched/updated
    date: "2026-02-23",
    author: "Nivaran Global Desk",
    featured: true,
    type: "Article",
  },
  {
    slug: "the-end-of-an-ancient-scourge-libya-s-triumph-over-trachoma-and-the-unfolding-narrative-of-global-health-equity",
    title: "The End of an Ancient Scourge: Libya's Triumph Over Trachoma and the Unfolding Narrative of Global Health Equity",
    summary:
      "Despite years of political instability and humanitarian crises, Libya has achieved a landmark victory, eliminating trachoma as a public health problem. This success, driven by dedicated health workers and international partnerships, offers crucial lessons for overcoming neglected tropical diseases and advancing health equity globally, proving that 'Distance is the Disease' can be defeated.",
    thumbnailImage: "", // Will be fetched/updated
    date: "2026-02-23",
    author: "Nivaran Global Desk",
    featured: true,
    type: "Article",
  },
  {
    slug: "the-3-2-billion-betrayal-education-aid-collapse-threatens-6-million-children",
    title: "The $3.2 Billion Betrayal: Education Aid Collapse Threatens 6 Million Children",
    summary:
      "International aid for education is projected to drop by 24% by 2026. For children in fragile states like Sudan and Haiti, this retreat of global support dismantles the only sanctuary they have left.",
    thumbnailImage: "/images/global-news/2026/2026-02-23-unicef-sudan-education-crisis.jpg", // Corrected image path
    date: "2026-02-23",
    author: "Nivaran Foundation Global Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-2026-threat-matrix-six-health-crises-defining-the-year",
    title: "The 2026 Threat Matrix: Six Health Crises Defining the Year",
    summary:
      "As violence hits post-WWII highs, conflict has become a primary driver of infectious disease. Cholera deaths rose 50% last year, largely in war zones. This is the new epidemiology of instability.",
    thumbnailImage: "/images/global-news/2026/2026-02-23-the-2026-threat-matrix-six-health-crises-defining-the-year.jpg",
    date: "2026-02-23",
    author: "Nivaran Foundation Global Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-lethal-gap-why-conflict-zones-are-now-the-world-s-deadliest-maternity-wards",
    title: "The Lethal Gap: Why Conflict Zones Are Now the World's Deadliest Maternity Wards",
    summary:
      "A 15-year-old girl in a conflict zone faces a 1 in 51 lifetime risk of dying during pregnancy. This is the geography of failure.",
    thumbnailImage: "/images/global-news/2026/2026-02-23-the-lethal-gap-why-conflict-zones-are-now-the-world-s-deadliest-maternity-wards.jpg",
    date: "2026-02-23",
    author: "Nivaran Foundation Global Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "vision-in-crisis-ocular-health-emergency-among-displaced-populations-in-nigeria",
    title: "Vision in Crisis: Ocular Health Emergency Among Displaced Populations in Nigeria",
    summary:
      "Over 60% of internally displaced persons (IDPs) in Nigeria's Benue State suffer from preventable or treatable eye conditions like cataracts and refractive errors, yet only a fraction can access care. A recent study highlights extreme poverty, lack of clinics, and low awareness as primary barriers, pushing vulnerable communities further into preventable blindness and dependency.",
    thumbnailImage: "", // Will be fetched/updated
    date: "2026-02-23",
    author: "Nivaran Global Desk",
    featured: true,
    type: "Article",
  },
  {
    slug: "greenland-rejects-us-hospital-ship-offer-defending-arctic-health-sovereignty-against-political-critique",
    title: "Greenland Rejects US Hospital Ship Offer, Defending Arctic Health Sovereignty Against Political Critique",
    summary:
      "Greenland’s government has firmly declined a US offer to send a hospital ship to the Arctic territory, following comments from President Donald Trump mocking the island's healthcare infrastructure. Officials in Nuuk defended their public health system, framing the rejection as a matter of national pride and autonomy.",
    thumbnailImage: "/images/global-news/2026/2026-02-23-greenland-rejects-us-hospital-ship-offer-defending-arctic-health-sovereignty-aga.jpg",
    date: "2026-02-23",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-public-health-and-education-accountability-update",
    title: "Global Health and Education Watch: Public health and education accountability update",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-global-health-and-education-watch-public-health-and-education-accountability-upd.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-empty-desk-dilemma-rethinking-state-intervention-in-chronic-absenteeism",
    title: "The Empty Desk Dilemma: Rethinking State Intervention in Chronic Absenteeism",
    summary:
      "Mandatory reporting laws often force teachers to involve child protective services when students miss school, sparking a global debate on the criminalization of poverty. New policy proposals suggest decoupling attendance issues from child welfare to focus on root causes like health and housing.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-the-empty-desk-dilemma-rethinking-state-intervention-in-chronic-absenteeism.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "england-unveils-ambitious-strategy-to-halve-educational-attainment-gap-through-funding-reform",
    title: "England Unveils Ambitious Strategy to Halve Educational Attainment Gap Through Funding Reform",
    summary:
      "Ministers in England are set to launch a comprehensive strategy aimed at halving the academic achievement gap between wealthy and poor students. The plan focuses on revising school funding allocations to better support the most vulnerable demographics.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-england-unveils-ambitious-strategy-to-halve-educational-attainment-gap-through-f.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "who-unveils-global-framework-to-transform-school-food-environments-for-future-generations",
    title: "WHO Unveils Global Framework to Transform School Food Environments for Future Generations",
    summary:
      "The World Health Organization has unveiled a new set of global guidelines designed to overhaul food environments within educational institutions. By prioritizing evidence-based nutritional policies, the initiative aims to foster lifelong healthy eating habits and curb the rise of noncommunicable diseases among children.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-who-unveils-global-framework-to-transform-school-food-environments-for-future-ge.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-coverage-expands-yet-billions-remain-vulnerable-to-financial-ruin-report-finds",
    title: "Global Health Coverage Expands, Yet Billions Remain Vulnerable to Financial Ruin, Report Finds",
    summary:
      "A new joint report reveals that while global health service coverage has improved significantly since 2000, progress has slowed, leaving billions without essential care. Financial hardship remains a critical barrier, pushing 1.6 billion people deeper into poverty due to out-of-pocket medical expenses.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-global-health-coverage-expands-yet-billions-remain-vulnerable-to-financial-ruin-report-finds-v2.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "1-000-days-of-war-sudan-endures-the-world-s-worst-humanitarian-catastrophe",
    title: "1,000 Days of War: Sudan Endures the World’s Worst Humanitarian Catastrophe",
    summary:
      "Sudan’s conflict has reached its 1,000th day, leaving over 33 million people in desperate need of aid. With the health system shattered and disease rampant, the crisis stands as the largest displacement emergency globally.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-1-000-days-of-war-sudan-endures-the-world-s-worst-humanitarian-catastrophe-v3.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  // Nepal News entries and other older Global News entries remain as they are not explicitly part of the cleanup for "Global" duplicates.
];

export const usaBlogs: blogListType[] = [
  {
    slug: "food-insecurity-america",
    title: "Tackling Food Insecurity in the USA",
    summary:
      "Exploring the causes, impacts, and community-driven solutions to end hunger and foster resilience across the United States.",
    thumbnailImage: "/blogs/thumbnail/foodInsecurityThumbnail.png",
    date: "2025-01-16",
    type: "Story",
    author: "Nivaran Foundation",
  },
  {
    slug: "california-wildfire",
    title: "2025 California Wildfires: A Growing Crisis",
    summary:
      "Unprecedented winds, soaring temperatures, and climate change fuel a disaster reshaping lives in Southern California.",
    thumbnailImage: "/blogs/thumbnail/wildfireThumbnail.jpg",
    date: "2025-01-15",
    author: "Nivaran Foundation",
    type: "Story",
  },
];
