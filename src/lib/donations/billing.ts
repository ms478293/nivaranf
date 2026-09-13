import countries from "world-countries";

export const BILLING_COUNTRIES = countries.map((c) => ({ code: c.cca2, name: c.name.common })).sort((a, b) => a.name.localeCompare(b.name));
export type BillingAddress = { line1: string; line2: string; city: string; region: string; postalCode: string; countryCode: string };
export const EMPTY_BILLING: BillingAddress = { line1: "", line2: "", city: "", region: "", postalCode: "", countryCode: "" };
export function billingError(value: BillingAddress): string | null {
  if (!BILLING_COUNTRIES.some((c) => c.code === value.countryCode)) return "Please choose your billing country.";
  if (!value.line1.trim()) return "Please enter your street address.";
  if (!value.city.trim()) return "Please enter your city or locality.";
  if (["US", "CA", "GB", "AU", "IN", "DE", "FR"].includes(value.countryCode) && !value.postalCode.trim()) return "Please enter your postal or ZIP code.";
  return null;
}
export function parseBilling(value: unknown): BillingAddress | null {
  if (!value || typeof value !== "object") return null;
  const result = { ...EMPTY_BILLING };
  for (const k of Object.keys(result) as (keyof BillingAddress)[]) {
    const v = value[k];
    if (typeof v !== "string" || v.length > (k === "countryCode" ? 2 : 150) || /[\u0000-\u001f<>]/.test(v)) return null;
    result[k] = v.trim();
  }
  return billingError(result) ? null : result;
}

export function addressFromGoogle(components: { longText: string; shortText: string; types: string[] }[]): BillingAddress {
  const part = (type: string, short = false) => {
    const c = components.find((x) => x.types.includes(type));
    return (short ? c?.shortText : c?.longText) || "";
  };
  return { line1: [part("street_number"), part("route")].filter(Boolean).join(" ") || part("premise"), line2: part("subpremise"), city: part("locality") || part("postal_town") || part("sublocality_level_1") || part("administrative_area_level_2"), region: part("administrative_area_level_1", true), postalCode: [part("postal_code"), part("postal_code_suffix")].filter(Boolean).join("-"), countryCode: part("country", true) };
}
