import { supabase } from "@/lib/supabase";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import VolunteerInfoCardSection from "@/components/new/VolunteerInfoCardSection";
import { VolunteerList } from "@/components/new/VolunteerList/VolunteerList";
import { VolunteerHeroGraphic } from "@/components/new/VolunteerHeroGraphic";
import { VOLUNTEER_PROGRAMS } from "@/content/volunteer-programs";
import { Metadata } from "next";
import Link from "next/link";

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

type ProgramType = {
  id: string | number;
  endDate: string;
  startDate: string;
  name: string;
  location: string;
};

async function getOpenPrograms(): Promise<ProgramType[]> {
  try {
    const { data, error } = await supabase
      .from('volunteer_programs')
      .select('*')
      .eq('status', 'active');

    if (error) {
      console.error("Error fetching programs:", error);
    }

    const dbPrograms = (data || []).map((program: any) => ({
      id: program.id,
      endDate: program.end_date,
      startDate: program.start_date,
      name: program.name,
      location: program.location,
    }));

    const staticPrograms = VOLUNTEER_PROGRAMS.filter(
      (program) => program.status === "active"
    ).map((program) => ({
      id: `static-${program.id}`,
      endDate: program.end_date,
      startDate: program.start_date,
      name: program.name,
      location: program.location,
    }));

    if (dbPrograms.length === 0 && staticPrograms.length === 0) return [];

    const merged = new Map<string, ProgramType>();
    dbPrograms.forEach((program) => {
      merged.set(program.name.toLowerCase(), program);
    });
    staticPrograms.forEach((program) => {
      const key = program.name.toLowerCase();
      if (!merged.has(key)) {
        merged.set(key, program);
      }
    });

    return Array.from(merged.values());
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

export default async function Page() {
  const programs = await getOpenPrograms();

  return (
    <main className="font-Poppins w-full px-4 pb-10">
      <div
        className="relative max-w-[1320px] mx-auto bg-[url('/nivaran_word.png')] bg-no-repeat flex flex-col md:gap-12 overflow-hidden"
        style={{
          backgroundPosition: "top 0% left 40%",
        }}
      >
        <VolunteerHeroGraphic />
        <section className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
          <PageTitle prefix="Join Us in" suffix="Making a Difference" />

          <p className="text-sm text-gray-600">
            Opportunity to contribute to meaningful causes and bring a positive
            impact to the community.
          </p>
        </section>
        <VolunteerInfoCardSection />
        {programs.length > 0 ? (
          <VolunteerList programs={programs} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-gray-800 text-lg font-medium">
              No Active Volunteer Programs Right Now
            </p>
            <p className="text-gray-500 text-sm max-w-md text-center">
              We&apos;re preparing new volunteer opportunities. Contact us to be
              notified when new programs launch.
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-primary-main text-white rounded-lg text-sm font-medium hover:bg-primary-main/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/donate"
                className="px-6 py-2.5 border border-primary-main text-primary-main rounded-lg text-sm font-medium hover:bg-primary-main/5 transition-colors"
              >
                Donate Instead
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
