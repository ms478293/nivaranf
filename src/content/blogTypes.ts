import { globalBlogs } from "@/blogs/listofblogs";

export const blogTypes = [
  "All",
  ...new Set(globalBlogs.map((blog) => blog.type)),
];
