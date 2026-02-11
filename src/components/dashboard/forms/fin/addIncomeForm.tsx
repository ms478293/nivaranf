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
import { Textarea } from "@/components/ui/textarea";
import { addIncomeEntry } from "@/lib/api/finApi/api";
import { useGetFoundation } from "@/lib/helpers/useFoundation"; // Assuming this is a custom hook
import { entrySchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function IncomeEntryForm() {
  const form = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: { amount: 0, description: "", type: "" },
  });

  const foundationName = useGetFoundation();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof entrySchema>) => {
      if (!foundationName) {
        throw new Error("Foundation name is not available");
      }

      // Ensure amount is a number before sending to the backend
      return await addIncomeEntry({ ...data, foundationName });
    },
    onSuccess: () => {
      console.log("Income Entry created successfully");
      toast.success("Income Entry created Succesfully");
      form.reset();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      console.error("Error creating Income Entry:", errorMessage);
      form.setError("description", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof entrySchema>) => {
    // Explicitly ensure `amount` is converted to a number
    mutate({ ...data, amount: Number(data.amount) });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Income Entry</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Credit">Credit</SelectItem>
                      <SelectItem value="Debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
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
                    step="any"
                    placeholder="Enter Amount"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Create Income Entry"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
