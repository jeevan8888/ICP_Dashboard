"use client";

import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 0,
  lng: 0,
};

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch(
          "https://ic-api.internetcomputer.org/api/v3/nodes"
        );
        const data = await response.json();

        const newMarkers = data.nodes.map((node) => {
          const [continent, country, city] = node.region.split(",");
          const position = getRandomPosition(continent);

          return {
            position,
            color: getMarkerColor(node.status),
            details: node,
          };
        });

        setMarkers(newMarkers);
      } catch (err) {
        console.error("Error processing nodes:", err);
        setError(err.message || String(err));
      }
    };

    fetchNodes();
  }, []);

  const getMarkerColor = (status) => {
    switch (status) {
      case "UP":
        return "green";
      case "UNASSIGNED":
        return "blue";
      default:
        return "grey";
    }
  };

  const getRandomPosition = (continent) => {
    const continentCenters = {
      "North America": { lat: 40, lng: -100 },
      "South America": { lat: -15, lng: -60 },
      Europe: { lat: 50, lng: 10 },
      Africa: { lat: 0, lng: 20 },
      Asia: { lat: 30, lng: 100 },
      Oceania: { lat: -25, lng: 135 },
    };

    const center = continentCenters[continent] || { lat: 0, lng: 0 };

    return {
      lat: center.lat + (Math.random() - 0.5) * 20,
      lng: center.lng + (Math.random() - 0.5) * 20,
    };
  };

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
              }}
              onMouseOver={() => setHoveredMarker(marker)}
              onMouseOut={() => setHoveredMarker(null)}
            />
          ))}

          {hoveredMarker && (
            <InfoWindow
              position={hoveredMarker.position}
              onCloseClick={() => setHoveredMarker(null)}
            >
              <div className="p-2 max-w-md">
                {Object.entries(hoveredMarker.details).map(([key, value]) => (
                  <p key={key} className="mb-1 text-sm">
                    <strong className="capitalize">
                      {key.replace(/_/g, " ")}:
                    </strong>{" "}
                    {value || "N/A"}
                  </p>
                ))}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
