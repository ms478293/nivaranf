"use client";

import { CareerType } from "@/app/(main)/career/page";
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
import { submitApplicationWithFiles } from "@/app/actions/submit-application-with-files";
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
  MAX_FILE_SIZE,
} from "./jobApplicationSchema";
import { JOB_OPENINGS, JOB_LOCATIONS } from "@/content/job-openings";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

const careerJobSchema = jobApplicationSchema.merge(legalSchema);

const EDUCATION_LEVELS = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Professional Certification"
];

const EXPERIENCE_LEVELS = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years"
];

const AVAILABILITY_OPTIONS = [
  "Immediately available",
  "Less than 2 weeks",
  "2-4 weeks",
  "1-2 months",
  "2-3 months",
];

export const EnhancedCareerForm = ({ career }: { career?: CareerType }) => {
  const router = useRouter();
  const [isAcceptedTOS, setIsAcceptedTOS] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const coverLetterInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(1);
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [coverLetterFileName, setCoverLetterFileName] = useState<string>("");

  const form = useForm<z.infer<typeof careerJobSchema>>({
    resolver: zodResolver(careerJobSchema),
    defaultValues: {
      jobOpeningId: career?.id || 0,
      jobTitle: "",
      jobLocation: "",
      status: "pending",
      fName: "",
      lName: "",
      mName: "",
      contactNo: "",
      optionalContactNo: "",
      emailAddress: "",
      country: "",
      city: "",
      address: "",
      portfolioLink: "",
      linkedinUrl: "",
      availability: "",
      previousEmployee: false,
      universityStudent: false,
      acceptsOtherOppurtunity: true,
      yearsOfExperience: "",
      highestEducation: "",
      canRelocate: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof careerJobSchema>) => {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value.toString());
        }
      });

      const result = await submitApplicationWithFiles(formData);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Application submitted successfully! Check your email for confirmation.");
      form.reset();
      setResumeFileName("");
      setCoverLetterFileName("");
      router.push("/career");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: z.infer<typeof careerJobSchema>) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      mutate(data);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Resume must be less than 10MB");
        return;
      }
      setResumeFileName(file.name);
      form.setValue("resumeFile", file);
      form.clearErrors("resumeFile");
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Cover letter must be less than 10MB");
        return;
      }
      setCoverLetterFileName(file.name);
      form.setValue("coverLetterFile", file);
      form.clearErrors("coverLetterFile");
    }
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Application Progress</span>
          <span className="text-sm font-medium text-primary-500">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-4 w-full mt-8 mb-8">
        <div
          className={`flex-1 h-[90px] p-4 flex flex-col justify-between border-2 rounded-lg transition-all ${
            step >= 1
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-gray-400 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Step 1/3</span>
            {step > 1 && <CheckCircle2 className="w-5 h-5" />}
          </div>
          <span className="text-base font-semibold">Position & Personal Info</span>
        </div>
        <div
          className={`flex-1 h-[90px] p-4 flex flex-col justify-between border-2 rounded-lg transition-all ${
            step >= 2
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-gray-400 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Step 2/3</span>
            {step > 2 && <CheckCircle2 className="w-5 h-5" />}
          </div>
          <span className="text-base font-semibold">Qualifications & Documents</span>
        </div>
        <div
          className={`flex-1 h-[90px] p-4 flex flex-col justify-between border-2 rounded-lg transition-all ${
            step >= 3
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-gray-400 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Step 3/3</span>
            {step > 3 && <CheckCircle2 className="w-5 h-5" />}
          </div>
          <span className="text-base font-semibold">Legal & Submit</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form {...form}>
          {/* STEP 1: Position & Personal Information */}
          {step === 1 && (
            <div className="space-y-8 bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Position Selection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Select Position <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Choose a position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {JOB_OPENINGS.filter(job => job.status === 'active').map((job) => (
                                <SelectItem value={job.title} key={job.id}>
                                  {job.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.jobTitle && (
                      <p className="text-sm text-red-500">{form.formState.errors.jobTitle.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Preferred Location <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="jobLocation"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Choose a location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {JOB_LOCATIONS.map((location, idx) => (
                                <SelectItem value={location} key={idx}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.jobLocation && (
                      <p className="text-sm text-red-500">{form.formState.errors.jobLocation.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            placeholder="John"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Middle Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            placeholder="Optional"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Last Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            placeholder="Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            type="email"
                            placeholder="john.doe@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            type="tel"
                            placeholder="+1 (234) 567-8900"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-50 max-h-[300px]">
                            <SelectGroup>
                              {countryOptions.map((country) => (
                                <SelectItem value={country.label} key={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.country && (
                      <p className="text-sm text-red-500">{form.formState.errors.country.message}</p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            placeholder="New York"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Street Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            placeholder="123 Main Street, Apt 4B"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <AppButton
                  type="button"
                  className="px-8"
                  onClick={async () => {
                    const fields = ["jobTitle", "jobLocation", "fName", "lName", "emailAddress", "contactNo", "country", "city"];
                    const isValid = await form.trigger(fields as any);
                    if (isValid) setStep(2);
                  }}
                >
                  Continue to Step 2 →
                </AppButton>
              </div>
            </div>
          )}

          {/* STEP 2: Qualifications & Documents */}
          {step === 2 && (
            <div className="space-y-8 bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Professional Qualifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Years of Experience <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {EXPERIENCE_LEVELS.map((level) => (
                                <SelectItem value={level} key={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.yearsOfExperience && (
                      <p className="text-sm text-red-500">{form.formState.errors.yearsOfExperience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Highest Education <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="highestEducation"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {EDUCATION_LEVELS.map((level) => (
                                <SelectItem value={level} key={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.highestEducation && (
                      <p className="text-sm text-red-500">{form.formState.errors.highestEducation.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Application Documents
                </h3>
                <div className="space-y-6">
                  {/* Resume Upload */}
                  <div className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Resume/CV <span className="text-red-500">*</span>
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      Upload your resume in PDF, DOC, or DOCX format (Max 10MB)
                    </p>
                    <input
                      type="file"
                      ref={resumeInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleResumeChange}
                    />
                    <div className="flex items-center gap-4">
                      <AppButton
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        {resumeFileName ? "Change Resume" : "Upload Resume"}
                      </AppButton>
                      {resumeFileName && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                          <FileText className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700">{resumeFileName}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setResumeFileName("");
                              form.setValue("resumeFile", undefined as any);
                              if (resumeInputRef.current) {
                                resumeInputRef.current.value = "";
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    {form.formState.errors.resumeFile && (
                      <p className="text-sm text-red-500">{form.formState.errors.resumeFile.message as string}</p>
                    )}
                  </div>

                  {/* Cover Letter Upload (Optional) */}
                  <div className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Cover Letter (Optional)
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      Upload your cover letter in PDF, DOC, or DOCX format (Max 10MB)
                    </p>
                    <input
                      type="file"
                      ref={coverLetterInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleCoverLetterChange}
                    />
                    <div className="flex items-center gap-4">
                      <AppButton
                        type="button"
                        onClick={() => coverLetterInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        {coverLetterFileName ? "Change Cover Letter" : "Upload Cover Letter"}
                      </AppButton>
                      {coverLetterFileName && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                          <FileText className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700">{coverLetterFileName}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setCoverLetterFileName("");
                              form.setValue("coverLetterFile", undefined);
                              if (coverLetterInputRef.current) {
                                coverLetterInputRef.current.value = "";
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Professional Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          LinkedIn Profile
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            type="url"
                            placeholder="https://linkedin.com/in/yourprofile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Portfolio/Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border-gray-300"
                            type="url"
                            placeholder="https://yourportfolio.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  ← Back to Step 1
                </AppButton>
                <AppButton
                  type="button"
                  onClick={async () => {
                    const fields = ["yearsOfExperience", "highestEducation", "resumeFile"];
                    const isValid = await form.trigger(fields as any);
                    if (isValid) setStep(3);
                  }}
                >
                  Continue to Step 3 →
                </AppButton>
              </div>
            </div>
          )}

          {/* STEP 3: Legal & Submit */}
          {step === 3 && (
            <div className="space-y-8 bg-white p-6 rounded-lg border border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Availability & Additional Questions
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      When are you available to start? <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-gray-50 border-gray-300">
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {AVAILABILITY_OPTIONS.map((option) => (
                                <SelectItem value={option} key={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.availability && (
                      <p className="text-sm text-red-500">{form.formState.errors.availability.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 mb-3 font-medium">
                        Are you willing to relocate if required for this position?
                      </p>
                      <FormField
                        control={form.control}
                        name="canRelocate"
                        render={({ field }) => (
                          <FormItem>
                            <RadioGroup
                              onValueChange={(value) => field.onChange(value === "true")}
                              value={field.value ? "true" : "false"}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="relocate-yes" />
                                <FormLabel htmlFor="relocate-yes" className="cursor-pointer font-normal">
                                  Yes
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="relocate-no" />
                                <FormLabel htmlFor="relocate-no" className="cursor-pointer font-normal">
                                  No
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 mb-3 font-medium">
                        Have you previously been employed by Nivaran Foundation?
                      </p>
                      <FormField
                        control={form.control}
                        name="previousEmployee"
                        render={({ field }) => (
                          <FormItem>
                            <RadioGroup
                              onValueChange={(value) => field.onChange(value === "true")}
                              value={field.value ? "true" : "false"}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="previous-yes" />
                                <FormLabel htmlFor="previous-yes" className="cursor-pointer font-normal">
                                  Yes
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="previous-no" />
                                <FormLabel htmlFor="previous-no" className="cursor-pointer font-normal">
                                  No
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 mb-3 font-medium">
                        Are you currently a university student?
                      </p>
                      <FormField
                        control={form.control}
                        name="universityStudent"
                        render={({ field }) => (
                          <FormItem>
                            <RadioGroup
                              onValueChange={(value) => field.onChange(value === "true")}
                              value={field.value ? "true" : "false"}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="student-yes" />
                                <FormLabel htmlFor="student-yes" className="cursor-pointer font-normal">
                                  Yes
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="student-no" />
                                <FormLabel htmlFor="student-no" className="cursor-pointer font-normal">
                                  No
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 mb-3 font-medium">
                        May we consider you for other job opportunities at Nivaran Foundation for the next 12 months?
                      </p>
                      <FormField
                        control={form.control}
                        name="acceptsOtherOppurtunity"
                        render={({ field }) => (
                          <FormItem>
                            <RadioGroup
                              onValueChange={(value) => field.onChange(value === "true")}
                              value={field.value ? "true" : "false"}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="opportunity-yes" />
                                <FormLabel htmlFor="opportunity-yes" className="cursor-pointer font-normal">
                                  Yes
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="opportunity-no" />
                                <FormLabel htmlFor="opportunity-no" className="cursor-pointer font-normal">
                                  No
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
                  Legal Acknowledgement & Certifications
                </h3>
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                    <li>
                      I certify that all statements I have made on this application and on my resume or any other supplementary materials are true and correct. I acknowledge that any false statement or misrepresentation on this application, my resume, or supplementary materials will be cause for refusal to hire, or for immediate termination of employment at any time during the period of my employment.
                    </li>
                    <li>
                      I understand that Nivaran Foundation may conduct background checks and verify the information provided in this application.
                    </li>
                    <li>
                      I have read and understand Nivaran Foundation&apos;s Equal Employment Opportunity policy and commitment to diversity, equity, and inclusion.
                    </li>
                    <li>
                      I understand that no supervisor or manager may alter or amend these conditions except in writing, signed by an authorized company officer.
                    </li>
                  </ol>

                  <div className="flex items-start gap-3 mt-6 p-4 bg-white border-2 border-gray-300 rounded-lg">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      checked={isAcceptedTOS}
                      onChange={() => setIsAcceptedTOS(!isAcceptedTOS)}
                      className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="accept-terms" className="text-sm text-gray-800 cursor-pointer font-medium">
                      I have read, understood, and accept all the statements above as conditions of my application and potential employment with Nivaran Foundation.
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  ← Back to Step 2
                </AppButton>
                <AppButton
                  type="submit"
                  disabled={!isAcceptedTOS || isPending}
                  className="px-8"
                >
                  {isPending ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </AppButton>
              </div>
            </div>
          )}
        </Form>
      </form>
    </div>
  );
};
