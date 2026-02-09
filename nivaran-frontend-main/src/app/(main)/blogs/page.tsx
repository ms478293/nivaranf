import { BlogList } from "@/components/new/Blogs/BlogList";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Blog - Inspiring Stories of Impact",
  description:
    "Explore the latest stories, news, and projects from Nivaran Foundation, driving change globally through education, healthcare, and community initiatives",
  alternates: {
    canonical: "https://nivaranfoundation.org/blogs",
  },
};

export default function BlogsPage() {
  // const [categories, setCategories] = useState("");

  return (
    <div className="w-full mb-10 font-Poppins ">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4  ">
        <PageTitle
          prefix="Your Window into"
          suffix="Our Work Around the World"
        />
        <p className="text-sm text-gray-600">
          Stay updated with the latest stories that drive impact and inspire
          change.
        </p>
        <div className="w-full h-[1.5px] gradient-border "></div>
        <BlogList />
      </div>
    </div>
  );
}
