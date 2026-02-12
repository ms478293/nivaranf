import { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";
import BlogHeading from "./contentFormatting/BlogHeading";
import BlogImageWithCaption from "./contentFormatting/BlogImageWithCaption";
import BlogList from "./contentFormatting/BlogList";
import BlogParagraph from "./contentFormatting/BlogParagraph";
import BlogQuote from "./contentFormatting/BlogQuote";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-lg font-medium  justify-center hidden mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-medium mb-4">{children}</h2>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      width={1000}
      height={1000}
      className="w-full h-[600px] object-cover"
      {...(props as ImageProps)}
      alt={(props as ImageProps).alt || "Blog Image"}
    />
  ),
  p: ({ children }) => (
    <p
      style={{
        lineHeight: "1.8",
        marginBottom: "2rem",
      }}
    >
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    return (
      <Link href={href as string} className="text-blue-300" passHref>
        {children}
      </Link>
    );
  },
  div: ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    if (
      childrenArray.length === 2 &&
      React.isValidElement(childrenArray[0]) &&
      React.isValidElement(childrenArray[1])
    ) {
      const [first, second] = childrenArray;
      if (first.type === "p" && second.type === "img") {
        return (
          <div className="flex flex-row gap-4 items-center">
            <div className="w-1/2">{first}</div>
            <div className="w-1/2">{second}</div>
          </div>
        );
      }
    }

    return <div>{children}</div>;
  },
  BlogParagraph: BlogParagraph,
  BlogList: BlogList,
  BlogQuote: BlogQuote,
  BlogImageWithCaption: BlogImageWithCaption,
  BlogHeading: BlogHeading,
  Link: Link,
};
