import { TermsAndServiceList } from "@/components/new/TermsAndServiceList/TermsAndServiceList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Terms and Services - Nivaran Foundation Policies",
  description:
    "Review the Nivaran Foundation Terms and Services to understand our policies, user agreements, and the guidelines that govern your use of our services.",
  alternates: {
    canonical: "https://nivaranfoundation.org/terms-of-service",
  },
};

export default function TermsAndConditions() {
  return <TermsAndServiceList />;
}
