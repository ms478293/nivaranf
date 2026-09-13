import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(file) {
  const result = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const mod = { exports: {} };
  new Function("require", "module", "exports", result.outputText)((id) => id.startsWith("@/") ? load(resolve("src", `${id.slice(2)}.ts`)) : require(id), mod, mod.exports);
  return mod.exports;
}
const { recentContentParams, CONTENT_PRERENDER_LIMIT } = load("src/lib/content/prerender.ts");
const { readStaticBlogFile } = load("src/lib/content/static-blog-file.ts");
const { getRootMetadata } = load("src/lib/site-metadata.ts");
const entries = Array.from({ length: 7000 }, (_, i) => ({ slug: `article-${i}`, date: new Date(Date.UTC(2020, 0, i + 1)).toISOString() }));
const params = recentContentParams([...entries.reverse(), entries[0], { slug: "invalid-date", date: "unknown" }]);
assert.equal(params.length, CONTENT_PRERENDER_LIMIT);
assert.equal(params[0].slug, "article-6999");
assert.equal(new Set(params.map((entry) => entry.slug)).size, params.length);
assert.deepEqual(recentContentParams([]), []);
assert.deepEqual(recentContentParams([{ slug: "z" }, { slug: "a" }]), [{ slug: "a" }, { slug: "z" }]);

const fixture = await mkdtemp(join(tmpdir(), "nivaran-content-check-"));
try {
  const directories = [join(fixture, "global"), join(fixture, "usa")];
  await Promise.all(directories.map((directory) => mkdir(directory)));
  await writeFile(join(directories[0], "story.mdx"), "---\ntitle: Original\n---\nKnown article body");
  await writeFile(join(directories[1], "story.mdx"), "---\ntitle: Duplicate\n---\nOther body");
  await writeFile(join(directories[1], "usa-only.mdx"), "---\ntitle: USA\n---\nUSA body");
  await writeFile(join(directories[0], "unrelated.mdx"), "---\ninvalid: [\n---\nMust never be read for another slug");
  assert.equal((await readStaticBlogFile("story", directories)).data.title, "Original");
  assert.match((await readStaticBlogFile("usa-only", directories)).content, /USA body/);
  await assert.rejects(readStaticBlogFile("missing", directories), /Missing static blog/);
  for (const slug of ["", ".", "..", "../story", "folder/story", "folder\\story", "story\0"]) {
    await assert.rejects(readStaticBlogFile(slug, directories), /Invalid article slug/);
  }
} finally {
  await rm(fixture, { recursive: true, force: true });
}
for (const [variant, host] of [["main", "www.nivaranfoundation.org"], ["global", "global.nivaranfoundation.org"], ["usa", "usa.nivaranfoundation.org"]]) {
  const metadata = getRootMetadata(variant);
  assert.equal(metadata.metadataBase.hostname, host);
  assert.equal(new URL(metadata.openGraph.images[0].url).hostname, host);
}
console.log("Content checks passed: bounded 7,000-item archive, recent/unique ordering, direct file reads, directory priority, missing/unsafe slugs, and distinct site metadata.");
