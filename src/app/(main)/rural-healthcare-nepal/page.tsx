import { HealthcareTopicPage } from "@/components/seo/HealthcareTopicPage";
import { GENERAL_HEALTHCARE_EVIDENCE } from "@/content/healthcare-evidence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rural Healthcare in Nepal | Access Barriers and Field Delivery",
  description:
    "Understand the main rural healthcare challenges in Nepal, including distance, delayed treatment, workforce scarcity, referral gaps, and why outreach models matter.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/rural-healthcare-nepal",
  },
  keywords: [
    "rural healthcare Nepal",
    "healthcare access Nepal",
    "rural health Nepal",
    "Nepal health NGO",
  ],
  openGraph: {
    title: "Rural Healthcare in Nepal | Access Barriers and Field Delivery",
    description:
      "A practical overview of how distance, cost, and uneven infrastructure shape healthcare access in rural Nepal.",
    url: "https://www.nivaranfoundation.org/rural-healthcare-nepal",
    type: "article",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rural Healthcare in Nepal | Access Barriers and Field Delivery",
    description:
      "Why rural healthcare in Nepal depends on outreach, referral discipline, and better continuity of care.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function RuralHealthcareNepalPage() {
  return (
    <HealthcareTopicPage
      breadcrumbLabel="Rural Healthcare in Nepal"
      eyebrow="Rural Access"
      title="Rural healthcare in Nepal is shaped less by one illness and more by how hard it is to reach care at the right time"
      intro="Healthcare access in rural Nepal is a systems problem. Families face long travel, uneven road connectivity, lost wages, limited facility capacity, and referral pathways that often break before treatment is completed. Any serious solution has to reduce those barriers, not just add more messaging."
      summary={[
        "Rural healthcare is not only about whether a clinic exists on paper. It is about whether a patient can actually reach care, pay the indirect costs, receive the right next step, and return for follow-up when needed.",
        "That is why rural health strategy in Nepal has to combine field outreach, local trust, referral discipline, and better visibility into what is truly happening on the ground.",
      ]}
      editorialNote="This page is an educational overview of healthcare access barriers in Nepal and should not be used as clinical guidance for diagnosis or treatment decisions."
      evidenceLinks={GENERAL_HEALTHCARE_EVIDENCE}
      sections={[
        {
          title: "Distance changes clinical behavior",
          body: [
            "When treatment requires a long journey, patients often delay care until pain becomes severe or symptoms stop them from working. That means diseases that could have been managed earlier arrive later and cost more to treat.",
            "The system problem is not just geography. It is the compound effect of travel time, transport cost, accommodation, missed labor, and uncertainty about whether the trip will even result in care.",
          ],
        },
        {
          title: "Outreach and referral must work together",
          body: [
            "Field camps help with first contact, screening, and immediate treatment, but rural healthcare improves only when those camps are connected to referral and continuity pathways. Screening without a next step creates awareness but not resolution.",
            "A serious rural health model therefore needs both front-end access and back-end discipline: documentation, referral logic, and the ability to see where the system is failing.",
          ],
        },
        {
          title: "What strong NGOs can contribute",
          body: [
            "A health NGO in Nepal can move faster than large institutions in certain contexts by organizing outreach, coordinating local volunteers, and concentrating care delivery where access gaps are widest.",
            "That only helps if the NGO publishes credible field information, avoids inflated impact claims, and makes its operational model visible enough for partners and donors to evaluate.",
          ],
        },
      ]}
      faq={[
        {
          question: "What are the biggest rural healthcare barriers in Nepal?",
          answer:
            "The main barriers are distance, travel cost, delayed treatment, uneven infrastructure, limited specialist access, and referral pathways that break before the patient reaches definitive care.",
        },
        {
          question: "Why is outreach medicine important for rural health?",
          answer:
            "Outreach reduces the first barrier to care by bringing screening, consultation, and medicine closer to the patient instead of requiring long and costly travel for every first contact.",
        },
        {
          question: "Can rural healthcare improve without hospitals?",
          answer:
            "Hospitals are necessary, but rural healthcare also depends on earlier detection, field outreach, referral support, and local follow-up. Without those layers, many patients still arrive too late.",
        },
        {
          question: "How does Sanjeevani fit into rural healthcare in Nepal?",
          answer:
            "Sanjeevani acts as an outreach and tracking model for rural care delivery, combining field camps with operational visibility around where care was delivered and at what scale.",
        },
      ]}
      relatedLinks={[
        {
          title: "Mobile Health Camps in Nepal",
          href: "/mobile-health-camps-nepal",
          description:
            "See how field camps lower the first barrier to care for remote communities.",
        },
        {
          title: "Project Sanjeevani",
          href: "/sanjeevani",
          description:
            "Understand Nivaran's rural health delivery model and current rollout footprint.",
        },
        {
          title: "Healthcare Programs",
          href: "/programs/health",
          description:
            "Review the broader healthcare program strategy, not just the campaign layer.",
        },
        {
          title: "Maternal Health in Nepal",
          href: "/maternal-health-nepal",
          description:
            "Maternal care is one of the clearest examples of why travel delay and referral failures matter.",
        },
        {
          title: "About Nivaran Foundation",
          href: "/about",
          description:
            "Review Nivaran's mission, organizational context, and public credibility pages.",
        },
      ]}
    />
  );
}
