import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

type AppTitleVariants = VariantProps<typeof appTitleVariants>;

const appTitleVariants = cva("leading-[0.5rem] text-center", {
  variants: {
    variant: {
      primary: "text-4xl/10",
      secondary: "text-gray-800",
    },
    size: {
      large: "text-4xl/10 font-semibold",
      medium: "text-lg font-medium",
      small: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

interface AppTitleProps
  extends React.ComponentProps<"h1" | "h2" | "h3" | "h4">,
    AppTitleVariants {
  headingLevel?: "h1" | "h2" | "h3" | "h4";
  title: string;
}

const AppTitle = React.forwardRef<HTMLHeadElement, AppTitleProps>(
  ({ headingLevel = "h2", title, variant, size, className, ...props }, ref) => {
    const Heading = headingLevel;
    return (
      <Heading
        className={cn(appTitleVariants({ variant, size, className }))}
        ref={ref as never}
        {...props}
      >
        {title}
      </Heading>
    );
  }
);

AppTitle.displayName = "AppTitle";

export default AppTitle;
