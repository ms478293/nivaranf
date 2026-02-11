"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

// Dynamically import components to support Next.js SSR
const MapContainerDynamic = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayerDynamic = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSONDynamic = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

type GaupalikaProperties = {
  STATE_CODE: number;
  DISTRICT: string;
  GaPa_NaPa: string;
  Type_GN: string;
};

type FeatureType = {
  type: string;
  geometry: { type: string; coordinates: any };
  properties: GaupalikaProperties;
};

export const GaupalikaComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const setMapRef = (map: L.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    fetch("/municipality.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoJsonData(data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  // Function to add popups to GeoJSON features
  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties) {
      const { GaPa_NaPa, Type_GN, DISTRICT } = feature.properties;
      layer.bindPopup(
        `<b>Municipality:</b> ${GaPa_NaPa}<br><b>Type:</b> ${Type_GN}<br><b>District:</b> ${DISTRICT}`
      );
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      console.log("Map is ready:", mapRef.current);
    }
  }, []);

  const ZoomToSelect = () => {
    const map = useMap();

    const zoomToMunicipality = (municipalityName: string) => {
      if (!geoJsonData || !municipalityName) return;

      const selectedFeature = geoJsonData.features.find(
        (feature: FeatureType) =>
          feature.properties.GaPa_NaPa.toLowerCase() ===
          municipalityName.toLowerCase()
      );

      if (selectedFeature) {
        let coordinates = selectedFeature.geometry.coordinates;

        if (selectedFeature.geometry.type === "Polygon") {
          coordinates = coordinates[0][0]; // Extract first polygon's first coordinate
        } else if (selectedFeature.geometry.type === "MultiPolygon") {
          coordinates = coordinates[0][0][0]; // Extract first MultiPolygon coordinate
        }

        const [lng, lat] = coordinates;
        map.setView([lat, lng], 20); // Correct LatLng format
      }
    };

    return (
      <div className="absolute z-[1000] top-4 right-4 bg-white p-3 rounded shadow-md">
        <select
          value={selectedMunicipality}
          onChange={(e) => {
            setSelectedMunicipality(e.target.value);
            zoomToMunicipality(e.target.value);
          }}
          className="p-2 border rounded w-64"
        >
          <option value="">Select Municipality</option>
          {geoJsonData?.features.map((feature: FeatureType, index) => (
            <option key={index} value={feature.properties.GaPa_NaPa}>
              {feature.properties.GaPa_NaPa}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <div
        className="controls"
        style={{ padding: "10px", background: "white" }}
      ></div>

      <div id="mapContainer" style={{ height: "90vh", width: "100%" }}>
        {typeof window !== "undefined" && (
          <MapContainerDynamic
            center={[28.3949, 84.124]}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
            ref={setMapRef} // Correct way to assign the ref
          >
            <ZoomToSelect />
            <TileLayerDynamic url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoJsonData && (
              <GeoJSONDynamic
                data={geoJsonData}
                onEachFeature={onEachFeature}
              />
            )}
          </MapContainerDynamic>
        )}
      </div>
    </div>
  );
};
