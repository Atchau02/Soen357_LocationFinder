import React from "react";

const Filters = ({ onFilter }) => (
  <div className="bg-gray-100 p-4 flex space-x-4 items-center">
    {/* Wifi Filter */}
    <label className="font-medium">
      Wifi:
      <select
        name="wifi"
        onChange={(e) => onFilter("wifi", e.target.value)}
        className="ml-2 border border-gray-300 rounded p-1"
      >
        <option value="">All</option>
        <option value="5">5</option>
        <option value="4">&gt; 4</option>
        <option value="3">&gt; 3</option>
        <option value="2">&gt; 2</option>
        <option value="1">&gt; 1</option>
      </select>
    </label>

    {/* Noise Filter */}
    <label className="font-medium">
      Noise:
      <select
        name="noise"
        onChange={(e) => onFilter("noise", e.target.value)}
        className="ml-2 border border-gray-300 rounded p-1"
      >
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>

    {/* Crowd Filter */}
    <label className="font-medium">
      Crowd:
      <select
        name="crowd"
        onChange={(e) => onFilter("crowd", e.target.value)}
        className="ml-2 border border-gray-300 rounded p-1"
      >
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>
  </div>
);

export default Filters;
