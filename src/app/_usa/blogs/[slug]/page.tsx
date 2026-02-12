import { mdxComponents } from "@/components/blogs/mdxComponents";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Head from "next/head";
import Image from "next/image";
import path from "path";

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  try {
    const blogDirectory = path.join(process.cwd(), "src/blogs/usa");
    const files = await fs.readdir(blogDirectory);

    // Map the filenames to slugs for static paths
    return files.map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// Fetch metadata for the blog
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const slug = (await params).slug;
    const blogPath = path.join(process.cwd(), "src/blogs/usa", `${slug}.mdx`);
    const fileContents = await fs.readFile(blogPath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title || "Untitled Blog",
      description:
        data.description || "Read this amazing blog on our platform.",
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return { title: "Untitled Blog" };
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const slug = (await params).slug;
    const blogPath = path.join(process.cwd(), "src/blogs/usa", `${slug}.mdx`);
    const fileContents = await fs.readFile(blogPath, "utf8");
    const { content, data } = matter(fileContents);

    return (
      <>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.description || ""} />
          <meta name="keywords" content={data.keywords || ""} />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.description || ""} />
          <meta property="og:image" content={data.mainImage || ""} />
          <meta property="og:type" content="article" />
          <meta name="author" content={data.author || "Unknown"} />
          <link
            rel="canonical"
            href={`https://usa.nivaranfoundation.com/blogs/${slug}`}
          />
        </Head>
        <article className="lg:mx-32 mx-1">
          <header className="flex flex-col items-start justify-start lg:p-8 p-2 gap-2">
            <div className="flex w-full flex-col gap-4">
              <div className="lg:flex gap-4 items-start justify-end w-full lg:text-lg text-sm hidden">
                <div>
                  <span className="font-extralight">Published At: </span>
                  <time dateTime={data.date} className="font-semibold">
                    {new Date(data.date).toLocaleDateString()}
                  </time>
                </div>
                <div>
                  <span className="font-extralight">Author: </span>
                  <span className="font-semibold">{data.author}</span>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <h1 className="lg:text-7xl text-xl font-bold leading-10 w-full">
                  {data.title}
                </h1>
              </div>
              <h2 className="lg:text-3xl text-lg font-extralight font-serif italic">
                {data.subtitle}
              </h2>
            </div>
            <div className="lg:hidden gap-4 items-start justify-end w-full lg:text-lg text-sm flex">
              <div>
                <span className="font-extralight">Published At: </span>
                <time dateTime={data.date} className="font-semibold">
                  {new Date(data.date).toLocaleDateString()}
                </time>
              </div>
              <div>
                <span className="font-extralight">Author: </span>
                <span className="font-semibold">{data.author}</span>
              </div>
            </div>
          </header>
          {data.mainImage && (
            <div className="w-full h-full">
              <Image
                src={data.mainImage}
                alt={data.title}
                height={800}
                width={1000}
                priority
                className="max-h-[800px] w-full object-cover"
              />
            </div>
          )}
          <section className="mdx-content prose flex justify-center flex-col bg-white rounded-none mt-8">
            <article>
              <MDXRemote source={content} components={mdxComponents} />
            </article>
          </section>
        </article>
      </>
    );
  } catch (error) {
    console.error("Error rendering blog:", error);
    return <div>Failed to load blog content</div>;
  }
}
