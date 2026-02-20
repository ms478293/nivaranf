import {
  type AutomatedContentFields,
  type ContentPostInput,
  type ContentRouteSegment,
  type ContentType,
} from "./types";

const WEBSITE_BASE_URL = "https://www.nivaranfoundation.org";
const DEFAULT_AUTHOR = "Nivaran Foundation News Desk";

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMarkdown(markdown: string) {
  return normalizeWhitespace(
    markdown
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
      .replace(/\[[^\]]*]\([^)]+\)/g, " ")
      .replace(/#+\s/g, " ")
      .replace(/[*_~>-]/g, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

export function slugify(value: string) {
  const slug = normalizeWhitespace(value)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "untitled-post";
}

export function getRouteSegmentForContentType(
  contentType: ContentType
): ContentRouteSegment {
  if (contentType === "Story") return "stories";
  if (contentType === "News") return "news";
  return "articles";
}

export function buildCanonicalPath(contentType: ContentType, slug: string) {
  return `/${getRouteSegmentForContentType(contentType)}/${slug}`;
}

export function buildCanonicalUrl(contentType: ContentType, slug: string) {
  return `${WEBSITE_BASE_URL}${buildCanonicalPath(contentType, slug)}`;
}

export function estimateReadingTimeMinutes(content: string) {
  const plain = stripMarkdown(content);
  if (!plain) return 1;

  const words = plain.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function buildExcerpt(excerpt: string | undefined, body: string) {
  const source = normalizeWhitespace(excerpt || "") || stripMarkdown(body);
  if (!source) return "Read the latest update from Nivaran Foundation.";

  const maxLen = 160;
  if (source.length <= maxLen) return source;

  const sliced = source.slice(0, maxLen + 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const trimmed = (lastSpace > 120 ? sliced.slice(0, lastSpace) : sliced).trim();
  return `${trimmed}...`;
}

function normalizeKeywords({
  contentType,
  location,
  keywords,
}: {
  contentType: ContentType;
  location: string;
  keywords?: string[] | string;
}) {
  const source =
    typeof keywords === "string"
      ? keywords.split(",")
      : Array.isArray(keywords)
      ? keywords
      : [];

  const defaults = [
    "Nivaran Foundation",
    "Nepal healthcare",
    "Rural health Nepal",
    contentType,
    location,
  ];

  return [...defaults, ...source]
    .map((item) => normalizeWhitespace(item || ""))
    .filter(Boolean)
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .slice(0, 16);
}

function buildSeoTitle(title: string) {
  const suffix = " | Nivaran Foundation";
  const full = `${title}${suffix}`;
  if (full.length <= 70) return full;
  return `${title.slice(0, 70 - suffix.length - 3).trim()}...${suffix}`;
}

function buildShareMessage({
  title,
  location,
  custom,
}: {
  title: string;
  location: string;
  custom?: string;
}) {
  const base = normalizeWhitespace(custom || "");
  const resolved =
    base || `${title} — ${location}. Read and share: {URL}`;

  if (resolved.length <= 280) return resolved;
  return `${resolved.slice(0, 277).trim()}...`;
}

export function applyContentAutomation(
  input: ContentPostInput
): AutomatedContentFields {
  const title = normalizeWhitespace(input.title || "");
  if (!title) {
    throw new Error("Title is required.");
  }

  const body = (input.body || "").trim();
  if (!body) {
    throw new Error("Article body is required.");
  }

  const contentType = (input.content_type || "Article") as ContentType;
  const status = input.status || "draft";
  const slug = slugify(input.slug || title);
  const location = normalizeWhitespace(input.location || "") || "Nepal";
  const excerpt = buildExcerpt(input.excerpt, body);

  return {
    title,
    slug,
    content_type: contentType,
    status,
    excerpt,
    body,
    author: normalizeWhitespace(input.author || "") || DEFAULT_AUTHOR,
    location,
    cover_image_url: normalizeWhitespace(input.cover_image_url || "") || null,
    cover_image_alt: normalizeWhitespace(input.cover_image_alt || "") || null,
    cover_image_caption:
      normalizeWhitespace(input.cover_image_caption || "") || null,
    keywords: normalizeKeywords({
      contentType,
      location,
      keywords: input.keywords,
    }),
    featured: Boolean(input.featured),
    share_message: buildShareMessage({
      title,
      location,
      custom: input.share_message,
    }),
    donate_line: normalizeWhitespace(input.donate_line || "") || null,
    author_bio: normalizeWhitespace(input.author_bio || "") || null,
    seo_title: buildSeoTitle(title),
    seo_description: excerpt,
    canonical_url: buildCanonicalUrl(contentType, slug),
    reading_time_minutes: estimateReadingTimeMinutes(body),
  };
}
