import { NextResponse } from "next/server";
import { addressFromGeoapify, BILLING_COUNTRIES, type AddressSuggestion } from "@/lib/donations/billing";
import { sameOrigin, withinLimit } from "@/lib/donations/request-guard";
export const runtime = "nodejs";
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(req: Request) {
  if (!sameOrigin(req) || !withinLimit(req, "address", 40)) return reply({ error: "Please enter your address manually." }, 429);
  const key = process.env.GEOAPIFY_API_KEY?.trim();
  if (!key) return reply({ error: "Address search is unavailable. Please enter your address below." }, 503);
  try {
    const body = await req.json();
    if (!BILLING_COUNTRIES.some((country) => country.code === body.countryCode)) return reply({ error: "Please choose your billing country first." }, 400);
    if (typeof body.query !== "string" || body.query.trim().length < 3 || body.query.length > 200) return reply({ suggestions: [] });
    const url = new URL("https://api.geoapify.com/v1/geocode/autocomplete");
    url.search = new URLSearchParams({ text: body.query.trim(), filter: `countrycode:${body.countryCode.toLowerCase()}`, format: "json", limit: "5", apiKey: key }).toString();
    const res = await fetch(url, { signal: AbortSignal.any([req.signal, AbortSignal.timeout(6000)]), cache: "no-store" });
    if (!res.ok) throw new Error("Search unavailable");
    const data = await res.json();
    if (!Array.isArray(data.results)) throw new Error("Invalid search response");
    const suggestions: AddressSuggestion[] = [];
    for (const result of data.results) {
      if (!result || typeof result !== "object" || typeof result.formatted !== "string") continue;
      // A city or postcode alone is not a billing street address.
      if (!result.street && !["building", "street", "amenity"].includes(result.result_type)) continue;
      const address = addressFromGeoapify(result);
      if (!address.line1 || address.countryCode !== body.countryCode) continue;
      const label = result.formatted.trim().slice(0, 400);
      if (!label || suggestions.some((s) => s.label === label)) continue;
      // Include the address now so selection never consumes a second API credit.
      suggestions.push({ id: `address-${suggestions.length}`, label, address });
      if (suggestions.length === 5) break;
    }
    return reply({ suggestions });
  } catch { return reply({ error: "Address search is unavailable. You can enter your address manually." }, 503); }
}
