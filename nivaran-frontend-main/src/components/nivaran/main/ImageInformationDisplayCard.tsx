"use client";
import { InformationDisplayType } from "@/content/site-data";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import Image from "next/image";
import { CustomHeading } from "../common/CustomHeading";

export const ImageInformationDisplayCard = (data: InformationDisplayType) => {
  const screenSize = useScreenSize();
  return (
    <div className="max-w-[1140px] mx-auto ">
      <CustomHeading className="mb-0">Our Vision</CustomHeading>
      <div className="flex flex-col md:flex-row gap-8 py-4 border justify-center items-center  border-white bg-white">
        {(data.imageAlignment == "left" || screenSize == "sm") && (
          <div className=" md:w-fit  lg:w-1/3">
            <Image
              className="w-full max-w-xs sm:max-w-md  md:max-w-full md:h-fit  sm:h-auto lg:h-full lg:min-h-full rounded-lg"
              src={data.imgUrl}
              alt={data.imgAlt}
              width={400} // Adjust the width as needed
              height={400} // Adjust the height as needed
              layout="responsive" // Maintains aspect ratio
              quality={70} // Adjust image quality (default is 75)
              placeholder="blur" // Add a blur effect while loading
              blurDataURL="/path-to-low-res-placeholder.jpg" // Optional placeholder
            />
          </div>
        )}

        <div className="w-full md:w-3/4">
          {data.paragraphs.map((paragraph, index) => (
            <p className="mb-4  text-black  text-justify" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
        {data.imageAlignment == "right" && screenSize == "md" && (
          <div className="w-full md:w-full  lg:w-1/3">
            <Image
              className="w-full max-w-xs sm:max-w-md object-cover md:max-w-full md:h-fit  sm:h-auto lg:h-full lg:min-h-full rounded-lg"
              src={data.imgUrl}
              alt={data.imgAlt}
              width={400} // Adjust the width as needed
              height={400} // Adjust the height as needed
              layout="responsive" // Maintains aspect ratio
              quality={70} // Adjust image quality (default is 75)
              placeholder="blur" // Add a blur effect while loading
              blurDataURL="/path-to-low-res-placeholder.jpg" // Optional placeholder
            />
          </div>
        )}
      </div>
    </div>
  );
};
