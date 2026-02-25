import { GaupalikaComponent } from "@/components/new/gaupalika/GaupalikaComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaupalika Coverage Map | Nivaran Foundation",
  description:
    "View Nivaran Foundation's local coverage map and program footprint across Nepal municipalities and rural regions.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/gaupalika",
  },
  openGraph: {
    title: "Gaupalika Coverage Map | Nivaran Foundation",
    description:
      "Explore local health and education coverage areas served by Nivaran Foundation in Nepal.",
    url: "https://www.nivaranfoundation.org/gaupalika",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaupalika Coverage Map | Nivaran Foundation",
    description:
      "Explore local health and education coverage areas served by Nivaran Foundation in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function MapPage() {
  return <GaupalikaComponent></GaupalikaComponent>;
}
