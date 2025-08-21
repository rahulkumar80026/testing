import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cron from "node-cron";
import Meal from "./models/Meal.js";
import cors from "cors";


dotenv.config();
connectDB();    
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/dashboard", adminRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/auth", authRoutes);


// Cron job for daily update (just logs for now)
cron.schedule("0 0 * * *", async () => {
  const today = new Date().toISOString().split("T")[0];
  const meal = await Meal.findOne({ date: today });
  console.log(`Menu updated for ${today}`, meal);
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
}); 



// http://localhost:4000/api/auth/login
//http://localhost:4000/api/meals/today
//http://localhost:4000/api/admin/upload
//http://localhost:4000/api/admin/edit
//http://localhost:4000/api/admin/delete
//http://localhost:4000/api/admin/download

