import React from "react";

const ReviewsGallery = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No reviews available for this location.
      </p>
    );
  }

  // Sort reviews by date in descending order (most recent first)
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div className="space-y-8">
        {sortedReviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md"
          >
          <div className="grid grid-cols-2 gap-4 text-gray-600 mb-4">
            <p className="text-sm">
              <strong>Rating:</strong> {review.rating}/5
            </p>
            <p className="text-sm">
              <strong>Wifi:</strong> {review.wifi}/5
            </p>
            <p className="text-sm">
              <strong>Noise:</strong> {review.noise}
            </p>
            <p className="text-sm">
              <strong>Crowd:</strong> {review.crowd}
            </p>
            <p className="text-gray-800 italic mb-4">{review.comment}</p>
            <p className="text-xs text-gray-500">
              <strong>Reviewed on:</strong> {review.date}
            </p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsGallery;
