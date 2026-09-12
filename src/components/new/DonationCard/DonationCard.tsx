"use client";

import { AppButton } from "@/components/ui/app-button";
import {
  DESIGNATIONS,
  STATUS_BADGE,
  VARIANCE_NOTE,
  feeCentsFor,
  getDesignation,
  type Dedication,
} from "@/content/donation-designations";
import { trackDonateClick, trackDonation } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AMOUNTS = [25, 50, 100, 250, 500] as const;
const DEFAULT_AMOUNT = 250;
const MIN_DOLLARS = 5;
const MAX_DOLLARS = 25_000;
const MIN_CENTS = MIN_DOLLARS * 100;
const MAX_CENTS = MAX_DOLLARS * 100;
const SUPPORT_EMAIL = "donations@nivaranfoundation.org";
const SHARE_URL = "https://www.nivaranfoundation.org/donate";
const SHARE_TEXT = "I just supported Nivaran Foundation's healthcare and education work in Nepal.";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GoDaddy Payments (Poynt Collect): card fields render inside GoDaddy's iframe and
// come back as a single-use nonce. Card data never touches our code or server.
const COLLECT_SDK_URL = "https://collect.commerce.godaddy.com/sdk.js";
const CARD_ELEMENT_ID = "godaddy-card-element";

type CollectEvent<T> = { type?: string; data: T };
type CollectError = { message?: string; type?: string; source?: string };
type NonceData = {
  nonce: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  zipCode?: string;
};
type Collect = {
  mount: (elementId: string, doc: Document, options: Record<string, unknown>) => void;
  unmount: (elementId: string, doc: Document) => void;
  on: (event: string, cb: (e: CollectEvent<Record<string, unknown>>) => void) => void;
  getNonce: (payload?: Record<string, string>) => void;
};
type TokenizeJsCtor = new (businessId: string, applicationId: string) => Collect;

let sdkPromise: Promise<TokenizeJsCtor> | null = null;
function loadCollectSdk(): Promise<TokenizeJsCtor> {
  const w = window as unknown as { TokenizeJs?: TokenizeJsCtor };
  if (w.TokenizeJs) return Promise.resolve(w.TokenizeJs);
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = COLLECT_SDK_URL;
      script.async = true;
      script.onload = () =>
        w.TokenizeJs
          ? resolve(w.TokenizeJs)
          : reject(new Error("Payment form failed to load. Please refresh and try again."));
      script.onerror = () => {
        sdkPromise = null;
        reject(new Error("Payment form failed to load. Please refresh and try again."));
      };
      document.head.appendChild(script);
    });
  }
  return sdkPromise;
}

// Poynt Collect styling (labels-enabled mode: docs.poynt.com/collect custom-css). Valid keys here are
// container, inputDefault, inputLabel, requiredMark, sectionLabel, inputError and row*; each value is a
// styled-components template string (supports &:focus, &:hover, @media). Colors = tailwind.config tokens:
// gray-200 #d1d1d1, gray-400 #808080, gray-600 #5d5d5d, gray-950 #262626, primary-300 #f7a07a,
// primary-500 #eb5834, red-600 #dc2626.
const COLLECT_FONT =
  "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const COLLECT_CUSTOM_CSS = {
  container: `font-family: ${COLLECT_FONT}; color: #262626; background: transparent; padding: 0; margin: 0; -webkit-font-smoothing: antialiased;`,
  sectionLabel: "display: none;",
  inputLabel:
    "display: block; margin: 0 0 6px 0; font-family: inherit; font-size: 14px; font-weight: 500; line-height: 1.3; color: #5d5d5d;",
  requiredMark: "color: #eb5834; margin-left: 2px;",
  inputDefault:
    "box-sizing: border-box; width: 100%; height: 48px; padding: 0 14px; margin: 0; font-family: inherit; font-size: 15px; line-height: 1.4; font-weight: 400; color: #262626; background: #ffffff; border: 1px solid #d1d1d1; border-radius: 12px; box-shadow: none; outline: none; transition: border-color 150ms ease, box-shadow 150ms ease; &::placeholder { color: #808080; opacity: 1; } &:hover { border-color: #f7a07a; } &:focus { border-color: #eb5834; box-shadow: 0 0 0 3px rgba(235, 88, 52, 0.22); } &[data-error=\"true\"] { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15); }",
  inputError: "display: block; margin: 6px 0 0 0; font-family: inherit; font-size: 13px; line-height: 1.4; color: #dc2626;",
  rowCardNumber: "padding: 0; margin: 0 0 14px 0; width: 100%;",
  rowExpiration:
    "padding: 0 6px 0 0; margin: 0 0 14px 0; box-sizing: border-box; width: 50%; @media (max-width: 420px) { width: 100%; padding: 0; }",
  rowCVV:
    "padding: 0 0 0 6px; margin: 0 0 14px 0; box-sizing: border-box; width: 50%; @media (max-width: 420px) { width: 100%; padding: 0; }",
  rowZip: "padding: 0; margin: 0; width: 100%;",
  rowFirstName: "display: none;",
  rowLastName: "display: none;",
  rowEmailAddress: "display: none;",
};

