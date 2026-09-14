import { BILLING_COUNTRIES } from "@/lib/donations/billing";
import { TZ_COUNTRIES } from "@/lib/donations/tz-countries";

export const BILLING_COUNTRY_STORAGE = "nf-billing-country";

const allowed = new Set(BILLING_COUNTRIES.map((country) => country.code));

export function normalizeCountryCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  if (code.length !== 2 || code === "XX" || code === "T1") return null;
  return allowed.has(code) ? code : null;
}

export function countryFromTimeZone(timeZone: unknown): string | null {
  if (typeof timeZone !== "string" || !timeZone) return null;
  return normalizeCountryCode(TZ_COUNTRIES[timeZone]);
}

export function countryFromLanguages(languages: unknown): string | null {
  if (!Array.isArray(languages)) return null;
  for (const language of languages) {
    if (typeof language !== "string" || !language.trim()) continue;
    try {
      const region = new Intl.Locale(language.trim().replace(/_/g, "-")).region;
      const code = normalizeCountryCode(region);
      if (code) return code;
    } catch { /* ignore malformed tags */ }
  }
  return null;
}

export function countryFromRequestHeaders(headers: Headers): string | null {
  for (const name of ["cf-ipcountry", "x-vercel-ip-country", "x-country-code", "cloudfront-viewer-country"]) {
    const code = normalizeCountryCode(headers.get(name));
    if (code) return code;
  }
  return null;
}

export function pickDetectedCountry(input: { ip?: string | null; timeZone?: string | null; languages?: readonly string[] | null }): string | null {
  const ip = normalizeCountryCode(input.ip);
  const timeZone = countryFromTimeZone(input.timeZone);
  const language = countryFromLanguages(input.languages ?? []);
  if (ip && timeZone && ip === timeZone) return ip;
  if (ip && language && ip === language) return ip;
  if (timeZone && language && timeZone === language) return timeZone;
  return ip || timeZone || language;
}
