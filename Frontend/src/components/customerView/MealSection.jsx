export default function MealSection({ title, time, items }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">{time}</p>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
