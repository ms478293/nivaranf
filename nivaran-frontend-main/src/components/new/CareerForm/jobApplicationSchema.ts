import { z } from "zod";

export const jobApplicationSchema = z.object({
  jobOpeningId: z.number().int(),
  status: z.enum(["pending", "accepted", "rejected"]), // Adjust based on your status options
  fName: z.string().min(1, "First name is required"),
  lName: z.string().min(1, "Last name is required"),
  mName: z.string().optional(),
  contactNo: z.string().min(10, "Invalid contact number"), // Adjust validation based on your region
  optionalContactNo: z.string().optional(),
  emailAddress: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  resumeLink: z.string(),
  portfolioLink: z.string().optional(),

  // resume: z
  //   .custom<File>((file) => file instanceof File,  "Resume is required")
  //   .refine((file) => file.size <= MAX_FILE_SIZE, "File must be less than 10MB")
  //   .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), "Invalid file type. Only PDF, DOCX, and TXT are allowed"),
});

export const legalSchema = z.object({
  availability: z.string().min(5, "Specify your availability"),
  previousEmployee: z.boolean(),
  universityStudent: z.boolean(),
  acceptsOtherOppurtunity: z.boolean(),
});

export type LegalSchemaType = z.infer<typeof legalSchema>;
export type jobApplicationSchemaType = z.infer<typeof jobApplicationSchema>;
