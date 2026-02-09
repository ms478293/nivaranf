"use client";

import { Button } from "@/components/ui/button";
import { createFin } from "@/lib/api/finApi/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers";
import { financialSchema } from "@/validations/validations";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

// Zod validation schema for the form

export function AddFinForm() {
  const form = useForm({
    resolver: zodResolver(financialSchema),
    defaultValues: { startDate: new Date(), endDate: new Date() },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: z.infer<typeof financialSchema>) => {
      // Call the createFin API
      return await createFin(data.startDate, data.endDate);
    },
    onSuccess: () => {
      console.log("Fin entry created successfully");
      toast.success("Finance Entry created Succesfully");
      form.reset();
      queryClient.refetchQueries({ queryKey: ["fins"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      console.error("Error creating Fin:", errorMessage);
    },
  });

  const onSubmit = (data: z.infer<typeof financialSchema>) => {
    mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Create Financial Period</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !form.watch("startDate") && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {form.watch("startDate")
                  ? format(form.watch("startDate"), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.watch("startDate")}
                onSelect={(date) => date && form.setValue("startDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block font-semibold">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !form.watch("endDate") && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {form.watch("endDate")
                  ? format(form.watch("endDate"), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.watch("endDate")}
                onSelect={(date) => date && form.setValue("endDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Create Financial Period"}
          </Button>
        </div>
      </form>
    </div>
  );
}
