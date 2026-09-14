import { NextResponse } from "next/server";
import { storeConfigured } from "@/lib/donations/store.mjs";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ addressSearch: true, monthly: process.env.DONATION_MONTHLY_ENABLED === "true" && storeConfigured() }, { headers: { "Cache-Control": "no-store" } });
}
