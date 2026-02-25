import { hasSupabasePublicEnv, supabase } from "@/lib/supabase";
import { EnhancedCareerForm } from "@/components/new/CareerForm/EnhancedCareerForm";
import { CareerType } from "../../../page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JOB_OPENINGS } from "@/content/job-openings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: job } = hasSupabasePublicEnv
    ? await supabase.from("jobs").select("title").eq("id", id).single()
    : { data: null };
  const staticJob =
    JOB_OPENINGS.find((opening) => `static-${opening.id}` === id) ||
    JOB_OPENINGS.find((opening) => String(opening.id) === id);

  return {
    title: `Apply for ${job?.title || staticJob?.title || 'Position'} | Nivaran Foundation`,
    description: `Submit your application for ${job?.title || staticJob?.title || 'this position'} at Nivaran Foundation. Join our team in delivering healthcare and education to Nepal's underserved communities.`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job, error } = hasSupabasePublicEnv
    ? await supabase.from("jobs").select("*").eq("id", id).single()
    : { data: null, error: null };

  const staticJob =
    JOB_OPENINGS.find((opening) => `static-${opening.id}` === id) ||
    JOB_OPENINGS.find((opening) => String(opening.id) === id);

  if (error && !staticJob) {
    return notFound();
  }

  if (!job && !staticJob) {
    return notFound();
  }

  const career: CareerType = job
    ? {
        id: job.id,
        jobName: job.title,
        jobType: job.type,
        jobLocation: job.location ?? job.jobLocation ?? job.type,
        applyBefore: job.apply_before,
        positionsOpen: job.positions_open,
        introduction: job.introduction,
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        benefits: job.benefits || {},
        additionalInfo: job.additional_info || {},
      }
    : {
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

  return (
    <div className="font-Poppins w-full px-4 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-gray-950 font-semibold text-2xl md:text-3xl mb-2">
            Job Application
          </h1>
          <p className="text-lg text-gray-700 font-medium">{career.jobName}</p>
          <p className="text-sm text-gray-500 mt-1">
            Deadline: {new Date(career.applyBefore).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <EnhancedCareerForm career={career} />
      </div>
    </div>
  );
}
