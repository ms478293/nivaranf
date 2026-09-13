"use client";

/**
 * WeatherAdvisory
 * ---------------------------------------------------------------------------
 * Site-wide flood appeal popup. Opens once as a centered modal on first visit,
 * then collapses to a slim bar that keeps the notice reachable afterwards.
 *
 * EDITING THIS NOTICE (no coding required):
 *   - Turn it off entirely ....... set ADVISORY.enabled = false
 *   - Change any wording ......... edit the strings below
 *   - Publish a NEW advisory ..... bump ADVISORY.storageKey ("..._v1" -> "..._v2");
 *                                  everyone sees the modal again.
 *
 * Local appeal content; the third-party video loads only after a visitor presses play.
 * Mounted from src/app/layout.tsx; private routes are excluded below.
 * ---------------------------------------------------------------------------
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./WeatherAdvisory.module.css";
import NivaranLogo from "@/components/new/nivaranHeader/NivaranLogo";
import { isSelectableDesignation } from "@/content/donation-designations";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────── CONTENT ─────────────────────────────── */

const ADVISORY = {
  enabled: true,
  storageKey: "nivaran_flood_appeal_v2",
  openDelayMs: 700,
  eyebrow: "Nepal flood emergency · 2026",
  heading: "Nepal needs us. Recovery starts with care.",
  lede: "Homes swept away. Communities cut off. Help sustain Nivaran’s healthcare and education work in Nepal through the long road ahead.",
  primaryAction: { label: "Explore the flood appeal", href: "/donate/nepal-flood-recovery" },
  secondaryAction: { label: "Support our work", href: "/donate" },
  barText: "Stand with Nepal’s flood-affected communities.",
  barTextShort: "Stand with Nepal",
  barCta: "View appeal",
  closeLabel: "Close flood appeal",
  openLabel: "Open flood appeal",
  hideBarLabel: "Hide flood appeal for now",
} as const;

/* ────────────────────────────── COMPONENT ────────────────────────────── */

type Mode = "hidden" | "modal" | "bar";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HEADER_FALLBACK_PX = 64;

/** Internal tooling; the advisory is for visitors, not staff. */
const PRIVATE_ROUTES = [
  "/donate",
  "/dashboard",
  "/admin",
  "/auth",
  "/content-login",
  "/blogs/editor",
];

export default function WeatherAdvisory({ mainSiteOrigin = "" }: { mainSiteOrigin?: string }) {
  const floodGivingOpen = isSelectableDesignation("nepal-flood-recovery");
  const [gift, setGift] = useState(50);
  const [videoPlaying, setVideoPlaying] = useState(false);
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
    setVideoPlaying(false);
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
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/65 p-3 backdrop-blur-[4px] items-center sm:p-6 print:hidden"
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
              className={styles.panel}
            >
              <button type="button" data-autofocus onClick={() => closeModal(true)} aria-label={ADVISORY.closeLabel} className={styles.close}>
                <X size={22} aria-hidden="true" />
              </button>
              <div className={styles.visual}>
                <Image
                  src="/hero_img/nepal-flood-portrait.webp"
                  alt="AI-generated campaign illustration: a woman on higher ground overlooking a flooded Nepal river valley."
                  fill
                  priority
                  sizes="(max-width: 700px) 100vw, 520px"
                  className={styles.image}
                />
                <div className={styles.visualShade} />
                <div className={styles.location}><span />NEPAL / FLOOD EMERGENCY</div>
                {!videoPlaying ? (
                  <>
                    <button type="button" className={styles.play} onClick={() => setVideoPlaying(true)} aria-label="Watch UNICEF’s Nepal flood report">
                      <span className={styles.playCircle}><Play size={23} fill="currentColor" strokeWidth={1} aria-hidden="true" /></span>
                      <span>See what’s happening<span className={styles.playCredit}>Watch the UNICEF report</span></span>
                    </button>
                    <div className={styles.visualFooter}>
                      <p>THE WATER RECEDES.<br /><span>THE NEED DOESN’T.</span></p>
                      <span className={styles.caption}>AI-generated illustration</span>
                    </div>
                  </>
                ) : (
                  <div className={styles.videoStage}>
                    <iframe
                      src="https://www.youtube.com/embed/ORvL7inVgNU?autoplay=1&rel=0&playsinline=1"
                      title="UNICEF USA: Emergency Supply Delivery Underway After Nepal Floods, August 27, 2026"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <div className={styles.videoCredit}>
                      <span>Video: UNICEF USA · 27 Aug 2026</span>
                      <a href="https://www.youtube.com/watch?v=ORvL7inVgNU" target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink size={12} /></a>
                      <button type="button" onClick={() => setVideoPlaying(false)}>Back to image</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.content}>
                <NivaranLogo className={styles.logo} />
                <p className={styles.eyebrow}>Nepal flood emergency</p>
                <h2 id="advisory-heading" className={styles.heading}>Nepal needs us.<br /><span>Recovery starts{" "}<br />with care.</span></h2>
                <p id="advisory-lede" className={styles.lede}>{ADVISORY.lede}</p>
                {floodGivingOpen && <fieldset className={styles.giving}>
                  <legend>Make a one-time gift <span>USD</span></legend>
                  <div className={styles.amounts}>
                    {[25, 50, 100].map((amount) => (
                      <button key={amount} type="button" aria-pressed={gift === amount} onClick={() => setGift(amount)} className={gift === amount ? styles.selectedAmount : styles.amount}>${amount}</button>
                    ))}
                  </div>
                </fieldset>}
                <Link href={`${mainSiteOrigin}/donate/nepal-flood-recovery${floodGivingOpen ? `?amount=${gift}` : ""}`} onClick={() => closeModal(true)} className={styles.primary}>
                  {floodGivingOpen ? `Give $${gift} to the flood appeal` : "Explore the Nepal flood appeal"} <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <p className={styles.note}>{floodGivingOpen ? "Your gift supports Nivaran’s Nepal flood appeal." : "Dedicated flood gifts are not yet open. See our plans and current response status."}</p>
                <Link href={`${mainSiteOrigin}/campaigns/nepal-flood-recovery`} onClick={() => closeModal(true)} className={styles.secondary}>Read the flood briefing & our response status <ArrowRight size={14} aria-hidden="true" /></Link>
                <button type="button" onClick={() => closeModal(true)} className={styles.later}>Continue to website</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
