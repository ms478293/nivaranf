import Providers from "@/providers";
import "./globals.css";

import { CookieConsent } from "@/components/new/CookieConsent/CookieConsent";
import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";

const SITE_URL = "https://www.nivaranfoundation.org";
const PUBLIC_API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.nivaranfoundation.org"
).replace(/\/+$/, "");
const ENABLE_VERCEL_ANALYTICS =
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== "false";
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
  verification: {
    // TODO: Add your Bing verification code from bing.com/webmasters
    // bing: "your-bing-verification-code",
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["en", "ne"],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NGO"],
  name: "Nivaran Foundation",
  alternateName: "Nivaran",
  url: SITE_URL,
  logo: `${SITE_URL}/NivaranLogo.svg`,
  image: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Mukesh Thakur",
    jobTitle: "Founder & Director",
    sameAs: "https://www.linkedin.com/in/mukeshthakur",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977-01-5354693",
    contactType: "customer support",
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
  nonprofitStatus: "501c3",
};

const donateActionSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  name: "Donate to Nivaran Foundation",
  description: "Your tax-deductible donation funds healthcare and education in Nepal. 96% goes directly to programs.",
  recipient: {
    "@type": "Organization",
    name: "Nivaran Foundation",
    url: SITE_URL,
  },
  target: {
    "@type": "EntryPoint",
    urlTemplate: `${SITE_URL}/donate`,
    actionPlatform: "http://schema.org/DesktopWebPlatform",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
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
        {/* hreflang tags for bilingual support (English + Nepali) */}
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="ne" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        {/* Preconnect to third-party origins to reduce render-blocking latency */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="dns-prefetch" href={PUBLIC_API_BASE_URL} />
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
        <script
          id="DonateAction-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(donateActionSchema),
          }}
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QF370FRN47"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QF370FRN47');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vp9x38avgq");
          `}
        </Script>

        {/* Google Tag Manager — TODO: Replace GTM-XXXXXXX with your GTM container ID */}
        {/* 
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
        */}

        {/* Facebook Pixel — TODO: Replace PIXEL_ID with your actual Facebook Pixel ID */}
        {/*
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        */}
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
          {ENABLE_VERCEL_ANALYTICS ? <Analytics /> : null}
        </Providers>
      </body>
    </html>
  );
}
