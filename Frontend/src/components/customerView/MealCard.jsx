
import React from "react";

export default function MealCard({ title, items }) {
  return (
    <div className="bg-blue-100 rounded-3xl p-8 shadow flex flex-col">
      {/* Title */}
      <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">{title}</h2>

      {/* Items list */}
      <ul className="space-y-2 text-blue-800 text-xl break-words font-medium">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className="list-disc ml-4">
              {item}
            </li>
          ))
        ) : (
          <li className="italic text-gray-500">Not Available</li>
        )}
      </ul>
    </div>
  );
}
