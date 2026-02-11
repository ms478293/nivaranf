import TargetedResults from "@/components/new/AboutStatCard/TargetedResults";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import SanjeevaniPhase from "@/components/new/SanjeevaniPhase/SanjeevaniPhase";
import UpcomingProjects from "@/components/new/UpcomingProjects/UpcomingProjects";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Sanjeevani - Empowering Communities Across Nepal",
  description:
    "Project Sanjeevani brings healthcare to communities in Nepal, improving lives and making a lasting impact on thousands. Join us today.",
  alternates: {
    canonical: "https://nivaranfoundation.org/sanjeevani",
  },
};

const page = () => {
  return (
    <main className=" pt-20 font-Poppins flex flex-col gap-10">
      <section className=" w-full px-4">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-8 items-center">
          <div className="flex items-center flex-col">
            <SanjeevaniHeader />

            <p className="px-3 py-0.5 bg-secondary-200 text-secondary-800 w-fit rounded-full text-sm text-center">
              Part of Our Healthcare Initiatives
            </p>
          </div>

          <p className="text-gray-800 text-center max-w-[500px]">
            &quot; Empowering lives by bridging gaps in healthcare access and
            education through community-driven solutions. &quot;
          </p>
        </div>
      </section>

      <section className="w-full relative">
        <div className="w-full h-[140%] -top-10 absolute -z-10">
          <Image
            src="/bg-sanjeevani.jpeg"
            alt="Sanjeevani Image"
            width={1200}
            height={1200}
            className="w-full h-full block object-center object-cover grayscale"
          />
          <div className="absolute w-full h-full top-0 bg-[linear-gradient(#ffffff_30%,#ffffff9d,#fff_70%)]"></div>
        </div>

        <div className="w-full px-4">
          <div className="max-w-[1320px] mx-auto flex flex-col gap-20">
            <h2 className="flex flex-col  text-center -mb-4">
              <span className="text-lg font-medium text-gray-800  ">
                Total Phase-I Budget?
              </span>
              <span className=" text-5xl md:text-10xl text-gray-950 -mt-2 ">
                $18 M
              </span>
            </h2>

            <div className="flex flex-col gap-2 -mt-10 ">
              <h4 className="text-gray-800 text-center">Targeted results </h4>
              <TargetedResults />
            </div>

            <div className="flex flex-col md:flex-row justify-between  gap-8 -mt-8 md:-mt-0">
              <div className="flex   flex-col items-start md:w-[600px] gap-4">
                <MainTitle
                  suffix="About"
                  prefix="SANJEEVANI"
                  key={"about-sanjeevani"}
                />
                <p className="text-sm text-gray-600 flex flex-col  md:items-start  gap-4">
                  <span>
                    Project Sanjeevani is the most ambitious initiative set to
                    transform healthcare across the years 2025, 2026, and 2027,
                    dedicated to making healthcare accessible, affordable, and
                    sustainable for all.
                  </span>
                  <span>
                    In a world where healthcare disparities are widespread,
                    Project Sanjeevani aims to bridge the gap between advanced
                    medical care and communities that have long been left
                    behind. This initiative brings quality healthcare directly
                    to the doorsteps of those who need it most.
                  </span>
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <SanjeevaniDescription
                  key={"our Mission"}
                  title="Our Mission"
                  description="Ensure equitable access to quality healthcare by implementing a
            phased approach that enhances early disease detection, expands
            healthcare centers, and establishes comprehensive medical
            facilities. Our goal is to improve community well-being by providing
            advanced medical services to undeserved."
                />
                <SanjeevaniDescription
                  key={"Our Vision"}
                  title="Our Vision"
                  description="Create a future where every individual, regardless of location, has access to essential healthcare services. By developing a nationwide network of hospitals and medical centers, we aspire to build a healthier society with reduced health gaps and improved quality of life."
                />
              </div>
            </div>

            <div>
              <SanjeevaniPhase />
            </div>
            {/* </section> */}
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:my-10">
        <div className="max-w-[1320px] mx-auto">
          <MainTitle
            prefix="SANJEEVANI"
            suffix="Timeline"
            key="sanjeevani-timeline"
          />
          {/* <SanjeevaniTimeLIne /> */}
          <div className="w-full h-full flex ">
            <Image
              src="/timelinelarge.png"
              alt="Timeline Image"
              width={2000}
              height={2000}
              className="hidden invisible md:block md:visible -mb-6"
            />
            <Image
              src="/timelineSmall.png"
              alt="Timeline Image"
              width={1200}
              height={1200}
              className="md:hidden md:invisible visible block scale-75 -mt-20 -mb-28"
            />
          </div>
        </div>
      </section>

      <UpcomingProjects
        className="bg-transparent mb-6 px-4"
        data={UPCOMING_PROJECTS_DATA.slice(0, 4)}
      >
        <MainTitle
          suffix="Upcoming"
          prefix="Projects"
          className="-mb-4 md:mb-0"
        />
      </UpcomingProjects>
    </main>
  );
};

const SanjeevaniHeader = () => {
  return (
    <h1 className="flex flex-col  items-center ">
      <span className="text-gray-800 text-xl md:text-2xl/8 font-medium">
        Project
      </span>
      <span className="text-primary-500 text-3xl md:text-5xl font-medium font-Outfit">
        SANJEEVANI
      </span>
    </h1>
  );
};

const SanjeevaniDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:max-w-[300px]">
      <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default page;
