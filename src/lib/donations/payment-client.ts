import type { Dedication } from "@/content/donation-designations";

export type ChargeResult = {
  transactionId?: string;
  frequency?: "once" | "monthly";
  nextChargeAt?: string;
  manageUrl?: string;
  baseAmountCents: number;
  feeCents: number;
  totalCents: number;
  cardType?: string;
  last4?: string;
  email: string;
  designation: string;
  dedication: Dedication | null;
};

export class DonationPaymentError extends Error {
  constructor(message: string, public pending = false, public retryAllowed = false) { super(message); }
}

/** A lost response does not prove a failed charge. Keep the form locked for review. */
export async function submitDonationPayment(body: Record<string, unknown>, send: typeof fetch = fetch): Promise<ChargeResult> {
  const uncertain = () => new DonationPaymentError("We could not confirm your payment status. Please do not submit another gift. Contact us and quote " + String(body.attemptId).slice(0, 8).toUpperCase() + ".", true);
  let response: Response;
  let payload: ChargeResult & { error?: string; pending?: boolean; retryAllowed?: boolean };
  try {
    response = await send("/api/donate/charge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    payload = await response.json();
    if (!payload || typeof payload !== "object") throw uncertain();
  } catch { throw uncertain(); }
  if (!response.ok || payload.error) {
    const retryAllowed = response.status === 402 && payload.retryAllowed === true;
    const pending = payload.pending === true || response.status >= 500 || response.status === 409;
    throw new DonationPaymentError(payload.error || "We couldn't process your donation.", pending, retryAllowed && !pending);
  }
  if (!Number.isInteger(payload.totalCents) || payload.totalCents < 500 || !Number.isInteger(payload.baseAmountCents) || !Number.isInteger(payload.feeCents) || payload.totalCents !== payload.baseAmountCents + payload.feeCents || !payload.email || !payload.designation) throw uncertain();
  return payload;
}
