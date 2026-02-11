"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createDonor } from "@/lib/api/donorApi/api";
import { useGetFoundation } from "@/lib/helpers/useFoundation"; // Assuming this is a custom hook
import { donorSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddDonorForm() {
  const form = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      fname: "",
      lname: "",
      emailAddress: "",
      contactNumber: "",
      legalInformation: "",
    },
  });

  const foundationName = useGetFoundation();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof donorSchema>) => {
      if (!foundationName) {
        throw new Error("Foundation name is not available");
      }
      if (data.emailAddress && data.contactNumber && data.legalInformation)
        return await createDonor(
          data.fname,
          data.lname,
          data.emailAddress,
          data.contactNumber,
          data.legalInformation
        );
    },
    onSuccess: () => {
      console.log("Donor created successfully");
      toast.success("Donor added Succesfully");
      form.reset();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      console.error("Error creating Donor :", errorMessage);
      form.setError("fname", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof donorSchema>) => {
    // Explicitly ensure `amount` is converted to a number
    mutate({ ...data });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Donor Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} />
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
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Contact Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="legalInformation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship Number:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Citizenship Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Add Donor Information"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
