// Country detection and failure handling. Provider requests are simulated.
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
assert.equal(geo.pickDetectedCountry({ ip: "US", timeZone: "Europe/London", languages: ["en-GB"] }), "US", "The visitor's network wins over home device settings");
assert.equal(geo.pickDetectedCountry({ ip: "US", timeZone: "America/Toronto", languages: ["en-CA"] }), "US", "A US visitor must not default to Canada because of device settings");
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

const network = load("src/lib/donations/network-country.ts");
for (const ip of ["127.0.0.1", "10.0.0.2", "172.16.0.2", "192.168.1.1", "::1", "::ffff:127.0.0.1", "fc00::1", "fe80::1", "not-an-ip", "8.8.8.8/../../", "192.0.2.1", "2001:db8::1"]) {
  assert.equal(network.publicVisitorIp(headers({ "x-forwarded-for": ip })), null, `Reject private/reserved/invalid address: ${ip}`);
}
assert.equal(network.publicVisitorIp(headers({ "x-forwarded-for": "1.1.1.1, 8.8.8.8" })), "8.8.8.8", "Use the proxy-appended IP, not a supplied first entry");
assert.equal(network.publicVisitorIp(headers({ "x-forwarded-for": "8.8.8.8, 127.0.0.1" })), null, "Do not skip past the immediate proxy's local client");
assert.equal(network.publicVisitorIp(headers({ "x-real-ip": "2001:4860:4860::8888" })), "2001:4860:4860::8888");

const examples = { "8.8.8.8": "US", "9.9.9.9": "CA", "208.67.222.222": "GB", "2001:4860:4860::8888": "NP" };
let providerCalls = 0;
globalThis.fetch = async (input, init) => {
  providerCalls++;
  const url = new URL(input);
  assert.equal(url.origin, "https://ipwho.is");
  assert.equal(url.search, "?fields=success,country_code", "Request country only");
  assert.equal(init.cache, "no-store");
  assert.ok(init.signal instanceof AbortSignal);
  const ip = url.pathname.slice(1);
  if (ip === "8.8.4.4") throw new Error("Simulated provider outage");
  if (ip === "1.0.0.1") return Response.json({ success: true, country_code: "ZZ" });
  if (ip === "1.1.1.1") return Response.json({}, { status: 429, headers: { "retry-after": "60" } });
  assert.ok(examples[ip], "No unplanned external IP lookups");
  return Response.json({ success: true, country_code: examples[ip] });
};
const request = (ip) => new Request("https://www.nivaranfoundation.org/api/donate/country", { headers: ip ? { "x-forwarded-for": ip } : {} });
try {
  const get = load("src/app/api/donate/country/route.ts").GET;
  assert.equal(await network.networkCountry(request()), null, "Never look up the production server's own country");
  assert.equal(await network.networkCountry(request("127.0.0.1")), null);
  const edge = await network.networkCountry(new Request("https://www.nivaranfoundation.org/api/donate/country", { headers: { "cf-ipcountry": "AU" } }));
  assert.equal(edge, "AU");
  assert.equal(providerCalls, 0, "Edge countries and unknown/private visitors need no provider");
  const concurrent = await Promise.all([get(request("8.8.8.8")), get(request("8.8.8.8"))]);
  for (const response of concurrent) {
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.deepEqual(await response.json(), { country: "US" });
  }
  assert.equal(providerCalls, 1, "Deduplicate simultaneous lookups");
  for (const [ip, country] of Object.entries(examples)) assert.equal(await network.networkCountry(request(ip)), country);
  assert.equal(providerCalls, 4, "Reuse cached results for repeat visitors");
  assert.equal(await network.networkCountry(request("8.8.4.4")), null, "Lookup outages must fall back gracefully");
  assert.equal(await network.networkCountry(request("1.0.0.1")), null, "Reject invalid countries");
  assert.equal(await network.networkCountry(request("1.1.1.1")), null, "Free-tier limits must not block the form");
  const callsBeforeCooldown = providerCalls;
  assert.equal(await network.networkCountry(request("4.2.2.2")), null);
  assert.equal(providerCalls, callsBeforeCooldown, "Respect the provider's retry interval");
  assert.equal(await network.networkCountry(request("8.8.8.8")), "US", "Cached countries remain available during a provider cooldown");
} finally {
  globalThis.fetch = originalFetch;
}

console.log("Country checks passed: network-first defaults, IPv4/IPv6, proxy addresses, private-IP rejection, independent uncached settings, cached/deduplicated lookups, outages and rate limits.");
