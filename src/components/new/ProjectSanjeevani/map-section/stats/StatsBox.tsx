import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const statBoxVariants = cva(
  "flex flex-col justify-between items-start py-1.5 px-2 rounded-md ",
  {
    variants: {
      variant: {
        outline:
          "border-gray-200 border gap-4 md:gap-6   [&>span:nth-child(1)]:font-bold md:[&>span:nth-child(1)]:text-md text-[12px] text-gray-500 ",
        default:
          "gap-5 bg-secondary-100  [&>span:nth-child(1)]:font-semibold  [&>span:nth-child(1)]:font-semibold [&>span:nth-child(1)]:text-[18px] text-xsm/10 text-secondary-800",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatsBoxProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof statBoxVariants> {
  totalStats: number | string;
  label: string;
}

const StatsBox = ({ variant, totalStats, label, ...props }: StatsBoxProps) => {
  const { className, ...statsProps } = props;
  return (
    <p className={cn(statBoxVariants({ variant }), className)} {...statsProps}>
      <span className="md:text-nowrap block">{totalStats}</span>
      <span>{label}</span>
    </p>
  );
};

export default StatsBox;
