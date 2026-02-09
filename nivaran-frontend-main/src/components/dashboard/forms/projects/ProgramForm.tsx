"use client";

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
import { createProgram, updateProgram } from "@/lib/api/programApi/api";
import { programSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ProgramType } from "../program/ProgramTable";

export const ProgramForm = ({
  programData,
  refetch,
  onClose,
}: {
  programData?: ProgramType;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  onClose?: () => void;
}) => {
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      contactPerson: "",
      endDate: undefined,
      isOpen: true,
      localEmail: "",
      location: "",
      startDate: undefined,
      // status: "",
    },
  });

  useEffect(() => {
    if (programData) {
      form.reset({
        name: programData.name || "",
        contactNumber: programData.contactNumber || "",
        contactPerson: programData.contactPerson || "",
        endDate: programData.endDate
          ? new Date(programData.endDate)
          : new Date(),
        isOpen: programData.isOpen ?? true,
        localEmail: programData.localEmail || "",
        location: programData.location || "",
        startDate: programData.startDate
          ? new Date(programData.startDate)
          : new Date(),
        // status: programData.status || "",
      });
    }
  }, [programData]);

  const { mutate: addProgram, isPending: isAdding } = useMutation({
    mutationFn: async (data: z.infer<typeof programSchema>) => {
      await createProgram({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
      refetch?.();
    },
    onSuccess: () => {
      console.log("Program created successfully");
      toast.success("Program created successfully");
      refetch?.();
      form.reset();
    },
    onError: () => {
      toast.error("An unexpected error occurred, Please try again");
    },
  });

  const { mutate: updateAction, isPending: isUpdating } = useMutation({
    mutationFn: async (data: z.infer<typeof programSchema>) => {
      console.log("DATA UPDATE", data);
      await updateProgram((programData as any)?.id, data);
    },
    onSuccess: () => {
      console.log("Program updated successfully");
      toast.success("Program updated successfully");
      form.reset();
      refetch?.();
    },
    onError: () => {
      toast.error("An unexpected error occurred, Please try again");
    },
  });

  const onSubmit = (data: z.infer<typeof programSchema>) => {
    console.log("Program ID for Update:", programData?.id);
    if (programData?.id) {
      console.log("ID UPDATE", programData.id);
      updateAction({ ...data });
      refetch?.();
      onClose?.();
    } else {
      addProgram({ ...data });
      refetch?.();
    }
  };

  console.log("DATAAAAA", programData);

  return (
    <div className="space-y-4 bg-neutral-50 w-full pt-4  max-h-[90vh] font-Poppins overflow-y-auto ">
      <h2 className="py-4 border-b border-gray-200 p-4 ">
        {programData?.id ? "Edit" : "Add"} Programs
      </h2>
      <form
        className="grid grid-cols-1 gap-4 p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <div className="col-span-full grid grid-cols-2 items-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter program name"
                      // value={programData?.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camp Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter camp location"
                      // value={programData?.location}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm font-light">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={programData?.status}
                    >
                      <SelectTrigger className="bg-neutral-50">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="font-Poppins">
                        {["Completed", "Ongoing", "Planned"].map((type) => (
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
            /> */}
          </div>
          <div className="flex items-center gap-2 col-span-full">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
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
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
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

          <h2 className="mt-4">Contact details</h2>
          <div className=" gap-4 grid grid-cols-2">
            <FormField
              control={form.control}
              name="localEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      // value={programData?.localEmail}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter contact person name"
                      // value={programData?.contactPerson}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter contact person name"
                      // value={programData?.contactNumber}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isOpen"
            render={({ field }) => (
              <FormItem className=" flex-col flex gap-2">
                <FormLabel>Is Program open?</FormLabel>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value ? "true" : "false"}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem
                        value={"true"}
                        className="w-4 h-4"
                        id="isOpen-yes"
                      />
                    </FormControl>
                    <FormLabel htmlFor="isOpen-yes" className="cursor-pointer">
                      Yes
                    </FormLabel>
                  </div>

                  <div className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem
                        value={"false"}
                        className="w-4 h-4"
                        id="isOpen-no"
                      />
                    </FormControl>
                    <FormLabel htmlFor="isOpen-no" className="cursor-pointer">
                      No
                    </FormLabel>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <AppButton
              type="submit"
              disabled={isAdding || isUpdating}
              className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500"
            >
              {!programData?.id ? "Add Program" : "Edit Program"}
            </AppButton>
            {/* <AppButton
              type="submit"
              disabled={pending}
              className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500"
            >
              Add Program
              {pending ? "Adding Program..." : "Add Program"}
            </AppButton> */}
          </div>
        </Form>
      </form>
    </div>
  );
};
