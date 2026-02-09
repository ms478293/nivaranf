"use client";
import { siteContentData } from "@/content/site-data";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { BackgroundImageDisplayCard } from "../common/BackgroundImageDisplayCard";
import { ImageInformationDisplayCard } from "./ImageInformationDisplayCard";

const MainGridComponent = () => {
  const screenSize = useScreenSize();
  return (
    <div>
      {siteContentData.map((content, index) => {
        return (
          <div key={index}>
            <div className="">
              <div className="hidden lg:block">
                <BackgroundImageDisplayCard
                  type="normal"
                  title={""}
                  description=""
                  imgUrl={content.imgUrl}
                ></BackgroundImageDisplayCard>
              </div>
              <h1 className="mb-5  px-2 flex justify-center my-2 lg:text-7xl text-3xl font-extrabold tracking-tight text-primary-main">
                {content.title}
              </h1>
              <div className=" h-[1px] bg-gray-200 my-2 mx-6"></div>
              {screenSize == "lg" ? (
                <ImageInformationDisplayCard
                  {...content}
                  key={index}
                ></ImageInformationDisplayCard>
              ) : (
                <ImageInformationDisplayCard
                  key={index}
                  {...content}
                  imageAlignment="left"
                ></ImageInformationDisplayCard>
              )}
            </div>
            <div className=" h-[1px] bg-gray-200 my-2 mx-6"></div>
          </div>
        );
      })}
    </div>
  );
};

export { MainGridComponent };
