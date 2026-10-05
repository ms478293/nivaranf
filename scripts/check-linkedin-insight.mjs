// Run: node scripts/check-linkedin-insight.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const source = ts.transpileModule(read("src/lib/linkedin-insight.ts"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

// Fresh module per scenario with a fake browser: stored cookie choice and time zone.
function load({ choice = null, timeZone = "America/New_York" } = {}) {
  const scripts = [];
  const tracked = [];
  const window = {};
  const document = { createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) } };
  const localStorage = { getItem: (key) => (key === "nivaran_cookie_consent" ? choice : null) };
  const Intl = { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone }) }) };
  const mod = { exports: {} };
  const require = (id) => {
    assert.equal(id, "@/lib/google-ads");
    return { COOKIE_CONSENT_KEY: "nivaran_cookie_consent" };
  };
  new Function("require", "module", "exports", "window", "document", "localStorage", "Intl", source)(
    require, mod, mod.exports, window, document, localStorage, Intl,
  );
  // Stand-in for LinkedIn's script replacing the queue stub.
  const loaded = () => { window.lintrk = (...args) => tracked.push(args); };
  return { li: mod.exports, window, scripts, tracked, loaded };
}

// US visitor, no banner choice yet: implied consent, one script, one conversion per transaction.
let t = load();
t.li.loadLinkedInInsight();
t.li.loadLinkedInInsight();
assert.equal(t.scripts.length, 1);
assert.equal(t.scripts[0].src, "https://snap.licdn.com/li.lms-analytics/insight.min.js");
assert.equal(t.scripts[0].async, true);
assert.deepEqual(t.window._linkedin_data_partner_ids, ["9799418"]);
t.loaded();
t.li.trackLinkedInDonation("tx-1");
t.li.trackLinkedInDonation("tx-1"); // duplicate callback
t.li.trackLinkedInDonation("tx-2");
assert.deepEqual(t.tracked, [
  ["track", { conversion_id: 31124826 }],
  ["track", { conversion_id: 31124826 }],
]);

// Calls before LinkedIn's script arrives are queued, not lost.
t = load();
t.li.trackLinkedInDonation("tx-3");
assert.deepEqual(t.window.lintrk.q, [["track", { conversion_id: 31124826 }]]);

// Declined anywhere, or Europe without an explicit Accept: nothing loads or fires.
for (const opts of [{ choice: "declined" }, { timeZone: "Europe/Berlin" }, { choice: "declined", timeZone: "Europe/London" }]) {
  t = load(opts);
  t.li.loadLinkedInInsight();
  t.li.trackLinkedInDonation("tx-4");
  assert.equal(t.scripts.length, 0, JSON.stringify(opts));
  assert.equal(t.window.lintrk, undefined, JSON.stringify(opts));
}

// Europe after Accept: loads.
t = load({ choice: "accepted", timeZone: "Europe/Paris" });
t.li.loadLinkedInInsight();
assert.equal(t.scripts.length, 1);

// Wiring: CSP allows the script; banner loads the tag; donation tracking stays isolated in try/catch.
assert.ok(/script-src[^;]*https:\/\/snap\.licdn\.com/.test(read("next.config.ts")), "CSP script-src must allow snap.licdn.com");
const banner = read("src/components/new/CookieConsent/CookieConsent.tsx");
assert.equal(banner.match(/loadLinkedInInsight\(\)/g)?.length, 2, "banner loads the tag on mount and on Accept");
assert.ok(/try \{ trackLinkedInDonation\(transactionId\); \} catch/.test(read("src/lib/donations/analytics.ts")));
assert.ok(read("src/content/privacy-policy.ts").includes("LinkedIn Insight Tag"));

console.log("linkedin-insight OK");
