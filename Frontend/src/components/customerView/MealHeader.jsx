import React from "react";
import logo from "../../assets/Images/logo 1.png"

export default function MealHeader({ day }) {
  return (
    <div className="relative flex items-center w-full">

      {/* Center Title */}
      <h1 className="mx-auto pt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 z-10 md:mr-60">
        {day ? `${day.toUpperCase()} MEAL PLAN` : "TODAY MEAL PLAN"}
      </h1>

      {/* Right Logo */}
      <img
        src={logo}
        alt="Company Logo"
        className="object-contain w-24 sm:w-32 md:w-40"
      />
    </div>
  );
}
