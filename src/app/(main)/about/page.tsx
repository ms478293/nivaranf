import { LightIcon } from "@/assets/icons/LightIcon";
import { TargetIcon } from "@/assets/icons/TargetIcon";
import AboutNivaran from "@/components/new/AboutNivaran/AboutNivaran";
import DonationBlock from "@/components/new/DonationBlock/DonationBlock";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import StoryCard from "@/components/new/StoryCard/StoryCard";
import { WhyNIvaran } from "@/components/new/WhyNivaran/WhyNIvaran";
import { STORY_CONTENT } from "@/content/story-content";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SubscribeButton } from "@/components/SubscribeButton";

export const metadata: Metadata = {
  title: "About Nivaran Foundation | NGO Serving Nepal Since 2020",
  description:
    "Nivaran Foundation is a 501(c)(3) nonprofit founded in 2020, delivering healthcare and education support to underserved communities across Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/about",
  },
  openGraph: {
    title: "About Nivaran Foundation | NGO Serving Nepal Since 2020",
    description:
      "Learn about Nivaran Foundation's mission, leadership, and healthcare and education impact in Nepal.",
    url: "https://www.nivaranfoundation.org/about",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nivaran Foundation | NGO Serving Nepal Since 2020",
    description:
      "Learn about Nivaran Foundation's mission, leadership, and healthcare and education impact in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
    images: ["https://www.nivaranfoundation.org/logo.png"],
  },
};

