import type { Metadata } from "next";
import Link from "next/link";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";

export const metadata: Metadata = {
  title: {
    default: "Nivaran Global | Humanitarian Campaigns Beyond Nepal",
    template: "%s | Nivaran Global",
  },
  description:
    "Nivaran Global is the separate home for humanitarian campaigns, global causes, and emergency response work outside Nepal.",
};

export default async function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefix = await getSubdomainPathPrefix("global");

  const navigation = [
    { label: "Global Home", href: withSubdomainPrefix(prefix, "/") },
    { label: "Campaigns", href: withSubdomainPrefix(prefix, "/campaigns") },
    {
      label: "Israel Response",
      href: withSubdomainPrefix(prefix, "/campaigns/israel"),
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9f4_0%,#ffffff_26%,#f6fbfb_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
              Nivaran Global
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Separate global humanitarian campaigns beyond Nepal
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://www.nivaranfoundation.org"
              className="rounded-full border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Nepal Site
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-900">Nivaran Global</p>
            <p className="mt-1 max-w-2xl">
              A distinct home for humanitarian campaigns and global-response
              work so Nepal program pages, metrics, and donor messaging stay
              cleanly separated.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:partnerships@nivaranfoundation.org?subject=Nivaran%20Global%20Inquiry"
              className="rounded-full border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              partnerships@nivaranfoundation.org
            </Link>
            <Link
              href="https://www.nivaranfoundation.org/contact-us"
              className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
