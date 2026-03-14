import { GLOBAL_SITE_NAV } from "@/content/global-site";
import Image from "next/image";
import Link from "next/link";

function withPrefix(prefix: string, path: string) {
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

export default function GlobalFooter({ prefix }: { prefix: string }) {
  return (
    <footer className="w-full rounded-t-3xl bg-[linear-gradient(to_bottom,rgba(235,89,52,0.08)_0%,rgba(235,89,52,0.08)_8%,#fff_52%)] px-4 font-Poppins md:rounded-t-[2.5rem]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 py-10 text-gray-600">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/NivaranLogo.svg"
                alt="Nivaran Foundation"
                width={110}
                height={42}
                className="h-auto w-[110px]"
              />
              <div className="border-l border-gray-200 pl-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-500">
                  Global Desk
                </p>
                <p className="text-sm text-gray-700">Humanitarian campaigns and reporting</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-600">
              Global Nivaran is a separate public-facing platform for cross-border campaigns,
              crisis reporting, partner briefings, and accountable humanitarian communication.
            </p>
            <p className="w-fit border-b border-gray-300 pb-1 text-sm text-gray-700">
              <Link href="mailto:global@nivaranfoundation.org">global@nivaranfoundation.org</Link>
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg text-primary-main">Explore</h2>
            <div className="flex flex-col gap-3 text-sm">
              {GLOBAL_SITE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={withPrefix(prefix, item.href)}
                  className="transition-colors hover:text-primary-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg text-primary-main">Use Cases</h2>
            <div className="space-y-3 text-sm leading-7">
              <p>Campaign launches with designated-use clarity</p>
              <p>Newsroom reporting for fast-moving crises</p>
              <p>Partner and media briefings with direct contact paths</p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

        <div className="flex flex-col gap-4 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} NIVARAN FOUNDATION, INC. All rights reserved</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="https://www.nivaranfoundation.org/privacy-policy" className="hover:text-primary-500">
              Privacy Policy
            </Link>
            <Link href="https://www.nivaranfoundation.org/terms-of-service" className="hover:text-primary-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
