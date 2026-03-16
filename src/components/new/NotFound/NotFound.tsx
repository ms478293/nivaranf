"use client";

import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";

export const NotFound = () => {
  return (
    <>
      <div>
        <h1 className="text-primary-500 font-[900] text-2xl flex flex-col ">
          <span>404</span>
          <span className="text-xl text-gray-950 font-[300]">
            Oops, You lost your way
          </span>
        </h1>
        <p className="text-sm text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <Link href="/">
          <AppButton className="px-10" variant="primary-outline">
            Go Home
          </AppButton>
        </Link>
        <Link href="/contact-us">
          <AppButton className="px-10" variant="primary-outline">
            Contact Us
          </AppButton>
        </Link>
      </div>
    </>
  );
};
