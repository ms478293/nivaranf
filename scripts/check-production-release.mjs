// Read-only staging checks. Never submit a donation or enter donor/card details.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import ts from "typescript";

const base = process.argv[2] || "http://127.0.0.1:3100";
for (let attempt = 0; attempt < 30; attempt++) {
  try {
    await fetch(`${base}/api/donate/settings`, { signal: AbortSignal.timeout(1000) });
    break;
  } catch (error) {
    if (attempt === 29) throw error;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
assert.ok(Object.keys(manifest.routes).length < 500, "Release must not prebuild the entire archive");
assert.ok(manifest.routes["/donate/maternal-child-health"], "Campaign donation shell should be prepared during the build");
const listSource = ts.transpileModule(await readFile("src/blogs/listofblogs.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function("exports", "module", "require", listSource)(mod.exports, mod, createRequire(import.meta.url));
const listed = mod.exports.globalBlogs;
const files = await readdir("src/blogs/global");
const fileNames = new Set(files);
const segmentFor = (post) => post.type === "News" ? "news" : post.type === "Story" ? "stories" : "articles";
const archivePost = listed.find((post) => fileNames.has(`${post.slug}.mdx`) && !manifest.routes[`/${segmentFor(post)}/${post.slug}`]);
assert.ok(archivePost, "Need an archive URL excluded from this build to test on-demand rendering");

async function get(path, host = "www.nivaranfoundation.org") {
  const response = await fetch(`${base}${path}`, { headers: { host, "user-agent": "Nivaran release check" }, redirect: "manual", signal: AbortSignal.timeout(30000) });
  const body = await response.text();
  return { response, body };
}
for (const path of ["/", "/campaigns", "/donate", "/donate/maternal-child-health", "/donate/maternal-child-health?amount=50"]) {
  const { response, body } = await get(path);
  assert.equal(response.status, 200, path);
  assert.match(body, /Nivaran/, path);
}
const archivePath = `/${segmentFor(archivePost)}/${archivePost.slug}`;
const first = await get(archivePath);
assert.equal(first.response.status, 200, archivePath);
assert.match(first.body, /application\/ld\+json/);
assert.ok(first.body.includes(`https://www.nivaranfoundation.org${archivePath}`), "Archive canonical URL must remain intact");
const second = await get(archivePath);
assert.equal(second.response.status, 200);
assert.equal(second.response.headers.get("x-nextjs-cache"), "HIT", "An on-demand article must be cached on the next request");
assert.equal((await get("/articles/nivaran-release-check-missing-9b0c8e7f")).response.status, 404);
const news = listed.find((post) => post.type === "News");
const legacy = await get(`/blogs/${news.slug}`);
assert.equal(legacy.response.status, 308, "Legacy links must retain their permanent redirects");
assert.equal(legacy.response.headers.get("location"), `/news/${news.slug}`);
const newsPage = await get(`/news/${news.slug}`);
assert.equal(newsPage.response.status, 200);
assert.match(newsPage.body, /name="robots" content="noindex, follow"/);
for (const [host, brand] of [["global.nivaranfoundation.org", "Nivaran Global"], ["usa.nivaranfoundation.org", "United States"]]) {
  const { response, body } = await get("/", host);
  assert.equal(response.status, 200, host);
  assert.ok(body.includes(brand), `${host} branding`);
  assert.ok(body.includes(`https://${host}/logo.png`), `${host} metadata`);
  assert.ok(!body.includes('id="Organization-schema"'), "Main-site schema must not leak into regional sites");
}
const settings = await get("/api/donate/settings");
assert.equal(settings.response.status, 200);
assert.equal(settings.response.headers.get("cache-control"), "no-store");
assert.equal(settings.response.headers.get("x-nextjs-cache"), null);
const flags = JSON.parse(settings.body);
assert.equal(typeof flags.monthly, "boolean");
assert.equal(typeof flags.addressSearch, "boolean");
console.log(JSON.stringify({ status: "passed", prerenderedPages: Object.keys(manifest.routes).length, archivePath, firstCache: first.response.headers.get("x-nextjs-cache"), secondCache: second.response.headers.get("x-nextjs-cache"), settings: flags, checks: "home, campaigns, donation/query, archive cache/canonical, 404, legacy redirect, news noindex, regional branding, uncached donation settings" }));
