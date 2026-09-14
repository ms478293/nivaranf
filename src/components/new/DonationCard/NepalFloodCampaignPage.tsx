import Image from "next/image";
import { Suspense } from "react";
import type { DonationCampaign } from "@/content/donation-campaigns";
import { VARIANCE_NOTE } from "@/content/donation-designations";
import DonationCard from "./DonationCard";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { LATEST_NEPAL_FLOOD_UPDATE } from "@/content/nepal-response";
import styles from "./NepalFloodCampaignPage.module.css";

const priorities = [
  { title: "Clean water. Everyday dignity.", text: "Safe drinking water, sanitation and essential hygiene are central to recovery after flooding. These needs will help shape the scope of a response." },
  { title: "Care that can reach people.", text: "When roads and bridges are damaged, reaching care becomes harder. Access to essential healthcare is a priority as communities recover." },
  { title: "Mothers and children first.", text: "Pregnant women, new mothers and children need continuity of care. Their needs belong at the heart of response planning." },
];

const questions = [
  { question: "Can I donate to this flood appeal now?", answer: `Yes. Use the form on this page for a one-time or monthly gift to the Nepal flood appeal. Your gift supports a planned response; Nivaran has not yet deployed. ${VARIANCE_NOTE}` },
  { question: "Has Nivaran deployed a flood response?", answer: "Nivaran has not yet deployed a response to this flood emergency. Our ongoing healthcare and education work continues separately. This page describes the crisis and the needs informing our planning, not aid we have already delivered." },
  { question: "Would a general donation go to this flood appeal?", answer: "A general gift supports Nivaran’s existing healthcare and education work where needed. It is not reserved for this flood appeal. To support the flood appeal, use the dedicated form on this page." },
  { question: "Where do the situation figures come from?", answer: "The figures on this page come from Nepal’s Ministry of Foreign Affairs briefing dated 11 September 2026. The original report is linked beside them. These are figures for the wider emergency, may be revised, and do not represent Nivaran’s activity." },
];

