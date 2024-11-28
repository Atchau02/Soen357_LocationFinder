import React, { useState } from "react";

const AddReviewForm = ({ onAddReview }) => {
  const [review, setReview] = useState({
    rating: "",
    wifi: "",
    noise: "low",
    crowd: "low",
    comment: "",
  });
  const [errors, setErrors] = useState({
    rating: false,
    wifi: false,
  });

  const validateField = (field, value) => {
    if (field === "rating") {
      return value >= 1 && value <= 5;
    }
    if (field === "wifi") {
      return value >= 1 && value <= 5;
    }
    return true;
  };

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
    if (field === "rating" || field === "wifi") {
      setErrors((prev) => ({
        ...prev,
        [field]: !validateField(field, value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.rating && !errors.wifi) {
      onAddReview(review);
      setReview({
        rating: "",
        wifi: "",
        noise: "low",
        crowd: "low",
        comment: "",
      });
      setErrors({
        rating: false,
        wifi: false,
      });
    }
  };

  const isFormValid = () =>
    !errors.rating &&
    !errors.wifi &&
    review.rating !== "" &&
    review.wifi !== "" &&
    review.comment.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 shadow rounded mt-4 space-y-4"
    >
      {/* Rating Input */}
      <div>
        <label className="block font-medium">Rating (1-5):</label>
        <input
          type="number"
          value={review.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          min="1"
          max="5"
          step="1"
          required
          className={`border rounded p-2 w-full ${
            errors.rating ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.rating && (
          <p className="text-sm text-red-500">
            Rating must be between 1 and 5.
          </p>
        )}
      </div>

      {/* Wifi Input */}
      <div>
        <label className="block font-medium">Wifi (1-5):</label>
        <input
          type="number"
          value={review.wifi}
          onChange={(e) => handleChange("wifi", e.target.value)}
          min="1"
          max="5"
          step="1"
          required
          className={`border rounded p-2 w-full ${
            errors.wifi ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.wifi && (
          <p className="text-sm text-red-500">
            Wifi rating must be between 1 and 5.
          </p>
        )}
      </div>

      {/* Noise Input */}
      <div>
        <label className="block font-medium">Noise:</label>
        <select
          value={review.noise}
          onChange={(e) => handleChange("noise", e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Crowd Input */}
      <div>
        <label className="block font-medium">Crowd:</label>
        <select
          value={review.crowd}
          onChange={(e) => handleChange("crowd", e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Comment Input */}
      <div>
        <label className="block font-medium">Comment:</label>
        <textarea
          value={review.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
          maxLength="500"
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid()}
        className={`px-4 py-2 rounded text-white ${
          isFormValid() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
        }`}
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
