import { z } from "zod";

export const volunteerSchema = z.object({
  fname: z.string().min(1, { message: "First Name is required" }),
  mname: z.string().optional(),
  lname: z.string().min(1, { message: "Last Name is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  why: z.string().min(1, { message: "This field is required" }),
  experience: z.string().optional(),
  phone: z.string().min(8, "Contact no is required"),
  email: z.string().min(5, "Email is required"),
  address: z.string().min(2, "Address is required"),
  programId: z.union([z.string(), z.number()]),
  // cv: z.string().optional(),
  // foundationName: z.string().optional(),
});

export type VolunteerSchemaType = z.infer<typeof volunteerSchema>;
