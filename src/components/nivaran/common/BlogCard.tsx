"use client";

import EditIcon from "@/assets/icons/EditIcon";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { blogListType } from "@/blogs/listofblogs";
import { AppButton } from "@/components/ui/app-button";
import { getBlogPath } from "@/lib/blog-routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useContext } from "react";

// export const InsightsAndInspirationCards = ({
//   data,
//   showDescription = true,
// }: {
//   data: blogListType;
//   showDescription?: boolean;
// }) => {
//   return (
//     // ALternative if hover effect does not worrk
//     // <Link
//     //   href={`/blogs/${data.slug}`}
//     //   className="block rounded-2xl overflow-hidden    bg-white border border-neutral-200 [&>div>div>button]:hover:flex [&>div>div>.tags]:hover:bg-white [&>div>div>.tags]:hover:text-gray-800 [&>div>div>.tags]:transition-colors [&>div>div>.tags]:duration-[400ms] [&>div>.overlay]:hover:z-[25] [&>div>.overlay]:hover:block [&>div>.overlay]:transition-colors [&>div>.overlay]:duration-[400ms] flex-grow lg:flex-grow-0   snap-center hover:shadow-xl transition-all duration-300 "
//     //   title={data.title}
//     // >
//     <Link
//       href={`/blogs/${data.slug}`}
//       className="group block rounded-2xl overflow-hidden max-sm:max-w-[345px] max-sm:min-w-[345px] max-sm:w-[345px]  snap-center  bg-white border border-neutral-200 hover:shadow-xl transition-all duration-300 "
//     >
//       <div className=" relative w-full h-[340px]">
//         <div className=" w-full h-full overlay absolute hidden bg-black/60 group-hover:z-[25] group-hover:block transition-colors duration-300"></div>
//         <Image
//           className="w-full h-full object-cover object-center"
//           src={data.thumbnailImage}
//           alt={data.title}
//           width={1000}
//           height={1000}
//         />

//         <div className="absolute w-full h-[80px] bg-[linear-gradient(to_bottom,_transparent_10%_,#000)] left-0 bottom-0"></div>
//         <div className="flex flex-col p-4 w-full justify-between h-full absolute bottom-0 text-gray-200 z-[30]">
//           <p className="bg-primary-200 text-primary-500 px-3 py-0.5 w-fit rounded-full text-xsm  font-normal group-hover:bg-white group-hover:text-gray-800 transition-colors duration-300 tags">
//             {data.type}
//           </p>

//           <AppButton
//             variant="secondary"
//             className="  p-12 rounded-full mx-auto h-12 w-12 button-rotate-animation hidden hover:bg-white hover:border-transparent group-hover:flex"
//           >
//             <p className=" flex-col flex items-center justify-center gap-1">
//               <MoveUpRightArrowIcon className="w-6 h-6 fill-primary-500 -mb-1" />
//               <span className="font-light">Check it out</span>
//             </p>
//           </AppButton>

//           <div className="flex justify-between items-center text-sm">
//             <p className="flex items-center gap-2 ">
//               <EditIcon className="w-4 h-4 stroke-gray-100" />
//               <span className="text-sm  max-w-[160px] truncate">
//                 {data.author}
//               </span>
//             </p>
//             <p>{data.date}</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-medium text-lg/[30px] text-gray-800 ">
//           {data.title.substring(0, 30)}...
//         </h3>
//         {showDescription ? (
//           <p className="text-gray-400 text-sm ">
//             {data.summary.substring(0, 75)}...
//           </p>
//         ) : null}
//       </div>
//     </Link>
//   );
// };

interface BlogCardType extends Omit<React.ComponentProps<"a">, "ref"> {
  data: blogListType;
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLAnchorElement>;
}
const BlogCardContext = createContext<BlogCardType | null>(null);

