import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShortenerPage from "./ShortenerPage";
import StatsPage from "./StatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Shorten</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
