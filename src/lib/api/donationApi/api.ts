import Cookies from "js-cookie";
import { api } from "../api"; // Assuming api is configured for axios requests
import { getFoundationByName } from "../foundationApi/api";

// Utility to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get("authToken");
};

// Create a new donation
export const createDonation = async (
  donorId: number,
  amount: number,
  donationType: string,
  foundationName: string
) => {
  try {
    const token = getAccessToken();
    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }

    // Fetch foundation details by name
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    const response = await api.post(
      "/api/donations",
      {
        donorId,
        amount,
        donationType,
        foundationId: foundation.id, // Sending foundationId with the donation data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating donation:", error);
    throw new Error("Failed to create donation");
  }
};

// Create a donation anonymously
export const createDonationAnonymous = async (
  amount: number,
  donationType: string,
  foundationName: string
) => {
  try {
    const token = getAccessToken();
    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }

    // Fetch foundation details by name
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    const response = await api.post(
      "/api/donations/anon",
      {
        amount,
        donationType,
        foundationId: foundation.id, // Sending foundationId with the donation data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating anonymous donation:", error);
    throw new Error("Failed to create anonymous donation");
  }
};

// Get all donations
export const getAllDonations = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/donations/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw new Error("Failed to fetch donations");
  }
};

// Get donations by foundation
export const getDonationsByFoundation = async () => {
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
    const response = await api.get(
      `/api/donations/foundation/${foundation.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching donations for foundation with ID ${foundation.id}:`,
      error
    );
    throw new Error("Failed to fetch donations by foundation");
  }
};
