#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ALLOWED_TYPES = new Set([
  "Story",
  "Collaboration",
  "News",
  "Opinion",
  "Analysis",
  "Project",
  "Article",
]);

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      fail(`Unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    if (key === "commit" || key === "push" || key === "dry-run") {
      args[key] = true;
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      fail(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseBoolean(raw, fieldName) {
  if (typeof raw === "boolean") return raw;
  if (typeof raw !== "string") {
    fail(`${fieldName} must be true/false`);
  }
  if (raw === "true") return true;
  if (raw === "false") return false;
  fail(`${fieldName} must be true or false`);
}

function toDateString(raw) {
  if (!raw) {
    return new Date().toISOString().slice(0, 10);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    fail("date must be in YYYY-MM-DD format");
  }
  return raw;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Unable to read config JSON at ${filePath}: ${error.message}`);
  }
}

function readTextFile(filePath, label) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    fail(`Unable to read ${label} file at ${filePath}: ${error.message}`);
  }
}

function yamlEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function git(repoRoot, gitArgs) {
  try {
    return execFileSync("git", gitArgs, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    const stderr = error.stderr ? String(error.stderr).trim() : "";
    fail(`git ${gitArgs.join(" ")} failed${stderr ? `: ${stderr}` : ""}`);
  }
}

function ensureUniqueSlug(baseSlug, existingSlugs) {
  if (!existingSlugs.has(baseSlug)) return baseSlug;
  let counter = 2;
  while (existingSlugs.has(`${baseSlug}-${counter}`)) {
    counter += 1;
  }
  return `${baseSlug}-${counter}`;
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = path.resolve(args.repo || process.cwd());
  const listFilePath = path.join(repoRoot, "src", "blogs", "listofblogs.ts");
  const blogDir = path.join(repoRoot, "src", "blogs", "global");

  if (!fs.existsSync(listFilePath)) {
    fail(`Blog list file not found: ${listFilePath}`);
  }
  if (!fs.existsSync(blogDir)) {
    fail(`Blog directory not found: ${blogDir}`);
  }

  const config = args.config
    ? readJson(path.resolve(args.config))
    : {};

  const merged = {
    ...config,
    title: args.title ?? config.title,
    subtitle: args.subtitle ?? config.subtitle,
    summary: args.summary ?? config.summary,
    mainImage: args["main-image"] ?? config.mainImage,
    type: args.type ?? config.type,
    author: args.author ?? config.author,
    featured: args.featured ?? config.featured,
    slug: args.slug ?? config.slug,
    date: args.date ?? config.date,
    keywords: args.keywords ?? config.keywords,
    body: args.body ?? config.body,
    bodyFile: args["body-file"] ?? config.bodyFile,
    commitMessage: args["commit-message"] ?? config.commitMessage,
  };

  if (!merged.title) fail("title is required");
  if (!merged.subtitle) fail("subtitle is required");
  if (!merged.summary) fail("summary is required");
  if (!merged.mainImage) fail("mainImage (or --main-image) is required");

  const articleType = merged.type || "Article";
  if (!ALLOWED_TYPES.has(articleType)) {
    fail(`type must be one of: ${Array.from(ALLOWED_TYPES).join(", ")}`);
  }

  const featured =
    merged.featured === undefined
      ? false
      : parseBoolean(merged.featured, "featured");
  const date = toDateString(merged.date);
  const author = merged.author || "Nivaran Foundation News Desk";
  const keywords =
    merged.keywords ||
    merged.title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .slice(0, 6)
      .join(", ");

  let body = "";
  if (typeof merged.body === "string" && merged.body.trim().length > 0) {
    body = merged.body.trim();
  } else if (merged.bodyFile) {
    const bodyFilePath = path.resolve(String(merged.bodyFile));
    body = readTextFile(bodyFilePath, "body").trim();
  } else {
    fail("Provide article body via body or bodyFile / --body-file");
  }
  if (body.length === 0) {
    fail("Article body cannot be empty");
  }

  const listContent = readTextFile(listFilePath, "blog list");
  const existingSlugs = new Set();

  const slugInListRegex = /slug:\s*"([^"]+)"/g;
  let match = null;
  while ((match = slugInListRegex.exec(listContent)) !== null) {
    existingSlugs.add(match[1]);
  }

  for (const file of fs.readdirSync(blogDir)) {
    if (file.endsWith(".mdx")) {
      existingSlugs.add(file.replace(/\.mdx$/, ""));
    }
  }

  const requestedSlug = merged.slug ? slugify(merged.slug) : slugify(merged.title);
  if (!requestedSlug) {
    fail("Could not generate a valid slug from title");
  }
  const slug = ensureUniqueSlug(requestedSlug, existingSlugs);

  const mdxPath = path.join(blogDir, `${slug}.mdx`);
  const mdxContent = `---\n` +
    `title: "${yamlEscape(merged.title)}"\n` +
    `subtitle: "${yamlEscape(merged.subtitle)}"\n` +
    `date: "${date}"\n` +
    `author: "${yamlEscape(author)}"\n` +
    `mainImage: "${yamlEscape(merged.mainImage)}"\n` +
    `keywords: "${yamlEscape(keywords)}"\n` +
    `---\n\n` +
    `${body}\n`;

  const entry = [
    "  {",
    `    slug: ${JSON.stringify(slug)},`,
    `    title: ${JSON.stringify(merged.title)},`,
    "    summary:",
    `      ${JSON.stringify(merged.summary)},`,
    `    thumbnailImage: ${JSON.stringify(merged.mainImage)},`,
    `    date: ${JSON.stringify(date)},`,
    `    author: ${JSON.stringify(author)},`,
    `    featured: ${featured ? "true" : "false"},`,
    `    type: ${JSON.stringify(articleType)},`,
    "  },",
    "",
  ].join("\n");

  const anchorMatch = listContent.match(/export const globalBlogs: blogListType\[\] = \[\r?\n/);
  if (!anchorMatch || anchorMatch.index === undefined) {
    fail("Could not locate globalBlogs array anchor in listofblogs.ts");
  }
  const insertAt = anchorMatch.index + anchorMatch[0].length;
  const updatedListContent =
    listContent.slice(0, insertAt) + entry + listContent.slice(insertAt);

  if (!args["dry-run"]) {
    fs.writeFileSync(mdxPath, mdxContent, "utf8");
    fs.writeFileSync(listFilePath, updatedListContent, "utf8");
  }

  const relMdxPath = path.relative(repoRoot, mdxPath);
  const relListPath = path.relative(repoRoot, listFilePath);

  if (args.commit || args.push) {
    git(repoRoot, ["rev-parse", "--is-inside-work-tree"]);
    git(repoRoot, ["add", relMdxPath, relListPath]);
    const commitMessage = merged.commitMessage || `Publish article: ${merged.title}`;
    git(repoRoot, ["commit", "-m", commitMessage]);
  }
  if (args.push) {
    git(repoRoot, ["push", "origin", "main"]);
  }

  const response = {
    status: args["dry-run"] ? "dry-run" : "published",
    slug,
    mdxPath: relMdxPath,
    blogUrl: `https://www.nivaranfoundation.org/blogs/${slug}`,
    listFile: relListPath,
    committed: !!args.commit || !!args.push,
    pushed: !!args.push,
  };

  console.log(JSON.stringify(response, null, 2));
}

main();
