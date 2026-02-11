import { globalBlogs } from "@/blogs/listofblogs";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";

export const FilteredBlogsList = ({ blogs }: { blogs: typeof globalBlogs }) => {
  return (
    <div className="grid-cols-1 sm:grid  flex flex-col sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      <RenderList
        data={blogs}
        render={(data) => (
          <BlogCard data={data} key={data.slug} className=" shadow-sm ">
            <BlogCard.Image className="h-[340px]" />
            <BlogCard.TitleAndDescription className="text-lg/[30px] p-4" />
          </BlogCard>
        )}
      />
    </div>
  );
};
