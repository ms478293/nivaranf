import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { DONATION_CAMPAIGNS, campaignDonationPath } from "@/content/donation-campaigns";
import { DESIGNATIONS } from "@/content/donation-designations";
import { LATEST_NEPAL_FLOOD_UPDATE } from "@/content/nepal-response";
import styles from "./Campaigns.module.css";

export const metadata: Metadata = {
  title: "Choose a Cause | Nivaran Foundation",
  description: "Explore Nivaran’s healthcare, education and emergency appeals. Find the cause you care about and its dedicated giving page.",
  alternates: { canonical: "https://www.nivaranfoundation.org/campaigns" },
};

export default function CampaignsPage() {
  const floodUpdate = LATEST_NEPAL_FLOOD_UPDATE;
  return (
    <div className={styles.page}>
      <a href="#latest-crisis" className={styles.crisisRibbon}>
        <span className={styles.crisisTag}>LATEST CRISIS</span>
        <span>Nepal flood emergency</span>
        <span className={styles.ribbonAction}>See the update <ArrowDown size={15} aria-hidden="true" /></span>
      </a>
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
      <section id="latest-crisis" className={styles.crisis} aria-labelledby="latest-crisis-title" tabIndex={-1}>
        <div className={styles.crisisInner}>
          <figure className={styles.crisisVisual}>
            <div className={styles.crisisImage}>
              <Image
                src="/hero_img/nepal-flood-2026.webp"
                alt="AI-generated illustration of floodwater flowing through a Himalayan village"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </div>
            <figcaption>AI-generated illustration · not documentary photography</figcaption>
          </figure>
          <div className={styles.crisisContent}>
            <p className={styles.crisisEyebrow}>CURRENT CRISIS <span aria-hidden="true">/</span> NEPAL</p>
            <h2 id="latest-crisis-title">Nepal’s floods.<br /><em>A long road home.</em></h2>
            <p className={styles.crisisSummary}>{floodUpdate.summary}</p>
            <dl className={styles.crisisFacts}>
              {floodUpdate.figures.map((figure) => (
                <div key={figure.label}><dt>{figure.label}</dt><dd>{figure.value}</dd></div>
              ))}
            </dl>
            <p className={styles.crisisSource}>
              Official update: <time dateTime={floodUpdate.reportDate}>{floodUpdate.reportDateLabel}</time>. Figures may be revised.<br />
              Source: <a href={floodUpdate.sourceUrl} target="_blank" rel="noopener noreferrer">{floodUpdate.sourceLabel} <ArrowUpRight size={12} aria-hidden="true" /></a>
            </p>
            <Link href="/campaigns/nepal-flood-recovery#latest-update" className={styles.crisisAction}>Read the flood update <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <p className={styles.crisisNote}>Nivaran’s dedicated flood appeal is in preparation.</p>
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
