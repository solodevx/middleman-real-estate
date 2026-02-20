// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// read .env file and set environment variables
dotenv.config();

const app = express();

//mongodb connection
const MONGO_URL = process.env.MONGO;
mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

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


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});