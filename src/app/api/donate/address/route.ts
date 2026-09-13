import { NextResponse } from "next/server";
import { addressFromGoogle } from "@/lib/donations/billing";
import { sameOrigin, withinLimit } from "@/lib/donations/request-guard";
export const runtime = "nodejs";
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(req: Request) {
  if (!sameOrigin(req) || !withinLimit(req, "address", 40)) return reply({ error: "Please enter your address manually." }, 429);
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return reply({ error: "Address search is unavailable. Please enter your address below." }, 503);
  try {
    const body = await req.json();
    if (typeof body.session !== "string" || !/^[a-zA-Z0-9_-]{16,64}$/.test(body.session)) return reply({ error: "Invalid search session." }, 400);
    const headers = { "Content-Type": "application/json", "X-Goog-Api-Key": key };
    if (typeof body.placeId === "string" && /^[a-zA-Z0-9_-]{1,300}$/.test(body.placeId)) {
      const res = await fetch(`https://places.googleapis.com/v1/places/${body.placeId}?sessionToken=${body.session}`, { headers: { ...headers, "X-Goog-FieldMask": "addressComponents" }, signal: AbortSignal.timeout(6000), cache: "no-store" });
      if (!res.ok) throw new Error("Lookup unavailable");
      const data = await res.json();
      return reply({ address: addressFromGoogle(data.addressComponents || []) });
    }
    if (typeof body.query !== "string" || body.query.trim().length < 3 || body.query.length > 200) return reply({ suggestions: [] });
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", { method: "POST", headers, body: JSON.stringify({ input: body.query.trim(), sessionToken: body.session, includeQueryPredictions: false }), signal: AbortSignal.timeout(6000), cache: "no-store" });
    if (!res.ok) throw new Error("Search unavailable");
    const data = await res.json();
    return reply({ suggestions: (data.suggestions || []).filter((s) => s.placePrediction?.placeId).slice(0, 5).map((s) => ({ id: s.placePrediction.placeId, label: s.placePrediction.text.text })) });
  } catch { return reply({ error: "Address search is unavailable. You can enter your address manually." }, 503); }
}
