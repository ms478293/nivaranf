import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const indexTagVariants = cva(
  " lg:py-1.5 px-4 py-1  text-[12px] lg:text-md text-white rounded-md  text-center",
  {
    variants: {
      variant: {
        Planned: " bg-forest-300 ",
        Completed: "bg-forest-900 ",
        Ongoing: "bg-forest-600",
      },
    },

    defaultVariants: {
      variant: "Planned",
    },
  }
);

interface IndexTagProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indexTagVariants> {
  label: string;
}

export const IndexTag = ({ label, variant, ...props }: IndexTagProps) => {
  const { className, ...indexTagProps } = props;
  return (
    <div
      className={cn(indexTagVariants({ variant }), className)}
      {...indexTagProps}
    >
      {label}
    </div>
  );
};
