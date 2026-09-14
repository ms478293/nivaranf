import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
      <section className={styles.hero} aria-labelledby="campaigns-hero-title">
        <Image
          src="/hero_img/hero_img_2.webp"
          alt="A doctor caring for an older woman in a Himalayan village"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>NIVARAN FOUNDATION <span aria-hidden="true">/</span> CAMPAIGNS</p>
            <h1 id="campaigns-hero-title">Different causes.<br /><em>One shared humanity.</em></h1>
            <p className={styles.heroDescription}>Care within reach. A chance to learn. A community to stand beside. Find your way to make a difference in Nepal.</p>
            <div className={styles.heroActions}>
              <a href="#our-campaigns" className={styles.heroButton}>Explore campaigns <ArrowDown size={18} aria-hidden="true" /></a>
              <Link href="/donate" className={styles.heroLink}>Give where it’s needed most <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
      <section id="our-campaigns" className={styles.campaigns} aria-labelledby="campaigns-list-title" tabIndex={-1}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>FIND YOUR CAUSE</p>
          <div><h2 id="campaigns-list-title">Where will you<br /><em>make a difference?</em></h2><p>Explore our work, see where each appeal stands, and choose the cause that speaks to you.</p></div>
        </header>
        <div className={styles.grid}>
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
        </div>
      </section>
    </div>
  );
}
