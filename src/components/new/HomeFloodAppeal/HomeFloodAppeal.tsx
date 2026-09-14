import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NEPAL_RESPONSE } from "@/content/nepal-response";
import styles from "./HomeFloodAppeal.module.css";

export default function HomeFloodAppeal() {
  return (
    <section
      id="nepal-flood-appeal"
      className={styles.appeal}
      aria-labelledby="home-flood-title"
    >
      <div className={styles.landscape}>
        <Image
          src="/hero_img/nepal-flood-river.webp"
          alt="Floodwater rushing through a mountain valley beside damaged roads and homes"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Nepal flood recovery appeal
          </p>
          <h2 id="home-flood-title">
            Help Nepal<br /><em>find its way home.</em>
          </h2>
          <p className={styles.description}>
            Stand with families facing the long road to recovery.
            Help fund Nivaran’s planned flood response.
          </p>
          <div className={styles.actions}>
            <Link href={NEPAL_RESPONSE.floodFundUrl} className={styles.donate}>
              Donate to this appeal <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <Link href="/donate/nepal-flood-recovery" className={styles.explore}>
              Explore the campaign <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.givingNote}>Give once. Or stand with Nepal every month.</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.signature}>With Nepal. For the road ahead.</p>
        </div>
      </div>
    </section>
  );
}
