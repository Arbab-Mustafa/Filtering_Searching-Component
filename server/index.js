import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// import webFlowRouter from "./routes/webflowRoute.js";
import EventRouter from "./routes/EventRoute.js";
import VenueRouter from "./routes/VenuRoute.js";

import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());

// connecting to Database

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connecting to Database"))
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Use the Event&Venu for handling routes

app.use("/api", EventRouter);
app.use("/api", VenueRouter);

// app.use("/", webFlowRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
