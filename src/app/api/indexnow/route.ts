import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "a450cb77f15ac5428077d787b9e52d2a";
const DEFAULT_HOST = "www.nivaranfoundation.org";
const ALLOWED_HOSTS = new Set([
  "www.nivaranfoundation.org",
  "nivaranfoundation.org",
  "global.nivaranfoundation.org",
  "usa.nivaranfoundation.org",
]);
const MAX_URLS = 100;

function resolveUrl(value: string): { host: string; url: string } | null {
  if (value.startsWith("/")) {
    const url = `https://${DEFAULT_HOST}${value}`;
    return { host: DEFAULT_HOST, url };
  }
  try {
    const parsed = new URL(value);
    if (!ALLOWED_HOSTS.has(parsed.hostname)) return null;
    return { host: parsed.hostname, url: value };
  } catch {
    return null;
  }
}

async function submitToIndexNow(host: string, urls: string[]) {
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const results = await Promise.allSettled([
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
    fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  ]);

  return {
    host,
    submitted: urls.length,
    results: results.map((r, i) => ({
      engine: i === 0 ? "indexnow" : "bing",
      status: r.status === "fulfilled" ? r.value.status : "error",
    })),
  };
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

  // Group valid URLs by host for correct IndexNow submission
  const byHost = new Map<string, string[]>();
  const invalidUrls: string[] = [];

  for (const raw of rawUrls) {
    if (typeof raw !== "string") {
      invalidUrls.push(String(raw).slice(0, 200));
      continue;
    }
    const resolved = resolveUrl(raw);
    if (resolved) {
      const list = byHost.get(resolved.host) || [];
      list.push(resolved.url);
      byHost.set(resolved.host, list);
    } else {
      invalidUrls.push(raw.slice(0, 200));
    }
  }

  if (byHost.size === 0) {
    return NextResponse.json(
      { error: "No valid URLs provided", invalidUrls },
      { status: 400 }
    );
  }

  // Submit per-host so each payload has the correct host/keyLocation
  const submissions = await Promise.all(
    Array.from(byHost.entries()).map(([host, urls]) =>
      submitToIndexNow(host, urls)
    )
  );

  return NextResponse.json({
    submissions,
    ...(invalidUrls.length > 0 && { skipped: invalidUrls }),
  });
}
