import { createPageMetadata } from "@/lib/page-metadata";
import { OrganizeLocallyCompoenent } from "@/components/nivaran/organize/OrganizeLocallyComponent";
import { Metadata } from "next";
export const metadata: Metadata = createPageMetadata({
  "path": "/organize-locally",
  "title": "Organize a Fundraiser for Nepal | Nivaran Foundation",
  "description": "Bring your community together for Nivaran’s work in Nepal. Explore local fundraising and awareness activities, and coordinate your plans with our team."
});
export default function Page() {
  return (
    <div className="bg-gray-50 w-full px-4">
      <OrganizeLocallyCompoenent></OrganizeLocallyCompoenent>
    </div>
  );
}
