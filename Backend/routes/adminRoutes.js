import express from "express";
import multer from "multer";
import {
  uploadMeals,
  editMeal,
  deleteMeal,
  downloadMeals,
} from "../controllers/adminControllers.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", protectAdmin, upload.single("file"), uploadMeals);
router.put("/edit", protectAdmin, editMeal);
router.delete("/delete", protectAdmin, deleteMeal);
router.get("/download", protectAdmin, downloadMeals);

export default router;
