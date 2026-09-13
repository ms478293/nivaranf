"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import NivaranFooter from "@/components/new/NivaranFooter/NivaranFooter";
import { WhatsAppButton } from "@/components/new/WhatsAppButton/WhatsAppButton";
import NivaranHeader from "@/components/new/nivaranHeader/NivaranHeader";
import NivaranLogo from "@/components/new/nivaranHeader/NivaranLogo";
import styles from "./DonationPage.module.css";

export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname !== "/donate" && !pathname.startsWith("/donate/")) {
    return <><NivaranHeader /><main id="main-content" className="relative pt-28">{children}</main><WhatsAppButton /><NivaranFooter /></>;
  }
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" aria-label="Nivaran Foundation home"><NivaranLogo className={styles.logo} /></Link>
        <span className={styles.secure}><LockKeyhole size={14} aria-hidden="true" /> Secure giving</span>
        <Link href="/" className={styles.back}><ArrowLeft size={14} aria-hidden="true" />Back to website</Link>
      </header>
      <main id="main-content">{children}</main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Nivaran Foundation Inc. · EIN 41-2656587</span>
        <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-service">Terms</Link><Link href="/contact-us">Contact us</Link></div>
      </footer>
    </div>
  );
}
