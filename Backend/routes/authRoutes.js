import express from "express";
import { adminLogin } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Login route (no middleware)
router.post("/login", adminLogin);

// ✅ Example protected route
router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: "Welcome Admin! Dashboard data here", user: req.user });
});

export default router;