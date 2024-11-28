import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white shadow-md p-4 flex justify-center items-center sticky top-0 z-50">
    <h1 className="text-2xl font-semibold">Study Space Finder</h1>
    <div className="absolute left-4">
      <Link to="/" className="px-4 py-2 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-300 ease-in-out">
        Home
      </Link>
    </div>
  </nav>
);

export default Navbar;
