import Providers from "@/providers";
import "./globals.css";

import { CookieConsent } from "@/components/new/CookieConsent/CookieConsent";
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
  logo: `${SITE_URL}/logo_img.jpg`,
  description: DEFAULT_DESCRIPTION,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["NonprofitOrganization", "NGO"],
  name: "Nivaran Foundation",
  alternateName: "Nivaran",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_img.jpg`,
  image: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2020-01-01",
  founder: {
    "@type": "Person",
    name: "Mukesh Thakur",
    jobTitle: "Founder & Director",
    sameAs: "https://www.linkedin.com/company/nivaran-foundation",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977 1-5312555",
    contactType: "customer service",
    email: "partnerships@nivaranfoundation.org",
    areaServed: ["NP", "US"],
    availableLanguage: ["English", "Nepali"],
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
  nonprofit: {
    "@type": "NonprofitType",
    name: "501(c)(3)",
  },
  taxID: "41-2656587",
  areaServed: [
    { "@type": "Country", name: "Nepal" },
    { "@type": "Country", name: "United States" },
  ],
  knowsAbout: [
    "Rural Healthcare",
    "Mobile Health Camps",
    "Maternal Health",
    "Child Health",
    "Education in Nepal",
    "Community Development",
  ],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#000000" />
        <script
          id="Website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          id="Organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={cn("antialiased", poppins.className)}
        aria-hidden={false}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-md focus:text-sm"
        >
          Skip to main content
        </a>
        <Providers>
          <SetUserLocationCookie />
          <Toaster closeButton richColors theme="light" />
          {children}
          <CookieConsent />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
