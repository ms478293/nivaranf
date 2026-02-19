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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
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
      <button className={styles.shareButton} onClick={copyLink} type="button">
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
};

export default ArticleShareButtons;
