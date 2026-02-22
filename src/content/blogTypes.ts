import { globalBlogs } from "@/blogs/listofblogs";

export const blogTypes = [
  "All",
  "Global",
  ...new Set(globalBlogs.map((blog) => blog.type)),
];
