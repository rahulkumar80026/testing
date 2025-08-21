import { useEffect, useState } from "react";
import axios from "axios";
import MealSection from "./MealSection";
import { useLoader } from "../context/LoaderContext";

export default function CustomerView() {
  const [menu, setMenu] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    showLoader();
    axios
      .get(`http://localhost:5000/api/menu/${today}`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch(() => {
        setMenu(null);
      })
      .finally(() => {
        hideLoader();
      });
  }, []);

  if (!menu) return <p className="text-center mt-10">No menu available</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Menu for {menu.date}
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {menu.meals.map((meal, idx) => (
          <MealSection
            key={idx}
            title={meal.title}
            time={meal.time}
            items={meal.items}
          />
        ))}
      </div>
    </div>
  );
}
