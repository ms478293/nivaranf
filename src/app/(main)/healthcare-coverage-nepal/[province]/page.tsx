import { ProvinceCoveragePage } from "@/components/seo/ProvinceCoveragePage";
import {
  SANJEEVANI_PROVINCE_PAGES,
  getProvinceCoverageData,
} from "@/content/sanjeevani-province-pages";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SANJEEVANI_PROVINCE_PAGES.map((item) => ({ province: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const data = getProvinceCoverageData(province);

  if (!data) {
    return {
      title: "Healthcare Coverage in Nepal | Nivaran Foundation",
      description: "Province-by-province healthcare coverage across Nepal.",
    };
  }

  const districtsLabel = data.provinceSummary.districts.join(", ");

  return {
    title: `${data.province} Healthcare in Nepal | Project Sanjeevani Coverage`,
    description: `Current Sanjeevani records show ${data.totalPatients.toLocaleString(
      "en-US"
    )} patients served across ${data.provinceSummary.campsCompleted.toLocaleString(
      "en-US"
    )} completed camps in ${data.province} Province, including ${districtsLabel}.`,
    alternates: {
      canonical: `https://www.nivaranfoundation.org/healthcare-coverage-nepal/${province}`,
    },
    keywords: [
      `${data.province} healthcare Nepal`,
      `${data.province} health camps Nepal`,
      `${data.province} rural healthcare`,
      "Project Sanjeevani",
      "Nivaran Foundation",
    ],
    openGraph: {
      title: `${data.province} Healthcare in Nepal | Project Sanjeevani Coverage`,
      description: `Province-level healthcare coverage for ${data.province} based on current Project Sanjeevani camp records.`,
      url: `https://www.nivaranfoundation.org/healthcare-coverage-nepal/${province}`,
      type: "website",
      siteName: "Nivaran Foundation",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.province} Healthcare in Nepal | Project Sanjeevani Coverage`,
      description: `Current camp and patient coverage across ${data.province} Province.`,
      site: "@NivaranOrg",
      creator: "@NivaranOrg",
    },
  };
}

export default async function ProvinceCoverageRoute({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  return <ProvinceCoveragePage slug={(await params).province} />;
}
