const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const locationsPath = path.join(__dirname, "../data/locations.json");
const locationsData = require("../data/locations.json");

// Helper function to get the current date and time in the required format
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Helper function to calculate the average wifi rating
const calculateAverageWifi = (reviews) => {
  const totalWifi = reviews.reduce((sum, review) => sum + review.wifi, 0);
  return parseFloat((totalWifi / reviews.length).toFixed(1)); // Average rounded to 1 decimal
};

// Helper function to find the most common value (for noise and crowd)
const findMostCommonValue = (reviews, field) => {
  const countMap = {};
  reviews.forEach((review) => {
    const value = review[field];
    countMap[value] = (countMap[value] || 0) + 1;
  });
  return Object.keys(countMap).reduce((a, b) =>
    countMap[a] > countMap[b] ? a : b
  );
};

// POST a new review for a location
router.post("/:id", (req, res) => {
  const locationId = parseInt(req.params.id);
  const { rating, wifi, noise, crowd, comment } = req.body;

  // Find the location
  const location = locationsData.locations.find((loc) => loc.id === locationId);
  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }

  // Add the review with the current date
  const newReview = {
    rating,
    wifi,
    noise,
    crowd,
    comment,
    date: getCurrentDateTime(), // Add the current date and time
  };
  location.reviews.push(newReview);

  // Update location values based on reviews
  location.wifi = calculateAverageWifi(location.reviews);
  location.noise = findMostCommonValue(location.reviews, "noise");
  location.crowd = findMostCommonValue(location.reviews, "crowd");

  // Save the updated data back to the JSON file
  fs.writeFileSync(locationsPath, JSON.stringify(locationsData, null, 2));

  res.status(201).json({ message: "Review added successfully", location });
});

module.exports = router;