const BlogCard = ({
  children,
  data,
  className,
  ref,
  ...props
}: BlogCardType) => {
  return (
    <BlogCardContext.Provider value={{ data, children }}>
      <Link
        href={getBlogPath(data)}
        className={cn(
          "group block rounded-2xl overflow-hidden  bg-white border border-neutral-200 hover:shadow-xl transition-all duration-300 ",
          className
        )}
        ref={ref}
        {...props}
        title={data.title}
      >
        {children}
      </Link>
    </BlogCardContext.Provider>
  );
};

const Thumbnail = ({
  showAuthor = true,
  className,
  showButton = true,
  overlayStyle,
  showTags = true,
  showDate = true,
}: {
  showAuthor?: boolean;
  className?: string;
  showButton?: boolean;
  overlayStyle?: boolean;
  showTags?: boolean;
  showDate?: boolean;
}) => {
  const { data } = useBlogCard();
  return (
    <div className={cn(" relative w-full ", className)}>
      <div
        className={cn(
          " w-full h-full overlay absolute hidden bg-black/60 group-hover:z-[25] group-hover:block transition-colors duration-300 overflow-hidden",
          overlayStyle ? "bg-black/20" : ""
        )}
      ></div>
      <Image
        className="w-full h-full object-cover object-center"
        src={data.thumbnailImage}
        alt={data.title}
        width={1000}
        height={1000}
      />

      <div className="absolute w-full h-full  bg-[linear-gradient(to_bottom,_#000000d0_0%,_transparent_40%,_#000000bf_100%)] left-0 bottom-0"></div>
      <div className="flex flex-col p-4 w-full justify-between h-full absolute bottom-0 text-gray-200 z-[25]">
        <div className="flex justify-between">
          {showTags ? (
            <p className="bg-primary-200 text-primary-500 px-3 py-0.5 w-fit rounded-full text-xsm  font-normal group-hover:bg-white group-hover:text-gray-800 transition-colors duration-300 tags relative z-[25]">
              {data.type}
            </p>
          ) : null}

          {showDate ? <p className="text-sm">{data.date}</p> : false}
        </div>
        {showButton ? (
          <AppButton
            variant="secondary"
            className="  p-12 rounded-full mx-auto h-12 w-12 button-rotate-animation hidden hover:bg-white hover:border-transparent group-hover:flex"
          >
            <p className=" flex-col flex items-center justify-center gap-1">
              <MoveUpRightArrowIcon className="w-6 h-6 fill-primary-500 -mb-1" />
              <span className="font-light text-sm">Check it out</span>
            </p>
          </AppButton>
        ) : null}

        {showAuthor ? (
          <div className="flex justify-between items-center text-sm">
            <p className="flex items-center gap-2 ">
              <EditIcon className="w-4 h-4 stroke-gray-100" />
              <span className="text-sm">{data.author}</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TitleAndDescription = ({
  showDescription = true,
  className,
  children,
  alignDateAndAuthor,
}: {
  showDescription?: boolean;
  className?: string;
  children?: React.ReactNode;
  alignDateAndAuthor?: boolean;
}) => {
  const { data } = useBlogCard();
  return (
    <div className={cn("", className)}>
      <h3 className="font-medium  text-gray-800 line-clamp-2 text-[18px]">
        {data.title.substring(0, 40)}...
        {/* {data.title} */}
      </h3>
      {alignDateAndAuthor ? (
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-gray-600 my-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
            {data.author}
          </p>
          <p className="text-sm  flex text-gray-600 my-2">{data.date}</p>
        </div>
      ) : null}
      {showDescription ? (
        <p className="text-gray-400 text-sm/[20px] line-clamp-2 ">
          {data.summary.substring(0, 100)}...
        </p>
      ) : null}
      {children}
    </div>
  );
};

// BlogCard.Item = Item;
BlogCard.Image = Thumbnail;
BlogCard.TitleAndDescription = TitleAndDescription;

const useBlogCard = () => {
  const context = useContext(BlogCardContext);
  if (!context) {
    throw new Error("useBlogCard must be used within a BlogCard provider");
  }

  return context;
};

export default BlogCard;
