import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Belonging and Inclusion | Nivaran Foundation",
  description:
    "Nivaran Foundation's approach to belonging and inclusion across communities, partnerships, and internal culture.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/belonging-and-inclusion",
  },
};

const inclusionCommitments = [
  {
    title: "Community-Centered Design",
    text: "Programs are designed around local context and lived realities so communities are participants in decisions, not passive recipients.",
  },
  {
    title: "Respectful Access",
    text: "Service delivery is expected to be respectful across language, gender, caste, geography, and socioeconomic background.",
  },
  {
    title: "Representation in Action",
    text: "We encourage diverse participation in field teams, volunteer groups, and partner collaboration to improve relevance and trust.",
  },
  {
    title: "Continuous Improvement",
    text: "Belonging and inclusion practices are reviewed over time so feedback from communities can translate into measurable change.",
  },
];

export default function BelongingAndInclusionPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Belonging and Inclusion
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          Belonging and inclusion are part of program quality at Nivaran
          Foundation. Sustainable impact requires people to feel seen,
          respected, and able to participate in decisions that affect their
          communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {inclusionCommitments.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-6">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Inclusion and Mission Delivery
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-6">
            Inclusion improves outcomes. When service design reflects local
            realities and people trust the system, uptake increases and health
            delivery becomes more effective.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/volunteer"
              className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm"
            >
              Join as Volunteer
            </Link>
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
