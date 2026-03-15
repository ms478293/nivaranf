import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "a450cb77f15ac5428077d787b9e52d2a";
const SITE_URL = "https://www.nivaranfoundation.org";
const MAX_URLS = 100;

function isValidUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.startsWith("/")) return true;
  try {
    const parsed = new URL(value);
    return parsed.hostname.endsWith("nivaranfoundation.org");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // Fail closed: reject if secret is not configured
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "IndexNow endpoint is not configured" },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Defensive JSON parsing
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Payload must be a JSON object" },
      { status: 400 }
    );
  }

  const payload = body as Record<string, unknown>;
  const rawUrls = Array.isArray(payload.urls)
    ? payload.urls
    : payload.url
      ? [payload.url]
      : [];

  if (rawUrls.length === 0) {
    return NextResponse.json(
      { error: "Provide 'url' (string) or 'urls' (array)" },
      { status: 400 }
    );
  }

  if (rawUrls.length > MAX_URLS) {
    return NextResponse.json(
      { error: `Maximum ${MAX_URLS} URLs per request` },
      { status: 400 }
    );
  }

  const validUrls: string[] = [];
  const invalidUrls: string[] = [];

  for (const raw of rawUrls) {
    if (isValidUrl(raw)) {
      validUrls.push(
        raw.startsWith("/") ? `${SITE_URL}${raw}` : raw
      );
    } else {
      invalidUrls.push(String(raw).slice(0, 200));
    }
  }

  if (validUrls.length === 0) {
    return NextResponse.json(
      { error: "No valid URLs provided", invalidUrls },
      { status: 400 }
    );
  }

  const indexNowPayload = {
    host: "www.nivaranfoundation.org",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: validUrls,
  };

  const results = await Promise.allSettled([
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(indexNowPayload),
    }),
    fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(indexNowPayload),
    }),
  ]);

  return NextResponse.json({
    submitted: validUrls.length,
    ...(invalidUrls.length > 0 && { skipped: invalidUrls }),
    results: results.map((r, i) => ({
      engine: i === 0 ? "indexnow" : "bing",
      status: r.status === "fulfilled" ? r.value.status : "error",
    })),
  });
}
