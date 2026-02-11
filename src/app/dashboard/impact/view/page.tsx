import { ViewImpactReports } from "@/components/dashboard/actions/viewImpactReport";

export default function Page() {
  return (
    <div>
      <div className="flex-col space-y-4 p-4 bg-white rounded-xl">
        <div className="text-2xl flex justify-center font-extrabold">
          View Impact Report
        </div>
        <ViewImpactReports></ViewImpactReports>
      </div>
    </div>
  );
}
