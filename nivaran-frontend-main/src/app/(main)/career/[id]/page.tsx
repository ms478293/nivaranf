import { supabase } from "@/lib/supabase";
import { TouchIcon } from "@/assets/icons/TouchIcon";
import { CareersDescriptionList } from "@/components/new/Careers/CareersDescriptionList";
import { JobSharemodal } from "@/components/new/JobShareModal/JobSharemodal";
import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { CareerType } from "../page";
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
    console.error("Error fetching job:", error);
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
    <div className="font-Poppins w-full  px-4 pb-6">
      {/* <div className="h-[40vh] w-full bg-black"></div> */}

      <section className="max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-4  mb-6 md:mb-10">
          <h2 className="text-xl md:text-4xl text-gray-950 font-medium leading-10">
            {career.jobName}
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-4 text-gray-600 text-sm ">
              <p>Location: {career.jobType}</p> |{" "}
              <p>Number of position: {career.positionsOpen}</p> |{" "}
              <p>Deadline: {career.applyBefore.substring(0, 10)}</p>
            </div>
            <div className="flex items-center  ">
              <Link href={`/career/${career.id}/c/apply`}>
                <AppButton
                  variant="primary"
                  // className="ml-4 text-base hover:text-primary-500"
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
        {/* <RenderList
            data={JOB_DESCRIPTION_DATA.list}
            render={(list, i) => (
              <CareersDescriptionList key={i} items={list} />
            )}
          /> */}
      </section>
    </div>
  );
}
