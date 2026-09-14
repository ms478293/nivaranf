// Presentation only. Payment eligibility and receipt labels remain in
// donation-designations.ts; adding a page never enables a fund by itself.
export type DonationCampaign = {
  id: string;
  category: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  formHeading: string;
  formIntro: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  imageCaption?: string;
  tone: "forest" | "rose" | "ochre" | "flood";
  amounts: readonly number[];
  defaultAmount: number;
};

export const DONATION_CAMPAIGNS: readonly DonationCampaign[] = [
  {
    id: "general", category: "Healthcare + education",
    eyebrow: "A SMALL ACT. A HUMAN CONNECTION.",
    title: "Care should", titleAccent: "have no boundaries.",
    description: "Help bring healthcare and education closer to the communities that need them.",
    formHeading: "Make kindness count.",
    formIntro: "Your gift supports Nivaran’s work where it is needed most.",
    image: "/hero_img/hero_img_2.webp",
    imageAlt: "A doctor providing care to an older woman in a mountain community",
    imagePosition: "72% center", tone: "forest",
    amounts: [25, 50, 100, 250, 500], defaultAmount: 50,
  },
  {
    id: "sanjeevani", category: "Project Sanjeevani",
    eyebrow: "BRING CARE CLOSER.",
    title: "Across mountains.", titleAccent: "Within reach.",
    description: "Help our mobile health camps bring free consultations and essential care to rural Nepal.",
    formHeading: "Bring care within reach.",
    formIntro: "Your gift supports Project Sanjeevani’s mobile health camps.",
    image: "/sanjeevani/sanjeevani-1.png",
    imageAlt: "Illustration of a healthcare worker and an older man in a mountain village",
    imagePosition: "center 40%", tone: "forest",
    imageCaption: "Illustrative image",
    amounts: [25, 50, 100, 250, 500], defaultAmount: 100,
  },
  {
    id: "maternal-child-health", category: "Maternal & child health",
    eyebrow: "FOR EVERY NEW BEGINNING.",
    title: "A healthier start.", titleAccent: "A brighter tomorrow.",
    description: "Support antenatal screening and care for mothers and children through our health camps in Nepal.",
    formHeading: "Care for two generations.",
    formIntro: "Your gift supports maternal and child health through Nivaran’s camps.",
    image: "/images/maternalHealth.jpg",
    imageAlt: "A mother holding her newborn in a hospital ward",
    imagePosition: "62% center", tone: "rose",
    amounts: [25, 50, 75, 150, 300], defaultAmount: 150,
  },
  {
    id: "education", category: "Education in Nepal",
    eyebrow: "EVERY CHILD DESERVES A CHANCE.",
    title: "Open a book.", titleAccent: "Open a future.",
    description: "Help children in Nepal access learning, school supplies, and the support to keep going.",
    formHeading: "Give learning a chance.",
    formIntro: "Your gift supports Nivaran’s education work in Nepal.",
    image: "/images/qualityEducation.jpg",
    imageAlt: "Two children reading a book together",
    imagePosition: "55% center", tone: "ochre",
    amounts: [20, 50, 100, 200, 500], defaultAmount: 50,
  },
  {
    id: "nepal-flood-recovery", category: "Nepal floods 2026 appeal",
    eyebrow: "STAND WITH NEPAL.",
    title: "After the flood.", titleAccent: "A way forward.",
    description: "Stand with communities affected by Nepal’s floods. Help fund Nivaran’s planned flood response.",
    formHeading: "Stand with Nepal.",
    formIntro: "Your gift supports Nivaran’s planned flood response. We are raising funds before deployment.",
    image: "/hero_img/nepal-flood-portrait.webp",
    imageAlt: "Illustration of a woman overlooking a flood-affected Himalayan village",
    imagePosition: "center 38%", tone: "flood",
    imageCaption: "AI-generated illustration · not documentary photography",
    amounts: [25, 50, 100, 250, 500], defaultAmount: 50,
  },
  {
    id: "vidya", category: "Project Vidya · planned 2027",
    eyebrow: "IMAGINE WHAT LEARNING CAN BECOME.",
    title: "Their potential.", titleAccent: "Our shared future.",
    description: "Discover our plans for technology-enabled learning centers, teacher training, and greater access to education.",
    formHeading: "A future worth building.",
    formIntro: "Project Vidya is planned for 2027. Dedicated gifts are not being accepted yet. Explore the plans or get in touch about supporting the groundwork.",
    image: "/projects/images/projectVidyaHero.jpg",
    imageAlt: "Illustrative classroom scene for the planned Project Vidya",
    imagePosition: "center center", tone: "ochre",
    imageCaption: "Illustrative image · Project Vidya is planned for 2027",
    amounts: [25, 50, 100, 250, 500], defaultAmount: 50,
  },
];

export function getDonationCampaign(id: string) {
  return DONATION_CAMPAIGNS.find((campaign) => campaign.id === id);
}

export function campaignDonationPath(id: string) {
  return id === "general" ? "/donate" : `/donate/${id}`;
}
