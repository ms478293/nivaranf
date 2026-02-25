"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const DialogOpener = ({ isToolkitOpen, setIsToolkitOpen }) => {
  const screenSize = useScreenSize();
  const router = useRouter();

  return (
    <Dialog
      open={isToolkitOpen && screenSize === "lg"}
      onOpenChange={() => setIsToolkitOpen(!isToolkitOpen)}
    >
      <DialogContent className=" fixed z-50 max-w-screen-lg max-h-fit   flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden  w-full h-full">
          <DialogHeader>
            <DialogTitle className="hidden text-lg font-bold"></DialogTitle>
          </DialogHeader>
          <Image
            src="/loading/1.jpg"
            alt="Loading Image"
            height={800}
            width={600}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bottom-4 right-4 flex gap-4  absolute bg-black/50">
          <div className=" text-center align-middle flex items-center text-lg text-white">
            Quick Links
          </div>
          <Button
            onClick={() => router.push("/blogs")}
            variant="ghost"
            className=" bg-white text-primary-main px-6 py-3 font-bold  shadow-lg hover:bg-secondary-main hover:scale-105 transition-all duration-300 ease-in-out rounded-none my-[1px]"
          >
            News and Stories
          </Button>

          <Button
            onClick={() => router.push("/volunteer")}
            variant="ghost"
            className=" bg-white text-primary-main px-6 py-3 font-bold  shadow-lg hover:bg-secondary-main hover:scale-105 transition-all duration-300 ease-in-out rounded-none my-[1px]"
          >
            Volunteer
          </Button>
          <Button
            onClick={() => router.push("/donate")}
            variant="ghost"
            className=" bg-white text-primary-main px-6 py-3 font-bold  shadow-lg hover:bg-secondary-main hover:scale-105 transition-all duration-300 ease-in-out rounded-none my-[1px]"
          >
            Donate
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/contact")}
            className="bg-white px-6 py-3 rounded-none shadow-lg hover:bg-secondary-main hover:scale-105 transition-all duration-300 ease-in-out my-[1px] mr-[1px] rounded-br-lg"
          >
            Contact
          </Button>
        </div>
        <div className="absolute top-4 left-4 flex  justify-end bg-black/40">
          <Button
            variant="link"
            onClick={() => router.push("/sanjeevani")}
            className="text-white text-xl bg-primary-main rounded-none "
          >
            Project Sanjeevani
          </Button>
        </div>

        <div
          className="absolute  px-6 py-2  bg-primary-main/80  hover:bg-primary-main rounded-full text-white hover:cursor-pointer hover:scale-125 transition-transform duration-300"
          onClick={() => {
            router.push("/contact");
          }}
        >
          Need Help?
        </div>
      </DialogContent>
    </Dialog>
  );
};
