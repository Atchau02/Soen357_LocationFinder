const express = require("express");
const router = express.Router();
const locations = require("../data/locations.json");

// GET all locations
router.get("/", (req, res) => {
  res.json(locations.locations);
});

// GET a specific location by ID
router.get("/:id", (req, res) => {
  const locationId = parseInt(req.params.id);
  const location = locations.locations.find((loc) => loc.id === locationId);

  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }

  res.json(location);
});

module.exports = router;
