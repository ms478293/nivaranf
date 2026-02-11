"use client";

import { getAllFoundations } from "@/lib/api/foundationApi/api";
import {
  useGetFoundation,
  useSetFoundation,
} from "@/lib/helpers/useFoundation";
import { foundationSchema } from "@/validations/validations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Define the schema

// Use zod to infer the type
type ApiResponseItem = z.infer<typeof foundationSchema>;

const FoundationComponent = () => {
  const currentFoundation = useGetFoundation();
  const setFoundation = useSetFoundation();
  const queryClient = useQueryClient();

  const handleFoundationChange = async (newFoundation: string) => {
    await setFoundation(newFoundation);

    // Invalidate and refetch the volunteers query
    queryClient.invalidateQueries({ queryKey: ["volunteer"] });
  };

  const { data: Foundations }: { data: ApiResponseItem[] | undefined } =
    useQuery({
      queryKey: ["foundations"],
      queryFn: getAllFoundations,
    });

  if (Foundations) {
    return (
      <div>
        <select
          value={currentFoundation ?? ""}
          onChange={(e) => handleFoundationChange(e.target.value)}
          className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Choose a foundation
          </option>
          {Foundations.map((item: { id: number; name: string }) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default FoundationComponent;
