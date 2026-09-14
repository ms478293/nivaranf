"use client";

import { useEffect } from "react";
import Link from "next/link";

// Google Ads "Donation completed" conversion.
// TODO: Replace AW-PLACEHOLDER/CONVERSION_LABEL with the actual values from
// Google Ads (Goals > Conversions > "Donation completed" > Tag setup).
const GOOGLE_ADS_SEND_TO = "AW-PLACEHOLDER/CONVERSION_LABEL";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function DonateThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_SEND_TO,
      });
    }
  }, []);

  return (
    <main className="font-Poppins w-full min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">🙏</div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your generosity helps Nivaran Foundation bring healthcare and education
          to Nepal&apos;s most underserved communities. A receipt has been sent
          to your email.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
