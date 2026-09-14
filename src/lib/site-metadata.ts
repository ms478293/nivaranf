import type { Metadata } from "next";
import { getSiteVariantConfig, type SiteVariant } from "@/lib/site-variant";

const SITE_URL = "https://www.nivaranfoundation.org";
const META_DOMAIN_VERIFICATION = process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION;
const DEFAULT_TITLE = "Nivaran Foundation";
const DEFAULT_DESCRIPTION =
  "Nivaran Foundation brings mobile health camps, maternal and child health outreach, and education support to underserved communities in Nepal.";

export function getRootMetadata(variant: SiteVariant): Metadata {
  const config = getSiteVariantConfig(variant);

  return {
    metadataBase: new URL(config.siteUrl || SITE_URL),
    ...(META_DOMAIN_VERIFICATION
      ? {
          verification: {
            other: {
              "facebook-domain-verification": META_DOMAIN_VERIFICATION,
            },
          },
        }
      : {}),
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
            "Nepal healthcare",
            "education initiatives",
            "health access",
            "Nepal flood appeal",
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
