"use client";

/**
 * WeatherAdvisory
 * ---------------------------------------------------------------------------
 * Site-wide monsoon advisory. Opens once as a centered modal on first visit,
 * then collapses to a slim bar that keeps the notice reachable afterwards.
 *
 * EDITING THIS NOTICE (no coding required):
 *   - Turn it off entirely ....... set ADVISORY.enabled = false
 *   - Change any wording ......... edit the strings below
 *   - Publish a NEW advisory ..... bump ADVISORY.storageKey ("..._v1" -> "..._v2");
 *                                  everyone sees the modal again.
 *
 * No database and no network calls: all content lives in the const below.
 * Mounted from src/app/(main)/layout.tsx only, so it never appears on the
 * dashboard/admin routes, which have no fixed public header.
 * ---------------------------------------------------------------------------
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CloudRain, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────── CONTENT ─────────────────────────────── */

const ADVISORY = {
  enabled: true,
  storageKey: "nivaran_advisory_v1",
  openDelayMs: 1000,

  eyebrow: "Operations notice — Monsoon season",
  heading: "Our health camps and scheduled programs are postponed.",
  lede: "Sanjeevani free health camps and other scheduled community programs are on hold until the routes to them are safe.",

  paragraphs: [
    "Weeks of monsoon rain have soaked the rural and mountain roads that lead to our camp sites. Landslides and flash floods are an active risk on those routes.",
    "Running a camp means putting people on them: our doctors and volunteers, a vehicle carrying medicine and equipment, and the patients who would walk hours to reach us — many of them elderly, pregnant, or carrying a child. We will not ask anyone to make that journey while the way there is unsafe.",
  ],

  emphasis:
    "A postponed camp costs a few weeks. A road that gives way costs lives. That is the whole calculation.",

  steps: [
    {
      label: "Rescheduling",
      detail:
        "Every camp will be held. New dates follow once the access routes are assessed and cleared as safe.",
    },
    {
      label: "If you registered",
      detail:
        "Our team will contact you directly with your new date. There is nothing you need to do.",
    },
    {
      label: "Work continues",
      detail:
        "Donations are funding monsoon preparation and relief in the communities we serve.",
    },
  ],

  signature: "Nivaran Foundation · Field Operations, Nepal",

  primaryAction: { label: "Contact our team", href: "/contact-us" },
  secondaryAction: { label: "Support monsoon relief", href: "/donate" },

  barText: "Health camps postponed — monsoon road safety.",
  barTextShort: "Health camps postponed",
  barCta: "Read the notice",

  closeLabel: "Close the advisory notice",
  openLabel: "Open the full advisory notice",
  hideBarLabel: "Hide this notice for now",
} as const;

/* ────────────────────────────── COMPONENT ────────────────────────────── */

type Mode = "hidden" | "modal" | "bar";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HEADER_FALLBACK_PX = 64;

/** Internal tooling; the advisory is for visitors, not staff. */
const PRIVATE_ROUTES = [
  "/dashboard",
  "/admin",
  "/auth",
  "/content-login",
  "/blogs/editor",
];

