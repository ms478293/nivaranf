import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import TargetedResults from "@/components/new/AboutStatCard/TargetedResults";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import SanjeevaniPhase from "@/components/new/SanjeevaniPhase/SanjeevaniPhase";
import UpcomingProjects from "@/components/new/UpcomingProjects/UpcomingProjects";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { EXECUTIVE_DASHBOARD, CAMP_MASTER_LOG, PROVINCE_SUMMARY } from "@/content/sanjeevani-tracking-data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Sanjeevani - Empowering Communities Across Nepal",
  description:
    "Project Sanjeevani brings healthcare to communities in Nepal, improving lives and making a lasting impact on thousands. Join us today.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/sanjeevani",
  },
  openGraph: {
    title: "Project Sanjeevani | Nivaran Foundation",
    description: "Bringing healthcare to communities in Nepal, improving lives and making a lasting impact on thousands.",
    url: "https://www.nivaranfoundation.org/sanjeevani",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Sanjeevani | Nivaran Foundation",
    description: "Empowering communities across Nepal with healthcare access.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const page = () => {
  return (
    <main className=" pt-20 font-Poppins flex flex-col gap-10">
      <section className=" w-full px-4">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-8 items-center">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs/health" }, { label: "Sanjeevani" }]} className="self-start" />
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

          <Link
            href="/sanjeevani/tracking"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-md hover:shadow-lg"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            Live Project Tracking Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Tracking Overview Section ── */}
      <section className="w-full px-4">
        <div className="max-w-[1320px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[1px]">
            {/* Gradient border shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 via-secondary-500/30 to-emerald-500/30 rounded-3xl blur-sm" />

            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 md:p-10">
              {/* Decorative dots */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Header row */}
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Live Tracking</span>
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold">
                    Project Progress <span className="text-primary-400">Overview</span>
                  </h2>
                  <p className="text-gray-400 text-sm mt-1 max-w-md">
                    Real-time metrics from our rural health camps across Nepal — building a healthier future, one village at a time.
                  </p>
                </div>
                <Link
                  href="/sanjeevani/tracking"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white pl-6 pr-5 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] shrink-0"
                >
                  View Full Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Stats grid */}
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: "🏥",
                    value: EXECUTIVE_DASHBOARD.totalPatientsServed.toLocaleString(),
                    label: "Patients Served",
                    color: "from-primary-500/20 to-primary-500/5",
                    textColor: "text-primary-400",
                    borderColor: "border-primary-500/20",
                  },
                  {
                    icon: "⛺",
                    value: EXECUTIVE_DASHBOARD.totalCampsConducted.toString(),
                    label: "Health Camps",
                    color: "from-secondary-500/20 to-secondary-500/5",
                    textColor: "text-secondary-400",
                    borderColor: "border-secondary-500/20",
                  },
                  {
                    icon: "🗺️",
                    value: `${PROVINCE_SUMMARY.length}/7`,
                    label: "Provinces Covered",
                    color: "from-emerald-500/20 to-emerald-500/5",
                    textColor: "text-emerald-400",
                    borderColor: "border-emerald-500/20",
                  },
                  {
                    icon: "💰",
                    value: `$${Math.round(EXECUTIVE_DASHBOARD.totalSpendingSoFar / 1000)}K`,
                    label: "Total Investment",
                    color: "from-amber-500/20 to-amber-500/5",
                    textColor: "text-amber-400",
                    borderColor: "border-amber-500/20",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-b ${stat.color} border ${stat.borderColor} rounded-2xl p-4 md:p-5 text-center backdrop-blur-sm`}
                  >
                    <span className="text-2xl md:text-3xl">{stat.icon}</span>
                    <p className={`text-2xl md:text-3xl font-extrabold ${stat.textColor} mt-2`}>{stat.value}</p>
                    <p className="text-gray-400 text-[11px] md:text-xs uppercase tracking-wider font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent camps mini-list */}
              <div className="relative mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-300 text-sm font-semibold">Recent Camps</h3>
                  <Link href="/sanjeevani/tracking" className="text-primary-400 text-xs hover:text-primary-300 transition-colors">
                    See all {CAMP_MASTER_LOG.length} camps →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CAMP_MASTER_LOG.slice(-3).reverse().map((camp) => (
                    <div key={camp.campId} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-primary-500/15 flex items-center justify-center text-primary-400 text-xs font-bold">
                        {camp.campId.replace("SC-", "#")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{camp.district}</p>
                        <p className="text-gray-500 text-xs truncate">{camp.totalPatients.toLocaleString()} patients · {camp.effectiveDays} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
              <span className=" text-3xl sm:text-5xl md:text-10xl text-gray-950 -mt-2 ">
                $18 M
              </span>
            </h2>

            <div className="flex flex-col gap-2 -mt-10 ">
              <h4 className="text-gray-800 text-center">Targeted results </h4>
              <TargetedResults />
            </div>

            <div className="flex flex-col md:flex-row justify-between  gap-8 -mt-8 md:-mt-0">
              <div className="flex   flex-col items-start md:max-w-[600px] md:w-full gap-4">
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
      <span className="text-primary-500 text-3xl md:text-5xl font-medium font-Poppins">
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
