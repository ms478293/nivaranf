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
    "Volunteer with Nivaran Foundation | Create Change in Nepal",
  description:
    "Volunteer with Nivaran Foundation in Nepal. Join health camps, education drives, and community projects. Earn certificates, references, and real-world experience while serving rural communities.",
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

  // Generate Event schema for volunteer programs
  const eventSchemas = programs.map((program) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: program.name,
    startDate: program.startDate,
    endDate: program.endDate,
    location: {
      "@type": "Place",
      name: program.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: program.location,
        addressCountry: "NP",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Nivaran Foundation",
      url: "https://www.nivaranfoundation.org",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: `Volunteer opportunity with Nivaran Foundation: ${program.name} in ${program.location}, Nepal.`,
    url: "https://www.nivaranfoundation.org/volunteer",
  }));

  return (
    <main className="font-Poppins w-full px-4 pb-10">
      {eventSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemas) }}
        />
      )}
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

        {/* Volunteer FAQ Section */}
        <section className="mt-12 max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Do I need medical experience to volunteer?</h3>
              <p className="text-sm text-gray-600">
                No. While healthcare professionals are especially welcome, we have roles for everyone — from logistics and community outreach to data entry and photography. Every skill helps.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How long are volunteer commitments?</h3>
              <p className="text-sm text-gray-600">
                Programs range from 1-week health camp intensives to 3-month placements. Remote volunteers can contribute as little as 5 hours per week on their own schedule.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">What do volunteers receive?</h3>
              <p className="text-sm text-gray-600">
                All volunteers receive a certificate of participation, professional references, and skill-building opportunities. Field volunteers also receive accommodation, meals, and local transportation support during their placement.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Can I volunteer remotely?</h3>
              <p className="text-sm text-gray-600">
                Yes! We welcome remote volunteers for content writing, social media management, graphic design, web development, translation (English/Nepali), and donor communication support.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Where are volunteer programs located?</h3>
              <p className="text-sm text-gray-600">
                Our field programs primarily operate in rural districts of Nepal including Kapilvastu, Rupandehi, Nawalparasi, and other underserved areas. New locations are added with each health camp cycle.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How do I apply to volunteer?</h3>
              <p className="text-sm text-gray-600">
                Sign up through an active program above, or <a href="/contact-us" className="text-primary-500 underline">contact us</a> to express interest. We&apos;ll match you with the right opportunity based on your skills and availability.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
