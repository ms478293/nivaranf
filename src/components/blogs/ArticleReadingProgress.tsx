"use client";

import { useEffect, useState } from "react";
import styles from "./article-template.module.css";

const ArticleReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min((scrollTop / documentHeight) * 100, 100);
      setProgress(nextProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className={styles.readingProgressTrack} aria-hidden="true">
      <div
        className={styles.readingProgressFill}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ArticleReadingProgress;
