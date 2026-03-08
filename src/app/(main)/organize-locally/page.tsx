import { OrganizeLocallyCompoenent } from "@/components/nivaran/organize/OrganizeLocallyComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Organize Locally",
  description:
    "Partner with Nivaran Foundation to organize local fundraisers, awareness campaigns, and community events that support healthcare and education programs in Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/organize-locally",
  },
  openGraph: {
    title: "Organize Locally | Nivaran Foundation",
    description: "Organize local fundraising and awareness events that support Nivaran Foundation programs in Nepal.",
    url: "https://www.nivaranfoundation.org/organize-locally",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organize Locally | Nivaran Foundation",
    description: "Start a local fundraiser or awareness event to support Nivaran Foundation programs.",
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
