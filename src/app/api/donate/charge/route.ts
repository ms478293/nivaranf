import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { chargeNonce, GoDaddyApiError } from "@/lib/godaddy-payments";
import { sendDonationEmails } from "@/lib/donation-emails";
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

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

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

  const reference = `web-donate-${randomUUID()}`;

  try {
    const result = await chargeNonce({
      nonce,
      amountCents: totalCents,
      reference,
      designation: designation.id,
      dedication: dedication ? `${dedication.type}:${dedication.name}` : undefined,
      receiptEmail: email,
    });

    if (!result.approved) {
      console.warn("donation declined", {
        reference,
        transactionId: result.transactionId,
        status: result.status,
        processorStatus: result.processorStatus,
        processorCode: result.processorCode,
      });
      return bad(DECLINED_MESSAGE, 402);
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
      cardType: result.cardType,
      last4: result.last4,
      reference,
    });

    return NextResponse.json({
      transactionId: result.transactionId,
      baseAmountCents,
      feeCents,
      totalCents,
      amountCents: totalCents, // legacy field = amount charged
      cardType: result.cardType,
      last4: result.last4,
      email,
      designation: designation.id,
      dedication: dedication ?? null,
    });
  } catch (err) {
    if (err instanceof GoDaddyApiError) {
      console.error("donation charge API error", { reference, status: err.status, body: err.body });
      if (err.status >= 400 && err.status < 500) return bad(DECLINED_MESSAGE, 402);
    } else {
      console.error("donation charge failed", { reference, err });
    }
    return bad("We couldn't process your donation right now. Please try again in a moment.", 500);
  }
}
