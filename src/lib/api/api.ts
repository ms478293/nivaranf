import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "../auth/useAuth";

// Create Axios instance
export const api = axios.create({
  baseURL: "https://api.nivaranfoundation.org", // Set your API base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Attach tokens to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("authToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true; // Prevent infinite retry loops

      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshToken();

        // Set new token in Authorization header
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the failed request with new token
        return api.request(error.config);
      } catch (refreshError) {
        // If token refresh fails, log out the user
        console.error("Session expired. Redirecting to login...");
        Cookies.remove("authToken");
        Cookies.remove("refreshToken");

        // Redirect to login page
        window.location.replace("/auth/login"); // Adjust to your login page URL
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication functions
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// Register user
export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  const { accessToken, refreshToken } = response.data;

  // Store tokens in cookies
  Cookies.set("accessToken", accessToken, { secure: true, sameSite: "strict" });
  Cookies.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
  });

  return response.data;
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  const { accessToken, refreshToken } = response.data;

  // Store tokens in cookies
  Cookies.set("authToken", accessToken, { secure: true, sameSite: "strict" });
  Cookies.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
  });

  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    // Make request to backend to log out
    await api.post("/auth/logout", { refreshToken });

    // Remove tokens from cookies
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");

    // Redirect to the login page after logging out
    window.location.replace("/auth/login");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Failed to log out.");
  }
};
