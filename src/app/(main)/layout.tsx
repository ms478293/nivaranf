import { Banner } from "@/components/Banner";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import { WhatsAppButton } from "@/components/new/WhatsAppButton/WhatsAppButton";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";

const SITE_URL = "https://www.nivaranfoundation.org";
const DEFAULT_DESCRIPTION =
  "Nivaran Foundation is a 501(c)(3) nonprofit delivering mobile health camps, maternal care, and education support to underserved communities in Nepal.";

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
  description:
    "Your tax-deductible donation funds healthcare and education in Nepal. 96% goes directly to programs.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        id="Website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="Organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        id="DonateAction-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateActionSchema) }}
      />

      <Banner />
      <NivaranHeader />
      <main id="main-content" className="relative pt-28">{children}</main>
      <WhatsAppButton />
      <NivaranFooter />
    </>
  );
}
