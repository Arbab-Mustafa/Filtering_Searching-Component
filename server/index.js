import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
// Ensure this imports all routers correctly

import EventRouter from "./routes/EventRoute.js";
import VenueRouter from "./routes/VenuRoute.js";
import GuestListRouter from "./routes/eventGuestRoute.js";
import EmailListRouter from "./routes/EmailListRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define base paths for API routes
app.use("/events", EventRouter); // Grouping routes under specific paths for clarity
app.use("/venues", VenueRouter); // Corrected typo
app.use("/guestlists", GuestListRouter);
app.use("/emaillists", EmailListRouter);

// Default response for root

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
