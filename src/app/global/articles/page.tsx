import GlobalFeedPage from "@/components/global/GlobalFeedPage";
import { getGlobalFeedBySegment } from "@/lib/global-feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefings",
  description:
    "Long-form analysis, briefings, and contextual writing from Global Nivaran.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/articles",
  },
};

export default async function GlobalArticlesPage() {
  const items = await getGlobalFeedBySegment("articles");

  return (
    <GlobalFeedPage
      segment="articles"
      title="Briefings and analysis with enough depth to work from."
      description="Long-form writing designed for people who need context, operational clarity, and a sharper read on what a crisis or campaign actually demands."
      items={items}
    />
  );
}
