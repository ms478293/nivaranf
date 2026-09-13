import { NextResponse } from "next/server";
import { verifiedId, getSubscription, cancelSubscription } from "@/lib/donations/store.mjs";
import { sameOrigin, withinLimit } from "@/lib/donations/request-guard";
import { getDesignation } from "@/content/donation-designations";
export const runtime = "nodejs";
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
export async function POST(req: Request) {
  if (!sameOrigin(req) || !withinLimit(req, "manage", 20)) return reply({ error: "Please try again shortly." }, 429);
  try {
    const body = await req.json();
    const id = verifiedId(body.token);
    const sub = id ? getSubscription(id) : null;
    if (!sub) return reply({ error: "This link is not valid. Please use the private link in your donation receipt." }, 404);
    if (body.action === "cancel") { cancelSubscription(id); return reply({ state: "cancelled" }); }
    if (body.action !== "view") return reply({ error: "Invalid request." }, 400);
    return reply({ state: sub.state, nextAt: sub.nextAt, amountCents: sub.payload.totalCents, designation: getDesignation(sub.payload.designationId).label, cardType: sub.payload.cardType, last4: sub.payload.last4 });
  } catch { return reply({ error: "We could not open your monthly gift. Please contact us for help." }, 503); }
}