export default function NepalFloodCampaignPage({ campaign }: { campaign: DonationCampaign }) {
  const update = LATEST_NEPAL_FLOOD_UPDATE;
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="flood-campaign-title">
        <Image src="/hero_img/nepal-flood-river.webp" alt="Floodwater rushing through a mountain valley beside a damaged road and riverside buildings" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}><span />NEPAL FLOODS · 2026 APPEAL</p>
          <h1 id="flood-campaign-title">Help Nepal find<br />its way <em>home.</em></h1>
          <p className={styles.heroIntro}>Beyond the floodwaters are families, futures,<br className={styles.desktopBreak} /> and a long road to recovery. Stand with them.</p>
          <a href="#flood-giving" className={styles.primary}>Donate to this appeal <ArrowUpRight size={19} aria-hidden="true" /></a>
          <p className={styles.heroStatus}>Help fund a planned flood response.</p>
        </div>
        <div className={styles.heroFoot}>
          <a href="#the-crisis">Understand the crisis <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Flood campaign sections">
        <div><a href="#the-crisis">The crisis</a><a href="#priorities">Priorities</a><a href="#our-approach">Our approach</a></div>
        <a href="#flood-giving" className={styles.navAction}>Donate now <ArrowUpRight size={15} aria-hidden="true" /></a>
      </nav>

      <section id="the-crisis" className={styles.situation} aria-labelledby="situation-title" tabIndex={-1}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>01 / THE CRISIS</p>
          <div><h2 id="situation-title">One flood.<br /><em>Thousands of lives changed.</em></h2><p>{update.summary}</p></div>
        </div>
        <dl className={styles.figures}>
          {update.figures.map((figure) => <div key={figure.label}><dt>{figure.label}</dt><dd>{figure.value}</dd></div>)}
        </dl>
        <div className={styles.sourceLine}>
          <p>Reported <time dateTime={update.reportDate}>{update.reportDateLabel}</time> · Figures may be revised.</p>
          <a href={update.sourceUrl} target="_blank" rel="noopener noreferrer">{update.sourceLabel} <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="flood-story" className={styles.humanStory} aria-labelledby="human-story-title" tabIndex={-1}>
        <div className={styles.storyPanel}>
          <Image src="/hero_img/nepal-flood-family.webp" alt="A woman looking through mud-damaged photographs while a man clears furniture from their home" fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.portraitImage} />
          <div className={styles.storyShade} aria-hidden="true" />
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>BEHIND EVERY NUMBER, A LIFE.</p>
            <h2 id="human-story-title">A flood takes more<br />than <em>a home.</em></h2>
            <p>It can take the road to a clinic. A reliable source of water. The ordinary routines that help a family feel safe.</p>
            <p>Recovery means rebuilding those connections, too. That is the human need at the centre of this appeal.</p>
            <p className={styles.storySignature}>With Nepal. For the road ahead.</p>
          </div>
        </div>
        <section id="flood-giving" className={styles.givingPanel} aria-label="Donate to Nepal flood recovery" tabIndex={-1}>
          <p className={styles.givingLabel}>NEPAL FLOODS · YOUR GIFT</p>
          <Suspense fallback={<div className={styles.formLoading} role="status">Loading the donation form…</div>}>
            <DonationCard campaign={campaign} />
          </Suspense>
        </section>
      </section>

      <section id="priorities" className={styles.priorities} aria-labelledby="priorities-title" tabIndex={-1}>
        <div className={styles.priorityIntro}>
          <p className={styles.eyebrow}>02 / WHAT MATTERS NOW</p>
          <h2 id="priorities-title">The essentials.<br /><em>The way forward.</em></h2>
          <p>Three areas of need informing our planning. The final response will depend on a confirmed scope, resources and access.</p>
          <Link href="/campaigns/nepal-flood-recovery#latest-update" className={styles.textLink}>Read the full situation briefing <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className={styles.priorityList}>
          {priorities.map((priority, index) => <div key={priority.title}><span className={styles.number}>0{index + 1}</span><div><h3>{priority.title}</h3><p>{priority.text}</p></div></div>)}
        </div>
        <div className={styles.recoveryScene}>
          <Image src="/hero_img/nepal-flood-street.webp" alt="Residents carrying belongings from their homes along a mud-covered street" fill sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) calc(100vw - 80px), 1200px" className={styles.recoveryImage} />
        </div>
      </section>

      <section id="our-approach" className={styles.approach} aria-labelledby="approach-title" tabIndex={-1}>
        <div className={styles.approachIntro}>
          <p className={styles.eyebrow}>03 / A RESPONSE BUILT ON TRUST</p>
          <h2 id="approach-title">Care starts<br />with <em>clarity.</em></h2>
          <p>Nivaran has not yet deployed a flood response. This appeal raises funds for a planned response while our existing healthcare and education work continues.</p>
          <Link href="/sanjeevani" className={styles.textLink}>Explore our ongoing healthcare work <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <ol className={styles.commitments}>
          <li><span>01</span><div><h3>A defined response</h3><p>Response locations, delivery arrangements and the budget will be published as they are confirmed.</p></div></li>
          <li><span>02</span><div><h3>A clear purpose for gifts</h3><p>Your donation is recorded under the Nepal flood appeal and identified on your receipt. The gift-use policy is shown beside the form.</p></div></li>
          <li><span>03</span><div><h3>Updates you can follow</h3><p>Any deployment updates will identify dates, locations, activities and spending, with progress reported separately for this appeal.</p></div></li>
        </ol>
      </section>

      <section id="get-involved" className={styles.involvement} aria-labelledby="involvement-title" tabIndex={-1}>
        <div className={styles.involvementIntro}>
          <p className={styles.eyebrow}>04 / STAND WITH NEPAL</p>
          <h2 id="involvement-title">There is a place<br />for your <em>kindness.</em></h2>
          <p>Choose a one-time or monthly gift to support Nivaran’s planned flood response.</p>
        </div>
        <div className={styles.involvementActions}>
          <a href="#flood-giving" className={styles.primary}>Donate to this appeal <ArrowUpRight size={19} aria-hidden="true" /></a>
          <div className={styles.generalGift}>
            <h4>Have another way to help?</h4>
            <p>Speak with our team about relevant experience, resources, partnerships, or a larger gift.</p>
            <Link href="/contact-us" className={styles.textLink}>Contact the Nivaran team <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div><p className={styles.eyebrow}>BEFORE YOU TAKE THE NEXT STEP</p><h2 id="faq-title">Your questions.<br /><em>Clear answers.</em></h2></div>
        <div className={styles.questions}>
          {questions.map((item) => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
        </div>
      </section>
      <div className={styles.closing}><p>Together, with Nivaran.</p><Link href="/campaigns">Explore all campaigns <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </article>
  );
}
