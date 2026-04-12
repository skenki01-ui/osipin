import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Pin from "./pages/Pin";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pin" element={<Pin />} />

      </Routes>
    </BrowserRouter>
  );
}