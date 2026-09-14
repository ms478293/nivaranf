import CampaignDonationPage, { campaignMetadata } from "@/components/new/DonationCard/CampaignDonationPage";
import { getDonationCampaign } from "@/content/donation-campaigns";

const campaign = getDonationCampaign("nepal-flood-recovery")!;

export const dynamic = "force-dynamic";

export const metadata = {
  ...campaignMetadata(campaign),
  robots: { index: false, follow: true },
};

export default function FloodCheckoutPage() {
  return <CampaignDonationPage campaign={campaign} checkoutOnly />;
}
