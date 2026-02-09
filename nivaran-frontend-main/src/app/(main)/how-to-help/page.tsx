import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import { HowTohelpInfoCard } from "@/components/new/HowToHelp/HowTohelpInfoCard";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Make a Difference with Nivaran Foundation",
  description:
    "Learn how you can support Nivaran Foundation’s mission. Explore ways to contribute, volunteer, and help create lasting positive change in the community",
  alternates: {
    canonical: "https://nivaranfoundation.org/how-to-help",
  },
};

export default function page() {
  return (
    <div className="font-Poppins w-full px-4">
      <div className="max-w-[1320px] mx-auto ">
        <div className="py-6">
          <PageTitle
            prefix="Your Contribution"
            suffix="Matters"
            className="flex-row items-center gap-4"
          />
          <p className="text-sm text-gray-600">
            For inquiries regarding partnerships, media, or programs, please
            contact us
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
      </div>
    </div>
  );
}
