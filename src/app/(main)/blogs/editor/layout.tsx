import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Editor | Nivaran Foundation",
  description:
    "Internal editor interface for drafting and formatting Nivaran Foundation blog content.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/blogs/editor",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function BlogEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
