import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Portal Login | Nivaran Foundation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
