import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "a450cb77f15ac5428077d787b9e52d2a";
const SITE_URL = "https://www.nivaranfoundation.org";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.INDEXNOW_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const urls: string[] = Array.isArray(body.urls) ? body.urls : [body.url];

  if (!urls.length) {
    return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
  }

  const absoluteUrls = urls.map((u) =>
    u.startsWith("http") ? u : `${SITE_URL}${u}`
  );

  const payload = {
    host: "www.nivaranfoundation.org",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls,
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

  return NextResponse.json({
    submitted: absoluteUrls.length,
    results: results.map((r, i) => ({
      engine: i === 0 ? "indexnow" : "bing",
      status: r.status === "fulfilled" ? r.value.status : "error",
    })),
  });
}
