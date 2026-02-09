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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createDonation,
  createDonationAnonymous,
} from "@/lib/api/donationApi/api";
import { getDonorsByFoundation } from "@/lib/api/donorApi/api";
import { useGetFoundation } from "@/lib/helpers/useFoundation";
import { donationSchema, donorSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddDonationForm() {
  const form = useForm({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      isAnonymous: true,
      donor: undefined,
      amount: 0,
      donationType: "Monetary",
    },
  });

  const foundationName = useGetFoundation();

  const { data: donors, isPending: loadingDonors } = useQuery({
    queryKey: ["donors"],
    queryFn: getDonorsByFoundation,
  });

  const { mutate: addDonation, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof donationSchema>) => {
      if (!foundationName) {
        throw new Error("Foundation name is not available");
      }

      if (data.isAnonymous) {
        return await createDonationAnonymous(
          data.amount,
          data.donationType,
          foundationName
        );
      } else {
        if (!data.donor || !data.donor.id) {
          throw new Error("Donor is required for non-anonymous donations");
        }
        return await createDonation(
          data.donor.id,
          data.amount,
          data.donationType,
          foundationName
        );
      }
    },
    onSuccess: () => {
      toast.success("Donation created Succesfully");
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error creating donation:", error.message);
      form.setError("amount", { type: "manual", message: error.message });
    },
  });

  const onSubmit = (data: z.infer<typeof donationSchema>) => {
    addDonation(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Donation</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="donationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donation Type</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Monetary, Goods, or Service"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter Amount"
                    value={field.value || ""} // Ensure an empty string is passed if value is undefined
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : parseFloat(e.target.value)
                      )
                    } // Convert the value to a number or undefined
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donation Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Anonymous or With Donor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Anonymous</SelectItem>
                      <SelectItem value="false">With Donor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!form.watch("isAnonymous") && (
            <FormField
              control={form.control}
              name="donor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Donor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange({
                          id: parseInt(value),
                          ...donors.find(
                            (d: z.infer<typeof donorSchema>) =>
                              d.id === parseInt(value)
                          ),
                        })
                      }
                      disabled={loadingDonors}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a donor" />
                      </SelectTrigger>
                      <SelectContent>
                        {donors.length > 0 ? (
                          donors.map(
                            (donor: z.infer<typeof donorSchema>) =>
                              donor.id && (
                                <SelectItem
                                  key={donor.id}
                                  value={donor.id.toString()}
                                >
                                  {donor.fname} {donor.lname}
                                </SelectItem>
                              )
                          )
                        ) : (
                          <p>No donors available</p>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Add Donation"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
