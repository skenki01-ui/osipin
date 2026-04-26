import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Locks from "./pages/Locks";
import Logs from "./pages/Logs";
import Layout from "./components/Layout";
import QRUnlock from "./pages/QRUnlock";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/locks" element={<Locks />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/unlock" element={<QRUnlock />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}