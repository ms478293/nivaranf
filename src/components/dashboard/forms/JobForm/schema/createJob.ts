import { z } from "zod";

export const CreateJobSchema = z.object({
  jobName: z.string().min(5, "Job title is required"),
  jobType: z.enum(["Onsite", "Hybrid", "Remote"]),
  applyBefore: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
  positionsOpen: z.coerce.number().min(1, "Position must be atleast 1"),
  introduction: z.string().min(10, "Minimum of 10 words required"),
  responsibilities: z
    .array(z.string())
    .min(1, "Minimum 1 requirement is required"),
  requirements: z.array(z.string()).min(1, "Minimum 1 requirement is required"),
  benefits: z.any(),
  additionalInfo: z.any(),
});

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;
// "use client";

// import { AppButton } from "@/components/ui/app-button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { CreateJobSchema, CreateJobSchemaType } from "./schema/createJob";

// export const CreateJobForm = () => {
//   const form = useForm<CreateJobSchemaType>({
//     resolver: zodResolver(CreateJobSchema),
//     defaultValues: {
//       additionalInfo: "",
//       applyBefore: null,
//       benefits: "",
//       jobName: "",
//       introduction: "",
//       jobType: "Hybrid",
//       positionOpen: 0,
//       requirements: [""],
//       responsibilities: [""],
//     },
//   });

//   const {
//     fields: fieldsResponsibilities,
//     append: appendResponsibilities,
//     remove: removeResponsibilities,
//   } = useFieldArray({
//     control: form.control,
//     name: "responsibilities",
//   });

//   const {
//     fields: fieldsRequirements,
//     append: appendRequirements,
//     remove: removeRequirements,
//   } = useFieldArray({
//     control: form.control,
//     name: "requirements",
//   });

//   const onSubmit = (data: CreateJobSchemaType) => {
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//       <Form {...form}>
//         <FormField
//           control={form.control}
//           name="jobName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Job Title</FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="Enter job title" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="jobType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Gender</FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Gender" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {["Onsite", "Hybrid", "Remote"].map((type) => (
//                       <SelectItem value={type} key={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="positionOpen"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Open position</FormLabel>
//               <FormControl>
//                 <Input type="text" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="introduction"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Job Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Job description"
//                   {...field}
//                   className="bg-neutral-50"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex flex-col gap-2 ">
//           <FormField
//             name="responsibilities"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Responsibilities</FormLabel>
//                 <FormControl>
//                   <div className="flex flex-col gap-4">
//                     {fieldsResponsibilities.map((inputField, index) => (
//                       <div
//                         key={inputField.id}
//                         className="flex items-center gap-4"
//                       >
//                         <Input
//                           {...form.register(`responsibilities.${index}`)}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeResponsibilities(index)}
//                         >
//                           remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <AppButton
//             type="button"
//             onClick={() => appendResponsibilities([])}
//             variant="primary-outline"
//             className="w-fit"
//           >
//             append
//           </AppButton>
//         </div>
//         <div className="flex flex-col gap-2 ">
//           <FormField
//             name="requirements"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Requirements</FormLabel>
//                 <FormControl>
//                   <div className="flex flex-col gap-4">
//                     {fieldsRequirements.map((inputField, index) => (
//                       <div
//                         key={inputField.id}
//                         className="flex items-center gap-4"
//                       >
//                         <Input {...form.register(`requirements.${index}`)} />
//                         <button
//                           type="button"
//                           onClick={() => removeRequirements(index)}
//                         >
//                           remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <AppButton
//             type="button"
//             onClick={() => appendRequirements("")}
//             variant="primary-outline"
//             className="w-fit"
//           >
//             append
//           </AppButton>
//         </div>
//         {/* <FormField
//           control={form.control}
//           name=""
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Camp Location</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Enter camp location"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}
//         {/*
//         <FormField
//           control={form.control}
//           name="contactPerson"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Contact Person Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Enter contact person name"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="contactNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Contact Person Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Enter contact person name"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}
//         {/* <SubmitButton /> */}
//         <div className="flex justify-end">
//           {/* <SubmitButton /> */}
//           <AppButton
//             type="submit"
//             // disabled={pending}
//             className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500"
//           >
//             Add Program
//             {/* {pending ? "Adding Program..." : "Add Program"} */}
//           </AppButton>
//         </div>
//       </Form>
//     </form>
//   );
// };
