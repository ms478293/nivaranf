import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  applyContentAutomation,
  buildCanonicalUrl,
  getRouteSegmentForContentType,
  slugify,
} from "./automation";
import {
  type ContentPost,
  type ContentPostInput,
  type ContentRouteSegment,
  type ContentStatus,
  type ContentType,
} from "./types";

const CONTENT_POSTS_TABLE = "content_posts";
const DEFAULT_THUMBNAIL = "/images/generalHealthService.jpg";

const CONTENT_TYPE_SET = new Set(["Article", "Story", "News", "Blog"]);
const CONTENT_STATUS_SET = new Set(["draft", "published"]);
const STATIC_BLOG_SLUGS = new Set(globalBlogs.map((blog) => blog.slug));

export class ContentTableMissingError extends Error {
  constructor() {
    super(
      "Supabase table 'content_posts' is missing. Run the content portal SQL setup first."
    );
    this.name = "ContentTableMissingError";
  }
}

function isMissingTableError(error: unknown) {
  const code = (error as { code?: string })?.code;
  const message = String((error as { message?: string })?.message || "");
  return (
    code === "42P01" ||
    message.toLowerCase().includes("content_posts") &&
      message.toLowerCase().includes("does not exist")
  );
}

function throwSupabaseError(error: unknown, graceful = false) {
  if (!error) return;

  if (isMissingTableError(error)) {
    if (graceful) return;
    throw new ContentTableMissingError();
  }

  const message = String((error as { message?: string })?.message || "Unknown error");
  throw new Error(message);
}

function toContentType(value: unknown): ContentType {
  return CONTENT_TYPE_SET.has(value as string)
    ? (value as ContentType)
    : "Article";
}

function toContentStatus(value: unknown): ContentStatus {
  return CONTENT_STATUS_SET.has(value as string)
    ? (value as ContentStatus)
    : "draft";
}

function toKeywords(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .slice(0, 20);
  }
  return [];
}

function mapRowToContentPost(row: Record<string, unknown>): ContentPost {
  return {
    id: String(row.id),
    title: String(row.title || ""),
    slug: String(row.slug || ""),
    content_type: toContentType(row.content_type),
    status: toContentStatus(row.status),
    excerpt: String(row.excerpt || ""),
    body: String(row.body || ""),
    author: String(row.author || "Nivaran Foundation News Desk"),
    location: String(row.location || "Nepal"),
    cover_image_url: row.cover_image_url ? String(row.cover_image_url) : null,
    cover_image_alt: row.cover_image_alt ? String(row.cover_image_alt) : null,
    cover_image_caption: row.cover_image_caption
      ? String(row.cover_image_caption)
      : null,
    keywords: toKeywords(row.keywords),
    featured: Boolean(row.featured),
    share_message: String(row.share_message || ""),
    donate_line: row.donate_line ? String(row.donate_line) : null,
    author_bio: row.author_bio ? String(row.author_bio) : null,
    seo_title: String(row.seo_title || ""),
    seo_description: String(row.seo_description || ""),
    canonical_url: String(row.canonical_url || ""),
    reading_time_minutes: Number(row.reading_time_minutes || 1),
    published_at: row.published_at ? String(row.published_at) : null,
    created_by: row.created_by ? String(row.created_by) : null,
    created_at: String(row.created_at || ""),
    updated_at: String(row.updated_at || ""),
  };
}

async function resolveUniqueSlug({
  slug,
  excludeId,
  currentSlug,
}: {
  slug: string;
  excludeId?: string;
  currentSlug?: string;
}) {
  const baseSlug = slugify(slug);

  for (let idx = 0; idx < 100; idx += 1) {
    const candidate = idx === 0 ? baseSlug : `${baseSlug}-${idx + 1}`;

    const isCurrentSlug = currentSlug === candidate;
    if (STATIC_BLOG_SLUGS.has(candidate) && !isCurrentSlug) {
      continue;
    }

    const { data, error } = await supabaseAdmin
      .from(CONTENT_POSTS_TABLE)
      .select("id")
      .eq("slug", candidate)
      .limit(1);

    throwSupabaseError(error);

    const existing = data?.[0] as { id?: string } | undefined;
    if (!existing?.id || existing.id === excludeId) {
      return candidate;
    }
  }

  throw new Error("Could not create a unique slug. Please try a different title.");
}

function typeToBlogListType(contentType: ContentType): blogListType["type"] {
  if (contentType === "Story") return "Story";
  if (contentType === "News") return "News";
  return "Article";
}

function mapContentPostToBlogListItem(post: ContentPost): blogListType {
  const dateSource = post.published_at || post.updated_at || post.created_at;
  const yyyyMmDd = dateSource ? dateSource.slice(0, 10) : "";

  return {
    slug: post.slug,
    title: post.title,
    summary: post.excerpt,
    thumbnailImage: post.cover_image_url || DEFAULT_THUMBNAIL,
    date: yyyyMmDd,
    author: post.author,
    featured: post.featured,
    type: typeToBlogListType(post.content_type),
  };
}

type DashboardPostFilters = {
  status?: ContentStatus | "all";
  type?: ContentType | "all";
  search?: string;
};

