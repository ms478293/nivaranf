import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const location = Cookies.get("user_location");

    if (location) {
      setUserLocation(location);
      setIsLoaded(true);
    } else {
      setTimeout(() => {
        setUserLocation(Cookies.get("user_location") || ""); // Fallback to empty string
        setIsLoaded(true);
      }, 500);
    }
  }, []);

  return { isLoaded, userLocation };
};
