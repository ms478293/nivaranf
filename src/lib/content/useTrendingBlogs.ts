"use client";

import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import { useEffect, useState } from "react";

function fallbackBlogs(limit: number) {
  return globalBlogs.filter((blog) => blog.featured).slice(0, limit);
}

export function useTrendingBlogs(limit: number) {
  const [blogs, setBlogs] = useState<blogListType[]>(() => fallbackBlogs(limit));

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/content/featured?limit=${limit}`, {
          cache: "no-store",
        });
        if (!response.ok) return;

        const payload = (await response.json()) as { posts?: blogListType[] };
        const posts = Array.isArray(payload.posts) ? payload.posts : [];
        if (active && posts.length > 0) {
          setBlogs(posts.slice(0, limit));
        }
      } catch {
        // Keep fallback list silently.
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [limit]);

  return blogs;
}
