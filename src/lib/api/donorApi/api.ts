import Cookies from "js-cookie";
import { api } from "../api"; // Assuming api is configured for axios requests
import { getFoundationByName } from "../foundationApi/api";

// Utility to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get("authToken");
};

// Create a new donor
export const createDonor = async (
  firstName: string,
  lastName: string,
  emailAddress: string,
  contactNumber: string,
  legalInformation: string
) => {
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
  try {
    const token = getAccessToken();
    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }

    // Fetch foundation details by name (you may implement a helper like getFoundationByName if required)
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    const response = await api.post(
      "/api/donors",
      {
        fname: firstName,
        lname: lastName,
        emailAddress,
        contactNumber,
        legalInformation,
        foundationId: foundation.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating donor:", error);
    throw new Error("Failed to create donor");
  }
};

// Get all donors
export const getAllDonors = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/donors/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching donors:", error);
    throw new Error("Failed to fetch donors");
  }
};

// Get a donor by ID
export const getDonorById = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/donors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching donor with ID ${id}:`, error);
    throw new Error("Failed to fetch donor");
  }
};

// Get donors by foundation
export const getDonorsByFoundation = async () => {
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
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/donors/foundation/${foundation.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching donors for foundation with ID ${foundation.id}:`,
      error
    );
    throw new Error("Failed to fetch donors by foundation");
  }
};
