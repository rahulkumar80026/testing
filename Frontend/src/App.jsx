import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLoginPage from "./components/AdminLogin";
import Dashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";


import CustomerView from "./components/customerView/CustomerView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/" element={<AdminLoginPage />} />

          <Route path="/admin/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
      </Routes>

      {/* Global ToastContainer */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
