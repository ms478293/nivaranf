"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { ComponentConfiguratorProps } from "../types/form-element-types";
import { BlogHeadingConfig } from "./BlogHeadingConfig";
import { BlogImageWithCaptionConfig } from "./BlogImageWithCaptionConfig";
import { BlogListConfig } from "./BlogListConfig";
import { BlogQuoteConfig } from "./BlogQuoteConfig";

const BlogParagraphConfig = dynamic(
  () =>
    import("../configurators/BlogParagraphConfig").then(
      (mod) => mod.BlogParagraphConfig // Adjust to match the export name
    ),
  {
    ssr: false,
    loading: () => <p>Loading Blog Paragraph...</p>,
  }
);
const ComponentConfigurator = ({
  components,
  updateComponent,
  removeComponent,
  moveComponent,
}: ComponentConfiguratorProps & {
  removeComponent: (index: number) => void;
  moveComponent: (index: number, direction: "left" | "right") => void;
}) => {
  return (
    <Tabs defaultValue={`component-${0}`} className="w-full">
      {/* Render TabsList once */}
      <TabsList className="gap-2 overflow-auto flex flex-wrap h-fit justify-start items-start">
        {components?.map((comp, index) => (
          <TabsTrigger
            key={index}
            value={`component-${index}`}
            className="flex gap-2"
          >
            <span>
              {comp.type === "BlogList"
                ? "List"
                : comp.type === "BlogImageWithCaption"
                ? "Image"
                : comp.type === "BlogParagraph"
                ? "Paragraph"
                : comp.type === "BlogQuote"
                ? "Quote"
                : comp.type === "BlogHeading"
                ? "Heading"
                : ""}
            </span>
            <span className="px-2 py-1 border-l-2">{index + 1}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Render TabsContent for each component */}
      {components?.map((comp, index) => (
        <TabsContent
          key={index}
          value={`component-${index}`}
          className="border bg-white p-4 rounded-xl"
        >
          <div className="my-2 text-xl">
            <span>
              {comp.type === "BlogList"
                ? "List"
                : comp.type === "BlogImageWithCaption"
                ? "Image"
                : comp.type === "BlogParagraph"
                ? "Paragraph"
                : comp.type === "BlogQuote"
                ? "Quote"
                : comp.type === "BlogHeading"
                ? "Heading"
                : ""}
            </span>
            <span className="px-2 py-1 ">{index + 1}</span>
          </div>

          {/* Configuration Components */}
          {comp.type === "BlogParagraph" && (
            <BlogParagraphConfig
              index={index}
              config={comp.config}
              updateComponent={updateComponent}
            />
          )}
          {comp.type === "BlogImageWithCaption" && (
            <BlogImageWithCaptionConfig
              index={index}
              config={comp.config}
              updateComponent={updateComponent}
            />
          )}
          {comp.type === "BlogList" && (
            <BlogListConfig
              index={index}
              config={comp.config}
              updateComponent={updateComponent}
            />
          )}
          {comp.type === "BlogQuote" && (
            <BlogQuoteConfig
              index={index}
              config={comp.config}
              updateComponent={updateComponent}
            />
          )}
          {comp.type === "BlogHeading" && (
            <BlogHeadingConfig
              index={index}
              config={comp.config}
              updateComponent={updateComponent}
            />
          )}

          {/* Controls */}
          <div className="w-full h-[1px] bg-gray-400 my-2"></div>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={() => moveComponent(index, "left")}
              className="text-blue-500"
              disabled={index === 0}
              variant="outline"
            >
              Move Left
            </Button>
            <Button
              onClick={() => moveComponent(index, "right")}
              className="text-blue-500"
              disabled={index === components.length - 1}
              variant="outline"
            >
              Move Right
            </Button>
            <Button
              onClick={() => removeComponent(index)}
              variant="destructive"
              className=""
            >
              Remove Component
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ComponentConfigurator;
