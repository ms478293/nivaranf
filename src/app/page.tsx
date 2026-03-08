import AboutNivaran from "@/components/new/AboutNivaran/AboutNivaran";
import HeroSection from "@/components/new/HeroSection/HeroSection";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import { SetCookie } from "@/components/nivaran/main/utils/SetCookie";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ogImage from "../../public/logo.png";

// Below-the-fold components: lazy-loaded with height-reserving skeletons to prevent CLS
const DonationBanner = dynamic(() => import("@/components/new/DonationBanner/DonationBanner"), {
  loading: () => <div style={{ minHeight: '320px' }} />,
});
const DonationBlock = dynamic(() => import("@/components/new/DonationBlock/DonationBlock"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const WhereMoneyGoes = dynamic(() => import("@/components/new/DonorTrust/WhereMoneyGoes"), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});
const InsightsAndInspiraton = dynamic(() => import("@/components/new/InsightsAndInspiration/InsightsAndInspiraton"), {
  loading: () => <div style={{ minHeight: '500px' }} />,
});
const NivaranHappiness = dynamic(() => import("@/components/new/NivaranHappiness/NivaranHappiness"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const ProjectSanjeevani = dynamic(() => import("@/components/new/ProjectSanjeevani/ProjectSanjeevani"), {
  loading: () => <div style={{ minHeight: '500px' }} />,
});
const UpcomingProjects = dynamic(() => import("@/components/new/UpcomingProjects/UpcomingProjects"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const NewsletterSubscribe = dynamic(() => import("@/components/new/NewsletterSubscribe/NewsletterSubscribe"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});
const WhatsAppButton = dynamic(() => import("@/components/new/WhatsAppButton/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

export const metadata: Metadata = {
  title: "Mobile Health Camps in Nepal | Nivaran Foundation",
  description:
    "Nivaran Foundation delivers mobile health camps, maternal care, and child health services in remote Nepal. Support healthcare access where distance blocks treatment.",
  metadataBase: new URL("https://www.nivaranfoundation.org"),
  alternates: {
    canonical: "https://www.nivaranfoundation.org",
  },
  keywords: [
    "mobile health camps Nepal",
    "rural healthcare Nepal",
    "maternal health Nepal",
    "child health Nepal",
    "health camps Nepal",
    "Nivaran Foundation",
    "donate Nepal healthcare",
  ],

  openGraph: {
    siteName: "Nivaran Foundation",
    title: "Mobile Health Camps in Nepal | Nivaran Foundation",
    url: "https://www.nivaranfoundation.org",
    type: "website",
    images: [
      {
        url: ogImage.src,
        alt: "Nivaran Foundation healthcare programs in Nepal",
        width: 1200,
        height: 630,
      },
    ],
    description:
      "Nivaran Foundation delivers mobile health camps, maternal care, and child health services in remote Nepal.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mobile Health Camps in Nepal | Nivaran Foundation",
    site: "@NivaranOrg",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        alt: "Nivaran Foundation healthcare programs in Nepal",
        width: 1200,
        height: 675,
      },
    ],
    description:
      "Nivaran Foundation delivers mobile health camps, maternal care, and child health services in remote Nepal.",
    creator: "@NivaranOrg",
  },

  robots: "index, follow",
};

const page = () => {
  return (
    <>
      <header role="banner">
        <NivaranHeader />
      </header>

      <main id="main-content" role="main">
        <h1 className="sr-only">
          Nivaran Foundation: Free Healthcare and Education in Rural Nepal
        </h1>

        <SetCookie />

        {/* Hero Section */}
        <section aria-labelledby="hero-title">
          <HeroSection />
        </section>


        {/* About Nivaran */}
        <section aria-labelledby="about-nivaran-title">
          <AboutNivaran>
            <div className="mb-4">
              <MainTitle
                suffix="About"
                prefix="Nivaran"
                className="[&>span:nth-child(2)]:uppercase"
              />
              <p
                id="about-nivaran-title"
                className="text-gray-800 w-full md:w-[65%] leading-6 font-normal mt-4"
              >
                Nivaran Foundation is a 501(c)(3) non-profit delivering
                healthcare to Nepal&apos;s most underserved communities. With
                {` ${SANJEEVANI_PUBLIC_STATS.campsCompletedText}`} completed
                health camps and {` ${SANJEEVANI_PUBLIC_STATS.patientsServedText}`}{" "}
                patients served through Project Sanjeevani, every dollar you
                give saves lives.
              </p>
            </div>
          </AboutNivaran>
        </section>

        {/* Happiness Section */}
        <section aria-labelledby="happiness-title">
          <h2 id="happiness-title" className="sr-only">
            Nivaran Happiness
          </h2>
          <NivaranHappiness />
        </section>

        {/* Donation Banner */}
        <section aria-labelledby="donation-banner-title">
          <h2 id="donation-banner-title" className="sr-only">
            Support Us
          </h2>
          <DonationBanner />
        </section>

        {/* Where Your Money Goes + Impact */}
        <section aria-labelledby="transparency-title">
          <h2 id="transparency-title" className="sr-only">
            Transparency and Impact
          </h2>
          <WhereMoneyGoes />
        </section>

        {/* Project Sanjeevani */}
        <section aria-labelledby="project-sanjeevani-title">
          <h2 id="project-sanjeevani-title" className="sr-only">
            Project Sanjeevani
          </h2>
          <ProjectSanjeevani />
        </section>

        {/* Upcoming Projects */}
        <section
          aria-labelledby="upcoming-projects-title"
          className="bg-gray-50 py-8 px-4"
        >
          <div className="max-w-[1320px] mx-auto ">
            <MainTitle suffix="Our" prefix="Projects" className="-mb-4" />
          </div>
          <UpcomingProjects data={UPCOMING_PROJECTS_DATA} />
        </section>

        {/* Insights and Inspiration */}
        <section aria-labelledby="insights-title">
          <h2 id="insights-title" className="sr-only">
            Insights and Inspiration
          </h2>
          <InsightsAndInspiraton />
        </section>

        {/* Beneficiary Story — Real Impact */}
        <section className="w-full px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-emerald-50">
          <div className="max-w-[1320px] mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary-500 text-sm font-semibold uppercase tracking-wider mb-2">Real Stories of Impact</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Healthcare Access Changes Everything
              </h2>
              <blockquote className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed italic mb-4">
                  &quot;Before Nivaran&apos;s mobile health camp came to our village, the nearest doctor was a two-day walk. My children had never been screened for basic health conditions. Now, a team of healthcare workers visits regularly — my daughter received her first dental checkup, and our family was screened for diabetes and hypertension, all at no cost. For us, this is not just healthcare — it is hope.&quot;
                </p>
                <footer className="text-sm text-gray-500">
                  — Mother of three, Kapilvastu District, Nepal
                </footer>
              </blockquote>
              <Link
                href="/stories"
                className="inline-block mt-6 text-primary-500 font-medium text-sm hover:text-primary-600 underline"
              >
                Read More Stories →
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Subscribe */}
        <section aria-labelledby="newsletter-title" className="py-8">
          <h2 id="newsletter-title" className="sr-only">
            Subscribe to Newsletter
          </h2>
          <NewsletterSubscribe variant="banner" />
        </section>

        {/* Donation Block with Suspense */}
        <Suspense
          fallback={
            <div role="status" aria-live="polite">
              Loading donations...
            </div>
          }
        >
          <DonationBlock />
        </Suspense>
      </main>

      <WhatsAppButton />

      <footer role="contentinfo">
        <NivaranFooter />
      </footer>
    </>
  );
};

export default page;
