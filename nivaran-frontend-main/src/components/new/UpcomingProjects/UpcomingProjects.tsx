import { FolderIcon } from "@/assets/icons/FolderIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { UpcomingProjectsDataType } from "@/content/upcoming-projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UpcomingProjects = ({
  className,
  children,
  data,
}: {
  className?: string;
  children?: React.ReactNode;
  data: UpcomingProjectsDataType[];
}) => {
  return (
    <section
      className={cn("w-full  font-Poppins", className)}
      id="upcoming-projects"
    >
      <div className="max-w-[1320px] mx-auto gap-4 py-4 md:py-16">
        {/* <MainTitle
          suffix="Upcoming"
          prefix="Projects"
          className="-mb-4 md:mb-0"
        /> */}
        {children}
        <ul className="flex flex-col md:grid md:grid-cols-2 min-[880px]:gap-8 lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:justify-start gap-8 mt-8">
          <RenderList
            data={data}
            render={(data) => (
              <UpcomingProjectsCard
                data={data}
                className="w-[21rem] h-[13rem] min-[880px]:w-[25.5rem] min-[880px]:h-[17rem]"
              >
                <div className="bg-[#FFCD33] min-[880px]:w-[25rem] min-[880px]:h-64 w-[20.5rem] h-[12.2rem] rounded-lg "></div>
                <FolderIcon
                  width={"700"}
                  height={"700"}
                  className=" absolute w-full h-full -top-3 -left-2 group-hover:skew-x-6 group-hover:-translate-x-3 group-hover:scale-y-[0.95] group-hover:-top-2 group-hover:-left-2 transition-all duration-300"
                />
              </UpcomingProjectsCard>
            )}
          />
        </ul>
      </div>
    </section>
  );
};

export const UpcomingProjectsCard = ({
  data,
  className,
  children,
}: {
  data: UpcomingProjectsDataType;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <li
      key={data.id}
      // className={cn(
      //   "block relative w-[320px] h-[180px] min min-[880px]:h-[240px] min-[880px]:w-[400px]  sm:[&>.hover-effect~svg]:hover:skew-x-[3deg] [&>.hover-effect~svg]:hover:skew-x-[5deg] sm:[&>.hover-effect~svg]:hover:-translate-x-2 [&>.hover-effect~svg]:hover:-translate-x-2.5 [&>.hover-effect~svg]:hover:-translate-y-[4px] sm:[&>.hover-effect~svg]:hover:-translate-y-[2px]  [&>.hover-effect~svg]:hover:scale-y-100    [&>.hover-effect~svg]:hover:top-2 [&>.hover-effect~svg]:transition-all [&>.hover-effect~svg]:duration-200",
      //   className
      // )}
      className={cn("relative group ", className)}
    >
      {children}
      <div className="absolute z-[15] -top-8 min-[880px]:-top-2 w-full py-[3.5rem] sm:py-12 px-6 flex flex-col justify-between gap-5 md:gap-4">
        {/* <div className="grid grid-cols-2 w-full gap-y-2 h-full"> */}
        <div className="flex justify-between items-start">
          <div className="w-28 max-h-16 md:h-20 cols-start-1 cols-end-2 rounded-md overflow-hidden">
            <Image
              src={data.images}
              alt={data.title}
              width={500}
              height={500}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <Link
            href={data.link}
            className="cols-start-2 -col-end-1 justify-self-end self-center text-white"
          >
            <AppButton
              variant="ghost"
              size="md"
              className="px-4 py-2 md:px-4  min-[880px]:text-md flex items-center justify-center leading-6    text-white bg-primary-500  hover:text-primary-500 hover:bg-transparent border border-transparent hover:border-primary-500 "
            >
              Open Folder
            </AppButton>
          </Link>
        </div>

        <div className="flex  items-center  gap-8  ">
          <h2 className="flex flex-col justify-center gap-1.5 justify-self-start self-start min-w-32">
            <span className="text-gray-800 text-xsm/[12px] min-[880px]:text-sm/[20px] font-medium">
              Project
            </span>
            <span className="text-gray-900 font-semibold text-xl uppercase">
              {data.title}
            </span>
          </h2>
          <p className="flex flex-col justify-center gap-1.5 -translate-y-2 min-[880px]:translate-y-0 ">
            <span className="text-gray-800 text-xsm/[12px] min-[880px]:text-sm/[20px] font-medium">
              Vision
            </span>
            <span className="text-gray-700 text-xsm/[15px] min-[880px]:text-sm/[20px]   font-normal ">
              {data.description}
            </span>
          </p>
        </div>
        {/* </div> */}
      </div>
    </li>
  );
};

export default UpcomingProjects;
