import { hasSupabasePublicEnv, supabase } from "@/lib/supabase";
import { TouchIcon } from "@/assets/icons/TouchIcon";
import { CareersDescriptionList } from "@/components/new/Careers/CareersDescriptionList";
import { JobSharemodal } from "@/components/new/JobShareModal/JobSharemodal";
import { AppButton } from "@/components/ui/app-button";
import { JOB_OPENINGS } from "@/content/job-openings";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CareerType } from "../page";

type JobRow = {
  id: string;
  title: string;
  type: string;
  location?: string;
  jobLocation?: string;
  apply_before: string;
  positions_open: number;
  introduction: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: Record<string, string>;
  additional_info?: Record<string, string>;
};

async function getCareerById(id: string): Promise<CareerType | null> {
  const { data: job, error } = hasSupabasePublicEnv
    ? await supabase.from("jobs").select("*").eq("id", id).single()
    : { data: null, error: null };

  const staticJob =
    JOB_OPENINGS.find((opening) => `static-${opening.id}` === id) ||
    JOB_OPENINGS.find((opening) => String(opening.id) === id);

  if (error && !staticJob) {
    console.error("Error fetching job:", error);
    return null;
  }

  if (!job && !staticJob) {
    return null;
  }

  const typedJob = job as JobRow | null;

  if (typedJob) {
    return {
      id: typedJob.id,
      jobName: typedJob.title,
      jobType: typedJob.type,
      jobLocation: typedJob.location ?? typedJob.jobLocation ?? typedJob.type,
      applyBefore: typedJob.apply_before,
      positionsOpen: typedJob.positions_open,
      introduction: typedJob.introduction,
      responsibilities: typedJob.responsibilities || [],
      requirements: typedJob.requirements || [],
      benefits: typedJob.benefits || {},
      additionalInfo: typedJob.additional_info || {},
    };
  }

  return {
    id: `static-${staticJob!.id}`,
    jobName: staticJob!.title,
    jobType: staticJob!.type,
    jobLocation: staticJob!.location,
    applyBefore: staticJob!.apply_before,
    positionsOpen: staticJob!.positions_open,
    introduction: staticJob!.introduction,
    responsibilities: staticJob!.responsibilities || [],
    requirements: staticJob!.requirements || [],
    benefits: staticJob!.benefits || {},
    additionalInfo: staticJob!.additional_info || {},
  };
}

function buildJobMetadata(career: CareerType, id: string): Metadata {
  const title = `${career.jobName} | Careers at Nivaran Foundation`;
  const description =
    (career.introduction || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) ||
    `Apply for ${career.jobName} at Nivaran Foundation and help advance healthcare and education in Nepal.`;

  const canonical = `https://www.nivaranfoundation.org/career/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords: [
      "Nivaran Foundation careers",
      "NGO jobs Nepal",
      career.jobName,
      career.jobType,
      career.jobLocation,
    ],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Nivaran Foundation",
      type: "website",
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
      title,
      description,
      site: "@NivaranOrg",
      creator: "@NivaranOrg",
      images: ["https://www.nivaranfoundation.org/logo.png"],
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const career = await getCareerById(id);

  if (!career) {
    return {
      title: "Career Opportunity | Nivaran Foundation",
      description:
        "Explore open roles at Nivaran Foundation and support healthcare and education in Nepal.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildJobMetadata(career, id);
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const career = await getCareerById(id);

  if (!career) {
    return notFound();
  }

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: career.jobName,
    description: career.introduction,
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: career.applyBefore,
    employmentType: career.jobType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Nivaran Foundation",
      sameAs: "https://www.nivaranfoundation.org",
      logo: "https://www.nivaranfoundation.org/logo.png",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Nivaran Foundation",
      value: String(career.id),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.jobLocation,
        addressCountry: "NP",
      },
    },
    directApply: true,
  };

  return (
    <div className="font-Poppins w-full px-4 pb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />

      <section className="max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-4  mb-6 md:mb-10">
          <h2 className="text-xl md:text-4xl text-gray-950 font-medium leading-10">
            {career.jobName}
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-4 text-gray-600 text-sm ">
              <p>Location: {career.jobLocation ?? career.jobType}</p> |{" "}
              <p>Type: {career.jobType}</p> |{" "}
              <p>Number of position: {career.positionsOpen}</p> |{" "}
              <p>Deadline: {career.applyBefore.substring(0, 10)}</p>
            </div>
            <div className="flex items-center  ">
              <Link href={`/career/${career.id}/c/apply`}>
                <AppButton
                  variant="primary"
                  className="text-sm font-normal hover:border-transparent hover:bg-primary-200 hover:text-primary-500 flex gap-2 items-center group"
                  size="sm"
                >
                  <TouchIcon className="w-4 h-4 stroke-neutral-50 group-hover:stroke-primary-500 transition-all duration-200" />
                  <span>Apply now</span>
                </AppButton>
              </Link>

              <JobSharemodal />
            </div>
          </div>
        </div>
        <p className="text-gray-800 font-light mt-4">{career.introduction}</p>

        <CareersDescriptionList items={career} />
      </section>
    </div>
  );
}
