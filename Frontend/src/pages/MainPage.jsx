import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import LocationGallery from "../components/LocationGallery";

const MainPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filters, setFilters] = useState({
    wifi: "",
    noise: "",
    crowd: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch locations from the backend
  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setFilteredLocations(data); // Initialize with all locations
      });
  }, []);

  // Apply filters, search, and sort by rating
  useEffect(() => {
    let filtered = locations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply Wifi filter
    if (filters.wifi) {
      filtered = filtered.filter(
        (location) => location.wifi >= parseInt(filters.wifi)
      );
    }

    // Apply Noise filter
    if (filters.noise) {
      filtered = filtered.filter(
        (location) => location.noise === filters.noise
      );
    }

    // Apply Crowd filter
    if (filters.crowd) {
      filtered = filtered.filter(
        (location) => location.crowd === filters.crowd
      );
    }

    // Sort filtered locations by average rating (descending order)
    filtered.sort((a, b) => {
      const avgRatingA = calculateAverageRating(a.reviews);
      const avgRatingB = calculateAverageRating(b.reviews);
      return avgRatingB - avgRatingA; // Higher ratings come first
    });

    setFilteredLocations(filtered);
  }, [filters, searchQuery, locations]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Calculate average rating for a location
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilterChange} />
      <LocationGallery locations={filteredLocations} />
    </div>
  );
};

export default MainPage;
