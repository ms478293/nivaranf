import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ChartSpline, Globe, Handshake, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { CorporateCSRForm } from "@/components/new/CSR/CorporateCSRForm";
import { ContactCardList } from "@/components/new/ContactCardList/ContactCardList";

export const metadata: Metadata = {
  title: "Corporate CSR Partnerships | Nivaran Foundation",
  description:
    "Build high-impact CSR partnerships with Nivaran Foundation. Learn global and US-facing benefits, implementation models, compliance standards, and submit a corporate CSR inquiry.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/corporate",
  },
  keywords: [
    "CSR partnership",
    "corporate social responsibility Nepal",
    "MNC CSR program",
    "ESG implementation partner",
    "healthcare CSR",
    "employee volunteering",
    "cause marketing partnership",
  ],
};

const impactPillars = [
  {
    title: "High-Need Healthcare Access",
    body: "Programs are concentrated where distance and infrastructure gaps create the most severe care deficits, so your CSR investment serves populations with measurable unmet need.",
    icon: Globe,
  },
  {
    title: "Execution Discipline",
    body: "Field execution is structured around local coordination, logistics planning, and documented delivery workflows to reduce leakage and improve implementation reliability.",
    icon: ChartSpline,
  },
  {
    title: "Transparent Reporting",
    body: "Partnerships are supported through impact narratives, activity snapshots, and milestone reporting aligned with your internal communications and governance expectations.",
    icon: ShieldCheck,
  },
  {
    title: "Brand & Workforce Alignment",
    body: "You can connect CSR outcomes with employee engagement, stakeholder trust, and long-term brand positioning across global and regional markets.",
    icon: TrendingUp,
  },
];

const partnershipTracks = [
  {
    title: "Strategic CSR Programs",
    summary:
      "Multi-month or multi-year partnerships aligned to your ESG goals, geography priorities, and annual social investment cycle.",
  },
  {
    title: "Program Sponsorships",
    summary:
      "Sponsor targeted programs including maternal health, child health, remote health camps, and preventive care interventions.",
  },
  {
    title: "Employee Engagement",
    summary:
      "Activate internal teams through campaigns, skill-based volunteering, and matched-giving frameworks linked to your culture strategy.",
  },
  {
    title: "Cause Marketing",
    summary:
      "Build co-branded campaigns where a product, event, or market activation directly supports healthcare outcomes in underserved regions.",
  },
  {
    title: "In-Kind & Technical Support",
    summary:
      "Contribute technology, analytics, logistics support, product resources, or expert advisory capacity to strengthen impact delivery.",
  },
  {
    title: "Emergency Health Response",
    summary:
      "Rapid deployment support for health response periods where speed, field coordination, and operational flexibility are critical.",
  },
];

const benefitCards = [
  {
    title: "Global Business Value",
    text: "Demonstrate credible social impact outcomes in high-need geographies while strengthening stakeholder trust among customers, partners, investors, and employees.",
  },
  {
    title: "US-Facing Benefit Considerations",
    text: "Where applicable, partnerships with qualified nonprofit channels can support tax-efficient philanthropy and compliance visibility. Your legal/tax counsel should confirm structure-specific treatment.",
  },
  {
    title: "ESG & Governance Relevance",
    text: "A structured health-access partnership can support ESG reporting narratives, social-impact commitments, and board-level accountability requirements.",
  },
  {
    title: "Employer Brand & Retention",
    text: "Purpose-driven programs can improve employee motivation, engagement participation, and internal loyalty, especially when impact is visible and communicated clearly.",
  },
];

const processSteps = [
  {
    title: "1. Discovery & Objective Mapping",
    text: "We align your CSR objectives, regions of interest, target timelines, governance expectations, and communication requirements.",
  },
  {
    title: "2. Program Design",
    text: "A partnership blueprint is shaped around intervention type, implementation cadence, risk controls, and impact measurement design.",
  },
  {
    title: "3. Due Diligence & Documentation",
    text: "We support core diligence requests including governance and reporting references, and document the agreed implementation scope.",
  },
  {
    title: "4. Activation & Field Execution",
    text: "Program delivery starts with milestone check-ins, local coordination, and operational oversight aligned to agreed timelines.",
  },
  {
    title: "5. Reporting & Scale Decisions",
    text: "You receive structured updates and post-cycle insights to decide expansion, renewal, or cross-market replication.",
  },
];

