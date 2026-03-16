"use client";

import { AppButton } from "@/components/ui/app-button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Newsroom", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Briefings", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

function withPrefix(prefix: string, path: string) {
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

export default function GlobalHeader({ prefix }: { prefix: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-neutral-50/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between px-4">
        <Link
          href={withPrefix(prefix, "/")}
          className="flex items-center gap-3"
          aria-label="Nivaran Global home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/NivaranLogo.svg"
            alt="Nivaran Foundation"
            width={110}
            height={42}
            className="h-auto w-[104px]"
          />
          <div className="hidden border-l border-gray-200 pl-3 sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-500">
              Nivaran Global Desk
            </p>
            <p className="text-sm text-gray-700">Campaigns and reporting</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 min-[980px]:flex" aria-label="Nivaran Global">
          {NAV_ITEMS.map((item) => {
            const href = withPrefix(prefix, item.href);
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary-50 text-primary-500"
                    : "text-gray-700 hover:bg-white hover:text-primary-500",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 min-[980px]:flex">
          <AppButton asChild variant="primary-outline" size="sm" className="font-normal">
            <Link href={withPrefix(prefix, "/contact")}>Contact</Link>
          </AppButton>
          <AppButton asChild variant="primary" size="sm" className="font-normal">
            <Link href={withPrefix(prefix, "/campaigns/israel")}>Featured campaign</Link>
          </AppButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 min-[980px]:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-gray-200 bg-white px-4 py-4 min-[980px]:hidden">
          <nav className="mx-auto flex max-w-[1320px] flex-col gap-2" aria-label="Mobile Nivaran Global">
            {NAV_ITEMS.map((item) => {
            const href = withPrefix(prefix, item.href);
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm",
                    active
                      ? "bg-primary-50 text-primary-500"
                      : "bg-neutral-50 text-gray-700",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <AppButton asChild variant="primary-outline" className="w-full justify-center font-normal">
                <Link href={withPrefix(prefix, "/contact")}>Contact</Link>
              </AppButton>
              <AppButton asChild variant="primary" className="w-full justify-center font-normal">
                <Link href={withPrefix(prefix, "/campaigns/israel")}>Featured campaign</Link>
              </AppButton>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
