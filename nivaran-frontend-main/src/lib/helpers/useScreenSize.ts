import { useEffect, useState } from "react";

export const useScreenSize = (): string => {
  const [screenSize, setScreenSize] = useState<string>("sm");

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else if (window.innerWidth >= 864) {
        setScreenSize("864px");
      } else {
        setScreenSize("sm");
      }
    };

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize(); // Set the initial size
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
};
