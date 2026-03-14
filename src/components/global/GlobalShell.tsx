import { GLOBAL_SITE_NAV } from "@/content/global-site";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--global-font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--global-font-display",
  display: "swap",
});

export default async function GlobalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div
      className={`${jakarta.variable} ${cormorant.variable} min-h-screen bg-[radial-gradient(circle_at_top,rgba(115,199,208,0.14),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(242,162,134,0.18),transparent_26%),linear-gradient(180deg,#fbf7f1_0%,#f8fafc_46%,#eef7f8_100%)] font-[family:var(--global-font-sans)] text-slate-950`}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(130deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%,rgba(15,23,42,0.03)_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(251,247,241,0.82)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-4 py-4 md:px-6">
          <Link href={withSubdomainPrefix(prefix, "/")} className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#73c7d0_0%,#f2a286_100%)] shadow-[0_12px_30px_rgba(115,199,208,0.35)]">
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-white">GN</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                Global platform
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-950">Global Nivaran</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {GLOBAL_SITE_NAV.map((item) => (
              <Link
                key={item.href}
                href={withSubdomainPrefix(prefix, item.href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="mailto:global@nivaranfoundation.org?subject=Global%20Nivaran%20Briefing"
              className="hidden rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 md:inline-flex"
            >
              Briefing request
            </Link>
            <Link
              href={withSubdomainPrefix(prefix, "/campaigns/israel")}
              className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Featured campaign
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1380px] gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              Global Nivaran
            </p>
            <h2 className="mt-3 font-[family:var(--global-font-display)] text-3xl leading-none text-slate-950 md:text-4xl">
              A separate editorial and campaign system for cross-border humanitarian work.
            </h2>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              {GLOBAL_SITE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={withSubdomainPrefix(prefix, item.href)}
                  className="transition-colors hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Campaigns, media, and partner operations</p>
              <Link
                href="mailto:global@nivaranfoundation.org"
                className="block font-medium text-slate-950"
              >
                global@nivaranfoundation.org
              </Link>
              <p className="max-w-xs leading-7">
                Structured briefings, campaign launches, field reporting, and partner coordination.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
