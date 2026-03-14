import MainTitle from "@/components/new/MainTitle/MainTitle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for Global Nivaran, including how campaign, newsroom, and partner-contact information is handled on global.nivaranfoundation.org.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/privacy-policy",
  },
};

const sections = [
  {
    title: "What this policy covers",
    body:
      "This policy applies to global.nivaranfoundation.org, including campaign pages, newsroom pages, stories, briefings, and direct contact forms or email pathways connected to the Global Nivaran platform.",
  },
  {
    title: "Information we may collect",
    body:
      "We may collect contact details, organization details, campaign inquiry context, technical usage data, and any information you choose to send when requesting a briefing, contacting the newsroom, or opening a partner conversation.",
  },
  {
    title: "How information is used",
    body:
      "We use submitted information to respond to campaign inquiries, coordinate partner conversations, manage editorial and media requests, improve the platform, and maintain operational security and accountability.",
  },
  {
    title: "Sharing and disclosure",
    body:
      "We do not sell personal information. Information may be shared with service providers, security tools, legal advisers, or vetted operational partners only when needed to run the platform, respond to requests, or comply with legal obligations.",
  },
  {
    title: "Retention and security",
    body:
      "We retain information only as long as it is needed for operational, legal, editorial, or accountability purposes. We use reasonable technical and administrative safeguards, but no online system can promise absolute security.",
  },
  {
    title: "Your contact point",
    body:
      "Questions about privacy, data handling, or information requests for the Global Nivaran platform should be sent directly to the global support desk.",
  },
] as const;

export default function GlobalPrivacyPolicyPage() {
  return (
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <section className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle prefix="Privacy" suffix="Policy" as="h1" className="mb-0" />
          <p className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl">
            Privacy rules for the Global Nivaran platform.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            This policy is specific to <strong>global.nivaranfoundation.org</strong> and is kept
            separate from the main site so campaign, newsroom, and partner workflows can be managed
            on their own terms.
          </p>
        </section>

        <section className="mt-6 grid gap-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl bg-white px-6 py-7 shadow-sm ring-1 ring-gray-100 md:px-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
              <p className="mt-4 max-w-4xl text-sm leading-8 text-gray-600 md:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle prefix="Global" suffix="Support" className="mb-0" />
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
            For privacy requests or policy questions, use the dedicated global support address.
          </p>
          <div className="mt-6">
            <Link
              href="mailto:support@global.nivaranfoundation.org?subject=Global%20Privacy%20Request"
              className="inline-flex rounded-full bg-primary-main px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-500"
            >
              support@global.nivaranfoundation.org
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
