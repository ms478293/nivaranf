import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Programs",
  description: "Social Work and Program conducted by Nivaran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
