import { programSchema, ProgramType } from "@/validations/validations";
import Cookies from "js-cookie";
import { z } from "zod";
import { api } from "../api"; // Assuming api is configured for Axios requests
import { getFoundationByName } from "../foundationApi/api"; // Utility to fetch foundation details

// Utility to get the access token from cookies
export const getAccessToken = () => {
  return Cookies.get("authToken");
};

// Helper to fetch foundation ID
export const getFoundationId = async () => {
  const foundationName = Cookies.get("currentFoundation");
  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  // Fetch the foundation details by name
  const foundation = await getFoundationByName(foundationName);
  if (!foundation || !foundation.id) {
    throw new Error("Invalid foundation data");
  }

  return foundation.id;
};

// Create a new Program
export const createProgram = async (data: ProgramType) => {
  console.log("PROGRAM DATA", data);
  const token = getAccessToken();
  console.log("TOKEN", token);
  try {
    const foundationId = await getFoundationId(); // Get the foundation ID dynamically

    const response = await api.post(
      "/api/programs",
      { ...data, foundationId, projectsId: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating program:", error);
    throw new Error("Failed to create program");
  }
};

// Get all Programs
export const getAllPrograms = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/programs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw new Error("Failed to fetch programs");
  }
};

// Get Programs by Foundation
export const getProgramsByFoundation = async () => {
  try {
    const foundationId = await getFoundationId(); // Get the foundation ID dynamically
    const token = getAccessToken();

    const response = await api.get(`/api/programs/foundation/${foundationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching programs for foundation:`, error);
    throw new Error("Failed to fetch programs by foundation");
  }
};

export const getProgramById = async (
  id: number
): Promise<z.infer<typeof programSchema>> => {
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/programs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Program with id ${id}:`, error);
    throw new Error("Failed to fetch Program");
  }
};

// Update a Program
export const updateProgram = async (
  id: number,
  data: z.infer<typeof programSchema>
) => {
  console.log("ID", data);
  try {
    const token = getAccessToken();

    const response = await api.put(
      `/api/programs/${id}`,
      {
        ...data,
        startDate:
          data.startDate instanceof Date
            ? data.startDate.toISOString()
            : data.startDate,
        endDate:
          data.endDate instanceof Date
            ? data.endDate.toISOString()
            : data.endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating program with ID ${id}:`, error);
    throw new Error("Failed to update program");
  }
};

// Delete a Program
export const deleteProgram = async (id: number) => {
  try {
    const token = getAccessToken();
    await api.delete(`/api/programs/programs`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return { message: "Program deleted successfully" };
  } catch (error) {
    console.log(`Error deleting program with ID ${id}:`, error);
    throw new Error("Failed to delete program");
  }
};
