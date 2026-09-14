import { createPageMetadata } from "@/lib/page-metadata";
import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { HowTohelpInfoCard } from "@/components/new/HowToHelp/HowTohelpInfoCard";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = createPageMetadata({
  "path": "/how-to-help",
  "title": "Help Communities in Nepal | Nivaran Foundation",
  "description": "Support communities in Nepal through donations, volunteering, local partnerships or fundraising. Find the way to help that fits your skills and resources."
});

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
            { title: "Donate", href: "/donate", description: "Make a donation to fund healthcare and education programs." },
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
