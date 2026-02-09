import DonationCard from "@/components/new/DonationCard/DonationCard";
import { DonationFAQ } from "@/components/new/DonationFAQ/DonationFAQ";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { AppButton } from "@/components/ui/app-button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Donate to Nivaran Foundation - Make a Difference",
  description:
    "Your donation helps provide education, healthcare, child welfare, andsustainable community development. Contribute today to make a lasting impact",
  alternates: {
    canonical: "https://nivaranfoundation.org/donate",
  },
};

export default function DonationPage() {
  return (
    <main className=" font-Poppins w-full px-4 ">
      <section
        className="max-w-[1320px] mx-auto bg-[url('/nivaran_word.png')] bg-no-repeat flex flex-col md:gap-12"
        style={{
          backgroundPosition: "top 10% left 40%",
        }}
      >
        <div className="flex flex-col md:flex-row gap-3 justify-between ">
          <div className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
            <PageTitle prefix="Be the Change" suffix="You Want to See" />

            <p className="text-sm text-gray-600">
              Every donation brings us one step closer to a brighter, healthier,
              and more sustainable future.
            </p>

            <Link href="/sanjeevani" aria-label="See the Impact">
              <AppButton
                className="font-light bg-neutral-50"
                variant="primary-outline"
              >
                See the Impact of Your Giving
              </AppButton>
            </Link>
          </div>
          <Suspense>
            <DonationCard />
          </Suspense>
        </div>
        <DonationFAQ />
      </section>
    </main>
  );
}
