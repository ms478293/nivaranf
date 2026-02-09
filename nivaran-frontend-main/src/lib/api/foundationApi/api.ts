import Cookies from "js-cookie";
import { api } from "../api";

const getAccessToken = () => {
  return Cookies.get("authToken");
};

export const getAllFoundations = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/foundations/foundations/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching foundations:", error);
    throw new Error("Failed to fetch foundations");
  }
};

export const getFoundationByName = async (name: string) => {
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/foundations/web/foundations/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching foundation with Name ${name}:`, error);
    throw new Error("Failed to fetch Foundation");
  }
};

export const getFoundationByNameForWeb = async (name: string) => {
  try {
    const response = await api.get(
      `/api/foundations/web/foundations/${name}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching foundation with Name ${name}:`, error);
    throw new Error("Failed to fetch Foundation");
  }
};
