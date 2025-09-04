import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerView from "../components/customerView/MealPlan";

export default function CustomerRoutes({ menuData }) {
  console.log("CustomerRoutes menuData:", menuData);
  return (
    <Routes>
      <Route
        path="/"
        element={<CustomerView menuData={menuData} />}
      />
      {/* Add more customer routes here if needed */}
    </Routes>
  );
}
