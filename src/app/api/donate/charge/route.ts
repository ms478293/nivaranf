import { NextResponse } from "next/server";
import { tokenizeNonce, chargePaymentToken, GoDaddyApiError } from "@/lib/godaddy-payments";
import { sendDonationEmails } from "@/lib/donation-emails";
import { parseBilling } from "@/lib/donations/billing";
import { sameOrigin, withinLimit } from "@/lib/donations/request-guard";
import { storeConfigured, claimAttempt, fingerprint, prepareSubscription, finishAttempt, nextMonthlyDate, managementToken } from "@/lib/donations/store.mjs";
import {
  feeCentsFor,
  getDesignation,
  isSelectableDesignation,
  type Dedication,
} from "@/content/donation-designations";

export const runtime = "nodejs";

const MIN_AMOUNT_CENTS = 500; // $5
const MAX_AMOUNT_CENTS = 2_500_000; // $25,000 per card transaction (applies to the charged total too)
const OVER_MAX_MESSAGE = "For gifts over $25,000 please contact us so we can arrange a transfer.";
const DECLINED_MESSAGE = "Your card was declined. Please check the details or try another card.";

const bad = (error: string, status = 400, extra = {}) => NextResponse.json({ error, ...extra }, { status, headers: { "Cache-Control": "no-store" } });

function parseAmountCents(value: unknown): number | null {
  const amount = Number(value);
  if (!Number.isFinite(amount) || !Number.isInteger(amount)) return null;
  return amount;
}

function parseName(value: unknown, max = 100): string | undefined {
  if (typeof value !== "string") return undefined;
  const name = value.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max);
  return name || undefined;
}

