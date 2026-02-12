"use client";
import dynamic from "next/dynamic";

const BlogFormComponent = dynamic(
  () => import("@/components/editor/BlogEditor"),
  {
    ssr: false,
    loading: () => <p>Loading Blog Paragraph...</p>,
  }
);
const BlogForm = () => {
  return <BlogFormComponent></BlogFormComponent>;
};

export default BlogForm;
