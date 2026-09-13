import countries from "world-countries";

export const BILLING_COUNTRIES = countries.map((c) => ({ code: c.cca2, name: c.name.common })).sort((a, b) => a.name.localeCompare(b.name));
export type BillingAddress = { line1: string; line2: string; city: string; region: string; postalCode: string; countryCode: string };
export type AddressSuggestion = { id: string; label: string; address: BillingAddress };
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

export function addressFromGeoapify(result: Record<string, unknown>): BillingAddress {
  const text = (key: string) => typeof result[key] === "string" ? result[key].trim().replace(/[\u0000-\u001f<>]/g, "").slice(0, 150) : "";
  const street = text("street"), number = text("housenumber"), displayLine = text("address_line1");
  const streetLine = [number, street].filter(Boolean).join(" ");
  const line1 = street && (!displayLine.includes(street) || (number && !displayLine.includes(number))) ? streetLine : displayLine || streetLine;
  // address_line2 contains the city/region, not an apartment or suite.
  return {
    line1: line1.slice(0, 150),
    line2: "",
    city: text("city") || text("town") || text("village") || text("municipality") || text("suburb"),
    region: text("state_code") || text("state"),
    postalCode: text("postcode").slice(0, 24),
    countryCode: text("country_code").toUpperCase(),
  };
}
