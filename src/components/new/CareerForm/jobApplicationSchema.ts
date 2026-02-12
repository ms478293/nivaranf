import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];

export const jobApplicationSchema = z.object({
  jobOpeningId: z
    .union([z.string(), z.number()])
    .refine(
      (value) =>
        value !== 0 &&
        value !== "0" &&
        value !== "" &&
        value !== undefined &&
        value !== null,
      "Job opening is required"
    ),
  jobTitle: z.string().min(1, "Job title is required"),
  jobLocation: z.string().min(1, "Job location is required"),
  status: z.enum(["pending", "accepted", "rejected"]),
  fName: z.string().min(1, "First name is required"),
  lName: z.string().min(1, "Last name is required"),
  mName: z.string().optional(),
  contactNo: z.string().min(10, "Invalid contact number"),
  optionalContactNo: z.string().optional(),
  emailAddress: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().optional(),
  resumeFile: z
    .custom<File>((file) => file instanceof File, "Resume is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Resume must be less than 10MB")
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Invalid file type. Only PDF, DOCX, and DOC are allowed"
    ),
  coverLetterFile: z
    .custom<File>((file) => !file || file instanceof File, "Invalid cover letter file")
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Cover letter must be less than 10MB"
    )
    .refine(
      (file) => !file || ALLOWED_FILE_TYPES.includes(file.type),
      "Invalid file type. Only PDF, DOCX, and DOC are allowed"
    )
    .optional(),
  portfolioLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  motivation: z
    .string()
    .min(30, "Please provide at least 30 characters"),
  experienceSummary: z
    .string()
    .min(30, "Please provide at least 30 characters"),
});

export const legalSchema = z.object({
  availability: z.string().min(1, "Availability is required"),
  previousEmployee: z.boolean(),
  universityStudent: z.boolean(),
  acceptsOtherOppurtunity: z.boolean(),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  highestEducation: z.string().min(1, "Education level is required"),
  canRelocate: z.boolean(),
});

export type LegalSchemaType = z.infer<typeof legalSchema>;
export type jobApplicationSchemaType = z.infer<typeof jobApplicationSchema>;

export { MAX_FILE_SIZE, ALLOWED_FILE_TYPES };
