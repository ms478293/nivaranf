import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { type DonationCampaign, campaignDonationPath } from "@/content/donation-campaigns";
import { DESIGNATIONS } from "@/content/donation-designations";
import DonationCard from "./DonationCard";
import NepalFloodCampaignPage from "./NepalFloodCampaignPage";
import styles from "./DonationPage.module.css";
import { createPageMetadata } from "@/lib/page-metadata";

export function campaignMetadata(campaign: DonationCampaign): Metadata {
  const isFlood = campaign.id === "nepal-flood-recovery";
  return createPageMetadata({
    path: campaignDonationPath(campaign.id),
    title: isFlood ? "Nepal Flood Recovery Appeal | Nivaran Foundation" : `${campaign.category} | Give with Nivaran Foundation`,
    description: isFlood
      ? "Support Nivaran’s planned Nepal flood response. Review recovery priorities, dated situation updates and response status, then choose a one-time or monthly gift."
      : campaign.description,
    image: { url: campaign.image, alt: campaign.imageAlt },
  });
}

export default function CampaignDonationPage({ campaign, checkoutOnly = false }: { campaign: DonationCampaign; checkoutOnly?: boolean }) {
  const designation = DESIGNATIONS.find((item) => item.id === campaign.id);
  if (!designation) throw new Error(`Missing donation designation: ${campaign.id}`);
  if (campaign.id === "nepal-flood-recovery" && designation.visible && !checkoutOnly) return <NepalFloodCampaignPage campaign={campaign} />;
  return (
    <div className={styles.page} data-campaign={campaign.id} data-tone={campaign.tone} style={{ "--story-position": campaign.imagePosition } as CSSProperties}>
      <div className={styles.story}>
        <Image src={campaign.image} alt={campaign.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 53vw" className={styles.storyImage} />
        <div className={styles.photoShade} />
        <p className={styles.location}>{campaign.category}<span>NEPAL</span></p>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{campaign.eyebrow}</p>
          <h1>{campaign.title}<br /><span>{campaign.titleAccent}</span></h1>
          <p className={styles.description}>{campaign.description}</p>
          <div className={styles.storySignature}><span />Together, with Nivaran.</div>
          {campaign.imageCaption && <p className={styles.imageCaption}>{campaign.imageCaption}</p>}
        </div>
      </div>
      <div className={styles.checkout}>
        <div className={styles.checkoutInner}>
          <div className={styles.campaignLabel}><span />{campaign.id === "general" ? "GIVE WHERE IT MATTERS MOST" : campaign.category}</div>
          {designation.visible ? (
            <Suspense fallback={<div className={styles.skeleton} aria-label="Loading secure donation form" />}>
              <DonationCard key={campaign.id} campaign={campaign} />
            </Suspense>
          ) : (
            <section className={styles.pending} aria-labelledby="appeal-heading">
              <p className={styles.pendingBadge}>Not accepting gifts yet</p>
              <h2 id="appeal-heading" className={styles.formHeading}>{campaign.formHeading}</h2>
              <p>{campaign.formIntro}</p>
              <Link href={designation.pageUrl} className={styles.continueButton}>{designation.exploreLabel}<ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="/contact-us" className={styles.pendingContact}>Contact us about this appeal <ArrowUpRight size={14} aria-hidden="true" /></Link>
              <div className={styles.generalAlternative}>
                <p>You can support Nivaran’s existing work with a general gift. It will not be reserved for this appeal.</p>
                <Link href="/donate">Make a general gift <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </section>
          )}
          <p className={styles.support}>A question before you give? <Link href="/contact-us">We’re here <ArrowUpRight size={12} aria-hidden="true" /></Link></p>
          <Link href="/campaigns" className={styles.allCampaigns}>Explore all campaigns <ArrowUpRight size={12} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
