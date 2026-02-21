"use client";

import { useMemo, useState } from "react";
import styles from "./article-template.module.css";

type ArticleShareButtonsProps = {
  url: string;
  title: string;
  shareMessage?: string;
};

const ArticleShareButtons = ({
  url,
  title,
  shareMessage,
}: ArticleShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);

  const resolvedShareMessage = useMemo(() => {
    if (!shareMessage) {
      return `${title} ${url}`;
    }

    if (shareMessage.includes("{URL}")) {
      return shareMessage.replace("{URL}", url);
    }

    return `${shareMessage} ${url}`;
  }, [shareMessage, title, url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedShareMessage = encodeURIComponent(resolvedShareMessage);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      console.error("Failed to copy text:", error);
      return false;
    }
  };

  const copyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const shareToInstagram = async () => {
    const success = await copyToClipboard(resolvedShareMessage);
    if (success) {
      setInstagramCopied(true);
      setTimeout(() => setInstagramCopied(false), 2200);
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.shareButtons}>
      <a
        className={`${styles.shareButton} ${styles.shareButtonFacebook}`}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        className={`${styles.shareButton} ${styles.shareButtonLinkedin}`}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        className={`${styles.shareButton} ${styles.shareButtonX}`}
        href={`https://twitter.com/intent/tweet?text=${encodedShareMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        X
      </a>
      <a
        className={`${styles.shareButton} ${styles.shareButtonWhatsapp}`}
        href={`https://wa.me/?text=${encodedShareMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <button
        className={`${styles.shareButton} ${styles.shareButtonInstagram}`}
        onClick={shareToInstagram}
        type="button"
        aria-label="Share on Instagram (copies caption and link)"
      >
        {instagramCopied ? "Instagram copied" : "Instagram"}
      </button>
      <button className={styles.shareButton} onClick={copyLink} type="button">
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
};

export default ArticleShareButtons;
