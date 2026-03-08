import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Community Programs | Nivaran Foundation",
  description:
    "Nivaran Foundation community programs are currently consolidated under the healthcare program page.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs/community",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CommunityPage() {
  permanentRedirect("/programs/health");
}
