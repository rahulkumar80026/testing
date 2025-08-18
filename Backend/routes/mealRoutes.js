import express from "express"
import { getTodayMeals } from "../controllers/mealControllers.js"
const router = express.Router();

router.get("/today", getTodayMeals);

export default router;
