import type { Metadata } from "next";
import Link from "next/link";
import {
  HandCoins,
  Heart,
  Megaphone,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";
import { LocalPartnerForm } from "@/components/new/LocalPartner/LocalPartnerForm";

export const metadata: Metadata = {
  title: "Become a Local Partner | Nivaran Foundation",
  description:
    "Partner with Nivaran Foundation to host fundraising events in your community. Perfect for high school clubs, college groups, youth organizations, and community teams. Keep 10-20% for expenses — the rest directly supports healthcare & education programs.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/local-partner",
  },
  keywords: [
    "local fundraising partner",
    "high school fundraiser",
    "community fundraising",
    "youth group partnership",
    "charity event hosting",
    "Nivaran Foundation volunteer",
    "nonprofit community partner",
  ],
};

const howItWorks = [
  {
    step: 1,
    title: "Apply",
    body: "Fill out the form below with your group details, event idea, and team info.",
    icon: Megaphone,
  },
  {
    step: 2,
    title: "Get Approved",
    body: "Our team reviews your application within 3–5 business days and reaches out with next steps.",
    icon: Users,
  },
  {
    step: 3,
    title: "Host Your Event",
    body: "Plan and run your fundraising event with guidance and materials from Nivaran Foundation.",
    icon: PartyPopper,
  },
  {
    step: 4,
    title: "Make an Impact",
    body: "Keep 10–20% for event expenses and transfer the rest directly to Nivaran's programs.",
    icon: Heart,
  },
];

const benefits = [
  {
    title: "Real-World Impact",
    description:
      "Funds raised go directly to healthcare camps, education initiatives, and community empowerment programs across Nepal.",
  },
  {
    title: "Flexible Event Formats",
    description:
      "Bake sales, fun runs, talent shows, online fundraisers — choose whatever works best for your group and community.",
  },
  {
    title: "Keep Up to 20% for Expenses",
    description:
      "We understand events cost money. Your group can retain up to 20% of funds raised to cover venue, supplies, and logistics.",
  },
  {
    title: "Certificate & Recognition",
    description:
      "Every partner group receives a certificate of partnership and may be featured on our website and social media.",
  },
  {
    title: "Mentorship & Support",
    description:
      "Our team provides event planning guidance, promotional materials, and ongoing support throughout the process.",
  },
  {
    title: "Great for College Applications",
    description:
      "Leading a community fundraiser demonstrates leadership, initiative, and social responsibility — highly valued by universities.",
  },
];

const faqItems = [
  {
    question: "Do we need to be a registered nonprofit or 501(c)(3)?",
    answer:
      "No. This program is specifically designed for unregistered local groups — high school clubs, college organizations, community teams, etc. Nivaran Foundation is a registered 501(c)(3) and handles all compliance.",
  },
  {
    question: "How much money do we need to raise?",
    answer:
      "There's no minimum requirement. Whether you raise $100 or $10,000, every dollar makes a difference. We'll work with you to set realistic goals.",
  },
  {
    question: "What happens to the money we raise?",
    answer:
      "Your group keeps 10–20% to cover event expenses (venue, food, supplies, etc.). The remaining funds are transferred directly to Nivaran Foundation's healthcare and education programs.",
  },
  {
    question: "Do we need an adult advisor?",
    answer:
      "It's recommended for groups under 18, but not required. Having an adult advisor can help with logistics, venue booking, and credibility.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "We typically review applications within 3–5 business days. Once approved, you can start planning your event immediately.",
  },
  {
    question: "Can we host online fundraisers?",
    answer:
      "Absolutely! Online fundraisers through platforms like GoFundMe, Venmo, or social media campaigns are welcome and can be very effective.",
  },
];

export default function LocalPartnerPage() {
  return (
    <main className="w-full bg-white font-Poppins">
      {/* -------- Hero -------- */}
      <section className="px-4 pt-12 pb-10">
        <div className="max-w-[1320px] mx-auto rounded-[32px] overflow-hidden border border-slate-200">
          <div className="relative px-6 md:px-10 py-14 bg-[radial-gradient(circle_at_0%_0%,rgba(44,119,187,0.22),transparent_40%),radial-gradient(circle_at_100%_30%,rgba(235,88,52,0.2),transparent_42%),linear-gradient(120deg,#f8fbff_0%,#ffffff_40%,#f8fffd_100%)]">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2c77bb] bg-[#eaf3ff] px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Community Fundraising
              </p>
              <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.15] text-slate-900">
                Host a Fundraiser for Nivaran&nbsp;— Keep What You Need, Give What
                Matters
              </h1>
              <p className="mt-5 text-slate-600 text-sm md:text-base leading-7 max-w-3xl">
                Whether you&apos;re a high school club, a college organization, a youth
                group, or a community team — you can partner with Nivaran
                Foundation to organize fundraising events in your area. Your group
                keeps 10–20% for event expenses, and the rest directly supports
                healthcare and education programs in Nepal.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#partner-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eb5834] text-white text-sm font-medium hover:bg-[#cf451f] transition-colors"
                >
                  Apply to Partner
                  <HandCoins className="w-4 h-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
                >
                  Learn About Nivaran
                  <Heart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- How It Works -------- */}
      <section className="px-4 pb-12">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
              >
                <span className="absolute top-4 right-4 text-4xl font-bold text-slate-100 select-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#fff1ec] text-[#eb5834] flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-6">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------- Benefits -------- */}
      <section className="px-4 pb-12">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-2">
            Why Partner with Nivaran?
          </h2>
          <p className="text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for a school project, community service hours,
            or a way to make a real difference — we make it easy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-6">
                  {b.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------- Application Form -------- */}
      <section id="partner-form" className="px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <LocalPartnerForm />
        </div>
      </section>

      {/* -------- FAQ -------- */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((faq) => (
              <article
                key={faq.question}
                className="rounded-xl border border-slate-200 p-4 bg-slate-50"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-6">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
