"use client";

import { blogTypes } from "@/content/blogTypes";

export const CategoryFilterTag = ({
  tag,
  onActiveCategoryTag,
  activeCategoryTag,
}: {
  tag: string;
  onActiveCategoryTag: (cat: string) => void;
  activeCategoryTag: (typeof blogTypes)[number] | "All";
}) => {
  return (
    <button
      aria-label={`Tags ${tag}`}
      className={`rounded-3xl py-1.5 px-4 text-gray-600 bg-gray-100 text-sm ${
        tag === activeCategoryTag ? "bg-red-200 text-primary-500" : ""
      }`}
      onClick={() => onActiveCategoryTag(tag)}
    >
      {tag}
    </button>
  );
};

// export const CategoryFilterTag = ({
//   activeCategoryTag,
//   setActiveCategoryTag,
// }: {
//   activeCategoryTag: (typeof blogTypes)[number] | "All";
//   setActiveCategoryTag: React.Dispatch<
//     SetStateAction<(typeof blogTypes)[number] | "All">
//   >;
// }) => {
//   const filteredBlogType = globalBlogs.filter(
//     (blog) => blog.type === activeCategoryTag
//   );

//   const handleActiveCategoryTag = (category: (typeof blogTypes)[number]) => {
//     setActiveCategoryTag((cat) => (cat === category ? "All" : category));
//   };

//   return (
//     <Tabs
//       defaultValue="All"
//       className=" w-fit rounded-xl border border-gray-200 p-3"
//     >
//       {blogTypes.map((type) => (
//         <>
//           <TabsList className="flex justify-start h-fit w-fit gap-2 rounded-full bg-secondary-600 p-1.5">
//             <TabsTrigger
//               key={type}
//               value={type}
//               className={`rounded-3xl py-1.5 px-4 text-gray-600 bg-gray-100 text-sm ${
//                 type === activeCategoryTag ? "bg-red-200 text-primary-500" : ""
//               }`}
//               onClick={() => handleActiveCategoryTag(type)}
//             >
//               {type}
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value={type} className="flex flex-col gap-3">
//             <RenderList
//               data={filteredBlogType}
//               render={(data) => (
//                 <BlogCard
//                   data={data}
//                   key={data.slug}
//                   className="max-sm:max-w-full max-sm:min-w-[345px] max-sm:w-full shadow-sm "
//                 >
//                   <BlogCard.Image className="h-[340px]" />
//                   <BlogCard.TitleAndDescription className="text-lg/[30px] p-4" />
//                 </BlogCard>
//               )}
//             />
//           </TabsContent>
//         </>
//       ))}
//     </Tabs>
//   );
// };
