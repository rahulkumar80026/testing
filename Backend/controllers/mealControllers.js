import Meal from '../models/Meal.js';




export const getTodayMeals = async (req, res) => {
  try {
    const today = new Date();
    const meals = await Meal.find({
      date: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999)),
      },
    });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s meals', error });
  }
};
