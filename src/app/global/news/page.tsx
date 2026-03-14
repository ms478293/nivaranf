import GlobalFeedPage from "@/components/global/GlobalFeedPage";
import { getGlobalFeedBySegment } from "@/lib/global-feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Global Nivaran newsroom coverage on humanitarian developments, health disruption, education continuity, and crisis-driven public-interest reporting.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/news",
  },
};

export default async function GlobalNewsPage() {
  const items = await getGlobalFeedBySegment("news");

  return (
    <GlobalFeedPage
      segment="news"
      title="Newsroom coverage shaped for action."
      description="A running editorial feed focused on humanitarian shifts, health disruption, education continuity, and the signals that matter when people need to make decisions quickly."
      items={items}
    />
  );
}