/** undefined = not provided, null = provided but invalid */
function parseEmail(value: unknown): string | undefined | null {
  if (typeof value !== "string") return undefined;
  const email = value.trim();
  if (!email) return undefined;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/** undefined = none, null = provided but invalid */
function parseDedication(value: unknown): Dedication | undefined | null {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "object") return null;
  const { type, name } = value as Record<string, unknown>;
  if (type !== "honor" && type !== "memory") return null;
  const clean = parseName(name, 80);
  if (!clean) return null;
  return { type, name: clean };
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return bad("Please use the donation form on our website.", 403);
  if (!withinLimit(req, "charge", 8)) return bad("Please wait a minute before trying again.", 429);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON.");
  }

  const nonce = typeof body?.nonce === "string" ? body.nonce.trim() : "";
  if (nonce.length < 8 || nonce.length > 256) {
    return bad("Payment form did not return a valid card nonce.");
  }

  const baseAmountCents = parseAmountCents(body?.amountCents);
  if (baseAmountCents === null || baseAmountCents < MIN_AMOUNT_CENTS) return bad("Minimum donation is $5.00.");
  if (baseAmountCents > MAX_AMOUNT_CENTS) return bad(OVER_MAX_MESSAGE);

  const coverFees = body?.coverFees === true;
  const feeCents = coverFees ? feeCentsFor(baseAmountCents) : 0;
  const totalCents = baseAmountCents + feeCents;
  if (totalCents > MAX_AMOUNT_CENTS) return bad(OVER_MAX_MESSAGE);

  const designationId = body?.designation ?? "general";
  if (!isSelectableDesignation(designationId)) return bad("Please choose a valid designation.");
  const designation = getDesignation(designationId);

  const dedication = parseDedication(body?.dedication);
  if (dedication === null) return bad("Please add the name of the person you are honoring (up to 80 characters).");

  const email = parseEmail(body?.email);
  if (!email) return bad("Please enter a valid email address so we can send your receipt.");

  const firstName = parseName(body?.firstName);
  const lastName = parseName(body?.lastName);
  if (!firstName || !lastName) return bad("Please enter your first and last name.");
  const billingAddress = parseBilling(body.billingAddress);
  if (!billingAddress) return bad("Please complete your billing address.");
  const frequency = body.frequency ?? "once";
  if (frequency !== "once" && frequency !== "monthly") return bad("Please choose one-time or monthly giving.");
  if (!storeConfigured()) return bad("Online giving is being configured. Please try again later.", 503);
  if (frequency === "monthly" && (process.env.DONATION_MONTHLY_ENABLED !== "true" || body.monthlyConsent !== true)) return bad("Please confirm your monthly donation authorization.");
  const cardAgreement = body.cardAgreement as Record<string, unknown> | undefined;
  if (frequency === "monthly" && (!cardAgreement || typeof cardAgreement !== "object" || cardAgreement.status !== "ACCEPTED" || cardAgreement.email !== email || JSON.stringify(cardAgreement).length > 5000)) return bad("Please accept the saved-card agreement for your monthly gift.");
  const attemptId = typeof body.attemptId === "string" ? body.attemptId : "";
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(attemptId)) return bad("Please refresh the donation form.");
  const input = { email, firstName, lastName, baseAmountCents, feeCents, totalCents, designationId: designation.id, dedication: dedication ?? null, billingAddress, frequency };
  const claimed = claimAttempt(attemptId, fingerprint(input));
  if (!claimed.claimed) {
    if (claimed.conflict) return bad("Your gift details have changed. Please start a new payment attempt.", 409);
    if (claimed.state === "approved") return NextResponse.json(claimed.result, { headers: { "Cache-Control": "no-store" } });
    if (claimed.state === "declined") return bad(DECLINED_MESSAGE, 402, { retryAllowed: true });
    return bad("We are checking your payment status. Please do not submit another gift; contact us if you need help.", 409, { pending: true });
  }
  const reference = `web-donate-${attemptId}`;
  let subscriptionId: string | null = null;

  try {
    const tokenized = await tokenizeNonce(nonce, frequency === "monthly" ? cardAgreement : undefined);
    if (tokenized.status !== "ACTIVE" || !tokenized.paymentToken || (frequency === "monthly" && tokenized.cardOnFile !== true)) {
      finishAttempt(attemptId, "declined", { error: DECLINED_MESSAGE });
      return bad(DECLINED_MESSAGE, 402, { retryAllowed: true });
    }
    const anchor = new Date().toISOString();
    if (frequency === "monthly") {
      prepareSubscription(attemptId, { ...input, paymentToken: tokenized.paymentToken, cardType: tokenized.card?.type, last4: tokenized.card?.numberLast4, anchor, consentVersion: "monthly-v1", consentAt: anchor });
      subscriptionId = attemptId;
    }
    const result = await chargePaymentToken({
      paymentToken: tokenized.paymentToken,
      amountCents: totalCents,
      requestId: attemptId,
      reference,
      designation: designation.id,
      dedication: dedication ? `${dedication.type}:${dedication.name}` : undefined,
      receiptEmail: email,
    });

    if (!result.approved) {
      if (result.status !== "DECLINED") throw new Error("Payment outcome requires reconciliation");
      console.warn("donation declined", {
        reference,
        transactionId: result.transactionId,
        status: result.status,
        processorStatus: result.processorStatus,
        processorCode: result.processorCode,
      });
      finishAttempt(attemptId, "declined", { error: DECLINED_MESSAGE }, subscriptionId);
      return bad(DECLINED_MESSAGE, 402, { retryAllowed: true });
    }

    console.log("donation approved", {
      reference,
      transactionId: result.transactionId,
      baseAmountCents,
      feeCents,
      totalCents,
      designation: designation.id,
      dedication: Boolean(dedication),
      cardType: result.cardType,
      last4: result.last4,
    });

    const nextChargeAt = frequency === "monthly" ? nextMonthlyDate(anchor) : undefined;
    const manageUrl = subscriptionId ? `https://www.nivaranfoundation.org/donate/manage#${managementToken(subscriptionId)}` : undefined;
    const response = { transactionId: result.transactionId, baseAmountCents, feeCents, totalCents, amountCents: totalCents, cardType: tokenized.card?.type, last4: tokenized.card?.numberLast4, email, designation: designation.id, dedication: dedication ?? null, frequency, nextChargeAt, manageUrl };
    finishAttempt(attemptId, "approved", response, subscriptionId, nextChargeAt);
    await sendDonationEmails({
      email,
      firstName,
      lastName,
      baseAmountCents,
      feeCents,
      totalCents,
      designation,
      dedication,
      transactionId: result.transactionId || reference,
      cardType: tokenized.card?.type,
      last4: tokenized.card?.numberLast4,
      reference,
      frequency, nextChargeAt, manageUrl,
    });

    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    // A timeout or processor error can still mean a completed sale. Reconcile first.
    finishAttempt(attemptId, "review", { error: "Payment requires review" }, subscriptionId);
    if (err instanceof GoDaddyApiError) {
      console.error("donation charge requires review", { reference, status: err.status });
    } else {
      console.error("donation charge requires review", { reference });
    }
    return bad("We could not confirm the payment status. Please do not submit another gift. Contact us and quote " + attemptId.slice(0, 8).toUpperCase() + ".", 409, { pending: true });
  }
}
