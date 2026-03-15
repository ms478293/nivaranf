import Providers from "@/providers";
import "./globals.css";

import { CookieConsent } from "@/components/new/CookieConsent/CookieConsent";
import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  detectSiteVariantFromHost,
  getSiteVariantConfig,
} from "@/lib/site-variant";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Poppins } from "next/font/google";

const SITE_URL = "https://www.nivaranfoundation.org";
const PUBLIC_API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.nivaranfoundation.org"
).replace(/\/+$/, "");
const ENABLE_VERCEL_ANALYTICS =
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== "false";
const DEFAULT_TITLE = "Nivaran Foundation";
const DEFAULT_DESCRIPTION =
  "Nivaran Foundation builds humanitarian, health, education, and public-interest initiatives across multiple contexts.";

function getMainSiteSchemas(siteUrl: string, description: string, searchPath: string) {
  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Nivaran Foundation",
      alternateName: "Nivaran",
      url: siteUrl,
      logo: `${siteUrl}/logo_img.jpg`,
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}${searchPath}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en",
    },
    organization: {
      "@context": "https://schema.org",
      "@type": [
        "Organization",
        "NGO",
        "NonprofitOrganization",
        "MedicalOrganization",
      ],
      name: "Nivaran Foundation",
      alternateName: "Nivaran",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 665,
      },
      image: `${siteUrl}/logo.png`,
      description,
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Mukesh Thakur",
        jobTitle: "Founder & Executive Director",
        sameAs: "https://www.linkedin.com/in/mukeshthakur",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+977-01-5354693",
          contactType: "customer support",
          email: "partnerships@nivaranfoundation.org",
          areaServed: ["NP", "US"],
          availableLanguage: ["English", "Nepali"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=61584248211038",
        "https://www.instagram.com/nivaran.foundation/",
        "https://x.com/NivaranOrg",
        "https://www.linkedin.com/company/nivaran-foundation",
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Kathmandu",
          addressLocality: "Kathmandu",
          addressRegion: "Bagmati",
          addressCountry: "NP",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "1025 Massachusetts Ave, Suite 303",
          addressLocality: "Arlington",
          addressRegion: "MA",
          postalCode: "02476",
          addressCountry: "US",
        },
      ],
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
      nonprofitStatus: "https://schema.org/Nonprofit501c3",
      medicalSpecialty: [
        "https://schema.org/PrimaryCare",
        "https://schema.org/PublicHealth",
      ],
    },
    donateAction: {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      name: "Donate to Nivaran Foundation",
      description:
        "Your tax-deductible donation funds healthcare and education in Nepal. 96% goes directly to programs.",
      recipient: {
        "@type": "Organization",
        name: "Nivaran Foundation",
        url: siteUrl,
      },
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/donate`,
        actionPlatform: "http://schema.org/DesktopWebPlatform",
      },
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "";
  const variant = detectSiteVariantFromHost(host);
  const config = getSiteVariantConfig(variant);

  return {
    metadataBase: new URL(config.siteUrl || SITE_URL),
    title: {
      default: variant === "main" ? DEFAULT_TITLE : config.siteName,
      template: "%s",
    },
    description:
      variant === "main" ? DEFAULT_DESCRIPTION : config.defaultDescription,
    keywords:
      variant === "main"
        ? [
            "Nivaran Foundation",
            "humanitarian response",
            "education initiatives",
            "health access",
            "global campaigns",
            "public-interest reporting",
          ]
        : config.keywords,
    openGraph: {
      siteName: config.siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${config.siteUrl}/logo.png`,
          width: 1200,
          height: 665,
          alt: config.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NivaranOrg",
      creator: "@NivaranOrg",
      images: [`${config.siteUrl}/logo.png`],
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
}

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
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "";
  const variant = detectSiteVariantFromHost(host);
  const variantConfig = getSiteVariantConfig(variant);
  const mainSiteSchemas =
    variant === "main"
      ? getMainSiteSchemas(
          variantConfig.siteUrl,
          variantConfig.defaultDescription,
          variantConfig.searchPath,
        )
      : null;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content={variantConfig.themeColor} />
        {variant === "main" && (
          <>
            <link rel="alternate" hrefLang="en" href={variantConfig.siteUrl} />
            <link rel="alternate" hrefLang="x-default" href={variantConfig.siteUrl} />
            <script
              id="Website-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(mainSiteSchemas?.website),
              }}
            />
            <script
              id="Organization-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(mainSiteSchemas?.organization),
              }}
            />
            <script
              id="DonateAction-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(mainSiteSchemas?.donateAction),
              }}
            />
          </>
        )}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="dns-prefetch" href={PUBLIC_API_BASE_URL} />

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

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vp9x38avgq");
          `}
        </Script>
      </head>
      <body className={cn("antialiased", poppins.className)} aria-hidden={false}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
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
