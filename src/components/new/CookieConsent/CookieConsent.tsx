"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "nivaran_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so the banner appears after page load, not during
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[9998] p-4 sm:p-6 animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-700 flex-1">
          We use cookies and analytics to improve your experience and measure
          site traffic. By continuing, you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="underline text-primary-main hover:text-primary-main/80"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-white bg-primary-main rounded-lg hover:bg-primary-main/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
