import { OrganizeLocallyCompoenent } from "@/components/nivaran/organize/OrganizeLocallyComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Organize Locally",
  description:
    "Collaborate with Nivaran Foundation to organize health camps locally. Contact support@nivaranfoundation.org for more details.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/organize-locally",
  },
  openGraph: {
    title: "Organize Locally | Nivaran Foundation",
    description: "Collaborate with Nivaran Foundation to organize health camps locally.",
    url: "https://www.nivaranfoundation.org/organize-locally",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organize Locally | Nivaran Foundation",
    description: "Collaborate with Nivaran Foundation to organize health camps locally.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};
export default function Page() {
  return (
    <div className="bg-gray-50 w-full px-4">
      <OrganizeLocallyCompoenent></OrganizeLocallyCompoenent>
    </div>
  );
}
