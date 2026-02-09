import { VolunteerSchemaType } from "@/components/dashboard/forms/volunteer/schema/volunteerSchema";
import Cookies from "js-cookie";
import { api } from "../api";
import {
  getFoundationByName,
  getFoundationByNameForWeb,
} from "../foundationApi/api";
import { getFoundationId } from "../programApi/api";

const getAccessToken = () => {
  return Cookies.get("authToken");
};

export const createVolunteer = async (data: VolunteerSchemaType) => {
  try {
    const token = getAccessToken();

    // Fetch the foundation details by name
    const foundationId = await getFoundationId();
    // Ensure that the foundation data is valid
    if (!foundationId) {
      throw new Error("Invalid foundation data");
    }

    // Send the volunteer data along with the foundation ID
    const response = await api.post(
      "/api/volunteers",
      {
        ...data,
        foundationId,
        // Attach the foundation ID to the volunteer
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating volunteer:", error);
    throw new Error("Failed to create volunteer");
  }
};

export const createVolunteerApplication = async (
  data: VolunteerSchemaType,
  programId: number
) => {
  try {
    // Fetch the foundation details by name
    const foundationId = await getFoundationId();
    // Ensure that the foundation data is valid
    if (!foundationId) {
      throw new Error("Invalid foundation data");
    }

    // Send the volunteer data along with the foundation ID
    const response = await api.post("/api/volunteers/application", {
      ...data,
      foundationId,
      programId,
    });
    return response.data;
  } catch (error) {
    console.log("Error creating volunteer:", error);
    throw new Error("Failed to create volunteer");
  }
};
export const addJoinedAt = async (id: number, joinedAt: Date) => {
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/volunteers/joinedAt",
      { id, joinedAt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating joinedAt:", error);
    throw new Error("Failed to update joinedAt");
  }
};

export const addLeftAt = async (id: number, leftAt: Date) => {
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/volunteers/leftAt",
      { id, leftAt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating leftAt:", error);
    throw new Error("Failed to update leftAt");
  }
};
export const acceptApplication = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/volunteers/application/accept",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Accepting Application:", error);
    throw new Error("Failed to Accept Application");
  }
};

export const rejectApplication = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.delete("/api/volunteers/application/reject", {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Rejecting Application:", error);
    throw new Error("Failed to Reject Application");
  }
};

// Function to get all volunteers
export const getAllVolunteers = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/volunteers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

// Function to get a volunteer by ID
export const getVolunteerById = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/volunteers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching volunteer with ID ${id}:`, error);
    throw new Error("Failed to fetch volunteer");
  }
};
export const getVolunteerByFoundation = async () => {
  try {
    const token = getAccessToken();

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
    const response = await api.get(
      `/api/volunteers/foundation/${foundation.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching volunteer with Foundation}:`, error);
    throw new Error("Failed to fetch volunteer");
  }
};

export const getVolunteerApplicationByFoundation = async () => {
  try {
    const token = getAccessToken();

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
    const response = await api.get(
      `/api/volunteers/applications/${foundation.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching volunteer with Foundation}:`, error);
    throw new Error("Failed to fetch volunteer");
  }
};

export const createVolunteerApplicationNivaran = async (
  firstName: string,
  lastName: string,
  nationality: string,
  gender: string,
  why: string,
  experience: string,
  phone: string,
  email: string,
  address: string,
  foundationName: string,
  cv?: string
) => {
  try {
    if (!foundationName) {
      throw new Error("Foundation name is not available");
    }
    // Fetch the foundation details by name
    const foundation = await getFoundationByNameForWeb(foundationName);
    // Ensure that the foundation data is valid
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    // Send the volunteer data along with the foundation ID
    const response = await api.post("/api/volunteers/application", {
      fname: firstName,
      lname: lastName,
      nationality,
      gender,
      cv,
      why,
      experience,
      phone,
      email,
      address,
      foundationId: foundation.id,
      foundation: foundation, // Attach the foundation ID to the volunteer
    });
    return response.data;
  } catch (error) {
    console.error("Error creating volunteer:", error);
    throw new Error("Failed to create volunteer");
  }
};

export const deleteVolunteer = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.delete("/api/volunteers", {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Deleting Volunteer:", error);
    throw new Error("Failed to Delete Volunteer");
  }
};
