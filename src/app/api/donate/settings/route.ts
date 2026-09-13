import { NextResponse } from "next/server";
import { storeConfigured } from "@/lib/donations/store.mjs";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ addressSearch: Boolean(process.env.GOOGLE_PLACES_API_KEY), monthly: process.env.DONATION_MONTHLY_ENABLED === "true" && storeConfigured() }, { headers: { "Cache-Control": "no-store" } });
}
