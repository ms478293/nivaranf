import AboutNivaran from "@/components/new/AboutNivaran/AboutNivaran";
import DonationBanner from "@/components/new/DonationBanner/DonationBanner";
import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import WhereMoneyGoes from "@/components/new/DonorTrust/WhereMoneyGoes";
import HeroSection from "@/components/new/HeroSection/HeroSection";
import InsightsAndInspiraton from "@/components/new/InsightsAndInspiration/InsightsAndInspiraton";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHappiness from "@/components/new/NivaranHappiness/NivaranHappiness";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import ProjectSanjeevani from "@/components/new/ProjectSanjeevani/ProjectSanjeevani";
import UpcomingProjects from "@/components/new/UpcomingProjects/UpcomingProjects";
import { SetCookie } from "@/components/nivaran/main/utils/SetCookie";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { Metadata } from "next";
import { Suspense } from "react";
import ogImage from "../../public/logo.png";

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

// export const metadata: Metadata = {
//   title: {
//     template: "Nivaran Foundation | %s",
//     default: "Nivaran Foundation | Global Care, Local Impact",
//   },
//   description:
//     "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
//   metadataBase: new URL("https://nivaranfoundation.org"),
//   keywords: [
//     "Nivaran foundation",
//     "Global Care, Local Impact",
//     "Sanjeevani",
//     "Terra",
//     "Unity",
//     "Nurture",
//     "Vidya",
//   ],

//   openGraph: {
//     siteName: "Nivaran Foundation",
//     title: "Nivaran Foundation | Global Care, Local Impact",
//     url: "https://nivaranfoundation.org",
//     type: "website",
//     images: [
//       {
//         url: ogImage.src,
//         alt: "Nivaran Foundation",
//         width: 1200,
//         height: 630,
//       },
//     ],
//     description:
//       "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Nivaran Foundation | Global Care, Local Impact",
//     site: "@NivaranOrg",
//     images: [
//       {
//         url: "https://nivaranfoundation.org/logo_img.jpg",
//         alt: "Nivaran Foundation",
//         width: 1200,
//         height: 675,
//       },
//     ],
//     description:
//       "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
//     creator: "@NivaranOrg",
//   },

//   robots: "index, follow",
// };

const page = () => {
  return (
    <>
      <header role="banner">
        <NivaranHeader />
      </header>

      <main role="main">
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
                304 health camps operated and 61,200+ patients targeted through
                Project Sanjeevani, every dollar you give saves lives.
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

      <footer role="contentinfo">
        <NivaranFooter />
      </footer>
    </>
  );
};

export default page;
