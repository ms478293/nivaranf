import { CareerForm } from "@/components/new/CareerForm/PersonalForm";
import { CareerType } from "../../../page";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const careerRes = await fetch(
    `https://api.nivaranfoundation.org/api/carrer/job-openings/${id}`
  );

  const career: CareerType = await careerRes.json();

  return (
    <div className="font-Poppins w-full px-4">
      <div className="max-w-[870px] mx-auto">
        <div>
          <h2 className="text-gray-950 font-medium text-xl">Job Apllication</h2>
          <p className="text-sm text-gray-600">{career.jobName}</p>
        </div>
        <CareerForm career={career} />
      </div>
    </div>
  );
}
