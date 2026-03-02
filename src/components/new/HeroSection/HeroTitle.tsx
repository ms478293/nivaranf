"use client";

import { SocialLinks } from "@/components/nivaran/common/footer/SocialLinks";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useImageTransition } from "@/hooks/useImageTransition";
import Link from "next/link";

const WORDS = [
  "Saving Lives",
  "Better Healthcare",
  "Quality Education",
  "Healthier Futures",
];

const HeroTitle = ({
  imagesLength,
  currentImageIndex,
}: {
  imagesLength: number;
  currentImageIndex: number;
}) => {
  const { currentIndex: currentWordIndex } = useImageTransition({
    data: WORDS,
    transitionTime: 3000,
  });

  return (
    // <div className="absolute w-full top-[38%] min-[390px]:top-[40%] sm:top-[60%] min-[430px]:top-[35%]  xl:top-[60%]    z-[20] px-4 ">
    <div className="w-full absolute z-[20] md:bottom-20 bottom-16 px-4">
      <div className="max-w-[1320px] mx-auto">
        <div className="text-white md:text-4xl/[58px] text-xl min-[430px]:text-3xl  max-w-[700px] sm:max-w-[620px] font-[600] relative font-Poppins min-[430px]:leading-[3.5rem] sm:leading-normal  ">
          Building a Better World{"  "}
          <span className="font-extralight ">Together by </span>
          <span className="text-primary-500 [&>span]:block absolute md:-right-[20rem] left-0 sm:left-auto sm:-right-[16rem] top-[4.5rem]  min-[430px]:top-[6.8rem] sm:top-16 md:top-16 max-[430px]:-right-32  h-[4.5rem] w-full overflow-hidden">
            <RenderList
              data={WORDS}
              render={(word, index) => (
                <span
                  key={word}
                  className={` absolute w-full h-full  duration-1000 z-[50]   ${
                    index === currentWordIndex ? "dropping-texts" : " opacity-0"
                  }`}
                >
                  {word}
                </span>
              )}
            />
          </span>
        </div>
        <p className="text-white text-md md:text-lg/8 max-w-3xl leading-6 font-normal mt-10 min-[430px]:mt-12 min-[430px]:mb-2 sm:mt-2">
          Rewrite the story of tomorrow, one community at a time. Together, we
          are building a brighter future for all.
        </p>
      </div>
      <div className=" flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between w-full -mt-4 md:mt-0 max-w-[1320px] mx-auto ">
        <div className="flex items-center gap-3 mt-8">
          <Link href="/donate" aria-label="Click to donate to Us">
            <AppButton
              variant="secondary"
              className="font-light"
              aria-label="Donate Now"
            >
              Donate now
            </AppButton>
          </Link>
          <Link href="/about" aria-label="Read More About Us">
            <AppButton
              variant="secondary-outline"
              className="font-light"
              aria-label="Explore Now"
            >
              Explore now
            </AppButton>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <SocialLinks variant="secondary" />
          <div className=" flex sm:justify-end ">
            <div
              className="relative flex gap-2 justify-start sm:justify-end items-center z-30 group"
              role="tablist"
              aria-label="Slide navigation"
            >
              {Array.from({ length: imagesLength }).map((_, item) => (
                <button
                  key={item}
                  role="tab"
                  aria-label={`Slide ${item + 1}`}
                  aria-selected={item === currentImageIndex}
                  tabIndex={item === currentImageIndex ? 0 : -1}
                  className={`w-3 h-3 bg-gray-200 rounded-full transition-all duration-300 p-0 border-0 cursor-default ${
                    item === currentImageIndex ? "scale-50" : ""
                  }`}
                />
              ))}

              {/* Moving Dot - decorative, hidden from screen readers */}
              <div
                aria-hidden="true"
                className="absolute w-3 h-3 left-0 bg-primary-500 rounded-full transition-transform duration-500"
                style={{
                  transform: `translateX(${currentImageIndex * 20}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTitle;
