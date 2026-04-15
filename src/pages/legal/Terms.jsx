import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Pin from "./pages/Pin";
import Pay from "./pages/Pay";
import Chat from "./pages/Chat";
import Cards from "./pages/Cards";
import Rank from "./pages/Rank";
import Success from "./pages/Success";

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

      {/* ⭐追加 */}
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/success" element={<Success />} />

      {/* 法律 */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/tokushoho" element={<Tokushoho />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}