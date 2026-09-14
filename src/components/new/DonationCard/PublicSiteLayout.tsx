"use client";

import { usePathname } from "next/navigation";
import { DESIGNATIONS } from "@/content/donation-designations";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import { WhatsAppButton } from "@/components/new/WhatsAppButton/WhatsAppButton";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import NivaranLogo from "@/components/new/nivaranHeader/NivaranLogo";
import styles from "./DonationPage.module.css";

export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFloodCampaign = pathname === "/donate/nepal-flood-recovery" && DESIGNATIONS.find((item) => item.id === "nepal-flood-recovery")?.visible;
  if (pathname !== "/donate" && !pathname.startsWith("/donate/")) {
    return <><NivaranHeader /><main id="main-content" className={pathname === "/campaigns" ? "relative" : "relative pt-28"}>{children}</main><WhatsAppButton /><NivaranFooter /></>;
  }
  return (
    <div className={styles.shell} data-flood-campaign={isFloodCampaign ? "true" : undefined} data-manage={pathname === "/donate/manage" ? "true" : undefined}>
      <header className={styles.header}>
        <Link href="/" aria-label="Nivaran Foundation home"><NivaranLogo className={styles.logo} /></Link>
        <span className={styles.secure}><LockKeyhole size={14} aria-hidden="true" /> Secure giving</span>
        <Link href={isFloodCampaign ? "/campaigns" : "/"} className={styles.back}><ArrowLeft size={14} aria-hidden="true" />{isFloodCampaign ? "All campaigns" : "Back to website"}</Link>
      </header>
      <main id="main-content">{children}</main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Nivaran Foundation Inc. · EIN 41-2656587</span>
        <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-service">Terms</Link><Link href="/contact-us">Contact us</Link></div>
      </footer>
    </div>
  );
}
