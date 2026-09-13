import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DONATION_CAMPAIGNS, campaignDonationPath } from "@/content/donation-campaigns";
import { DESIGNATIONS } from "@/content/donation-designations";
import styles from "./Campaigns.module.css";

export const metadata: Metadata = {
  title: "Choose a Cause | Nivaran Foundation",
  description: "Explore Nivaran’s healthcare, education and emergency appeals. Find the cause you care about and its dedicated giving page.",
  alternates: { canonical: "https://www.nivaranfoundation.org/campaigns" },
};

export default function CampaignsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>TOGETHER, WITH NIVARAN</p>
        <div><h1>Different causes.<br /><em>One shared humanity.</em></h1><p>Start with what matters to you. Explore our work, see where each appeal stands, and find your way to help.</p></div>
      </header>
      <section className={styles.grid} aria-label="Nivaran campaigns">
        {DONATION_CAMPAIGNS.map((campaign) => {
          const designation = DESIGNATIONS.find((item) => item.id === campaign.id)!;
          return (
            <article key={campaign.id} className={styles.campaign}>
              <Link href={campaignDonationPath(campaign.id)} className={styles.imageLink} aria-label={`View ${campaign.category}`}>
                <Image src={campaign.image} alt={campaign.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ objectPosition: campaign.imagePosition }} />
                <span className={styles.arrow}><ArrowUpRight size={21} aria-hidden="true" /></span>
                {campaign.imageCaption && <span className={styles.imageCaption}>{campaign.imageCaption}</span>}
              </Link>
              <p className={styles.status}>{!designation.visible ? "COMING SOON · GIFTS NOT YET OPEN" : "GIVING OPEN"}</p>
              <h2><Link href={campaignDonationPath(campaign.id)}>{campaign.category}</Link></h2>
              <p className={styles.description}>{campaign.description}</p>
              <div className={styles.links}>
                <Link href={campaignDonationPath(campaign.id)}>{designation.visible ? "Give to this cause" : "View appeal"}<ArrowUpRight size={14} aria-hidden="true" /></Link>
                <Link href={designation.pageUrl}>Explore the work</Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
