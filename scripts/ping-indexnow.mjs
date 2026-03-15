#!/usr/bin/env node

const INDEXNOW_KEY = "a450cb77f15ac5428077d787b9e52d2a";
const ALLOWED_HOSTS = new Set([
  "www.nivaranfoundation.org",
  "nivaranfoundation.org",
  "global.nivaranfoundation.org",
  "usa.nivaranfoundation.org",
]);

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { urls: [] };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      fail(`Unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    if (key === "dry-run") {
      args.dryRun = true;
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      fail(`Missing value for --${key}`);
    }

    if (key === "url") {
      args.urls.push(value);
    } else if (key === "urls") {
      args.urls.push(
        ...value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      );
    } else {
      args[key] = value;
    }

    i += 1;
  }

  return args;
}

function resolveUrl(value) {
  try {
    const parsed = new URL(value);
    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function buildPayload(host, urls) {
  return {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
}

async function submitPayload(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return {
    endpoint: url,
    ok: response.ok,
    status: response.status,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const uniqueUrls = Array.from(
    new Set(args.urls.map((item) => item.trim()).filter(Boolean)),
  );

  if (uniqueUrls.length === 0) {
    fail("Provide at least one --url or --urls entry");
  }

  const grouped = new Map();
  const invalidUrls = [];

  for (const value of uniqueUrls) {
    const normalized = resolveUrl(value);
    if (!normalized) {
      invalidUrls.push(value);
      continue;
    }
    const host = new URL(normalized).hostname;
    const list = grouped.get(host) || [];
    list.push(normalized);
    grouped.set(host, list);
  }

  if (grouped.size === 0) {
    fail(`No valid URLs provided. Invalid: ${invalidUrls.join(", ")}`);
  }

  const payloads = Array.from(grouped.entries()).map(([host, urls]) =>
    buildPayload(host, urls),
  );

  if (args.dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          payloads,
          ...(invalidUrls.length > 0 ? { invalidUrls } : {}),
        },
        null,
        2,
      ),
    );
    return;
  }

  const results = [];
  for (const payload of payloads) {
    const submissions = await Promise.allSettled([
      submitPayload("https://api.indexnow.org/indexnow", payload),
      submitPayload("https://www.bing.com/indexnow", payload),
    ]);

    results.push({
      host: payload.host,
      submitted: payload.urlList.length,
      results: submissions.map((entry) =>
        entry.status === "fulfilled"
          ? entry.value
          : {
              endpoint: "unknown",
              ok: false,
              status: "error",
              error: String(entry.reason || "Unknown error"),
            },
      ),
    });
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        results,
        ...(invalidUrls.length > 0 ? { invalidUrls } : {}),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
