"use client";

import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import { volunteerSchema } from "@/components/dashboard/forms/volunteer/schema/volunteerSchema";
import { AppButton } from "@/components/ui/app-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { submitVolunteer } from "@/app/actions/submit-volunteer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProgramsType } from "../VolunteerList/VolunteerList";
import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../CareerForm/jobApplicationSchema";

const volunteerApplicationSchema = volunteerSchema.extend({
  programId: z
    .union([z.string(), z.number()])
    .refine(
      (value) =>
        value !== 0 &&
        value !== "0" &&
        value !== "" &&
        value !== undefined &&
        value !== null,
      "Program is required"
    ),
  email: z.string().email("Invalid email address"),
  why: z.string().min(30, { message: "Please provide at least 30 characters" }),
  experience: z
    .string()
    .min(30, { message: "Please provide at least 30 characters" }),
  resumeFile: z
    .custom<File>((file) => file instanceof File, "Resume is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Resume must be less than 10MB")
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Invalid file type. Only PDF, DOCX, and DOC are allowed"
    ),
  programName: z.string().min(1, "Program is required"),
});

export const VolunteerForm = ({
  camp,
  onClose,
}: {
  camp: ProgramsType;
  onClose?: () => void;
}) => {
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");

  const form = useForm<z.infer<typeof volunteerApplicationSchema>>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: {
      fname: "",
      lname: "",
      nationality: "",
      gender: "",
      why: "",
      experience: "",
      phone: "",
      email: "",
      address: "",
      programId: camp.id,
      programName: camp.name,
      resumeFile: undefined as unknown as File,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof volunteerApplicationSchema>) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value.toString());
        }
      });

      const result = await submitVolunteer(formData);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      toast.success("Volunteer created Succesfully");
      form.reset();
      setResumeFileName("");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: z.infer<typeof volunteerApplicationSchema>) => {
    mutate({ ...data });
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Resume must be less than 10MB");
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Only PDF, DOCX, and DOC are allowed");
      return;
    }
    setResumeFileName(file.name);
    form.setValue("resumeFile", file);
    form.clearErrors("resumeFile");
  };

  return (
    <div className="bg-neutral-100 rounded-2xl p-6  font-Poppins relative h-[60vh] md:h-auto overflow-y-auto">
      <div
        className="flex justify-between py-4  w-full sticky -top-6 bg-neutral-100"
        onClick={() => onClose?.()}
      >
        <p className="font-semibold md:text-lg">Become a Volunteer</p>
        <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
      </div>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 "
      >
        <Form {...form}>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Contact no</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Nationality</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full">
              <p className="text-gray-800 mb-2">
                Gender <span className="text-red-500 text-sm">*</span>
              </p>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-5"
                    >
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="male"
                            className="w-4 h-4"
                            id="male"
                          />
                        </FormControl>
                        <FormLabel htmlFor="male" className="cursor-pointer">
                          Male
                        </FormLabel>
                      </div>

                      <div className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="female"
                            className="w-4 h-4"
                            id="female"
                          />
                        </FormControl>
                        <FormLabel htmlFor="female" className="cursor-pointer">
                          Female
                        </FormLabel>
                      </div>

                      <div className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="others"
                            className="w-4 h-4"
                            id="others"
                          />
                        </FormControl>
                        <FormLabel htmlFor="others" className="cursor-pointer">
                          Others
                        </FormLabel>
                      </div>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full">
              <FormField
                control={form.control}
                name="why"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>
                      Why do you want to volunteer?
                    </FormLabel>
                    <FormControl>
                    <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Describe your experience</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="resumeFile"
                render={() => (
                  <FormItem>
                    <FormLabel isRequired>Resume/CV</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          ref={resumeInputRef}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleResumeChange}
                        />
                        <div className="flex items-center gap-3">
                          <AppButton
                            type="button"
                            variant="primary-outline"
                            onClick={() => resumeInputRef.current?.click()}
                          >
                            {resumeFileName ? "Change Resume" : "Upload Resume"}
                          </AppButton>
                          {resumeFileName ? (
                            <span className="text-sm text-gray-600">
                              {resumeFileName}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* <SubmitButton /> */}
          <AppButton
            type="submit"
            disabled={isPending}
            className="self-end hover:bg-secondary-500  bg-secondary-800 hover:border-transparent"
          >
            {isPending ? "Submitting..." : "Apply as Volunteer"}
          </AppButton>
        </Form>
      </form>
    </div>
  );
};

// const SubmitButton = () => {
//   const { pending } = useFormStatus();
//   return (
//     <AppButton
//       type="submit"
//       disabled={pending}
//       className="self-end hover:bg-secondary-500  bg-secondary-800 hover:border-transparent"
//     >
//       {pending ? "Submitting..." : "Apply as Volunteer"}
//     </AppButton>
//   );
// };
