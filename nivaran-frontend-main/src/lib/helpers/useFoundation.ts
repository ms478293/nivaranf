"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

// Hook to get the currentFoundation value from cookies
export const useGetFoundation = () => {
  const [currentFoundation, setCurrentFoundation] = useState<
    string | undefined
  >(() => Cookies.get("currentFoundation") || undefined);

  useEffect(() => {
    const handleFoundationChange = (event: CustomEvent) => {
      setCurrentFoundation(event.detail); // Update state when the event is emitted
    };

    // Listen for foundation change events
    window.addEventListener(
      "foundationChange",
      handleFoundationChange as EventListener
    );

    return () => {
      // Clean up event listener on unmount
      window.removeEventListener(
        "foundationChange",
        handleFoundationChange as EventListener
      );
    };
  }, []);

  return currentFoundation;
};

// Hook to set the currentFoundation value in cookies
export const useSetFoundation = () => {
  const setFoundation = useCallback((foundation: string) => {
    Cookies.set("currentFoundation", foundation, {
      secure: true,
      sameSite: "strict",
    });
    // Emit a custom event for cookie changes
    const event = new CustomEvent("foundationChange", { detail: foundation });
    window.dispatchEvent(event);
  }, []);

  return setFoundation;
};
