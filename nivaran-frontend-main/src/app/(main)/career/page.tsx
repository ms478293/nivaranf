import { supabase } from "@/lib/supabase";
import { CareersInfoList } from "@/components/new/Careers/CareersInfoList";
import { CareersList } from "@/components/new/Careers/CareersList";
import { CareerSidebar } from "@/components/new/CareerSidebar/CareerSidebar";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Career at Nivaran Foundation",
  description:
    " Explore career opportunities at Nivaran Foundation. Discover how you can contribute to our mission and make a difference",
  alternates: {
    canonical: "https://nivaranfoundation.org/career",
  },
};

export type CareerType = {
  id: string | number;
  jobName: string;
  jobType: string;
  applyBefore: string;
  positionsOpen: number;
  introduction: string;
  responsibilities: string[];
  requirements: string[];
  benefits: Record<string, string>;
  additionalInfo: Record<string, string>;
};

export const dynamicParams = true;

async function getCareerOpenings(): Promise<CareerType[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active');
      
    if (error) {
      console.error("Error fetching careers:", error);
      return [];
    }

    if (!data) return [];

    return data.map((job: any) => ({
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
    }));
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

export default async function page() {
  const career = await getCareerOpenings();

  return (
    <main className="w-full px-4 font-Poppins pb-10">
      <div className="max-w-[1320px] mx-auto">
        <section className="mb-4 md:mb-20 flex flex-col gap-2">
          <PageTitle prefix="Join us and" suffix="empower your future" />
          <p className="text-sm text-gray-600 mt-4">
            Unlock your potential and grow with a team that inspires success.
          </p>
        </section>
        <CareersInfoList />
        <div className="flex flex-col md:gap-2 md:mt-20 md:mb-10 ">
          <MainTitle suffix="Current" prefix="Opening" />
          <p className="text-sm text-gray-600">
            Apply now and help us shape better future
          </p>
        </div>

        <section className="mt-4 flex flex-col md:flex-col-reverse lg:flex-row gap-10">
          <div className="flex flex-col flex-grow gap-4">
            {career.length === 0 ? (
              <div className="text-center h-full flex flex-col items-center justify-center gap-4 py-16">
                <p className="text-gray-800 text-lg font-medium">
                  No Job Openings Right Now
                </p>
                <p className="text-gray-500 text-sm max-w-md">
                  We don&apos;t have any open positions at the moment, but we&apos;re always looking for passionate individuals. Check back soon or reach out to us directly.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 px-6 py-2.5 bg-primary-main text-white rounded-lg text-sm font-medium hover:bg-primary-main/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <RenderList
                data={career}
                render={(c, i) => (
                  <CareersList key={i} career={c as CareerType} />
                )}
              />
            )}
          </div>
          <div className="lg:max-w-[430px]">
            <CareerSidebar />
          </div>
        </section>
      </div>
    </main>
  );
}
