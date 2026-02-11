import { ApplicantTable } from "@/components/new/CareerTable/ApplicantTable";

export default async function page() {
  // const careerItem: JobApplicationType[] = jobList.map((c) => ({
  //   id: c.id,
  //   jobOpeningId: c.jobOpeningId,
  //   status: c.status,
  //   fullName: [c.fName, c.mName, c.lName].filter(Boolean).join(" "), // Merge names
  //   contactNo: c.contactNo,
  //   optionalContactNo: c.optionalContactNo || "",
  //   emailAddress: c.emailAddress,
  //   country: c.country,
  //   resumeLink: c.resumeLink || "",
  //   portfolioLink: c.portfolioLink || "",
  //   availability: c.availability,
  //   previousEmployee: c.previousEmployee,
  //   universityStudent: c.universityStudent,
  //   acceptsOtherOppurtunity: c.acceptsOtherOppurtunity,
  //   applyBefore: c.forOpening.applyBefore,
  //   createdAt: c.createdAt,
  // }));
  return <ApplicantTable />;
}
