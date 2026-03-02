"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const SetUserLocationCookie = () => {
  const [userLocation, setUserLocation] = useState<string | null>(
    Cookies.get("user_location") || null
  );

  useEffect(() => {
    // Skip if we already have a location cookie
    if (userLocation) return;

    const getLocationByIP = async () => {
      try {
        // Use IP-based geolocation — no browser permission popup required
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(3000),
        });
        if (!response.ok) return;
        const data = await response.json();
        const countryCode = data?.country_code === "NP" ? "NP" : "US";

        Cookies.set("user_location", countryCode, {
          expires: 7,
          path: "/",
        });
        setUserLocation(countryCode);
      } catch {
        // Silently fail — non-critical feature
      }
    };

    getLocationByIP();
  }, [userLocation]);

  return null;
};
