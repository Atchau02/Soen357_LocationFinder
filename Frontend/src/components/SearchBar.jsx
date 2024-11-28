import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="bg-gray-100 p-4 flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search for a place"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded p-2 flex-grow"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      <button
        onClick={handleReset}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
