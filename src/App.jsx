import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Pin from "./pages/Pin";
import Pay from "./pages/Pay";

import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Tokushoho from "./pages/legal/Tokushoho";
import Contact from "./pages/legal/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pin" element={<Pin />} />
      <Route path="/pay" element={<Pay />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/tokushoho" element={<Tokushoho />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}