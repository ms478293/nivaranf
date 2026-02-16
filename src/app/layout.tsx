import Providers from "@/providers";
import "./globals.css";

import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Oswald, Outfit, Poppins } from "next/font/google";
import Script from "next/script";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "200", "300", "500", "600", "700", "900", "800"],
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "200", "300", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();

  // let userLocation = cookieStore.get("user_location")?.value;

  // if (!userLocation || userLocation === "undefined") {
  // const geoLocationRes = await fetch(
  //   `https://ipinfo.io/json?token=${process.env.IPINFO_API_KEY}`
  // );
  // userLocation = await geoLocationRes.json();

  //   // Set the cookie
  //   cookieStore.set("user_location", JSON.stringify(userLocation), {
  //     httpOnly: false,
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //     path: "/",
  //   });
  //   console.log("LOCATION", userLocation);
  // }
  return (
    <html lang="en">
      <head>
        <Script
          id="Website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              alternateName: "Nivaran",
              name: "Nivaran Foundation",
              url: "https://nivaranfoundation.org",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://nivaranfoundation.org/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              logo: "https://nivaranfoundation.org/logo_img.jpg",
              // title: "Nivaran Foundation | Global Care, Local Impact",
              description:
                "Nivaran Foundation empowers communities with healthcare, education, and sustainability initiatives. Join us in making a global impact.",
              foundingDate: "2020-01-01",
              founders: [
                {
                  "@type": "Person",
                  name: "Mukesh Thakur",
                  jobTitle: "Founder & Director",
                  sameAs:
                    "https://www.linkedin.com/company/nivaran-foundation",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+977 1-5312555",
                contactType: "customer service",
                email:"partnerships@nivaranfoundation.org",
                areaServed: "NP",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61584248211038",
                "https://www.instagram.com/nivaran.foundation/",
                "https://x.com/NivaranOrg",
                "https://www.linkedin.com/company/nivaran-foundation",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kathmandu, Nepal",
                addressLocality: "Kathmandu",
                addressCountry: "NP",
              },
            }),
          }}
        />
      </head>
      <Providers>
        <body
          className={cn(
            ` antialiased `,
            // montaga.className,
            poppins.className,
            outfit.className,
            oswald.className,
            ""
          )}
          aria-hidden={false}
        >
          <SetUserLocationCookie />
          <Toaster closeButton richColors theme="light" />

          {children}
        </body>
      </Providers>
    </html>
  );
}
