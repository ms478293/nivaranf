import { NextResponse } from "next/server";
import { networkCountry } from "@/lib/donations/network-country";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return NextResponse.json({ country: await networkCountry(req) }, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
