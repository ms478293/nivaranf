import PublicSiteLayout from "@/components/new/DonationCard/PublicSiteLayout";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PublicSiteLayout>{children}</PublicSiteLayout>;
}
