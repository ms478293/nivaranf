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
    slug: "1-000-days-of-war-sudan-endures-the-world-s-worst-humanitarian-catastrophe",
    title: "1,000 Days of War: Sudan Endures the World’s Worst Humanitarian Catastrophe",
    summary:
      "Sudan’s conflict has reached its 1,000th day, leaving over 33 million people in desperate need of aid. With the health system shattered and disease rampant, the crisis stands as the largest displacement emergency globally.",
    thumbnailImage: "/images/global-news/2026/2026-02-22-1-000-days-of-war-sudan-endures-the-world-s-worst-humanitarian-catastrophe-v2.jpg",
    date: "2026-02-22",
    author: "Nivaran Foundation Global Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "justice-is-a-hospital-bed",
    title: "Justice Is a Hospital Bed",
    summary:
      "Justice is an abstract concept taught in law schools and invoked in courtrooms. But for the Nivaran Foundation, justice is something very concrete.",
    thumbnailImage: "/images/archive/2026/2026-02-20-justice-is-a-hospital-bed.png",
    date: "2026-02-20",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "democracy-is-pulse",
    title: "Democracy Is Pulse: Health Equity as Constitutional Promise",
    summary:
      "Democracy is often described as a political system—elections, representation, voting rights, checks and balances on power. These are real dimensions of democracy.",
    thumbnailImage: "/images/archive/2026/2026-02-19-democracy-is-pulse.jpg",
    date: "2026-02-19",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "eyes-on-the-horizon",
    title: "Eyes on the Horizon: Building Preparedness Before Crisis",
    summary:
      "Preparedness is not something that happens in moments of crisis. Preparedness is built in the years before crisis arrives.",
    thumbnailImage: "/images/archive/2026/2026-02-18-eyes-on-the-horizon.jpg",
    date: "2026-02-18",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "its-not-a-rumor-anymore",
    title: "It's Not a Rumor Anymore: Nipah, Borders, and Outbreak Response",
    summary:
      "Rumor is a strange phenomenon in the age of official communication systems. Rumor emerges when information is absent or incomplete.",
    thumbnailImage: "/images/archive/2026/2026-02-17-its-not-a-rumor-anymore.jpg",
    date: "2026-02-17",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-crowd-is-a-risk",
    title: "The Crowd Is a Risk: Public Gatherings and Infectious Disease",
    summary:
      "Crowds are complicated. They represent community, celebration, and gathering.",
    thumbnailImage: "/images/archive/2026/2026-02-16-the-crowd-is-a-risk.jpg",
    date: "2026-02-16",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "too-small-to-fight-alone",
    title: "Too Small to Fight Alone: Childhood Cancer in Remote Nepal",
    summary:
      "A child's body is not a miniature adult body. It is a fundamentally different biological system operating according to different rules.",
    thumbnailImage: "/images/archive/2026/2026-02-15-too-small-to-fight-alone.jpg",
    date: "2026-02-15",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "love-is-protecting-her",
    title: "Love Is Protecting Her: Reproductive Health and Real Care",
    summary:
      "Valentine's Day arrives each year on the same calendar date in Nepal as everywhere else.",
    thumbnailImage: "/images/archive/2026/2026-02-14-love-is-protecting-her.jpg",
    date: "2026-02-14",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-voice-in-the-box",
    title: "The Voice in the Box: Radio as Lifeline",
    summary:
      "In villages where the electrical grid is aspiration rather than reality, where internet connectivity means a smartphone that works two days a month if the weather cooperates, radio remains a...",
    thumbnailImage: "/images/archive/2026/2026-02-13-the-voice-in-the-box.jpg",
    date: "2026-02-13",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "running-for-peace-walking-for-health",
    title: "Running for Peace, Walking for Health",
    summary:
      "Every year, in cities around the world, marathons celebrate human endurance. The crowds gather.",
    thumbnailImage: "/images/archive/2026/2026-02-12-running-for-peace-walking-for-health.jpg",
    date: "2026-02-12",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "lab-coats-in-the-field",
    title: "Lab Coats in the Field: Science Under Pressure",
    summary:
      "The morning arrives in Jumla District like a whisper through the mountains.",
    thumbnailImage: "/images/archive/2026/2026-02-11-lab-coats-in-the-field.jpg",
    date: "2026-02-11",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-ten-cent-miracle",
    title: "The Ten-Cent Miracle: Oral Rehydration and the Limits of Simplicity",
    summary:
      "The formula is simple. Six teaspoons of sugar, half a teaspoon of salt, one liter of clean water.",
    thumbnailImage: "/images/archive/2026/2026-02-10-the-ten-cent-miracle.jpg",
    date: "2026-02-10",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "short-for-their-age-short-on-hope",
    title: "Short for Their Age, Short on Hope: Childhood Stunting",
    summary:
      "In a rural district health clinic, a health worker measures a four-year-old child's height against the standard chart on the wall.",
    thumbnailImage: "/images/archive/2026/2026-02-09-short-for-their-age-short-on-hope.jpg",
    date: "2026-02-09",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-grass-is-hiding-a-killer",
    title: "The Grass Is Hiding a Killer: Snake Bite and the Rural Health Gap",
    summary:
      "The paddy fields in June are beautiful. The rice is young and bright green, standing in water that reflects the sky.",
    thumbnailImage: "/images/archive/2026/2026-02-08-the-grass-is-hiding-a-killer.jpg",
    date: "2026-02-08",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "a-pad-keeps-a-girl-in-school",
    title: "A Pad Keeps a Girl in School",
    summary:
      "She is thirteen years old and she has been managing her period for eight months without reliable access to sanitary pads.",
    thumbnailImage: "/images/archive/2026/2026-02-07-a-pad-keeps-a-girl-in-school.jpg",
    date: "2026-02-07",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-shed-is-a-violence",
    title: "The Shed Is a Violence: Chhaupadi and Women's Health",
    summary:
      "There is a small structure at the edge of the property. It is made of stone and mud.",
    thumbnailImage: "/images/archive/2026/2026-02-06-the-shed-is-a-violence.jpg",
    date: "2026-02-06",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-strength-of-her-fast",
    title: "The Strength of Her Fast: Women, Nutrition, and Religious Practice",
    summary:
      "She fasts twice a week, every week, throughout the year.",
    thumbnailImage: "/images/archive/2026/2026-02-05-the-strength-of-her-fast.jpg",
    date: "2026-02-05",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "i-cant-afford-to-live",
    title: "I Cannot Afford to Live: The Cost Burden of Chronic Illness",
    summary:
      "A man in a Terai district receives a diagnosis that will define the rest of his economic life as much as his physical life. He has diabetes and hypertension.",
    thumbnailImage: "/images/archive/2026/2026-02-04-i-cant-afford-to-live.jpg",
    date: "2026-02-04",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-longest-journey",
    title: "The Longest Journey: Emergency Transport and the Geography of Survival",
    summary:
      "In a mountain district of Nepal, an ambulance sits parked outside the district hospital.",
    thumbnailImage: "/images/archive/2026/2026-02-03-the-longest-journey.jpg",
    date: "2026-02-03",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-swamp-is-alive",
    title: "The Swamp Is Alive: Malaria at the Margins",
    summary:
      "In the lowland districts of Nepal's Terai, where the air is thick with humidity in summer and mist hangs over the paddy fields at dawn, the water that sustains agriculture also sustains...",
    thumbnailImage: "/images/archive/2026/2026-02-02-the-swamp-is-alive.jpg",
    date: "2026-02-02",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-two-nepals-super-specialty-vs-basic-survival",
    title: "The Two Nepals: Super-Specialty vs. Basic Survival",
    summary:
      "There are two Nepals. They share a flag, a constitution, a currency, and a name.",
    thumbnailImage: "/images/archive/2026/2026-02-01-the-two-nepals-super-specialty-vs-basic-survival.jpg",
    date: "2026-02-01",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "where-the-road-ends-we-begin",
    title: "Where the Road Ends, We Begin",
    summary:
      "The road ends several miles before the village. Or rather, the road exists, but only as a footpath during rainy season, as a barely passable track during dry season.",
    thumbnailImage: "/images/archive/2026/2026-01-31-where-the-road-ends-we-begin.jpg",
    date: "2026-01-31",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-ultimate-right",
    title: "The Ultimate Right",
    summary:
      "Constitutions around the world enshrine the right to life as fundamental. It appears in international treaties and declarations.",
    thumbnailImage: "/images/archive/2026/2026-01-30-the-ultimate-right.jpg",
    date: "2026-01-30",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-bite-that-kills",
    title: "The Bite That Kills",
    summary:
      "A child is brought to a rural clinic in Nepal after a dog bite. The bite itself is not extensive or obviously severe.",
    thumbnailImage: "/images/archive/2026/2026-01-29-the-bite-that-kills.jpg",
    date: "2026-01-29",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "your-secret-is-safe-with-us",
    title: "Your Secret Is Safe With Us",
    summary:
      "A woman sits in a clinic waiting room and tries to decide whether to speak the truth. She knows she should see a healthcare provider.",
    thumbnailImage: "/images/archive/2026/2026-01-28-your-secret-is-safe-with-us.jpg",
    date: "2026-01-28",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "screening-the-sky-ignoring-the-ground",
    title: "Screening the Sky, Ignoring the Ground",
    summary:
      "At the international airport, travelers pass through sophisticated screening procedures. Temperature checks, health declarations, observation for symptoms.",
    thumbnailImage: "/images/archive/2026/2026-01-27-screening-the-sky-ignoring-the-ground.jpg",
    date: "2026-01-27",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "two-nations-one-biology",
    title: "Two Nations, One Biology",
    summary:
      "On a winter day when the border between Nepal and India is crowded with travelers moving between nations for the festival season, a person carries a respiratory infection across a line drawn...",
    thumbnailImage: "/images/archive/2026/2026-01-26-two-nations-one-biology.jpg",
    date: "2026-01-26",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "disease-of-isolation",
    title: "The Disease of Isolation",
    summary:
      "A man in a rural village feels a small discoloration on his skin. It is not painful.",
    thumbnailImage: "/images/archive/2026/2026-01-25-disease-of-isolation.jpg",
    date: "2026-01-25",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "girl-with-book-village-doctor",
    title: "The Girl With the Book Is a Doctor for Her Village",
    summary:
      "In a household in rural Nepal, a young girl sits by the window with a book. The light is not strong, and reading is difficult, but she persists.",
    thumbnailImage: "/images/archive/2026/2026-01-24-girl-with-book-village-doctor.jpg",
    date: "2026-01-24",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "waiting-to-live",
    title: "Waiting to Live: Dialysis, Distance, and the Arithmetic of Survival",
    summary:
      "The waiting room at the public dialysis center in rural Nepal fills before dawn.",
    thumbnailImage: "/images/archive/2026/2026-01-23-waiting-to-live.jpg",
    date: "2026-01-23",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "health-is-heritage",
    title: "Health Is Heritage: Protecting Elders Through Winter",
    summary:
      "In the high valleys of Nepal where the Tamang communities gather to celebrate Sonam Lhosar, the new year arrives with ancient customs, prayer flags, and the promise of renewal.",
    thumbnailImage: "/images/archive/2026/2026-01-22-health-is-heritage.jpg",
    date: "2026-01-22",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "whispers-across-the-border",
    title: "Whispers Across the Border",
    summary:
      "In a remote health facility near the Nepal-India border, a health worker named Kanhaiya received a rumor on January 21, 2026: a family in a nearby Indian village had fallen ill with what...",
    thumbnailImage: "/images/archive/2026/2026-01-21-whispers-across-the-border.jpg",
    date: "2026-01-21",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "water-is-the-first-medicine",
    title: "Water Is the First Medicine",
    summary:
      "In a clinic in a densely populated neighborhood of Kathmandu, a health worker named Maya attempted to explain to a mother why boiling water before using it to clean her child's infected...",
    thumbnailImage: "/images/archive/2026/2026-01-20-water-is-the-first-medicine.jpg",
    date: "2026-01-20",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "breathing-poison-in-the-valley",
    title: "Breathing Poison in the Valley",
    summary:
      "On a November morning when Kathmandu Valley's air quality index registered 312—considered hazardous—every child in a pediatric clinic showed some respiratory symptom. Several were wheezing.",
    thumbnailImage: "/images/archive/2026/2026-01-19-breathing-poison-in-the-valley.jpg",
    date: "2026-01-19",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "do-no-harm-receive-no-harm",
    title: "Do No Harm, Receive No Harm",
    summary:
      "In a health post in Dadeldhura district, a health worker named Raj had stopped coming to work on Tuesday evenings.",
    thumbnailImage: "/images/archive/2026/2026-01-18-do-no-harm-receive-no-harm.jpg",
    date: "2026-01-18",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "why-she-still-chooses-home",
    title: "Why She Still Chooses Home",
    summary:
      "In a hamlet in rural Nuwakot district, Kamala sat on the floor of her one-room home, seven months pregnant, and explained why she planned to deliver her baby there rather than at the nearby...",
    thumbnailImage: "/images/archive/2026/2026-01-17-why-she-still-chooses-home.jpg",
    date: "2026-01-17",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "blindness-in-a-capsule",
    title: "Blindness in a Capsule",
    summary:
      "In a health post in Jumla, one of Nepal's most remote districts, a medical aid named Khem held a small bottle containing yellow capsules that had the power to prevent permanent blindness in...",
    thumbnailImage: "/images/archive/2026/2026-01-16-blindness-in-a-capsule.jpg",
    date: "2026-01-16",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "trauma-doesnt-end-when-camera-stops",
    title: "Trauma Does Not End When the Camera Stops",
    summary:
      "Mahesh Paudel cannot drive on the ridge road above Pokhara anymore. He tried, a year after his sister died in the aviation accident that killed 68 people near the city in January 2023.",
    thumbnailImage: "/images/archive/2026/2026-01-15-trauma-doesnt-end-when-camera-stops.jpg",
    date: "2026-01-15",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "wisdom-in-the-bowl",
    title: "The Wisdom in the Bowl",
    summary:
      "In the kitchen of a home in Ilam, a grandmother named Jhimuli stood before her outdoor stove, preparing the meal for Maghe Sankranti—the winter festival that has marked the transition to the...",
    thumbnailImage: "/images/archive/2026/2026-01-14-wisdom-in-the-bowl.jpg",
    date: "2026-01-14",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "law-of-land-survival",
    title: "The Law of Land, The Law of Survival",
    summary:
      "The health post in Bajhang district sits in a concrete building that became partially uninhabitable on the day the roof leaked. That was three years ago.",
    thumbnailImage: "/images/archive/2026/2026-01-13-law-of-land-survival.jpg",
    date: "2026-01-13",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "four-percent-price-future",
    title: "Four Percent: The Price of Deferred Futures",
    summary:
      "In the hills outside Kathmandu, in a small government school serving three villages, a teacher named Shreya keeps a notebook filled with urgent arithmetic that never balances.",
    thumbnailImage: "/images/archive/2026/2026-01-12-four-percent-price-future.jpg",
    date: "2026-01-12",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "true-unity-connectedness",
    title: "True Unity Is Connectedness: Health Access as National Principle",
    summary:
      "A young woman in a rural district of Nepal became pregnant. She had three previous deliveries in her home, attended by traditional birth attendants.",
    thumbnailImage: "/images/archive/2026/2026-01-11-true-unity-connectedness.jpg",
    date: "2026-01-11",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "two-children-one-bed",
    title: "Two Children, One Bed: The Inequity of Pediatric Crisis",
    summary:
      "In a ward at Kathmandu Children's Hospital, two beds were pushed together to create space for three children—a four-year-old with severe pneumonia, a six-year-old recovering from...",
    thumbnailImage: "/images/archive/2026/2026-01-10-two-children-one-bed.jpg",
    date: "2026-01-10",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "departure-gate-health-drain",
    title: "The Departure Gate: When Migration Becomes a Health Emergency",
    summary:
      "The buses line up at dawn outside the central transit station in Kathmandu. They are filled with men, mostly in their twenties and thirties, carrying small bags of belongings.",
    thumbnailImage: "/images/archive/2026/2026-01-09-departure-gate-health-drain.jpg",
    date: "2026-01-09",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "when-ambulances-cant-move",
    title: "When Ambulances Cannot Move: Health Access During Civic Disruption",
    summary:
      "The curfew order came at 3 p.m. on January 8, 2026.",
    thumbnailImage: "/images/archive/2026/2026-01-08-when-ambulances-cant-move.jpg",
    date: "2026-01-08",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "earth-shook-again-today",
    title: "The Earth Shook Again Today: Preparedness as Trust Made Visible",
    summary:
      "The earthquake registered 5.5 on the Richter scale. It lasted eighteen seconds.",
    thumbnailImage: "/images/archive/2026/2026-01-07-earth-shook-again-today.jpg",
    date: "2026-01-07",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "blindness-defeated-village-victory",
    title: "Blindness Defeated: How Simple Systems Prevented an Epidemic",
    summary:
      "In a village in western Nepal, an elderly woman sits in her home, her eyes adjusted to the particular quality of light that comes through her windows. She is sixty-seven years old.",
    thumbnailImage: "/images/archive/2026/2026-01-06-blindness-defeated-village-victory.png",
    date: "2026-01-06",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "closed-doors-empty-stomachs",
    title: "Closed Doors, Empty Stomachs: The Hidden Cost of School Closures",
    summary:
      "In rural Nepal, schools do not just educate children. They feed them.",
    thumbnailImage: "/images/archive/2026/2026-01-05-closed-doors-empty-stomachs.jpg",
    date: "2026-01-05",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "second-winter-jajarkot",
    title: "The Second Winter: When Earthquakes Do Not End with Tremors",
    summary:
      "The earthquake hit in Jajarkot district on November 3, 2023. It killed more than 150 people.",
    thumbnailImage: "/images/archive/2026/2026-01-04-second-winter-jajarkot.jpg",
    date: "2026-01-04",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-grey-blanket-why-fog-is-a-medical-emergency",
    title: "The Grey Blanket: When Fog Becomes a Medical Emergency",
    summary:
      "It descends without warning. One afternoon, visibility extends for miles across Nepal's Terai region—the flat plains that stretch from the foothills toward India, open and navigable.",
    thumbnailImage: "/images/archive/2026/2026-01-03-the-grey-blanket-why-fog-is-a-medical-emergency.jpg",
    date: "2026-01-03",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "when-the-road-ends-aviation-safety-and-rural-health",
    title: "When the Road Ends, Care Can End Too: Aviation Safety and the Fragile Thread of Rural Health",
    summary:
      "The runway at Bhadrapur Airport is short—just long enough for regional turboprops, just narrow enough to make each landing a precise calculation.",
    thumbnailImage: "/images/archive/2026/2026-01-02-when-the-road-ends-aviation-safety-and-rural-health.jpg",
    date: "2026-01-02",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "rural-healthcare-crisis-nepal-by-the-numbers",
    title: "Rural Healthcare Crisis: Nepal by the Numbers",
    summary:
      "A data-driven look at the healthcare disparities between Nepal's urban centers and rural communities, and how Project Sanjeevani is closing the gap across 52 districts.",
    thumbnailImage: "/images/generalHealthService.jpg",
    date: "2025-02-10",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "Article",
  },
  {
    slug: "inside-a-nivaran-health-camp",
    title: "6 AM to Sundown: Inside a Nivaran Foundation Health Camp in Rural Nepal",
    summary:
      "From setting up tents before dawn to the last patient at dusk, here is what a day of healthcare delivery looks like in a village that has never seen a doctor.",
    thumbnailImage: "/images/doctorWorking.JPG",
    date: "2025-02-08",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "Story",
  },
  {
    slug: "preventable-blindness-nepal-eye-care",
    title: "Preventable Blindness in Nepal: The Eye Care Crisis Nobody Talks About",
    summary:
      "Over 600,000 Nepalis are blind, and 80% of those cases are preventable or treatable. Here is why rural communities are losing their sight and what Nivaran is doing about it.",
    thumbnailImage: "/images/maternalHealth.jpg",
    date: "2025-02-05",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Article",
  },
  {
    slug: "why-rural-schools-are-failing-nepal",
    title: "Why Rural Schools Are Failing Nepal's Children — And How to Fix It",
    summary:
      "With a 25-point gap in learning outcomes between urban and rural students, Nepal's education system is leaving millions behind. Project Vidya aims to change that.",
    thumbnailImage: "/blogs/thumbnail/nepaleseChildren.jpg",
    date: "2025-02-03",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Article",
  },
  {
    slug: "the-cost-of-doing-nothing",
    title: "The Cost of Doing Nothing: Why Preventive Healthcare Saves Nepal Millions",
    summary:
      "Every dollar spent on preventive care in rural Nepal saves seven in emergency treatment. The economic case for health camps is overwhelming.",
    thumbnailImage: "/blogs/images/ngozumpaGlacier.jpg",
    date: "2025-01-31",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Analysis",
  },
  {
    slug: "womens-health-nepal-mountains",
    title: "Behind the Mountains: The Women's Health Crisis Nepal Cannot Ignore",
    summary:
      "From chhaupadi to maternal mortality, women in rural Nepal face health barriers that the rest of the world has largely solved. Here is why change is so difficult and so necessary.",
    thumbnailImage: "/blogs/thumbnail/healthcareReform.jpg",
    date: "2025-01-28",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "Story",
  },
  {
    slug: "building-healthcare-from-zero",
    title: "Building Healthcare from Zero: Nivaran's 4-Phase Blueprint for Nepal",
    summary:
      "From mobile health camps to a 700-bed central hospital, here is the decade-long infrastructure plan to bring permanent healthcare to every district in Nepal.",
    thumbnailImage: "/blogs/thumbnail/healthcareTransformation.jpg",
    date: "2025-01-26",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Project",
  },
  {
    slug: "digital-classrooms-without-electricity",
    title: "Digital Classrooms Without Electricity: How Nivaran Is Rethinking Rural Education",
    summary:
      "When 40% of rural schools have no electricity, bringing digital learning requires creative solutions. Solar-powered learning centers are changing what is possible.",
    thumbnailImage: "/blogs/thumbnail/childrenInGroup.jpg",
    date: "2025-01-23",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Project",
  },
  {
    slug: "dental-health-crisis-rural-nepal",
    title: "The Dental Health Emergency in Rural Nepal: 85% Without Care",
    summary:
      "In districts where no dentist has ever practiced, 85% of the population has untreated dental disease. Health camps are providing first-ever dental care to thousands.",
    thumbnailImage: "/blogs/thumbnail/ruralSetting.jpg",
    date: "2025-01-20",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Article",
  },
  {
    slug: "from-boston-to-kathmandu",
    title: "From Boston to Kathmandu: How a Nonprofit Operates Across 7,500 Miles",
    summary:
      "Running healthcare and education programs in Nepal from a Boston headquarters requires systems, trust, and relentless coordination. Here is how Nivaran makes it work.",
    thumbnailImage: "/blogs/images/group-pressc.jpg",
    date: "2025-01-18",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "Story",
  },
  {
    slug: "the-heart-of-giving",
    title: "The Heart of Giving: Volunteer Activities That Make a Difference",
    summary:
      "How Your Time and Talent Can Transform the World and Make It a Better Place: Discover the Lasting Impact of Volunteering and Why Every Contribution Counts.",
    thumbnailImage: "/blogs/images/theHeartOfGiving.jpg",
    date: "2025-02-03",
    featured: false,
    author: "Nivaran Foundation News Desk",
    type: "Opinion",
  },
  {
    slug: "press-release",
    title: "Press Release of Nivaran Foundation",
    summary:
      "Nivaran Foundation adopts a strategic, phased approach to its projects, ensuring long-term impact through innovation, scalability, and sustainability.",
    thumbnailImage: "/blogs/images/group-pressc.jpg",
    date: "2025-03-21",
    featured: false,
    author: "Nivaran Foundation News Desk",
    type: "News",
  },
  {
    slug: "climate-change-and-health-in-nepal",
    title:
      "Climate Change and Health in Nepal: A Battle for Survival in the Shadow of Melting Glaciers",
    summary:
      "This article examines the growing health crisis in Nepal caused by climate change, focusing on the impacts of melting glaciers, water scarcity, and the spread of diseases. It highlights the struggles of both rural and urban communities, while showcasing innovative solutions like solar-powered cold storage and hybrid farming. By blending tradition with modern technology, the piece underscores the urgent need for local adaptation strategies and global climate action to protect public health in Nepal.",
    thumbnailImage: "/blogs/images/ngozumpaGlacier.jpg",
    date: "2025-01-27",
    featured: false,
    author: "Nivaran Foundation News Desk",
    type: "Story",
  },
  {
    slug: "reimagining-nepals-healthcare",
    title:
      "Reimagining Nepal's Healthcare: A Critical Crossroads Between Crisis and Innovation",
    summary:
      "Nepal's healthcare system stands at a tipping point, facing mounting challenges from aging demographics to economic strain. Discover how innovative strategies like telemedicine, community-based care, and workforce transformation are redefining the path forward for millions.",
    thumbnailImage: "/blogs/thumbnail/healthcareReform.jpg",
    date: "2025-01-21",
    featured: true,
    author: "Nivaran Foundation News Desk",
    type: "News",
  },
  {
    slug: "beyond-the-clinic-walls",
    title:
      "Beyond the Clinic Walls: The Hidden Challenges of Rural Healthcare in Nepal",
    summary:
      "In the remote corners of Nepal, where rugged landscapes and cultural traditions challenge modern medicine, healthcare workers navigate grueling journeys, resource shortages, and cultural barriers. Explore the innovative strategies and community-driven solutions emerging to transform rural healthcare delivery.",
    thumbnailImage: "/blogs/thumbnail/ruralSetting.jpg",
    date: "2025-01-19",
    featured: true,
    author: "Nivaran Foundation News Desk",
    type: "Story",
  },
  {
    slug: "bridging-the-digital-divide",
    title:
      "Bridging the Digital Divide: Empowering Education for Underserved Children",
    summary:
      "Millions of underserved children worldwide face barriers to education due to the digital divide. Discover how innovations like solar-powered tools, mobile learning apps, and global connectivity initiatives are transforming access to education and empowering a brighter future for all.",
    thumbnailImage: "/blogs/thumbnail/nepaleseChildren.jpg",
    date: "2025-01-18",
    featured: false,
    author: "Nivaran Foundation",
    type: "Story",
  },
  {
    slug: "protecting-children-during-global-crisis",
    title:
      "Children at the Frontlines: Safeguarding Young Lives Amid Global Crises",
    summary:
      "With over 473 million children now living in conflict zones, the need to protect vulnerable young lives is more urgent than ever. Discover how humanitarian aid, education initiatives, and policy advocacy are crucial to safeguarding their futures and fostering hope amid crisis.",
    thumbnailImage: "/blogs/thumbnail/kidInWarzone.jpeg",
    date: "2025-01-17",
    featured: false,
    author: "Nivaran Foundation",
    type: "Story",
  },
  {
    slug: "nepals-healthcare-transformation",
    title:
      "Nepal's Healthcare Transformation: A Decade of Progress, Persistence, and Promise",
    summary:
      "Nepal has made remarkable strides in healthcare over the past 25 years, improving maternal and infant health, expanding access, and decentralizing services. Discover how the nation is overcoming barriers to create a more equitable, accessible, and sustainable healthcare system for all.",
    thumbnailImage: "/blogs/thumbnail/healthcareTransformation.jpg",
    date: "2025-01-16",
    featured: true,
    author: "Nivaran Foundation News Desk",
    type: "News",
  },
  {
    slug: "mental-health-awareness",
    title: "Shattering Mental Health Stigmas: Why Open Conversations Matter",
    summary:
      "Mental health affects millions, yet stigma prevents many from seeking help. Learn how education, awareness, and data collection can break down barriers, foster understanding, and promote a society where mental health is prioritized and treated with empathy.",
    thumbnailImage: "/blogs/thumbnail/mentalCrisis.jpg",
    date: "2025-01-16",
    featured: true,
    author: "Nivaran Foundation",
    type: "Article",
  },
  {
    slug: "the-digital-health-revolution-in-nepal",
    title:
      "The Digital Health Revolution in Nepal: Navigating Challenges and Opportunities in Healthcare Transformation",
    summary:
      "Nepal is embracing digital health to bridge healthcare gaps, facing both challenges and opportunities. Explore how telemedicine, mobile health solutions, and infrastructure improvements are shaping the future of healthcare access, especially in remote areas.",
    thumbnailImage: "/blogs/thumbnail/doctorUsingLaptop.jpeg",
    date: "2025-01-06",
    featured: true,
    author: "Nivaran Foundation News Desk",
    type: "Story",
  },
  {
    slug: "growing-old-in-nepal",
    title: "Growing Old in Nepal: A Healthcare Crisis Unfolds",
    summary:
      "Nepal’s elderly population faces a growing healthcare crisis, with challenges in access, family support, and insurance coverage. Learn about the urgent need for systemic reforms to ensure better healthcare for seniors in urban and rural areas alike.",
    thumbnailImage: "/blogs/thumbnail/oldWomen.jpg",
    date: "2025-01-05",
    featured: true,
    author: "Nivaran Foundation News Desk",
    type: "Story",
  },
  {
    slug: "the-next-giant-leap-nepals-child-grant-expansion",
    title:
      "The Next Giant Leap: How Nepal's Child Grant Expansion Could Transform a Generation",
    summary:
      "Nepal's Child Grant expansion offers a transformative opportunity to improve child welfare and boost economic growth. Discover how increasing support for children could reduce poverty, improve health outcomes, and provide a blueprint for social protection in developing nations.",
    thumbnailImage: "/blogs/thumbnail/childrenInGroup.jpg",
    date: "2025-01-02",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-silent-struggles-childhood-asthma-and-air-pollution",
    title: "The Silent Struggle: Childhood Asthma and Air Pollution",
    summary:
      "Climate Change and Environmental Injustice Impact Children's Health: In today's World The interaction between the Climate Change and Environmental Injustice has become an increasibly urgetn global issues. The effects of these environments pollutants are affecting the health and well-being of children, particularly those in marginalized communities.",
    thumbnailImage: "/blogs/images/childrenAndAirPollution.png",
    date: "2024-12-14",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "Article",
  },
  {
  slug: "genz-revolution-nepals-youth-led-uprising-against-corruption-and-censorship",
  title: "GenZ Revolution: Nepal’s Youth-Led Uprising Against Corruption and Censorship",
summary: "From courage to sacrifice, Nepal’s youth rise against injustice. Join the GenZ Revolution and raise your voice for freedom.",
thumbnailImage: "/articles/images/genz-image.webp",
 date: "2025-8-20",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "Article",
  }
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
