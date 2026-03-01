import { PrivacyPolicyList } from "@/components/new/PrivacyPolicyList/PrivacyPolicyList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Privacy Policy - Nivaran Foundation Data Protection & Security",
  description:
    "Read the Nivaran Foundation Privacy Policy to learn how we protect your personal data, ensure security, and maintain transparency in our data practices.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Nivaran Foundation",
    description: "Learn how Nivaran Foundation protects your personal data and maintains transparency.",
    url: "https://www.nivaranfoundation.org/privacy-policy",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Nivaran Foundation",
    description: "Nivaran Foundation's data protection and privacy practices.",
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
