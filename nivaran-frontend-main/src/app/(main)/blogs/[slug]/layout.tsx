import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Inspiring Stories of Impact",
  description:
    "Explore the latest stories, news, and projects from Nivaran Foundation, driving change globally through education, healthcare, and community initiatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
