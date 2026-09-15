import { trackGoogleDonation } from "@/lib/google-ads";
import { trackDonateClick, trackDonation } from "@/lib/meta-pixel";

export function trackDonationCheckout(value: number): void {
  try { trackDonateClick(value); } catch { /* Tracking must not block checkout. */ }
}

/** Called only after the payment endpoint confirms an approved donation. */
export function trackCompletedDonation(value: number, transactionId?: string): void {
  // Optional trackers must neither change payment success nor block each other.
  try { trackGoogleDonation(value, transactionId); } catch { /* Tracking unavailable. */ }
  try { trackDonation(value); } catch { /* Tracking unavailable. */ }
}
