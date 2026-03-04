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
    slug: "global-youth-crisis-tackling-the-neet-challenge",
    title: "Global Youth Crisis: Tackling the NEET Challenge",
    summary:
      "The global phenomenon of young people not in education, employment, or training (NEET) represents a critical challenge for sustainable development. Addressing this issue requires comprehensive, collaborative strategies to foster youth integration and economic stability worldwide.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-youth-crisis-tackling-the-neet-challenge.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-maternity-services-need-investment-in-people-and-training-not",
    title: "Global Health and Education Watch: Maternity services need investment in people and training, not",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-maternity-services-need-investment-in-people-a.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "parkinson-s-disease-a-global-surge-explained-by-epidemiological-principles",
    title: "Parkinson's Disease: A Global Surge Explained by Epidemiological Principles",
    summary:
      "Parkinson's disease is experiencing a significant global rise, driven by complex epidemiological factors. A 'bathtub analogy' helps elucidate how incidence, mortality, and diagnostic advancements contribute to this increasing worldwide prevalence.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-parkinson-s-disease-a-global-surge-explained-by-epidemiological-principles.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "nepal-intensifies-fight-against-lymphatic-filariasis-aims-for-2030-elimination",
    title: "Nepal Intensifies Fight Against Lymphatic Filariasis, Aims for 2030 Elimination",
    summary:
      "Nepal is accelerating its national program to eliminate lymphatic filariasis by the World Health Organization's 2030 target. This ambitious public health initiative focuses on mass drug administration and improved surveillance in affected districts.",
    thumbnailImage: "/images/nepal-news/2026/2026-03-04-nepal-intensifies-fight-against-lymphatic-filariasis-aims-for-2030-elimination.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Nepal Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "ai-s-global-classroom-new-york-s-pivotal-moment-in-educational-transformation",
    title: "AI's Global Classroom: New York's Pivotal Moment in Educational Transformation",
    summary:
      "New York City schools, notably absent from the nationwide trend of AI integration, are poised for a potential transformation. This shift could redefine learning experiences and administrative efficiency, aligning the city with global educational advancements.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-ai-s-global-classroom-new-york-s-pivotal-moment-in-educational-transformation.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-who-validates-brazil-for-eliminating-mother-to-child-transmission-of-hiv",
    title: "Global Health and Education Watch: WHO validates Brazil for eliminating mother-to-child transmission of HIV",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-who-validates-brazil-for-eliminating-mother-to.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "nepal-s-public-health-future-dr-dhimal-s-global-insights",
    title: "Nepal's Public Health Future: Dr. Dhimal's Global Insights",
    summary:
      "Dr. Meghnath Dhimal, a leading Nepali public health expert, is engaging with global institutions like Yale to address Nepal's pressing health concerns. His work focuses on climate change impacts, disease prevention, and strengthening healthcare systems across the nation.",
    thumbnailImage: "/images/nepal-news/2026/2026-03-04-nepal-s-public-health-future-dr-dhimal-s-global-insights.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Nepal Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-deadly-bombing-of-iran-primary-school-a-grave-violation",
    title: "Global Health and Education Watch: Deadly bombing of Iran primary school ‘a grave violation",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-deadly-bombing-of-iran-primary-school-a-grave-.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-schools-in-england-sidelining-dressing-up-for-world-book-day",
    title: "Global Health and Education Watch: Schools in England sidelining dressing-up for World Book Day",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-schools-in-england-sidelining-dressing-up-for-.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-pupils-told-to-remove-blazers-to-prevent-disorder",
    title: "Global Health and Education Watch: Pupils told to remove blazers to prevent disorder",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-pupils-told-to-remove-blazers-to-prevent-disor.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-as-measles-spreads-in-south-carolina-rfk-jr-s-allies",
    title: "Global Health and Education Watch: As measles spreads in South Carolina, RFK Jr’s allies",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-as-measles-spreads-in-south-carolina-rfk-jr-s-.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-we-were-just-praying-pakistani-students-recount-escape-from",
    title: "Global Health and Education Watch: ‘We were just praying’: Pakistani students recount escape from",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-we-were-just-praying-pakistani-students-recoun.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-advancing-a-new-generation-of-heat-health-warning-system-in",
    title: "Global Health and Education Watch: Advancing a new generation of heat-health warning system in",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-advancing-a-new-generation-of-heat-health-warn.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-supreme-court-sides-with-religious-parents-blocking-california-s-trans",
    title: "Global Health and Education Watch: Supreme Court Sides With Religious Parents, Blocking California’s Trans",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-supreme-court-sides-with-religious-parents-blo.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-attacks-on-ukraine-s-health-care-increased-by-20-in",
    title: "Global Health and Education Watch: Attacks on Ukraine’s health care increased by 20% in",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-attacks-on-ukraine-s-health-care-increased-by-.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-briton-diagnosed-with-rabies-after-psychiatrist-raised-fears-inquest",
    title: "Global Health and Education Watch: Briton diagnosed with rabies after psychiatrist raised fears, inquest",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-briton-diagnosed-with-rabies-after-psychiatris.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-how-do-student-loans-work-and-when-are-they",
    title: "Global Health and Education Watch: How do student loans work and when are they",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-how-do-student-loans-work-and-when-are-they.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-on-lead-britain-is-the-laggard-of-the-developed",
    title: "Global Health and Education Watch: On lead, Britain is the laggard of the developed",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-on-lead-britain-is-the-laggard-of-the-develope.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-uk-to-end-study-visas-for-myanmar-afghanistan-cameroon",
    title: "Global Health and Education Watch: UK to end study visas for Myanmar, Afghanistan, Cameroon",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-uk-to-end-study-visas-for-myanmar-afghanistan-.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-a-randomised-controlled-trial-of-a-lived-experience-and",
    title: "Global Health and Education Watch: A randomised controlled trial of a lived experience and",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-04-global-health-and-education-watch-a-randomised-controlled-trial-of-a-lived-exper.jpg",
    date: "2026-03-04",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "global-health-and-education-watch-iran-crisis-schoolgirls-killed-thousands-displaced-and-aid-compromised",
    title: "Global Health and Education Watch: Iran crisis: Schoolgirls killed, thousands displaced and aid compromised",
    summary:
      "A high-impact global update is reshaping how health and education systems prioritize access, staffing, and continuity. This analysis maps the operational consequences for vulnerable communities.",
    thumbnailImage: "/images/global-news/2026/2026-03-03-global-health-and-education-watch-iran-crisis-schoolgirls-killed-thousands-displ.jpg",
    date: "2026-03-03",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "south-carolina-battles-largest-measles-outbreak-in-decades-amid-plunging-vaccination-rates",
    title: "South Carolina Battles Largest Measles Outbreak in Decades Amid Plunging Vaccination Rates",
    summary:
      "A historic measles outbreak in South Carolina has exposed the severe consequences of declining immunization rates. With one local school reporting only 21 percent vaccine coverage, health officials are scrambling to contain the highly contagious virus.",
    thumbnailImage: "/images/global-news/2026/2026-03-03-south-carolina-battles-largest-measles-outbreak-in-decades-amid-plunging-vaccina.jpg",
    date: "2026-03-03",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {

    slug: "denmark-s-national-initiative-transforms-mental-health-stigma-through-the-power-of-personal-storytelling",
    title: "Denmark’s National Initiative Transforms Mental Health Stigma Through the Power of Personal Storytelling",
    summary:
      "Denmark’s 'One of Us' campaign is redefining how society views mental illness by facilitating direct dialogue between patients and the public. This nationwide effort utilizes personal narratives to dismantle stereotypes in critical sectors like law enforcement and healthcare.",
    thumbnailImage: "/images/global-news/2026/2026-03-03-denmark-s-national-initiative-transforms-mental-health-stigma-through-the-power-.png",
    date: "2026-03-03",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-digital-confidant-are-ai-counselors-the-future-of-student-mental-health",
    title: "The Digital Confidant: Are AI Counselors the Future of Student Mental Health?",
    summary:
      "Schools globally are adopting AI-driven chat platforms to monitor student mental health outside classroom hours. While proponents argue these tools save lives, privacy advocates question the long-term implications of algorithmic surveillance.",
    thumbnailImage: "/images/global-news/2026/2026-03-03-the-digital-confidant-are-ai-counselors-the-future-of-student-mental-health.png",
    date: "2026-03-03",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "nphl-and-who-nepal-decentralize-measles-rubella-testing-to-strengthen-provincial-health-security",
    title: "NPHL and WHO Nepal Decentralize Measles-Rubella Testing to Strengthen Provincial Health Security",
    summary:
      "The National Public Health Laboratory and WHO Nepal have launched a critical initiative to expand Measles-Rubella testing capabilities to provincial laboratories. This decentralization aims to drastically reduce diagnostic delays and bolster Nepal's federal health infrastructure.",
    thumbnailImage: "/images/nepal-news/2026/2026-02-25-nphl-and-who-nepal-decentralize-measles-rubella-testing-to-strengthen-provincial.jpg",
    date: "2026-02-25",
    author: "Nivaran Foundation Nepal Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "sudan-s-agony-one-thousand-days-of-war-yield-world-s-worst-humanitarian-catastrophe",
    title: "Sudan’s Agony: One Thousand Days of War Yield World’s Worst Humanitarian Catastrophe",
    summary:
      "The conflict in Sudan has reached a grim 1,000-day milestone, leaving the health system in ruins and millions displaced. With famine looming and disease outbreaks spreading, the World Health Organization warns of a total collapse without immediate intervention.",
    thumbnailImage: "/images/global-news/2026/2026-02-25-sudan-s-agony-one-thousand-days-of-war-yield-world-s-worst-humanitarian-catastro.jpg",
    date: "2026-02-25",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "compassion-in-the-metropolis-singapore-s-charities-bridging-the-distance-for-vulnerable-populations",
    title: "Compassion in the Metropolis: Singapore's Charities Bridging the Distance for Vulnerable Populations",
    summary:
      "Despite Singapore's economic prowess, significant vulnerabilities persist among its populations. This in-depth analysis, in the Nivaran/Founder tone, explores the vital role of five key charities—Willing Hearts, Food From the Heart, HealthServe, TWC2, and SPD—in bridging the socio-economic, cultural, and systemic 'distances' that create disparities in healthcare, education, and basic needs, offering a model for inclusive societal development.",
    thumbnailImage: "/blogs/thumbnail/healthcareTransformation.jpg",
    date: "2026-02-25",
    author: "Nivaran/Founder",
    featured: true,
    type: "Analysis",
  },
  {
    slug: "the-unseen-crisis-ocular-disorders-among-internally-displaced-persons-in-benue-state",
    title: "The Unseen Crisis: Ocular Disorders Among Internally Displaced Persons in Benue State",
    summary:
      "A new study reveals a staggering 62.5% prevalence of ocular disorders among internally displaced persons in Benue State, Nigeria, highlighting critical gaps in health access and the profound impact of displacement on vision and quality of life. This analysis, in the Nivaran/Founder tone, delves into the systemic failures and urgent humanitarian imperatives, underscoring how economic, educational, and geographical distances transform treatable conditions into debilitating impairments.",
    thumbnailImage: "/blogs/thumbnail/doctorUsingLaptop.jpeg",
    date: "2026-02-24",
    author: "Nivaran/Founder",
    featured: true,
    type: "Analysis",
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

export const usaBlogs: blogListType[] = [
];
