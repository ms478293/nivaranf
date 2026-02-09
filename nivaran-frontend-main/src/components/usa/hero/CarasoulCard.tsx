"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type ImageCardType = {
  src: string;
  alt: string;
  name: string;
};

const imageCardData: ImageCardType[] = [
  { src: "/usa/1.png", alt: "card", name: "1" },
  { src: "/usa/2.png", alt: "card", name: "2" },
  { src: "/usa/3.png", alt: "card", name: "3" },
  { src: "/usa/4.png", alt: "card", name: "4" },
  { src: "/usa/5.png", alt: "card", name: "5" },
  { src: "/usa/6.png", alt: "card", name: "6" },
  { src: "/usa/7.png", alt: "card", name: "7" },
];

const ImageCard = ({
  src,
  alt,
  name,
  onClick,
}: ImageCardType & { onClick?: () => void }) => {
  return (
    <div
      className="relative h-[300px] lg:h-full w-full cursor-pointer rounded-lg border border-gray-300 shadow-lg p-2 hover:shadow-xl overflow-hidden"
      onClick={onClick}
    >
      <Image src={src} alt={alt} fill className="rounded-md object-cover" />
      <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-50 text-white text-sm px-2 py-1 rounded">
        {name}
      </div>
    </div>
  );
};

const CarouselCard = () => {
  const [selectedBox, setSelectedBox] = useState<ImageCardType | null>(null);
  const [isToolkitOpen, setIsToolkitOpen] = useState(false);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  // Handle Mouse Wheel Scrolling
  const handleWheelScroll = (event: React.WheelEvent) => {
    if (carouselContentRef.current) {
      event.preventDefault();
      carouselContentRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <div className="relative flex flex-col gap-6">
      <div className="hidden lg:block">
        <div className="text-3xl text-white my-4 flex justify-center">
          <span className="bg-indigo-300/45 py-2 px-4 w-fit rounded-lg">
            Latest At Nivaran
          </span>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full px-4"
          >
            <CarouselPrevious
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 z-10"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
            <CarouselNext
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 z-10"
              onClick={(e) => {
                e.preventDefault();
              }}
            />

            <CarouselContent
              ref={carouselContentRef}
              onWheel={handleWheelScroll}
              className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
            >
              {imageCardData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex-none basis-[200px] lg:basis-[300px]"
                >
                  <Card>
                    <CardContent className="p-4 h-[400px]">
                      <ImageCard
                        {...item}
                        onClick={() => {
                          setSelectedBox(item);
                          setIsToolkitOpen(true);
                        }}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className="text-3xl text-white my-4 flex justify-center">
          <span className="bg-indigo-300/45 py-2 px-4 w-fit rounded-lg">
            Latest At Nivaran
          </span>
        </div>
        <div className="flex flex-wrap gap-4 w-full h-fit">
          {imageCardData.map((item, index) => (
            <Link
              key={index}
              className="w-full max-w-[calc(50%-8px)] sm:max-w-[calc(33.33%-8px)]"
              href={`/images/${item.name}`}
            >
              <ImageCard {...item} onClick={() => {}} />
            </Link>
          ))}
        </div>
      </div>

      <Dialog
        open={isToolkitOpen && selectedBox !== null}
        onOpenChange={() => setIsToolkitOpen(false)}
      >
        <DialogContent className="w-full lg:w-[1000px] lg:min-w-fit">
          <DialogHeader>
            <DialogTitle>{selectedBox?.name}</DialogTitle>
          </DialogHeader>
          <div className="lg:h-[800px] lg:w-[600px]  w-full relative mx-auto">
            {selectedBox && (
              <Image
                fill
                src={selectedBox.src}
                alt={selectedBox.alt}
                className="rounded-md object-cover"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { CarouselCard };
