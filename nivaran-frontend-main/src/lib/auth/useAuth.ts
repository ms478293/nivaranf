"use client";

import axios from "axios";
import "dotenv";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Helper function to refresh the token
export const refreshToken = async () => {
  const refresh = Cookies.get("refreshToken");

  if (!refresh) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      "https://api.nivaranfoundation.org/auth/refresh-token",
      { refresh }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update cookies with new tokens
    Cookies.set("authToken", accessToken, {
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refreshToken", newRefreshToken, {
      secure: true,
      sameSite: "strict",
    });

    return accessToken;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error refreshing token:", error);
    } else {
      console.error("Unknown error refreshing token:", error);
    }
    throw new Error("Failed to refresh token.");
  }
};

// Helper function to verify the token
// export const verifyToken = async () => {
//   const accessToken = Cookies.get("authToken");

//   if (!accessToken) {
//     throw new Error("No access token available.");
//   }

//   try {
//     const response = await axios.get(`http://localhost/auth/verify`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response.data; // If token is valid, return user data
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error verifying token:", error);
//     } else {
//       console.error("Unknown error verifying token:", error);
//     }
//     throw new Error("Invalid or expired token");
//   }
// };

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAndRefreshToken = async () => {
      try {
        // console.log("Token is valid:", verificationResult);
        setIsAuthenticated(true);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "Invalid or expired token"
        ) {
          //   console.log("Token expired, trying to refresh...");
          try {
            const newAccessToken = await refreshToken();
            console.log("Access token refreshed:", newAccessToken);
            setIsAuthenticated(true); // Token refreshed successfully
          } catch (refreshError: unknown) {
            console.error("Failed to refresh token:", refreshError);
            setIsAuthenticated(false); // Redirect or log out if refresh fails
          }
        } else {
          // console.error("Verification failed:", error);
          setIsAuthenticated(false);
        }
      }
    };

    verifyAndRefreshToken();
  }, []);

  return { isAuthenticated };
};

export default useAuth;