const COLLECT_MOUNT_OPTIONS = {
  displayComponents: {
    labels: true,
    zipCode: true,
    firstName: false,
    lastName: false,
    emailAddress: false,
  },
  paymentMethods: ["card"],
  inlineErrors: true,
  iFrame: { width: "100%", border: "0", borderRadius: "0", boxShadow: "none" },
  style: { theme: "default" },
  customCss: COLLECT_CUSTOM_CSS,
};

type DedicationType = Dedication["type"];

type ChargeResult = {
  transactionId?: string;
  baseAmountCents: number;
  feeCents: number;
  totalCents: number;
  cardType?: string;
  last4?: string;
  email: string;
  designation: string;
  dedication: Dedication | null;
};

type Step = "amount" | "card" | "done";

function formatCents(cents: number) {
  const whole = cents % 100 === 0;
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
const dedicationLabel = (t: DedicationType) => (t === "honor" ? "In honor of" : "In memory of");

// ── Tailwind class groups (single source; fontSize keys are the custom scale: xsm 12 / sm 14 / md 16 / lg 20 / xl 24 / 2xl 32) ──
const cls = {
  card: "w-full h-fit rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm",
  eyebrow: "text-xsm font-semibold uppercase tracking-[0.14em] text-primary-600",
  h2: "text-xl sm:text-2xl font-semibold leading-tight text-gray-950 outline-none",
  sub: "text-sm leading-snug text-gray-600",
  label: "block text-sm font-medium text-gray-600 mb-1.5",
  help: "mt-1.5 text-xsm leading-snug text-gray-500",
  input:
    "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-md text-gray-950 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500",
  radio: "sr-only peer",
  amountTile:
    "flex h-16 sm:h-[4.5rem] cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-2 text-lg sm:text-xl font-semibold text-gray-800 transition-colors hover:border-primary-300 peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2",
  designationTile:
    "flex h-full cursor-pointer flex-col gap-1 rounded-xl border border-gray-200 bg-white p-3.5 text-left transition-colors hover:border-primary-300 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2",
  badge: "mt-1 w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xsm font-medium text-gray-700",
  checkRow: "flex cursor-pointer items-start gap-3 text-sm leading-snug text-gray-800",
  checkbox:
    "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  cta: "h-14 w-full rounded-xl bg-primary-500 text-md font-semibold text-white hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  linkBtn: "text-sm font-medium text-primary-600 underline-offset-4 hover:underline",
  error: "text-sm leading-snug text-red-600",
  summary: "rounded-xl bg-primary-50 px-4 py-2 divide-y divide-primary-100",
  summaryRow: "flex items-baseline justify-between gap-4 py-2 text-sm",
  doneRows: "divide-y divide-gray-100 rounded-xl border border-gray-200 px-4 text-sm",
  outlineBtn: "h-12 rounded-xl px-6 text-sm font-semibold text-primary-600",
};

const TrustRow = () => (
  <div className="flex flex-col items-center gap-1 text-center text-xsm text-gray-500">
    <p className="flex items-center gap-1.5">
      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      Secured by GoDaddy Payments. Your card details never touch our servers.
    </p>
    <p>
      Nivaran Foundation Inc. · EIN 41-2656587 ·{" "}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-2 hover:text-gray-700">
        {SUPPORT_EMAIL}
      </a>
    </p>
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-4 py-2.5">
    <dt className="text-gray-600">{k}</dt>
    <dd className="text-right font-medium text-gray-950">{v}</dd>
  </div>
);

const DonationCard = () => {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("amount");
  const [selected, setSelected] = useState<number | "other">(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState("");
  const [designationId, setDesignationId] = useState("general");
  const [dedicate, setDedicate] = useState(false);
  const [dedicationType, setDedicationType] = useState<DedicationType>("honor");
  const [dedicationName, setDedicationName] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formReady, setFormReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ChargeResult | null>(null);

  const collectRef = useRef<Collect | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const customAmountRef = useRef<HTMLInputElement>(null);
  const prevStep = useRef<Step>("amount");

  // ── derived ──
  const baseDollars = selected === "other" ? Number(customAmount) || 0 : selected;
  const baseCents = Math.round(baseDollars * 100);
  const rawFee = feeCentsFor(baseCents);
  const feeCents = coverFees ? rawFee : 0;
  const totalCents = baseCents + feeCents;
  const amountOk = Number.isFinite(baseDollars) && baseCents >= MIN_CENTS && totalCents <= MAX_CENTS;
  const designation = getDesignation(designationId);
  const dedication: Dedication | null =
    dedicate && dedicationName.trim() ? { type: dedicationType, name: dedicationName.trim() } : null;

  // Latest values for the SDK callbacks (their closures are created once per mount).
  const payloadRef = useRef({
    baseCents,
    coverFees,
    designationId: designation.id,
    dedication,
    firstName,
    lastName,
    email,
    submitting,
  });
  useEffect(() => {
    payloadRef.current = {
      baseCents,
      coverFees,
      designationId: designation.id,
      dedication,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      submitting,
    };
  });

  // ── deep links: ?amount=  ?designation= ──
  useEffect(() => {
    const d = searchParams.get("designation");
    if (d) setDesignationId(getDesignation(d).id);
    const amountParam = searchParams.get("amount");
    if (!amountParam) return;
    const dollars = Number(amountParam);
    if (!Number.isFinite(dollars) || dollars < MIN_DOLLARS) return;
    if ((AMOUNTS as readonly number[]).includes(dollars)) {
      setSelected(dollars);
    } else {
      setSelected("other");
      setCustomAmount(String(Math.round(dollars)));
    }
  }, [searchParams]);

  // ── focus management: heading on every step change, never on first paint ──
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  // ── mount the GoDaddy card form on the card step; unmount when we leave ──
  useEffect(() => {
    if (step !== "card") return;
    let cancelled = false;
    let collect: Collect | null = null;
    setFormReady(false);

    loadCollectSdk()
      .then((TokenizeJs) => {
        if (cancelled) return;
        const businessId = process.env.NEXT_PUBLIC_GD_BUSINESS_ID;
        const applicationId = process.env.NEXT_PUBLIC_GD_APP_ID;
        if (!businessId || !applicationId) {
          throw new Error("Online donations are temporarily unavailable. Please try again later.");
        }
        collect = new TokenizeJs(businessId, applicationId);
        collect.on("ready", () => {
          if (!cancelled) setFormReady(true);
        });
        collect.on("iframe_height_change", (e) => {
          const height = Number((e.data as { height?: number })?.height);
          const frame = document.querySelector<HTMLIFrameElement>(`#${CARD_ELEMENT_ID} iframe`);
          if (frame && height > 0) frame.style.height = `${height}px`;
        });
        collect.on("error", (e) => {
          if (cancelled) return;
          const raw = e.data as { error?: CollectError } & CollectError;
          const err = raw?.error ?? raw;
          // inlineErrors:true → Poynt emits source:"field" on every keystroke validation; the iframe shows those.
          if (err?.source === "field") return;
          if (!payloadRef.current.submitting) return;
          setSubmitting(false);
          if (err?.type === "invalid_details" || err?.type === "missing_fields") {
            setError("Please check the highlighted card details.");
            return;
          }
          setError(err?.message || "Please check your card details and try again.");
        });
        collect.on("nonce", (e) => {
          if (!cancelled) void charge(e.data as unknown as NonceData);
        });
        collect.mount(CARD_ELEMENT_ID, document, COLLECT_MOUNT_OPTIONS);
        collectRef.current = collect;
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Payment form failed to load.");
      });

    return () => {
      cancelled = true;
      collectRef.current = null;
      try {
        collect?.unmount(CARD_ELEMENT_ID, document);
      } catch {
        /* iframe already gone */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const charge = async (data: NonceData) => {
    const p = payloadRef.current;
    try {
      const response = await fetch("/api/donate/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce: data.nonce,
          amountCents: p.baseCents,
          coverFees: p.coverFees,
          designation: p.designationId,
          dedication: p.dedication,
          email: p.email,
          firstName: p.firstName,
          lastName: p.lastName,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as ChargeResult & { error?: string };
      if (!response.ok || payload.error) {
        throw new Error(payload.error || "We couldn't process your donation. Please try again.");
      }
      trackDonation(payload.totalCents / 100);
      setResult(payload);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't process your donation.");
    } finally {
      setSubmitting(false);
    }
  };

  const continueToCard = () => {
    if (!amountOk) {
      setError(
        totalCents > MAX_CENTS
          ? `For gifts over $25,000, please write to ${SUPPORT_EMAIL} so we can arrange a transfer.`
          : `Please enter an amount of at least $${MIN_DOLLARS}.`
      );
      return;
    }
    if (dedicate && !dedicationName.trim()) {
      setError("Please add the name of the person you are dedicating this gift to, or untick the dedication.");
      return;
    }
    setError("");
    trackDonateClick(baseCents / 100);
    setStep("card");
  };

  const submitCard = () => {
    if (!collectRef.current || submitting) return;
    const f = firstName.trim();
    const l = lastName.trim();
    const m = email.trim();
    if (!f || !l) {
      setError("Please enter your first and last name.");
      firstNameRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(m)) {
      setError("Please enter a valid email address so we can send your receipt.");
      return;
    }
    setError("");
    setSubmitting(true);
    collectRef.current.getNonce({ emailAddress: m, firstName: f, lastName: l });
  };

  const backToAmount = () => {
    setError("");
    setSubmitting(false);
    setStep("amount");
  };

  const donateAgain = () => {
    setResult(null);
    setError("");
    setStep("amount");
  };

  const doneDesignation = result ? getDesignation(result.designation) : designation;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
  const shareFb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`;
  const shareMail = `mailto:?subject=${encodeURIComponent("Nivaran Foundation")}&body=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`;

  return (
    <div id="donate" className={cls.card}>
      <div id="donate-checkout" className="contents">
        {/* ───────────── STEP 1 · amount + designation ───────────── */}
        {step === "amount" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className={cls.eyebrow}>Step 1 of 2 · Your gift</p>
              <h2 ref={headingRef} tabIndex={-1} className={cls.h2}>
                Make a one-time gift
              </h2>
              <p className={cls.sub}>Choose an amount and where you would like it to go.</p>
            </div>

            <fieldset>
              <legend className={cls.label}>Amount (USD)</legend>
              <div className="grid grid-cols-3 gap-3">
                {AMOUNTS.map((amount) => (
                  <div key={amount}>
                    <input
                      type="radio"
                      id={`donate-amount-${amount}`}
                      name="donate-amount"
                      className={cls.radio}
                      checked={selected === amount}
                      onChange={() => setSelected(amount)}
                    />
                    <label htmlFor={`donate-amount-${amount}`} className={cls.amountTile}>
                      {formatCents(amount * 100)}
                    </label>
                  </div>
                ))}
                <div>
                  <input
                    type="radio"
                    id="donate-amount-other"
                    name="donate-amount"
                    className={cls.radio}
                    checked={selected === "other"}
                    onChange={() => {
                      setSelected("other");
                      requestAnimationFrame(() => customAmountRef.current?.focus());
                    }}
                  />
                  <label htmlFor="donate-amount-other" className={cn(cls.amountTile, "text-sm sm:text-md")}>
                    Other
                  </label>
                </div>
              </div>

              {selected === "other" && (
                <div className="mt-3">
                  <label htmlFor="donate-custom-amount" className={cls.label}>
                    Your amount
                  </label>
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-md text-gray-500"
                    >
                      $
                    </span>
                    <input
                      ref={customAmountRef}
                      id="donate-custom-amount"
                      type="number"
                      inputMode="numeric"
                      min={MIN_DOLLARS}
                      max={MAX_DOLLARS}
                      step={1}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="75"
                      className={`${cls.input} pl-8`}
                    />
                  </div>
                  <p className={cls.help}>Between $5 and $25,000. For larger gifts, write to {SUPPORT_EMAIL}.</p>
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend className={cls.label}>Where should it go?</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DESIGNATIONS.filter((d) => d.visible).map((d) => {
                  const badge = STATUS_BADGE[d.status];
                  return (
                    <div key={d.id}>
                      <input
                        type="radio"
                        id={`donate-designation-${d.id}`}
                        name="donate-designation"
                        className={cls.radio}
                        checked={designation.id === d.id}
                        onChange={() => setDesignationId(d.id)}
                      />
                      <label htmlFor={`donate-designation-${d.id}`} className={cls.designationTile}>
                        <span className="text-sm font-semibold text-gray-950">{d.label}</span>
                        <span className="text-xsm leading-snug text-gray-600">{d.caption}</span>
                        {badge && <span className={cls.badge}>{badge}</span>}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xsm leading-snug text-gray-500">{VARIANCE_NOTE}</p>
            </fieldset>

            <div className="flex flex-col gap-3">
              <label className={cls.checkRow}>
                <input
                  type="checkbox"
                  className={cls.checkbox}
                  checked={dedicate}
                  onChange={(e) => setDedicate(e.target.checked)}
                />
                <span>Dedicate this gift to someone</span>
              </label>

              {dedicate && (
                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <fieldset className="flex flex-wrap gap-x-5 gap-y-2">
                    <legend className="sr-only">Dedication type</legend>
                    {(["honor", "memory"] as const).map((t) => (
                      <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                        <input
                          type="radio"
                          name="donate-dedication-type"
                          className="h-4 w-4 accent-primary-500"
                          checked={dedicationType === t}
                          onChange={() => setDedicationType(t)}
                        />
                        {dedicationLabel(t)}
                      </label>
                    ))}
                  </fieldset>
                  <div>
                    <label htmlFor="donate-dedication-name" className={cls.label}>
                      Their name
                    </label>
                    <input
                      id="donate-dedication-name"
                      type="text"
                      maxLength={80}
                      autoComplete="off"
                      value={dedicationName}
                      onChange={(e) => setDedicationName(e.target.value)}
                      placeholder="e.g. Sita Sharma"
                      className={cls.input}
                    />
                    <p className={cls.help}>Appears on your receipt.</p>
                  </div>
                </div>
              )}

              <label className={cls.checkRow}>
                <input
                  type="checkbox"
                  className={cls.checkbox}
                  checked={coverFees}
                  disabled={baseCents < MIN_CENTS}
                  onChange={(e) => setCoverFees(e.target.checked)}
                />
                <span>
                  {baseCents >= MIN_CENTS
                    ? `Add ${formatCents(rawFee)} to help cover card processing costs.`
                    : "Add a little extra to help cover card processing costs."}
                </span>
              </label>
            </div>

            {error && (
              <p role="alert" className={cls.error}>
                {error}
              </p>
            )}

            <AppButton type="button" className={cls.cta} onClick={continueToCard}>
              {amountOk ? `Continue with ${formatCents(totalCents)}` : "Continue"}
            </AppButton>
            <TrustRow />
          </div>
        )}

        {/* ───────────── STEP 2 · details + card ───────────── */}
        {step === "card" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className={cls.eyebrow}>Step 2 of 2 · Your details</p>
              <h2 ref={headingRef} tabIndex={-1} className={cls.h2}>
                Your details
              </h2>
            </div>

            <section className={cls.summary} aria-labelledby="donate-summary-heading">
              <h3 id="donate-summary-heading" className="sr-only">
                Gift summary
              </h3>
              <div className={cls.summaryRow}>
                <span className="text-gray-600">Gift</span>
                <span className="font-semibold text-gray-950">{formatCents(baseCents)}</span>
              </div>
              <div className={cls.summaryRow}>
                <span className="text-gray-600">Designation</span>
                <span className="text-right font-medium text-gray-950">{designation.label}</span>
              </div>
              {dedication && (
                <div className={cls.summaryRow}>
                  <span className="text-gray-600">{dedicationLabel(dedication.type)}</span>
                  <span className="text-right font-medium text-gray-950">{dedication.name}</span>
                </div>
              )}
              {feeCents > 0 && (
                <div className={cls.summaryRow}>
                  <span className="text-gray-600">Processing costs</span>
                  <span className="font-medium text-gray-950">{formatCents(feeCents)}</span>
                </div>
              )}
              <div className={cls.summaryRow}>
                <span className="font-semibold text-gray-950">Total today</span>
                <span className="text-lg font-semibold text-primary-600">{formatCents(totalCents)}</span>
              </div>
              <div className="py-2">
                <button type="button" onClick={backToAmount} className={cls.linkBtn}>
                  Edit gift
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="donate-first-name" className={cls.label}>
                  First name
                </label>
                <input
                  ref={firstNameRef}
                  id="donate-first-name"
                  type="text"
                  autoComplete="given-name"
                  maxLength={100}
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={cls.input}
                />
              </div>
              <div>
                <label htmlFor="donate-last-name" className={cls.label}>
                  Last name
                </label>
                <input
                  id="donate-last-name"
                  type="text"
                  autoComplete="family-name"
                  maxLength={100}
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={cls.input}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="donate-email" className={cls.label}>
                  Email
                </label>
                <input
                  id="donate-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cls.input}
                />
                <p className={cls.help}>Your donation receipt goes here.</p>
              </div>
            </div>

            <div>
              <p className={cls.label}>Card details</p>
              <div className="relative min-h-[232px]">
                <div id={CARD_ELEMENT_ID} />
                {!formReady && !error && (
                  <div className="absolute inset-0 flex flex-col gap-3.5 bg-white" aria-hidden="true">
                    <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                      <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                    </div>
                    <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                  </div>
                )}
                <p className="sr-only" aria-live="polite">
                  {formReady ? "Secure card form ready." : "Loading secure card form…"}
                </p>
              </div>
            </div>

            {error && (
              <p role="alert" className={cls.error}>
                {error}
              </p>
            )}

            <AppButton type="button" className={cls.cta} onClick={submitCard} disabled={!formReady || submitting}>
              {submitting ? (
                "Processing…"
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  {`Give ${formatCents(totalCents)} securely`}
                </>
              )}
            </AppButton>
            <TrustRow />
          </div>
        )}

        {/* ───────────── STEP 3 · success ───────────── */}
        {step === "done" && result && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className={cls.eyebrow}>Gift received</p>
              <h2 ref={headingRef} tabIndex={-1} className={cls.h2}>
                Thank you, {firstName.trim() || "friend"}.
              </h2>
              <p className="text-2xl font-semibold text-primary-600">{formatCents(result.totalCents)}</p>
            </div>

            <p className="text-md leading-relaxed text-gray-800">{doneDesignation.thankYouNote}</p>
            {doneDesignation.impactLine && <p className="text-sm text-gray-600">{doneDesignation.impactLine}</p>}

            <dl className={cls.doneRows}>
              <Row k="Designation" v={doneDesignation.label} />
              {result.dedication && <Row k={dedicationLabel(result.dedication.type)} v={result.dedication.name} />}
              <Row k="Gift" v={formatCents(result.baseAmountCents)} />
              {result.feeCents > 0 && <Row k="Processing costs covered" v={formatCents(result.feeCents)} />}
              {result.feeCents > 0 && <Row k="Total charged" v={formatCents(result.totalCents)} />}
              {(result.cardType || result.last4) && (
                <Row
                  k="Paid with"
                  v={`${result.cardType ?? "Card"}${result.last4 ? ` ending in ${result.last4}` : ""}`}
                />
              )}
              {result.transactionId && <Row k="Reference" v={result.transactionId.slice(0, 8).toUpperCase()} />}
            </dl>

            <p className="text-sm text-gray-600">
              Your donation receipt is on its way to{" "}
              <span className="font-medium text-gray-950">{result.email}</span>. Keep it for your records.
            </p>
            <p className="text-xsm leading-snug text-gray-500">
              {VARIANCE_NOTE} Nivaran Foundation Inc. · EIN 41-2656587 · No goods or services were provided in
              exchange for this contribution.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AppButton asChild variant="primary-outline" className={cls.outlineBtn}>
                <Link href={doneDesignation.pageUrl}>{doneDesignation.exploreLabel}</Link>
              </AppButton>
              <AppButton type="button" variant="ghost" className={cls.outlineBtn} onClick={donateAgain}>
                Make another gift
              </AppButton>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-gray-600">Tell someone:</span>
              <a href={shareX} target="_blank" rel="noopener noreferrer" className={cls.linkBtn}>
                X
              </a>
              <a href={shareFb} target="_blank" rel="noopener noreferrer" className={cls.linkBtn}>
                Facebook
              </a>
              <a href={shareMail} className={cls.linkBtn}>
                Email
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
