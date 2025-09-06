import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./components/context/AuthContext";
import { LoaderProvider, useLoader } from "./components/context/LoaderContext";
import Loader from "./components/Loader";
import CustomerRoutes from "./routes/customerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import API from "./services/api";
import { io } from "socket.io-client";

function LoaderWrapper() {
  const { loading } = useLoader();
  return loading ? <Loader /> : null;
}
function App() {
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await API.get("/menu-today");
      setMealData(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMealData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Socket connection
    const socket = io("http://localhost:4000");
    fetchMenu();
    //  Listen socket event
    socket.on("menuUpdated", () => {
      console.log("🔄 Menu updated, refetching...");
      fetchMenu();
    });

    return () => {
      socket.off("menuUpdated");
    };
  }, []);

  return (
    <AuthProvider>
      <LoaderProvider>
        <BrowserRouter>
          <LoaderWrapper />

          {/* Customer Pages */}
          <CustomerRoutes menuData={mealData} />

          {/* Admin Pages */}
          <AdminRoutes onMenuUpdate={fetchMenu} />

          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
