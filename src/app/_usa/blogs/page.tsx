import { usaBlogs as blogs } from "@/blogs/listofblogs";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 p-8 rounded-lg bg-white">
        Discover Latest Blogs
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="h-full w-full border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blogs/${blog.slug}`} className="h-full flex flex-col">
              <div className="relative w-full h-52">
                <Image
                  src={blog.thumbnailImage}
                  alt={blog.title}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-fit bg-white">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{blog.summary}</p>
                </div>
              </div>
              <div className="w-full h-[1px] px-2 bg-black/45"></div>
              <div className="flex w-full px-4 justify-between text-sm py-2 bg-white">
                <div className="font-bold">{blog.date}</div>
                <div className="font-bold">{blog.author}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
