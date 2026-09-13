import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { claimDue, finishAttempt, getSubscription, nextMonthlyDate, managementToken, reviewCount } from "@/lib/donations/store.mjs";
import { chargePaymentToken } from "@/lib/godaddy-payments";
import { getDesignation, isSelectableDesignation } from "@/content/donation-designations";
import { sendDonationEmails } from "@/lib/donation-emails";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function POST(req: Request) {
  const secret = process.env.DONATION_RENEWAL_SECRET;
  const actual = req.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  if (!secret || actual.length !== expected.length || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.DONATION_MONTHLY_ENABLED !== "true") return NextResponse.json({ enabled: false });
  let processed = 0, failed = 0;
  for (let i = 0; i < 10; i++) {
    const due = claimDue();
    if (!due) break;
    const p = due.payload;
    const reference = `monthly-${due.attemptId}`;
    try {
      if (getSubscription(due.id)?.state === "cancelled") { finishAttempt(due.attemptId, "cancelled", {}); continue; }
      if (!isSelectableDesignation(p.designationId)) throw new Error("Fund closed; manual review required");
      const result = await chargePaymentToken({ paymentToken: p.paymentToken, amountCents: p.totalCents, requestId: due.attemptId, reference, designation: p.designationId, dedication: p.dedication ? `${p.dedication.type}:${p.dedication.name}` : undefined, receiptEmail: p.email, merchantInitiated: true });
      if (!result.approved && result.status !== "DECLINED") throw new Error("Payment outcome requires reconciliation");
      const nextAt = result.approved ? nextMonthlyDate(p.anchor) : null;
      finishAttempt(due.attemptId, result.approved ? "approved" : "declined", { transactionId: result.transactionId, totalCents: p.totalCents }, due.id, nextAt);
      if (result.approved) {
        const cancelled = getSubscription(due.id)?.state === "cancelled";
        await sendDonationEmails({ ...p, reference, designation: getDesignation(p.designationId), transactionId: result.transactionId || reference, frequency: "monthly", nextChargeAt: cancelled ? undefined : nextAt, manageUrl: `https://www.nivaranfoundation.org/donate/manage#${managementToken(due.id)}` });
        processed++;
      } else { failed++; console.error("Monthly gift declined; no automatic retry", { reference }); }
    } catch {
      finishAttempt(due.attemptId, "review", { error: "Payment needs reconciliation" }, due.id);
      failed++; console.error("Monthly gift requires review; no automatic retry", { reference });
    }
  }
  const needsReview = reviewCount();
  return NextResponse.json({ processed, failed, needsReview }, { status: failed || needsReview ? 503 : 200, headers: { "Cache-Control": "no-store" } });
}
