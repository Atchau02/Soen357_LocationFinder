import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const LocationDetails = ({ location }) => {
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility

  // Map container styling
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapCenter = {
    lat: location.latitude,
    lng: location.longitude,
  };

  // Use the Google Maps API loader
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
  });

  // Handle loading errors
  if (loadError) {
    return <p className="text-red-500">Error loading Google Maps</p>;
  }

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No ratings yet";
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Rounded to 1 decimal
  };

  const averageRating = calculateAverageRating(location.reviews);

  return (
    <div className="bg-white shadow rounded p-6">
      {/* Location Name */}
      <h1 className="text-2xl font-bold text-gray-800">{location.name}</h1>

      {/* Average Rating */}
      <p className="text-lg font-bold text-gray-600 mt-2">
        Rating:{" "}
        <span className="font-semibold text-yellow-500">{averageRating}</span>{" "}
      </p>

      {/* Location Picture */}
      <img
        src={location.picture}
        alt={location.name}
        className="w-full h-60 object-cover rounded mb-4"
      />

      {/* Location Description */}
      <p className="text-gray-600 mt-4">{location.description}</p>

      {/* Additional Details */}
      <div className="mt-4 flex space-x-4">
        <span className="text-sm text-gray-500">Wifi: {location.wifi}/5</span>
        <span className="text-sm text-gray-500">Noise: {location.noise}</span>
        <span className="text-sm text-gray-500">Crowd: {location.crowd}</span>
      </div>

      {/* Amenities */}
      <p className="text-sm text-gray-500 mt-2">
        <strong>Amenities:</strong> {location.amenities}
      </p>

      {/* Location Address */}
      <p className="text-sm text-gray-500 mt-2">
        <strong>Address:</strong> {location.address}
      </p>

      {/* Button to Show/Hide Map */}
      <div className="mt-6">
        {!showMap ? (
          <button
            onClick={() => setShowMap(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Show Map
          </button>
        ) : (
          <div>
            {isLoaded ? (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Location Map
                </h2>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </div>
            ) : (
              <p>Loading map...</p>
            )}
            <button
              onClick={() => setShowMap(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Hide Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
