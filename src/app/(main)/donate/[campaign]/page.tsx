import { notFound, redirect } from "next/navigation";
import CampaignDonationPage, { campaignMetadata } from "@/components/new/DonationCard/CampaignDonationPage";
import { DONATION_CAMPAIGNS, getDonationCampaign } from "@/content/donation-campaigns";

type Props = { params: Promise<{ campaign: string }> };

export function generateStaticParams() {
  return DONATION_CAMPAIGNS.filter((item) => item.id !== "general").map((item) => ({ campaign: item.id }));
}

export async function generateMetadata({ params }: Props) {
  const campaign = getDonationCampaign((await params).campaign);
  if (!campaign) notFound();
  return campaignMetadata(campaign);
}

export default async function CampaignPage({ params }: Props) {
  const campaign = getDonationCampaign((await params).campaign);
  if (!campaign) notFound();
  if (campaign.id === "general") redirect("/donate");
  return <CampaignDonationPage campaign={campaign} />;
}
