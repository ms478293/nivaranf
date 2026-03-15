import { Banner } from "@/components/Banner";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import { WhatsAppButton } from "@/components/new/WhatsAppButton/WhatsAppButton";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <NivaranHeader />
      <main id="main-content" className="relative pt-28">{children}</main>
      <WhatsAppButton />
      <NivaranFooter />
    </>
  );
}
