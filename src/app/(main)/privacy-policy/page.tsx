import { PrivacyPolicyList } from "@/components/new/PrivacyPolicyList/PrivacyPolicyList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Privacy Policy - Nivaran Foundation Data Protection & Security",
  description:
    "Read the Nivaran Foundation Privacy Policy to learn how we protect your personal data, ensure security, and maintain transparency in our data practices",
  alternates: {
    canonical: "https://nivaranfoundation.org/privacy-policy",
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
