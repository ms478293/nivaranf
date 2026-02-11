"use client";

import { generatePDF } from "@/components/dashboard/actions/generatePdf";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllFinsByFoundation, getFinsById } from "@/lib/api/finApi/api";
import { getFoundationByName } from "@/lib/api/foundationApi/api";
import { createImpact } from "@/lib/api/impactApi/api";
import { getProgramById } from "@/lib/api/programApi/api";
import { cn } from "@/lib/utils";
import { financialSchema, impactSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddImpactForm() {
  const form = useForm<z.infer<typeof impactSchema>>({
    resolver: zodResolver(impactSchema),
    defaultValues: {
      yearOfPublish: undefined,
      author: "",
      executiveSummary: "",
      mission: "",
      vision: "",
      goals: [], // Ensure it's an array matching the schema
      strategicPlanning: "",
      callToAction: "",
      programIds: [],
      photographs: [],
      financialReportId: undefined,
      quantitativeDataIds: undefined,
    },
  });

  const { data: financialReports } = useQuery({
    queryKey: ["financialReports"],
    queryFn: getAllFinsByFoundation,
  });

  const { mutate: addImpact, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof impactSchema>) => {
      return await createImpact(data);
    },
    onSuccess: () => {
      console.log("Impact created successfully");
      toast.success("Impact created Succesfully");
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error creating impact:", error.message);
      form.setError("yearOfPublish", {
        type: "manual",
        message: error.message,
      });
    },
  });

  const {
    fields: goals,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "goals" as never, // This must match the schema's field name
  });

  const {
    fields: photographs,
    append: photoAppend,
    remove: photoRemove,
  } = useFieldArray({
    control: form.control,
    name: "photographs",
  });

  const handleImageUpload = async (file: File) => {
    const token = Cookies.get("authToken");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", file.name.toString());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    formData.append("height", 60);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    formData.append("width", 40);
    // const token = Cookies.get("authToken");
    const foundationName = Cookies.get("currentFoundation");
    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }

    // Fetch the foundation details by name
    const foundation = await getFoundationByName(foundationName);
    // Ensure that the foundation data is valid
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }
    formData.append("foundationId", foundation.id);

    try {
      const response = await axios.post(
        "https://api.nivaranfoundation.org/api/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { url, id, label } = response.data;
      photoAppend({ id, url, label });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof impactSchema>) => {
    try {
      console.log("Form data:", data);

      // Generate and download the PDF

      try {
        // Pass fetched data to generatePDF
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        financialReportData &&
          programData &&
          (await generatePDF({
            ...data,
            financialReportData,
            programData,
          }));
        console.log("PDF generated successfully!");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }

      // Optionally save the impact data to your backend
      addImpact(data);
    } catch (error) {
      console.error("Error generating PDF or submitting data:", error);
    }
  };

  //For Pdf generation

  const [financialReportId] = useState<number | null>(null);
  const [programIds] = useState<number[]>([]);
  const { data: financialReportData } = useQuery({
    queryKey: ["financialReport", financialReportId],
    queryFn: () => {
      if (financialReportId) {
        return getFinsById(financialReportId);
      }
      return Promise.reject(new Error("No financialReportId provided"));
    },
    enabled: !!financialReportId,
  });

  const { data: programData } = useQuery({
    queryKey: ["programs", programIds],
    queryFn: async () => {
      if (!programIds || programIds.length === 0) {
        return [];
      }

      return Promise.all(
        programIds.map((programId) => getProgramById(programId))
      );
    },
    enabled: !!programIds && programIds.length > 0,
  });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="flex flex-col gap-4 ">
          {/* Year of Publish */}

          <div>
            <label className="block font-bold text-lg">Date of Publish</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !form.watch("yearOfPublish") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {form.watch("yearOfPublish")
                    ? format(form.watch("yearOfPublish"), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.watch("yearOfPublish")}
                  onSelect={(date) =>
                    date && form.setValue("yearOfPublish", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Author
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Author Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Executive Summary */}
          <FormField
            control={form.control}
            name="executiveSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Executive Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief summary"
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Mission */}
          <FormField
            control={form.control}
            name="mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Mission
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the mission"
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vision */}
          <FormField
            control={form.control}
            name="vision"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Vision
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the vision"
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Goals */}

          <div className="flex flex-col gap-4">
            <FormLabel className="block font-bold text-lg">Goals</FormLabel>
            {goals.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormControl key={field.id}>
                  <Input
                    {...form.register(`goals.${index}`)}
                    placeholder={`Goal ${index + 1}`}
                    className="h-32"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append("")}
              className="bg-green-700 "
            >
              Add Goal
            </Button>
          </div>

          {/* Strategic Planning */}
          <FormField
            control={form.control}
            name="strategicPlanning"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Strategic Planning
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Strategic planning details"
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Call to Action */}
          <FormField
            control={form.control}
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Call to Action
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Call to action"
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Financial Report ID */}
          <FormField
            control={form.control}
            name="financialReportId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Financial Report
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value ? parseInt(value) : undefined)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Financial Report" />
                    </SelectTrigger>
                    <SelectContent>
                      {financialReports?.map(
                        (report: z.infer<typeof financialSchema>) =>
                          report.id &&
                          report.startDate &&
                          report.endDate && (
                            <SelectItem
                              key={report.id}
                              value={report.id.toString()}
                            >
                              {new Date(report.startDate).toLocaleDateString() +
                                " to " +
                                new Date(report.endDate).toLocaleDateString()}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Program IDs */}
          {/* <FormField
            control={form.control}
            name="programIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block font-bold text-lg">
                  Programs (Select all that apply)
                </FormLabel>
                <FormControl>
                  <div className="grid  lg:grid-cols-4 grid-cols-1 gap-4  auto-cols-max">
                    {programs?.map(
                      (program: z.infer<typeof programSchema>) =>
                        program.name && (
                          <div
                            className="flex bg-white border rounded-xl p-4 w-fit "
                            key={program.id}
                            onClick={(e) => {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-expect-error
                              const updatedValue = e.target.checked
                                ? [...field.value, program.id]
                                : field.value.filter((id) => id !== program.id);
                              field.onChange(updatedValue);
                              console.log(updatedValue);
                            }}
                          >
                            <label key={program.id}>
                              <input
                                type="checkbox"
                                value={program.id.toString()}
                                checked={field.value.includes(program.id)}
                                onChange={(e) => {
                                  const updatedValue = e.target.checked
                                    ? [...field.value, program.id]
                                    : field.value.filter(
                                        (id) => id !== program.id
                                      );
                                  field.onChange(updatedValue);
                                }}
                                className="w-10 h-10"
                              />
                              <div className="flex flex-col gap-4">
                                <span className="font-bold">
                                  Description: {program.description}
                                </span>
                                <span className="font-small">
                                  Outcome: {program.outcome}
                                </span>
                              </div>
                            </label>
                          </div>
                        )
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className=" font-bold text-lg">
            Upload Photographs (Can Upload Multiple)
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
              placeholder="Upload Files"
              className="w-fit"
            />
          </div>

          {/* Display existing photographs */}
          {photographs.map((photo, index) => (
            <div key={photo.id || index} className="flex items-center gap-4">
              <img
                src={`https://api.nivaranfoundation.org:8000${photo.url}`}
                alt={photo.label}
                className="w-16 h-16 object-cover"
              />
              <div>
                <p>{photo.label}</p>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => photoRemove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Create Impact"}
            </Button>
          </div>
        </div>
      </Form>
    </form>
  );
}
