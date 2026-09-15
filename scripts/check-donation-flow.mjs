// Exercise real route validation and journal with a simulated processor and mailer.
// No network calls or real charges can be made by this test.
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { randomBytes, randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
const dir = mkdtempSync(join(tmpdir(), "nivaran-flow-test-"));
process.env.DONATION_DATA_DIR = dir;
process.env.DONATION_ENCRYPTION_KEY = randomBytes(32).toString("hex");
process.env.DONATION_MONTHLY_ENABLED = "true";
process.env.DONATION_RENEWAL_SECRET = randomBytes(32).toString("hex");
const store = await import("../src/lib/donations/store.mjs");
let calls = 0, emails = 0, behavior = "approved", lastInput, lastEmail, mailThrows = false;
let googleThrows = false, metaThrows = false;
const googleEvents = [], metaEvents = [];
const processor = {
  GoDaddyApiError: class extends Error {},
  tokenizeNonce: async (_nonce, agreement) => ({ status: "ACTIVE", paymentToken: "synthetic-token", cardOnFile: behavior !== "no-cof" && !!agreement, card: { type: "VISA", numberLast4: "4242" } }),
  chargePaymentToken: async (input) => { calls++; lastInput = input; if (behavior === "timeout") throw new Error("Simulated uncertain result"); return { approved: behavior === "approved", status: behavior === "declined" ? "DECLINED" : behavior === "approved" ? "CAPTURED" : "PENDING", transactionId: "simulated-transaction" }; },
};
const mocks = {
  "@/lib/godaddy-payments": processor,
  "@/lib/donation-emails": { sendDonationEmails: async (input) => { emails++; lastEmail = input; if (mailThrows) throw new Error("Simulated mailer failure"); } },
  "@/lib/donations/store.mjs": store,
  "@/lib/google-ads": { trackGoogleDonation: (...args) => { googleEvents.push(args); if (googleThrows) throw new Error("Simulated Google failure"); } },
  "@/lib/meta-pixel": {
    trackDonation: (...args) => { metaEvents.push(args); if (metaThrows) throw new Error("Simulated Meta failure"); },
    trackDonateClick: () => { throw new Error("Simulated checkout tracking failure"); },
  },
};
const cache = new Map();
function load(path) {
  path = resolve(path);
  if (cache.has(path)) return cache.get(path);
  const out = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} }; cache.set(path, mod.exports);
  new Function("require", "module", "exports", out)((id) => mocks[id] || (id.startsWith("@/") ? load(`src/${id.slice(2)}.ts`) : require(id)), mod, mod.exports);
  return mod.exports;
}
const charge = load("src/app/api/donate/charge/route.ts").POST;
const renew = load("src/app/api/donate/renew/route.ts").POST;
const manage = load("src/app/api/donate/manage/route.ts").POST;
const bill = load("src/lib/donations/billing.ts");
const client = load("src/lib/donations/payment-client.ts");
const request = (path, body, ip = randomUUID()) => new Request(`https://www.nivaranfoundation.org/api/donate/${path}`, { method: "POST", headers: { origin: "https://www.nivaranfoundation.org", "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) });
const base = () => ({ attemptId: randomUUID(), nonce: "synthetic-nonce", amountCents: 3000, designation: "maternal-child-health", frequency: "once", email: "donor@example.invalid", firstName: "Test", lastName: "Donor", billingAddress: { line1: "1 Test Street", line2: "", city: "Toronto", region: "ON", countryCode: "CA", postalCode: "M5V 1A1" } });
try {
  const { trackCompletedDonation, trackDonationCheckout } = load("src/lib/donations/analytics.ts");
  assert.doesNotThrow(() => trackDonationCheckout(100));
  assert.equal(googleEvents.length, 0, "opening checkout must not count as a donation");
  for (const failures of [[false, true], [true, false], [true, true], [false, false]]) {
    [googleThrows, metaThrows] = failures;
    googleEvents.length = 0; metaEvents.length = 0;
    assert.doesNotThrow(() => trackCompletedDonation(100, "approved-test-transaction"));
    assert.deepEqual(googleEvents, [[100, "approved-test-transaction"]]);
    assert.deepEqual(metaEvents, [[100]]);
  }
  mailThrows = true;
  const mailFailure = base(), callsBeforeMailFailure = calls;
  const confirmed = await charge(request("charge", mailFailure));
  assert.equal(confirmed.status, 200, "receipt failure must not conceal an approved payment");
  const confirmedPayload = await confirmed.json();
  assert.equal(store.claimAttempt(mailFailure.attemptId, "different").state, "approved");
  const replay = await charge(request("charge", mailFailure));
  assert.equal(replay.status, 200);
  assert.deepEqual(await replay.json(), confirmedPayload);
  assert.equal(calls, callsBeforeMailFailure + 1, "replay after receipt failure must not charge twice");
  mailThrows = false;
  calls = 0; emails = 0;
  const attempt = { attemptId: randomUUID() };
  const isUncertain = (error) => error instanceof client.DonationPaymentError && error.pending && !error.retryAllowed;
  await assert.rejects(client.submitDonationPayment(attempt, async () => { throw new Error("Connection lost after sending payment"); }), isUncertain);
  await assert.rejects(client.submitDonationPayment(attempt, async () => new Response("<html>Gateway timeout</html>", { status: 504 })), isUncertain);
  await assert.rejects(client.submitDonationPayment(attempt, async () => Response.json({})), isUncertain);
  await assert.rejects(client.submitDonationPayment(attempt, async () => Response.json({ error: "Checking payment", pending: true }, { status: 409 })), isUncertain);
  await assert.rejects(client.submitDonationPayment(attempt, async () => Response.json({ error: "Declined", retryAllowed: true }, { status: 402 })), (error) => error.retryAllowed && !error.pending);
  const success = { totalCents: 3000, baseAmountCents: 3000, feeCents: 0, email: "donor@example.invalid", designation: "general" };
  assert.deepEqual(await client.submitDonationPayment(attempt, async () => Response.json(success)), success);
  const v = base();
  assert.equal((await charge(request("charge", { ...v, billingAddress: { ...v.billingAddress, countryCode: "ZZ" } }))).status, 400);
  assert.equal((await charge(request("charge", { ...v, designation: "vidya" }))).status, 400);
  assert.equal((await charge(request("charge", { ...v, frequency: "monthly" }))).status, 400);
  assert.equal(calls, 0);
  assert.equal((await charge(request("charge", v))).status, 200);
  assert.equal((await charge(request("charge", v))).status, 200);
  assert.equal(calls, 1); assert.equal(emails, 1);
  assert.equal((await charge(request("charge", { ...v, amountCents: 5000 }))).status, 409);
  const monthly = { ...base(), frequency: "monthly", monthlyConsent: true, cardAgreement: { email: "donor@example.invalid", status: "ACCEPTED", metadata: {} } };
  behavior = "no-cof";
  assert.equal((await charge(request("charge", monthly))).status, 402);
  assert.equal(calls, 1, "Never charge a monthly gift without confirmed reusable credentials");
  behavior = "approved"; monthly.attemptId = randomUUID();
  const r = await charge(request("charge", monthly)); assert.equal(r.status, 200);
  const paid = await r.json();
  assert.equal(paid.frequency, "monthly"); assert.ok(paid.manageUrl.includes("#"));
  assert.equal(store.getSubscription(monthly.attemptId).state, "active");
  const token = paid.manageUrl.split("#")[1];
  assert.equal((await manage(request("manage", { action: "view", token: "wrong" }))).status, 404);
  assert.equal((await manage(request("manage", { action: "cancel", token }))).status, 200);
  assert.equal(store.getSubscription(monthly.attemptId).state, "cancelled");
  behavior = "timeout"; const uncertain = base();
  assert.equal((await charge(request("charge", uncertain))).status, 409);
  const n = calls;
  assert.equal((await charge(request("charge", uncertain))).status, 409); assert.equal(calls, n);
  behavior = "pending"; const pending = base();
  const pendingResponse = await charge(request("charge", pending));
  assert.equal(pendingResponse.status, 409); assert.equal((await pendingResponse.json()).pending, true);
  assert.equal(store.claimAttempt(pending.attemptId, "different").state, "review");
  behavior = "approved";
  const dueId = randomUUID(); store.prepareSubscription(dueId, { ...base(), designationId: "general", baseAmountCents: 3000, feeCents: 0, totalCents: 3000, paymentToken: "synthetic-token", anchor: "2025-01-31T12:00:00.000Z" });
  store.claimAttempt(dueId, "due"); store.finishAttempt(dueId, "approved", {}, dueId, "2025-02-28T12:00:00.000Z");
  assert.equal((await renew(new Request("https://www.nivaranfoundation.org/api/donate/renew", { method: "POST" }))).status, 401);
  const renewalRequest = () => new Request("https://www.nivaranfoundation.org/api/donate/renew", { method: "POST", headers: { authorization: `Bearer ${process.env.DONATION_RENEWAL_SECRET}` } });
  await renew(renewalRequest());
  assert.equal(lastInput.merchantInitiated, true); assert.equal(store.getSubscription(dueId).state, "active");
  const once = calls; await renew(renewalRequest()); assert.equal(calls, once);
  assert.equal(bill.billingError({ ...v.billingAddress, countryCode: "HK", postalCode: "" }), null);
  assert.equal(bill.parseBilling({ ...v.billingAddress, city: "<script>" }), null);
  const address = bill.addressFromPhoton({ housenumber: "10", street: "Downing Street", city: "London", countrycode: "gb" });
  assert.equal(address.line1, "10 Downing Street"); assert.equal(address.city, "London"); assert.equal(address.countryCode, "GB");
  // Opening the flood appeal must preserve its identity through both payment paths.
  for (const frequency of ["once", "monthly"]) {
    const flood = { ...base(), designation: "nepal-flood-recovery", frequency,
      ...(frequency === "monthly" ? { monthlyConsent: true, cardAgreement: { email: "donor@example.invalid", status: "ACCEPTED" } } : {}) };
    const receipt = await charge(request("charge", flood));
    assert.equal(receipt.status, 200);
    const body = await receipt.json();
    assert.equal(body.designation, "nepal-flood-recovery");
    assert.equal(lastInput.designation, "nepal-flood-recovery", "Processor must receive flood designation");
    assert.equal(lastEmail.designation.id, "nepal-flood-recovery", "Receipt must name the flood appeal");
    assert.equal(store.claimAttempt(flood.attemptId, "read-for-test").result.designation, "nepal-flood-recovery");
    if (frequency === "monthly") assert.equal(store.getSubscription(flood.attemptId).payload.designationId, "nepal-flood-recovery");
  }
  console.log("Donation route checks passed: validation, monthly consent/COF, replay, conflict, cancellation, uncertain charge, authenticated renewal, address parsing. No real processor or email calls.");
} finally { rmSync(dir, { recursive: true, force: true }); }
