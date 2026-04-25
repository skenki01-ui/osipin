import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Deep from "./pages/Deep";
import Result from "./pages/Result";
import Purchase from "./pages/Purchase";
import Chat from "./pages/Chat";
import ComingSoon from "./pages/ComingSoon";

import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Contact from "./pages/legal/Contact";
import Tokushoho from "./pages/legal/Tokushoho";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/deep" element={<Deep />} />
      <Route path="/result" element={<Result />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/comingsoon" element={<ComingSoon />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tokushoho" element={<Tokushoho />} />
    </Routes>
  );
}