import { cn } from "@/lib/utils";

export const PageTitle = ({
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
        "flex flex-col text-xl md:text-3xl lg:text-4xl font-[300]",
        className
      )}
    >
      <span className="text-gray-950 leading-5 md:leading-[3rem] lg:leading-[4.6rem]">
        {prefix}
      </span>

      <span className="text-primary-500 font-[600] leading-[2.5rem]">
        {suffix}
      </span>
    </h1>
  );
};
