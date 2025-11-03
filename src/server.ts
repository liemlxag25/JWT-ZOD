// src/server.ts
import app from "./app";
import dotenv from "dotenv";
import connectDB from "./configs/database.config";
import config from "./configs/config";
dotenv.config();

const port = config.app.port || 3000;
const hostname = config.app.hostname || "localhost";

// Kết nối DB
connectDB();

// Chạy server
const server = app.listen(port, () => {
  console.log(`Server chạy tại http://${hostname}:${port}`);
});

// Graceful shutdown (tùy chọn)
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});