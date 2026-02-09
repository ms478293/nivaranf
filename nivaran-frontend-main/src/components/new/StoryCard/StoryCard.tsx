"use client";

import Image from "next/image";

type StoryCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
};

const StoryCard: React.FC<StoryCardProps> = ({
  imageSrc,
  title,
  description,
  date,
}) => {
  return (
    <div className="relative max-w-[345px] min-w-[345px]  snap-center  ">
      {/* Fixed width */}
      <div className="flex  absolute justify-start  ">
        <StoryCardTag type="primary" date={date} />
        <StoryCardTag type="secondary" date={date} />
      </div>
      <div className="rounded-2xl  overflow-hidden w-full p-4 h-full relative top-10 z-[5] ">
        <h3 className="text-secondary-800 font-semibold text-sm my-2">
          {title}
        </h3>

        {/* Image Section */}
        <div className="flex flex-col p-2 gap-2 border border-secondary-200 shadow-md shadow-secondary-200/30 rounded-lg bg-neutral-50">
          <div className="relative w-full h-52 overflow-hidden  rounded-md">
            <Image
              src={imageSrc}
              alt={title}
              width={800}
              height={800}
              objectFit="cover"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const StoryCardTag = ({
  type = "primary",
  date,
}: {
  type: "primary" | "secondary";
  date?: string;
}) => {
  const variant = {
    primary: "bg-primary-100 text-primary-500",
    secondary: "bg-gray-50 text-transparent  ",
  };

  return (
    <div className="h-[32rem] w-[10rem] flex justify-center ">
      <div
        className={`border-r border-dotted h-full w-2 ${
          type === "primary"
            ? "border-r border-dotted "
            : "border-r border-dotted "
        }`}
      ></div>
      <p
        className={`px-4 py-1  w-fit rounded-full text-sm font-light absolute top-0 flex  ${variant[type]}`}
      >
        {date}
      </p>
    </div>
  );
};

export default StoryCard;
