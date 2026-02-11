import { supabase } from "@/lib/supabase";
import { CareerForm } from "@/components/new/CareerForm/PersonalForm";
import { CareerType } from "../../../page";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    return notFound();
  }

  const career: CareerType = {
    id: job.id,
    jobName: job.title,
    jobType: job.type,
    applyBefore: job.apply_before,
    positionsOpen: job.positions_open,
    introduction: job.introduction,
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    benefits: job.benefits || {},
    additionalInfo: job.additional_info || {},
  };

  return (
    <div className="font-Poppins w-full px-4">
      <div className="max-w-[870px] mx-auto">
        <div>
          <h2 className="text-gray-950 font-medium text-xl">Job Apllication</h2>
          <p className="text-sm text-gray-600">{career.jobName}</p>
        </div>
        <CareerForm career={career} />
      </div>
    </div>
  );
}
