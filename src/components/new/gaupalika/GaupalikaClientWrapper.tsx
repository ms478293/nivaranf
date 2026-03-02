"use client";

import dynamic from "next/dynamic";

const GaupalikaComponent = dynamic(
  () =>
    import("@/components/new/gaupalika/GaupalikaComponent").then(
      (mod) => mod.GaupalikaComponent
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export default function GaupalikaClientWrapper() {
  return <GaupalikaComponent />;
}
