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
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={altImage}
                alt={title}
                fill
                sizes="100vw"
                className="object-scale-down h-fit"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
