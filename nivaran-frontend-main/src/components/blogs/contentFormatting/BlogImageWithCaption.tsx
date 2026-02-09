import { cn } from "@/lib/utils";
import Image from "next/image";
type ImageWithCaptionProps = {
  imageUrl: string;
  altText: string;
  caption?: string;
  width?: number;
  height?: number;
  orientation?: "left" | "right" | "center";
};

const BlogImageWithCaption = ({
  imageUrl,
  altText,
  caption,
  width = 600,
  height = 400,
  orientation = "left",
}: ImageWithCaptionProps) => {
  return (
    <figure
      className={cn(
        "my-4 flex flex-col g",
        orientation && orientation === "left"
          ? "justify-start items-start"
          : orientation === "right"
          ? "justify-end items-end"
          : "justify-center items-center"
      )}
    >
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        className="rounded-lg"
      />
      {caption && (
        <figcaption className="text-sm text-gray-500 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default BlogImageWithCaption;
