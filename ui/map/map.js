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

const geocodeRegion = async (region) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        region
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };
    } else {
//      console.warn(`Geocoding failed for region: ${region}`);
      return null;
    }
  } catch (error) {
//    console.error(`Geocoding error for region: ${region}`, error);
    return null;
  }
};

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [error, setError] = useState(null);

  const fetchNodes = async () => {
    try {
      const response = await fetch(
        "https://ic-api.internetcomputer.org/api/v3/nodes"
      );
      const data = await response.json();

      const aggregatedNodes = aggregateNodes(data.nodes);

      const newMarkers = await Promise.all(
        aggregatedNodes.map(async (node, i) => {
          const position = await geocodeRegion(node.region);
          return {
            id: i,
            position: position || { lat: 0, lng: 0 }, 
            color: getMarkerColor(node.status),
            details: node,
          };
        })
      );

      setMarkers(newMarkers);
    } catch (err) {
      // console.error("Error processing nodes:", err);
      setError(err.message || String(err));
    }
  };

  useEffect(() => {
    fetchNodes(); 
    // const interval = setInterval(fetchNodes, 5000); 
    // return () => clearInterval(interval); 
  }, []);

  const aggregateNodes = (nodes) => {
    const nodeMap = new Map();

    nodes.forEach((node) => {
      // const key = `${node.region}-${node.status}-${node.dc_name}`;
      const key = `${node.dc_name}`;
      if (!nodeMap.has(key)) {
        nodeMap.set(key, { ...node, count: 1 });
      } else {
        nodeMap.get(key).count += 1;
      }
    });

    console.log(nodeMap)

    return Array.from(nodeMap.values());
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case "UP":
        return "green";
      case "UNASSIGNED":
        return "blue";
      case "DOWN":
        return "red";
      default:
        return "grey";
    }
  };


  const handleMouseOver = (markerId) => {
    setHoveredMarkerId(markerId);
    // console.log("markerID: ", markers[markerId])
  };

  const handleMouseOut = () => {
    setHoveredMarkerId(null);
  };

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  console.log("hoveredMarkerId: ", hoveredMarkerId)

  return (
    <div className="h-screen w-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
              }}
              onClick={() => handleMouseOver(marker.id)}
              onMouseOver={() => handleMouseOver(marker.id)}
              // onMouseOut={handleMouseOut}
            />
          ))}

          {hoveredMarkerId !== null && (
            <InfoWindow
              position={markers.find((marker) => marker.id === hoveredMarkerId)?.position}
              onCloseClick={handleMouseOut}
            >
              <div className="p-2 max-w-md" style={{ color: "black" }}>
                <div className="mb-2">
                  {/* <Image src={getFlagUrl(markers[hoveredMarkerId]?.details.region.split(",")[1]?.trim())} alt="Flag" width={30} height={20}/> */}
                  <strong>{markers[hoveredMarkerId]?.details.region || "N/A"}</strong>
                </div>
                <p><strong>Data Center:</strong> {markers[hoveredMarkerId]?.details.dc_name || "N/A"}</p>
                <p><strong>Count:</strong> {markers[hoveredMarkerId]?.details.count || "N/A"}</p>
                <p><strong>Ip Address:</strong> {markers[hoveredMarkerId]?.details.ip_address || "N/A"}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
