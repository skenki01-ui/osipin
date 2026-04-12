import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Pin from "./pages/Pin";

import Terms from "./pages/legal/Terms";
import Tokushoho from "./pages/legal/Tokushoho";
import Privacy from "./pages/legal/Privacy";
import Contact from "./pages/legal/Contact";

export default function App(){
  return(
    <Routes>

      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pin" element={<Pin />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/tokushoho" element={<Tokushoho />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}