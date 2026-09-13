"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
export default function ManageMonthlyGift() {
  const [gift, setGift] = useState<{ state: string; amountCents?: number; nextAt?: string; designation?: string; cardType?: string; last4?: string } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const token = useRef("");
  async function request(action: "view" | "cancel") {
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/donate/manage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, token: token.current }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGift(data);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { setBusy(false); }
  }
  useEffect(() => {
    token.current ||= window.location.hash.slice(1);
    window.history.replaceState(null, "", window.location.pathname);
    if (!token.current) { setError("Open the private management link in your donation receipt to view your monthly gift."); return; }
    void request("view");
  }, []);
  return <div className="mx-auto min-h-[80vh] max-w-xl px-6 pb-20 pt-40 text-gray-800">
    <p className="mb-4 text-sm uppercase tracking-widest text-primary-600">Nivaran Foundation</p>
    <h1 className="mb-6 text-3xl font-semibold">{gift?.state === "cancelled" ? "Your monthly gift is cancelled." : "Your monthly gift"}</h1>
    {error && <p role="alert" className="mb-6 text-sm">{error}</p>}
    {gift?.state === "cancelled" ? <p className="mb-6 leading-relaxed">No further monthly gifts will be charged. A payment already being processed may still complete. Thank you for the care you have made possible.</p> : gift && <>
      <p className="mb-2 text-2xl font-semibold">${(gift.amountCents / 100).toFixed(2)} / month</p>
      <p className="mb-4">{gift.designation}</p>
      {gift.nextAt && <p className="mb-4">Next scheduled gift: {new Date(gift.nextAt).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })}</p>}
      {gift.last4 && <p className="mb-4 text-sm">{gift.cardType || "Card"} ending in {gift.last4}</p>}
      {["review", "pending", "past_due", "processing"].includes(gift.state) && <p className="mb-4 text-sm">{gift.state === "processing" ? "A scheduled payment is currently being processed." : "Your gift needs a payment review. No automatic retry will be made."}</p>}
      <p className="mb-6 text-sm leading-relaxed">Cancel below to stop future payments. This does not refund donations already completed.</p>
      <button type="button" disabled={busy} onClick={() => void request("cancel")} className="mb-6 rounded-md bg-gray-900 px-6 py-3 text-sm text-white disabled:opacity-50">{busy ? "Updating…" : "Cancel monthly gift"}</button>
    </>}
    {!gift && busy && <p>Opening your monthly gift…</p>}
    <div className="mt-6 flex gap-6 text-sm underline"><Link href="/">Back to Nivaran</Link><Link href="/contact-us">Contact us</Link></div>
  </div>;
}
