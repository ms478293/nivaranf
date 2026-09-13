import { redirect } from "next/navigation";
import CampaignDonationPage, { campaignMetadata } from "@/components/new/DonationCard/CampaignDonationPage";
import { DONATION_CAMPAIGNS, getDonationCampaign, campaignDonationPath } from "@/content/donation-campaigns";

export const metadata = campaignMetadata(DONATION_CAMPAIGNS[0]);

export default async function DonationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  // Preserve existing links, including closed appeals, without silently
  // turning a known campaign request into a general-fund checkout.
  const campaign = typeof query.designation === "string" ? getDonationCampaign(query.designation) : undefined;
  if (campaign && campaign.id !== "general") {
    const remaining = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (key === "designation" || value === undefined) continue;
      for (const item of Array.isArray(value) ? value : [value]) remaining.append(key, item);
    }
    const suffix = remaining.size ? `?${remaining}` : "";
    redirect(`${campaignDonationPath(campaign.id)}${suffix}`);
  }
  return <CampaignDonationPage campaign={DONATION_CAMPAIGNS[0]} />;
}
