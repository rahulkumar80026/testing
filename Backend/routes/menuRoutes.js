import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadMenu,  getTodayMenu , downloadMenu } from "../controllers/menuController.js";

const router = express.Router();

router.post("/menu-upload", upload.single("file"), uploadMenu);

router.get("/menu-today", getTodayMenu);
router.get("/download-menu", downloadMenu);

export default router;
