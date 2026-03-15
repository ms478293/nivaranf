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

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content={variantConfig.themeColor} />
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
