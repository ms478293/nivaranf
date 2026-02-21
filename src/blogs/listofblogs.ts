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
    slug: "when-the-road-ends-aviation-safety-and-rural-health",
    title: "When the Road Ends: Aviation Safety and Rural Health",
    summary:
      "The January 2 runway overshoot in Bhadrapur was more than a transport incident. In remote Nepal, disrupted aviation can break the only referral path for critical patients.",
    thumbnailImage: "/images/archive/2026/2026-01-02-when-the-road-ends-aviation-safety-rural-health.svg",
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
