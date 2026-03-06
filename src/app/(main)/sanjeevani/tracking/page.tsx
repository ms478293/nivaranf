import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import SanjeevaniTrackingDashboard from "@/components/sanjeevani/SanjeevaniTrackingDashboard";
import { SANJEEVANI_PUBLIC_COPY } from "@/content/sanjeevani-public-stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Project Sanjeevani – Live Tracking Dashboard | Nivaran Foundation",
  description:
    "Real-time project tracking for Project Sanjeevani — Nepal's National Rural Health Mission. Track camps, patients, coverage, and financial progress across all 7 provinces.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/sanjeevani/tracking",
  },
  openGraph: {
    title: "Project Sanjeevani – Live Tracking Dashboard",
    description:
      SANJEEVANI_PUBLIC_COPY.trackingMetadata,
    url: "https://www.nivaranfoundation.org/sanjeevani/tracking",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Sanjeevani – Live Tracking",
    description:
      "Track progress of Nepal's largest rural health mission in real time.",
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
