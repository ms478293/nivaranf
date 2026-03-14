import type { blogListType } from "@/blogs/listofblogs";
import { getBlogPath, type BlogRouteSegment } from "@/lib/blog-routes";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import Image from "next/image";
import Link from "next/link";

const SEGMENT_LABELS: Record<BlogRouteSegment, string> = {
  news: "Newsroom",
  stories: "Stories",
  articles: "Briefings",
};

type GlobalFeedPageProps = {
  segment: BlogRouteSegment;
  title: string;
  description: string;
  items: blogListType[];
};

export default async function GlobalFeedPage({
  segment,
  title,
  description,
  items,
}: GlobalFeedPageProps) {
  const prefix = await getSubdomainPathPrefix("global");
  const [lead, ...rest] = items;

  return (
    <div className="px-4 pb-16 pt-10 md:px-6 md:pt-14">
      <div className="mx-auto max-w-[1380px]">
        <section className="rounded-[34px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#fff7f2_100%)] px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
            {SEGMENT_LABELS[segment]}
          </p>
          <h1 className="mt-4 max-w-4xl font-[family:var(--global-font-display)] text-5xl leading-[0.95] text-slate-950 md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {description}
          </p>
        </section>

        {lead ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={withSubdomainPrefix(prefix, getBlogPath(lead))}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
            >
              <div className="relative h-[360px] overflow-hidden md:h-[420px]">
                <Image
                  src={lead.thumbnailImage}
                  alt={lead.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.78)_8%,rgba(15,23,42,0.08)_55%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                    Lead {SEGMENT_LABELS[segment].slice(0, -1) || "Report"}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                    {lead.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                    {lead.summary}
                  </p>
                </div>
              </div>
            </Link>

            <div className="rounded-[30px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_55px_rgba(15,23,42,0.18)] md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
                Editorial frame
              </p>
              <h2 className="mt-4 text-2xl font-semibold">Signal first. Noise last.</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                <p>
                  We surface developments that matter to civilian health, family stability, education continuity, and humanitarian decision-making.
                </p>
                <p>
                  Every entry is shaped to be useful for supporters, media, and partners who need to understand what is changing and why it matters.
                </p>
              </div>
              <div className="mt-8 grid gap-3">
                {rest.slice(0, 3).map((item) => (
                  <Link
                    key={item.slug}
                    href={withSubdomainPrefix(prefix, getBlogPath(item))}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.date}</p>
                    <p className="mt-2 text-base font-semibold leading-6 text-white">{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rest.map((item) => (
            <Link
              key={item.slug}
              href={withSubdomainPrefix(prefix, getBlogPath(item))}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-1"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={item.thumbnailImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {item.date}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
