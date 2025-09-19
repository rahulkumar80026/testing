
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import menuRoutes from "./routes/menuRoutes.js";

import scheduler from "./utils/scheduler.js";
import { initSocket } from "./socket.js";

dotenv.config();


const app = express();
app.use(cors({ origin: "https://display-menu-f5f1.vercel.app" }));
app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Init socket
const io = initSocket(server);

// ✅ Connect DB (change stream inside db.js will use getIo())
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", menuRoutes);

// Start scheduler
scheduler.start();

// error middleware
app.use(notFound);
app.use(errorHandler);

// ✅ IMPORTANT: use `server.listen`
server.listen(process.env.PORT || 5000,"0.0.0.0", () => {
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});
