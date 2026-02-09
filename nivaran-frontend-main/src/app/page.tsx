import AboutNivaran from "@/components/new/AboutNivaran/AboutNivaran";
import DonationBanner from "@/components/new/DonationBanner/DonationBanner";
import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import HeroSection from "@/components/new/HeroSection/HeroSection";
import InsightsAndInspiraton from "@/components/new/InsightsAndInspiration/InsightsAndInspiraton";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHappiness from "@/components/new/NivaranHappiness/NivaranHappiness";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import ProjectSanjeevani from "@/components/new/ProjectSanjeevani/ProjectSanjeevani";
import UpcomingProjects from "@/components/new/UpcomingProjects/UpcomingProjects";
import { Supporters } from "@/components/nivaran/main/Supporters";
import { SetCookie } from "@/components/nivaran/main/utils/SetCookie";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { Metadata } from "next";
import { Suspense } from "react";
import ogImage from "../../public/logo.png";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Global Care, Local Impact",
  description:
    "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
  metadataBase: new URL("https://nivaranfoundation.org"),
  keywords: [
    "Nivaran foundation",
    "Global Care, Local Impact",
    "Sanjeevani",
    "Terra",
    "Unity",
    "Nurture",
    "Vidya",
  ],

  openGraph: {
    siteName: "Nivaran Foundation",
    title: "Nivaran Foundation | Global Care, Local Impact",
    url: "https://nivaranfoundation.org",
    type: "website",
    images: [
      {
        url: ogImage.src,
        alt: "Nivaran Foundation",
        width: 1200,
        height: 630,
      },
    ],
    description:
      "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nivaran Foundation | Global Care, Local Impact",
    site: "@NivaranOrg",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        alt: "Nivaran Foundation",
        width: 1200,
        height: 675,
      },
    ],
    description:
      "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
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
        <SetCookie />

        {/* Hero Section */}
        <section aria-labelledby="hero-title">
          <HeroSection />
        </section>

        {/* Supporters */}
        <section aria-labelledby="supporters-title">
          <h2 id="supporters-title" className="sr-only">
            Our Supporters
          </h2>
          <Supporters />
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
                The Nivaran Foundation is committed to reaching the unreachable
                and creating a brighter future by empowering communities through
                sustainable solutions. At Nivaran Foundation, we are committed
                to creating a meaningful and lasting impact in the lives of
                individuals and communities.
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
            <MainTitle suffix="Upcoming" prefix="Projects" className="-mb-4" />
          </div>
          <UpcomingProjects data={UPCOMING_PROJECTS_DATA.slice(0, 4)} />
        </section>

        {/* Insights and Inspiration */}
        <section aria-labelledby="insights-title">
          <h2 id="insights-title" className="sr-only">
            Insights and Inspiration
          </h2>
          <InsightsAndInspiraton />
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
