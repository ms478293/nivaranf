import WeatherAdvisory from "@/components/nivaran/common/WeatherAdvisory";
import MainSiteSchemas from "@/components/seo/MainSiteSchemas";
import PublicSiteLayout from "@/components/new/DonationCard/PublicSiteLayout";

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
