import MainSiteSchemas from "@/components/seo/MainSiteSchemas";
import { getSiteVariantConfig } from "@/lib/site-variant";
import PublicSiteLayout from "@/components/new/DonationCard/PublicSiteLayout";

export const metadata = { alternates: { languages: { en: getSiteVariantConfig("main").siteUrl, "x-default": getSiteVariantConfig("main").siteUrl } } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><MainSiteSchemas /><PublicSiteLayout>{children}</PublicSiteLayout></>;
}
