import { HealthcareTopicPage } from "@/components/seo/HealthcareTopicPage";
import { MATERNAL_HEALTH_EVIDENCE } from "@/content/healthcare-evidence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternal Health in Nepal | Outreach Care, Screening, and Referral",
  description:
    "Learn why maternal health in Nepal depends on antenatal care access, early risk detection, referral support, and stronger rural outreach for pregnant mothers.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/maternal-health-nepal",
  },
  keywords: [
    "maternal health Nepal",
    "pregnancy care Nepal",
    "antenatal care Nepal",
    "rural maternal health Nepal",
  ],
  openGraph: {
    title: "Maternal Health in Nepal | Outreach Care, Screening, and Referral",
    description:
      "Why maternal health outcomes improve when antenatal care, screening, and referral access become easier for rural families.",
    url: "https://www.nivaranfoundation.org/maternal-health-nepal",
    type: "article",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maternal Health in Nepal | Outreach Care, Screening, and Referral",
    description:
      "Maternal health improves when early screening and referral become accessible before complications escalate.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function MaternalHealthNepalPage() {
  return (
    <HealthcareTopicPage
      breadcrumbLabel="Maternal Health in Nepal"
      eyebrow="Maternal Care"
      title="Maternal health in Nepal improves when screening, counseling, and referral become reachable before complications escalate"
      intro="Maternal health is not only about delivery. It starts much earlier with antenatal checkups, anemia and nutrition awareness, blood pressure monitoring, danger-sign recognition, and the ability to move quickly when higher-level care is required. In rural settings, delay is often the biggest risk multiplier."
      summary={[
        "Pregnant mothers do not need only information. They need timely contact with care, reliable referral routes, and fewer barriers to checkups that can detect risks before they become emergencies.",
        "That is why maternal health belongs inside broader rural healthcare planning. Outreach, local trust, and follow-up matter long before labor or hospital admission becomes urgent.",
      ]}
      editorialNote="This page covers maternal-health access and referral systems at a public-information level. It is not a substitute for antenatal care, emergency obstetric assessment, or advice from a licensed clinician."
      evidenceLinks={MATERNAL_HEALTH_EVIDENCE}
      sections={[
        {
          title: "Why early contact matters",
          body: [
            "Maternal care is most effective when risks are identified early. Blood pressure issues, nutritional stress, and warning signs linked to pregnancy complications are easier to respond to when a mother is seen before the condition becomes acute.",
            "In remote settings, early contact also creates a relationship with the health system, making later referral and emergency decision-making faster and more credible for the family.",
          ],
        },
        {
          title: "Where outreach helps most",
          body: [
            "Outreach settings can support first-line counseling, screening, vitals, and practical guidance for mothers who may not otherwise make a preventive visit. That does not replace obstetric facilities, but it reduces the chance that risk goes unnoticed.",
            "It also gives families a clearer map of what to do next, where referral should happen, and why waiting can become dangerous.",
          ],
        },
        {
          title: "Why this fits Sanjeevani's field model",
          body: [
            "A mobile health model can create the first structured touchpoint for mothers who live far from formal facilities. The value is not just the consultation itself. It is the earlier identification of risk and the earlier connection to the next step in care.",
            "For maternal health, field delivery only becomes credible when it is paired with referral discipline and honest reporting about what the camp can handle versus what must move to hospital-level care.",
          ],
        },
      ]}
      faq={[
        {
          question: "Why is maternal health a rural healthcare priority in Nepal?",
          answer:
            "Because delayed checkups, difficult travel, and late referral can turn manageable pregnancy risks into emergencies. Earlier contact with care improves the chance of timely intervention.",
        },
        {
          question: "Can mobile health camps help maternal health?",
          answer:
            "They can help with first contact, basic screening, counseling, and referral planning. They are most useful when they make earlier detection possible and connect mothers to higher-level care when needed.",
        },
        {
          question: "Is maternal care only about childbirth?",
          answer:
            "No. Maternal health includes antenatal visits, nutrition and anemia support, blood pressure monitoring, risk detection, postpartum attention, and safer referral decisions before complications escalate.",
        },
        {
          question: "How can donors support maternal health through Nivaran?",
          answer:
            "By funding outreach systems that improve early screening, rural access, and referral visibility rather than waiting until complications become more expensive and harder to resolve.",
        },
      ]}
      relatedLinks={[
        {
          title: "Healthcare Programs",
          href: "/programs/health",
          description:
            "See how maternal care fits into Nivaran's broader healthcare program across rural Nepal.",
        },
        {
          title: "Project Sanjeevani",
          href: "/sanjeevani",
          description:
            "Review the flagship outreach model currently delivering field-based healthcare services.",
        },
        {
          title: "Rural Healthcare in Nepal",
          href: "/rural-healthcare-nepal",
          description:
            "Understand the structural access barriers that affect maternal outcomes most in remote areas.",
        },
        {
          title: "Mobile Health Camps in Nepal",
          href: "/mobile-health-camps-nepal",
          description:
            "Learn how camp-based care helps create earlier contact and screening for mothers in underserved areas.",
        },
        {
          title: "Donate to Healthcare",
          href: "/donate",
          description:
            "Support donor-funded healthcare delivery for communities that face the highest travel and access barriers.",
        },
      ]}
    />
  );
}
