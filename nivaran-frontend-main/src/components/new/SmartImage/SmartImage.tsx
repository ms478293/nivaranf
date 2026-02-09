import Image from "next/image";
import React from "react";

export interface SmartImageProps extends React.ComponentProps<"picture"> {
  images: {
    name: string;
    type: string;
  }[];
}

export const SmartImage = ({ images, ...props }: SmartImageProps) => {
  return (
    <picture {...props}>
      {images.map((image) => (
        <source
          srcSet={image.name}
          type={`image/${image.type}`}
          key={image.name}
        />
      ))}
      <Image
        src={images[0].name}
        alt={images[0].name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        // fill
      />
    </picture>
  );
};
