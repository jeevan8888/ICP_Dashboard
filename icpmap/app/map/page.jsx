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

  // Fetch markers
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(
          "https://ic-api.internetcomputer.org/api/v3/boundary-node-locations?format=json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMarkers(data.locations || []); // Default to empty array if undefined
      } catch (err) {
        console.error("Error fetching markers:", err);
        setError(err.message);
      }
    };

    fetchMarkers();
  }, []);

  // Debugging markers
  console.log("Markers:", markers);

  if (error) {
    return <div>Error: {error}</div>; // Render error message for debugging
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {/* Render markers */}
          {Array.isArray(markers) &&
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                onMouseOver={() => setHoveredMarker(marker)}
                onMouseOut={() => setTimeout(() => setHoveredMarker(null), 200)}
              />
            ))}

          {/* InfoWindow */}
          {hoveredMarker && (
            <InfoWindow
              position={{
                lat: hoveredMarker.latitude,
                lng: hoveredMarker.longitude,
              }}
            >
              <div>
                <h4>{hoveredMarker.name || "No Name"}</h4>
                <p>Total Nodes: {hoveredMarker.total_nodes || "N/A"}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
