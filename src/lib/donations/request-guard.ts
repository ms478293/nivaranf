import { createHash } from "node:crypto";
const buckets = new Map<string, { count: number; until: number }>();
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const supplied = new URL(origin), url = new URL(req.url);
    const host = req.headers.get("host") || url.host;
    const protocol = (req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")).split(",")[0].trim();
    return supplied.host === host && supplied.protocol === `${protocol}:`;
  } catch { return false; }
}
export function withinLimit(req: Request, scope: string, limit = 30) {
  const now = Date.now();
  for (const [key, b] of buckets) if (b.until < now) buckets.delete(key);
  if (buckets.size > 10000) return false;
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const key = scope + createHash("sha256").update(ip).digest("hex");
  const b = buckets.get(key) || { count: 0, until: now + 60000 };
  b.count++; buckets.set(key, b);
  return b.count <= limit;
}
