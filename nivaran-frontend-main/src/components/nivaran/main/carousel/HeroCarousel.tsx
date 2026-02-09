"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";
import { useImageTransition } from "@/hooks/useImageTransition";
import Image from "next/image";
import { CarouselContentComponent } from "./CarouselContentComponent";

const CarouselComponent = () => {
  const images = ["/carousel/6.jpg", "/carousel/5.jpg", "/carousel/4.jpg"];

  const { currentIndex, goToNext, goToPrevious, setCurrentIndex } =
    useImageTransition({ data: images });

  return (
    <div className=" w-full h-[50vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-black  ">
      {/* Carousel Wrapper */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <div key={index}>
            <div
              className={` absolute w-full h-full transition-opacity duration-1000   ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Image */}
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                // sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
                // fill
                height={1000}
                width={1000}
                className="w-full h-full "
                priority={index === currentIndex} // Optimize rendering for the active image
              />
            </div>
            {/* Carousel Content */}
            {index === currentIndex && (
              <div className=" flex items-center justify-start absolute left-4 bottom-40  md:bottom-44 lg:bottom-52 md:left-20  w-full ">
                <CarouselContentComponent currentIndex={currentIndex} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {/* <div className="w-full flex justify-between items-center  mx-10 "> */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 md:top-1/2  bg-gray-300/20 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform  z-30 "
        aria-label="Previous Slide"
      >
        <ArrowLeftIcon className="w-6 h-6 fill-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 md:top-1/2  w-fit  bg-gray-300/20 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform  z-30 "
        aria-label="Previous Slide"
      >
        <ArrowRightIcon className="w-6 h-6 fill-white" />
      </button>
      {/* </div> */}
      {/* Navigation Dots */}
      <div className="relative bottom-8 md:bottom-10 left-[38%] sm:left-[45%] md:left-1/2  flex space-x-4 z-30">
        {images.map((_, index) => (
          <button
            key={`navdots${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 border-blue-500 scale-125"
                : "bg-gray-400 border-gray-300 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
