import { createSign, randomUUID } from "node:crypto";

/**
 * GoDaddy Payments (Poynt Cloud API) — server-only.
 * Card data never touches this server: the browser gets a single-use nonce from the
 * Poynt Collect iframe, we exchange it for a payment token and charge that token.
 */

const API_BASE = (process.env.GD_API_BASE || "https://services.poynt.net").replace(/\/$/, "");

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

function headers(token?: string, requestId?: string): Record<string, string> {
  return {
    "api-version": "1.2",
    accept: "application/json",
    "content-type": "application/json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    ...(requestId ? { "poynt-request-id": requestId } : {}),
  };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

/** JWT-bearer grant signed with the app private key (RS256). Cached until 60s before expiry. */
export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.token;

  const appId = env("GD_APP_ID");
  const pem = Buffer.from(env("GD_PRIVATE_KEY_B64"), "base64").toString("utf8");
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: appId,
    sub: appId,
    aud: API_BASE,
    iat: now,
    exp: now + 300,
    jti: randomUUID(),
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(pem, "base64url");

  const res = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { ...headers(), "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grantType: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GoDaddy Payments token request failed (${res.status})`);
  const json = (await res.json()) as { accessToken: string; expiresIn?: number };
  const ttlMs = (Number(json.expiresIn) || 3600) * 1000;
  cachedToken = { token: json.accessToken, expiresAt: Date.now() + ttlMs - 60_000 };
  return cachedToken.token;
}

export class GoDaddyApiError extends Error {
  constructor(public status: number, public body: unknown) {
    super(`GoDaddy Payments API ${status}`);
  }
}

async function post<T>(path: string, body: unknown, requestId: string = randomUUID()): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: headers(token, requestId),
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(25000),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new GoDaddyApiError(res.status, json);
  return json as T;
}

type TokenizeResponse = {
  cardOnFile?: boolean;
  status?: "ACTIVE" | "INVALID" | string;
  paymentToken?: string;
  card?: { type?: string; numberLast4?: string };
  avsResponse?: { addressResult?: string; postalCodeResult?: string };
  cvvResponse?: string;
};

type ChargeResponse = {
  id?: string;
  status?: string;
  amounts?: { transactionAmount?: number; currency?: string };
  processorResponse?: { status?: string; statusCode?: string; statusMessage?: string; approvalCode?: string };
};

export type ChargeResult = {
  approved: boolean;
  transactionId?: string;
  status?: string;
  processorStatus?: string;
  processorCode?: string;
  cardType?: string;
  last4?: string;
};

export type PaymentInput = {
  amountCents: number;
  reference: string;
  requestId: string;
  designation: string;
  dedication?: string;
  receiptEmail?: string;
  merchantInitiated?: boolean;
};

export async function tokenizeNonce(nonce: string, cardAgreement?: Record<string, unknown>) {
  const businessId = env("GD_BUSINESS_ID");
  return post<TokenizeResponse>(`/businesses/${businessId}/cards/tokenize`, { nonce, ...(cardAgreement ? { card: { cardAgreement } } : {}) });
}

/** The same multi-use payment token endpoint documented for recurring payments. */
export async function chargePaymentToken(input: PaymentInput & { paymentToken: string }): Promise<ChargeResult> {
  const businessId = env("GD_BUSINESS_ID");
  const references = [
    { type: "CUSTOM", customType: "donation", id: input.reference },
    { type: "CUSTOM", customType: "designation", id: input.designation },
    ...(input.dedication ? [{ type: "CUSTOM", customType: "dedication", id: input.dedication.slice(0, 100) }] : []),
  ];
  const tx = await post<ChargeResponse>(`/businesses/${businessId}/cards/tokenize/charge`, {
    action: "SALE",
    context: { businessId },
    amounts: { transactionAmount: input.amountCents, orderAmount: input.amountCents, currency: "USD" },
    fundingSource: { cardToken: input.paymentToken },
    // Documented merchant-initiated saved-card charge; our journal schedules renewals.
    ...(input.merchantInitiated ? { mit: true, intent: "UNSCHEDULED_COF_TXN" } : {}),
    emailReceipt: Boolean(input.receiptEmail) && !process.env.SMTP_HOST,
    ...(input.receiptEmail && !process.env.SMTP_HOST ? { receiptEmailAddress: input.receiptEmail } : {}),
    references,
  }, input.requestId);
  return {
    approved: (tx.status === "CAPTURED" || tx.status === "AUTHORIZED") && tx.processorResponse?.status === "Successful",
    transactionId: tx.id, status: tx.status, processorStatus: tx.processorResponse?.status, processorCode: tx.processorResponse?.statusCode,
  };
}

export async function chargeNonce(input: PaymentInput & { nonce: string }): Promise<ChargeResult> {
  const tokenized = await tokenizeNonce(input.nonce);
  if (tokenized.status !== "ACTIVE" || !tokenized.paymentToken) return { approved: false, status: tokenized.status || "INVALID", processorStatus: "TokenizeFailed" };
  return { ...await chargePaymentToken({ ...input, paymentToken: tokenized.paymentToken }), cardType: tokenized.card?.type, last4: tokenized.card?.numberLast4 };
}
