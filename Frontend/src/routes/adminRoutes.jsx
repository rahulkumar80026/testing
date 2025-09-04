import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../components/AdminLogin";
import Dashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminRoutes({ onMenuUpdate }) {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard onMenuUpdate={onMenuUpdate} />} />
      </Route>
    </Routes>
  );
}
