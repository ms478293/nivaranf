import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare and Education Programs in Nepal | Nivaran Foundation",
  description:
    "Explore Nivaran Foundation programs in Nepal, including mobile health camps, maternal health outreach, rural healthcare access, and education support for underserved communities.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs",
  },
  keywords: [
    "Nivaran Foundation programs",
    "healthcare programs Nepal",
    "education programs Nepal",
    "mobile health camps Nepal",
    "rural healthcare Nepal",
  ],
  openGraph: {
    title: "Healthcare and Education Programs in Nepal | Nivaran Foundation",
    description:
      "See how Nivaran Foundation delivers mobile healthcare and education support across underserved communities in Nepal.",
    url: "https://www.nivaranfoundation.org/programs",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare and Education Programs in Nepal | Nivaran Foundation",
    description:
      "Mobile health camps, rural healthcare outreach, and education support programs across Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const PROGRAM_CARDS = [
  {
    title: "Healthcare Programs",
    href: "/programs/health",
    label: "Current Priority",
    description:
      "Mobile health camps, community screening, maternal health support, and outreach care for remote communities in Nepal.",
  },
  {
    title: "Project Sanjeevani",
    href: "/sanjeevani",
    label: "Flagship Initiative",
    description:
      "Live progress tracking for Nivaran's mobile health camp rollout across provinces, municipalities, and field teams.",
  },
  {
    title: "Education Programs",
    href: "/programs/education",
    label: "Long-Term Impact",
    description:
      "School access, community-based learning support, and education-focused interventions for underserved children.",
  },
];

const RESOURCE_LINKS = [
  {
    title: "Mobile Health Camps in Nepal",
    href: "/mobile-health-camps-nepal",
    description:
      "Understand how field camps bring doctors, medicines, and screening services closer to remote communities.",
  },
  {
    title: "Rural Healthcare in Nepal",
    href: "/rural-healthcare-nepal",
    description:
      "A practical overview of the access barriers shaping healthcare delivery in rural Nepal.",
  },
  {
    title: "Maternal Health in Nepal",
    href: "/maternal-health-nepal",
    description:
      "Why antenatal care, referral pathways, and maternal outreach remain central to rural health delivery.",
  },
  {
    title: "Health NGO in Nepal",
    href: "/health-ngo-nepal",
    description:
      "See what credible rural health delivery requires beyond awareness campaigns and generic mission language.",
  },
  {
    title: "Free Health Camp Nepal",
    href: "/free-health-camp-nepal",
    description:
      "A practical guide to how free health camps are staffed, organized, and followed up in rural Nepal.",
  },
  {
    title: "Nivaran Fact Sheet",
    href: "/impact-fact-sheet",
    description:
      "A citation-ready overview of our mission, metrics, and reference pages for media and partners.",
  },
  {
    title: "Coverage in Nepal",
    href: "/healthcare-coverage-nepal",
    description:
      "A province-by-province view of where Project Sanjeevani currently operates in Nepal.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="font-Poppins pb-16">
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs" }]} />
      </div>

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_30%),linear-gradient(135deg,#ffffff_0%,#fffaf6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
            <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
              Program Index
            </p>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
              Healthcare and education programs designed for underserved communities in Nepal
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Nivaran Foundation focuses on practical delivery: mobile health camps,
              rural healthcare access, maternal care support, and education
              programs that reduce distance, delay, and cost barriers for families
              who are usually left out of formal systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/programs/health"
                className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                Explore Healthcare Programs
              </Link>
              <Link
                href="/programs/education"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Explore Education Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-[1320px] mx-auto grid gap-6 md:grid-cols-3">
          {PROGRAM_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                {card.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {card.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-medium text-primary-500">
                Explore {card.title} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Where search demand meets program reality
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            People search for mobile health camps, rural healthcare, maternal
            care, and health NGOs in Nepal. These resource pages explain those
            topics with the same language communities, donors, and partners
            actually use when they are trying to understand the problem.
          </p>
          <RelatedContent
            heading="Healthcare Resource Pages"
            links={RESOURCE_LINKS}
            className="mt-4 border-t-0 py-0"
          />
        </div>
      </section>
    </main>
  );
}
