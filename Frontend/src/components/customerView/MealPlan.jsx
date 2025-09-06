import MealHeader from "./MealHeader";
import MealCard from "./MealCard";
import bgImage from "../../assets/Images/bg.png";

export default function MealPlan({ menuData }) {
  console.log("menuData pass ho rha hai:", menuData);
  console.log("slots:", menuData?.slots);

  if (!menuData) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-blue-50">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
          Loading Today's Menu
        </h2>
        <p className="text-blue-800 text-lg">
          Please wait while we fetch your delicious meals...
        </p>
      </div>
    );
  }

  // ✅ Backend slots ko directly convert kar diya
  const meals = Object.entries(menuData.slots || {});

  return (
    <div
      className="w-screen h-screen flex flex-col bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
      }}
    >
      {/* Header */}

      <MealHeader day={menuData.day} />

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 ml-30 -space-x-[1px]">
      {/* <div className="grid grid-cols-4"> */}
        {meals.map(([title, items]) => (
          <MealCard key={title} title={title} items={items} />
        ))}
      </div>
    </div>
  );
}
