import MainTitle from "@/components/new/MainTitle/MainTitle";
import { AppButton } from "@/components/ui/app-button";
import { GLOBAL_CONTACT_CARDS } from "@/content/global-site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nivaran Global for campaign briefings, newsroom inquiries, and partner operations conversations.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/contact",
  },
};

export default function GlobalContactPage() {
  return (
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <section className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle suffix="Global" prefix="Contact" as="h1" className="mb-0" />
          <p className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl">
            Reach the global team with something concrete.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            Use this page for campaign briefings, newsroom requests, partner conversations, and
            operational coordination. The fastest path is still a structured email with context,
            scope, and timing.
          </p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {GLOBAL_CONTACT_CARDS.map((card) => (
            <article key={card.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800">{card.title}</h2>
              <p className="mt-4 text-sm leading-8 text-gray-600">{card.body}</p>
              <div className="mt-6">
                <AppButton asChild size="lg" className="font-normal">
                  <Link href={card.href}>{card.cta}</Link>
                </AppButton>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle suffix="Direct" prefix="Email" className="mb-0" />
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
            For urgent coordination, media outreach, or campaign planning, use the direct desk email.
          </p>
          <div className="mt-6">
            <AppButton asChild size="lg" className="font-normal">
              <Link href="mailto:support@global.nivaranfoundation.org">support@global.nivaranfoundation.org</Link>
            </AppButton>
          </div>
        </section>
      </div>
    </div>
  );
}
