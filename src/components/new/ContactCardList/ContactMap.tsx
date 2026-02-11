"use client";
import { useEffect, useRef, useState } from "react";
import WorldMap from "../../../../public/worldMap.svg";
import { RegionPopup } from "./ContactPopup";

// Type definitions for better type safety
export interface ContactInfo {
  id: string;
  name: string;
  details?: Record<string, unknown>;
}

// Extracted map interaction logic into a custom hook
const useMapInteraction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    const setupRegionInteractions = () => {
      if (!containerRef.current) return null;

      const svg = containerRef.current.querySelector("svg");
      if (!svg) return null;

      svgRef.current = svg as SVGSVGElement;

      // Helper function to add event listeners to a region
      const addRegionListeners = (regionSelector: string) => {
        const region = svg.querySelector(regionSelector);
        if (!region) return;

        const handleMouseEnter = () => {
          setActiveRegion(regionSelector);
        };

        const handleMouseLeave = () => {
          setActiveRegion(null);
        };

        region.addEventListener("mouseenter", handleMouseEnter);
        region.addEventListener("mouseleave", handleMouseLeave);

        // Return cleanup function
        return () => {
          region.removeEventListener("mouseenter", handleMouseEnter);
          region.removeEventListener("mouseleave", handleMouseLeave);
        };
      };

      // Setup listeners for multiple regions
      const cleanupNepal = addRegionListeners("#worldMap_svg__nepal");
      const cleanupUSA = addRegionListeners("#worldMap_svg__boston");

      // Return combined cleanup function
      return () => {
        cleanupNepal?.();
        cleanupUSA?.();
      };
    };

    const cleanup = setupRegionInteractions();
    return cleanup;
  }, []);

  return { containerRef, svgRef, activeRegion };
};

// Popup component extracted for better separation of concerns

// Main component
export const ContactMap = () => {
  const { containerRef, activeRegion } = useMapInteraction();

  return (
    <div
      className="w-full h-full mt-10 flex items-center justify-center relative"
      ref={containerRef}
    >
      <WorldMap />
      {activeRegion && <RegionPopup region={activeRegion} />}
    </div>
  );
};

export default ContactMap;
