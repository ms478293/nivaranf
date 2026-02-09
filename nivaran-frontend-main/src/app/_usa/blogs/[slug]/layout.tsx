import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation",
  description: "What Nivaran is and what Nivaran does?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
