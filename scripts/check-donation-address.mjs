// Test the address route with synthetic Google responses; never call a real provider.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import ts from "typescript";

const require = createRequire(import.meta.url);
const cache = new Map();
function load(path) {
  path = resolve(path);
  if (cache.has(path)) return cache.get(path);
  const out = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} }; cache.set(path, mod.exports);
  new Function("require", "module", "exports", out)((id) => id.startsWith("@/") ? load(`src/${id.slice(2)}.ts`) : require(id), mod, mod.exports);
  return mod.exports;
}

const originalFetch = globalThis.fetch;
const originalKey = process.env.GOOGLE_PLACES_API_KEY;
let calls = [], response = {}, failed = false;
globalThis.fetch = async (url, options) => {
  calls.push({ url, options });
  return Response.json(response, { status: failed ? 503 : 200 });
};
process.env.GOOGLE_PLACES_API_KEY = "synthetic-test-key";
const post = load("src/app/api/donate/address/route.ts").POST;
const request = (body) => new Request("https://www.nivaranfoundation.org/api/donate/address", { method: "POST", headers: { origin: "https://www.nivaranfoundation.org", "content-type": "application/json", "x-forwarded-for": randomUUID() }, body: JSON.stringify({ session: randomUUID(), ...body }) });

try {
  for (const countryCode of [undefined, "", "ZZ", "us"]) {
    assert.equal((await post(request({ query: "10 Downing", countryCode }))).status, 400);
  }
  assert.equal(calls.length, 0, "No unscoped search can reach the provider");
  response = { suggestions: [{ placePrediction: { placeId: "synthetic-place", text: { text: "10 Downing Street, London, UK" } } }] };
  for (const countryCode of ["GB", "US", "CA", "NP", "HK"]) {
    const result = await post(request({ query: "10 Downing", countryCode }));
    assert.equal(result.status, 200);
    assert.deepEqual(JSON.parse(calls.at(-1).options.body).includedRegionCodes, [countryCode.toLowerCase()]);
    assert.deepEqual((await result.json()).suggestions, [{ id: "synthetic-place", label: "10 Downing Street, London, UK" }]);
  }
  const component = (type, longText, shortText = longText) => ({ types: [type], longText, shortText });
  response = { addressComponents: [component("street_number", "10"), component("route", "Downing Street"), component("postal_town", "London"), component("postal_code", "SW1A 2AA"), component("country", "United Kingdom", "GB")] };
  const session = randomUUID();
  const details = await post(request({ placeId: "synthetic-place", countryCode: "GB", session }));
  assert.equal(details.status, 200);
  assert.deepEqual((await details.json()).address, { line1: "10 Downing Street", line2: "", city: "London", region: "", postalCode: "SW1A 2AA", countryCode: "GB" });
  assert.ok(calls.at(-1).url.endsWith(`?sessionToken=${session}`));
  assert.equal((await post(request({ placeId: "synthetic-place", countryCode: "US" }))).status, 422, "Never fill an address from a different country");
  const before = calls.length;
  assert.deepEqual(await (await post(request({ query: "1", countryCode: "US" }))).json(), { suggestions: [] });
  assert.equal(calls.length, before);
  failed = true;
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  delete process.env.GOOGLE_PLACES_API_KEY;
  const unavailable = calls.length;
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  assert.equal(calls.length, unavailable);
  console.log("Address checks passed: selected-country restriction, GB/US/CA/NP/HK codes, session continuity, address filling, mismatched-country rejection, manual fallback. No real provider calls.");
} finally {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.GOOGLE_PLACES_API_KEY;
  else process.env.GOOGLE_PLACES_API_KEY = originalKey;
}
