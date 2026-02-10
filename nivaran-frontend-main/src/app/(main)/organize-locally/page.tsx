import { OrganizeLocallyCompoenent } from "@/components/nivaran/organize/OrganizeLocallyComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Organize Locally",
  description:
    "Collaborate with Nivaran Foundation to organize healthcamp locally, contact support@nivaranfoundation.org for more details.",
};
export default function Page() {
  return (
    <div className="bg-gray-50 w-full px-4">
      <OrganizeLocallyCompoenent></OrganizeLocallyCompoenent>
    </div>
  );
}
