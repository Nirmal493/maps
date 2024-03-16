import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import customMarker from "./logo.png";

function Map(props) {
  const { isLoaded } = props;
  // const containerStyle = {
  //   width: "100vw",
  //   height: "85vh",
  // };

  const containerStyle = {
    width: "90vw",
    height: "92vh",
    margin: "0 auto", // Center horizontally
    borderRadius: "20px 20px 20px 20px", // Rounded edges, only bottom corners
  };

  const center = {
    lat: 9.9816,
    lng: 76.2999,
  };
  const fort = {
    lat: 9.9658,
    lng: 76.2421,
  };
  const kalmassery = {
    lat: 10.0531,
    lng: 76.3528,
  };
  const vytilla = {
    lat: 9.9658,
    lng: 76.3217,
  };
  const edapally = {
    lat: 10.0261,
    lng: 76.3125,
  };

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );

      return () => {
        // Clean up the watchPosition when the component unmounts
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Show user's live location marker */}
        {userPosition && (
          <>
            <Marker position={userPosition} />
            <Marker position={fort} options={{ icon: customMarker }} />
            <Marker position={kalmassery} options={{ icon: customMarker }} />
            <Marker position={vytilla} options={{ icon: customMarker }} />
            <Marker position={edapally} options={{ icon: customMarker }} />
          </>
        )}
      </GoogleMap>
    )
  );
}

export default Map;
