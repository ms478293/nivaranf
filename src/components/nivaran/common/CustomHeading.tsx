import { cn } from "@/lib/utils";

export const CustomHeading = ({
  children,
  className,
  as = "h2",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}>) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "flex justify-start lg:text-7xl my-8 text-3xl font-serif text-left  text-primary-main gap-4 ml-0 lg:ml-6",
        className
      )}
    >
      <span className="w-[6px] min-h-full bg-yellow-300    leading-tight"></span>
      {children}
    </Tag>
  );
};
