import type { blogListType } from "@/blogs/listofblogs";

const NEPAL_TERMS = [
  "nepal",
  "kathmandu",
  "pokhara",
  "lumbini",
  "karnali",
  "terai",
  "jajarkot",
  "dolpa",
  "jumla",
  "bajura",
  "mugu",
  "birgunj",
];

const GLOBAL_TERMS = [
  "global",
  "world",
  "international",
  "cross-border",
  "cross border",
  "who",
  "unicef",
  "unesco",
  "unhcr",
  "united nations",
  "africa",
  "asia",
  "europe",
  "latin america",
  "middle east",
  "sudan",
  "gaza",
  "ukraine",
  "bangladesh",
  "india",
  "pakistan",
  "sri lanka",
];

type BlogCandidate = Pick<blogListType, "title" | "summary" | "slug" | "author"> & {
  location?: string | null;
  keywords?: string[] | string | null;
};

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function normalizeKeywords(keywords?: string[] | string | null) {
  if (Array.isArray(keywords)) {
    return keywords.join(" ");
  }

  return keywords || "";
}

function toHaystack(blog: BlogCandidate) {
  return `${blog.title} ${blog.summary} ${blog.slug} ${blog.author ?? ""} ${blog.location ?? ""} ${normalizeKeywords(blog.keywords)}`.toLowerCase();
}

export function isGlobalNewsCandidate(blog: BlogCandidate) {
  const haystack = toHaystack(blog);
  // A blog that mentions Nepal terms is classified as Nepal, not Global
  if (includesAny(haystack, NEPAL_TERMS)) return false;
  return includesAny(haystack, GLOBAL_TERMS);
}

/**
 * Strict Nepal check: must contain at least one Nepal-specific term.
 */
export function isNepalCandidate(blog: BlogCandidate) {
  const haystack = toHaystack(blog);
  return includesAny(haystack, NEPAL_TERMS);
}

/**
 * Everything that is NOT Nepal (Global + general articles).
 */
export function isNonNepalCandidate(blog: BlogCandidate) {
  return !isNepalCandidate(blog);
}

/** @deprecated Use isNepalCandidate for strict Nepal filtering */
export function isNepalExclusiveCandidate(blog: BlogCandidate) {
  const haystack = toHaystack(blog);
  if (haystack.includes("global desk")) return false;
  return !isGlobalNewsCandidate(blog);
}

export function sortBlogsByDateDesc(items: blogListType[]) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    const safeA = Number.isFinite(aTime) ? aTime : 0;
    const safeB = Number.isFinite(bTime) ? bTime : 0;
    return safeB - safeA;
  });
}

export function filterNepalExclusiveNewest(items: blogListType[], limit: number) {
  const safeLimit = Math.max(1, Math.min(limit, 500));
  return sortBlogsByDateDesc(items.filter(isNepalCandidate)).slice(
    0,
    safeLimit,
  );
}

/**
 * Return non-Nepal blogs (Global + general), sorted newest-first.
 */
export function filterGlobalOnlyNewest(items: blogListType[], limit: number) {
  const safeLimit = Math.max(1, Math.min(limit, 500));
  return sortBlogsByDateDesc(items.filter(isNonNepalCandidate)).slice(
    0,
    safeLimit,
  );
}


const STOCK_FALLBACK_EXCERPT =
  "A high-impact global update is reshaping how health and education systems";

const OFF_MISSION_TERMS = [
  "ariana grande",
  "messi",
  "luigi mangione",
  "salad greens",
  "taylor swift",
  "kardashian",
  "epstein",
  "oscar",
  "grammy",
  "super bowl",
  "premier league",
  "celebrity",
];

export function isStockFallbackExcerpt(text?: string | null) {
  return Boolean(text && text.includes(STOCK_FALLBACK_EXCERPT));
}

export function displayExcerpt(text?: string | null) {
  if (!text || isStockFallbackExcerpt(text)) return "";
  return text;
}

export function isDuplicateIndexSlug(slug: string) {
  return /-\d+$/.test(slug);
}

export function isOffMissionNews(blog: BlogCandidate) {
  return includesAny(toHaystack(blog), OFF_MISSION_TERMS);
}

export function filterPublicNewsIndex<T extends blogListType>(items: T[]) {
  const seenBases = new Set<string>();
  return sortBlogsByDateDesc(items).filter((blog) => {
    if (isDuplicateIndexSlug(blog.slug)) return false;
    if (isOffMissionNews(blog)) return false;
    const base = blog.slug.replace(/-\d+$/, "");
    if (seenBases.has(base)) return false;
    seenBases.add(base);
    return true;
  });
}
