import Meal from "../models/Meal.js";
import xlsx from "xlsx";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Admin Routes
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate admin credentials (this is just a placeholder, implement your own logic)
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// upload Excel $ save Meals

export const uploadMeals = async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save each meal to the database
    for (const item of data) {
      const meal = new Meal({
        date: item.date,
        breakfast: item.breakfast,
        lunch: item.lunch,
        dinner: item.dinner,
        snack: item.snack,
      });
      await meal.save();
    }

    res.status(200).json({ message: "Meals uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading meals", error });
  }
};

// Manual Edit Meal
export const editMeal = async (req, res) => {
  const { id } = req.params;
  const { date, breakfast, lunch, dinner, snack } = req.body;

  try {
    const meal = await Meal.findByIdAndUpdate(
      id,
      {
        date,
        breakfast,
        lunch,
        dinner,
        snack,
      },
      { new: true }
    );

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({ message: "Meal updated successfully", meal });
  } catch (error) {
    res.status(500).json({ message: "Error updating meal", error });
  }
};
// Delete Meal
export const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findByIdAndDelete(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meal", error });
  }
};

// Get All Meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
};

// Download Meals
export const downloadMeals = async (req, res) => {
  try {
    const meals = await Meal.find().sort({ date: 1 });
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(meals);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Meals");
    const filePath = `./uploads/meals_${Date.now()}.xlsx`;
    xlsx.writeFile(workbook, filePath);
    res
      .status(200)
      .json({ message: "Meals downloaded successfully", filePath });
  } catch (error) {
    res.status(500).json({ message: "Error downloading meals", error });
  }
};
