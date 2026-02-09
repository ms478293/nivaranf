import { ImpactReportDownloadComponent } from "@/components/nivaran/docs/ImpactReportDownloadList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Reports and Resources",
  description: "View our Annual Reports, Downloads and other files",
};
export default function Page() {
  return (
    <div className="py-4 w-full px-4">
      <ImpactReportDownloadComponent></ImpactReportDownloadComponent>
    </div>
  );
}
