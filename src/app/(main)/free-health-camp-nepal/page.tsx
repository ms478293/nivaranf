import { HealthcareTopicPage } from "@/components/seo/HealthcareTopicPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Health Camp Nepal | How Rural Medical Camps Actually Work",
  description:
    "Learn how a free health camp in Nepal works in practice, from medical staffing and screenings to medicine distribution, referrals, and rural community coordination.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/free-health-camp-nepal",
  },
  keywords: [
    "free health camp Nepal",
    "health camp Nepal",
    "mobile health camp Nepal",
    "rural health camp Nepal",
    "Nivaran Foundation",
  ],
  openGraph: {
    title: "Free Health Camp Nepal | How Rural Medical Camps Actually Work",
    description:
      "A practical look at how free health camps in Nepal deliver screening, treatment, medicine, and referrals where access is limited.",
    url: "https://www.nivaranfoundation.org/free-health-camp-nepal",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Health Camp Nepal | How Rural Medical Camps Actually Work",
    description:
      "What a real free health camp in Nepal includes beyond a one-day outreach visit.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function FreeHealthCampNepalPage() {
  return (
    <HealthcareTopicPage
      breadcrumbLabel="Free Health Camp Nepal"
      eyebrow="Free Health Camp Nepal"
      title="How a free health camp in Nepal actually works"
      intro="A free health camp in Nepal is only useful if it is organized around real rural constraints: travel distance, medicine availability, patient flow, local mobilization, and referral planning for cases that cannot be solved on-site."
      summary={[
        "People often imagine a health camp as a simple one-day event. In reality, a credible field camp requires preparation before the first patient arrives and follow-up after the last patient leaves.",
        "That includes community coordination, medical staffing, logistics, medicines, registration, screening, clinical review, and referral systems for cases that require higher-level care. Without those pieces, a camp becomes publicity rather than service delivery.",
        "Project Sanjeevani is built around the idea that a free health camp should be operationally accountable. The point is not just turnout. The point is useful care, verified delivery, and continuity where possible.",
      ]}
      sections={[
        {
          title: "Before the camp opens",
          body: [
            "A strong camp begins with local coordination. Communities need to know when services are available, who should attend, and what care can realistically be provided. Logistics, medicine planning, and staffing must be set before arrival.",
            "This is also the stage where organizers work with local stakeholders to reduce crowding, improve patient flow, and identify populations that may need extra outreach, including women, children, and elderly patients.",
          ],
        },
        {
          title: "What happens on camp day",
          body: [
            "Patients move through registration, triage, screening, consultation, medicine dispensing, and in some cases counseling or referral. Depending on the model, services may include maternal health checks, dental care, eye screening, blood pressure and glucose checks, or general medicine support.",
            "The most important operational question is not how busy a camp looks. It is whether patients are properly assessed and whether the team can identify those who need higher-level follow-up.",
          ],
        },
        {
          title: "What happens after the camp",
          body: [
            "Post-camp work includes logging totals, verifying supply use, documenting district delivery, and reviewing referral needs. That is where transparency begins. Programs should be able to explain what was delivered and where.",
            "Nivaran Foundation uses the Sanjeevani tracking portal to make recent field activity visible, so supporters are not forced to rely on generic claims or outdated campaign language.",
          ],
        },
      ]}
      faq={[
        {
          question: "What services are usually included in a free health camp in Nepal?",
          answer:
            "It varies by program, but common services include registration, general consultation, blood pressure and glucose screening, maternal health checks, medicine distribution, and referrals for higher-level care.",
        },
        {
          question: "Are free health camps enough on their own?",
          answer:
            "No. Camps help reduce first-access barriers, but they work best when they are connected to referrals, local coordination, and a broader healthcare strategy.",
        },
        {
          question: "Why do rural communities rely on free health camps?",
          answer:
            "Because fixed facilities may be far away, travel is expensive, and routine screening is often delayed until symptoms become severe. Camps bring first contact closer to where people actually live.",
        },
        {
          question: "How does Nivaran run health camps differently?",
          answer:
            "Nivaran Foundation treats camps as a tracked operating system, not just isolated events. Program numbers, recent camp activity, and rollout data are published through Project Sanjeevani.",
        },
      ]}
      relatedLinks={[
        {
          title: "Project Sanjeevani Tracking Portal",
          href: "/sanjeevani/tracking",
          description:
            "Review the live operating portal for Nivaran's mobile camp rollout.",
        },
        {
          title: "Health NGO in Nepal",
          href: "/health-ngo-nepal",
          description:
            "See what makes a rural health organization credible beyond awareness campaigns.",
        },
        {
          title: "Mobile Health Camps in Nepal",
          href: "/mobile-health-camps-nepal",
          description:
            "Understand the field logic behind mobile healthcare in underserved districts.",
        },
        {
          title: "Rural Healthcare in Nepal",
          href: "/rural-healthcare-nepal",
          description:
            "See why distance, delay, and referral gaps still shape health outcomes outside cities.",
        },
      ]}
    />
  );
}
