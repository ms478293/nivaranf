import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const origin = "https://www.nivaranfoundation.org";
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}
function metadata(html) {
  const meta = {};
  for (const tag of html.match(/<meta\b[^>]*>/g) || []) {
    const attrs = attributes(tag);
    meta[attrs.name || attrs.property] = attrs.content;
  }
  return meta;
}
function schemas(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
}

export async function checkSeoRelease(baseUrl, { full = false, inspectSitemap = false } = {}) {
  const get = async (path, headers = {}) => {
    const response = await fetch(new URL(path, baseUrl), { headers, signal: AbortSignal.timeout(60000) });
    assert.equal(response.status, 200, `${path}: HTTP status`);
    return { html: await response.text(), headers: response.headers };
  };
  const routes = ["/", "/about", "/campaigns", "/programs/health", "/sanjeevani", "/volunteer", "/vidya", "/maternal-health-nepal", "/articles", "/stories", "/donate/nepal-flood-recovery"];
  if (full) routes.push("/programs", "/programs/education", "/local-partner", "/corporate", "/how-to-help", "/ways-to-give", "/contact-us", "/frequently-asked-questions", "/attend", "/organize-locally", "/journey", "/mobile-health-camps-nepal", "/rural-healthcare-nepal", "/health-ngo-nepal", "/free-health-camp-nepal", "/healthcare-coverage-nepal", "/impact-fact-sheet", "/accountability-and-transparency", "/leadership", "/news", "/editorial-standards", "/financial-reports", "/press");
  const titles = new Set();
  for (const route of routes) {
    const { html } = await get(route);
    const meta = metadata(html);
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
    assert.ok(title && !titles.has(title), `${route}: unique title`);
    titles.add(title);
    assert.ok(meta.description?.length > 60, `${route}: descriptive snippet`);
    assert.ok(meta["og:image"]?.startsWith(origin), `${route}: share image`);
    assert.ok(meta["twitter:image"]?.startsWith(origin), `${route}: Twitter image`);
    assert.equal(meta["og:title"], title, `${route}: matching share title`);
    assert.doesNotMatch(meta.robots || "", /noindex/, `${route}: public indexability`);
    assert.equal(meta.googlebot?.includes("max-image-preview:large"), true, `${route}: large image previews`);
    const canonicalTags = (html.match(/<link\b[^>]*>/g) || []).map(attributes).filter((link) => link.rel === "canonical");
    assert.equal(canonicalTags.length, 1, `${route}: one canonical`);
    assert.equal(canonicalTags[0].href.replace(/\/$/, ""), `${origin}${route}`.replace(/\/$/, ""), `${route}: correct canonical`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one primary heading`);
    const data = schemas(html);
    assert.ok(data.some((item) => item["@id"] === `${origin}/#organization` && item["@type"] === "NGO"), `${route}: organization identity`);
    assert.ok(!data.some((item) => item.potentialAction?.["@type"] === "SearchAction"), `${route}: no nonfunctional search action`);
    if (route === "/volunteer") assert.ok(!data.some((item) => item["@type"] === "Event"), "Volunteer listing is not a scheduled-event detail page");
    if (route === "/") assert.match(html, /id="explore-nivaran-title"/, "Homepage guides are rendered in server HTML");
  }
  const { html: sitemap } = await get("/sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  assert.equal(new Set(urls).size, urls.length, "Sitemap URLs are unique");
  for (const path of ["/donate/nepal-flood-recovery", "/donate/sanjeevani", "/donate/maternal-child-health", "/press", "/local-partner", "/stories/sanjeevani-bringing-care-closer-to-rural-nepal"])
    assert.ok(urls.includes(origin + path), `Sitemap discovers ${path}`);
  assert.ok(urls.every((url) => !/\/news\/|\/checkout|\/manage|\/api\/|\/dashboard/.test(url)), "Sitemap excludes noindex/private routes");
  if (inspectSitemap) {
    for (const url of urls) {
      const { html } = await get(new URL(url).pathname);
      assert.doesNotMatch(metadata(html).robots || "", /noindex/, `${url}: sitemap destination must be indexable`);
      const canonical = (html.match(/<link\b[^>]*>/g) || []).map(attributes).find((link) => link.rel === "canonical");
      assert.equal(canonical?.href.replace(/\/$/, ""), url.replace(/\/$/, ""), `${url}: sitemap destination must be canonical`);
    }
  }
  for (const url of sitemap.match(/<url>[\s\S]*?<\/url>/g) || []) {
    if (/\/healthcare-coverage-nepal\//.test(url)) assert.doesNotMatch(url, /<lastmod>/, "Coverage does not invent modification dates");
  }
  const { html: newsSitemap } = await get("/news-sitemap.xml");
  assert.doesNotMatch(newsSitemap, /<loc>/, "News sitemap does not submit noindex articles");
  const { html: robots } = await get("/robots.txt");
  assert.match(robots, /Sitemap: https:\/\/www.nivaranfoundation.org\/sitemap.xml/);
  assert.doesNotMatch(robots, /news-sitemap/);
  for (const userAgent of ["*", "Googlebot", "OAI-SearchBot", "PerplexityBot"]) {
    const group = robots.split(/\n\s*\n/).find((part) => part.includes(`User-Agent: ${userAgent}\n`));
    assert.ok(group?.includes("Disallow: /api/"), `${userAgent}: consistent private-route rules`);
  }
  const checkout = await get("/donate/nepal-flood-recovery/checkout?amount=100");
  assert.match(metadata(checkout.html).robots, /noindex/, "Dedicated checkout remains noindex");
  assert.match(checkout.headers.get("cache-control") || "", /no-store/, "Checkout stays uncached");
  console.log(`SEO checks passed: ${routes.length} public pages, canonical/share/schema consistency, ${urls.length} sitemap URLs, crawler rules and private checkout.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkSeoRelease(process.argv[2] || "http://localhost:3009", { full: process.argv.includes("--full") });
}
