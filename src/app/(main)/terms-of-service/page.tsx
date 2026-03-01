import { TermsAndServiceList } from "@/components/new/TermsAndServiceList/TermsAndServiceList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Terms and Services - Nivaran Foundation Policies",
  description:
    "Review the Nivaran Foundation Terms and Services to understand our policies, user agreements, and the guidelines that govern your use of our services.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Nivaran Foundation",
    description: "Review Nivaran Foundation's policies, user agreements, and service guidelines.",
    url: "https://www.nivaranfoundation.org/terms-of-service",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Nivaran Foundation",
    description: "Nivaran Foundation's terms and service policies.",
    site: "@NivaranOrg",
  },
};

export default function TermsAndConditions() {
  return <TermsAndServiceList />;
}