export default function page() {
  return (
    <div className="w-full  font-Poppins ">
      <section className="relative w-full">
        <div className="h-[160%] w-full   sm:-top-[24.5rem] md:-top-52 -top-72 absolute -z-10">
          <Image
            src="/why-nivaran/about-cover.jpeg"
            alt="Nivaran Foundation Healthcare Camp"
            width={2000}
            height={2000}
            className="w-full h-full block  object-[40%] md:object-center object-cover grayscale"
          />{" "}
          <div className="absolute w-full h-full top-0 bg-[linear-gradient(#ffffff_30%,#ffffffab,#fff)]"></div>
        </div>

        <div className="flex flex-col gap-6 items-center max-w-[650px] mx-auto px-4">
          <div className="flex flex-col items-center ">
            <div className="w-[215px]">
              <Image
                src={"/NivaranLogo.svg"}
                alt="Nivaran Logo"
                width={500}
                height={500}
              />
            </div>
            <h1 className="font-[300] ">Global Care, Local Impact</h1>
          </div>

          <p className="text-gray-800 font-normal text-center">
            Nivaran Foundation is a 501(c)(3) non-profit organization committed to
            creating a meaningful and lasting impact through healthcare and
            education. Through sustainable solutions and direct medical services,
            we address the most pressing challenges faced by underserved
            populations in Nepal and beyond.
          </p>
          <p className="text-gray-800 font-normal text-center ">
            We are dedicated to reaching the unreachable, with a vision to
            transform lives by addressing critical challenges such as limited
            access to healthcare and quality education in underserved
            communities across Nepal.
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center md:flex-row mt-12 md:justify-center md:gap-8 max-w-[650px] mx-auto px-4">
          <div className="flex flex-col items-center">
            <TargetIcon className="w-40 h-40" />
            <div className="flex flex-col items-center">
              <h2 className="uppecase text-xl font-[600] flex gap-2">
                <span className="text-black">Our</span>
                <span className="text-primary-500">Mission</span>
              </h2>
              <p className="text-center text-gray-800 text-sm">
                Strengthening communities by implementing sustainable
                healthcare and education initiatives that save lives and
                empower the next generation
              </p>
            </div>
          </div>
          <div className="bg-gray-200 w-[230px] h-[1px] md:hidden"></div>
          <div className="flex flex-col items-center">
            <LightIcon className="w-40 h-40" />
            <div className="flex flex-col items-center">
              <h2 className="uppecase text-xl font-[600] flex gap-2">
                <span className="text-black">Our</span>
                <span className="text-[#FCAC2B]">Vision</span>
              </h2>
              <p className="text-center text-gray-800 text-sm">
                Empowering communities for sustainable futures.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <SubscribeButton label="Stay Updated with Our Journey" />
        </div>
      </section>

      <div className="flex flex-col items-center gap-6 mt-20 ">
        <h2
          className={
            "flex flex-wrap gap-x-3 items-center font-Poppins text-xl/10 sm:text-2xl/10 md:text-[40px]/10 border-l-4 border-primary-500 px-2 max-[362px]:h-16 sm:h-10 mb-2 justify-center w-fit"
          }
        >
          <span className="  font-thin  text-gray-800 block  leading-8">
            Why was
          </span>
          <span className="font-medium text-primary-500 leading-8">
            NIVARAN
          </span>
          <span className="  font-thin  text-gray-800 block  leading-8">
            born ?
          </span>
        </h2>
        <p className="text-gray-800 font-normal text-center text-sm max-w-[650px] mx-auto px-4">
          Nivaran Foundation was born from a personal encounter with the dire
          need for sustainable solutions in underprivileged communities.
          Committed to creating lasting change, we focus on healthcare and
          education — the two pillars that transform lives. Through compassion,
          innovation, and action, we aim to empower underserved communities and
          make a meaningful, lasting impact by bridging these critical gaps.
        </p>
      </div>
      <div className="w-full px-4">
        <div className="max-w-[1320px] mx-auto mt-8">
          <WhyNIvaran />

          <section className="mt-12 ">
            <AboutNivaran className="bg-neutral-50 px-0">
              <div className="flex flex-col items-center -mb-4 md:mb-0">
                <MainTitle
                  suffix="Our"
                  prefix="Initiatives"
                  className="[&>span:nth-child(2)]:uppercase"
                />
                <p className="text-gray-800  w-full md:w-[65%] text-center leading-6 font-normal my-4">
                  Nivaran&apos;s focus on Healthcare and Education creates
                  a synergistic impact — healthy communities learn better,
                  and educated communities stay healthier.
                </p>
              </div>
            </AboutNivaran>
          </section>
        </div>
      </div>

      {/* Credibility & Registration Section */}
      <section className="w-full px-4 py-12 bg-gray-50">
        <div className="max-w-[1320px] mx-auto">
          <MainTitle suffix="Our" prefix="Credibility" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">IRS Registered</h3>
              <p className="text-sm text-gray-600 mb-2">
                501(c)(3) Tax-Exempt Organization
              </p>
              <p className="text-sm font-bold text-gray-800">EIN: 41-2656587</p>
              <a
                href="https://www.irs.gov/charities-non-profits/tax-exempt-organization-search"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-500 underline mt-2 inline-block"
              >
                Verify on IRS.gov
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Transparency</h3>
              <p className="text-sm text-gray-600 mb-2">
                85% of every dollar goes directly to healthcare and education programs
              </p>
              <p className="text-xs text-gray-500">
                Only 10% operations, 5% fundraising
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Ground Impact</h3>
              <p className="text-sm text-gray-600 mb-2">
                304 health camps across Nepal with direct medical care delivery
              </p>
              <p className="text-xs text-gray-500">
                61,200+ patients targeted in Phase-I
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto">
          <MainTitle suffix="Our" prefix="Leadership" />
          <p className="text-gray-600 text-center text-sm mt-2 mb-8 max-w-[600px] mx-auto">
            Nivaran Foundation is led by a dedicated team passionate about
            delivering real healthcare impact in Nepal.
          </p>
          <div className="bg-gray-50 rounded-2xl p-8 max-w-[700px] mx-auto border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900">Founder &amp; Executive Director</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Nivaran Foundation was established by an individual who
                  witnessed firsthand the devastating healthcare gaps in rural
                  Nepal. Driven by the belief that healthcare is a right — not a
                  privilege — our founder established Nivaran as a 501(c)(3)
                  nonprofit to create lasting, measurable change through
                  community health camps and education programs.
                </p>
                <p className="text-xs text-gray-400 mt-3 italic">
                  To protect the privacy of our team working in sensitive
                  regions, we share detailed leadership information upon request.
                  Contact us at partnerships@nivaranfoundation.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" ">
        <div className=" w-full  my-8 ">
          <div className="max-w-[1320px] mx-auto">
            <MainTitle
              suffix="Nivaran"
              prefix="Timeline"
              className="[&>span:nth-child(1)]:uppercase"
            />
          </div>
        </div>
        <div className="flex justify-start w-full overflow-x-auto snap-x snap-proximity [scrollbar-width:none] pb-20 pt-4">
          {STORY_CONTENT.map((story) => (
            <StoryCard
              imageSrc={story.image}
              description={story.description}
              title={story.title}
              key={story.id}
              date={story.date}
            />
          ))}
        </div>
      </section>
      <section className="w-full px-4">
        <Suspense>
          <DonationBlock className="px-0" />
        </Suspense>
      </section>
    </div>
  );
}
