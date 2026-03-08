import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Environmental Health Programs | Nivaran Foundation",
  description:
    "Nivaran Foundation environmental health initiatives are currently integrated into the healthcare program page.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs/environment",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnvironmentPage() {
  permanentRedirect("/programs/health");
}
