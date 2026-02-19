import { globalBlogs, type blogListType } from "@/blogs/listofblogs";

export type BlogRouteSegment = "articles" | "stories" | "news";

const BLOG_ROUTE_BY_TYPE: Record<blogListType["type"], BlogRouteSegment> = {
  Story: "stories",
  News: "news",
  Article: "articles",
  Collaboration: "articles",
  Opinion: "articles",
  Analysis: "articles",
  Project: "articles",
};

export function getBlogRouteSegmentByType(
  blogType: blogListType["type"]
): BlogRouteSegment {
  return BLOG_ROUTE_BY_TYPE[blogType];
}

export function getBlogPath(
  blog:
    | Pick<blogListType, "slug" | "type">
    | { slug: string; type: blogListType["type"] }
) {
  return `/${getBlogRouteSegmentByType(blog.type)}/${blog.slug}`;
}

export function getBlogPathBySlug(slug: string) {
  const blog = globalBlogs.find((entry) => entry.slug === slug);
  if (!blog) {
    return `/articles/${slug}`;
  }
  return getBlogPath(blog);
}

export function getBlogTypeBySlug(slug: string) {
  return globalBlogs.find((entry) => entry.slug === slug)?.type;
}

export function getKnownSlugsBySegment(segment: BlogRouteSegment) {
  return globalBlogs
    .filter((entry) => getBlogRouteSegmentByType(entry.type) === segment)
    .map((entry) => entry.slug);
}
