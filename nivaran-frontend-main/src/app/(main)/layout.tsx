import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";

// export const metadata: Metadata = {
//   robots: {
//     index: true,
//     follow: true,
//   },
// };

// export const metadata: Metadata = {
//   metadataBase: new URL("https://nivaranfoundation.org"),
//   keywords: [
//     "Nivaran foundation",
//     "Global Care, Local Impact",
//     "Sanjeevani",
//     "Terra",
//     "Unity",
//     "Nurture",
//     "Vidya",
//   ],

//   openGraph: {
//     siteName: "Nivaran Foundation",
//     title: "Nivaran Foundation | Global Care, Local Impact",
//     url: "https://nivaranfoundation.org",
//     type: "website",
//     images: [
//       {
//         url: ogImage.src,
//         alt: "Nivaran Foundation",
//         width: 1200,
//         height: 630,
//       },
//     ],
//     description:
//       "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Nivaran Foundation | Global Care, Local Impact",
//     site: "@NivaranOrg",
//     images: [
//       {
//         url: "https://nivaranfoundation.org/logo_img.jpg",
//         alt: "Nivaran Foundation",
//         width: 1200,
//         height: 675,
//       },
//     ],
//     description:
//       "Nivaran Foundation drives positive change by empowering communities. Learn about our mission, projects, and how you can help create a brighter future",
//     creator: "@NivaranOrg",
//   },

//   robots: "index, follow",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header></Header> */}
      <NivaranHeader />

      <main className="pt-28 relative">{children}</main>
      <NivaranFooter />
    </>
  );
}
