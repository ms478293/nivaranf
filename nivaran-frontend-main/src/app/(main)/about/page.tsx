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

export const metadata: Metadata = {
  title: "Nivaran Foundation | About Us",
  description:
    "Learn more about Nivaran Foundation’s mission, values, and commitment to making a positive impact. Discover how we’re working towards a better future",
  alternates: {
    canonical: "https://nivaranfoundation.org/about",
  },
};

export default function page() {
  return (
    <div className="w-full  font-Poppins ">
      <section className="relative w-full">
        <div className="h-[160%] w-full   sm:-top-[24.5rem] md:-top-52 -top-72 absolute -z-10">
          <Image
            src="/why-nivaran/about-cover.jpeg"
            alt="Sanjeevani Imgage"
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
            Nivaran Foundation is a non-profit organization committed to
            creating a meaningful and lasting impact in the lives of individuals
            and communities. Through sustainable solutions, awareness
            initiatives, and empowerment programs, we work to address the most
            pressing challenges faced by underserved populations.
          </p>
          <p className="text-gray-800 font-normal text-center ">
            We are dedicated to reaching the unreachable, with a vision to
            transform lives by addressing critical challenges such as limited
            access to healthcare and education, inadequate child protection,
            environmental degradation, and low community engagement.
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
                development initiatives that tackle critical issues in
                healthcare, education, environment, child welfare and community
                development
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
      </section>

      <div className="flex flex-col items-center gap-6 mt-20 ">
        <h1
          className={
            "flex flex-wrap gap-x-3 items-center font-Oswald text-xl/10 sm:text-2xl/10 md:text-[40px]/10   border-l-4   border-primary-500 px-2 max-[362px]:h-16 sm:h-10 mb-2 justify-center w-fit"
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
        </h1>
        <p className="text-gray-800 font-normal text-center text-sm max-w-[650px] mx-auto px-4">
          Nivaran Foundation was born from a personal encounter with the dire
          need for sustainable solutions in underprivileged communities.
          Committed to creating lasting change, we focus on five key areas:
          healthcare, education, environmental stewardship, child welfare, and
          community development. Through compassion, innovation, and action, we
          aim to empower underserved communities and make a meaningful, lasting
          impact by bridging these critical gaps.
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
                  Nivaran&apos;s 5 Pillars of Transformation address
                  interconnected needs, creating a synergistic impact for
                  lasting change.
                </p>
              </div>
            </AboutNivaran>
          </section>
        </div>
      </div>

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
