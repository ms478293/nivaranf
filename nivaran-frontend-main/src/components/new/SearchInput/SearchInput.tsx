"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import { cn } from "@/lib/utils";

interface SearchProps extends React.ComponentProps<"input"> {
  className?: string;
  iconStroke?: string;
}

export const InputSearch = ({
  className,
  iconStroke,
  ...props
}: SearchProps) => {
  return (
    <div className="relative  w-full">
      <input
        type="text"
        className={cn(
          "border border-gray-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 block focus:ring-blue-500 pr-12",
          className
        )}
        {...props}
      />
      <SearchIcon
        className={cn("w-5 h-5 stroke-secondary-600 absolute top-3 right-4")}
        stroke={iconStroke}
      />
    </div>
  );
};

export default InputSearch;
