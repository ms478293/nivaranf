import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const STATIC_BLOG_DIRECTORIES = [
  path.join(process.cwd(), "src/blogs/global"),
  path.join(process.cwd(), "src/blogs/usa"),
];

export async function readStaticBlogFile(slug: string, directories = STATIC_BLOG_DIRECTORIES) {
  if (!slug || slug === "." || slug === ".." || /[/\\\0]/.test(slug)) {
    throw new Error("Invalid article slug");
  }
  // Read at most one file per content directory, rather than parsing the whole
  // archive whenever an uncached article is requested.
  for (const directory of directories) {
    try {
      const parsed = matter(await fs.readFile(path.join(directory, `${slug}.mdx`), "utf8"));
      return { content: parsed.content, data: parsed.data };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  throw new Error(`Missing static blog file for slug "${slug}"`);
}
