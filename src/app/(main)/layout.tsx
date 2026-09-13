import WeatherAdvisory from "@/components/nivaran/common/WeatherAdvisory";
import MainSiteSchemas from "@/components/seo/MainSiteSchemas";
import { getSiteVariantConfig } from "@/lib/site-variant";
import PublicSiteLayout from "@/components/new/DonationCard/PublicSiteLayout";

const mainSiteUrl = getSiteVariantConfig("main").siteUrl;
export const metadata = {
  alternates: { languages: { en: mainSiteUrl, "x-default": mainSiteUrl } },
};
export const revalidate = 3600;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MainSiteSchemas />
      <PublicSiteLayout>{children}</PublicSiteLayout>
      <WeatherAdvisory />
    </>
  );
}
