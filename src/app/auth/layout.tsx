import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Access | Nivaran Foundation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
