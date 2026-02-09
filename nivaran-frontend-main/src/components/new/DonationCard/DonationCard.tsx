"use client";

import { AppButton } from "@/components/ui/app-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUrlQuery } from "@/hooks/useURLQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import DonatePriceTag from "../DonatePriceTag/DonatePriceTag";

export type DonationLink = {
  url: string;
  value: number | "custom";
};

export const linksRecurringData: DonationLink[] = [
  { url: "https://square.link/u/SblMfArl", value: 5 },
  { url: "https://square.link/u/MSYjAclC", value: 10 },
  { url: "https://square.link/u/UQpQSqXo", value: 20 },
  { url: "https://square.link/u/SCp4zy6I", value: 50 },
  { url: "https://square.link/u/J1SuHCaP", value: 100 },
  { url: "https://square.link/u/Ch7Es46t", value: "custom" },
];

export const linksOneTimeData: DonationLink[] = [
  { url: "https://square.link/u/VI6zrzYy", value: 5 },
  { url: "https://square.link/u/ItTRVhZD", value: 10 },
  { url: "https://square.link/u/HEgCo7xf", value: 20 },
  { url: "https://square.link/u/Bzu8hfgd", value: 50 },
  { url: "https://square.link/u/wDK0I87N", value: 100 },
  { url: "https://square.link/u/Ch7Es46t", value: "custom" },
];

/**
 * Opens a centered popup. Returns true if the popup opened, false if blocked.
 * Must be called synchronously from a user gesture (e.g., a click handler).
 */
function openCenteredPopup(
  url: string,
  title = "Square Payment Checkout",
  width = 800,
  height = 600
): boolean {
  const topWindow = window.top || window;

  // Older engines expose screenLeft/screenTop; newer use screenX/screenY.
  const dualScreenLeft =
    (topWindow as any).screenLeft ?? (topWindow as any).screenX ?? 0;
  const dualScreenTop =
    (topWindow as any).screenTop ?? (topWindow as any).screenY ?? 0;

  const winWidth =
    topWindow.innerWidth ||
    document.documentElement.clientWidth ||
    window.screen.width;
  const winHeight =
    topWindow.innerHeight ||
    document.documentElement.clientHeight ||
    window.screen.height;

  const left = Math.max(0, (winWidth - width) / 2 + dualScreenLeft);
  const top = Math.max(0, (winHeight - height) / 2 + dualScreenTop);

  // Unique name avoids reuse of a closed window handle.
  const name = `${title.replace(/\s+/g, "_")}_${Date.now()}`;

  let popup: Window | null = null;
  try {
    popup = window.open(
      url,
      name,
      `noopener,noreferrer,scrollbars=yes,width=${width},height=${height},top=${top},left=${left}`
    );
  } catch {
    // Swallow; we'll report by return value.
  }

  if (!popup) return false;

  try {
    popup.focus();
  } catch {
    // Focusing may fail silently in some environments; not fatal.
  }
  return true;
}

const DonationCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useUrlQuery();

  // Track active tab explicitly
  const initialTab = (searchParams.get("donate-query") || "recurring") as
    | "recurring"
    | "one-time";
  const [tab, setTab] = useState<"recurring" | "one-time">(initialTab);

  // Active dataset per tab
  const activeData = useMemo(
    () => (tab === "recurring" ? linksRecurringData : linksOneTimeData),
    [tab]
  );

  // Default selected payment per tab
  const [selectedPayment, setSelectedPayment] = useState<DonationLink>(
    initialTab === "one-time" ? linksOneTimeData[0] : linksRecurringData[0]
  );

  // Simple debounce so one click equals one popup
  const [opening, setOpening] = useState(false);
  const safeOpen = (url: string) => {
    if (opening) return;
    setOpening(true);
    // IMPORTANT: no async/await before this call
    const ok = openCenteredPopup(url);
    if (!ok) {
      // Prefer non-blocking UX; replace with your toast/snackbar if available
      // e.g., toast.error("Please enable popups to complete checkout.");
      // Fallback to console to avoid modal alerts.
      console.warn("Popup blocked by the browser.");
    }
    // Reset debounce shortly after
    setTimeout(() => setOpening(false), 400);
  };

  const handleTabChange = (value: string) => {
    const v = (value as "recurring" | "one-time") || "recurring";
    setTab(v);
    // Update URL query param (safe after the popup call; this isn't tied to button clicks)
    router.push(`/donate?${createQueryString("donate-query", v)}`);
    // Reset selected to first option of that tab
    setSelectedPayment(
      v === "recurring" ? linksRecurringData[0] : linksOneTimeData[0]
    );
  };

  const handleDonate = () => {
    safeOpen(selectedPayment.url);
  };

  const handleCustomDonate = () => {
    const custom = activeData.find((d) => d.value === "custom");
    if (!custom) {
      console.warn("Custom donation link not configured.");
      return;
    }
    safeOpen(custom.url);
  };

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="w-full md:w-fit rounded-3xl border border-gray-200 p-5 bg-neutral-50"
    >
      <TabsList className="flex justify-start h-fit w-fit gap-2 rounded-full bg-secondary-600 p-1.5">
        <TabsTrigger
          value="recurring"
          className="px-3 py-1 text-sm font-light rounded-full data-[state=active]:bg-primary-500 data-[state=active]:text-neutral-50 text-neutral-50"
        >
          Recurring
        </TabsTrigger>
        <TabsTrigger
          value="one-time"
          className="px-3 py-1 text-sm font-light rounded-full data-[state=active]:bg-primary-500 data-[state=active]:text-neutral-50 text-neutral-50"
        >
          One-time
        </TabsTrigger>
      </TabsList>

      <TabsContent value="recurring" className="flex flex-col gap-3 h-fit">
        <p className="text-gray-800 text-sm mb-3">
          Choose your mode of donation (One-time or Recurring donation)
        </p>
        <div className="flex flex-wrap gap-3 ">
          {linksRecurringData.map((price) => (
            <DonatePriceTag
              price={price}
              key={price.url}
              setSelectedPayment={setSelectedPayment}
              selectedPayment={selectedPayment}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="one-time" className="flex flex-col gap-3 mt-0 h-fit">
        <p className="text-gray-800 text-sm mb-3">
          Choose your mode of donation (One-time or Recurring donation)
        </p>
        <div className="flex flex-wrap gap-3 ">
          {linksOneTimeData.map((price) => (
            <DonatePriceTag
              price={price}
              key={price.url}
              setSelectedPayment={setSelectedPayment}
              selectedPayment={selectedPayment}
            />
          ))}
        </div>
      </TabsContent>

      <div className="flex items-center w-full justify-between gap-2 mt-8">
        <AppButton
          type="button"
          variant="primary-outline"
          className="hover:bg-primary-200 hover:text-primary-500 font-light w-1/2"
          onClick={handleCustomDonate}
          disabled={opening}
        >
          Custom Donation
        </AppButton>
        <AppButton
          type="button"
          className="w-1/2 hover:bg-primary-200 hover:text-primary-500 font-light"
          onClick={handleDonate}
          disabled={opening}
        >
          Donate
        </AppButton>
      </div>
    </Tabs>
  );
};

export default DonationCard;
