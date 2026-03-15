import { HealthcareTopicPage } from "@/components/seo/HealthcareTopicPage";
import { GENERAL_HEALTHCARE_EVIDENCE } from "@/content/healthcare-evidence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Health Camps in Nepal | How Rural Outreach Care Works",
  description:
    "Learn how mobile health camps in Nepal expand access to screening, basic treatment, medicine, and referrals for communities far from formal healthcare facilities.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/mobile-health-camps-nepal",
  },
  keywords: [
    "mobile health camps Nepal",
    "health camps Nepal",
    "free health camp Nepal",
    "rural medical outreach Nepal",
  ],
  openGraph: {
    title: "Mobile Health Camps in Nepal | How Rural Outreach Care Works",
    description:
      "A practical guide to how mobile health camps bring screening, treatment, medicine, and referral support closer to remote communities in Nepal.",
    url: "https://www.nivaranfoundation.org/mobile-health-camps-nepal",
    type: "article",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Health Camps in Nepal | How Rural Outreach Care Works",
    description:
      "How mobile health camps reduce distance, delay, and cost barriers for remote families in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function MobileHealthCampsNepalPage() {
  return (
    <HealthcareTopicPage
      breadcrumbLabel="Mobile Health Camps in Nepal"
      eyebrow="Healthcare Access"
      title="Mobile health camps in Nepal are often the fastest way to reach people who would otherwise go untreated"
      intro="For many rural families, the barrier is not a single disease. It is distance, travel cost, missed wages, and the absence of routine screening. Mobile health camps exist to close that gap by bringing doctors, nurses, medicines, and triage closer to the village instead of forcing the village to travel to the city."
      summary={[
        "A good mobile health camp is not just a one-day event. It is a field-delivery model that compresses travel, waiting time, and first-contact diagnosis into a shorter, more affordable window for the patient.",
        "In Nepal, this matters most where road access is weak, specialist care is concentrated in urban centers, and people delay care until symptoms become severe because reaching treatment is expensive and disruptive.",
      ]}
      editorialNote="This page explains access barriers and outreach delivery models in Nepal. It is not medical advice. It should be read alongside Nivaran's care-model page and the official reference sources below."
      evidenceLinks={GENERAL_HEALTHCARE_EVIDENCE}
      sections={[
        {
          title: "What a field camp actually does",
          body: [
            "A mobile health camp creates a temporary but structured point of care. It usually combines registration, triage, basic vitals, doctor consultation, medicine distribution, and referral support for cases that need imaging, surgery, specialist follow-up, or hospital admission.",
            "When the model is run well, it identifies untreated chronic conditions earlier, surfaces maternal and child health risks sooner, and reduces the number of people who simply remain outside the formal care system.",
          ],
        },
        {
          title: "Why the model fits rural Nepal",
          body: [
            "The same family may be balancing farm work, transport cost, childcare, and income instability. Asking them to make repeated long-distance trips to a hospital is often unrealistic. A field camp lowers the friction around first contact with care.",
            "That does not replace hospitals. It improves the probability that people enter the care pathway early enough for hospitals and referral centers to help effectively.",
          ],
        },
        {
          title: "How Nivaran uses the model",
          body: [
            "Project Sanjeevani uses mobile outreach as the practical entry point for rural healthcare delivery. The field side is paired with tracking, verification, and investment reporting so communities, donors, and partners can see where camps happened and what scale was actually reached.",
            "That is why transparent tracking matters. Visibility into camps, patients, coverage, and follow-up discipline is what turns a health camp from a marketing event into an operating model.",
          ],
        },
      ]}
      faq={[
        {
          question: "What is a mobile health camp in Nepal?",
          answer:
            "It is a temporary field-based care setup that brings doctors, nurses, screening, medicines, and referrals closer to rural communities that are far from fixed healthcare facilities.",
        },
        {
          question: "Are mobile health camps only for basic checkups?",
          answer:
            "They usually start with screening and basic consultation, but they also identify patients who need ongoing treatment, specialist review, diagnostics, or referral to higher-level care.",
        },
        {
          question: "Why are mobile health camps important in rural Nepal?",
          answer:
            "They reduce distance, cost, and time barriers that often keep people from seeking treatment early, especially in places where travel to formal facilities is difficult.",
        },
        {
          question: "How does Nivaran track camp performance?",
          answer:
            "Nivaran publishes Sanjeevani tracking data covering verified camps, patient totals, province coverage, and financial progress so field activity is visible beyond donor-facing slogans.",
        },
      ]}
      relatedLinks={[
        {
          title: "Project Sanjeevani",
          href: "/sanjeevani",
          description:
            "See Nivaran's flagship mobile healthcare initiative and the current field rollout across Nepal.",
        },
        {
          title: "Sanjeevani Tracking Portal",
          href: "/sanjeevani/tracking",
          description:
            "Review camps, patients served, coverage, and field metrics in the live tracking portal.",
        },
        {
          title: "Rural Healthcare in Nepal",
          href: "/rural-healthcare-nepal",
          description:
            "Explore the structural access barriers that make outreach medicine necessary in remote communities.",
        },
        {
          title: "Maternal Health in Nepal",
          href: "/maternal-health-nepal",
          description:
            "See why maternal care, screening, and referral support are central to rural healthcare delivery.",
        },
        {
          title: "Healthcare Programs",
          href: "/programs/health",
          description:
            "Browse Nivaran's healthcare program overview, related resources, and current initiatives.",
        },
      ]}
    />
  );
}
