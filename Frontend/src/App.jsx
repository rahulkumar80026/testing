import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLoginPage from "./components/AdminLogin";
import Dashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import CustomerView from "./components/customerView/CustomerView";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import Footer from "./components/Footer";

import { LoaderProvider, useLoader } from "./components/context/LoaderContext";
import Loader from "./components/Loader";

function Layout() {
  const { isAuth } = useAuth();

  const [abc,setabc] = React.useState(false);
  const location = useLocation();
  const { loading } = useLoader(); // ✅ loader context use

  useEffect(()=>{setabc(isAuth)},[useAuth()])

  const hideNavbar = location.pathname === "/login";
  console.log("nav" , isAuth)
  console.log("abc" , abc)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Loader global */}
      {loading && <Loader />}

      {/* Navbar sirf jab login na ho aur correct page ho */}
      <main className="flex-grow">
        <Routes>
          {/* Customer view */}
          <Route path="/" element={<CustomerView />} />

          {/* Admin login */}
          <Route path="/login" element={<AdminLoginPage />} />

          {/* Admin dashboard (protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <BrowserRouter>
          <Layout />
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
