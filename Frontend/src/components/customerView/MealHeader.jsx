import React from "react";
import logo from "../../assets/Images/logo 1.png"

export default function MealHeader({ day }) {
  return (
    <div className="relative flex items-center justify-items-center ml-5 ">

      {/* Center Title */}
      <h1 className="mx-auto text-3xl md:text-4xl font-bold text-blue-900 z-10 ">
        {day ? `${day.toUpperCase()} MEAL PLAN` : "TODAY MEAL PLAN"}
      </h1>

      {/* Right Logo */}
      <img
        src={logo}
        alt="Company Logo"
        className="object-contain -translate-y-1/4 w-40"
      />
    </div>
  );
}
