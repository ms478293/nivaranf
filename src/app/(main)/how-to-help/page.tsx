import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { HowTohelpInfoCard } from "@/components/new/HowToHelp/HowTohelpInfoCard";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Make a Difference with Nivaran Foundation",
  description:
    "Support Nivaran Foundation through donations, volunteering, partnerships, fundraising, and advocacy to expand healthcare and education access in Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/how-to-help",
  },
  openGraph: {
    title: "How to Help | Nivaran Foundation",
    description: "Support Nivaran Foundation through donations, volunteering, partnerships, and practical ways to help.",
    url: "https://www.nivaranfoundation.org/how-to-help",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Help | Nivaran Foundation",
    description: "See how donations, volunteering, partnerships, and advocacy support Nivaran Foundation programs in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function page() {
  return (
    <div className="font-Poppins w-full px-4">
      <div className="max-w-[1320px] mx-auto ">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How to Help" }]} className="mb-2" />
        <div className="py-6">
          <PageTitle
            prefix="Your Contribution"
            suffix="Matters"
            className="flex-row items-center gap-4"
          />
          <p className="text-sm text-gray-600">
            Every contribution — whether your time, skills, or donation — helps
            us deliver healthcare and education to those who need it most.
          </p>
        </div>

        <section className="py-10">
          <HowTohelpInfoCard />
        </section>

        <section className="py-10">
          <Suspense>
            <DonationBlock />
          </Suspense>
        </section>

        <RelatedContent
          heading="Ways to Get Involved"
          links={[
            { title: "Donate", href: "/donate", description: "Make a tax-deductible donation to fund healthcare and education programs." },
            { title: "Volunteer", href: "/volunteer", description: "Join our field teams and contribute your time and skills." },
            { title: "Careers", href: "/career", description: "Explore open positions and grow your career with Nivaran Foundation." },
            { title: "Organize Locally", href: "/organize-locally", description: "Start a health camp or awareness drive in your own community." },
            { title: "Our Healthcare Programs", href: "/programs/health", description: "See how your support translates into real medical impact." },
          ]}
        />
      </div>
    </div>
  );
}
