"use client";

import { useImageTransition } from "@/hooks/useImageTransition";
import HeroImage from "./HeroImage";
import HeroTitle from "./HeroTitle";

const IMAGES = [
  {
    avif: "/hero_img/hero_img_1.avif",
    webp: "/hero_img/hero_img_1.webp",
    alt: "Smiling children playing outdoors, enjoying their time together",
  },
  {
    avif: "/hero_img/hero_img_2.avif",
    webp: "/hero_img/hero_img_2.webp",
    alt: "Doctor performing a checkup on a patient",
  },
  {
    avif: "/hero_img/hero_img_3.avif",
    webp: "/hero_img/hero_img_3.webp",
    alt: "Child working in unsafe conditions, highlighting child labor issue",
  },
];

const HeroSection = () => {
  const {
    currentIndex: currentImageIndex,
    // setCurrentIndex: setCurrentImageIndex,
  } = useImageTransition({ data: IMAGES });

  return (
    <div className="overflow-hidden  w-full h-full  flex justify-center font-Poppins">
      <div className=" w-full h-[80vh] md:h-screen relative  overflow-hidden   ">
        {/* Carousel Wrapper */}
        <div className=" w-full h-full ">
          <HeroImage currentImageIndex={currentImageIndex} images={IMAGES} />
          <HeroTitle
            currentImageIndex={currentImageIndex}
            imagesLength={IMAGES.length}
          />

          <div className="w-full h-full bg-[linear-gradient(45deg,_#000000_25%_,transparent_80%)] absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
