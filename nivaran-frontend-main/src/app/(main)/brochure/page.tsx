"use client";

import { useEffect } from "react";

function download(pdfURL: string, newTab: Window) {
  const link = document.createElement("a");
  link.href = pdfURL;
  link.download = "nivaran-brochure.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  newTab?.close();
}

const BrochureDownload = () => {
  const pdfURL = "/brochure.pdf";
  useEffect(() => {
    const newTab = window.open(pdfURL, "_blank");
    if (newTab) {
      download(pdfURL, newTab);
    } else {
      if (newTab)
        console.warn("Popup blocked! Allow popups for automatic download.");
      download(pdfURL, newTab);
    }

    setTimeout(() => {
      window.history.back();
    }, 200);
  }, []);
  return <p>Downloading...</p>;
};

export default BrochureDownload;
