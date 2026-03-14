import MainTitle from "@/components/new/MainTitle/MainTitle";
import type { blogListType } from "@/blogs/listofblogs";
import { getBlogPath, type BlogRouteSegment } from "@/lib/blog-routes";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SEGMENT_CONFIG: Record<
  BlogRouteSegment,
  { suffix: string; prefix: string; label: string; note: string }
> = {
  news: {
    suffix: "Global",
    prefix: "Newsroom",
    label: "Newsroom",
    note: "Fast-moving reporting for humanitarian shifts, health disruption, and civilian impact.",
  },
  stories: {
    suffix: "Field",
    prefix: "Stories",
    label: "Stories",
    note: "Human-centered reporting from communities, families, and people living inside the event.",
  },
  articles: {
    suffix: "Global",
    prefix: "Briefings",
    label: "Briefings",
    note: "Long-form context and analysis for partners, supporters, and decision-makers.",
  },
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
  const config = SEGMENT_CONFIG[segment];
  const featured = rest.slice(0, 3);
  const gridItems = rest.slice(3);

  return (
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <section className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle suffix={config.suffix} prefix={config.prefix} as="h1" className="mb-0" />
          <p className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl md:leading-tight">
            {title}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">{description}</p>
          <p className="mt-4 text-sm leading-7 text-gray-500">{config.note}</p>
        </section>

        {lead ? (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={withSubdomainPrefix(prefix, getBlogPath(lead))}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100"
            >
              <div className="relative h-[320px] md:h-[420px]">
                <Image
                  src={lead.thumbnailImage}
                  alt={lead.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                  <span>{config.label}</span>
                  <span className="text-gray-400">{lead.date}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-gray-800 md:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-4 text-sm leading-8 text-gray-600 md:text-base">{lead.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-500">
                  Read full piece
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <div className="grid gap-4">
              {featured.map((item) => (
                <Link
                  key={item.slug}
                  href={withSubdomainPrefix(prefix, getBlogPath(item))}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    {item.date}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 text-gray-800">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {gridItems.map((item) => (
            <Link
              key={item.slug}
              href={withSubdomainPrefix(prefix, getBlogPath(item))}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition-transform hover:-translate-y-0.5"
            >
              <div className="relative h-[220px]">
                <Image
                  src={item.thumbnailImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                  {item.date}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-7 text-gray-800">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.summary}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
