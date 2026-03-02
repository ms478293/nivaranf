"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types for the Square Web Payments SDK (minimal)                    */
/* ------------------------------------------------------------------ */
interface SquarePayments {
  card: (options?: Record<string, any>) => Promise<SquareCard>;
}
interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: any[] }>;
  destroy: () => Promise<void>;
}
declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<SquarePayments>;
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
const SQUARE_SDK_URL = "https://web.squarecdn.com/v1/square.js";

const PRESET_AMOUNTS = [5, 10, 20, 50, 100];

type PaymentStatus = "idle" | "loading" | "success" | "error";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SquarePaymentForm() {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardInstanceRef = useRef<SquareCard | null>(null);

  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [email, setEmail] = useState("");
  const [donorName, setDonorName] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  const donationAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  /* ---- Load Square SDK script ---- */
  useEffect(() => {
    // If Square is already on window, we're good
    if (window.Square) {
      setSdkReady(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const checkSquare = () => {
      if (window.Square) {
        setSdkReady(true);
        return true;
      }
      return false;
    };

    const existing = document.querySelector(`script[src="${SQUARE_SDK_URL}"]`) as HTMLScriptElement | null;
    if (existing) {
      // Script tag exists — it may already be loaded or still loading
      if (checkSquare()) return;
      // Poll for window.Square (handles already-loaded + race conditions)
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (checkSquare()) {
          clearInterval(poll);
        } else if (attempts > 50) {
          // 5 seconds max wait
          clearInterval(poll);
          setSdkError(true);
        }
      }, 100);
      return () => clearInterval(poll);
    }

    const script = document.createElement("script");
    script.src = SQUARE_SDK_URL;
    script.async = true;
    script.onload = () => {
      // Square may take a moment to populate window.Square after script load
      const waitForSquare = setInterval(() => {
        if (window.Square) {
          clearInterval(waitForSquare);
          setSdkReady(true);
        }
      }, 50);
      // Timeout after 5s
      timeoutId = setTimeout(() => {
        clearInterval(waitForSquare);
        if (!window.Square) setSdkError(true);
      }, 5000);
    };
    script.onerror = () => {
      console.error("Failed to load Square Web Payments SDK");
      setSdkError(true);
    };
    document.head.appendChild(script);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  /* ---- Initialize card element when SDK ready ---- */
  useEffect(() => {
    if (!sdkReady || !window.Square) return;

    let cancelled = false;

    (async () => {
      try {
        const payments = await window.Square!.payments(
          SQUARE_APP_ID,
          SQUARE_LOCATION_ID
        );
        const card = await payments.card({
          style: {
            ".input-container": {
              borderRadius: "8px",
            },
            ".message-text": {
              color: "#73757b",
            },
          },
        });
        if (cancelled) {
          card.destroy();
          return;
        }
        await card.attach("#square-card-container");
        cardInstanceRef.current = card;
        setCardReady(true);
      } catch (err) {
        console.error("Square card init error:", err);
        if (!cancelled) setSdkError(true);
      }
    })();

    return () => {
      cancelled = true;
      cardInstanceRef.current?.destroy();
      cardInstanceRef.current = null;
      setCardReady(false);
    };
  }, [sdkReady]);

  /* ---- Handle payment ---- */
  const handlePay = useCallback(async () => {
    if (!cardInstanceRef.current || donationAmount < 1) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Tokenize the card
      const result = await cardInstanceRef.current.tokenize();
      if (result.status !== "OK" || !result.token) {
        const msg =
          result.errors?.[0]?.message || "Card verification failed. Please check your details.";
        setErrorMessage(msg);
        setStatus("error");
        return;
      }

      // 2. Send to our API
      const res = await fetch("/api/square/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: result.token,
          amount: donationAmount,
          email: email || undefined,
          name: donorName || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Payment failed. Please try again.");
        setStatus("error");
        return;
      }

      setReceiptUrl(data.payment.receiptUrl || "");
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }, [donationAmount, email, donorName]);

  /* ---- Success state ---- */
  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" data-donation-form>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Thank You for Your Donation!
        </h3>
        <p className="text-green-700 mb-2">
          Your generous gift of <strong>${donationAmount.toLocaleString("en-US")}</strong> will
          help save lives through healthcare and education in Nepal.
        </p>
        <p className="text-sm text-green-600 mb-4">
          501(c)(3) Tax-Deductible | EIN: 41-2656587
        </p>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            View Receipt
          </a>
        )}
        <button
          onClick={() => {
            setStatus("idle");
            setReceiptUrl("");
          }}
          className="block mx-auto mt-4 text-sm text-green-600 underline hover:text-green-800"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl border border-gray-200 bg-neutral-50 p-5 md:p-6"
      data-donation-form
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          Secure Donation
        </h3>
        <p className="text-xs text-gray-500">
          Powered by Square · 256-bit encryption · PCI compliant
        </p>
      </div>

      {/* Amount Selection */}
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Select Amount
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setSelectedAmount(amt);
                setIsCustom(false);
              }}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${
                !isCustom && selectedAmount === amt
                  ? "bg-primary-500 text-white shadow-md scale-105"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              isCustom
                ? "bg-primary-500 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:border-primary-500"
            }`}
          >
            Custom
          </button>
          {isCustom && (
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Optional: Donor info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Name (optional)
          </label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Email (for receipt)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Card element */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-600 mb-2 block">
          Card Details
        </label>
        {sdkError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <p className="text-sm text-amber-800 mb-3">
              Secure payment form could not load. You can donate directly via Square:
            </p>
            <a
              href="https://square.link/u/Ch7Es46t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors"
            >
              Donate via Square →
            </a>
          </div>
        ) : (
          <div
            id="square-card-container"
            ref={cardContainerRef}
            className="min-h-[90px] bg-white rounded-lg border border-gray-300 overflow-hidden"
          >
            {!cardReady && (
              <div className="flex flex-col items-center justify-center h-[90px] text-sm text-gray-400 gap-2">
                <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading secure payment form…
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {status === "error" && errorMessage && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Pay Button */}
      <button
        type="button"
        onClick={handlePay}
        disabled={!cardReady || donationAmount < 1 || status === "loading"}
        className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
          !cardReady || donationAmount < 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : status === "loading"
            ? "bg-primary-400 text-white cursor-wait"
            : "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg active:scale-[0.98]"
        }`}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing…
          </span>
        ) : donationAmount >= 1 ? (
          `Donate $${donationAmount.toLocaleString("en-US")} Securely`
        ) : (
          "Select an Amount"
        )}
      </button>

      {/* Trust badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure & Encrypted
        </span>
        <span>•</span>
        <span>501(c)(3) Tax-Deductible</span>
        <span>•</span>
        <span>EIN: 41-2656587</span>
      </div>
    </div>
  );
}
