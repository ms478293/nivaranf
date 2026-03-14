import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import {
  getBlogRouteSegmentByType,
  type BlogRouteSegment,
} from "@/lib/blog-routes";
import { isNonNepalCandidate, sortBlogsByDateDesc } from "@/lib/content/blogFilters";
import { getPublishedBlogItemsBySegment } from "@/lib/content/posts";

function dedupeBlogs(items: blogListType[]) {
  const unique: blogListType[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item?.slug || seen.has(item.slug)) continue;
    seen.add(item.slug);
    unique.push(item);
  }

  return unique;
}

export async function getGlobalFeedBySegment(segment: BlogRouteSegment) {
  const staticItems = globalBlogs.filter(
    (blog) => getBlogRouteSegmentByType(blog.type) === segment,
  );
  const dynamicItems = await getPublishedBlogItemsBySegment(segment);

  return sortBlogsByDateDesc(
    dedupeBlogs([...dynamicItems, ...staticItems]).filter(isNonNepalCandidate),
  );
}

export async function getGlobalMixedFeed(limit = 8) {
  const [news, stories, articles] = await Promise.all([
    getGlobalFeedBySegment("news"),
    getGlobalFeedBySegment("stories"),
    getGlobalFeedBySegment("articles"),
  ]);

  return sortBlogsByDateDesc(
    dedupeBlogs([...news, ...stories, ...articles]).filter(isNonNepalCandidate),
  ).slice(0, Math.max(1, Math.min(limit, 24)));
}
