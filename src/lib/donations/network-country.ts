import { BlockList, isIP } from "node:net";
import { countryFromRequestHeaders, normalizeCountryCode } from "./detect-country";

const privateNetworks = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10],
  ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12],
  ["192.168.0.0", 16], ["192.0.0.0", 24], ["192.0.2.0", 24],
  ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24],
  ["224.0.0.0", 3],
] as const) privateNetworks.addSubnet(address, prefix, "ipv4");
for (const [address, prefix] of [
  ["::", 128], ["::1", 128], ["fc00::", 7], ["fe80::", 10],
  ["ff00::", 8], ["2001:db8::", 32],
] as const) privateNetworks.addSubnet(address, prefix, "ipv6");

export function publicVisitorIp(headers: Headers): string | null {
  // Caddy supplies/appends the connecting client's address at the right of XFF.
  // Do not accept a visitor-supplied first entry as their location.
  const forwarded = headers.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",").at(-1) : headers.get("x-real-ip"))?.trim();
  if (!ip || ip.length > 45) return null;
  const version = isIP(ip);
  if (!version || privateNetworks.check(ip, version === 4 ? "ipv4" : "ipv6")) return null;
  return ip;
}

const cache = new Map<string, { country: string | null; expires: number }>();
const pending = new Map<string, Promise<string | null>>();
let providerRetryAt = 0;

export async function networkCountry(req: Request): Promise<string | null> {
  const edgeCountry = countryFromRequestHeaders(req.headers);
  if (edgeCountry) return edgeCountry;
  const ip = publicVisitorIp(req.headers);
  // Only a local development preview may use this machine's outgoing network.
  // Production must never mistake the server's country for the visitor's.
  const localPreview = process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(new URL(req.url).hostname) &&
    ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(req.headers.get("x-forwarded-for")?.trim() || "");
  if (!ip && !localPreview) return null;
  const key = ip || "local-preview";
  const saved = cache.get(key);
  if (saved && saved.expires > Date.now()) return saved.country;
  if (pending.has(key)) return pending.get(key)!;
  if (providerRetryAt > Date.now() || pending.size >= 8) return null;

  const lookup = (async () => {
    let country: string | null = null;
    try {
      // Country only: never send donor details, billing address or payment data.
      const response = await fetch(`https://ipwho.is/${ip || ""}?fields=success,country_code`, {
        cache: "no-store", signal: AbortSignal.timeout(1500),
      });
      if (response.status === 429) {
        const retry = Number(response.headers.get("retry-after"));
        providerRetryAt = Date.now() + (retry > 0 ? Math.min(retry, 86400) : 3600) * 1000;
      }
      if (response.ok) {
        const result = await response.json();
        if (result.success === true) country = normalizeCountryCode(result.country_code);
      }
    } catch { /* Country lookup must never prevent a donation. */ }
    cache.delete(key);
    if (cache.size >= 2000) cache.delete(cache.keys().next().value!);
    cache.set(key, { country, expires: Date.now() + (country ? 86400000 : 300000) });
    return country;
  })();
  pending.set(key, lookup);
  try { return await lookup; } finally { pending.delete(key); }
}
