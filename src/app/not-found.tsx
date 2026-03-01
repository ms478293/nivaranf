import { NotFound } from "@/components/new/NotFound/NotFound";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page Not Found | Nivaran Foundation",
  description: "The page you are looking for could not be found. Return to the Nivaran Foundation homepage.",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <div className="relative">
      <main className="w-full px-4 bg-neutral-50 font-Poppins py-20">
        <div className="max-w-[1320px] mx-auto flex flex-col items-start gap-4 font-Poppins">
          <div className="w-[20rem]">
            <Image
              src="/404.png"
              width={320}
              height={320}
              className="w-full h-auto"
              alt="Page not found illustration"
              priority
            />
          </div>
          <NotFound />
        </div>

        <div className="w-[25rem] absolute top-0 right-0 hidden md:block" aria-hidden="true">
          <Image
            src="/not-found-bg.png"
            width={400}
            height={400}
            className="w-full h-auto"
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
