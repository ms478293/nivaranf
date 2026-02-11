"use client";

import { CrossIcon } from "@/assets/icons/CrossIcon";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJob, getJobById, updateJobOpening } from "@/lib/api/jobApi/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateJobSchema, CreateJobSchemaType } from "./schema/createJob";

export const CreateJobForm = ({
  id,
  refetch,
}: {
  id?: number | string;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { data: jobData } = useQuery({
    queryKey: ["jobById"],
    queryFn: () => getJobById(id!),
    enabled: !!id
  });

  const form = useForm<CreateJobSchemaType>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      additionalInfo: {},
      applyBefore: undefined,
      benefits: {},
      jobName: "",
      introduction: "",
      jobType: "Hybrid",
      positionsOpen: 0,
      requirements: [],
      responsibilities: [],
    },
  });

  const { mutate: addJob, isPending } = useMutation({
    mutationFn: async (data: CreateJobSchemaType) => {
      await createJob(data);
      refetch?.();
    },
    onSuccess: () => {
      console.log("Job application created successfully");
      toast.success("Job application created Succesfully");
      form.reset();
      refetch?.();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      console.log("Error creating volunteer:", errorMessage);
    },
  });

  const { mutate: updateJob, isPending: isUpdating } = useMutation({
    mutationFn: async (data: CreateJobSchemaType) => {
      await updateJobOpening(data, jobData?.id);
      refetch?.();
    },
    onSuccess: () => {
      console.log("Job application updated successfully");
      toast.success("Job application updated Succesfully");
      form.reset();
      refetch?.();
    },
    onError: (error: any) => {
      console.log("ERROR JOB", error);
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      console.log("Error creating volunteer:", errorMessage);
    },
  });

  useEffect(() => {
    if (jobData) {
      form.reset({
        jobName: jobData.jobName || "",
        jobType: jobData.jobType || "Onsite", // Default to "Onsite"
        applyBefore: jobData.applyBefore || new Date().toISOString(), // Default to current date
        positionsOpen: jobData.positionsOpen || 1,
        introduction: jobData.introduction || "",
        responsibilities: jobData.responsibilities || [],
        requirements: jobData.requirements || [],
        benefits: jobData.benefits || {},
        additionalInfo: jobData.additionalInfo || {},
      });
    }
  }, [jobData]);

  const {
    fields: fieldsResponsibilities,
    append: appendResponsibilities,
    remove: removeResponsibilities,
  } = useFieldArray({
    control: form.control,
    name: "responsibilities",
  });

  const {
    fields: fieldsRequirements,
    append: appendRequirements,
    remove: removeRequirements,
  } = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  type FieldNames =
    | keyof CreateJobSchemaType
    | `benefits.${string}`
    | `additionalInfo.${string}`;

  const handleAddField = (field: FieldNames) => {
    const currentValues = form.getValues(field) || {};
    form.setValue(field, { ...currentValues, "": "" }); // Add empty key-value pair
  };

  const handleRemoveField = (field: FieldNames, key: string) => {
    const updatedValues = { ...form.getValues(field) };
    delete updatedValues[key];
    form.setValue(field, updatedValues);
  };

  const handleFieldKeyChange = (
    field: FieldNames,
    oldKey: string,
    newKey: string
  ) => {
    const updatedValues = { ...form.getValues(field) };
    delete updatedValues[oldKey];
    updatedValues[newKey] = updatedValues[oldKey] || "";
    form.setValue(field, updatedValues);
  };

  const handleFieldValueChange = (
    field: FieldNames,
    key: string,
    value: string
  ) => {
    const updatedValues = { ...form.getValues(field), [key]: value };
    form.setValue(field, updatedValues);
  };

  const onSubmit = (data: CreateJobSchemaType) => {
    if (jobData) {
      console.log("UPDATING JOB", jobData);
      updateJob({ ...data });
    } else
      addJob({
        ...data,
        benefits: JSON.stringify(data.benefits || "{}"),
        additionalInfo: JSON.stringify(data.additionalInfo || "{}"),
      });
    refetch?.();
  };

  console.log("FORM ERROR", form.formState.errors);

  if (isUpdating || isPending) return <p>Loading...</p>;

  return (
    <div className="space-y-4 bg-neutral-50 w-full pt-4 pb-16 max-h-[90vh] font-Poppins overflow-y-auto ">
      <h2 className="py-4 border-b border-gray-200 p-4 ">Add Job Listing</h2>
      <form
        action=""
        className="grid grid-cols-[1fr,_2fr] gap-4  p-4 pb-0 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="jobName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Job Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter job title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-light">
                      Job Type
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-neutral-50">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent className="font-Poppins">
                          {["Onsite", "Hybrid", "Remote"].map((type) => (
                            <SelectItem value={type} key={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="positionsOpen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-light">
                      Open position
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="applyBefore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Apply Before
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field?.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      className="w-full"
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto px-4 relative">
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Introduction
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Job description"
                      {...field}
                      className="bg-neutral-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 ">
              <FormField
                name="responsibilities"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-light">
                      Responsibilities
                    </FormLabel>
                    <FormControl>
                      <>
                        <div className="flex flex-col gap-4">
                          {fieldsResponsibilities.map((inputField, index) => (
                            <div
                              key={inputField.id}
                              className="flex items-center gap-4"
                            >
                              <Input
                                {...form.register(`responsibilities.${index}`)}
                              />
                              <button
                                type="button"
                                onClick={() => removeResponsibilities(index)}
                              >
                                <CrossIcon className="w-6 h-6 stroke-red-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                        {/* <ul className="mt-4 space-y-2">
                          {items.map((item, index) => (
                            <li
                              key={index}
                              className="p-2 border rounded bg-gray-100"
                            >
                              {item.requirement}
                            </li>
                          ))}
                        </ul> */}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AppButton
                type="button"
                onClick={() => appendResponsibilities("")}
                variant="primary-outline"
                className="w-fit"
              >
                Add
              </AppButton>
            </div>
            <div className="flex flex-col gap-2 ">
              <FormField
                name="requirements"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-light">
                      Requirements
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        {fieldsRequirements.map((inputField, index) => (
                          <div
                            key={inputField.id}
                            className="flex items-center gap-4"
                          >
                            <Input
                              {...form.register(`requirements.${index}`)}
                              placeholder="Enter responsibility"
                              // value={}
                              // onChange={handleChange}
                            />
                            <button
                              type="button"
                              onClick={() => removeRequirements(index)}
                            >
                              <CrossIcon className="w-6 h-6 stroke-red-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AppButton
                type="button"
                onClick={() => {
                  appendRequirements("");
                }}
                variant="primary-outline"
                className="w-fit"
              >
                Add
              </AppButton>
            </div>

            <FormField
              control={form.control}
              name="benefits"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Benefits
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {Object.entries(form.getValues("benefits") || {}).map(
                        ([key, value], index) => (
                          <div key={index} className="flex items-center gap-2">
                            {/* Key Input */}
                            <Input
                              type="text"
                              value={key}
                              onChange={(e) =>
                                handleFieldKeyChange(
                                  "benefits",
                                  key,
                                  e.target.value
                                )
                              }
                              placeholder="Enter key (e.g., Travel)"
                              className="w-1/2"
                            />
                            {/* Value Input */}
                            <Input
                              type="text"
                              value={value as never}
                              onChange={(e) =>
                                handleFieldValueChange(
                                  "benefits",
                                  key,
                                  e.target.value
                                )
                              }
                              placeholder="Enter value (e.g., Free)"
                              className="w-1/2"
                            />
                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveField("benefits", key)}
                            >
                              <CrossIcon className="w-6 h-6 stroke-red-600" />
                            </button>
                          </div>
                        )
                      )}
                      {/* Add New Key-Value Button */}
                      <AppButton
                        type="button"
                        onClick={() => handleAddField("benefits")}
                        variant="primary-outline"
                      >
                        + Add Benefit
                      </AppButton>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Additional Info
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {Object.entries(
                        form.getValues("additionalInfo") || {}
                      ).map(([key, value], index) => (
                        <div key={index} className="flex items-center gap-2">
                          {/* Key Input */}
                          <Input
                            type="text"
                            value={key}
                            onChange={(e) =>
                              handleFieldKeyChange(
                                "additionalInfo",
                                key,
                                e.target.value
                              )
                            }
                            placeholder="Enter key (e.g., Travel)"
                            className="w-1/2"
                          />
                          {/* Value Input */}
                          <Input
                            type="text"
                            value={value as never}
                            onChange={(e) =>
                              handleFieldValueChange(
                                "additionalInfo",
                                key,
                                e.target.value
                              )
                            }
                            placeholder="Enter value (e.g., Free)"
                            className="w-1/2"
                          />
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveField("additionalInfo", key)
                            }
                          >
                            <CrossIcon className="w-6 h-6 stroke-red-600" />
                          </button>
                        </div>
                      ))}
                      {/* Add New Key-Value Button */}
                      <AppButton
                        type="button"
                        onClick={() => handleAddField("additionalInfo")}
                        variant="primary-outline"
                      >
                        + Add additional info
                      </AppButton>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-4 py-2 w-full bg-neutral-50 fixed bottom-0 right-10">
              {/* <SubmitButton /> */}
              <AppButton
                type="submit"
                disabled={isPending}
                className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500 "
              >
                {isPending ? "Adding Program..." : "Add Program"}
              </AppButton>
            </div>
          </div>
        </Form>
      </form>
    </div>
  );
};
