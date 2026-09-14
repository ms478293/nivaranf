// Test the address route with synthetic Photon responses; never call a real provider.
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
let calls = [], response = {}, failed = false;
globalThis.fetch = async (url, options) => {
  calls.push({ url, options });
  return Response.json(response, { status: failed ? 503 : 200 });
};
const post = load("src/app/api/donate/address/route.ts").POST;
const request = (body) => new Request("https://www.nivaranfoundation.org/api/donate/address", { method: "POST", headers: { origin: "https://www.nivaranfoundation.org", "content-type": "application/json", "x-forwarded-for": randomUUID() }, body: JSON.stringify(body) });
const billing = load("src/lib/donations/billing.ts");
const house = (over = {}) => ({ properties: { osm_type: "N", osm_id: 1, type: "house", housenumber: "10", name: "10 Downing Street", street: "Downing Street", city: "London", postcode: "SW1A 2AA", countrycode: "GB", ...over } });

try {
  delete process.env.GEOAPIFY_API_KEY;
  for (const countryCode of [undefined, "", "ZZ", "us"]) {
    assert.equal((await post(request({ query: "10 Downing", countryCode }))).status, 400);
  }
  assert.equal(calls.length, 0, "No unscoped search can reach the provider");
  for (const countryCode of ["GB", "US", "CA", "NP", "HK"]) {
    response = { features: [house({ countrycode: countryCode })] };
    const result = await post(request({ query: "10 Downing", countryCode }));
    assert.equal(result.status, 200);
    const url = new URL(calls.at(-1).url);
    assert.equal(url.origin, "https://photon.komoot.io");
    assert.equal(url.pathname, "/api/");
    assert.equal(url.searchParams.get("countrycode"), countryCode);
    assert.equal(url.searchParams.get("q"), "10 Downing");
    assert.equal(url.searchParams.get("limit"), "5");
    assert.deepEqual(url.searchParams.getAll("layer"), ["house", "street"]);
    assert.equal(url.searchParams.get("apiKey"), null);
    assert.match(calls.at(-1).options.headers["User-Agent"], /NivaranFoundation/);
    const data = await result.json();
    assert.equal(data.suggestions.length, 1);
    assert.deepEqual(data.suggestions[0].address, { line1: "10 Downing Street", line2: "", city: "London", region: "", postalCode: "SW1A 2AA", countryCode });
  }
  response = { features: [house(), house(), house({ countrycode: "US", osm_id: 2 }), { properties: { type: "city", name: "London", city: "London", countrycode: "GB" } }, { properties: { type: "locality", name: "Westminster", city: "London", countrycode: "GB" } }, null] };
  const filtered = await (await post(request({ query: "10 Downing", countryCode: "GB" }))).json();
  assert.equal(filtered.suggestions.length, 1, "Discard duplicates, other countries and city-only suggestions");
  assert.equal(billing.addressFromPhoton({ housenumber: "10", street: "Downing Street", name: "Prime Minister’s Office", city: "London", countrycode: "gb" }).line1, "10 Downing Street", "Use the street address instead of an establishment name");
  assert.equal(billing.addressFromPhoton({ street: "Amrit Marg", city: undefined, locality: "Thamel", state: "Bagmati Province", countrycode: "np" }).city, "Thamel");
  assert.equal(billing.addressFromPhoton({ housenumber: "3", street: "Lessingstraße", name: "Lessingstraße 3", city: "Berlin", countrycode: "de" }).line1, "Lessingstraße 3", "Keep provider-localized street order");
  const before = calls.length;
  assert.deepEqual(await (await post(request({ query: "1", countryCode: "US" }))).json(), { suggestions: [] });
  assert.equal(calls.length, before);
  response = { unexpected: "payload" };
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  failed = true;
  assert.equal((await post(request({ query: "10 Downing", countryCode: "GB" }))).status, 503);
  console.log("Photon checks passed: no API key, country restrictions, GB/US/CA/NP/HK, address filling, localized street order, establishment/locality handling, duplicate and wrong-country filtering, manual fallback. No real provider calls.");
} finally {
  globalThis.fetch = originalFetch;
}
