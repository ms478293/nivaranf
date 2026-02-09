import Image from "next/image";

type propTypes = {
  imageUrl?: string;
  imageAlt?: string;
  orientation?: "left" | "right";
  width?: number | "full" | "half";
  height?: number | "short" | "long";
};

const defaultData: propTypes = {
  orientation: "right",
  width: "half",
  height: "short",
};

const BlogParagraph = ({
  imageData = {}, // Default to an empty object
  children,
}: {
  imageData?: propTypes; // Mark as optional
  children: React.ReactNode;
}) => {
  const ImageProps: propTypes = { ...defaultData, ...imageData };

  ImageProps.height =
    ImageProps.height === "long"
      ? 200
      : ImageProps.height === "short"
      ? 100
      : (ImageProps.height as number); // Cast to number if already a number

  ImageProps.width =
    ImageProps.width === "full"
      ? 200
      : ImageProps.width === "half"
      ? 100
      : (ImageProps.width as number); // Cast to number if already a number

  if (ImageProps.imageUrl) {
    if (ImageProps.orientation === "left") {
      return (
        <div className="flex lg:flex-row flex-col items-center w-full my-4">
          <Image
            src={ImageProps.imageUrl}
            alt={ImageProps.imageAlt || "Blog Image"}
            height={ImageProps.height}
            width={ImageProps.width}
            className="lg:object-cover object-contain"
          />
          <div className="lg:ml-4 mt-4 lg:mt-0">{children}</div>
        </div>
      );
    } else {
      return (
        <div className="flex lg:flex-row flex-col items-center w-full my-4">
          <div className="lg:mr-4 mb-4 lg:mb-0">{children}</div>
          <Image
            src={ImageProps.imageUrl || ""}
            alt={ImageProps.imageAlt || "Blog Image"}
            height={ImageProps.height}
            width={ImageProps.width}
            className="lg:object-cover object-contain"
          />
        </div>
      );
    }
  } else {
    return <div className="w-full leading-[1.8] preview-style">{children}</div>;
  }
};

export default BlogParagraph;
