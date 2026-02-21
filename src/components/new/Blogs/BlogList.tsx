"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { blogTypes } from "@/content/blogTypes";
import { useBlogFeed } from "@/lib/content/useBlogFeed";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import { useState } from "react";
import MainTitle from "../MainTitle/MainTitle";
import InputSearch from "../SearchInput/SearchInput";
import { CategoryFilterTag } from "./CategoryFilterTag";
import { FilteredBlogsList } from "./FilteredBlogList";
import { LatestBlogs } from "./LatestBlogs";

export const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryTag, setActiveCategoryTag] = useState<
    (typeof blogTypes)[number] | "All"
  >("All");
  const allBlogs = useBlogFeed(500);
  const trendingBlogs = useTrendingBlogs(4);

  // const filteredBlogType = globalBlogs.filter(
  //   (blog) => blog.type === activeCategoryTag
  // );

  // **Filtering blogs based on search & category**
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory =
      activeCategoryTag === "All" || blog.type === activeCategoryTag;
    // const matchesFeatured = onlyFeatured ? blog.featured : true;
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleActiveCategoryTag = (category: (typeof blogTypes)[number]) => {
    setActiveCategoryTag((cat) => (cat === category ? "All" : category));
  };

  return (
    <>
      <section className="sticky top-14  z-[30] bg-neutral-50 py-2">
        <div className="flex items-center gap-4 overflow-x-auto w-full flex-wrap py-3">
          <RenderList
            data={blogTypes}
            render={(category) => (
              <CategoryFilterTag
                tag={category}
                key={category}
                onActiveCategoryTag={handleActiveCategoryTag}
                activeCategoryTag={activeCategoryTag}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-2 ">
          {/* <div className="flex-[1]">
        <Select
          value={categories}
          onValueChange={(value) => setCategories(value)}
        >
          <SelectTrigger className="bg-gray-50 border-none">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50 ">
            <SelectGroup>
              {blogTypes.map((type) => (
                <SelectItem
                  value={type}
                  key={type}
                  className="font-Poppins"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

          <InputSearch
            iconStroke="#454545"
            className="flex-[2]"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Blogs..."
          />
        </div>
      </section>

      {searchQuery !== "" ? (
        filteredBlogs.length === 0 ? (
          <p>No result found</p>
        ) : (
          <FilteredBlogsList blogs={filteredBlogs} />
        )
      ) : (
        <section className="mt-10">
          {activeCategoryTag === "All" ? (
            <>
              <section className="">
                <MainTitle prefix="Blogs" suffix="Latest" className="mb-6" />
                <LatestBlogs blogs={allBlogs} />
              </section>

              <section className="mt-10">
                <MainTitle prefix="Blogs" suffix="Trending" className="mb-6" />
                <FilteredBlogsList blogs={trendingBlogs} />
              </section>
            </>
          ) : (
            <FilteredBlogsList blogs={filteredBlogs} />
          )}
        </section>
      )}
    </>
  );
};
