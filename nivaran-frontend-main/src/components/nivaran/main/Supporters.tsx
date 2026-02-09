"use client";
import { Image_List } from "@/content/partners";
import Image from "next/image";

export const Supporters = () => {
  const images = Image_List.map((image, index) => (
    <div
      key={`link-${index}`}
      // href={image.link}
      // target="_blank"
      // aria-disabled
      // rel="noopener noreferrer"
      className="marquee-link"
    >
      <Image
        src={image.src}
        alt={image.name}
        height={120}
        width={120}
        className="rounded-md max-w-none"
        style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
      />
    </div>
  ));

  return (
    <div
      className="overflow-hidden 
    my-4"
    >
      {/* bg-[linear-gradient(to_bottom_,rgba(255,_255,_255,_0)_0%_.rgba(255,_255,_255,_0.59)_10%_,white_50%_,white_100%)]  */}
      <div className="marquee">
        <div className="marquee-content ">
          <div className="flex gap-6">{images}</div>
          <div className="flex gap-6">{images}</div>
          <div className="flex gap-6">{images}</div>
          <div className="flex gap-6">{images}</div>
          <div className="flex gap-6">{images}</div>
          {/* Duplicate for seamless scrolling */}
        </div>
      </div>
    </div>
  );
};
