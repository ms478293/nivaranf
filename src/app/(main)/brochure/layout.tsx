import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Brochure Download",
  description:
    "Download the official Nivaran Foundation brochure with mission, impact, and program information.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/brochure",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
