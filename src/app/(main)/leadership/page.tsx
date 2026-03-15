import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { LeadershipList } from "@/components/new/Leadership/LeadershipList";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { LEADERSHIP_DATA } from "@/content/leadership";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Governance | Nivaran Foundation",
  description:
    "Meet the board, program leadership, operations, communications, and fundraising team behind Nivaran Foundation's healthcare and education work in Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/leadership",
  },
  openGraph: {
    title: "Leadership & Governance | Nivaran Foundation",
    description:
      "Board, program, operations, and fundraising leadership at Nivaran Foundation.",
    url: "https://www.nivaranfoundation.org/leadership",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership & Governance | Nivaran Foundation",
    description:
      "Meet the team responsible for governance, program execution, and organizational accountability at Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const totalLeaders = LEADERSHIP_DATA.reduce(
  (sum, group) => sum + group.members.length,
  0,
);

const leadershipSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nivaran Foundation Leadership",
  itemListElement: LEADERSHIP_DATA.flatMap((group) =>
    group.members.map((member, index) => ({
      "@type": "Person",
      position: index + 1,
      name: member.name,
      jobTitle: member.position,
      worksFor: {
        "@type": "NGO",
        name: "Nivaran Foundation",
        url: "https://www.nivaranfoundation.org",
      },
      department: group.title,
    })),
  ),
};

const governanceFacts = [
  { label: "Board seats listed", value: String(LEADERSHIP_DATA[0]?.members.length || 0) },
  { label: "Leadership roles listed", value: String(totalLeaders) },
  { label: "Legal entity", value: "Nivaran Foundation" },
  { label: "Tax status", value: "501(c)(3)" },
  { label: "EIN", value: "41-2656587" },
  { label: "U.S. office", value: "Arlington, MA" },
];

export default function LeadershipPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <script
        id="Leadership-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipSchema) }}
      />

      <section className="max-w-[1320px] mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Leadership" },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <MainTitle
              suffix="Leadership &"
              prefix="Governance"
              as="h1"
              className="max-w-[620px]"
            />
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              This page is the public reference for the people and functions
              responsible for governance, program oversight, operations,
              communications, and fundraising at Nivaran Foundation.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
              It exists for donor diligence, partner review, media background,
              and basic institutional verification. For legal or compliance
              requests beyond what is published here, use the formal contact
              channel.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {governanceFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-xl font-semibold text-gray-900">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Governance reference
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Nivaran Foundation is a U.S.-registered 501(c)(3) nonprofit with
                field operations focused on underserved communities in Nepal.
                Leadership oversight spans board governance, program delivery,
                finance, fundraising, communications, and operations.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">Nepal base</p>
                <p>Kathmandu, Bagmati, Nepal</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">U.S. coordination office</p>
                <p>1025 Massachusetts Ave, Suite 303, Arlington, MA 02476, USA</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Official contact</p>
                <p>partnerships@nivaranfoundation.org</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Team directory
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            Names and roles below reflect the current public leadership and
            management directory maintained in the site source.
          </p>
          <LeadershipList />
        </section>

        <RelatedContent
          heading="Trust & Verification"
          links={[
            {
              title: "About Nivaran Foundation",
              href: "/about",
              description:
                "Mission, legal status, founder context, and current credibility markers.",
            },
            {
              title: "Financial Reports",
              href: "/financial-reports",
              description:
                "Reporting status, tax-exempt verification path, and due diligence channels.",
            },
            {
              title: "Accountability & Transparency",
              href: "/accountability-and-transparency",
              description:
                "How governance, reporting, and disclosure are handled across the organization.",
            },
            {
              title: "Press & Media Kit",
              href: "/press",
              description:
                "Journalist-facing background, fact sheet, contacts, and brand assets.",
            },
            {
              title: "Advisory Board",
              href: "/advisory-board",
              description:
                "See how external technical and governance review is being structured.",
            },
          ]}
        />
      </section>
    </main>
  );
}