export default function WeatherAdvisory() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [headerHeight, setHeaderHeight] = useState(HEADER_FALLBACK_PX);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isPrivateRoute = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  /* Decide the initial state once, on the client only. */
  useEffect(() => {
    if (!ADVISORY.enabled || isPrivateRoute) return;

    let dismissed = false;
    let hiddenForSession = false;
    try {
      dismissed =
        window.localStorage.getItem(ADVISORY.storageKey) === "dismissed";
      hiddenForSession =
        window.sessionStorage.getItem(`${ADVISORY.storageKey}_bar`) ===
        "hidden";
    } catch {
      // Private mode / storage blocked: fall through and show the notice.
    }

    if (hiddenForSession) return;
    if (dismissed) {
      setMode("bar");
      return;
    }

    const timer = window.setTimeout(
      () => setMode("modal"),
      ADVISORY.openDelayMs
    );
    return () => window.clearTimeout(timer);
  }, [isPrivateRoute]);

  /* The public header is fixed at the top; park the bar directly beneath it.
     Measured rather than hardcoded so a change to the header cannot orphan it. */
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const measure = () =>
      setHeaderHeight(header.getBoundingClientRect().height || HEADER_FALLBACK_PX);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, [mode]);

  const closeModal = useCallback((persist: boolean) => {
    if (persist) {
      try {
        window.localStorage.setItem(ADVISORY.storageKey, "dismissed");
      } catch {
        // Storage blocked: the notice simply returns on the next visit.
      }
    }
    setMode("bar");
  }, []);

  const openModal = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setMode("modal");
  }, []);

  const hideBar = useCallback(() => {
    try {
      window.sessionStorage.setItem(`${ADVISORY.storageKey}_bar`, "hidden");
    } catch {
      // Storage blocked: the bar returns on the next navigation.
    }
    setMode("hidden");
  }, []);

  /* While the modal is open: lock scroll, trap focus, close on Escape. */
  useEffect(() => {
    if (mode !== "modal") return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    if (!lastFocusedRef.current) lastFocusedRef.current = previouslyFocused;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = dialogRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal(true);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      lastFocusedRef.current?.focus?.();
      lastFocusedRef.current = null;
    };
  }, [mode, closeModal]);

  if (!ADVISORY.enabled || isPrivateRoute) return null;

  const motionProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : undefined;

  return (
    <>
      {/* ───────────────────────────── SLIM BAR ───────────────────────────── */}
      <AnimatePresence>
        {mode === "bar" && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ top: headerHeight }}
            className="fixed inset-x-0 z-30 flex justify-center px-3 print:hidden"
          >
            <div className="flex h-11 w-full max-w-4xl items-center gap-3 rounded-b-lg border border-t-0 border-primary-200 bg-primary-50/95 px-3 shadow-sm backdrop-blur-sm sm:px-4">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-main"
              />
              <button
                type="button"
                onClick={openModal}
                aria-haspopup="dialog"
                aria-expanded={false}
                aria-label={ADVISORY.openLabel}
                className="group flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <span className="truncate text-[13px] leading-[1.4] text-primary-900 sm:text-[14px]">
                  <span className="sm:hidden">{ADVISORY.barTextShort}</span>
                  <span className="hidden sm:inline">{ADVISORY.barText}</span>
                </span>
                <span className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-primary-700 underline-offset-4 group-hover:underline min-[420px]:inline-flex">
                  {ADVISORY.barCta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
              <button
                type="button"
                onClick={hideBar}
                aria-label={ADVISORY.hideBarLabel}
                className="shrink-0 rounded-full p-1 text-primary-700 transition-colors hover:bg-primary-100"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────────────────────── MODAL ────────────────────────────── */}
      <AnimatePresence>
        {mode === "modal" && (
          <motion.div
            key="advisory-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6 print:hidden"
            onClick={() => closeModal(true)}
            {...motionProps}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="advisory-heading"
              aria-describedby="advisory-lede"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl supports-[height:100dvh]:max-h-[92dvh] sm:rounded-2xl sm:max-h-[88vh] sm:supports-[height:100dvh]:max-h-[88dvh]"
            >
              {/* Masthead */}
              <div className="relative shrink-0 overflow-hidden bg-primary-600 px-5 py-5 sm:px-8 sm:py-6">
                {!reduceMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(105deg,transparent_0px,transparent_7px,rgba(255,255,255,0.9)_7px,rgba(255,255,255,0.9)_8px)]"
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <CloudRain
                      className="h-[18px] w-[18px] shrink-0 text-white"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                      {ADVISORY.eyebrow}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => closeModal(true)}
                    aria-label={ADVISORY.closeLabel}
                    className="-mr-1 -mt-1 shrink-0 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X className="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                </div>
                <h2
                  id="advisory-heading"
                  className="relative mt-3 text-[22px] font-semibold leading-[1.22] tracking-[-0.02em] text-white sm:text-[27px]"
                >
                  {ADVISORY.heading}
                </h2>
              </div>

              {/* Body */}
              <div
                tabIndex={0}
                role="region"
                aria-label="Advisory details"
                className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6"
              >
                <p
                  id="advisory-lede"
                  className="text-[15px] font-semibold leading-[1.55] text-gray-900 sm:text-[16px]"
                >
                  {ADVISORY.lede}
                </p>

                {ADVISORY.paragraphs.map((text, index) => (
                  <p
                    key={index}
                    className="mt-3.5 text-[14px] leading-[1.65] text-gray-600 sm:text-[15px]"
                  >
                    {text}
                  </p>
                ))}

                <p className="mt-5 border-l-2 border-primary-main pl-4 text-[14px] font-semibold leading-[1.6] text-gray-900 sm:text-[15px]">
                  {ADVISORY.emphasis}
                </p>

                <ul className="mt-6 space-y-3.5 border-t border-gray-100 pt-5">
                  {ADVISORY.steps.map((step, index) => (
                    <li key={step.label} className="flex gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[3px] shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.1em] text-primary-400"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[13px] leading-[1.6] text-gray-600 sm:text-[14px]">
                        <span className="font-semibold text-gray-900">
                          {step.label}
                        </span>{" "}
                        — {step.detail}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[12px] leading-[1.5] text-gray-400">
                  {ADVISORY.signature}
                </p>
              </div>

              {/* Actions */}
              <div className="shrink-0 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-8">
                <div className="flex flex-col gap-2.5 sm:flex-row-reverse sm:items-center sm:justify-start">
                  <Link
                    href={ADVISORY.primaryAction.href}
                    onClick={() => closeModal(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-main px-5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2"
                  >
                    {ADVISORY.primaryAction.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={ADVISORY.secondaryAction.href}
                    onClick={() => closeModal(true)}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 text-[14px] font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2"
                  >
                    {ADVISORY.secondaryAction.label}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
