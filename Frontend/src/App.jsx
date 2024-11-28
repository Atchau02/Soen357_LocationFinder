import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LocationPage from "./pages/LocationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location/:id" element={<LocationPage />} />
    </Routes>
  );
}

export default App;
