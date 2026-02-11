import DonationCard from "@/components/new/DonationCard/DonationCard";
import { DonationFAQ } from "@/components/new/DonationFAQ/DonationFAQ";
import WhereMoneyGoes from "@/components/new/DonorTrust/WhereMoneyGoes";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { AppButton } from "@/components/ui/app-button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Donate to Nivaran Foundation | Save Lives in Nepal | 501(c)(3) Tax-Deductible",
  description:
    "Your tax-deductible donation helps provide healthcare and education to Nepal's most underserved communities. 85% of funds go directly to programs. EIN: 99-3919025.",
  alternates: {
    canonical: "https://nivaranfoundation.org/donate",
  },
};

export default function DonationPage() {
  return (
    <main className="font-Poppins w-full">
      {/* Hero + Donation Card */}
      <section className="w-full px-4">
        <div
          className="max-w-[1320px] mx-auto bg-[url('/nivaran_word.png')] bg-no-repeat flex flex-col md:gap-12"
          style={{
            backgroundPosition: "top 10% left 40%",
          }}
        >
          <div className="flex flex-col md:flex-row gap-3 justify-between">
            <div className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
              <PageTitle prefix="Be the Change" suffix="You Want to See" />

              <p className="text-sm text-gray-600">
                Every dollar you give saves lives. 85% of your donation goes
                directly to healthcare and education programs in Nepal.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-green-800 font-medium">
                  501(c)(3) Tax-Exempt Organization | EIN: 99-3919025
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Your donation is 100% tax-deductible. You will receive a tax
                  receipt via email.
                </p>
              </div>

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
        </div>
      </section>

      {/* Where Money Goes */}
      <WhereMoneyGoes />

      {/* Donor Testimonials */}
      <section className="w-full px-4 py-12 bg-gray-50">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Donors Trust Nivaran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-4">
                &quot;I appreciate how transparent Nivaran is about where the
                money goes. Knowing 85% goes directly to programs gives me
                confidence my donation makes a real difference.&quot;
              </p>
              <p className="text-gray-800 font-medium text-sm">
                — Recurring Donor
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-4">
                &quot;The health camps are saving lives in rural Nepal. I
                visited and saw firsthand how organized and impactful their work
                is. This is a team that delivers.&quot;
              </p>
              <p className="text-gray-800 font-medium text-sm">
                — Community Supporter
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-4">
                &quot;As a healthcare professional, I can see the real impact
                Nivaran makes. Their approach to community health camps is
                exactly what rural Nepal needs.&quot;
              </p>
              <p className="text-gray-800 font-medium text-sm">
                — Healthcare Professional &amp; Donor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-4 pb-12">
        <div className="max-w-[1320px] mx-auto">
          <DonationFAQ />
        </div>
      </section>
    </main>
  );
}
