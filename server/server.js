import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import webFlowRouter from "./webflowRoute.js";
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Add security headers to requests

// Use the webFlowRouter for handling routes

app.use("/", webFlowRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
