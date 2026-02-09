"use client";
import { AppButton } from "@/components/ui/app-button";
import { useUrlQuery } from "@/hooks/useURLQuery";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const DONATION_BLOCK_DATA = [
  {
    id: 1,
    image: "/stories_and_insights-1.png",
    title: "Be the Reason of Happiness",
    description:
      "Spreading joy through every act of kindness. Your gift can make a significant difference",
    query: "one-time",
    buttonLabel: "Give a gift",
    alt: "Spread joy through kindness and donate to make a meaningful impact",
  },
  {
    id: 2,
    image: "/stories_and_insights-2.png",
    title: "Become a Monthly Donor",
    description:
      "No one has ever become poor by giving. Your contribution can make a meaningful impact",
    query: "recurring",
    buttonLabel: "Spread happiness",
    alt: "Donate to support a cause and make a difference",
  },
];

const DonationBlock = ({ className }: { className?: string }) => {
  const { createQueryString } = useUrlQuery();
  return (
    <section
      className={cn("w-full pb-12 bg-white font-Poppins px-4", className)}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-start gap-4 md:py-0 py-8">
        {DONATION_BLOCK_DATA.map((image) => (
          <div
            className="w-full h-full overflow-hidden relative rounded-2xl"
            key={image.id}
          >
            <Image
              width={1000}
              height={1000}
              alt={image.alt}
              src={image.image}
              className="block w-full h-full object-cover object-center"
            />

            <div className="flex absolute bottom-0 z-10 flex-col gap-3 items-start p-5 w-full">
              <h3 className="text-neutral-50 font-medium text-lg sm:text-xl/[28px] md:text-2xl/[40px] w-[300px] leading-10 ">
                {image.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-primary-500">
                  {image.title.split(" ").slice(-1)}
                </span>
              </h3>
              <div className="flex flex-col gap-3 sm:flex-row  items-start sm:items-end  sm:w-full sm:justify-between">
                <p className="text-neutral-50 text-sm max-w-[350px]">
                  {image.description}
                </p>
                <Link
                  href={`/donate?${createQueryString(
                    "donate-query",
                    image.query
                  )}`}
                >
                  <AppButton variant="primary" className="font-light">
                    {image.buttonLabel}
                  </AppButton>
                </Link>
              </div>
            </div>
            <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,_transparent_10%_,black)] left-0 bottom-0"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationBlock;
