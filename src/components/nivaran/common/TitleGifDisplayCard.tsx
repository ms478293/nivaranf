"use client";
import { ServiceDataType } from "@/content/site-data";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import Image from "next/image";

export const TitleGifDisplayCard = ({
  title,
  imgUrl,
  altImage,
}: ServiceDataType) => {
  const screenSize = useScreenSize();
  return (
    <div className="relative w-full bg-contain bg-no-repeat lg:bg-cover lg:bg-center lg:bg-fixed">
      <div className="mx-auto  lg:gap-8  xl:gap-0">
        <div className=" lg:col-span-7">
          {/* <h1 className="mb-5 mx-auto text-center place-items-center lg:text-7xl text-3xl font-extrabold tracking-tight text-primary-main">
            {title}
          </h1> */}
          <div className="relative w-full lg:h-[1080px]  min-h-[200px]">
            {" "}
            {/* Fixed height */}
            {screenSize === "lg" ? (
              <Image
                src={imgUrl}
                alt={title}
                fill // Automatically covers the parent container
                className="object-cover" // Ensures the image fills the width and height
                priority // Optimizes loading for above-the-fold images
              />
            ) : (
              <Image
                src={altImage}
                alt={title}
                fill
                className="object-scale-down h-fit " // Ensures the image fills the width and height
                priority // Optimizes loading for above-the-fold images
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
