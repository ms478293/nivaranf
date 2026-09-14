import { createPageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import VolunteerInfoCardSection from "@/components/new/VolunteerInfoCardSection";
import { VolunteerList } from "@/components/new/VolunteerList/VolunteerList";
import { VolunteerHeroGraphic } from "@/components/new/VolunteerHeroGraphic";
import { VOLUNTEER_PROGRAMS } from "@/content/volunteer-programs";
import { Metadata } from "next";
import Link from "next/link";
import { supabase, hasSupabasePublicEnv } from "@/lib/supabase";

export const metadata: Metadata = createPageMetadata({
  "path": "/volunteer",
  "title": "Volunteer in Nepal & Remotely | Nivaran Foundation",
  "description": "Explore field and remote volunteering with Nivaran Foundation. Check opportunities and contact the team about supporting healthcare and community work in Nepal."
});

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
    const dbPrograms: ProgramType[] = [];

    if (hasSupabasePublicEnv) {
      const { data, error } = await supabase
        .from('volunteer_programs')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error("Error fetching programs:", error);
      }

      if (data?.length) {
        dbPrograms.push(
          ...data.map((program: any) => ({
            id: program.id,
            endDate: program.end_date,
            startDate: program.start_date,
            name: program.name,
            location: program.location,
          }))
        );
      }
    }

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

    const today = new Date().toISOString().slice(0, 10);
    return Array.from(merged.values()).filter((program) =>
      /^\d{4}-\d{2}-\d{2}$/.test(program.endDate || "") &&
      Number.isFinite(Date.parse(program.endDate)) && program.endDate >= today
    );
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
        <div className="relative overflow-hidden">
          <VolunteerHeroGraphic />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Volunteer" }]} className="relative z-10 mb-2" />
          <section className="relative z-10 mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
            <PageTitle prefix="Volunteer with Nivaran" suffix="In Nepal and remotely" />

            <p className="text-sm text-gray-600">
              Share your skills in support of communities in Nepal. Explore current
              opportunities, or contact our team about future field roles and remote support.
            </p>
          </section>
        </div>
        <VolunteerInfoCardSection />
        {programs.length > 0 ? (
          <VolunteerList programs={programs} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-gray-800 text-lg font-medium">
              Contact us about volunteering
            </p>
            <p className="text-gray-500 text-sm max-w-md text-center">
              No current volunteer dates are published here. Contact the team about
              upcoming field opportunities and remote support.
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                href="/contact-us"
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

        <div className="max-w-[1320px] mx-auto">
          <RelatedContent
            heading="More Ways to Get Involved"
            links={[
              { title: "Donate", href: "/donate", description: "Your donation directly funds healthcare and education in Nepal." },
              { title: "Careers at Nivaran", href: "/career", description: "Join our full-time team and build a career in global nonprofit work." },
              { title: "Organize Locally", href: "/organize-locally", description: "Lead a health awareness drive or fundraiser in your community." },
              { title: "Our Healthcare Programs", href: "/programs/health", description: "See the mobile health camps your involvement makes possible." },
            ]}
          />
        </div>

        {/* Volunteer FAQ Section */}
        <section className="mt-12 max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Do I need medical experience to volunteer?</h3>
              <p className="text-sm text-gray-600">
                Requirements depend on the role. Clinical work requires the appropriate qualifications and approval; non-clinical support may involve logistics, outreach, research or communications. Contact the team to discuss where your skills may fit.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How long are volunteer commitments?</h3>
              <p className="text-sm text-gray-600">
                The schedule and duration depend on the opportunity. Confirm the expected hours, dates and responsibilities with the team before committing.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">What support is provided?</h3>
              <p className="text-sm text-gray-600">
                Ask the team about training, supervision, expenses and participation documentation for the specific role. Confirm travel, accommodation and other practical arrangements before making plans.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Can I volunteer remotely?</h3>
              <p className="text-sm text-gray-600">
                Contact us about remote support such as research, communications, design or translation. Available roles depend on current needs and your experience.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Where are volunteer programs located?</h3>
              <p className="text-sm text-gray-600">
                Field opportunities are linked to confirmed activities in Nepal. Check current listings for locations and dates; contact us about future opportunities if none are listed.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How do I apply to volunteer?</h3>
              <p className="text-sm text-gray-600">
                Sign up through an active program above, or <a href="/contact-us" className="text-primary-500 underline">contact us</a> to express interest. Share your skills and availability so the team can explain the next steps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
