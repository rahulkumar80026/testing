// models/MenuModel.js
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  day: { type: String, required: true },
  slots: {
    Breakfast: [String],
    Lunch: [String],
    Snacks: [String],
    Dinner: [String],
  },
});

export default mongoose.model("Menu", menuSchema);
