import GlobalFeedPage from "@/components/global/GlobalFeedPage";
import { getGlobalFeedBySegment } from "@/lib/global-feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Field stories and human-centered reporting from Global Nivaran campaigns and humanitarian coverage.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/stories",
  },
};

export default async function GlobalStoriesPage() {
  const items = await getGlobalFeedBySegment("stories");

  return (
    <GlobalFeedPage
      segment="stories"
      title="Stories that keep people, not just events, at the center."
      description="Narratives from the field, communities under strain, and the human realities that campaign pages and briefings need to stay accountable to."
      items={items}
    />
  );
}
