"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { pickDetectedCountry } from "@/lib/donations/detect-country";

export const SetUserLocationCookie = () => {
  useEffect(() => {
    if (Cookies.get("nf_country")) return;
    const detected = pickDetectedCountry({
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      languages: typeof navigator === "undefined" ? [] : [...navigator.languages],
    });
    if (!detected) return;
    const options = { expires: 7, path: "/" as const };
    Cookies.set("nf_country", detected, options);
    Cookies.set("user_location", detected, options);
  }, []);
  return null;
};
