import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import { Banner } from "@/components/Banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <NivaranHeader />

      <main id="main-content" className="pt-28 relative">{children}</main>
      <NivaranFooter />
    </>
  );
}
