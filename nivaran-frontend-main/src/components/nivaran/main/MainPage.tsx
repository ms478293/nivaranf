"use client";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import { BlogListComponent } from "@/components/nivaran/common/BlogListComponent";
import HeroSection from "@/components/nivaran/main/Hero";
import Stats from "@/components/nivaran/main/Stats";
import { DialogOpener } from "@/components/nivaran/main/utils/DialogOpener";
import { LoadingScreen } from "@/components/nivaran/main/utils/LoadingScreen";
import { SetCookie } from "@/components/nivaran/main/utils/SetCookie";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomHeading } from "../common/CustomHeading";
import Header from "../common/header/Header";
import { UpcomingProjects } from "../programs/UpcomingProjects";
import { DownloadFileComponent } from "../sanjeevani/common/DownloadFileComponent";
import CarouselComponent from "./carousel/HeroCarousel";
import EyeShapeCardList from "./EyeShapedCardList";
import HelpLayout from "./helpLayout/HelpLayoutComponent";

export const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [isToolkitOpen, setIsToolkitOpen] = useState(false);

  useEffect(() => {
    const alreadyLoaded = Cookies.get("pageLoaded") === "true";
    if (!alreadyLoaded) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        Cookies.set("pageLoaded", "true", { expires: 1 }); // Set cookie for 1 day
        setIsToolkitOpen(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setIsToolkitOpen(true);
    }
    if (alreadyLoaded) {
      setLoading(false);
      setIsToolkitOpen(false);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <DialogOpener
        isToolkitOpen={isToolkitOpen}
        setIsToolkitOpen={setIsToolkitOpen}
      />
      <SetCookie />
      <main className="flex flex-col relative">
        <div className="w-full px-4">
          <Header />
        </div>
        <div className="w-full h-full  flex justify-center overflow-hidden  px-4">
          <CarouselComponent />
          <div className="lg:hidden block ">
            <DownloadFileComponent />
          </div>
        </div>
        <div className="border border-white bg-gray-50  py-6 shadow w-full px-4 ">
          <HeroSection />
        </div>
        <div className="w-full px-4">
          <EyeShapeCardList />
        </div>

        <div className="flex flex-col w-full  px-4  bg-red-300">
          {/* <SvgComponent /> */}
          {/* </div> */}
        </div>

        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4  mt-4">
          <Stats />
        </div>
        <div className="flex flex-col justify-center w-full my-4 px-4">
          <div className=" max-w-[1140px] mx-auto px-4 flex flex-col">
            <CustomHeading className="lg:!ml-0">News And Stories</CustomHeading>
            <BlogListComponent onlyFeatured />
            <Link
              href="/blogs"
              className="text-lg hover:bg-secondary-main hover:text-white transition-colors duration-200 border border-gray-400 px-2 py-1 rounded-md self-end mt-4 "
            >
              Explore More
            </Link>
          </div>
          {/* <div className="flex w-full justify-end pr-4 my-4">
            
          </div> */}
        </div>

        <HelpLayout />

        <div className="w-full px-4">
          <UpcomingProjects />
        </div>
        <NivaranFooter />
      </main>
    </div>
  );
};
