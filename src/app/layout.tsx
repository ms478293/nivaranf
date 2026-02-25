import Providers from "@/providers";
import "./globals.css";

import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const SITE_URL = "https://www.nivaranfoundation.org";
const DEFAULT_TITLE = "Nivaran Foundation | Free Healthcare & Education in Nepal";
const DEFAULT_DESCRIPTION =
  "Nivaran Foundation is a 501(c)(3) nonprofit delivering mobile health camps, maternal care, and education support to underserved communities in Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Nivaran Foundation",
    "Nepal healthcare NGO",
    "mobile health camps Nepal",
    "maternal health Nepal",
    "education nonprofit Nepal",
    "tax-deductible donation",
    "501(c)(3)",
  ],
  openGraph: {
    siteName: "Nivaran Foundation",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  alternateName: "Nivaran",
  name: "Nivaran Foundation",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  logo: `${SITE_URL}/logo_img.jpg`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2020-01-01",
  founders: [
    {
      "@type": "Person",
      name: "Mukesh Thakur",
      jobTitle: "Founder & Director",
      sameAs: "https://www.linkedin.com/company/nivaran-foundation",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977 1-5312555",
    contactType: "customer service",
    email: "partnerships@nivaranfoundation.org",
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
};

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "200", "300", "500", "600", "700", "900", "800"],
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
        <script
          id="Website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={cn("antialiased", poppins.className)}
        aria-hidden={false}
      >
        <Providers>
          <SetUserLocationCookie />
          <Toaster closeButton richColors theme="light" />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
