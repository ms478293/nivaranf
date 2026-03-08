import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import TargetedResults from "@/components/new/AboutStatCard/TargetedResults";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import SanjeevaniPhase from "@/components/new/SanjeevaniPhase/SanjeevaniPhase";
import UpcomingProjects from "@/components/new/UpcomingProjects/UpcomingProjects";
import {
  SANJEEVANI_PUBLIC_COPY,
  SANJEEVANI_PUBLIC_STATS,
} from "@/content/sanjeevani-public-stats";
import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import { EXECUTIVE_DASHBOARD, CAMP_MASTER_LOG, PROVINCE_SUMMARY } from "@/content/sanjeevani-tracking-data";
import { SANJEEVANI_FINANCE_MODEL } from "@/content/sanjeevani-finance-model";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Activity, CircleDollarSign, MapPinned, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Project Sanjeevani | Mobile Health Camps Across Rural Nepal",
  description:
    `Project Sanjeevani is Nivaran Foundation's mobile health camp program in Nepal. ${SANJEEVANI_PUBLIC_COPY.summaryWithMunicipalities}`,
  alternates: {
    canonical: "https://www.nivaranfoundation.org/sanjeevani",
  },
  keywords: [
    "Project Sanjeevani",
    "mobile health camps Nepal",
    "rural healthcare Nepal",
    "free health camp Nepal",
    "Nepal health NGO",
  ],
  openGraph: {
    title: "Project Sanjeevani | Mobile Health Camps Across Rural Nepal",
    description: `Mobile health camps and rural healthcare delivery in Nepal. ${SANJEEVANI_PUBLIC_COPY.summaryWithMunicipalities}`,
    url: "https://www.nivaranfoundation.org/sanjeevani",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Sanjeevani | Mobile Health Camps Across Rural Nepal",
    description: `Mobile health camps and rural healthcare delivery in Nepal. ${SANJEEVANI_PUBLIC_COPY.summary}`,
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const page = () => {
  const finance = SANJEEVANI_FINANCE_MODEL;

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
      <section className="w-full px-4 py-6">
        <div className="max-w-[1320px] mx-auto rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.09)]">
          <div className="relative px-6 py-8 md:px-10 md:py-10 bg-[radial-gradient(circle_at_0%_0%,rgba(44,119,187,0.2),transparent_38%),radial-gradient(circle_at_90%_25%,rgba(235,88,52,0.2),transparent_42%),linear-gradient(125deg,#f8fbff_0%,#ffffff_45%,#f8fdfb_100%)]">
            <div className="absolute -top-20 -right-16 w-60 h-60 bg-primary-300/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-10 w-64 h-64 bg-secondary-300/25 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2c77bb] bg-[#eaf3ff] px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Tracking
                  </p>
                  <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05] text-slate-900">
                    Project Progress <span className="text-primary-500">Overview</span>
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-slate-600">
                    Live mission intelligence from Project Sanjeevani across Nepal.
                    Track coverage, care delivery, and investment quality in one
                    unified portal.
                  </p>
                </div>
                <Link
                  href="/sanjeevani/tracking"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_14px_30px_rgba(235,88,52,0.32)]"
                >
                  Open Tracking Portal
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    icon: Users,
                    value: EXECUTIVE_DASHBOARD.totalPatientsServed.toLocaleString(),
                    label: "Patients Served",
                    sub: "Across all camps",
                    valueColor: "text-primary-600",
                  },
                  {
                    icon: Activity,
                    value: EXECUTIVE_DASHBOARD.totalCampsConducted.toString(),
                    label: "Health Camps",
                    sub: `Avg ${EXECUTIVE_DASHBOARD.avgPatientsPerCamp.toLocaleString()} patients/camp`,
                    valueColor: "text-secondary-600",
                  },
                  {
                    icon: MapPinned,
                    value: `${PROVINCE_SUMMARY.length}/7`,
                    label: "Provinces Covered",
                    sub: "Nationwide operational footprint",
                    valueColor: "text-forest-600",
                  },
                  {
                    icon: CircleDollarSign,
                    value: `$${Math.round(finance.currentAnnualOperatingBudget.base / 1000)}K`,
                    label: "Current Annual OPEX",
                    sub: `Variable clinical ~$${finance.variableClinicalCostPerPatient.base.toFixed(1)}; all-in ~$${finance.fullyLoadedCostPerPatient.base.toFixed(1)}/patient`,
                    valueColor: "text-primary-600",
                  },
                ].map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          {stat.label}
                        </p>
                        <p className={`mt-2 text-3xl font-semibold ${stat.valueColor}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <stat.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{stat.sub}</p>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 text-sm leading-7 text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                <span className="font-semibold text-slate-900">Finance reset:</span> the
                verified {` $${Math.round(EXECUTIVE_DASHBOARD.totalSpendingSoFar / 1000)}K `}
                tracked so far reflects variable camp spend. The current two-team program is
                better planned as a {` ~$${Math.round(finance.currentAnnualOperatingBudget.base / 1000)}K/year `}
                operating model with a fully loaded care-delivery cost closer to
                {` ~$${finance.fullyLoadedCostPerPatient.base.toFixed(1)} per patient.`}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Most Recent Camps
                  </h3>
                  <Link
                    href="/sanjeevani/tracking"
                    className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    See all {CAMP_MASTER_LOG.length} camps →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CAMP_MASTER_LOG.slice(-3).reverse().map((camp) => (
                    <div
                      key={camp.campId}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {camp.district}
                        </p>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#fff1eb] text-primary-600">
                          {camp.campId}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {camp.totalPatients.toLocaleString()} patients • {camp.effectiveDays} days
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {new Date(camp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        to{" "}
                        {new Date(camp.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
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
                Tracked Investment So Far
              </span>
              <span className=" text-3xl sm:text-5xl md:text-10xl text-gray-950 -mt-2 ">
                {SANJEEVANI_PUBLIC_STATS.investmentSoFarCompactText}
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
