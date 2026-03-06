import { Metadata } from "next";
import Link from "next/link";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Our Journey",
  description:
    `From a personal encounter with healthcare gaps in Nepal to ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps serving ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients. Discover Nivaran Foundation's journey of impact.`,
  alternates: {
    canonical: "https://www.nivaranfoundation.org/journey",
  },
  openGraph: {
    title: "Our Journey | Nivaran Foundation",
    description: `From a personal encounter with healthcare gaps in Nepal to ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps serving ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients.`,
    url: "https://www.nivaranfoundation.org/journey",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Journey | Nivaran Foundation",
    description: `From a personal encounter with healthcare gaps in Nepal to ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps serving ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients.`,
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function OurJourneyPage() {
  return (
    <div className="w-full px-4 bg-gradient-to-b from-white to-gray-50 font-Poppins">
      <div className="max-w-[1140px] mx-auto py-12">
        {/* Hero Section */}
        <header className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-main mb-8">
            Our Journey
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl max-w-3xl mx-auto">
            Nivaran Foundation was born from a personal encounter with the dire
            need for sustainable healthcare in Nepal. What started as a single
            health camp has grown into a mission serving tens of thousands.
          </p>
        </header>

        {/* Timeline Section */}
        <section className="relative mb-16">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-3xl font-semibold text-primary-main">
              Our Milestones
            </h2>
          </div>
          <div>
            <div className="relative">
              <div className="absolute left-1/2 -ml-px bg-secondary-main w-1 h-full"></div>
              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      The Beginning
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Nivaran Foundation was established with a clear purpose:
                      to bridge the healthcare gap in Nepal&apos;s most
                      underserved communities. Witnessing firsthand the lack of
                      basic medical access in rural areas, our founder set out
                      to create lasting change.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-primary-main rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Founded as 501(c)(3)
                    </div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      First Health Camps
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      We launched our first community health camps, bringing
                      essential medical services directly to remote villages in
                      Nepal. Eye care, dental care, and general health screenings
                      reached families who had never seen a doctor.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-secondary-main rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      First Camps Launched
                    </div>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Project Sanjeevani
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Our flagship healthcare initiative was born. Project
                      Sanjeevani has now served {SANJEEVANI_PUBLIC_STATS.patientsServedText} patients
                      through {` ${SANJEEVANI_PUBLIC_STATS.campsCompletedText}`} completed health camps
                      across all {SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces of Nepal,
                      delivering maternal care, disease prevention, and specialist
                      consultations to rural communities.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-primary-main rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {SANJEEVANI_PUBLIC_STATS.campsCompletedText} Camps Completed
                    </div>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Education Initiative
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Recognizing that healthy communities learn better and
                      educated communities stay healthier, we expanded into
                      education through Project Vidya — providing teacher
                      training, scholarships, and school infrastructure support
                      in underserved regions.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-secondary-main rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Project Vidya Launched
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center py-12 bg-primary-main text-white rounded-lg shadow-lg px-10 md:px-20">
          <h2 className="text-3xl font-bold mb-4">The Road Ahead</h2>
          <p className="text-lg mb-6">
            With 96% of every dollar going directly to programs, we are
            committed to scaling our impact beyond the current
            {` ${SANJEEVANI_PUBLIC_STATS.campsCompletedText}`} completed camps,
            {` ${SANJEEVANI_PUBLIC_STATS.patientsServedText}`} patients served, and
            {` ${SANJEEVANI_PUBLIC_STATS.investmentSoFarText}`} invested in the
            field so far.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-white text-primary-main font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Support Our Mission
          </Link>
        </section>
      </div>
    </div>
  );
}
