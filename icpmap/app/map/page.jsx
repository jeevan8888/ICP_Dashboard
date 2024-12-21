'use client'
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [error, setError] = useState(null);

  // Fetch nodes data
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch("https://ic-api.internetcomputer.org/api/v3/nodes");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.nodes)) {
          throw new Error("Invalid response structure: expected an array of nodes.");
        }

        const filteredMarkers = data.nodes.map((node) => {
          const { status, region, dc_name, owner, ip_address, node_provider_id, node_provider_name, node_id } = node;

          if (!region || !region.lat || !region.lng) {
            console.warn("Skipping node with invalid region data:", node);
            return null; // Skip invalid region data
          }

          // Add color and specific fields based on status
          if (status === "UP") {
            return {
              position: { lat: parseFloat(region.lat), lng: parseFloat(region.lng) },
              color: "green",
              details: {
                dc_name,
                owner,
                ip_address,
                node_provider_id,
                node_provider_name,
              },
            };
          } else if (status === "UNASSIGNED") {
            return {
              position: { lat: parseFloat(region.lat), lng: parseFloat(region.lng) },
              color: "blue",
              details: {
                dc_name,
                ip_address,
                node_id,
              },
            };
          } else {
            return {
              position: { lat: parseFloat(region.lat), lng: parseFloat(region.lng) },
              color: "grey",
              details: {
                dc_name,
              },
            }
          }
          return null; // Ignore other statuses
        }).filter(Boolean); // Remove null values

        setMarkers(filteredMarkers);
      } catch (err) {
        console.error("Error fetching markers:", err);
        setError(err.message);
      }
    };

    fetchMarkers();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>; // Render error message
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.position.lat, lng: marker.position.lng }}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/"${marker.color}"-dot.png`,
              }}
              onMouseOver={() => setHoveredMarker(marker)}
              onMouseOut={() => setTimeout(() => setHoveredMarker(null), 200)}
            />
          ))}

          {hoveredMarker && (
            <InfoWindow
              position={{
                lat: hoveredMarker.position.lat,
                lng: hoveredMarker.position.lng,
              }}
              onCloseClick={() => setHoveredMarker(null)}
            >
              <div>
                {Object.entries(hoveredMarker.details).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
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
