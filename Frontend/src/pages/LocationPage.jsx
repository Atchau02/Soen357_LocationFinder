import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LocationDetails from "../components/LocationDetails";
import ReviewsGallery from "../components/ReviewsGallery";
import AddReviewForm from "../components/AddReviewForm";

const LocationPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch location details
  useEffect(() => {
    setLoading(true);
    fetch(`/api/locations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch location details.");
        setLoading(false);
      });
  }, [id]);

  // Calculate the average Wifi rating
  const calculateAverageWifi = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalWifi = reviews.reduce(
      (sum, review) => sum + Number(review.wifi),
      0
    );
    return (totalWifi / reviews.length).toFixed(1); // Rounded to 1 decimal place
  };

  // Find the most common value for Noise or Crowd
  const findMostCommon = (reviews, field) => {
    if (!reviews || reviews.length === 0) return "";
    const countMap = {};
    reviews.forEach((review) => {
      const value = review[field];
      countMap[value] = (countMap[value] || 0) + 1;
    });
    return Object.keys(countMap).reduce((a, b) =>
      countMap[a] > countMap[b] ? a : b
    );
  };

  // Format date to "YYYY-MM-DD HH:mm"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Handle adding a new review
  const handleAddReview = (review) => {
    const currentDate = formatDate(new Date()); // Format the current date

    // Convert numeric fields to numbers before submission
    const reviewWithDate = {
      ...review,
      wifi: Number(review.wifi), // Convert to number
      rating: Number(review.rating), // Convert to number
      date: currentDate, // Add formatted date as a string
    };

    // Submit the review to the backend
    fetch(`/api/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewWithDate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit review.");
        }
        return res.json();
      })
      .then((data) => {
        const updatedReviews = [...location.reviews, reviewWithDate];

        // Update the location's values
        const updatedLocation = {
          ...location,
          reviews: updatedReviews,
          wifi: calculateAverageWifi(updatedReviews),
          noise: findMostCommon(updatedReviews, "noise"),
          crowd: findMostCommon(updatedReviews, "crowd"),
        };

        setLocation(updatedLocation); // Update the state
        setShowForm(false); // Hide form after submission
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to submit review.");
      });
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : location ? (
        <>
          <LocationDetails location={location} />
          <ReviewsGallery reviews={location.reviews} />

          {/* Button to toggle form visibility */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-6"
            >
              Add Review
            </button>
          ) : (
            <div className="mt-6 bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Add a Review
              </h2>
              <AddReviewForm onAddReview={handleAddReview} />
              <button
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No location data found.</p>
      )}
    </div>
  );
};

export default LocationPage;
