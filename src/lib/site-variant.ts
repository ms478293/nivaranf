export type SiteVariant = "main" | "global" | "usa";

export type SiteVariantConfig = {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  themeColor: string;
  organizationName: string;
  contactEmail: string;
  searchPath: string;
  articleFallbackTitle: string;
  articleFallbackDescription: string;
  articleAuthorFallback: string;
  articleDefaultLocation: string;
  articleDefaultDonateLine: string;
  articleDefaultAuthorBio: string;
  articleCtaHref: string;
  articleCtaLabel: string;
};

export const SITE_VARIANT_CONFIGS: Record<SiteVariant, SiteVariantConfig> = {
  main: {
    siteUrl: "https://www.nivaranfoundation.org",
    siteName: "Nivaran Foundation",
    defaultTitle: "Nivaran Foundation | Free Healthcare & Education in Nepal",
    defaultDescription:
      "Nivaran Foundation is a 501(c)(3) nonprofit delivering mobile health camps, maternal care, and education support to underserved communities in Nepal.",
    keywords: [
      "Nivaran Foundation",
      "Nepal healthcare NGO",
      "mobile health camps Nepal",
      "maternal health Nepal",
      "education nonprofit Nepal",
      "tax-deductible donation",
      "501(c)(3)",
    ],
    themeColor: "#000000",
    organizationName: "Nivaran Foundation",
    contactEmail: "partnerships@nivaranfoundation.org",
    searchPath: "/blogs",
    articleFallbackTitle: "Nivaran Foundation | Rural Healthcare in Nepal",
    articleFallbackDescription:
      "Read the latest stories and updates from Nivaran Foundation.",
    articleAuthorFallback: "Nivaran Foundation News Desk",
    articleDefaultLocation: "Nepal",
    articleDefaultDonateLine:
      "Distance is the disease. Your support helps us bring healthcare and education to communities where access still depends on geography.",
    articleDefaultAuthorBio:
      "Nivaran Foundation runs mobile health and education programs in Nepal's rural regions, where the nearest doctor or classroom can be hours away.",
    articleCtaHref: "/donate",
    articleCtaLabel: "Support this work",
  },
  global: {
    siteUrl: "https://global.nivaranfoundation.org",
    siteName: "Nivaran Global",
    defaultTitle: "Nivaran Global | Humanitarian Campaigns, Reporting & Action",
    defaultDescription:
      "Nivaran Global is Nivaran Foundation's international platform for humanitarian campaigns, crisis reporting, and public-interest response coordination.",
    keywords: [
      "Nivaran Global",
      "humanitarian campaigns",
      "humanitarian response",
      "global crisis reporting",
      "civilian relief",
      "public-interest response",
    ],
    themeColor: "#0f172a",
    organizationName: "Nivaran Global",
    contactEmail: "support@global.nivaranfoundation.org",
    searchPath: "/news",
    articleFallbackTitle: "Nivaran Global | Humanitarian Reporting & Action",
    articleFallbackDescription:
      "Read field reporting, analysis, and campaign updates from Nivaran Global.",
    articleAuthorFallback: "Nivaran Global Editorial Desk",
    articleDefaultLocation: "Nivaran Global Desk",
    articleDefaultDonateLine:
      "This reporting supports public understanding, partner alignment, and responsible humanitarian action. Back the work if you want this platform to keep publishing with clarity and discipline.",
    articleDefaultAuthorBio:
      "Nivaran Global publishes campaign reporting, humanitarian analysis, and response briefings focused on civilian protection, health access, and accountable public communication.",
    articleCtaHref: "/contact",
    articleCtaLabel: "Talk to Nivaran Global",
  },
  usa: {
    siteUrl: "https://usa.nivaranfoundation.org",
    siteName: "Nivaran | United States",
    defaultTitle: "Nivaran | United States",
    defaultDescription:
      "Nivaran's United States presence for community partnerships, fundraising, storytelling, and civic engagement.",
    keywords: [
      "Nivaran USA",
      "United States fundraising",
      "community partnership",
      "nonprofit outreach",
    ],
    themeColor: "#0f172a",
    organizationName: "Nivaran | United States",
    contactEmail: "partnerships@nivaranfoundation.org",
    searchPath: "/blogs",
    articleFallbackTitle: "Nivaran | United States",
    articleFallbackDescription:
      "Read the latest stories and updates from Nivaran.",
    articleAuthorFallback: "Nivaran Editorial Desk",
    articleDefaultLocation: "United States",
    articleDefaultDonateLine:
      "Support the work that turns community trust into practical action, storytelling, and measurable public benefit.",
    articleDefaultAuthorBio:
      "Nivaran builds people-centered initiatives through community partnerships, public storytelling, and long-horizon support systems.",
    articleCtaHref: "/contact-us",
    articleCtaLabel: "Contact the team",
  },
};

export function detectSiteVariantFromHost(host: string): SiteVariant {
  const normalizedHost = host.toLowerCase().split(":")[0].trim();

  if (normalizedHost.startsWith("global.")) return "global";
  if (normalizedHost.startsWith("usa.")) return "usa";
  return "main";
}

export function getSiteVariantConfig(variant: SiteVariant) {
  return SITE_VARIANT_CONFIGS[variant];
}
