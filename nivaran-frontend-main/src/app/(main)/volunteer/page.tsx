import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import VolunteerInfoCardSection from "@/components/new/VolunteerInfoCardSection";
import { VolunteerList } from "@/components/new/VolunteerList/VolunteerList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Volunteer with Nivaran Foundation - Create Change",
  description:
    " Make a difference by volunteering with Nivaran Foundation. Discover how your contribution can create lasting change in communities worldwide",
  alternates: {
    canonical: "https://nivaranfoundation.org/volunteer",
  },
};

export const dynamicParams = true;

export default async function Page() {
  const programRes = await fetch(
    "https://api.nivaranfoundation.org/api/programs/all-open/1",
    { cache: "no-store" }
  );

  const programsList = await programRes.json();

  console.log("PROGRAM", programsList);

  const programs = programsList?.programs.map((program) => ({
    id: program.id,
    endDate: program.endDate,
    startDate: program.startDate,
    name: program.name,
    location: program.location,
  }));

  console.log("PROGRAMS", programs);

  return (
    <main className="font-Poppins w-full px-4  pb-10">
      <div
        className="max-w-[1320px] mx-auto bg-[url('/nivaran_word.png')] bg-no-repeat flex flex-col md:gap-12"
        style={{
          backgroundPosition: "top 0% left 40%",
        }}
      >
        <section className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
          <PageTitle prefix="Join Us in" suffix="Making a Difference" />

          <p className="text-sm text-gray-600">
            Opportunity to contribute to meaningful causes and bring a positive
            impact to the community.
          </p>
        </section>
        <VolunteerInfoCardSection />
        {/* <p>No Active Camps for now</p> */}
        <VolunteerList programs={programs} />
      </div>
    </main>
  );
}
