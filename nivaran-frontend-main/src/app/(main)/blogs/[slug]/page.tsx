import MdxRenderer from "@/components/blogs/MDXRenderer";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import path from "path";

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  try {
    const blogDirectory = path.join(process.cwd(), "src/blogs/global");
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
    const blogPath = path.join(
      process.cwd(),
      "src/blogs/global",
      `${slug}.mdx`
    );
    const fileContents = await fs.readFile(blogPath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title || "Untitled Blog",
      description: data.subtitle || "Read this amazing blog on our platform.",
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
    const blogPath = path.join(
      process.cwd(),
      "src/blogs/global",
      `${slug}.mdx`
    );
    const fileContents = await fs.readFile(blogPath, "utf8");
    const { content, data } = matter(fileContents);

    const mdxSource = await serialize(content);

    return (
      <>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.subtitle || ""} />
          <meta name="keywords" content={data.keywords || ""} />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.subtitle || ""} />
          <meta property="og:image" content={data.mainImage || ""} />
          <meta property="og:type" content="article" />
          <meta name="author" content={data.author || "Unknown"} />
          <link
            rel="canonical"
            href={`https://nivaranfoundation.com/blogs/${slug}`}
          />
        </Head>
        <div className="w-full px-4 font-Poppins">
          <article className="max-w-[1140px] mx-auto ">
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
            <section className="mdx-content">
              <MdxRenderer source={mdxSource} />
            </section>
          </article>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error rendering blog:", error);
    return <div>Failed to load blog content</div>;
  }
}

// export const dynamicParams = true;

// export default async function page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   // const blogDirectory = path.join(process.cwd(), "src/blogs/global");
//   // const files = await fs.readdir(blogDirectory);

//   // Map the filenames to slugs for static paths
//   // return files.map((file) => ({
//   //   slug: file.replace(/\.mdx$/, ""),
//   // }));
//   try {
//     const slug = (await params).slug;
//     const blogPath = path.join(
//       process.cwd(),
//       "src/blogs/global",
//       `${slug}.mdx`
//     );
//     const fileContents = await fs.readFile(blogPath, "utf8");
//     const { content, data } = matter(fileContents);

//     const mdxSource = await serialize(content);

//     return (
//       <main className="w-full px-4">
//         <article className="max-w-[1320px] mx-auto">
//           <h1 className="text-gray-800 text-xl font-[600]">{data.title}</h1>
//           <div className="text-gray-600 flex gap-2 sm:justify-between justify-start sm:items-center flex-col sm:flex-row mb-8">
//             <div className=" items-center gap-2 flex justify-between sm:gap-8 sm:justify-start">
//               <p className="flex items-center gap-2">
//                 <EditIcon className="w-4 h-4 stroke-gray-600" />
//                 <span className="text-sm  max-w-[150px] sm:max-w-full truncate">
//                   {data.author}
//                 </span>
//               </p>

//               <p> {new Date(data.date).toLocaleDateString()}</p>
//             </div>
//             <button className="flex gap-2 items-center border border-gray-600 p-1.5 px-4  rounded-md w-fit">
//               <span>Share</span>
//               <ShareIcon className="stroke-gray-600 w-5 h-5" />
//             </button>
//           </div>
//           <div className="w-full h-[60vh]">
//             <Image
//               src={data.mainImage}
//               alt={data.title}
//               width={1000}
//               height={1000}
//               className="block object-cover object-center w-full h-full"
//             />
//           </div>

//           <h2 className="font-medium text-lg text-gray-950 italic mt-4">
//             {data.subtitle}
//           </h2>

//           <MdxRenderer source={mdxSource} />
//         </article>
//       </main>
//     );
//   } catch (error) {
//     console.error("Error rendering blog:", error);
//     return <div>Failed to load blog content</div>;
//   }
// }
