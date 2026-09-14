import { NextResponse } from "next/server";
import { storeConfigured } from "@/lib/donations/store.mjs";
import { countryFromRequestHeaders } from "@/lib/donations/detect-country";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  return NextResponse.json({
    addressSearch: true,
    monthly: process.env.DONATION_MONTHLY_ENABLED === "true" && storeConfigured(),
    detectedCountry: countryFromRequestHeaders(req.headers),
  }, { headers: { "Cache-Control": "no-store" } });
}
