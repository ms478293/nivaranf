import WeatherAdvisory from "@/components/nivaran/common/WeatherAdvisory";
import { getRootMetadata } from "@/lib/site-metadata";
import { getSiteVariantConfig } from "@/lib/site-variant";
import type { Viewport } from "next";
import GlobalShell from "@/components/global/GlobalShell";
import type { Metadata } from "next";

export const viewport: Viewport = { themeColor: getSiteVariantConfig("global").themeColor };

export const metadata: Metadata = {
  ...getRootMetadata("global"),
  title: {
    default: "Nivaran Global | Humanitarian Campaigns, Reporting & Action",
    template: "%s | Nivaran Global",
  },
  description:
    "Nivaran Global is a standalone platform for humanitarian campaigns, crisis reporting, and partner-ready public communication.",
};

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalShell>{children}</GlobalShell>
      <WeatherAdvisory mainSiteOrigin={getSiteVariantConfig("main").siteUrl} />
    </>
  );
}
