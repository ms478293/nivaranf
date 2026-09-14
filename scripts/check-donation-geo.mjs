// Country detection: timezone, language, request headers. No real geo provider.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const cache = new Map();
function load(path) {
  path = resolve(path);
  if (!existsSync(path)) {
    if (existsSync(`${path}.ts`)) path = `${path}.ts`;
    else if (existsSync(`${path}.js`)) path = `${path}.js`;
  }
  if (cache.has(path)) return cache.get(path);
  const out = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} }; cache.set(path, mod.exports);
  new Function("require", "module", "exports", out)((id) => {
    if (id.startsWith("@/")) return load(resolve("src", id.slice(2)));
    if (id.startsWith(".")) return load(resolve(dirname(path), id));
    return require(id);
  }, mod, mod.exports);
  return mod.exports;
}

const geo = load("src/lib/donations/detect-country.ts");
assert.equal(geo.countryFromTimeZone("Asia/Kathmandu"), "NP");
assert.equal(geo.countryFromTimeZone("Europe/London"), "GB");
assert.equal(geo.countryFromTimeZone("America/New_York"), "US");
assert.equal(geo.countryFromTimeZone("Australia/Sydney"), "AU");
assert.equal(geo.countryFromTimeZone("Etc/UTC"), null);
assert.equal(geo.countryFromLanguages(["en-GB", "en"]), "GB");
assert.equal(geo.countryFromLanguages(["ne-NP"]), "NP");
assert.equal(geo.countryFromLanguages(["en"]), null, "Do not assume English means United States");
assert.equal(geo.normalizeCountryCode("gb"), "GB");
assert.equal(geo.normalizeCountryCode("XX"), null);
assert.equal(geo.normalizeCountryCode("us"), "US");
assert.equal(geo.pickDetectedCountry({ ip: "GB", timeZone: "Europe/London", languages: ["en-GB"] }), "GB");
assert.equal(geo.pickDetectedCountry({ ip: "US", timeZone: "Europe/London", languages: ["en-GB"] }), "GB", "Two matching local signals beat a disagreeing network country");
assert.equal(geo.pickDetectedCountry({ ip: "US", timeZone: "Europe/London", languages: ["en"] }), "US", "Network country wins when it is the only other country vote");
assert.equal(geo.pickDetectedCountry({ timeZone: "Asia/Kathmandu", languages: ["en"] }), "NP");
assert.equal(geo.pickDetectedCountry({ languages: ["en-IN"] }), "IN");
assert.equal(geo.pickDetectedCountry({ ip: "ZZ", timeZone: "Not/AZone", languages: ["en"] }), null);

const headers = (pairs) => new Headers(pairs);
assert.equal(geo.countryFromRequestHeaders(headers({ "cf-ipcountry": "np" })), "NP");
assert.equal(geo.countryFromRequestHeaders(headers({ "cf-ipcountry": "XX" })), null);
assert.equal(geo.countryFromRequestHeaders(headers({ "x-vercel-ip-country": "GB" })), "GB");

const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error("settings must not call a geo provider"); };
try {
  const get = load("src/app/api/donate/settings/route.ts").GET;
  const withCountry = await get(new Request("https://www.nivaranfoundation.org/api/donate/settings", { headers: { "cf-ipcountry": "GB" } }));
  assert.equal(withCountry.status, 200);
  assert.equal(withCountry.headers.get("cache-control"), "no-store");
  const body = await withCountry.json();
  assert.equal(body.addressSearch, true);
  assert.equal(body.detectedCountry, "GB");
  const unknown = await (await get(new Request("https://www.nivaranfoundation.org/api/donate/settings", { headers: { "cf-ipcountry": "XX" } }))).json();
  assert.equal(unknown.detectedCountry, null);
} finally {
  globalThis.fetch = originalFetch;
}

console.log("Country detection checks passed: Kathmandu/London/New York/Sydney, language regions, no English-as-US assumption, header votes, uncached settings, no geo provider calls.");
