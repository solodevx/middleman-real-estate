// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// read .env file and set environment variables
dotenv.config();

const app = express();

// Middleware setup - enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!!!`);
});