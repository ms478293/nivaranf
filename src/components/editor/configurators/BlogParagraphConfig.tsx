"use client";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic"; // Import dynamic
import { useEffect, useState } from "react";
import { FormInput, FormSelect } from "../form-elements/FormFields";
import { BlogParagraphConfigType } from "../types/form-element-types";

// Dynamically import FormEditor to ensure it's only used on the client side
let FormEditor;
if (typeof window !== "undefined") {
  FormEditor = dynamic(() => import("../form-elements/FormEditor"), {
    ssr: false, // Disable SSR (server-side rendering)
    loading: () => <p>Loading Editor...</p>, // Optional: Show loading text while loading
  });
}

export const BlogParagraphConfig = ({
  index,
  config,
  updateComponent,
}: {
  index: number;
  config: BlogParagraphConfigType;
  updateComponent: (index: number, config: BlogParagraphConfigType) => void;
}) => {
  const [hasImage, setHasImage] = useState(config.hasImage ?? false);
  useEffect(() => {
    updateComponent(index, { ...config, hasImage }); // Sync with global state
  }, [hasImage]);

  const handleTextChange = (value: string) => {
    updateComponent(index, { ...config, text: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Replacing FormTextarea with FormEditor */}
      <div className="flex flex-col gap-2">
        <label htmlFor={`text-${index}`}>Paragraph Text</label>
        {FormEditor && (
          <FormEditor
            value={config.text} // Pass text as value to FormEditor
            onChange={handleTextChange} // Handle changes from the editor
            holder={`text-editor-${index}`} // Unique holder for each editor
          />
        )}
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasImage"
            checked={hasImage}
            onCheckedChange={() => setHasImage(!hasImage)}
          />
          <label
            htmlFor="hasImage"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Has Image
          </label>
        </div>
        {hasImage && (
          <div className="grid grid-cols-5 gap-4">
            <FormSelect
              id={`imgUrl-${index}`}
              label="Image Url"
              options={[{ value: "/usa/1.png", label: "Placeholder" }]}
              value={config.orientation}
              onChange={(value: BlogParagraphConfigType["imageUrl"]) =>
                updateComponent(index, { ...config, imageUrl: value })
              }
            />

            <FormInput
              id={`imageAlt-${index}`}
              label="Image Alt Text"
              placeholder="Enter image alt text"
              value={config.imageAlt}
              onChange={(value) =>
                updateComponent(index, { ...config, imageAlt: value })
              }
              required
            />

            <FormSelect
              id={`orientation-${index}`}
              label="Orientation"
              options={[
                { value: "left", label: "Left" },
                { value: "right", label: "Right" },
              ]}
              value={config.orientation}
              onChange={(value: BlogParagraphConfigType["orientation"]) =>
                updateComponent(index, { ...config, orientation: value })
              }
            />

            <FormSelect
              id={`width-${index}`}
              label="Width"
              options={[
                { value: "full", label: "Full" },
                { value: "half", label: "Half" },
              ]}
              value={config.width}
              onChange={(value: BlogParagraphConfigType["width"]) =>
                updateComponent(index, { ...config, width: value })
              }
            />

            <FormSelect
              id={`height-${index}`}
              label="Height"
              options={[
                { value: "short", label: "Short" },
                { value: "long", label: "Long" },
              ]}
              value={config.height}
              onChange={(value: BlogParagraphConfigType["height"]) =>
                updateComponent(index, { ...config, height: value })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
