"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { DialogOpenerUsa } from "./DialogOpenerUsa";

export function NavBarUsa() {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = () => {
    router.push("https://www.nivaranfoundation.org/donate");
  };

  return (
    <NavigationMenu className="">
      <NavigationMenuList className="flex flex-col gap-4 lg:flex-row items-start lg:items-center min-w-max w-full ">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === "/" ? "bg-accent" : "",
                "hover:text-primary-main text-xl"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full min-w-max">
          <NavigationMenuTrigger
            className={cn(
              navigationMenuTriggerStyle(),
              ["/about", "/volunteer", "/contact"].includes(pathname)
                ? "bg-accent"
                : "",
              "hover:text-primary-main text-xl"
            )}
          >
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full min-w-max">
            <ul className="grid grid-cols-1 w-full gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink className="hover:text-primary-main" asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-bl from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md max-w-52"
                    href="https://www.nivaranfoundation.org/about"
                  >
                    <Image
                      src="/NivaranLogo.svg"
                      height={107}
                      width={213}
                      alt="Nivaran Logo"
                      className="backdrop-hue-rotate-60"
                    />
                    <div
                      className={cn(
                        "mb-2 mt-4 text-lg font-medium max-w-52",
                        pathname === "/about" ? "bg-red" : ""
                      )}
                    >
                      What We Do
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover the impact we&apso;re making across the globe.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                className={cn(
                  pathname === "/volunteer" ? "bg-accent" : "",
                  "hover:text-primary-main"
                )}
                href="https://www.nivaranfoundation.org/volunteer"
                title="Join Us"
              >
                Want to Volunteer? Here’s How You Can Help.
              </ListItem>
              <ListItem
                className={cn(
                  pathname === "https://www.nivaranfoundation.org/contact"
                    ? "bg-accent"
                    : "",
                  "hover:text-primary-main"
                )}
                href="/contact"
                title="Get in Touch"
              >
                Need Assistance? Let&apos;s Connect.
              </ListItem>
              <ListItem
                className="hover:text-primary-main"
                title="Donate"
                onClick={handleClick}
              >
                No Time to Volunteer? You Can Still Make a Difference.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <div className="hover:text-primary-main w-fit">
            <div
              className={cn(
                pathname === "/live" ? "bg-accent " : "",
                "hover:text-primary-main text-xl overflow-visible w-fit text-nowrap px-2 py-1 rounded-lg"
              )}
            >
              <DialogOpenerUsa></DialogOpenerUsa>
            </div>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuItem>
        <Link
          href="/blogs"
          className="hover:text-primary-main"
          legacyBehavior
          passHref
        >
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              pathname.includes("/blogs/") || pathname === "/blogs"
                ? "bg-accent "
                : "",
              "hover:text-primary-main text-xl"
            )}
          >
            Blogs
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none  rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-wrap max-w-52 lg:max-w-72">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
