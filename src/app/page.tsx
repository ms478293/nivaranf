import AboutNivaran from "@/components/new/AboutNivaran/AboutNivaran";
import MainSiteSchemas from "@/components/seo/MainSiteSchemas";
import WeatherAdvisory from "@/components/nivaran/common/WeatherAdvisory";
import HeroSection from "@/components/new/HeroSection/HeroSection";
import HomeFloodAppeal from "@/components/new/HomeFloodAppeal/HomeFloodAppeal";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import { SetCookie } from "@/components/nivaran/main/utils/SetCookie";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ogImage from "../../public/logo.png";
import { PUBLIC_PAGE_ROBOTS } from "@/lib/page-metadata";
import ExploreNivaran from "@/components/new/ExploreNivaran";

export const revalidate = 3600;

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
  title: "Nivaran Foundation | Free Healthcare & Education in Nepal",
  description:
    "Nivaran Foundation is a Nepal-focused foundation delivering mobile health camps, maternal care, and education support across rural Nepal.",
  metadataBase: new URL("https://www.nivaranfoundation.org"),
  alternates: {
    canonical: "https://www.nivaranfoundation.org",
    languages: {
      en: "https://www.nivaranfoundation.org",
      "x-default": "https://www.nivaranfoundation.org",
    },
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
    title: "Nivaran Foundation | Free Healthcare & Education in Nepal",
    url: "https://www.nivaranfoundation.org",
    type: "website",
    images: [
      {
        url: ogImage.src,
        alt: "Nivaran Foundation healthcare programs in Nepal",
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
    description:
      "Nivaran Foundation delivers mobile health camps, maternal care, and education support across rural Nepal.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nivaran Foundation | Free Healthcare & Education in Nepal",
    site: "@NivaranOrg",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        alt: "Nivaran Foundation healthcare programs in Nepal",
        width: 1200,
        height: 665,
      },
    ],
    description:
      "Nivaran Foundation delivers mobile health camps, maternal care, and education support across rural Nepal.",
    creator: "@NivaranOrg",
  },

  robots: PUBLIC_PAGE_ROBOTS,
};

const page = () => {
  return (
    <>
      <MainSiteSchemas />
      <WeatherAdvisory />
      <header role="banner">
        <NivaranHeader />
      </header>

      <main id="main-content" role="main">
        <SetCookie />

        {/* Hero Section */}
        <section aria-labelledby="hero-title">
          <HeroSection />
        </section>


        <HomeFloodAppeal />
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
                Nivaran Foundation is a Nepal-focused foundation delivering
                healthcare to Nepal&apos;s most underserved communities. With
                {` ${SANJEEVANI_PUBLIC_STATS.campsCompletedText}`} completed
                health camps and {` ${SANJEEVANI_PUBLIC_STATS.patientsServedText}`}{" "}
                patients reported through Project Sanjeevani {SANJEEVANI_PUBLIC_STATS.asOfLabel},
                your support helps bring care closer to underserved communities.
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

        <ExploreNivaran />

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