export async function getDashboardContentPosts(
  filters: DashboardPostFilters = {}
) {
  let query = supabaseAdmin
    .from(CONTENT_POSTS_TABLE)
    .select("*")
    .order("updated_at", { ascending: false });

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.type && filters.type !== "all") {
    query = query.eq("content_type", filters.type);
  }

  if (filters.search) {
    query = query.ilike("title", `%${filters.search.trim()}%`);
  }

  const { data, error } = await query;
  throwSupabaseError(error);

  return (data || []).map((row) => mapRowToContentPost(row));
}

export async function getContentPostById(id: string) {
  const { data, error } = await supabaseAdmin
    .from(CONTENT_POSTS_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  throwSupabaseError(error);
  return mapRowToContentPost(data as Record<string, unknown>);
}

export async function createContentPost(
  input: ContentPostInput,
  createdBy?: string | null
) {
  const automated = applyContentAutomation(input);
  const uniqueSlug = await resolveUniqueSlug({ slug: automated.slug });
  const now = new Date().toISOString();

  const payload = {
    ...automated,
    slug: uniqueSlug,
    canonical_url: buildCanonicalUrl(automated.content_type, uniqueSlug),
    published_at: automated.status === "published" ? now : null,
    created_by: createdBy || null,
  };

  const { data, error } = await supabaseAdmin
    .from(CONTENT_POSTS_TABLE)
    .insert(payload)
    .select("*")
    .single();

  throwSupabaseError(error);
  return mapRowToContentPost(data as Record<string, unknown>);
}

export async function updateContentPost(id: string, input: ContentPostInput) {
  const existing = await getContentPostById(id);

  const mergedInput: ContentPostInput = {
    title: input.title ?? existing.title,
    slug: input.slug ?? existing.slug,
    content_type: input.content_type ?? existing.content_type,
    status: input.status ?? existing.status,
    excerpt: input.excerpt ?? existing.excerpt,
    body: input.body ?? existing.body,
    author: input.author ?? existing.author,
    location: input.location ?? existing.location,
    cover_image_url:
      input.cover_image_url !== undefined
        ? input.cover_image_url
        : existing.cover_image_url,
    cover_image_alt:
      input.cover_image_alt !== undefined
        ? input.cover_image_alt
        : existing.cover_image_alt,
    cover_image_caption:
      input.cover_image_caption !== undefined
        ? input.cover_image_caption
        : existing.cover_image_caption,
    keywords: input.keywords ?? existing.keywords,
    featured: input.featured ?? existing.featured,
    share_message: input.share_message ?? existing.share_message,
    donate_line:
      input.donate_line !== undefined ? input.donate_line : existing.donate_line,
    author_bio:
      input.author_bio !== undefined ? input.author_bio : existing.author_bio,
  };

  const automated = applyContentAutomation(mergedInput);
  const uniqueSlug = await resolveUniqueSlug({
    slug: automated.slug,
    excludeId: id,
    currentSlug: existing.slug,
  });

  const payload = {
    ...automated,
    slug: uniqueSlug,
    canonical_url: buildCanonicalUrl(automated.content_type, uniqueSlug),
    published_at:
      automated.status === "published"
        ? existing.published_at || new Date().toISOString()
        : existing.published_at,
  };

  const { data, error } = await supabaseAdmin
    .from(CONTENT_POSTS_TABLE)
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  throwSupabaseError(error);
  return mapRowToContentPost(data as Record<string, unknown>);
}

export async function deleteContentPost(id: string) {
  const { error } = await supabaseAdmin
    .from(CONTENT_POSTS_TABLE)
    .delete()
    .eq("id", id);

  throwSupabaseError(error);
}

export async function getPublishedContentPostBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from(CONTENT_POSTS_TABLE)
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      throwSupabaseError(error, true);
      return null;
    }

    if (!data) return null;
    return mapRowToContentPost(data as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getPublishedBlogItemsBySegment(
  segment: ContentRouteSegment
) {
  try {
    const targetTypes: ContentType[] =
      segment === "stories"
        ? ["Story"]
        : segment === "news"
        ? ["News"]
        : ["Article", "Blog"];

    const { data, error } = await supabaseAdmin
      .from(CONTENT_POSTS_TABLE)
      .select("*")
      .eq("status", "published")
      .in("content_type", targetTypes)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false });

    if (error) {
      throwSupabaseError(error, true);
      return [];
    }

    return (data || [])
      .map((row) => mapRowToContentPost(row))
      .map((post) => mapContentPostToBlogListItem(post));
  } catch {
    return [];
  }
}

export async function getPublishedRelatedBlogItems({
  segment,
  excludeSlug,
  limit = 3,
}: {
  segment: ContentRouteSegment;
  excludeSlug: string;
  limit?: number;
}) {
  const posts = await getPublishedBlogItemsBySegment(segment);
  return posts.filter((post) => post.slug !== excludeSlug).slice(0, limit);
}

export function getSegmentForContentPost(post: ContentPost): ContentRouteSegment {
  return getRouteSegmentForContentType(post.content_type);
}
