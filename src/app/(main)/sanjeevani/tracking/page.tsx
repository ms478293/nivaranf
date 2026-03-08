import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import SanjeevaniTrackingDashboard from "@/components/sanjeevani/SanjeevaniTrackingDashboard";
import { SANJEEVANI_PUBLIC_COPY } from "@/content/sanjeevani-public-stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Project Sanjeevani Tracking Portal | Mobile Health Camps in Nepal",
  description:
    "Track Project Sanjeevani in real time: mobile health camps, patients served, province coverage, and financial progress across rural Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/sanjeevani/tracking",
  },
  keywords: [
    "Project Sanjeevani tracking",
    "mobile health camp dashboard Nepal",
    "rural healthcare Nepal data",
    "health NGO transparency Nepal",
  ],
  openGraph: {
    title: "Project Sanjeevani Tracking Portal | Mobile Health Camps in Nepal",
    description: SANJEEVANI_PUBLIC_COPY.trackingMetadata,
    url: "https://www.nivaranfoundation.org/sanjeevani/tracking",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Sanjeevani Tracking Portal | Mobile Health Camps in Nepal",
    description:
      "Track mobile health camps, patients served, coverage, and financial progress across rural Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function SanjeevaniTrackingPage() {
  return (
    <main className="font-Poppins">
      <div className="max-w-[1320px] mx-auto px-4 pt-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs/health" },
            { label: "Sanjeevani", href: "/sanjeevani" },
            { label: "Live Tracking" },
          ]}
        />
      </div>
      <SanjeevaniTrackingDashboard />
    </main>
  );
}
