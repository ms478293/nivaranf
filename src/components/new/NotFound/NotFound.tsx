"use client";

import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <h2 className="text-primary-500 font-[900] text-2xl flex flex-col ">
          <span className="">404</span>
          <span className="text-xl text-gray-950 font-[300]">
            Oops, You lost your way
          </span>
        </h2>
        <p className="text-sm text-gray-600">
          For inquiries regarding partnerships, media, or programs, please
          contact us
        </p>
      </div>

      <Link href="/">
        <AppButton
          className="px-10"
          variant="primary-outline"
          onClick={() => router.back()}
        >
          Go Back
        </AppButton>
      </Link>
    </>
  );
};
