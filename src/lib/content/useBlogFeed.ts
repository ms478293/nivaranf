"use client";

import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import { useEffect, useState } from "react";

function sortBlogsByDateDesc(items: blogListType[]) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    const safeA = Number.isFinite(aTime) ? aTime : 0;
    const safeB = Number.isFinite(bTime) ? bTime : 0;
    return safeB - safeA;
  });
}

function fallbackBlogs(limit: number) {
  return sortBlogsByDateDesc(globalBlogs).slice(0, limit);
}

export function useBlogFeed(limit = 200) {
  const safeLimit = Math.max(1, Math.min(limit, 500));
  const [blogs, setBlogs] = useState<blogListType[]>(() => fallbackBlogs(safeLimit));

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/content/blog-feed?limit=${safeLimit}`, {
          cache: "no-store",
        });
        if (!response.ok) return;

        const payload = (await response.json()) as { posts?: blogListType[] };
        const posts = Array.isArray(payload.posts) ? payload.posts : [];
        if (active && posts.length > 0) {
          setBlogs(posts.slice(0, safeLimit));
        }
      } catch {
        // Keep fallback list silently.
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [safeLimit]);

  return blogs;
}
