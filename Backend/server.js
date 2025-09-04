import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import menuRoutes from "./routes/menuRoutes.js";

import scheduler from "./utils/scheduler.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});



// Routes

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", menuRoutes);



// Start scheduler
scheduler.start();


// error middleware (MUST come after routes)
app.use(notFound);
app.use(errorHandler);



// Listen connections
io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Export io so controllers can use it
export { io };

// ✅ IMPORTANT: use `server.listen` not `app.listen`
server.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});
