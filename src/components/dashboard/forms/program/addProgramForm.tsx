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
import { createProgram } from "@/lib/api/programApi/api";
import { programSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddProgramForm() {
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      contactPerson: "",
      endDate: new Date(),
      isOpen: true,
      localEmail: "",
      location: "",
      startDate: new Date(),
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof programSchema>) => {
      return await createProgram({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
    },
    onSuccess: () => {
      console.log("Program created successfully");
      toast.success("Program created successfully");
      form.reset();
    },
    onError: () => {
      toast.error("An unexpected error occurred, Please try again");
    },
  });

  const onSubmit = (data: z.infer<typeof programSchema>) => {
    mutate({ ...data });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Program Details</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Form {...form}>
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
                        : ""
                    }
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
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="localEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <SubmitButton /> */}
          <div className="flex justify-end">
            <SubmitButton />
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
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <AppButton
      type="submit"
      disabled={pending}
      className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500"
    >
      {pending ? "Adding Program..." : "Add Program"}
    </AppButton>
  );
};
