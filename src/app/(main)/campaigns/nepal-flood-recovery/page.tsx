import type { Metadata } from "next";
import Link from "next/link";
import { NEPAL_RESPONSE } from "@/content/nepal-response";
import styles from "./response.module.css";

const url = "https://www.nivaranfoundation.org/campaigns/nepal-flood-recovery";

export const metadata: Metadata = {
  title: "Nepal Floods 2026: Verified Needs & How to Help | Nivaran Foundation",
  description:
    "A sourced briefing on the August 26, 2026 Bhote Koshi flood disaster in Rasuwa, Nuwakot and Dhading — what happened, what is needed, and exactly what Nivaran has and has not done.",
  alternates: { canonical: url },
  openGraph: {
    title: "Nepal floods 2026 | Nivaran Foundation",
    description: "Understand the need. Know exactly what your support funds.",
    url,
    type: "website",
  },
};

export default function FloodRecoveryPage() {
  const { figures, priorities, sources, districts, floodFundUrl, target } = NEPAL_RESPONSE;

  return (
    <div className={`font-Poppins ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.contours} aria-hidden="true">
          <svg viewBox="0 0 700 650" fill="none">
            <path
              d="M80 650Q560 530 420 350T620 0M140 650Q620 530 480 350T680 0M20 650Q500 530 360 350T560 0M-40 650Q440 530 300 350T500 0M-100 650Q380 530 240 350T440 0M-160 650Q320 530 180 350T380 0"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className={styles.heroInner}>
          <Link href="/campaigns" className="text-sm underline underline-offset-4">
            All Nepal campaigns
          </Link>
          <p className={styles.eyebrow}>Nivaran Foundation · Emergency appeal</p>
          <h1>
            A glacier fell on Nepal.
            <br />
            <span>Whole valleys are still cut off.</span>
          </h1>
          <p className={styles.intro}>
            On August 26 a collapsing glacier sent the Bhote Koshi river through five districts.
            More than a thousand people are dead, thousands more are missing, and the roads that
            reached the survivors no longer exist.
          </p>
          <a href="#help" className={styles.action}>
            See how you can help <span aria-hidden="true">↗</span>
          </a>
          <p className={styles.dateline}>
            Situation reviewed September 5, 2026 · Nivaran has not yet deployed — we are raising to
            deploy
          </p>
        </div>
      </section>

      <div className={styles.body}>
        <section className={styles.section}>
          <div>
            <p className={styles.label}>01 / The situation</p>
            <h2>
              What happened.
              <br />
              What is needed.
            </h2>
          </div>
          <div>
            <p>{NEPAL_RESPONSE.cause}</p>
            <p>
              The worst-hit districts are {districts.slice(0, -1).join(", ")} and{" "}
              {districts[districts.length - 1]}. Rasuwa remains the hardest to reach: the road from
              Betrawati up to the Rasuwagadhi border crossing was destroyed along its length.
            </p>
            <dl className={styles.figures}>
              {figures.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>
                    {f.label}
                    <a href={f.href} target="_blank" rel="noopener noreferrer">
                      <span>{f.attribution}</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.note}>
              Every figure above is attributed to the organisation that reported it and links to
              that report. Where official counts differ between sources, we show the range rather
              than pick a number. None of these figures describe Nivaran activity, and none of these
              organisations are partners of Nivaran.
            </p>
          </div>
        </section>

        <section className={styles.priorities}>
          <p className={styles.label}>02 / Proposed priorities</p>
          <h2>Help shaped by the need.</h2>
          <div>
            {priorities.map((p, i) => (
              <article key={p.title}>
                <span>0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div>
            <p className={styles.label}>03 / Our role</p>
            <h2>What we have not done yet.</h2>
          </div>
          <div>
            <p>
              Nivaran Foundation has <strong>not</strong> delivered flood relief. We have no team in
              the flood districts today, and nothing on this page should be read as a report of work
              already done.
            </p>
            <p>
              What we have is an existing healthcare programme in Nepal — Project Sanjeevani — and a
              reason to extend it. This appeal funds that extension. If we cannot raise enough to
              mount a credible response, contributions stay with Nivaran&rsquo;s ongoing Nepal
              healthcare work and we will say so publicly.
            </p>
            <dl className={styles.status}>
              <div>
                <dt>Relief delivered to date</dt>
                <dd>None. This is a pre-deployment appeal.</dd>
              </div>
              <div>
                <dt>Local delivery team &amp; locations</dt>
                <dd>To be confirmed before any restricted funds are spent</dd>
              </div>
              <div>
                <dt>Response budget &amp; launch date</dt>
                <dd>{target ? target : "To be published when approved"}</dd>
              </div>
              <div>
                <dt>Verified flood campaign totals</dt>
                <dd>Not yet published</dd>
              </div>
            </dl>
            <Link href="/sanjeevani">Explore our existing healthcare work →</Link>
          </div>
        </section>

        <section id="help" className={styles.help}>
          <p className={styles.label}>04 / Take part</p>
          <h2>Choose your next step.</h2>
          {floodFundUrl ? (
            <>
              <p>
                Gifts to the flood fund are collected separately from general donations so that
                receipts, spending and any unused balance can be reported against this appeal alone.
              </p>
              <div className={styles.actions}>
                <a
                  href={floodFundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.action}
                >
                  Give to Nepal flood relief ↗
                </a>
                <Link href="/donate" className={styles.secondary}>
                  Support Nivaran&rsquo;s general Nepal work →
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* This paragraph is only true while the "nepal-flood-recovery" designation is visible:false
                  in src/content/donation-designations.ts. When it is enabled, set floodFundUrl to
                  "/donate?designation=nepal-flood-recovery" (and make the <a> above a <Link>) so this branch retires. */}
              <p>
                The dedicated flood fund is being set up so that flood gifts can be tracked and
                reported separately. Until it opens, our existing checkout accepts{" "}
                <strong>general</strong> contributions to Nivaran&rsquo;s Nepal work — it does not
                reserve your gift for this flood response, and we will not pretend otherwise.
              </p>
              <div className={styles.actions}>
                <Link href="/donate" className={styles.action}>
                  Support Nivaran&rsquo;s Nepal work ↗
                </Link>
                <Link href="/contact-us" className={styles.secondary}>
                  Tell me when the flood fund opens →
                </Link>
              </div>
            </>
          )}
          <p className={styles.note}>
            Before making a large or flood-restricted gift, ask us in writing for the project scope,
            use of funds, reporting schedule and unused-funds policy. We would rather answer that
            question than take the money without it.
          </p>
        </section>

        <section className={styles.section}>
          <div>
            <p className={styles.label}>05 / Follow the facts</p>
            <h2>Updates you can check.</h2>
          </div>
          <div>
            <p>
              <time dateTime="2026-09-05">September 5, 2026</time> — Situation briefing published
              from public reporting by WHO, UNICEF and news agencies. Nivaran has not deployed. No
              delivery figures, fundraising totals or partnerships are claimed.
            </p>
            <p className={styles.note}>
              Next review: this page is checked while the emergency is active. When Nivaran does
              deploy, each update will state the date, the district, what was delivered, who
              delivered it, what it cost, and what remains needed.
            </p>
            <ul className={styles.sources}>
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/financial-reports">Nivaran reporting and organisation status →</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
