import { JobTable } from "@/components/new/CareerTable/JobTable";

export type JobApplicationType = {
  id: number;
  jobOpeningId: number;
  status: "pending" | "accepted" | "rejected"; // Assuming possible statuses
  fullName: string;
  contactNo: string;
  optionalContactNo?: string;
  emailAddress: string;
  country: string;
  resumeLink?: string;
  portfolioLink?: string;
  availability: string;
  previousEmployee: boolean;
  universityStudent: boolean;
  acceptsOtherOppurtunity: boolean;
  applyBefore: string;
};

// type JobApplication = {
//   id: number;
//   jobOpeningId: number;
//   status: "accepted" | "pending" | "rejected";
//   fName: string;
//   lName: string;
//   mName: string;
//   contactNo: string;
//   optionalContactNo: string;
//   emailAddress: string;
//   country: string;
//   resumeLink: string;
//   portfolioLink: string;
//   availability: string;
//   previousEmployee: boolean;
//   universityStudent: boolean;
//   acceptsOtherOppurtunity: boolean;
//   createdAt: string;
//   updatedAt: string;
//   forOpening: JobApplicationType;
// };

export default async function page() {
  return (
    <main className="font-Poppins">
      <JobTable />
    </main>
  );
}
