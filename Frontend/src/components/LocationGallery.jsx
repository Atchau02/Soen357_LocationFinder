import React from "react";
import { Link } from "react-router-dom";

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0; // Use 0 if there are no reviews
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length; // Keep as a number for sorting
};

const LocationGallery = ({ locations }) => {
  // Sort locations by average rating in descending order
  const sortedLocations = [...locations].sort((a, b) => {
    const avgRatingA = calculateAverageRating(a.reviews);
    const avgRatingB = calculateAverageRating(b.reviews);
    return avgRatingB - avgRatingA; // Descending order
  });

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedLocations.length > 0 ? (
        sortedLocations.map((location) => (
          <div
            key={location.id}
            className="bg-white shadow rounded p-4 hover:shadow-lg"
          >
            <Link to={`/location/${location.id}`} className="block">
              {/* Location Image */}
              <img
                src={location.picture}
                alt={location.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              {/* Location Name */}
              <h3 className="text-lg font-bold text-gray-800">
                {location.name}
              </h3>
              {/* Location Rating */}
              <p className="text-sm text-gray-600 mt-1">
                Rating:{" "}
                <span className="font-semibold text-yellow-500">
                  {calculateAverageRating(location.reviews).toFixed(1)}
                </span>
              </p>
              {/* Location Description */}
              <p className="text-gray-600 mt-2">{location.description}</p>
              {/* Additional Details */}
              <div className="mt-4 flex space-x-2 text-sm text-gray-500">
                <span>Wifi: {location.wifi}/5</span>
                <span>| Noise: {location.noise}</span>
                <span>| Crowd: {location.crowd}</span>
              </div>
              {/* Location Amenities */}
              <p className="text-sm text-gray-500 mt-2">
                <strong>Amenities:</strong> {location.amenities}
              </p>
              {/* Location Address */}
              <p className="text-sm text-gray-500 mt-1">
                <strong>Address:</strong> {location.address}
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No locations match your filters.
        </p>
      )}
    </div>
  );
};

export default LocationGallery;