const faqItems = [
  {
    question: "Can MNCs and non-US organizations partner with Nivaran?",
    answer:
      "Yes. We work with corporates, MNCs, institutions, foundations, and social-impact teams across regions. Partnership design is adapted to your governance framework and market context.",
  },
  {
    question: "What CSR budgets can you work with?",
    answer:
      "We support both pilot programs and larger strategic commitments. Budget and scope are mapped together so the intervention is realistic, measurable, and operationally sound.",
  },
  {
    question: "Do you support co-branded visibility and communications?",
    answer:
      "Yes. Depending on partnership design, we can align around communication assets, stakeholder updates, and campaign storytelling while respecting beneficiary dignity and compliance requirements.",
  },
  {
    question: "How soon can we launch?",
    answer:
      "Launch time depends on scope and due diligence complexity. Many partnerships can begin quickly after objective alignment and sign-off on core execution details.",
  },
];

export default function CorporatePage() {
  return (
    <main className="w-full bg-white font-Poppins">
      <section className="px-4 pt-12 pb-10">
        <div className="max-w-[1320px] mx-auto rounded-[32px] overflow-hidden border border-slate-200">
          <div className="relative px-6 md:px-10 py-14 bg-[radial-gradient(circle_at_0%_0%,rgba(44,119,187,0.22),transparent_40%),radial-gradient(circle_at_100%_30%,rgba(235,88,52,0.2),transparent_42%),linear-gradient(120deg,#f8fbff_0%,#ffffff_40%,#f8fffd_100%)]">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2c77bb] bg-[#eaf3ff] px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Corporate Partnerships
              </p>
              <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.15] text-slate-900">
                Build a CSR Program That Delivers Measurable Health Impact
              </h1>
              <p className="mt-5 text-slate-600 text-sm md:text-base leading-7 max-w-3xl">
                Nivaran Foundation partners with corporations, MNCs, institutions,
                and organizations to design and implement healthcare-focused CSR
                programs in high-need regions. This page gives your team a complete
                view of how the partnership works, what strategic value it creates,
                and why implementation quality matters.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#csr-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eb5834] text-white text-sm font-medium hover:bg-[#cf451f] transition"
                >
                  Start CSR Inquiry
                  <Handshake className="w-4 h-4" />
                </a>
                <Link
                  href="/accountability-and-transparency"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition"
                >
                  Review Governance
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {impactPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 p-6 md:p-8 bg-white">
            <div className="inline-flex items-center gap-2 text-[#eb5834] text-xs font-semibold uppercase tracking-[0.14em]">
              <Building2 className="w-4 h-4" />
              CSR Formats
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
              Partnership Models for Corporate, MNC, and Institutional Teams
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnershipTracks.map((track) => (
                <article
                  key={track.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {track.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-6">
                    {track.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6 md:p-8 bg-white">
            <div className="inline-flex items-center gap-2 text-[#2c77bb] text-xs font-semibold uppercase tracking-[0.14em]">
              <Globe className="w-4 h-4" />
              Value & Benefits
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
              Why Corporates Choose Nivaran
            </h2>
            <div className="mt-6 space-y-3">
              {benefitCards.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-6">
                    {benefit.text}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-5">
              Note: Tax treatment, regulatory interpretation, and reporting
              obligations depend on jurisdiction and structure. Your legal/tax
              advisor should review final arrangements.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-[1320px] mx-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-[#f9fbff] to-[#f6fffc] p-6 md:p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[#2aa89a] text-xs font-semibold uppercase tracking-[0.14em]">
              <Users className="w-4 h-4" />
              Execution Process
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
              How CSR Implementation Works with Nivaran
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-7">
              The partnership process is designed to keep decision making clear,
              implementation accountable, and outcome communication consistent with
              your internal and external stakeholder needs.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-6">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="csr-form" className="px-4 pb-14 scroll-mt-28">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <CorporateCSRForm />

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-semibold text-slate-900">
                Corporate & CSR Support Desk
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                For active CSR teams, procurement, sustainability leads, and ESG
                committees needing immediate coordination.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:partnerships@nivaranfoundation.org"
                    className="text-[#eb5834] hover:underline"
                  >
                    partnerships@nivaranfoundation.org
                  </a>
                </p>
                <p>
                  <strong>Nepal:</strong> +977 1-5354693
                </p>
                <p>
                  <strong>US:</strong> +1 857 701 7471
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/financial-reports"
                  className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-400"
                >
                  Financial Reports
                </Link>
                <Link
                  href="/financial-responsibility"
                  className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-400"
                >
                  Financial Responsibility
                </Link>
                <Link
                  href="/accountability-and-transparency"
                  className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-400"
                >
                  Accountability
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-semibold text-slate-900">
                CSR Partnership FAQs
              </h3>
              <div className="mt-4 space-y-3">
                {faqItems.map((faq) => (
                  <article
                    key={faq.question}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                  >
                    <h4 className="text-sm font-semibold text-slate-900">
                      {faq.question}
                    </h4>
                    <p className="mt-1.5 text-sm text-slate-600 leading-6">
                      {faq.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <ContactCardList />
          </div>
        </div>
      </section>
    </main>
  );
}

