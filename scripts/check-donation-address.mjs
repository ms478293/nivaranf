// Test the address route with synthetic Geoapify responses; never call a real provider.
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
const originalKey = process.env.GEOAPIFY_API_KEY;
let calls = [], response = {}, failed = false;
globalThis.fetch = async (url, options) => {
  calls.push({ url, options });
  return Response.json(response, { status: failed ? 503 : 200 });
};
process.env.GEOAPIFY_API_KEY = "synthetic-test-key";
const post = load("src/app/api/donate/address/route.ts").POST;
const request = (body) => new Request("https://www.nivaranfoundation.org/api/donate/address", { method: "POST", headers: { origin: "https://www.nivaranfoundation.org", "content-type": "application/json", "x-forwarded-for": randomUUID() }, body: JSON.stringify(body) });
const billing = load("src/lib/donations/billing.ts");
const example = { housenumber: "10", street: "Downing Street", address_line1: "10 Downing Street", address_line2: "London SW1A 2AA", city: "London", postcode: "SW1A 2AA", country_code: "gb", formatted: "10 Downing Street, London, UK", result_type: "building" };

try {
  for (const countryCode of [undefined, "", "ZZ", "us"]) {
    assert.equal((await post(request({ query: "10 Downing", countryCode }))).status, 400);
  }
  assert.equal(calls.length, 0, "No unscoped search can reach the provider");
  for (const countryCode of ["GB", "US", "CA", "NP", "HK"]) {
    response = { results: [{ ...example, country_code: countryCode.toLowerCase() }] };
    const result = await post(request({ query: "10 Downing", countryCode }));
    assert.equal(result.status, 200);
    const url = new URL(calls.at(-1).url);
    assert.equal(url.origin, "https://api.geoapify.com");
    assert.equal(url.pathname, "/v1/geocode/autocomplete");
    assert.equal(url.searchParams.get("filter"), `countrycode:${countryCode.toLowerCase()}`);
    assert.equal(url.searchParams.get("text"), "10 Downing");
    assert.equal(url.searchParams.get("limit"), "5");
    assert.equal(url.searchParams.get("apiKey"), "synthetic-test-key");
    const data = await result.json();
    assert.equal(data.suggestions.length, 1);
    assert.deepEqual(data.suggestions[0].address, { line1: "10 Downing Street", line2: "", city: "London", region: "", postalCode: "SW1A 2AA", countryCode });
    assert.ok(!JSON.stringify(data).includes("synthetic-test-key"));
  }
  response = { results: [example, example, { ...example, country_code: "us" }, { country_code: "gb", formatted: "London, UK", address_line1: "London", result_type: "city" }, null] };
  const filtered = await (await post(request({ query: "10 Downing", countryCode: "GB" }))).json();
  assert.equal(filtered.suggestions.length, 1, "Discard duplicates, other countries and city-only suggestions");
  assert.equal(billing.addressFromGeoapify({ ...example, address_line1: "Prime Minister’s Office" }).line1, "10 Downing Street", "Use the street address instead of an establishment name");
  assert.equal(billing.addressFromGeoapify({ ...example, city: undefined, village: "Village", state: "Region" }).city, "Village");
  assert.equal(billing.addressFromGeoapify({ ...example, housenumber: "3", street: "Lessingstraße", address_line1: "Lessingstraße 3", country_code: "de" }).line1, "Lessingstraße 3", "Keep provider-localized street order");
  const before = calls.length;
  assert.deepEqual(await (await post(request({ query: "1", countryCode: "US" }))).json(), { suggestions: [] });
  assert.equal(calls.length, before);
  response = { unexpected: "payload" };
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  failed = true;
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  delete process.env.GEOAPIFY_API_KEY;
  const unavailable = calls.length;
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  assert.equal(calls.length, unavailable);
  console.log("Geoapify checks passed: country restrictions, GB/US/CA/NP/HK, address filling, localized street order, establishment/village handling, duplicate and wrong-country filtering, private key, manual fallback. No real provider calls.");
} finally {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.GEOAPIFY_API_KEY;
  else process.env.GEOAPIFY_API_KEY = originalKey;
}
