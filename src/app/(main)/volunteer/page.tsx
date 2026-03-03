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

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Volunteer with Nivaran Foundation - Create Change",
  description:
    "Make a difference by volunteering with Nivaran Foundation. Discover how your contribution can create lasting change in communities worldwide.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/volunteer",
  },
  openGraph: {
    title: "Volunteer with Us | Nivaran Foundation",
    description: "Make a difference by volunteering with Nivaran Foundation. Create lasting change in communities worldwide.",
    url: "https://www.nivaranfoundation.org/volunteer",
    siteName: "Nivaran Foundation",
    type: "website",
    images: [{ url: '/NivaranLogo.svg', width: 1200, height: 630, alt: 'Nivaran Foundation' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer with Us | Nivaran Foundation",
    description: "Make a difference by volunteering with Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
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
        <div className="relative overflow-hidden">
          <VolunteerHeroGraphic />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Volunteer" }]} className="mb-2" />
          <section className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
            <PageTitle prefix="Join Us in" suffix="Making a Difference" />

            <p className="text-sm text-gray-600">
              Opportunity to contribute to meaningful causes and bring a positive
              impact to the community.
            </p>
          </section>
        </div>
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
              { title: "Donate", href: "/donate", description: "Your tax-deductible donation directly funds healthcare and education in Nepal." },
              { title: "Careers at Nivaran", href: "/career", description: "Join our full-time team and build a career in global nonprofit work." },
              { title: "Organize Locally", href: "/organize-locally", description: "Lead a health awareness drive or fundraiser in your community." },
              { title: "Our Healthcare Programs", href: "/programs/health", description: "See the mobile health camps your involvement makes possible." },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
