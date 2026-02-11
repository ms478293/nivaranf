import { AddImpactForm } from "@/components/dashboard/forms/impact/addImpactForm";

export default function Page() {
  return (
    <div>
      <div className="flex-col space-y-4 p-4 bg-white rounded-xl">
        <div className="text-2xl flex justify-center font-extrabold">
          Create Impact Report
        </div>
        <AddImpactForm></AddImpactForm>
      </div>
    </div>
  );
}
