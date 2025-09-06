import React from "react";
import logo from "../../assets/Images/logo 1.png"

export default function MealHeader({ day }) {
  return (
    <div className="relative flex items-center w-full ">

      {/* Center Title */}
      <h1 className="mx-auto pt-5 text-3xl md:text-4xl font-bold text-blue-900 z-10 ">
        {day ? `${day.toUpperCase()} MEAL PLAN` : "TODAY MEAL PLAN"}
      </h1>

      {/* Right Logo */}
      <img
        src={logo}
        alt="Company Logo"
        className="object-contain w-40 ml-auto0"
      />
    </div>
  );
}


