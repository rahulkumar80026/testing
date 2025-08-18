import { useEffect, useState } from "react";
import API from "../services/api";
import MenuCard from "../components/MealCard";

export default function CustomerMenu() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    API.get("/meals")
      .then(res => setMeals(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Today's Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map(meal => (
          <MenuCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
