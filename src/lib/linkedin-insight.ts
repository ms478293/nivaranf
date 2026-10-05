import { COOKIE_CONSENT_KEY } from "@/lib/google-ads";

type Lintrk = ((action: "track", data: { conversion_id: number }) => void) & { q?: unknown[] };
type LinkedInWindow = { _linkedin_partner_id?: string; _linkedin_data_partner_ids?: string[]; lintrk?: Lintrk };

// Public IDs from LinkedIn Campaign Manager (ad account 546771671), like the GA ID in google-ads.ts.
export const LINKEDIN_PARTNER_ID = "9799418";
export const LINKEDIN_DONATION_CONVERSION_ID = 31124826;
export const LINKEDIN_SCRIPT_SRC = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

/**
 * Same rule as the Google consent defaults: a stored banner choice wins; with no choice the banner
 * is implied consent, except in Europe, where nothing loads until the visitor accepts.
 */
// ponytail: the time zone stands in for the visitor's region; use an edge country header if it must be exact.
function allowed(): boolean {
  let choice: string | null = null;
  try { choice = localStorage.getItem(COOKIE_CONSENT_KEY); } catch { /* Storage blocked: no stored choice. */ }
  if (choice) return choice === "accepted";
  return !(Intl.DateTimeFormat().resolvedOptions().timeZone ?? "").startsWith("Europe/");
}

function linkedInWindow(): LinkedInWindow | undefined {
  return typeof window === "undefined" ? undefined : (window as unknown as LinkedInWindow);
}

/** Load the Insight Tag once, only when the cookie choice allows it. */
export function loadLinkedInInsight(): void {
  const w = linkedInWindow();
  if (!w || w.lintrk || !allowed()) return;
  w._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  w._linkedin_data_partner_ids = [LINKEDIN_PARTNER_ID];
  // Queue calls until LinkedIn's script replaces this stub (the official snippet does the same).
  const queue: unknown[] = [];
  w.lintrk = Object.assign((action: "track", data: { conversion_id: number }) => { queue.push([action, data]); }, { q: queue });
  const script = document.createElement("script");
  script.async = true;
  script.src = LINKEDIN_SCRIPT_SRC;
  document.head.appendChild(script);
}

const sent = new Set<string>();

/** Donation completed on-site (GoDaddy Payments charge approved). LinkedIn records the conversion's default value. */
export function trackLinkedInDonation(transactionId?: string): void {
  const w = linkedInWindow();
  if (!w || !allowed()) return;
  if (transactionId) {
    if (sent.has(transactionId)) return;
    sent.add(transactionId);
  }
  loadLinkedInInsight();
  w.lintrk?.("track", { conversion_id: LINKEDIN_DONATION_CONVERSION_ID });
}
