"use client";

import { VoluteerTableType } from "@/components/new/VolunteerTable/VolunteeerTable";
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
import { getProgramsByFoundation } from "@/lib/api/programApi/api";
import { createVolunteer } from "@/lib/api/volunteerApi/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { volunteerSchema, VolunteerSchemaType } from "./schema/volunteerSchema";

export function VolunteerForm({
  data,
  refetch,
}: {
  data?: VoluteerTableType;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) {
  const form = useForm<VolunteerSchemaType>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fname: "",
      mname: "",
      lname: "",
      nationality: "",
      gender: "",
      why: "",
      experience: "",
      phone: "",
      email: "",
      address: "",
      programId: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        fname: data.fname || "",
        mname: data.mname || "",
        lname: data.lname || "",
        nationality: data.nationality || "",
        gender: data.gender || "",
        why: data.why || "",
        experience: data.experience || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
        programId: data.programId || 0,
      });
    }
  }, [data]);

  console.log("DATA EDIT", data);

  // Use your hook to get the foundation name
  // const foundationName = useGetFoundation();

  const { data: programData, isPending: programPending } = useQuery({
    queryKey: ["program"],
    queryFn: async () => await getProgramsByFoundation(),
  });

  const { mutate: mutateVolunteer, isPending: isVolunteerPending } =
    useMutation({
      mutationFn: async (data: z.infer<typeof volunteerSchema>) => {
        await createVolunteer(data);
      },
      onSuccess: () => {
        console.log("Volunteer created successfully");
        toast.success("Volunteer created Succesfully");
        form.reset();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.message || "An unexpected error occurred. Please try again.";
        console.log("Error creating volunteer:", errorMessage);
      },
    });

  // const { mutate: updateVolunteer, isPending: updatinVolunteer } = useMutation({
  //   mutationFn: async (data: z.infer<typeof volunteerSchema>) => {
  //     await upd(data);
  //   },
  //   onSuccess: () => {
  //     console.log("Volunteer created successfully");
  //     toast.success("Volunteer created Succesfully");
  //     form.reset();
  //   },
  //   onError: (error: any) => {
  //     const errorMessage =
  //       error?.message || "An unexpected error occurred. Please try again.";
  //     console.log("Error creating volunteer:", errorMessage);
  //   },
  // });

  console.log("PROGRAM", programData);

  const onSubmit = (data: z.infer<typeof volunteerSchema>) => {
    mutateVolunteer(data);
    console.log("Volunteer Data", data);
    refetch?.();
    // Call the mutation with the form data
  };

  return (
    <div className="space-y-4 bg-neutral-50  pt-4 pb-16 max-h-[90vh] font-Poppins overflow-y-auto w-[40rem] ">
      <h2 className="py-4 border-b border-gray-200 p-4 ">Add Job Listing</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid-cols-2 grid p-4 gap-4"
        >
          <div className="col-span-full flex flex-col gap-2">
            <h2 className="text-gray-600 font-medium">Personal Information</h2>

            <div className="grid grid-cols-2 gap-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        // value={data?.fname}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter middle name"
                        // value={data?.mname}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        // value={data?.lname}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter nationality"
                        // value={data?.nationality}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Gender"
                            defaultValue={String(data?.gender)}
                          />
                        </SelectTrigger>
                        <SelectContent className="font-Poppins">
                          <SelectItem value="Male" key={"male"}>
                            Male
                          </SelectItem>
                          <SelectItem value="Female" key={"female"}>
                            Female
                          </SelectItem>
                          <SelectItem value="Other" key={"other"}>
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <h2 className="text-gray-600 font-medium">Contact Information</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                      // value={data?.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact no</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="9800000000"
                      {...field}
                      value={data?.phone}
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
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      {...field}
                      // value={data?.address}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Why Volunteer */}
          <div className="col-span-full flex flex-col gap-2">
            <h2 className="text-gray-600 font-medium">Extra Information</h2>
            <FormField
              control={form.control}
              name="why"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to Volunteer?</FormLabel>
                  <FormControl>
                    <Textarea
                      // value={data?.why}
                      placeholder="Why do you want to volunteer?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full flex flex-col gap-2">
            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your experience"
                      {...field}
                      // value={data?.experience}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a Program</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      // defaultValue={field.value}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Program" />
                      </SelectTrigger>
                      <SelectContent className="font-Poppins text-gray-950">
                        {programData?.map((program) => {
                          return (
                            <SelectItem
                              value={String(program.id)}
                              key={program.id}
                            >
                              {programPending ? "Loading..." : program.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-end mt-4 py-2 w-full bg-neutral-50 fixed bottom-0 right-6">
            {/* <SubmitButton /> */}
            <AppButton
              type="submit"
              disabled={isVolunteerPending}
              className="disabled:bg-gray-400 hover:bg-primary-200 hover:text-primary-500 "
            >
              {isVolunteerPending ? "Adding Program..." : "Add Program"}
            </AppButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
