type Gtag = (...args: unknown[]) => void;

const GA_MEASUREMENT_ID = "G-QF370FRN47"; // same ID as the gtag loader in src/app/layout.tsx
export const COOKIE_CONSENT_KEY = "nivaran_cookie_consent";

// Unset or malformed IDs disable every Google Ads addition (no consent, config or events).
const rawAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const GOOGLE_ADS_ID = /^AW-\d+$/.test(rawAdsId) ? rawAdsId : undefined;
const rawLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_DONATION_LABEL ?? "";
const DONATION_LABEL = /^[\w-]+$/.test(rawLabel) ? rawLabel : undefined;

// EEA, UK and Switzerland: nothing is granted until the visitor accepts.
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
];

/**
 * Consent Mode v2 defaults, inlined before any gtag config. Elsewhere, analytics keeps
 * today's behavior (banner: "By continuing, you agree"); advertising waits for Accept
 * because the banner does not mention it. A stored banner choice overrides both.
 */
export const GOOGLE_CONSENT_DEFAULTS = `
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(CONSENT_REGIONS)}});
try{var c=localStorage.getItem('${COOKIE_CONSENT_KEY}');if(c){var v=c==='accepted'?'granted':'denied';gtag('consent','update',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v});}}catch(e){}
`;

function gtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/** Mirror the cookie banner choice into Consent Mode. */
export function updateGoogleConsent(accepted: boolean) {
  if (!GOOGLE_ADS_ID) return;
  const v = accepted ? "granted" : "denied";
  gtag()?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
}

const sent = new Set<string>();

/** Donation completed on-site (GoDaddy Payments charge approved): Ads conversion + GA4 purchase. */
export function trackGoogleDonation(value: number, transactionId?: string) {
  const g = gtag();
  if (!GOOGLE_ADS_ID || !g) return;
  if (transactionId) {
    if (sent.has(transactionId)) return;
    sent.add(transactionId);
  }
  const params = { value, currency: "USD", ...(transactionId ? { transaction_id: transactionId } : {}) };
  if (DONATION_LABEL) g("event", "conversion", { ...params, send_to: `${GOOGLE_ADS_ID}/${DONATION_LABEL}` });
  g("event", "purchase", { ...params, send_to: GA_MEASUREMENT_ID });
}
