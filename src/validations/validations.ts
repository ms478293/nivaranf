import { z } from "zod";

// Volunteer Schema
const volunteerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  nationality: z.string(),
  gender: z.string(),
  cv: z.string(),
  why: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  experience: z.string(),
  joinedAt: z.date().nullable(),
  leftAt: z.date().nullable(),
});

// Donor Schema
const donorSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  emailAddress: z.string().email().optional(),
  contactNumber: z.string().optional(),
  legalInformation: z.string().optional(),
  id: z.number().optional(),
});

// Donation Schema
const donationSchema = z.object({
  isAnonymous: z.boolean(),
  amount: z.number(),
  donationType: z.string(),
  createdAt: z.date().optional(),
  donor: z
    .object({
      id: z.number(),
      fname: z.string(),
      lname: z.string(),
    })
    .optional(),
  donorId: z.number().optional(),
});

// Program Schema
const programSchema = z.object({
  contactNumber: z.string().min(8, "Contact number is required"),
  contactPerson: z.string().min(3, "Contact person is required"),
  endDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid end date format",
  }),
  startDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date format",
  }),
  name: z.string().min(5, "Camp name is required"),
  localEmail: z.string().email("Invalid email format"),
  location: z.string().min(4, "Location is required"),
  isOpen: z.boolean(),
  // status: z.string().min(1, "Status is required"),
});

export type ProgramType = z.infer<typeof programSchema>;

// Diagram Schema
const diagramSchema = z.object({
  id: z.number(),
  diagramType: z.enum(["table", "pie", "bar"]),
  data: z.string(), // Could be updated to a specific data structure
});

// Quantitative Data Schema
const quantitativeDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  diagram: diagramSchema,
});

// Photo Schema
const photoSchema = z.object({
  id: z.number(),
  url: z.string(),
  label: z.string(),
  width: z.number(),
  height: z.number(),
});

// Entry Schema
const entrySchema = z.object({
  id: z.number().optional(),
  amount: z.number(),
  type: z.string(),
  description: z.string(),
  updatedAt: z.string().optional(),
});

// Income Entry Schema
const incomeEntrySchema = entrySchema.extend({});

// Expense Entry Schema
const expenseEntrySchema = entrySchema.extend({});

// Financial Schema
const financialSchema = z.object({
  id: z.number().optional(),
  expenseEntries: z.array(expenseEntrySchema).optional(),
  incomeEntries: z.array(incomeEntrySchema).optional(),
  startDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Start Date must be a valid date",
  }),
  endDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "End Date must be a valid date",
  }),
});

// Impact Schema
const impactSchema = z.object({
  yearOfPublish: z.date(),
  author: z.string(),
  executiveSummary: z.string(),
  mission: z.string(),
  vision: z.string(),
  goals: z.array(z.string()), // Must be defined as an array of strings
  strategicPlanning: z.string(),
  callToAction: z.string(),
  programIds: z.array(z.number()), // Ensure IDs are numbers
  photographs: z
    .array(
      z.object({
        url: z.string().optional(),
        id: z.number(),
        label: z.string(),
      })
    )
    .optional(),
  financialReportId: z.number().optional(),
  quantitativeDataIds: z.array(z.number()).optional(),
});

const impactReportSchema = impactSchema.extend({
  programData: z.array(programSchema),
  financialReportData: financialSchema,
});
// Main Application Schema
const nivaranSchema = z.object({
  volunteers: z.array(volunteerSchema),
  donations: z.array(donationSchema),
  impacts: z.array(impactSchema),
});

const foundationSchema = z.object({
  id: z.number(),
  name: z.string(),
  registrationCode: z.string(),
});

type schemaType =
  | typeof diagramSchema
  | typeof donationSchema
  | typeof donorSchema
  | typeof entrySchema
  | typeof expenseEntrySchema
  | typeof financialSchema
  | typeof impactSchema
  | typeof incomeEntrySchema
  | typeof nivaranSchema
  | typeof photoSchema
  | typeof programSchema
  | typeof quantitativeDataSchema
  | typeof volunteerSchema;

export {
  diagramSchema,
  donationSchema,
  donorSchema,
  entrySchema,
  expenseEntrySchema,
  financialSchema,
  foundationSchema,
  impactReportSchema,
  impactSchema,
  incomeEntrySchema,
  nivaranSchema,
  photoSchema,
  programSchema,
  quantitativeDataSchema,
  volunteerSchema,
  type schemaType,
};
