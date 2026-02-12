"use client";

import { CareerType } from "@/app/(main)/career/page";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitApplication } from "@/app/actions/submit-application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import countries from "world-countries";
import { z } from "zod";
import {
  jobApplicationSchema,
  legalSchema,
} from "./jobApplicationSchema";

// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// const ALLOWED_FILE_TYPES = [
//   "application/pdf",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   "text/plain",
// ];

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

const legalList = [
  " I certify that all statements I have made on this application and on my resume or any other supplementary materials are true and correct. I acknowledge that any false statement or misrepresentation on this application, my resume, or supplementary materials will be cause for refusal to hire, or for immediate termination of employment at any time during the period of my employment.",
  "I understand that no supervisor or manager may alter or amend the above conditions except in writing, signed by a company officer.",
  "Terms and condition.",
];

const careerJobSchema = jobApplicationSchema.merge(legalSchema);

export const CareerForm = ({ career }: { career: CareerType }) => {
  const router = useRouter();
  const [isAcceptedTOS, setIsAcceptedTOS] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof careerJobSchema>>({
    resolver: zodResolver(careerJobSchema),
    defaultValues: {
      jobOpeningId: 0,
      status: "pending",
      fName: "",
      lName: "",
      mName: "",
      contactNo: "",
      optionalContactNo: "",
      emailAddress: "",
      country: "",
      portfolioLink: "",
      availability: "",
      previousEmployee: true,
      universityStudent: true,
      acceptsOtherOppurtunity: true,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof careerJobSchema>) => {
      const result = await submitApplication({
        ...data,
        jobOpeningId: career.id,
        resumeLink: "",
      });
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      toast.success("Application submitted successfully");
      form.reset();
      router.push(`/career/${career.id}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: z.infer<typeof careerJobSchema>) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      mutate(data);
    }
  };

  return (
    <div>
      <div className="flex gap-4 w-full mt-8 ">
        <div
          className={`h-[85px] w-full p-2 flex flex-col justify-between gap-3 text-gray-400 border border-gray-200 ${
            step === 1 || step === 2 ? "bg-forest-400 text-neutral-50" : ""
          }`}
        >
          <span className="text-sm "> 1/2 </span>
          <span className="text-sm font-medium text-neutral-50 md:text-lg ">
            Personal Information
          </span>
        </div>
        <div
          className={`h-[85px] p-2 w-full flex  justify-between flex-col gap-3 text-gray-400 border border-gray-200 ${
            step === 2 ? "bg-forest-400 text-neutral-50" : ""
          }`}
        >
          <span className="text-sm "> 2/2 </span>
          <span className="text-sm font-medium  md:text-lg ">
            Legal Acknowledgement
          </span>
        </div>
      </div>
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="my-12">
            {step === 1 && (
              <>
                <h3 className="uppercase font-medium  text-lg mb-2 ">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="fname"
                          className="font-light text-sm text-gray-600"
                        >
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="fname"
                            className="bg-gray-50"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="mname"
                          className="font-light text-sm text-gray-600"
                        >
                          Middle Name (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="mname"
                            className="bg-gray-50"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="lname"
                          className="font-light text-sm text-gray-600"
                        >
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="lname"
                            className="bg-gray-50"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <h3 className="uppercase font-medium  text-lg mb-2 ">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              className="bg-gray-50"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="phoneNumber"
                            className="font-light text-sm text-gray-600"
                          >
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="phoneNumber"
                              className="bg-gray-50"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-2">
                      <FormLabel
                        htmlFor="phoneNumber"
                        className="font-light text-sm text-gray-600"
                      >
                        Select a Country
                      </FormLabel>
                      <Controller
                        control={form.control}
                        name="country"
                        rules={{ required: "Country is required" }} // Ensure validation
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-gray-50 border-none h-10">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent
                              className="bg-gray-50"
                              id="countryRegion"
                            >
                              <SelectGroup>
                                {countryOptions.map((type) => (
                                  <SelectItem
                                    value={type.label}
                                    key={type.value}
                                    className="font-Poppins"
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {form.formState?.errors.country && (
                        <span className="text-red-500 text-sm">
                          {form.formState?.errors.country.message}
                        </span>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="portfolioLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="portfolioLink"
                            className="font-light text-sm text-gray-600 "
                          >
                            Add Portfolio Link
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="portfolioLink"
                              className="bg-gray-50"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-12">
                    <p className="uppercase text-xl text-gray-950 font-[600]">
                      Upload Your Resume
                    </p>
                    <p className="font-light text-gray-600 mt-4 mb-2">
                      One file max size 10 MB (Supported : pdf, Doc, txt)
                    </p>
                    <input type="file" ref={fileInputRef} className="hidden" />
                    <AppButton
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="ghost"
                      className="text-xsm text-primary-500 bg-primary-200 font-light"
                    >
                      Select resume
                    </AppButton>
                  </div>
                </div>

                <div className="flex md:justify-end mt-4 ">
                  <AppButton
                    type="button"
                    className="hover:bg-primary-200 hover:text-primary-500 px-5 md:w-fit w-full"
                    onClick={async () => {
                      const isValid = await form.trigger(
                        Object.keys(jobApplicationSchema.shape) as any
                      );
                      if (!isValid) return;
                      setStep(step + 1);
                    }}
                  >
                    Next
                  </AppButton>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <FormLabel
                    htmlFor="phoneNumber"
                    className="font-light text-sm text-gray-600"
                  >
                    What is your availability or notice period
                  </FormLabel>
                  <Controller
                    control={form.control}
                    name="availability"
                    rules={{ required: "notice poeriod is required" }} // Ensure validation
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-gray-50 border-none h-10">
                          <SelectValue placeholder="Select your availbility" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-50" id="availability">
                          <SelectGroup>
                            {[
                              "Immediately available",
                              "less than a week",
                              "Less than a month",
                            ].map((type) => (
                              <SelectItem
                                value={type}
                                key={type}
                                className="font-Poppins"
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState?.errors.availability && (
                    <span className="text-red-500 text-sm">
                      {form.formState?.errors.availability.message}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-gray-800 mb-4">
                    I authorize NIVARAN to consider me for other job
                    opportunities for the next 12 months within this company in
                    addition to the specific job I am applying for.
                  </p>
                  <FormField
                    control={form.control}
                    name="acceptsOtherOppurtunity"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          value={field.value ? "true" : "false"}
                          className="flex gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={"true"}
                              className="w-4 h-4"
                              id="authorizeJobOpportunities-yes"
                            />
                          </FormControl>
                          <FormLabel htmlFor="authorizeJobOpportunities-yes">
                            Yes
                          </FormLabel>

                          <FormControl>
                            <RadioGroupItem
                              value={"false"}
                              className="w-4 h-4"
                              id="authorizeJobOpportunities-no"
                            />
                          </FormControl>
                          <FormLabel htmlFor="authorizeJobOpportunities-no">
                            No
                          </FormLabel>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <p className="text-gray-800 mb-4">
                    Have you previously been employed by this company(Nivaran)
                  </p>
                  <FormField
                    control={form.control}
                    name="previousEmployee"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          value={field.value ? "true" : "false"}
                          className="flex gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={"true"}
                              className="w-4 h-4"
                              id="previousXYZ-yes"
                            />
                          </FormControl>
                          <FormLabel htmlFor="previousXYZ-yes">Yes</FormLabel>

                          <FormControl>
                            <RadioGroupItem
                              value={"false"}
                              className="w-4 h-4"
                              id="previousXYZ-no"
                            />
                          </FormControl>
                          <FormLabel htmlFor="previousXYZ-no">No</FormLabel>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <p className="text-gray-800 mb-4">
                    Are you a current university student?
                  </p>
                  <FormField
                    control={form.control}
                    name="universityStudent"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          value={field.value ? "true" : "false"}
                          className="flex gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={"true"}
                              className="w-4 h-4"
                              id="currentUniversity-yes"
                            />
                          </FormControl>
                          <FormLabel htmlFor="currentUniversity-yes">
                            Yes
                          </FormLabel>

                          <FormControl>
                            <RadioGroupItem
                              value={"false"}
                              className="w-4 h-4"
                              id="currentUniversity-no"
                            />
                          </FormControl>
                          <FormLabel htmlFor="currentUniversity-no">
                            No
                          </FormLabel>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <ul className="list-decimal pl-4">
                  <RenderList
                    data={legalList}
                    render={(list, i) => (
                      <li key={i} className="text-gray-800 font-light">
                        {list}
                      </li>
                    )}
                  />
                </ul>

                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="accept-terms-and-conditions"
                    checked={isAcceptedTOS}
                    onChange={() => setIsAcceptedTOS((tick) => !tick)}
                  />
                  <label
                    htmlFor="accept-terms-and-conditions"
                    className="text-gray-800 cursor-pointer"
                  >
                    I have read and understand the statements above and accept
                    them as conditions of employment.
                  </label>
                </div>

                <div className="flex items-center gap-4 w-full md:justify-end ">
                  <AppButton
                    variant="primary-outline"
                    className="text-sm border border-primary-500 text-primary-500  hover:bg-primary-200 hover:text-primary-500 hover:border-transparent font-normal w-full md:w-fit"
                    size="sm"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </AppButton>
                  <AppButton
                    disabled={!isAcceptedTOS || isPending}
                    variant="primary"
                    // className="ml-4 text-base hover:text-primary-500"
                    className={`text-sm font-normal hover:border-transparent hover:bg-primary-200 hover:text-primary-500 w-full md:w-fit disabled:cursor-not-allowed ${
                      !isAcceptedTOS || isPending
                        ? "bg-gray-200 hover:bg-gray-200 hover:text-"
                        : ""
                    }`}
                    size="sm"
                  >
                    {isPending ? "submitting..." : "Submit"}
                  </AppButton>
                </div>
              </div>
            )}
          </div>
        </Form>
      </form>
    </div>
  );
};
