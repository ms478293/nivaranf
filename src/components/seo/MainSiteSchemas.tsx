import { getSiteVariantConfig } from "@/lib/site-variant";

function getMainSiteSchemas(siteUrl: string, description: string) {
  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      publisher: { "@id": `${siteUrl}/#organization` },
      name: "Nivaran Foundation",
      alternateName: "Nivaran",
      url: siteUrl,
      logo: `${siteUrl}/logo_img.jpg`,
      description,
      inLanguage: "en",
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "NGO",
      "@id": `${siteUrl}/#organization`,
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
      foundingDate: "2024",
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
    },
    donateAction: {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      name: "Donate to Nivaran Foundation",
      description:
        "Your donation funds healthcare and education in Nepal. See financial reporting status.",
      recipient: {
        "@id": `${siteUrl}/#organization`,
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

export default function MainSiteSchemas() {
  const config = getSiteVariantConfig("main");
  const schemas = getMainSiteSchemas(config.siteUrl, config.defaultDescription);
  return <>{Object.entries(schemas).map(([name, value]) => (
    <script key={name} id={`${name === "website" ? "Website" : name === "organization" ? "Organization" : "DonateAction"}-schema`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />
  ))}</>;
}
