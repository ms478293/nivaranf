export type VolunteerProgram = {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  status: "active" | "closed";
};

export const VOLUNTEER_PROGRAMS: VolunteerProgram[] = [
  {
    id: 1,
    name: "Health Camp Support Volunteers",
    location: "Kathmandu, Nepal",
    start_date: "2026-03-05",
    end_date: "2026-04-20",
    status: "active",
  },
  {
    id: 2,
    name: "Education Mentorship Volunteers",
    location: "Pokhara, Nepal",
    start_date: "2026-03-15",
    end_date: "2026-04-30",
    status: "active",
  },
  {
    id: 3,
    name: "Community Outreach & Logistics",
    location: "Chitwan, Nepal",
    start_date: "2026-03-10",
    end_date: "2026-04-25",
    status: "active",
  },
  {
    id: 4,
    name: "Remote Research & Grant Support",
    location: "Remote",
    start_date: "2026-03-01",
    end_date: "2026-04-30",
    status: "active",
  },
];
