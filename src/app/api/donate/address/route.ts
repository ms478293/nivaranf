import { NextResponse } from "next/server";
import { addressFromPhoton, BILLING_COUNTRIES, type AddressSuggestion } from "@/lib/donations/billing";
import { sameOrigin, withinLimit } from "@/lib/donations/request-guard";
export const runtime = "nodejs";
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(req: Request) {
  if (!sameOrigin(req) || !withinLimit(req, "address", 40)) return reply({ error: "Please enter your address manually." }, 429);
  try {
    const body = await req.json();
    if (!BILLING_COUNTRIES.some((country) => country.code === body.countryCode)) return reply({ error: "Please choose your billing country first." }, 400);
    if (typeof body.query !== "string" || body.query.trim().length < 3 || body.query.length > 200) return reply({ suggestions: [] });
    const url = new URL("https://photon.komoot.io/api/");
    url.searchParams.set("q", body.query.trim());
    url.searchParams.set("lang", "en");
    url.searchParams.set("limit", "5");
    url.searchParams.set("countrycode", body.countryCode);
    url.searchParams.append("layer", "house");
    url.searchParams.append("layer", "street");
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "NivaranFoundation/donate (https://www.nivaranfoundation.org)" },
      signal: AbortSignal.any([req.signal, AbortSignal.timeout(6000)]),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Search unavailable");
    const data = await res.json();
    if (!Array.isArray(data.features)) throw new Error("Invalid search response");
    const suggestions: AddressSuggestion[] = [];
    for (const feature of data.features) {
      const result = feature?.properties;
      if (!result || typeof result !== "object") continue;
      const props = result as Record<string, unknown>;
      if (!["house", "street"].includes(String(props.type))) continue;
      const address = addressFromPhoton(props);
      if (!address.line1 || address.countryCode !== body.countryCode) continue;
      const label = [address.line1, address.city, address.postalCode].filter(Boolean).join(", ").slice(0, 400);
      if (!label || suggestions.some((s) => s.label === label)) continue;
      const osmId = typeof props.osm_id === "number" || typeof props.osm_id === "string" ? String(props.osm_id) : String(suggestions.length);
      suggestions.push({ id: `photon-${typeof props.osm_type === "string" ? props.osm_type : "x"}-${osmId}`, label, address });
      if (suggestions.length === 5) break;
    }
    return reply({ suggestions });
  } catch { return reply({ error: "Address search is unavailable. You can enter your address manually." }, 503); }
}
