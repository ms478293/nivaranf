import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  duration-200 font-Poppins",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white border border-transparent hover:border-primary-500 hover:bg-transparent",
        "primary-outline":
          "border border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-neutral-50",
        secondary:
          "bg-neutral-50 text-primary-500 hover:border-primary-500 border border-transparent hover:bg-transparent",
        ghost: "bg-transparent text-primary-500",

        // Secondary outline
        "secondary-outline":
          "border border-white hover:border-primary-500 text-white hover:bg-primary-500  ",
        tertiary: "bg-secondary-800 text-neutral-50",

        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        md: "h-9 px-8 py-4 text-[16px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-fit py-2 rounded-full  px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
AppButton.displayName = "AppButton";

export { AppButton, buttonVariants };
