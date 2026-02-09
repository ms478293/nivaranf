import { CareersInfoList } from "@/components/new/Careers/CareersInfoList";
import { CareersList } from "@/components/new/Careers/CareersList";
import { CareerSidebar } from "@/components/new/CareerSidebar/CareerSidebar";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Career at Nivaran Foundation",
  description:
    " Explore career opportunities at Nivaran Foundation. Discover how you can contribute to our mission and make a difference",
  alternates: {
    canonical: "https://nivaranfoundation.org/career",
  },
};

export type CareerType = {
  id: number;
  jobName: string;
  jobType: string;
  applyBefore: string; // ISO 8601 date string
  positionsOpen: number;
  introduction: string;
  responsibilities: string[];
  requirements: string[];
  benefits: Record<string, string>; // Key-value pairs where both key and value are strings
  additionalInfo: Record<string, string>; // Key-value pairs where both key and value are strings
};

export const dynamicParams = true;

export default async function page() {
  const careerRes = await fetch(
    "https://api.nivaranfoundation.org/api/carrer/open-job-openings",
    { cache: "no-store" }
  );

  const career = await careerRes.json();

  console.log("CAREER", career);

  return (
    <main className="w-full px-4 font-Poppins  pb-10">
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

        <section className="mt-4 flex flex-col md:flex-col-reverse lg:flex-row  gap-10">
          <div className="flex flex-col flex-grow gap-4">
            {career.length === 0 ? (
              <p className="text-center h-full flex items-center justify-center text-gray-800">
                No Job Opening Right now :(
              </p>
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
