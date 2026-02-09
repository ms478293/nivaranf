import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import { NotFound } from "@/components/new/NotFound/NotFound";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <NivaranHeader />

      <main className="w-full px-4  bg-neutral-50 font-Poppins py-20">
        <div className=" max-w-[1320px] mx-auto flex flex-col items-start gap-4 font-Poppins ">
          <div className="w-[20rem]">
            <Image
              src="/404.png"
              width={1000}
              height={1000}
              className="w-full h-full"
              alt="404 image"
            />
          </div>
          <NotFound />
        </div>

        <div className="w-[25rem]  absolute top-0 right-0">
          <Image
            src="/not-found-bg.png"
            width={1000}
            height={1000}
            className="w-full h-full"
            alt="404 image"
          />
        </div>
      </main>
      <NivaranFooter />
    </div>
  );
};

export default page;
