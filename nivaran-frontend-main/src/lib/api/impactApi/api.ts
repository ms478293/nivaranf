import { impactSchema } from "@/validations/validations";
import Cookies from "js-cookie";
import { z } from "zod";
import { api } from "../api"; // Assuming api is configured for Axios requests
import {
  getFoundationByName,
  getFoundationByNameForWeb,
} from "../foundationApi/api"; // Utility to fetch foundation details

// Utility to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get("authToken");
};

type CreateImpactInput = z.infer<typeof impactSchema>;

// Create a new impact
export const createImpact = async (data: CreateImpactInput) => {
  try {
    const token = getAccessToken();
    const foundationName = Cookies.get("currentFoundation");

    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }

    // Fetch foundation details by name
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    // Validate the data using the Zod schema
    impactSchema.parse(data); // This will throw an error if validation fails

    const response = await api.post(
      "/api/impacts", // Post request to create an impact
      {
        yearOfPublish: data.yearOfPublish,
        author: data.author,
        executiveSummary: data.executiveSummary,
        mission: data.mission,
        vision: data.vision,
        goals: data.goals,
        strategicPlanning: data.strategicPlanning,
        photographs: data.photographs,
        callToAction: data.callToAction,
        financialReportId: data.financialReportId,
        foundationId: foundation.id, // Using the fetched foundation ID
        programIds: data.programIds, // Sending program IDs with the impact data
        quantitativeDataIds: data.quantitativeDataIds, // Optional, sending quantitative data IDs
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers for authentication
        },
      }
    );

    return response.data; // Return created impact data
  } catch (error) {
    console.error("Error creating impact:", error);
    throw new Error("Failed to create impact");
  }
};

export const getImpact = async ({
  getByFoundation,
  impactId,
}: {
  getByFoundation: boolean;
  impactId?: string;
}) => {
  try {
    const token = getAccessToken();
    if (!token) throw new Error("Authentication token is missing");

    const params: { foundationId?: number; impactId?: number } = {};

    if (getByFoundation) {
      const foundationName = Cookies.get("currentFoundation");
      if (!foundationName) throw new Error("Foundation name is not available");

      const foundation = await getFoundationByName(foundationName);
      if (!foundation?.id) throw new Error("Invalid foundation data");

      params.foundationId = Number(foundation.id);
    } else if (impactId) {
      params.impactId = Number(impactId);
    } else {
      throw new Error(
        "Either 'getByFoundation' or 'impactId' must be provided"
      );
    }

    // Fetch impacts from API
    const response = await api.get("/api/impacts", {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching impact:", error);
    throw new Error("Failed to fetch impact data");
  }
};

export const getImpactForWeb = async ({
  getByFoundation,
  impactId,
}: {
  getByFoundation: boolean;
  impactId?: string;
}) => {
  try {
    const params: { foundationId?: number; impactId?: number } = {};

    if (getByFoundation) {
      const foundationName = Cookies.get("currentFoundation");
      if (!foundationName) throw new Error("Foundation name is not available");

      const foundation = await getFoundationByNameForWeb(foundationName);
      if (!foundation?.id) throw new Error("Invalid foundation data");

      params.foundationId = Number(foundation.id);
    } else if (impactId) {
      params.impactId = Number(impactId);
    } else {
      throw new Error(
        "Either 'getByFoundation' or 'impactId' must be provided"
      );
    }

    // Fetch impacts from API
    const response = await api.get("/api/web/impacts", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching impact:", error);
    throw new Error("Failed to fetch impact data");
  }
};
