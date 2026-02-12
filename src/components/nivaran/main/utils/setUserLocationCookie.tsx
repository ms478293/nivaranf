"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const SetUserLocationCookie = () => {
  const [userLocation, setUserLocation] = useState<string | null>(
    Cookies.get("user_location") || null
  );

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, "---", longitude);
            let countryCode = "US"; // Default to US

            if (
              latitude >= 26 &&
              latitude <= 30 &&
              longitude >= 80 &&
              longitude <= 88
            ) {
              countryCode = "NP"; // Nepal
            } else if (
              latitude >= 24 &&
              latitude <= 49 &&
              longitude >= -125 &&
              longitude <= -66
            ) {
              countryCode = "US"; // USA
            }

            Cookies.set("user_location", countryCode, {
              expires: 7,
              path: "/",
            });
            setUserLocation(countryCode);
          },
          (error) => {
            console.warn("Geolocation error or permission denied:", error);
            // Fallback to US if geolocation fails
            const countryCode = "US";
            Cookies.set("user_location", countryCode, {
              expires: 7,
              path: "/",
            });
            setUserLocation(countryCode);
          }
        );
      }
    };

    if (!userLocation) {
      getLocation();
    }
  }, [userLocation]);

  return null;
};
