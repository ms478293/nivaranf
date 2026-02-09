import { SOCIAL_LINKS } from "@/content/social-links";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

const socialVariants = cva(
  "rounded-full [&>svg]:duration-300 transition-colors [&>svg]:transition-colors duration-300 p-3 border-[1.5px]",
  {
    variants: {
      variant: {
        primary:
          " border-primary-main/20  [&>svg]:hover:fill-primary-main hover:border-primary-main  [&>svg]:fill-primary-main",
        secondary:
          "border-gray-200/80 [&>svg]:fill-gray-200/80 hover:border-gray-200 [&>svg]:hover:fill-primary-500 hover:bg-white",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  }
);

interface SocialLinksProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof socialVariants> {}

export const SocialLinks = ({ variant }: SocialLinksProps) => {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((social) => (
        <Link
          href={social.link}
          className={cn(socialVariants({ variant }))}
          key={social.link}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};
