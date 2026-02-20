"use client";

import {
  applyContentAutomation,
  buildCanonicalPath,
  slugify,
} from "@/lib/content/automation";
import type { ContentPost } from "@/lib/content/types";
import { useEffect, useMemo, useState } from "react";

type PostType = "Article" | "Story" | "News" | "Blog";
type PostStatus = "draft" | "published";

type ContentFormState = {
  id?: string;
  title: string;
  slug: string;
  content_type: PostType;
  status: PostStatus;
  excerpt: string;
  body: string;
  author: string;
  location: string;
  cover_image_url: string;
  cover_image_alt: string;
  cover_image_caption: string;
  keywords: string;
  share_message: string;
  donate_line: string;
  author_bio: string;
  featured: boolean;
};

const EMPTY_FORM: ContentFormState = {
  title: "",
  slug: "",
  content_type: "Article",
  status: "draft",
  excerpt: "",
  body: "",
  author: "Nivaran Foundation News Desk",
  location: "Nepal",
  cover_image_url: "",
  cover_image_alt: "",
  cover_image_caption: "",
  keywords: "",
  share_message: "",
  donate_line: "",
  author_bio: "",
  featured: false,
};

function toFormState(post: ContentPost): ContentFormState {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content_type: post.content_type,
    status: post.status,
    excerpt: post.excerpt,
    body: post.body,
    author: post.author,
    location: post.location,
    cover_image_url: post.cover_image_url || "",
    cover_image_alt: post.cover_image_alt || "",
    cover_image_caption: post.cover_image_caption || "",
    keywords: post.keywords.join(", "),
    share_message: post.share_message || "",
    donate_line: post.donate_line || "",
    author_bio: post.author_bio || "",
    featured: post.featured,
  };
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function splitKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ContentPortal() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [form, setForm] = useState<ContentFormState>(EMPTY_FORM);
  const [slugEdited, setSlugEdited] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PostType | "all">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      query.set("status", statusFilter);
      query.set("type", typeFilter);
      if (search.trim()) query.set("search", search.trim());

      const response = await fetch(`/api/content/posts?${query.toString()}`, {
        credentials: "include",
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Failed to load posts");
      }
      setPosts(payload.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter]);

  const automationPreview = useMemo(() => {
    try {
      return applyContentAutomation({
        ...form,
        keywords: splitKeywords(form.keywords),
      });
    } catch {
      return null;
    }
  }, [form]);

  const routePreview = useMemo(() => {
    if (!automationPreview?.slug) return "";
    return buildCanonicalPath(
      automationPreview.content_type,
      automationPreview.slug
    );
  }, [automationPreview]);

  function resetToNew() {
    setForm(EMPTY_FORM);
    setSlugEdited(false);
    setSuccess("");
    setError("");
  }

  function onTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugEdited ? prev.slug : slugify(value),
    }));
  }

  function onSlugChange(value: string) {
    setSlugEdited(true);
    setForm((prev) => ({ ...prev, slug: slugify(value) }));
  }

  async function savePost(nextStatus: PostStatus) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        status: nextStatus,
        keywords: splitKeywords(form.keywords),
      };

      const endpoint = form.id
        ? `/api/content/posts/${form.id}`
        : "/api/content/posts";
      const method = form.id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const responsePayload = await response.json();
      if (!response.ok) {
        throw new Error(responsePayload.error || "Failed to save post");
      }

      const savedPost = responsePayload.post as ContentPost;
      setForm(toFormState(savedPost));
      setSlugEdited(true);
      setSuccess(
        nextStatus === "published"
          ? "Post published successfully."
          : "Draft saved successfully."
      );
      await fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  async function removePost() {
    if (!form.id) return;
    if (!window.confirm("Delete this post permanently?")) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/content/posts/${form.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Failed to delete post");
      }

      resetToNew();
      await fetchPosts();
      setSuccess("Post deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Content Queue</h2>
          <button
            className="text-xs px-3 py-1.5 bg-black text-white rounded-md"
            onClick={resetToNew}
            type="button"
          >
            New
          </button>
        </div>

        <div className="space-y-2 mb-3">
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="Search title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              className="border border-gray-300 rounded-md px-2 py-2 text-sm"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as PostStatus | "all")
              }
            >
              <option value="all">All status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-2 py-2 text-sm"
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as PostType | "all")
              }
            >
              <option value="all">All types</option>
              <option value="Article">Article</option>
              <option value="Story">Story</option>
              <option value="News">News</option>
              <option value="Blog">Blog</option>
            </select>
          </div>
          <button
            type="button"
            onClick={fetchPosts}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            Refresh
          </button>
        </div>

        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {loading ? <p className="text-sm text-gray-500">Loading...</p> : null}
          {!loading && posts.length === 0 ? (
            <p className="text-sm text-gray-500">No posts found.</p>
          ) : null}
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              className={`w-full text-left border rounded-lg p-3 transition ${
                form.id === post.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => {
                setForm(toFormState(post));
                setSlugEdited(true);
                setSuccess("");
                setError("");
              }}
            >
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                {post.content_type} · {post.status}
              </p>
              <p className="text-sm font-semibold line-clamp-2">{post.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {buildCanonicalPath(post.content_type, post.slug)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Updated: {formatDate(post.updated_at)}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Publishing Portal</h1>
          <p className="text-sm text-gray-600">
            Create and publish stories, articles, news, and blogs with automatic
            slug, SEO description, canonical URL, share text, and read time.
          </p>
        </div>

        {error ? (
          <div className="text-sm border border-red-200 bg-red-50 text-red-700 rounded-md px-3 py-2">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="text-sm border border-green-200 bg-green-50 text-green-700 rounded-md px-3 py-2">
            {success}
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Title
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="Article title"
            />
          </label>

          <label className="text-sm">
            Slug
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.slug}
              onChange={(event) => onSlugChange(event.target.value)}
              placeholder="auto-generated-slug"
            />
          </label>

          <label className="text-sm">
            Type
            <select
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.content_type}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  content_type: event.target.value as PostType,
                }))
              }
            >
              <option value="Article">Article</option>
              <option value="Story">Story</option>
              <option value="News">News</option>
              <option value="Blog">Blog (publishes to /articles)</option>
            </select>
          </label>

          <label className="text-sm">
            Author
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.author}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, author: event.target.value }))
              }
            />
          </label>

          <label className="text-sm">
            Location
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.location}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, location: event.target.value }))
              }
            />
          </label>

          <label className="text-sm">
            Keywords (comma-separated)
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.keywords}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, keywords: event.target.value }))
              }
            />
          </label>

          <label className="text-sm md:col-span-2">
            Excerpt (optional, auto-generated if empty)
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[70px]"
              value={form.excerpt}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, excerpt: event.target.value }))
              }
            />
          </label>

          <label className="text-sm md:col-span-2">
            Body (Markdown/MDX)
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[260px] font-mono text-sm"
              value={form.body}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, body: event.target.value }))
              }
              placeholder="# Heading"
            />
          </label>

          <label className="text-sm md:col-span-2">
            Cover image URL
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.cover_image_url}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  cover_image_url: event.target.value,
                }))
              }
              placeholder="/images/your-image.jpg"
            />
          </label>

          <label className="text-sm">
            Cover image alt
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.cover_image_alt}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  cover_image_alt: event.target.value,
                }))
              }
            />
          </label>

          <label className="text-sm">
            Cover image caption
            <input
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={form.cover_image_caption}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  cover_image_caption: event.target.value,
                }))
              }
            />
          </label>

          <label className="text-sm md:col-span-2">
            Share message (optional, supports {"{URL}"})
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[70px]"
              value={form.share_message}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  share_message: event.target.value,
                }))
              }
            />
          </label>

          <label className="text-sm md:col-span-2">
            Donate line (optional)
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[70px]"
              value={form.donate_line}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, donate_line: event.target.value }))
              }
            />
          </label>

          <label className="text-sm md:col-span-2">
            Author bio (optional)
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[70px]"
              value={form.author_bio}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, author_bio: event.target.value }))
              }
            />
          </label>

          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, featured: event.target.checked }))
              }
            />
            Mark as featured
          </label>
        </div>

        <div className="grid gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
          <p>
            <span className="font-semibold">Route:</span>{" "}
            {routePreview || "-"}
          </p>
          <p>
            <span className="font-semibold">Reading time:</span>{" "}
            {automationPreview?.reading_time_minutes || 1} min
          </p>
          <p>
            <span className="font-semibold">SEO title:</span>{" "}
            {automationPreview?.seo_title || "-"}
          </p>
          <p>
            <span className="font-semibold">SEO description:</span>{" "}
            {automationPreview?.seo_description || "-"}
          </p>
          <p>
            <span className="font-semibold">Canonical:</span>{" "}
            {automationPreview?.canonical_url || "-"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => savePost("draft")}
            disabled={saving}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => savePost("published")}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-black text-white text-sm"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
          {form.id ? (
            <button
              type="button"
              onClick={removePost}
              disabled={saving}
              className="px-4 py-2 rounded-md border border-red-300 text-red-700 text-sm"
            >
              Delete
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
