
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
