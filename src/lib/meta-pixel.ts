type Fbq = (
  action: "track",
  event: string,
  params?: Record<string, unknown>
) => void;

function fbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

/** Donor started checkout. Proxy conversion for ad optimization. */
export function trackDonateClick(value?: number) {
  fbq()?.("track", "InitiateCheckout", {
    currency: "USD",
    ...(value ? { value } : {}),
  });
}

/** Donation completed on-site (GoDaddy Payments charge approved). */
export function trackDonation(value: number) {
  fbq()?.("track", "Purchase", { currency: "USD", value });
}
