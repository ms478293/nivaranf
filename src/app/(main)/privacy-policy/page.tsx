import { PrivacyPolicyList } from "@/components/new/PrivacyPolicyList/PrivacyPolicyList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Privacy Policy - Nivaran Foundation Data Protection & Security",
  description:
    "Learn how Nivaran Foundation collects, stores, protects, and uses personal data across donations, contact forms, subscriptions, and website interactions.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Nivaran Foundation",
    description: "How Nivaran Foundation handles personal data, website interactions, and privacy protection.",
    url: "https://www.nivaranfoundation.org/privacy-policy",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Nivaran Foundation",
    description: "How Nivaran Foundation handles personal data and privacy protection.",
    site: "@NivaranOrg",
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <PrivacyPolicyList />
    </>
  );
};

export default PrivacyPolicy;
