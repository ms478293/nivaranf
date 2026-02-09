import { cn } from "@/lib/utils";

const MainTitle = ({
  suffix,
  prefix,
  className,
}: {
  suffix: string;
  prefix: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "flex flex-wrap gap-x-3 items-center font-Oswald text-xl/10 sm:text-2xl/10 md:text-[40px]/10   border-l-4   border-primary-500 px-2  sm:h-10 mb-2",
        className
      )}
    >
      <span className="  font-thin  text-gray-800 block  leading-8">
        {suffix}
      </span>
      <span className="font-medium text-primary-500 leading-8">{prefix}</span>
    </h1>
  );
};

export default MainTitle;
