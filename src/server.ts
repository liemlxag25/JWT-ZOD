// src/server.ts
import app from "./app";
import dotenv from "dotenv";
import connectDB from "./configs/database.config";
import config from "./configs/config";

// connect Database
connectDB();

//server running
const server = app.listen(config.app.port, () => {
  console.log(`Server running at http://${config.app.hostname}:${config.app.port}`);
});

// Graceful shutdown 
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});