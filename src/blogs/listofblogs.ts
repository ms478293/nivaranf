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
    slug: "justice-is-a-hospital-bed",
    title: "Justice Is a Hospital Bed",
    summary:
      "The meaning of social justice becomes clear at the bedside. Equity is proven only when care reaches the people furthest from power.",
    thumbnailImage: "/articles/images/nepalese-children.jpg",
    date: "2026-02-20",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "democracy-is-pulse",
    title: "Democracy Is Pulse",
    summary:
      "Democracy is more than ballots. It is the measurable promise that no citizen is left outside the reach of timely care.",
    thumbnailImage: "/blogs/images/foodInsecurity.jpg",
    date: "2026-02-19",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "eyes-on-the-horizon",
    title: "Eyes on the Horizon",
    summary:
      "Border vigilance is a daily discipline. Communities are safest when local teams can detect, report, and act without delay.",
    thumbnailImage: "/blogs/images/mapFoodInsecurity.png",
    date: "2026-02-18",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "its-not-a-rumor-anymore",
    title: "It's Not a Rumor Anymore",
    summary:
      "Once confirmation lands, time becomes the primary resource. Fast coordination at the border can prevent wider crisis.",
    thumbnailImage: "/blogs/images/trendsFoodInsecurity.png",
    date: "2026-02-17",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-crowd-is-a-risk",
    title: "The Crowd Is a Risk",
    summary:
      "A crowd can carry hope and danger at once. Smart public health planning protects both freedom and lives.",
    thumbnailImage: "/blogs/images/childrenCrisisMap.png",
    date: "2026-02-16",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "too-small-to-fight-alone",
    title: "Too Small to Fight Alone",
    summary:
      "Children do not need perfect systems. They need fast systems. Early detection and referral can convert fear into survival.",
    thumbnailImage: "/blogs/thumbnail/childrenInGroup.jpg",
    date: "2026-02-15",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "love-is-protecting-her",
    title: "Love Is Protecting Her",
    summary:
      "Romance is easy language. Responsibility is harder and far more meaningful. Protecting health is one of love's most concrete forms.",
    thumbnailImage: "/images/familySupport.jpg",
    date: "2026-02-14",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-voice-in-the-box",
    title: "The Voice in the Box",
    summary:
      "In difficult terrain, radio is not old technology. It is resilient health infrastructure that keeps families informed and connected.",
    thumbnailImage: "/articles/images/insights-and-leadership.jpg",
    date: "2026-02-13",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "running-for-peace-walking-for-health",
    title: "Running for Peace, Walking for Health",
    summary:
      "Distance can inspire when chosen. It becomes injustice when imposed on people seeking basic care.",
    thumbnailImage: "/blogs/images/childrenInSwing.jpeg",
    date: "2026-02-12",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "lab-coats-in-the-field",
    title: "Lab Coats in the Field",
    summary:
      "Women in rural health are not assistants to science. They are science in action under pressure and without applause.",
    thumbnailImage: "/blogs/images/seniorCitizens.jpeg",
    date: "2026-02-11",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-ten-cent-miracle",
    title: "The Ten-Cent Miracle",
    summary:
      "Low-cost preventive medicine can unlock growth and learning at scale when systems deliver it reliably.",
    thumbnailImage: "/blogs/images/mothersWithBabies.jpg",
    date: "2026-02-10",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "short-for-their-age-short-on-hope",
    title: "Short for Their Age, Short on Hope",
    summary:
      "A stunted childhood is a national loss, not a private family issue. Nutrition equity is one of Nepal's highest-return investments.",
    thumbnailImage: "/images/babyHome.jpg",
    date: "2026-02-09",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-grass-is-hiding-a-killer",
    title: "The Grass Is Hiding a Killer",
    summary:
      "Snakebite is treatable when response is fast and supply is ready. Preparation before season is what saves lives.",
    thumbnailImage: "/images/environment.jpg",
    date: "2026-02-08",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "a-pad-keeps-a-girl-in-school",
    title: "A Pad Keeps a Girl in School",
    summary:
      "A low-cost menstrual kit can protect attendance, confidence, and long-term economic potential for girls across rural Nepal.",
    thumbnailImage: "/articles/images/education-and-empowerement.jpg",
    date: "2026-02-07",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-shed-is-a-violence",
    title: "The Shed Is a Violence",
    summary:
      "Menstrual dignity is basic safety. Ending harmful exclusion is a public health duty, not a cultural debate.",
    thumbnailImage: "/images/childWelfare.jpg",
    date: "2026-02-06",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-strength-of-her-fast",
    title: "The Strength of Her Fast",
    summary:
      "A society that honors women's sacrifice must also protect women's blood health, nutrition, and clinical access.",
    thumbnailImage: "/images/oldWomen.jpg",
    date: "2026-02-05",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "i-cant-afford-to-live",
    title: "I Can't Afford to Live",
    summary:
      "No patient should have to choose between survival and family ruin. Cancer policy must confront cost as aggressively as disease.",
    thumbnailImage: "/articles/images/healthcare.jpg",
    date: "2026-02-04",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "the-longest-journey",
    title: "The Longest Journey",
    summary:
      "In rural Nepal, the longest part of cancer care is often the road between home and treatment. That road is a clinical variable.",
    thumbnailImage: "/articles/images/community-clinic.jpg",
    date: "2026-02-03",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-swamp-is-alive",
    title: "The Swamp Is Alive",
    summary:
      "When wetlands are neglected, public health pays the bill. Protecting ecosystems is part of protecting households.",
    thumbnailImage: "/articles/images/climate-action.webp",
    date: "2026-02-02",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-two-nepals-super-specialty-vs-basic-survival",
    title: "The Two Nepals: Super-Specialty vs Basic Survival",
    summary:
      "A modern health system is not measured by its best hospital alone. It is measured by the poorest patient's chance to arrive there in time.",
    thumbnailImage: "/blogs/thumbnail/healthcareReform.jpg",
    date: "2026-02-01",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "where-the-road-ends-we-begin",
    title: "Where the Road Ends, We Begin",
    summary:
      "When formal systems stall, community-rooted health operations become the only bridge between diagnosis and survival.",
    thumbnailImage: "/blogs/thumbnail/ruralSetting.jpg",
    date: "2026-01-31",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-ultimate-right",
    title: "The Ultimate Right",
    summary:
      "The strongest tribute to democratic sacrifice is not ceremony. It is a health system where geography no longer decides who lives.",
    thumbnailImage: "/blogs/images/group-pressc.jpg",
    date: "2026-01-30",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-bite-that-kills",
    title: "The Bite That Kills",
    summary:
      "When a rabies bite happens, the clock starts instantly. Stock reliability and rapid referral are the difference between panic and survival.",
    thumbnailImage: "/articles/images/crisis-management.jpg",
    date: "2026-01-29",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "your-secret-is-safe-with-us",
    title: "Your Secret Is Safe With Us",
    summary:
      "A secure record protects more than data. It protects the human willingness to ask for care before a condition becomes severe.",
    thumbnailImage: "/blogs/images/mentalHealthAtlasInfo.png",
    date: "2026-01-28",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "screening-the-sky-ignoring-the-ground",
    title: "Screening the Sky, Ignoring the Ground",
    summary:
      "Public confidence rises when screening systems are fair. It falls when prevention looks selective.",
    thumbnailImage: "/blogs/thumbnail/doctorUsingLaptop.jpeg",
    date: "2026-01-27",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "two-nations-one-biology",
    title: "Two Nations, One Biology",
    summary:
      "National celebrations and open movement can coexist with safety, but only when surveillance cooperation is treated as shared infrastructure.",
    thumbnailImage: "/blogs/images/nepaliVillageInHills.jpg",
    date: "2026-01-26",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "disease-of-isolation",
    title: "The Disease of Isolation",
    summary:
      "Ending leprosy requires two treatments at once: medicine for the body and social courage against exclusion.",
    thumbnailImage: "/blogs/images/breakingTheStigma.png",
    date: "2026-01-25",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "girl-with-book-village-doctor",
    title: "A Girl With a Book Is a Doctor for Her Village",
    summary:
      "When girls stay in school, communities gain health workers, informed mothers, and stronger prevention behavior for an entire generation.",
    thumbnailImage: "/blogs/thumbnail/nepaleseChildren.jpg",
    date: "2026-01-24",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "waiting-to-live",
    title: "Waiting to Live",
    summary:
      "Dialysis is not elective. It is time-bound survival. A fair system must treat queue stability as a life-protection metric.",
    thumbnailImage: "/blogs/images/telemedicineConsultation.jpg",
    date: "2026-01-23",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "health-is-heritage",
    title: "Health Is Heritage",
    summary:
      "Festivals sustain identity. Health services sustain the people who keep that identity alive. The two should never be separated.",
    thumbnailImage: "/blogs/images/templeInTheHills.jpg",
    date: "2026-01-22",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "whispers-across-the-border",
    title: "The Whispers Across the Border",
    summary:
      "Rumors are not proof, but they are data. Border health systems must listen early, verify fast, and act before fear outruns facts.",
    thumbnailImage: "/blogs/images/epidemic.jpg",
    date: "2026-01-21",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "water-is-the-first-medicine",
    title: "Water Is the First Medicine",
    summary:
      "A medicine can cure. Dirty water can undo that cure in hours. Health and water governance must move together.",
    thumbnailImage: "/images/boat.jpeg",
    date: "2026-01-20",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "breathing-poison-in-the-valley",
    title: "Breathing Poison in the Valley",
    summary:
      "Every high-pollution day removes safety from an ordinary breath. Air governance belongs at the center of health protection in Nepal.",
    thumbnailImage: "/blogs/images/childrenAndAirPollution.png",
    date: "2026-01-19",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "do-no-harm-receive-no-harm",
    title: "Do No Harm. Receive No Harm.",
    summary:
      "When a doctor fears violence, every patient becomes less safe. Provider protection and patient rights are the same public mission.",
    thumbnailImage: "/blogs/images/aNepaliDoctor.jpg",
    date: "2026-01-18",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "why-she-still-chooses-home",
    title: "Why She Still Chooses Home",
    summary:
      "Women do not avoid facilities because they reject medicine. They avoid systems that feel distant, costly, and undignified in their most vulnerable moment.",
    thumbnailImage: "/images/maternalHealth.jpg",
    date: "2026-01-17",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "blindness-in-a-capsule",
    title: "Blindness in a Capsule",
    summary:
      "A child does not go blind because medicine is expensive. A child goes blind when logistics are weak and timing is lost.",
    thumbnailImage: "/blogs/images/aTuberculosisPatient.png",
    date: "2026-01-16",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "trauma-doesnt-end-when-camera-stops",
    title: "The Trauma Doesn't End When the Camera Stops",
    summary:
      "This anniversary is not about replaying tragedy. It is about building mental health care into Nepal's disaster response as a non-negotiable standard.",
    thumbnailImage: "/blogs/thumbnail/mentalCrisis.jpg",
    date: "2026-01-15",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "wisdom-in-the-bowl",
    title: "The Wisdom in the Bowl",
    summary:
      "Maghe Sankranti is more than celebration. It is a lesson in practical winter nutrition and a roadmap for stronger rural health outcomes.",
    thumbnailImage: "/images/nutritionProgram.jpg",
    date: "2026-01-14",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "law-of-land-survival",
    title: "The Law of Land, The Law of Survival",
    summary:
      "When legal and infrastructure delays drag on, rural patients face delayed diagnosis and delayed treatment. Continuity planning must protect care while processes run.",
    thumbnailImage: "/blogs/images/medicalTeam.jpeg",
    date: "2026-01-13",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "four-percent-price-future",
    title: "Four Percent: The Price on Our Future",
    summary:
      "When children receive too little practical support, the long-term national cost rises in health, learning, and household resilience.",
    thumbnailImage: "/images/childrenStudy.JPG",
    date: "2026-01-12",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "true-unity-connectedness",
    title: "True Unity Is Connectedness",
    summary:
      "A country is truly unified when survival odds are not decided by geography. Health access equity is nation-building in practice.",
    thumbnailImage: "/images/healthcare.jpg",
    date: "2026-01-11",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "two-children-one-bed",
    title: "Two Children, One Bed",
    summary:
      "Overcrowded winter pediatric wards show the visible crisis. The bigger risk is the rural child who cannot reach those wards in time.",
    thumbnailImage: "/images/doctorWorking.JPG",
    date: "2026-01-10",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "departure-gate-health-drain",
    title: "Departure Gate: Nepal's Health Drain",
    summary:
      "As migration resumes after holidays, rural households lose working-age caregivers and referral support capacity, deepening hidden health delays.",
    thumbnailImage: "/images/healthGroup.jpg",
    date: "2026-01-09",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "when-ambulances-cant-move",
    title: "When Ambulances Can't Move",
    summary:
      "Curfew and unrest can turn routine health needs into emergencies. Protected health corridors are essential during civic disruption.",
    thumbnailImage: "/blogs/images/conflictMapChildren.png",
    date: "2026-01-08",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "earth-shook-again-today",
    title: "The Earth Shook Again Today",
    summary:
      "Every tremor is a systems audit: can care continue when roads, communication, and community trust are under stress at once?",
    thumbnailImage: "/images/teamWorking.JPG",
    date: "2026-01-07",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "blindness-defeated-village-victory",
    title: "Blindness Defeated: A Victory for the Village",
    summary:
      "Nepal's trachoma milestone proves low-cost, repeated village-level public health action can defeat preventable blindness at national scale.",
    thumbnailImage: "/images/generalHealthService.jpg",
    date: "2026-01-06",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "closed-doors-empty-stomachs",
    title: "Closed Doors, Empty Stomachs",
    summary:
      "When winter closes schools, learning pauses and child nutrition support often pauses too. Closure plans must include meal continuity.",
    thumbnailImage: "/images/qualityEducation.jpg",
    date: "2026-01-05",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "second-winter-jajarkot",
    title: "The Second Winter in Jajarkot",
    summary:
      "The earthquake ended quickly, but winter exposure did not. Temporary shelter conditions are now driving respiratory health risk.",
    thumbnailImage: "/images/childProtection.jpg",
    date: "2026-01-04",
    author: "Nivaran Foundation News Desk",
    featured: false,
    type: "News",
  },
  {
    slug: "the-grey-blanket-why-fog-is-a-medical-emergency",
    title: "The Grey Blanket: Why Fog Is a Medical Emergency",
    summary:
      "Dense winter fog in Nepal's Terai does more than delay flights. It disrupts referrals, vaccines, and emergency timelines for families already far from care.",
    thumbnailImage: "/blogs/images/healthcareReformFiles.jpg",
    date: "2026-01-03",
    author: "Nivaran Foundation News Desk",
    featured: true,
    type: "News",
  },
  {
    slug: "when-the-road-ends-aviation-safety-and-rural-health",
    title: "When the Road Ends, Care Can End Too",
    summary:
      "The Jan 2 Bhadrapur runway overshoot exposed a hard truth: in remote Nepal, one transport failure can break the medical referral chain for critical patients.",
    thumbnailImage: "/images/archive/2026/2026-01-02-bhadrapur-airport.jpg",
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
