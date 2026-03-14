import { GLOBAL_CONTACT_CARDS } from "@/content/global-site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Global Nivaran for campaign briefings, newsroom inquiries, and partner operations conversations.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/contact",
  },
};

export default function GlobalContactPage() {
  return (
    <div className="px-4 pb-16 pt-10 md:px-6 md:pt-14">
      <div className="mx-auto max-w-[1380px]">
        <section className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#fff8f3_100%)] px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">Contact</p>
          <h1 className="mt-4 font-[family:var(--global-font-display)] text-5xl leading-[0.92] text-slate-950 md:text-7xl">
            Reach the global team with something concrete.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Use this page for campaign briefings, newsroom requests, partner conversations, and operational coordination. The fastest path is still a structured email with context, scope, and timing.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {GLOBAL_CONTACT_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{card.title}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{card.body}</p>
              <Link
                href={card.href}
                className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {card.cta}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
