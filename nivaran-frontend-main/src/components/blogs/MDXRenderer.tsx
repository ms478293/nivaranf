"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "./useMDXcomponents";

export default function MdxRenderer({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  const components = useMDXComponents({}); // pass any default components if needed

  return (
    <section className="prose flex justify-center  flex-col bg-white  rounded-none mt-8">
      <article>
        <MDXRemote {...source} components={components} />
      </article>
    </section>
  );
}
