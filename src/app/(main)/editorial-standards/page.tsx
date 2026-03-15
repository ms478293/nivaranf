import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Standards | Nivaran Foundation",
  description:
    "How Nivaran Foundation handles sourcing, corrections, healthcare content boundaries, author attribution, and public-interest reporting standards.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/editorial-standards",
  },
  openGraph: {
    title: "Editorial Standards | Nivaran Foundation",
    description:
      "Public standards for sourcing, corrections, bylines, and healthcare content boundaries at Nivaran Foundation.",
    url: "https://www.nivaranfoundation.org/editorial-standards",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Standards | Nivaran Foundation",
    description:
      "How Nivaran Foundation approaches source quality, corrections, and public-interest reporting.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const standards = [
  {
    title: "Source quality before speed",
    text:
      "Public pages and articles should be grounded in firsthand program records, official data, or clearly attributable external sources. We prefer named institutions, direct documents, and primary reporting over recycled summaries.",
  },
  {
    title: "Healthcare content boundaries",
    text:
      "Healthcare topic pages are educational overviews of access barriers, service-delivery models, and referral logic. They are not personal medical advice and should not be read as a substitute for diagnosis or emergency care.",
  },
  {
    title: "Corrections and updates",
    text:
      "When public information changes materially, we update the page rather than leaving contradictory claims live. The site now treats current program numbers, official organization details, and route-level metadata as a shared source of truth.",
  },
  {
    title: "Attribution and bylines",
    text:
      "Where a story is authored by a team rather than an individual, we identify it as an editorial team product instead of implying a personal byline that does not exist. As more named contributors are published, public bylines should become more specific.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1100px] mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Editorial Standards" },
          ]}
        />

        <div className="mt-6 rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_30%),linear-gradient(135deg,#ffffff_0%,#fffaf6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
            Public standards
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
            Editorial standards for reporting, healthcare explainers, and public claims
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            This page explains how Nivaran Foundation handles sourcing,
            attribution, corrections, and healthcare-content boundaries. It
            exists so readers, donors, journalists, and partners can understand
            how public information is produced and maintained on this site.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {standards.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            How this applies on the site
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              The Sanjeevani tracking portal, coverage pages, care-model page,
              leadership page, and financial-reporting routes are part of the
              same trust surface. Public claims should match those references,
              not drift into outdated campaign language.
            </p>
            <p>
              Topic pages such as mobile health camps, rural healthcare, and
              maternal health are written as public-interest explainers. When we
              cite external evidence, we prefer official data and institutional
              sources so readers can inspect the underlying reference directly.
            </p>
            <p>
              If you need a correction, clarification, or supporting document
              beyond what is published here, use the contact route and specify
              the page in question.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="inline-flex min-h-[44px] items-center rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600"
            >
              Request a correction
            </Link>
            <Link
              href="/care-model"
              className="inline-flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Review care model
            </Link>
          </div>
        </section>

        <RelatedContent
          heading="Related trust pages"
          links={[
            {
              title: "Leadership & Governance",
              href: "/leadership",
              description:
                "Public leadership directory and governance reference.",
            },
            {
              title: "Care Model & Quality Standards",
              href: "/care-model",
              description:
                "How Nivaran describes healthcare delivery quality, referral discipline, and safeguards.",
            },
            {
              title: "Accountability & Transparency",
              href: "/accountability-and-transparency",
              description:
                "Disclosure, governance, and operational accountability commitments.",
            },
            {
              title: "Financial Reports",
              href: "/financial-reports",
              description:
                "Organization details, reporting status, and diligence pathways.",
            },
          ]}
        />
      </section>
    </main>
  );
}
