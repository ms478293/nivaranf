import { DistrictCoveragePage } from "@/components/seo/DistrictCoveragePage";
import {
  getAllDistrictCoverageParams,
  getDistrictCoverageData,
} from "@/content/sanjeevani-province-pages";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllDistrictCoverageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; district: string }>;
}): Promise<Metadata> {
  const { province, district } = await params;
  const data = getDistrictCoverageData(province, district);

  if (!data) {
    return {
      title: "District Healthcare Coverage in Nepal | Nivaran Foundation",
      description: "District-level healthcare coverage from Project Sanjeevani.",
    };
  }

  return {
    title: `${data.district} District Healthcare in Nepal | Project Sanjeevani Coverage`,
    description: `Current Sanjeevani records show ${data.totalPatients.toLocaleString(
      "en-US"
    )} patients served in ${data.district} District, ${data.province}, across ${
      data.camps.length
    } recorded camp${data.camps.length === 1 ? "" : "s"} in ${data.municipalities.join(
      ", "
    )}.`,
    alternates: {
      canonical: `https://www.nivaranfoundation.org/healthcare-coverage-nepal/${province}/${district}`,
    },
    keywords: [
      `${data.district} healthcare Nepal`,
      `${data.district} district health camp Nepal`,
      `${data.district} rural healthcare`,
      `${data.province} healthcare Nepal`,
      "Project Sanjeevani",
      "Nivaran Foundation",
    ],
    openGraph: {
      title: `${data.district} District Healthcare in Nepal | Project Sanjeevani Coverage`,
      description: `District-level healthcare coverage in ${data.district}, ${data.province}, based on current Project Sanjeevani camp records.`,
      url: `https://www.nivaranfoundation.org/healthcare-coverage-nepal/${province}/${district}`,
      type: "website",
      siteName: "Nivaran Foundation",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.district} District Healthcare in Nepal | Project Sanjeevani Coverage`,
      description: `Current camp and patient coverage in ${data.district}, ${data.province}.`,
      site: "@NivaranOrg",
      creator: "@NivaranOrg",
    },
  };
}

export default async function DistrictCoverageRoute({
  params,
}: {
  params: Promise<{ province: string; district: string }>;
}) {
  const { province, district } = await params;
  return <DistrictCoveragePage provinceSlug={province} districtSlug={district} />;
}
