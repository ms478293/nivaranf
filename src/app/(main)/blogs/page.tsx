import { BlogList } from "@/components/new/Blogs/BlogList";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nepal Health Blog: News, Stories & Analysis | Nivaran Foundation",
  description:
    "Explore Nivaran Foundation's Nepal health blog featuring field stories, public health news, and analysis from frontline rural healthcare programs.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/blogs",
  },
  keywords: [
    "Nepal health blog",
    "rural healthcare Nepal",
    "Nivaran Foundation blog",
    "health camp stories",
    "Nepal public health updates",
  ],
  openGraph: {
    title: "Nepal Health Blog: News, Stories & Analysis | Nivaran Foundation",
    description:
      "Explore Nivaran Foundation's Nepal health blog featuring field stories, public health news, and analysis from frontline rural healthcare programs.",
    url: "https://www.nivaranfoundation.org/blogs",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepal Health Blog: News, Stories & Analysis | Nivaran Foundation",
    description:
      "Explore Nivaran Foundation's Nepal health blog featuring field stories, public health news, and analysis from frontline rural healthcare programs.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function BlogsPage() {
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

        {/* Newsletter Subscribe */}
        <div className="mt-8">
          <NewsletterSubscribe variant="banner" />
        </div>
      </div>
    </div>
  );
}
