import BlogHeading from "@/components/blogs/contentFormatting/BlogHeading";
import BlogImageWithCaption from "@/components/blogs/contentFormatting/BlogImageWithCaption";
import BlogList from "@/components/blogs/contentFormatting/BlogList";
import BlogParagraph from "@/components/blogs/contentFormatting/BlogParagraph";
import BlogQuote from "@/components/blogs/contentFormatting/BlogQuote";
import DOMPurify from "dompurify";
import Image from "next/image";
import { BlogLayoutProps } from "../types/form-element-types";

export const Preview = ({
  layouts,
  formInputs,
}: {
  layouts: BlogLayoutProps[];
  formInputs: any; // Replace 'any' with the actual type
}) => {
  const data = formInputs;

  return (
    <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Preview</h3>
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

        {data.heading && (
          <h2 className="w-full h-full text-6xl">{data.heading}</h2>
        )}
        {data.content && <p className="w-full h-full">{data.content}</p>}
        <section className="mdx-content">
          {layouts.map((layout, layoutIndex) => (
            <div
              key={layoutIndex}
              className={`${
                layout.type === "BoxLayout"
                  ? "p-4 border rounded-md shadow-md"
                  : layout.type === "GridLayout"
                  ? "grid grid-cols-2 gap-4"
                  : layout.type === "FlexLayout"
                  ? "flex flex-wrap gap-4"
                  : ""
              }`}
            >
              {layout.components?.map((comp, index) => {
                switch (comp.type) {
                  case "BlogParagraph":
                    return (
                      <BlogParagraph {...comp.config} key={index}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(comp.config.text),
                          }}
                        ></div>
                      </BlogParagraph>
                    );
                  case "BlogImageWithCaption":
                    return (
                      <BlogImageWithCaption
                        {...comp.config}
                        imageUrl={comp.config.imageUrl}
                        altText={comp.config.altText}
                        key={index}
                      />
                    );
                  case "BlogList":
                    return (
                      <BlogList
                        items={comp.config.items}
                        type={comp.config.type}
                        key={index}
                      />
                    );
                  case "BlogQuote":
                    return (
                      <BlogQuote
                        {...comp.config}
                        text={comp.config.text}
                        key={index}
                      />
                    );
                  case "BlogHeading":
                    return <BlogHeading {...comp.config} key={index} />;
                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </section>
      </article>
    </div>
  );
};
