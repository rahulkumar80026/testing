export default function MenuCard({ meal }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{meal.date}</h3>
      <p><strong>Breakfast:</strong> {meal.breakfast}</p>
      <p><strong>Lunch:</strong> {meal.lunch}</p>
      <p><strong>Dinner:</strong> {meal.dinner}</p>
      <p><strong>Snack:</strong> {meal.snack}</p>
    </div>
  );
}
