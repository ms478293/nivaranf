// Run: node scripts/check-google-ads.mjs   (Node 22.23 strips .ts types natively)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const calls = [];
globalThis.window = { gtag: (...args) => calls.push(args) };
const load = (tag) => import(`../src/lib/google-ads.ts?${tag}`);

// Unset: no ID, no consent script in the layout, no gtag calls.
delete process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
delete process.env.NEXT_PUBLIC_GOOGLE_ADS_DONATION_LABEL;
let ads = await load("unset");
assert.equal(ads.GOOGLE_ADS_ID, undefined);
ads.trackGoogleDonation(50, "tx-1");
ads.updateGoogleConsent(true);
assert.equal(calls.length, 0);

const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
assert.ok(!/googleadservices|AW-\d/.test(layout), "layout must not hard-code Ads tags");
for (const use of layout.match(/\$\{[^}]*GOOGLE_(ADS_ID|CONSENT_DEFAULTS)[^}]*\}/g) ?? []) {
  assert.ok(use.startsWith("${GOOGLE_ADS_ID ?"), `unguarded Ads output in layout: ${use}`);
}

// Malformed ID (script injection attempt) is ignored.
process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-1');alert(1)//";
ads = await load("bad");
assert.equal(ads.GOOGLE_ADS_ID, undefined);

// Set: one conversion + one GA4 purchase per transaction, USD, no PII.
process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-123456789";
process.env.NEXT_PUBLIC_GOOGLE_ADS_DONATION_LABEL = "AbC-d_1";
ads = await load("set");
ads.trackGoogleDonation(51.65, "tx-9");
ads.trackGoogleDonation(51.65, "tx-9"); // duplicate callback
assert.deepEqual(calls, [
  ["event", "conversion", { value: 51.65, currency: "USD", transaction_id: "tx-9", send_to: "AW-123456789/AbC-d_1" }],
  ["event", "purchase", { value: 51.65, currency: "USD", transaction_id: "tx-9", send_to: "G-QF370FRN47" }],
]);
calls.length = 0;
ads.updateGoogleConsent(false);
ads.updateGoogleConsent(true);
assert.deepEqual(calls, [
  ["consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" }],
  ["consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "denied", analytics_storage: "granted" }],
]);

// Consent defaults: ad measurement granted outside EEA/UK/CH, all denied inside, never personalization.
const script = ads.GOOGLE_CONSENT_DEFAULTS;
assert.ok(script.indexOf("'default'") < script.indexOf("'update'"));
for (const code of ["DE", "FR", "GB", "CH", "NO", "IE"]) assert.ok(script.includes(`"${code}"`), code);
assert.ok(script.includes(ads.COOKIE_CONSENT_KEY));
const cal = [];
new Function("gtag", "localStorage", script)((...a) => cal.push(a), { getItem: () => "accepted" });
assert.equal(cal.length, 3);
assert.deepEqual(cal[0][2], { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "denied", analytics_storage: "granted" });
assert.ok(!("region" in cal[0][2]));
assert.deepEqual(Object.values(cal[1][2]).slice(0, 4), ["denied", "denied", "denied", "denied"]);
assert.deepEqual(cal[2].slice(0, 2), ["consent", "update"]);
assert.equal(cal[2][2].ad_storage, "granted");
assert.equal(cal[2][2].ad_personalization, "denied");

console.log("google-ads OK");
