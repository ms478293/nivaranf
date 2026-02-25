import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Child Welfare Programs | Nivaran Foundation",
  description:
    "Nivaran Foundation child welfare efforts are currently published within the primary healthcare program page.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs/health",
  },
};

export default function ChildWelfarePage() {
  permanentRedirect("/programs/health");
}
