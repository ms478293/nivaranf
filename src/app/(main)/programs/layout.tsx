import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Programs | Nivaran Foundation",
  description:
    "Explore Nivaran Foundation healthcare and education programs serving underserved communities in rural Nepal.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs",
  },
  openGraph: {
    title: "Programs | Nivaran Foundation",
    description:
      "Healthcare and education initiatives led by Nivaran Foundation across Nepal.",
    url: "https://www.nivaranfoundation.org/programs",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programs | Nivaran Foundation",
    description:
      "Healthcare and education initiatives led by Nivaran Foundation across Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
