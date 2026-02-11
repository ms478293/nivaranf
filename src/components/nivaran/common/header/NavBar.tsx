"use client";

import {
  aboutUsData,
  howToHelpData,
  newsAndStroiesData,
} from "@/content/site-data";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  // const pathname = usePathname();

  const renderDropdown = (data, title, basePath) => (
    <div className="relative group ">
      <button
        aria-label={`Drowpdown for ${title}`}
        className={
          "hover:text-primary-main text-base  flex items-center px-2 gap-1 py-2 rounded-lg"
        }
      >
        <span> {title}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      <div className="absolute left-0 top-full  hidden group-hover:block bg-white shadow-lg rounded-lg z-50 w-fit min-w-max">
        <ul className="p-2 space-y-2">
          {data.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div className="group relative">
                  <Link href={basePath}>
                    <div className="hover:text-primary-main font-bold flex items-center text-nowrap gap-2">
                      <span className="text-nowrap  text-sm">{item.title}</span>
                      <ChevronDownIcon className="w-3 h-3" />
                    </div>
                  </Link>
                  <ul className="">
                    {item.children.map((child) => (
                      <li key={child.title} className="mb-0.5 font-thin">
                        <Link href={child.href}>
                          <span className="hover:text-primary-main pl-2 text-sm text-nowrap ">
                            {child.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link href={item.href}>
                  <span className="hover:text-primary-main block text-sm -mb-1">
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="flex justify-end items-center ">
      {renderDropdown(howToHelpData, "How to Help", "/programs/")}
      {renderDropdown(aboutUsData, "About Us", "/about")}
      {renderDropdown(newsAndStroiesData, "News and Stories", "/blogs")}
    </nav>
  );
}
