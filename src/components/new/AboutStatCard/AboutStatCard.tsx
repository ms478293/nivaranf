import { cn } from "@/lib/utils";
import Image from "next/image";
import { createContext } from "react";

const AboutStatCardContext = createContext(null);

const AboutStatsCard = ({
  children,
  data,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  data: {
    id: number;
    stats: number | string | React.ReactNode;
    description: string;
    image: string;
    alt?: string;
  };
}) => {
  return (
    <AboutStatCardContext.Provider value={{ data }}>
      <li
        className={cn(
          "w-full h-[500px] relative border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] list-none",
          className
        )}
      >
        <Image
          width={500}
          height={500}
          alt={data.description || data?.alt}
          src={data.image}
          className="h-full w-full block object-cover object-center"
        />

        {children}
      </li>
    </AboutStatCardContext.Provider>
  );
};

const Stats = ({
  className,
  stats,
}: {
  className?: string;
  stats?: string | number | React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "text-primary-400 text-[36px]/[36px] font-bold ",
        className
      )}
    >
      {stats}
    </span>
    // {/* </p> */}
    // <p className="absolute bottom-0 p-4 flex flex-col font-Poppins">
  );
};

const Description = ({
  className,
  description,
}: {
  className?: string;
  description: string;
}) => {
  return (
    <span className={cn("text-sm  text-gray-600", className)}>
      {description}
    </span>
  );
};
// const useAboutStatCard = () => {
//   const context = useContext(AboutStatCardContext);
//   if (!context) {
//     throw new Error("useBlogCard must be used within a BlogCard provider");
//   }

//   return context;
// };

const Overlay = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        " w-full h-full bg-[linear-gradient(to_bottom,_transparent_0%_,transparent_60%_,white_80%)] absolute z-[10] bottom-0",
        className
      )}
    >
      {children}
    </div>
  );
};

AboutStatsCard.Stats = Stats;
AboutStatsCard.Description = Description;
AboutStatsCard.Overlay = Overlay;

export default AboutStatsCard;

// const AboutStatCard = () => {
//   return <div>AboutStatCard</div>;
// };
