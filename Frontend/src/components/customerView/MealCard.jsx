
export default function MealCard({ title, items }) {
  return (
    <div className="p-2 flex flex-col">
      <div className="h-full bg-blue-100/70 rounded-3xl shadow p-5">
      {/* Title */}
      <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">
        {title}
      </h2>

      {/* Items */}
      <ul className="space-y-3 text-blue-800  text-xl break-words font-medium flex-1 p-4 ">
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
    </div>
  );
}

