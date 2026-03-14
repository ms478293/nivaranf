import MainTitle from "@/components/new/MainTitle/MainTitle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the standalone terms of service for Nivaran Global, covering access to campaigns, reporting, briefings, and platform use on global.nivaranfoundation.org.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/terms-of-service",
  },
};

const sections = [
  {
    title: "Use of the platform",
    body:
      "Nivaran Global is a standalone public platform for humanitarian campaigns, reporting, stories, and partner briefings. By using the site, you agree to use it lawfully and not interfere with platform operations, security, or the integrity of published material.",
  },
  {
    title: "Editorial and campaign content",
    body:
      "Published material is provided for public information, partner coordination, and campaign communication. It should not be copied or misrepresented in a way that implies endorsement, partnership, or designated-use approval that has not been explicitly granted.",
  },
  {
    title: "Partner and media submissions",
    body:
      "If you contact the platform for a briefing, media request, or operational discussion, you are responsible for ensuring the information you provide is accurate and appropriate to share. Submission of an inquiry does not create a partnership or funding commitment.",
  },
  {
    title: "Intellectual property",
    body:
      "Unless otherwise stated, site content, branding, layouts, and editorial material on global.nivaranfoundation.org belong to Nivaran Global or its licensors. Reuse beyond ordinary quotation, citation, or linking requires permission.",
  },
  {
    title: "Availability and updates",
    body:
      "Campaign pages, briefings, and reporting may change as conditions change. We may update, suspend, or remove material without notice if operational, legal, or security considerations require it.",
  },
  {
    title: "Contact",
    body:
      "Questions about these terms or requests for permission should go through the dedicated support desk for the global platform.",
  },
] as const;

export default function GlobalTermsOfServicePage() {
  return (
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <section className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle prefix="Terms" suffix="of Service" as="h1" className="mb-0" />
          <p className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl">
            Terms for the Nivaran Global platform.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            These terms apply specifically to <strong>global.nivaranfoundation.org</strong> and
            cover access to campaign pages, reporting, stories, partner briefings, and contact
            channels hosted on this subdomain.
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
          <MainTitle prefix="Legal" suffix="Contact" className="mb-0" />
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
            For permissions, legal questions, or platform-use issues, contact the global desk
            directly.
          </p>
          <div className="mt-6">
            <Link
              href="mailto:support@global.nivaranfoundation.org?subject=Global%20Terms%20Inquiry"
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
