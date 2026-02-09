import { ProgramContentType } from "@/content/site-data";
import { ImageInformationDisplayCard } from "../main/ImageInformationDisplayCard";

export const Contents = ({ data }: ProgramContentType) => {
  return (
    <div className="border border-gray-50 md:bg-gray-50/30 bg-none px-6 md:px-16 lg:px-64 py-6">
      <h1 className="mb-5 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-main">
        {data.title}
      </h1>
      {data.mainParagraphs.map((paragraph, index) => (
        <p
          className="mb-3 font-normal text-black lg:text-base text-sm text-justify"
          key={index}
        >
          {paragraph}
        </p>
      ))}
      <div className="flex flex-col gap-8 bg-white lg:p-4 px-0 py-2 rounded-2xl">
        {data.subContent.map((content, index) => (
          <div key={index} className="">
            <h4 className="  text-center text-2xl font-medium tracking-tight text-secondary-main">
              {content.title}
            </h4>

            <ImageInformationDisplayCard
              imageAlignment={content.imgAlignment}
              imgUrl={content.imgUrl}
              imgAlt={content.imgAlt}
              title={content.title}
              paragraphs={content.subParagraphs}
            ></ImageInformationDisplayCard>
            <div className="h-[1px] bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
