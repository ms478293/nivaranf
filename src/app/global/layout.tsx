import GlobalShell from "@/components/global/GlobalShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Global Nivaran | Humanitarian Campaigns, Reporting & Action",
    template: "%s | Global Nivaran",
  },
  description:
    "Global Nivaran is a standalone platform for humanitarian campaigns, crisis reporting, and partner-ready public communication.",
};

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalShell>{children}</GlobalShell>;
}
